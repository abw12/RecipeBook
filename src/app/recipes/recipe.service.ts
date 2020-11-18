// import {Recipes} from'./recipes.model';
// import { Injectable } from '@angular/core';
// import { Ingredient } from '../shared/ingredients.model';
// import { ShoppingListService } from '../shopping-list/shopping-lits.service';
// import { Subject } from 'rxjs';
// import{Store} from '@ngrx/store';
// import * as ShoppingListActions from '../shopping-list/store/shopping-list.action';
// import * as fromApp from '../store/app.reducer';

// @Injectable()
// export class RecipeService{
//     // recipeSelected=new EventEmitter<Recipes>(); //this is not used as we used this prop to navigate through different recipes but now we use routing to do that so this is committed
//     //here also we can use Subject instead of EventEmitter if we dont want to use routing
//     recipeChanged=new Subject<Recipes[]>();
// //    private  recipes:Recipes[]=[
// //         new Recipes(
// //         'A test recipe',
// //         'What Else do you need?',
// //         'https://www.telegraph.co.uk/content/dam/food-and-drink/2019/01/11/TELEMMGLPICT000185036503_trans_NvBQzQNjv4BqodXSHHE-j78vyZ0iwRUmY_nuzprQ_mxVCWqrJBTJk3A.jpeg',
// //         [   
// //             new Ingredient('Chicken',1),
// //             new Ingredient('butter',2)
// //         ]
// //         )
// //         ,new Recipes(
// //          'Another test recipe',
// //          'What Else do you need?',
// //          'https://hips.hearstapps.com/amv-prod-tpw.s3.amazonaws.com/wp-content/uploads/2012/09/pizzaburger1.jpg?crop=1xw:0.7517899761336515xh;center,top&resize=640:*',
// //          [
// //              new Ingredient('Meat',1),
// //              new Ingredient('Buns',4)]
// //          )
// //           ]; 
//     private recipes:Recipes[]=[];

//     constructor(private slService:ShoppingListService,
//         private store:Store<fromApp.AppState>
//         ){}

//     getRecipe(){
//         return this.recipes.slice();
//     }
//     getRecipeId(index:number){
//         return this.recipes[index]; //this will return the array index from recipes Array
//     }
//     // setRecipes(recipes:Recipes[]){
//     //     this.recipes =recipes ;
//     //     this.recipeChanged.next(this.recipes.slice());
//     // }
    
//     AddIngredientToShoppingList(ingredients:Ingredient[]){
//         //this.slService.addNewIngredients(ingredients); 
//         this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));  //this is method of sending state of application across components using ngrx store
//     }

//     addRecipe(recipe:Recipes){
//         this.recipes.push(recipe);
//         this.recipeChanged.next(this.recipes.slice());   
//     }
//     updateRecipe(index:number,newRecipe:Recipes){
//         this.recipes[index]=newRecipe;
//         this.recipeChanged.next(this.recipes.slice());
//     }
//     deleteRecipe(index:number){
//         this.recipes.splice(index,1);
//         this.recipeChanged.next(this.recipes.slice());
//     }

// }