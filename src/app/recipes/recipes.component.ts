import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  //providers:[RecipeService]   when we provided recipe Service here the bug was introduce ,if we navigate to shooping list
  //tab came back to recipe tab then new entered was missing the reson is bcoz recipeServie was provided here the 
  //instance was applied to all recipe component and once we navigate away to shoppinglist taht instance was deleted and we were missing new recipe being displayed
  //to fix this provide recipeService in app.module   

})
export class RecipesComponent implements OnInit {
  //selectedRecipe:Recipes;
  //constructor(private recipeservice:RecipeService) { }
  constructor(){}
  ngOnInit() {
    // this.recipeservice.recipeSelected.subscribe(
    //   (recipe:Recipes)=>{
    //     this.selectedRecipe=recipe;
    //   }
    // )
    
  }

}
