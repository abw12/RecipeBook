import {HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from '@angular/common/http';
import {AuthService} from './auth.service';
import { exhaustMap,take,map } from "rxjs/operators";
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';

@Injectable({providedIn:'root'})
export class AuthInterceptorService implements HttpInterceptor{
    constructor (private authService:AuthService,
        private store:Store<fromApp.AppState>){}
    //we make use of interceptor so once any request is made from UI to backend the interceptor will catch that request & will made any modification like adding header,params to request before sending it to backend server
    //this interceptor is applied to all outgoing request related to auth as we are not specifying any specific url to apply 
    intercept(req:HttpRequest<any>,next:HttpHandler){
        return this.store.select('auth').pipe(
            take(1),
            map(authState=>{                 //we using ngrx store so mapping the state value to new userobj which gives us new observable  which we use further
                return authState.user
            }),
            exhaustMap(user=>{
                //here we check if we have user object as null ,if null that means this requets is not for save data or fetch data hence send request as it is without applying token as queryParam 
                if(!user){               
                    return next.handle(req);
                }
                const modifiedReq= req.clone({
                    params:new HttpParams().set('auth',user.Token)
                });
                return next.handle(modifiedReq);
            }))
    }
}