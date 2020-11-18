import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Actions, Effect,ofType} from '@ngrx/effects';
import { of } from 'rxjs';
import {catchError, map, switchMap,tap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import * as AuthActions from './auth.action';
import { Router } from '@angular/router';
import { UserModel } from '../user.model';
import {AuthService} from '../auth.service';

export interface AuthResponseData{
    kind:string,
    idToken:string,
    email:string,
    refreshToken:string,
    expiresIn:string,
    localId:string,
    registered?:boolean         //? indicate optional as this field is required only in lofin method and it is not required in signup,so for signup it is optional(which will not throw an error)  
}

const handeAuthentication = (email:string,id:string,token:string,expiresIn:number) => {
    const expirationDate=new Date(new Date().getTime() + expiresIn * 1000);  //here we need of() to return an observable coz map() already wrap everthing as observable so it will return an observable 
    const user =new UserModel(email,id,token,expirationDate);
    localStorage.setItem('userData',JSON.stringify(user));
    return new AuthActions.AuthenticateSucess({
        email:email,
        id:id,
        token:token,
        expirationDate:expirationDate,
        redirect:true
    });
}

const handleError = (errorResponse:any) => {
    let error='An Unknown Error Occured!';
    if(!errorResponse.error || !errorResponse.error.error){
            return of(new AuthActions.AuthenticateFail(error))   //important note: the error function here must return the non-error observable so that the outer observable stream should not die therefor we use 'of' operator here which returns a non-error observable to outer stream of switchmap action$
        }                                                   //this wil return the new observable as cathcError() does not return an observable
    switch(errorResponse.error.error.message){
        case 'EMAIL_EXISTS':
            error='Email ID already Exists';
            break;
        case 'EMAIL_NOT_FOUND':
            error='Email ID does not Exist';
            break;
        case 'INVALID_PASSWORD':
            error='Password is Invalid';
            break;
        case 'USER_DISABLED':
            error='Account is Disabled';
            break;
    } 
        return of(new AuthActions.AuthenticateFail(error));  
}

@Injectable()                   //no need to provide in as root here though need injectable so that things can be injected into this class like HttpClinet,Actions,etc
export class AuthEffects{
    
    @Effect()
    authSignUp=this.actions$.pipe(
        ofType(AuthActions.SIGNUP_START),
        switchMap((signupAction:AuthActions.SignupStart)=>{
            return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + environment.firebaseConfig.apiKey,
            {
                    email:signupAction.payload.email,
                    password:signupAction.payload.password,
                    returnSecureToken:true
            })
            .pipe(
                tap(resData=>{
                    this.authService.setLogOutTimer(+resData.expiresIn * 1000);
                    this.authService.addContactTODatabase(signupAction.payload.email,signupAction.payload.firstName);   //adding new account docment in cloud firestore EmailNotification collections which is to to send welcome Email to new Sign-Up  
                }),
                map(resdata=>{
                 return handeAuthentication(      //return data in the order in which parametrs are defined in handleauthentication function
                        resdata.email,
                        resdata.localId,
                        resdata.idToken,
                        +resdata.expiresIn
                    )
                }),
                catchError(errorRes=>{
                    return handleError(errorRes)
                })
            )
        })
        

    );
    
    //@Effect Decorator allow angular know that this property (authLoginf) is an nrgx effect which automatically dispatch an action so you dont need to dispatch on own 
    //In observable when an error occurs the observable gets completed & dies ,so when we login again the new observable is created .but here in effects the on going observable chain must  not die so if we catch error after switchMap which we can do coz switchMap return an observable,so if error occured in http request then entire stream will die than when we again again we wont create a new observable stream ,therefore we need to handle errors differently here than the observables using the inner pipe operator we listend to error using of() which retunrs a new observable after completing the http req action 
    @Effect()
    authLogin=this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((authData:AuthActions.Login_Start)=>{           //switchmap return an observable 
            return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseConfig.apiKey,
            {
                    email:authData.payload.email,
                    password:authData.payload.password,
                    returnSecureToken:true
            })
            .pipe(
                tap(resData=>{
                    this.authService.setLogOutTimer(+resData.expiresIn * 1000);
                }),
                map(resdata=>{
                   return handeAuthentication(
                        resdata.email,
                        resdata.localId,
                        resdata.idToken,
                        +resdata.expiresIn
                    )
                }),catchError(errorRes=>{
                    return handleError(errorRes)
                })
            )
        })
    );
    
    @Effect({dispatch:false})       //setting dispatch:false will tell ngrx that this action is not dispatchable 
    authRedirect=this.actions$.pipe(
        ofType(AuthActions.AUTHENTICATE_SUCCESS),
        tap((authSuccessAction:AuthActions.AuthenticateSucess)=>{
           if(authSuccessAction.payload.redirect){                //to check if autoLogin action is there thesn dont redirect to recipes page instead reload & stay on same page
                this.router.navigate(['/']);    
           }
        })
    );

    @Effect()
    autoLogin=this.actions$.pipe(
        ofType(AuthActions.AUTO_LOGIN),
        map(()=>{
            const userData:{
                email:string;
                id:string;
                _token:string;
                _tokenExpirationDate:string;
            }
            =JSON.parse(localStorage.getItem('userData')); //JSON.parse is wrapped to convert userData string format stored in localStorage back to JS obj/JSON Format
            if(!userData){     //if userData is not present in localStorage that means user needs to login manually
                return {type : 'DUMMY'} ;
            }
    
            const loadedUser= new UserModel(
                userData.email,
                userData.id,
                userData._token,
                new Date(userData._tokenExpirationDate));
    
                if(loadedUser.Token){ 
                    //this.user.next(loadedUser);       //this to check if we have already login user or by checking the token if its exist then we emit the current userData on reload of the page
                    const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime()  //difference between expiration date(future time in millisec when token will expire) - current syste time in millisec ,getTime() gives us date in millisec
                    this.authService.setLogOutTimer(expirationDuration);
                    return new AuthActions.AuthenticateSucess(
                        {
                            email:loadedUser.email,
                            id:loadedUser.id,
                            token:loadedUser.Token,
                            expirationDate:new Date(userData._tokenExpirationDate),  //we use userData._tokenExpiration coz its been converted into string 
                            redirect:false
                        }
                    );
                    
                }
                return {type : 'DUMMY'}  //this is a dummy return type so that we dont get error coz if user is not already login than there must we return some action here which is for a DUMMY
        })
    )
    
    @Effect({dispatch:false})
    authLogout=this.actions$.pipe(
        ofType(AuthActions.LOGOUT),
        tap(()=>{
            this.authService.clearLogOutTimer();
            localStorage.removeItem('userData');
            this.router.navigate(['/auth']);
        })
    )
    constructor(private actions$:Actions,
        private http:HttpClient,
        private router:Router,
        private authService:AuthService){}  //$ just used define that it is an observable in ngrx/effects though its not compulsory to used $ sign
}