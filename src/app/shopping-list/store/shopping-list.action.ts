
import {Action} from '@ngrx/store';
import { Ingredient } from '../../shared/ingredients.model';

export const ADD_INGREDIENT='[ShoppingList] ADD_INGREDIENT';
export const ADD_INGREDIENTS='[ShoppingList] ADD_INGREDIENTS';
export const UPDATE_INGEDIENT='[ShoppingList] UPDATE_INGREDIENT';
export const DELETE_INGREDIENT='[ShoppingList] DELETE_INGREDIENT';
export const START_EDIT='[ShoppingList] START_EDIT';
export const STOP_EDIT='[ShoppingList] STOP_EDIT';

export class AddIngredient implements Action{
    readonly type=ADD_INGREDIENT;
    //payload:Ingredient;              //payload is not a name you have to use!the Action  interface only  forces you to add a "type" property
    constructor(public payload:Ingredient){}
}
export class AddIngredients implements Action{
    readonly type=ADD_INGREDIENTS;
    constructor(public payload:Ingredient[]){}
}

export class UpdateIngredient implements Action{
    readonly type=UPDATE_INGEDIENT;
    constructor(public payload:Ingredient){}  //expect only ingredient which needs to be edited as the index we get it from stateDate of store
}
export class DeleteIngredient implements Action{
    readonly type=DELETE_INGREDIENT;                 //we dont need the index anymore as we know the index as delete operation is performed by ngrx using the stateData stored in the ngrx store 
}
export class StartEditing implements Action{
    readonly type=START_EDIT;
    constructor(public payload:number){}
}
export class StopEditing implements Action{
    readonly type=STOP_EDIT;
}

export type MultipleActions=
AddIngredient
|AddIngredients
|UpdateIngredient
|DeleteIngredient
|StartEditing
|StopEditing;