import {UserModel} from '../user.model';
import * as fromAuthActions from './auth.action';
export interface State{
    user:UserModel,
    authError:string,
    Loading:boolean

}

 const initialState:State={
     user:null,
     authError:null,
     Loading:false
 }
export function AuthReducer(state=initialState,
    action:fromAuthActions.AuthActions){
    switch(action.type){
    
    case fromAuthActions.AUTHENTICATE_SUCCESS:
        const userObj =new UserModel(
                action.payload.email,
                action.payload.id,
                action.payload.token,
                action.payload.expirationDate
            );
        return {
            ...state, 
            user:userObj,        //assigning the intial user value to the value received from action.payload(current value)
            authError:null,
            Loading:false
        };
    case fromAuthActions.LOGOUT:
        return{
            ...state,
            user:null
        };
    case fromAuthActions.LOGIN_START:          //we can group mutiple cases and run the same code
    //case fromAuthActions.SIGNUP_START:
        return {
            ...state,
            authError:null,
            Loading:true
        };

    case fromAuthActions.SIGNUP_START:
        return {
            ...state,
            authError:null,
            loading:true
        };
        
    case fromAuthActions.AUTHENTICATE_FAIL:
        return {
            ...state,
            user:null,
            authError:action.payload,
            Loading:false
        };
    default:                             //returning the default state is very important as whn we dispatch actions it reaches to all educers in our app so suppose if shoppingList reducer dispatch an action then here in auth reducer we dont have that identifier(case) declared to handle it so we return the default value which is the old state or intial state of auth 
        return state;
    }
}