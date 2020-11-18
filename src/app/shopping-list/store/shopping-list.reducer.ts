import {Ingredient} from '../../shared/ingredients.model';
import * as ShoppingListAction from '../store/shopping-list.action';

//Interface is used so that if we add any new state element than we dont have to chnage everywhere is the app jsu tneed to add the new elements here
export interface State{
    ingredients:Ingredient[],
    editedIngredient:Ingredient,
    editedIngredientIndex:number
}

const initialState={
    ingredients:[
    //    new Ingredient('Apples',5),
    //    new Ingredient('banana',12)
    ],
    editedIngredient:null,
    editedIngredientIndex:-1 
};

export function ShoppingListReducer(
    state=initialState,
    action:ShoppingListAction.MultipleActions){
 switch(action.type){

    case ShoppingListAction.ADD_INGREDIENT:
         return {
             ...state,  
             ingredients:[...state.ingredients,action.payload]  //1st argyment this spread operator copies the value of the old state & 2nd we manipulate the values of copied old state according to the new changes we get in action.payload
         }

    case ShoppingListAction.ADD_INGREDIENTS:
        return {
            ...state,
            ingredients:[...state.ingredients,...action.payload]  //here we get the array of ingredients for adding multiple ingredients therefore using spread operator to pull the elements existing state and add new values from action.payload using the spread operatorand set the element in outer  ingredients array 

        }

    case ShoppingListAction.UPDATE_INGEDIENT:
        const ingredient=state.ingredients[state.editedIngredientIndex];     //this copies the ingredient to be updated from action payload
        const updatedIngredient={
            ...ingredient,        //this will copy the old state of ingredient object 
            ...action.payload  //this will overwrite the old state of ingredient object with the new values updated from user which we get it from the action payload 
        };

        const updatedIngredients=[...state.ingredients];  //this will copy all the old state ingredients in the updatedIngredients array property
        updatedIngredients[state.editedIngredientIndex]=updatedIngredient; //this wil replace the updated ingredient from all ingredients array with the help of index number received in action payload
        return{
            ...state,
            ingredients:updatedIngredients,
            editedIngredientIndex:-1,
            editedIngredient:null
        }

    case ShoppingListAction.DELETE_INGREDIENT:
        return{
            ...state,
            ingredients:state.ingredients.filter((ig,igIndex)=>{         //here we are using JS filter function which allow a function to run with tow parameters 1st elements(which is the ig i.e ingredients object) 2nd current running index
                    return igIndex!== state.editedIngredientIndex;          //this checks if filter current index looping on all ingredients does not match the action.payload index which is ingredient we want to delete than filter simple remove that index elemets(Ingredient)from the returned values & this is how we implement the delete ingredient functionality
            }),
            editedIngredientIndex:-1,
            editedIngredient:null
        };
    case ShoppingListAction.START_EDIT:
        return{
            ...state,
            editedIngredientIndex:action.payload,
            editedIngredient:{...state.ingredients[action.payload]}
        }
    case ShoppingListAction.STOP_EDIT:
        return{
            ...state,
            editedIngredient:null,
            editedIngredientIndex:-1
        }
    default:
        return state;
 }

}