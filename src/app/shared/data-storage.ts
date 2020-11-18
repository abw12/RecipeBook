// import {Injectable} from '@angular/core';
// import {HttpClient} from '@angular/common/http';

// import {RecipeService} from '../recipes/recipe.service';
// import { Recipes } from '../recipes/recipes.model';
// import{ map,tap} from 'rxjs/operators';
// import { Store } from '@ngrx/store';
// import  * as fromApp from '../store/app.reducer';
// import * as RecipesAction from '../recipes/store/recipe.actions';

// @Injectable({providedIn:'root'})
// export class DataStorageService{
// constructor(private http:HttpClient,
//             private recipeService:RecipeService,
//             private store:Store<fromApp.AppState>){}

//     storeDataToFireBase(){
//         const recipes=this.recipeService.getRecipe();
//         this.http.put("https://ng-recipe-book-71504.firebaseio.com/recipes.json",recipes)
//         .subscribe(response=>{
//             console.log(response);
//         })
//     }

//     fetchDataFromFireBase(){
//         //here there are two observables 1st user & the the fetch http get request to send the token in params to firebase
//         //on user observable instead of calling subscribe we are using pipe method and using take operator which take paramter as maximum number of emit
//         //so take will return 1 instance of user observable after that it will complete & unsubsribe on its own ,now we have access to token since we got user data from firebase 
//         //next exhaustMap opearator,the aim of exhaustMap operator is to take a value from a stream & map it to inner observable,here inner observable is http get request  
//         //since we are inside pipe we can use operator like map & tap to perform operation on response data
//         //we moved this logic of take & exhaustMap in the authInterceptor class as we need same logic of applying the token to outgoing request in both fetch & store data method so its better to centralized the code so that inetrceptor will be applied to both request 
//         return  this.http.get<Recipes[]>("https://ng-recipe-book-71504.firebaseio.com/recipes.json")
//         .pipe(map(recipes=>{
//             return recipes.map(recipe=>{
//                 return {
//                     ...recipe,
//                     ingredient:recipe.ingredient ? recipe.ingredient : []
//                 }; //here we are looping over resonse we get from firebase  using rxjs map operator & then over that response again we use javascript map loop to check if ingredient array is empty or not using ternary operator(spread ... operaor is used to make copy of existing data received from server) ,if empty then store empty array  
//             })
//         }),
//         tap(recipes=>{
//             console.log(recipes);
//             //this.recipeService.setRecipes(recipes);
//             this.store.dispatch(new RecipesAction.SetRecipes(recipes));
//         })
//         )
//     }


// }