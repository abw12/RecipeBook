import { Component, OnInit, Input } from '@angular/core';
import {AngularFirestore ,AngularFirestoreCollection} from "@angular/fire/firestore";
import { AngularFireFunctions } from '@angular/fire/functions';
import { Recipes } from '../recipes.model';
//import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';

import{map, switchMap} from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as RecipeActions from '../store/recipe.actions';
import * as ShoppinglistActions from '../../shopping-list/store/shopping-list.action';
import {emailModel} from './email.model';

@Component({
  selector: 'app-recipes-details',
  templateUrl: './recipes-details.component.html',
  styleUrls: ['./recipes-details.component.css']
})
export class RecipesDetailsComponent implements OnInit {
   recipe:Recipes;
   id:number;
   share:boolean=false;
   emailAddress='';


  constructor(
    //private recipeService:RecipeService,
    private route:ActivatedRoute,
    private router:Router,
    private store:Store<fromApp.AppState>,
    private firestore:AngularFirestore,
    private firefun:AngularFireFunctions) { }

ngOnInit(){
  this.route.params.pipe(map(params=>{   //this will return the id number from current route using params of that route 
      return +params['id']
    }),
    switchMap(id=>{                       //here will set that id to value got from  params to local id variable & will return the current state f the recipe from the ngrx store using the select method
      this.id=id;
      return this.store.select('recipes');
    }),
    map(recipeState=>{
      return recipeState.recipes.find((recipe,index)=>{   //so by using the  above two observable return value in this observable chain  will set the index of the selected recipe 
        return index === this.id; 
      })
    })
  ).subscribe(recipe=>{                                    //here we subscribe to that single recipe which we selected 
    this.recipe=recipe;
  }) 
}

  onAddIngredientToShoppingList(){
    //this.recipeService.AddIngredientToShoppingList(this.recipe.ingredient);
    this.store.dispatch(new ShoppinglistActions.AddIngredients(this.recipe.ingredient));
  }
  onEditRecipe(){
  //this.router.navigate(['../',this.id,'edit'],{relativeTo:this.route}) //this is the complex approach to give the route by going '../' one level up then giving /id/edit like this
   this.router.navigate(['edit'],{relativeTo:this.route}); //this is the simple approach as already we have /recipes/id is the current route & we just assign /edit to it
  }

  onDeleteRecipe(){
      //this.recipeService.deleteRecipe(this.id);
      this.store.dispatch(new RecipeActions.DeleteRecipe(this.id));
      this.router.navigate(['/recipes']);   
  }

  onShare(){
    this.share=!this.share;
  }

  addContactTODatabase(email,firstName):Promise<void>{
   
    const contact:emailModel={email,firstName};

    console.log("ContactDetails :"+contact);
    return this.firestore.doc(`EmailNotification/${email}`).set(contact,{merge:true})
  }

  shareRecipe(emailId:string){
   
    const selectedRecipes= {...this.recipe,email:emailId}  //this will copy the current recipe selected from store using spread operator and add new field email        
    const callable=this.firefun.httpsCallable('shareEmail');
    callable(selectedRecipes).subscribe();
  }
}
