import{Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { catchError,tap } from 'rxjs/operators';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { Router } from '@angular/router';
import {environment} from '../../environments/environment';
import{Store} from '@ngrx/store';
import {AngularFirestore ,AngularFirestoreCollection} from "@angular/fire/firestore";
import{UserModel} from './user.model';
import * as fromApp from '../store/app.reducer';
import * as fromAuthActions from '../auth/store/auth.action';

export interface AuthResponseData{
    kind:string,
    idToken:string,
    email:string,
    refreshToken:string,
    expiresIn:string,
    localId:string,
    registered?:boolean         //? indicate optional as this field is required only in lofin method and it is not required in signup,so for signup it is optional(which will not throw an error)  
}

@Injectable({providedIn:'root'})
export class AuthService{

//user = new BehaviorSubject<UserModel>(null);  //behaviorSubjet is the other kind of suject offered by rxjs,we use here to extract the token from the UserModel & to return the last value from the subject    
private tokenExpirationTimer:any;

constructor(private http:HttpClient,
    //private router:Router,
    private store:Store<fromApp.AppState>,
    private firestore:AngularFirestore){}


    setLogOutTimer(expirationDate:number){
        console.log(expirationDate);
       this.tokenExpirationTimer= setTimeout(()=>{
            this.store.dispatch(new fromAuthActions.Logout());
        },expirationDate);
    }

    clearLogOutTimer(){
        if(this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer);
            this.tokenExpirationTimer=null;
        }
    }

    addContactTODatabase(email,firstName):Promise<void>{
        const contact ={email,firstName};
        console.log("ContactDetails :"+contact);
        return this.firestore.doc(`EmailNotification/${email}`).set(contact,{merge:true});
      }



// signup(emailId:string,pwd:string){
//     //firebase Auth API for signup with email/paasword endpoint expect these 3 request payload & respond with 6 field which we defined in interface above 
//     return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + environment.firebaseApiKey,
//     {
//             email:emailId,
//             password:pwd,
//             returnSecureToken:true
//         }).pipe(catchError(this.handleError)
//         ,tap(resData=>{
//             this.handleAuthenticate(
//                 resData.email,
//                 resData.localId,
//                 resData.idToken,
//                 +resData.expiresIn
//             );
//          })
//         );
    
//     }
    //autoLogin method is used to make when we refresh the page we dont use token & that session for the user so for that we store userData in localStorage & perform operations on it
   //localstorage is the browser storage we are using to store small key:pair data like user login info
    // autoLogin(){
    //     const userData:{
    //         email:string;
    //         id:string;
    //         _token:string;
    //         _tokenExpirationDate:string;
    //     }
    //     =JSON.parse(localStorage.getItem('userData')); //JSON.parse is wrapped to convert userData string format stored in localStorage back to JS obj
    //     if(!userData){     //if userData is not present in localStorage that means user needs to login manually
    //         return ;
    //     }

    //     const loadedUser= new UserModel(
    //         userData.email,
    //         userData.id,
    //         userData._token,
    //         new Date(userData._tokenExpirationDate));

    //         if(loadedUser.Token){ 
    //             //this.user.next(loadedUser);       //this to check if we have already login user or by checking the token if its exist then we emit the current userData on reload of the page
    //             this.store.dispatch(new fromAuthActions.AuthenticateSucess(
    //                 {
    //                     email:loadedUser.email,
    //                     id:loadedUser.id,
    //                     token:loadedUser.Token,
    //                     expirationDate:new Date(userData._tokenExpirationDate)  //we use userData._tokenExpiration coz its been converted into string 
    //                 }
    //             ))
    //             const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime()  //difference between expiration date(future time in millisec when token will expire) - current syste time in millisec ,getTime() gives us date in millisec
    //             this.autoLogOut(expirationDuration);
    //         }
    // }

    // login(email:string,password:string){
    //    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseApiKey,
    //    {
    //         email:email,
    //         password:password,
    //         returnSecureToken:true
    //     }).pipe(catchError(this.handleError)
    //     ,tap(resData=>{
    //         this.handleAuthenticate(
    //             resData.email,
    //             resData.localId,
    //             resData.idToken,
    //             +resData.expiresIn
    //         );
    //      })
    //     );
    // }


    // logout(){
    //     //this.user.next(null); 
    //     //this.store.dispatch(new fromAuthActions.Logout());
    //     //this.router.navigate(['/auth']);
    //     localStorage.removeItem('userData');
    //     if(this.tokenExpirationTimer){
    //         clearTimeout(this.tokenExpirationTimer);  //this will clear the tokenExpirationTimer value once token is expired which we set in autoLogout method ,so whne we call logout mthod manually we ensure that timer value is cleared
    //     }
    //     this.tokenExpirationTimer=null;
    // }


  


    // private handleError(errorResponse:HttpErrorResponse){
    //     let error='An Unknown Error Occured!';
    //             if(!errorResponse.error || !errorResponse.error.error){
    //                 return throwError(error);
    //             }
    //             switch(errorResponse.error.error.message){
    //                 case 'EMAIL_EXISTS':
    //                     error='Email ID already Exists';
    //                     break;
    //                 case 'EMAIL_NOT_FOUND':
    //                     error='Email ID does not Exist';
    //                     break;
    //                 case 'INVALID_PASSWORD':
    //                     error='Password is Invalid';
    //                     break;
    //                 case 'USER_DISABLED':
    //                     error='Account is Disabled';
    //                     break;
    //             } 
    //         return throwError(error);
    // }    
}