import { Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import { Subscription } from 'rxjs';
import{Store} from '@ngrx/store';
import { map } from 'rxjs/operators';
//import { AuthService } from '../auth/auth.service';
//import {DataStorageService} from '../shared/data-storage';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.action';
import * as recipeActions from '../recipes/store/recipe.actions';

@Component({
    selector:'app-header',
    templateUrl:'./header.component.html'
})
export class HeaderComponent implements OnInit,OnDestroy{
    constructor(
        //private DataStorage:DataStorageService,
        //private authService:AuthService,
        private store:Store<fromApp.AppState>){}
    collapsed = true;
    isAuthenticated=false;
    subscribtion=new Subscription;
//    @Output() currentPage =new EventEmitter<string>();

//     viewCurrentPage(pageOnScreen:string){
//         this.currentPage.emit(pageOnScreen);
//     }

    ngOnInit(){
        this.subscribtion=this.store.select('auth')  //not any action you dispatch it reaches to all reducers 
        .pipe(map(authState=> authState.user))  //using pipe operator after implementing the ngrx store coz select('auth') gives us an userobject so using pipe and map opeartor we can return an onservable which use use further 
        .subscribe(user=>{
            //this.isAuthenticated=!user ? false:true;
            this.isAuthenticated=!!user  //this is shorthand to above statement 
            //console.log(!user);
            console.log(!!user);
        });
    }

    onSaveData(){
        //this.DataStorage.storeDataToFireBase();
        this.store.dispatch(new recipeActions.StoreRecipe());
    }

    onFetchData(){
        //this.DataStorage.fetchDataFromFireBase().subscribe();
        this.store.dispatch(new recipeActions.FetchRecipes());
    }

    onLogOut(){
       // this.authService.logout();
       this.store.dispatch(new AuthActions.Logout());
    }

    ngOnDestroy(){
        this.subscribtion.unsubscribe();
    }
}