import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';
import * as fromAuth from '../auth/store/auth.reducer'; 
import * as fromRecipe from '../recipes/store/recipe.reducer';
import { ActionReducerMap } from '@ngrx/store';

//this is how we can manage the type definition of our reducer class all over the application
export interface AppState{
    shoppingList:fromShoppingList.State;
    auth:fromAuth.State;
    recipes:fromRecipe.State;
}

export const appReducer:ActionReducerMap<AppState>={
    shoppingList:fromShoppingList.ShoppingListReducer,
    auth:fromAuth.AuthReducer,
    recipes:fromRecipe.RecipeReducer
}