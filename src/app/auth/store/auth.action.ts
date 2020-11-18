import { Action } from '@ngrx/store';

export const LOGIN_START='[Auth] LOGIN_START';
export const AUTHENTICATE_SUCCESS='[Auth] AUTHENTICATE_SUCCESS';    //using the feature model name(Auth) to specify explicity where is identifier is used coz in bigger applications it might happen we need to use 'Login' as constant in other reducers file ,which is not this case n this app 
export const AUTHENTICATE_FAIL='[Auth] AUTHENTICATE_FAIL';
export const SIGNUP_START='[Auth] SIGNUP_START';
export const AUTO_LOGIN='[Auth] AUTO_LOGIN';
export const AUTO_LOGOUT='[Auth] AUTO_LOGOUT';
export const CLEAR_ERROR='[Auth] CLEAR_ERROR';
export const LOGOUT='[Auth] LOGOUT';

export class AuthenticateSucess implements Action{   //this action is called after successful login
    readonly type=AUTHENTICATE_SUCCESS;  

    constructor(public payload:{
        email:string;
        id:string;
        token:string;
        expirationDate:Date;
        redirect:boolean;
    }){}
}

export class Logout implements Action{
    readonly type=LOGOUT;
}

export class Login_Start implements Action{       //ths actions is called when trying to login while sending req
    readonly type=LOGIN_START;

    constructor(public payload:{email:string,password:string}){}
}

export class AuthenticateFail implements Action{
    readonly type=AUTHENTICATE_FAIL;

    constructor(public payload:string){}
}

export class SignupStart implements Action{
    readonly type=SIGNUP_START;

    constructor(public payload:{email:string,password:string,firstName?:string}){}
}

export class ClearError implements Action{
    readonly type=CLEAR_ERROR;
}
export class AuthLogin implements Action{
    readonly type=AUTO_LOGIN;
}
export class AutoLogout implements Action{
    readonly type= AUTO_LOGOUT
}

export type AuthActions= 
AuthLogin
|Login_Start 
|AuthenticateSucess
|AuthenticateFail 
|SignupStart
|Logout
|AutoLogout;