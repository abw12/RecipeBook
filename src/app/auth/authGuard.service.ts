import{Injectable} from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {map,take} from 'rxjs/operators';
import {AuthService} from './auth.service';
import {Store} from '@ngrx/store';
import * as fromApp from '../store/app.reducer';

@Injectable({providedIn:'root'})
export class AuthGuard implements CanActivate{
    constructor(private authService:AuthService,
        private router:Router,
        private store:Store<fromApp.AppState>){}

    canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot)
    :boolean | UrlTree 
    | Promise<boolean | UrlTree> 
    | Observable<boolean | UrlTree>
    {
        return this.store.select('auth').pipe(
            take(1),                   //take(1) will just listen to user subscripton only 1 time with latest value & then will unsubscribe,so to make sure we are not listening to user subscription unnecessarly we can take
            map(authState=>{
                return authState.user;              //we using ngrx store so mapping the state value to new userobj which gives us new observable  which we use further
            }),         
            map(user=>{
                const isAuth= !!user;   //bcoz can Active method expect an boolen return value here we convert user JS obj into boolean value by using this trick of !!user         
                if(isAuth){
                    return true;
                }
                return this.router.createUrlTree(['/auth']); //UrlTree is the new approach in angular 8 which allow us to re-direct the user if he is not authenticated to some different routes 
                
            }),
            //this tap approach to redirect user to specific route if he is not authenticated is the older one used before angular 8
            // tap(isAuth=>{
            //     if(!isAuth){
            //         return this.router.navigate(['/auth']);
            //     }
            // })
        )
    }
}