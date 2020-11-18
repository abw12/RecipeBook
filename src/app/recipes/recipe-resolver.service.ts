import {Injectable} from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import {Recipes} from './recipes.model';
//import{DataStorageService} from '../shared/data-storage';
//import { RecipeService } from './recipe.service';
import { Store } from '@ngrx/store';
import {Actions, ofType} from '@ngrx/effects';
import * as fromApp from '../store/app.reducer';
import * as recipeActions from '../recipes/store/recipe.actions';
import { take,map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({providedIn:'root'})
export class RecipeRsolverService implements Resolve<Recipes[]>{
    constructor(
        //private dataStroageService:DataStorageService,
        //private recipeService:RecipeService
            private store:Store<fromApp.AppState>,
            private action$:Actions){}

    resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot){
        //const recipes=this.recipeService.getRecipe();
        // if(recipes.length===0){
        //     //return this.dataStroageService.fetchDataFromFireBase();

        // }else{
        //     return recipes;
        // }
       return this.store.select('recipes')
        .pipe(
            take(1),
            map(recipeState=>{
                return recipeState.recipes;
            }),
            switchMap(recipes=>{
                //if the recipesList fetched from store is empty then only make a http request else return the same recipeList from the store
                if(recipes.length === 0){
                    this.store.dispatch(new recipeActions.FetchRecipes());    //since resolve expect an observable to be returned ,here we are not returning an observable hence when detailed recipe page is refreshed on we lose the state and route back to /recipes 
                    return this.action$.pipe(                                  //therefore here we use the Actions from effects to return an observable actions after fecthing the data from server where we can use this to set the values of recipes by listening to the setrecipe action which returns an observable and resolver get completed  
                        ofType(recipeActions.SET_RECIPES),            
                        take(1)                    //take(1) will only take one instance of the action and then unsubscribe it 
                    );
                }else{
                    return of(recipes);
                }
            })
        )
       
    }
}