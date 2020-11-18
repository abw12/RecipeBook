import {Recipes} from '../recipes.model';
import * as fromRecipeActions from '../store/recipe.actions'

export interface State{
    recipes:Recipes[];
}

export const initialState:State={
    recipes:[]
};

export function RecipeReducer (state=initialState,action:fromRecipeActions.RecipeActions){
    switch(action.type){
        case fromRecipeActions.SET_RECIPES:
            return {
                ...state,
                recipes:[...action.payload]
            };

        case fromRecipeActions.ADD_RECIPE:
            return{
                ...state,
                recipes:[...state.recipes,action.payload]   //action.paylaod will be the new recipe to be added and the ...state is the previous array of existing recipe so we add new recipe in that array copy
            };

        case fromRecipeActions.UPDATE_RECIPE:
            const updatedSingleRecipe= {
                ...state.recipes[action.payload.index] ,   //using spread operator we will extract the single recipe with help of index to be updated from the current state
                ...action.payload.newRecipe                 //then here we add that updated fields in that single recipe  which we extracted above from current state & assigned this new  single recipe obj to property updatedRecipe
            };
            
            const updatedRecipeList= [...state.recipes];   //copy current state recipes(old recipe array)
            updatedRecipeList[action.payload.index]=updatedSingleRecipe;  //here we add that single updated recipe into new updatedRecipeList 
            
            return{
                    ...state,
                    recipes:updatedRecipeList
                };

        case fromRecipeActions.DELETE_RECIPE:                
            return{
                ...state,
                recipes:state.recipes.filter((recipe,index)=>{  //using filter here coz filter always return the new list ,we pass recipe list to the filetr & filter expect an index value in its 2nd parameter,so filter will loop over all the recipe and when the index is not eqaul to the index which we want to remove it will exclude that index recipe and return the remainning list of recipes
                    return index !== action.payload;
                })
            };
            
        default:
            return state;
    }
}