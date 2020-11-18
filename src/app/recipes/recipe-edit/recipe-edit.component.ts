import { CompileShallowModuleMetadata } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
//import { RecipeService } from '../recipe.service';
//import { Recipes } from '../recipes.model';

import * as RecipeActions from '../store/recipe.actions';
import * as fromApp from '../../store/app.reducer';
import {map} from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit , OnDestroy {
  id:number;
  editMode=false;
  recipeForm:FormGroup;
  private storeSub:Subscription;

  constructor(
    private route:ActivatedRoute,
    //private recipeService:RecipeService,
    private router:Router,
    private store:Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.route.params
    .subscribe(
      (params:Params)=>{
        this.id=+params['id'];
        this.editMode=params['id'] != null;
        if(this.editMode){
          console.log("EditMode is : "+ this.editMode);
        }else{
          console.log("EditMode is :"+ this.editMode)
        }
        this.initForm();
      }
    )
  }
  onSubmit(){
    // const newRecipe= new Recipes(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingredients']);        //we can skip this part of saving latest values in new constant & simply pass the recipeForm object to the method as object stored here should have a valid format as we already defined the format in reactiveForm 
    if(this.editMode){
     // this.recipeService.updateRecipe(this.id,newRecipe); 
      //this.recipeService.updateRecipe(this.id,this.recipeForm.value);  //simply pass the Form object
      this.store.dispatch(new RecipeActions.UpdateRecipe(
        {
          index:this.id,
          newRecipe:this.recipeForm.value
        })
      );
    }else{
      //this.recipeService.addRecipe(this.recipeForm.value);
      this.store.dispatch(new RecipeActions.AddRecipe(this.recipeForm.value));
    }
    this.onCancel();                                //calling onCancle method to navigate away from submit form view after saing the changes
  }
  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredient')).push(
      new FormGroup({
        'name':new FormControl(null,Validators.required),
        'amount':new FormControl(null,[
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    )
  }

  onDeleteIngredient(index:number){
    (<FormArray>this.recipeForm.get('ingredient')).removeAt(index);
  }
  onCancel(){
    this.router.navigate(['../'],{relativeTo:this.route});  //to navigate away from current view after clicking on cancel button
  }
  ngOnDestroy(){
    if(this.storeSub){
      this.storeSub.unsubscribe();
    }
  }


  private initForm(){
    let recipeName='';
    let imagePath='';
    let description='';
    let recipeIngredientArray=new FormArray([]);

    if(this.editMode){
      //const recipe=this.recipeService.getRecipeId(this.id);
      this.storeSub=this.store.select('recipes')
      .pipe(map(recipeState=>{
        return recipeState.recipes.find((recipe,index)=>{
          return index === this.id;
        })
      })).subscribe(recipe=>{
        recipeName=recipe.name;
        imagePath=recipe.imagePath;
        description=recipe.description;
        if(recipe['ingredient']){
          for(let ingredient of recipe.ingredient){
            recipeIngredientArray.push(
              new FormGroup({
                'name':new FormControl(ingredient.name,Validators.required),
                'amount':new FormControl(ingredient.amount,[
                  Validators.required,
                  Validators.pattern(/^[1-9]+[0-9]*$/)
                ])
              })
            );
          }
        }
      }) 
    }

    this.recipeForm=new FormGroup({
      'name':new FormControl(recipeName,Validators.required),
      'imagePath':new FormControl(imagePath,Validators.required),
      'description':new FormControl(description,Validators.required),
      'ingredient':recipeIngredientArray
    });
  }
  get ingredientsControls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredient')).controls;
  }

}
