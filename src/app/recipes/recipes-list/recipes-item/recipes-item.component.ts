import { Component, OnInit, Input } from '@angular/core';
import { Recipes } from '../../recipes.model';
//import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipes-item',
  templateUrl: './recipes-item.component.html',
  styleUrls: ['./recipes-item.component.css']
})
export class RecipesItemComponent implements OnInit {
  @Input() recipesItem:Recipes;
  @Input() index:number;
  //@Output() selectedItem=new EventEmitter<void>();

  constructor(
    //private recipeservice:RecipeService
    ) { }

  ngOnInit(): void {
  }

  // selectedRecipeItem(){
  //     this.selectedItem.emit();
  // }
// selectedRecipeItem(){
//   this.recipeservice.recipeSelected.emit(this.recipesItem);
//   }


}
