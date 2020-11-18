
// import {Ingredient}from '../shared/ingredients.model';
// import { Subject } from 'rxjs';
// import { Injectable } from '@angular/core';

// //@Injectable({providedIn:'root'})
// export class ShoppingListService{
//     //ingridientAdded =new EventEmitter<Ingredient[]>();
//     ingridientAdded=new Subject<Ingredient[]>();
//     startedEditing=new Subject<number>();
//     private ingredientsArray:Ingredient[]=[
//         new Ingredient('Apples',5),
//         new Ingredient('banana',12)
//       ];

//       getIngridient(){
//         return this.ingredientsArray.slice();
//       }
//       getEditingIngridient(index:number){
//         return this.ingredientsArray[index];
//       }
//       addIngridient(ingridient:Ingredient){
//           this.ingredientsArray.push(ingridient);
//           this.ingridientAdded.next(this.ingredientsArray.slice());
//       }

//       addNewIngredients(ingredients:Ingredient[]){
//         // for(let ingredient of ingredients){
//         //   this.addIngridient(ingredient);
//         // }
//         this.ingredientsArray.push(...ingredients);
//         this.ingridientAdded.next(this.ingredientsArray.slice());
//       }
//       updateIngredient(index:number,newIngredient:Ingredient){
//        this.ingredientsArray[index]=newIngredient;
//         this.ingridientAdded.next(this.ingredientsArray.slice());
//       }
//       deleteIngredient(index:number){
//         this.ingredientsArray.splice(index,1);  //1st parameter starting index 2nd paramter how many to remove from the array
//         this.ingridientAdded.next(this.ingredientsArray.slice());
//       } 
// }