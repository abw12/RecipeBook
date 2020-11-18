import { formatCurrency } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Store} from '@ngrx/store';
import { Subscription } from 'rxjs';
import {Ingredient}from '../../shared/ingredients.model';
//import {ShoppingListService} from'../shopping-lits.service';
import * as ShoppingListActions from '../store/shopping-list.action';
import * as fromApp from '../../store/app.reducer';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {
  @ViewChild('f',{static:false}) ShoppingListForm:NgForm;
  subscription =new Subscription;
  editMode=false;
  //editedItmeIndex   used this before using the nrgx to get current ingredient item index as now in state we have editedIngredientItem so to avoid redundancy we are not using this approach anymore to get index from this property
  editedItem:Ingredient;

  //@Output() ingridientAdded =new EventEmitter<Ingredient>();
  
  //@ViewChild('nameInputField',{static:true}) nameInputRef:ElementRef;
  //@ViewChild('amountInputField',{static:true}) amountInputRef:ElementRef;
  constructor(
    //private shoppinglistservice:ShoppingListService,
    private store:Store<fromApp.AppState>) { }

ngOnInit(): void {
    this.subscription=this.store.select('shoppingList').subscribe(stateData=>{
      if(stateData.editedIngredientIndex > -1){
        this.editMode=true;
        this.editedItem=stateData.editedIngredient;
        this.ShoppingListForm.setValue({
          name:this.editedItem.name,
          amount:this.editedItem.amount
        })  
      }else{
        this.editMode=false;
      }
    })
    // this.subscription=this.shoppinglistservice.startedEditing.subscribe(
    //   (index:number)=>{
    //     this.editMode=true;
    //     this.editedItmeIndex=index;
    //     this.editedItem=this.shoppinglistservice.getEditingIngridient(index);
    //     this.ShoppingListForm.setValue({
    //       name:this.editedItem.name,
    //       amount:this.editedItem.amount
    //     })        
    //   }
    // )
}
  onSubmit(form:NgForm){
    //const ingName=this.nameInputRef.nativeElement.value;
    //const ingAmount=this.amountInputRef.nativeElement.value;
    const value =form.value;
    const newIngridient=new Ingredient(value.name,value.amount);
    if(this.editMode){
      //this.shoppinglistservice.updateIngredient(this.editedItmeIndex,newIngridient);
      this.store.dispatch(new ShoppingListActions.UpdateIngredient(newIngridient))
    }else{
      //this.shoppinglistservice.addIngridient(newIngridient);
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngridient))
    }
    //this.ingridientAdded.emit(newIngridient);
    form.reset();
    this.editMode=false;
  }
  onClear(){
    this.ShoppingListForm.reset();
    this.editMode=false;
    this.store.dispatch(new ShoppingListActions.StopEditing());
  }
  onDelete(){
    //this.shoppinglistservice.deleteIngredient(this.editedItmeIndex);
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onClear();
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEditing());
  }

}
