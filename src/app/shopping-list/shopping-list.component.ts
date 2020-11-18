import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import {Ingredient}from '../shared/ingredients.model';
//import { ShoppingListService } from './shopping-lits.service';
import{Store} from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as shoppingListActions from '../shopping-list/store/shopping-list.action';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit,OnDestroy {
  ingredientsArray:Observable<{ingredients:Ingredient[]}> ;
  //private igSubscription:Subscription;
  //ingredientsArray:Ingredient[];
  constructor(
    //private shopinglistservice:ShoppingListService,
    private store:Store<fromApp.AppState>
  ) {}

  ngOnInit(){
    this.ingredientsArray= this.store.select('shoppingList');     //the ngrx automatically subscribe to this observable & unsubscribe from it as well
    // this.ingredientsArray=this.shopinglistservice.getIngridient();
    // this.igSubscription=this.shopinglistservice.ingridientAdded.subscribe(
    //    (ingridients:Ingredient[])=>{
    //      this.ingredientsArray=ingridients;
    //    }
    //  )
  }
  onEditItem(index:number){
    //this.shopinglistservice.startedEditing.next(index);
    this.store.dispatch(new shoppingListActions.StartEditing(index));
  }
  ngOnDestroy(){
    //this.igSubscription.unsubscribe();   //this is used to destroy Subject after using it 
  }

}
