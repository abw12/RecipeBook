import { Injectable } from "@angular/core";
import { Effect ,Actions, ofType} from "@ngrx/effects";
import {switchMap,map, withLatestFrom} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

import { Store } from '@ngrx/store';    
import * as recipeActions from '../store/recipe.actions';
import {Recipes} from '../recipes.model';
import * as fromApp from '../../store/app.reducer';

@Injectable()
export class RecipeEffects {
@Effect()
recipeFetch = this.action$.pipe(
    ofType(recipeActions.FETCH_RECIPES),
    switchMap(()=>{
        return  this.http.get<Recipes[]>("https://ng-recipe-book-71504.firebaseio.com/recipes.json");
    }),
    map(httpResponse=>{
        return httpResponse.map(recipe=>{
            return {
                ...recipe,
                ingredient:recipe.ingredient ? recipe.ingredient : []
            };
        });
    }),
    map(recipes=>{
        return new recipeActions.SetRecipes(recipes);
    })
)

@Effect({dispatch:false})
storeRecipe=this.action$.pipe(
    ofType(recipeActions.STORE_RECIPE,recipeActions.UPDATE_RECIPE,recipeActions.ADD_RECIPE),
    withLatestFrom(this.store.select('recipes')),   //this is a special oprator which allow us the value to merge from other observable into this observable
    switchMap(([actionData,recipesState])=>{        //this is the array destructuring syntax [] where two arguments are pass in an array,the 1paramter(actionData) is the output from the ofType(0 observable) and 2nd paramater(recipesState) is the output from withLatestForm observable which allow us to merge the values of two observable 
        return this.http.put("https://ng-recipe-book-71504.firebaseio.com/recipes.json",
            recipesState.recipes);
    })
)


constructor(public action$ :Actions,
    private http:HttpClient,
    private store:Store<fromApp.AppState>){}
}