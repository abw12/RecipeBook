import { Component, OnDestroy, OnInit } from '@angular/core';
import {Recipes} from '../recipes.model';
//import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription ,of, combineLatest} from 'rxjs';
import {map, startWith}from 'rxjs/operators';
import { Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit,OnDestroy {
//@Output() singleRecipeItem=new EventEmitter<Recipes>();
subscription:Subscription;


filterRecipeName='';
recipe:Recipes[];



  constructor(
    //private recipeservice:RecipeService,
    private router:Router,
    private route:ActivatedRoute,
    private store:Store<fromApp.AppState>) {
      
     }
    
    
  ngOnInit(){
   this.subscription= this.store.select('recipes')   //this 'recipes' selected name should match the name we declared in appStore
   .pipe(map(recipesState => recipesState.recipes))    //when we select recipe above we get the state slice of the recipe which is the obj with key recipe and not as response,so to convert it to response and use it further to subscribe it we use pipe and map here
   .subscribe(
      (recipes:Recipes[])=>{
        this.recipe=recipes;
      }
    )
    //this.searchRecipe();
    //this.recipe=this.recipeservice.getRecipe();
  }

  // onSelectedRecipe(selectedRecipe:Recipes){
  //   this.singleRecipeItem.emit(selectedRecipe);
  // }

  onNewRecipe(){
    this.router.navigate(['new'],{relativeTo:this.route});
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
