import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule,Routes} from '@angular/router';



const appRoutes:Routes=[
  {path:'',redirectTo:'/recipes',pathMatch:'full'} , //since every path has an empty path so this will throw an error redicting it to recipes path ,but pathMatch:full can be used to tell angular that use full path instead of just prefix
  // {
  //   path:'recipes',
  //   loadChildren:'./recipes/recipe.module#RecipeModule'
  // }  
  {
    path:'recipes',
    loadChildren:()=> import('./recipes/recipe.module')
    .then(m=>m.RecipeModule)                              //this is the latest approach to use the lazy loading feature which gives the path to the class & component which we want to lazy load 
  },
  {
    path:'shopping-list',
    loadChildren:()=> import('./shopping-list/shopping-list.module')
    .then(m => m.ShoppingListModule)
  },
  {
    path:'auth',
    loadChildren:()=> import('./auth/auth.module')
    .then(m=> m.AuthModule) 
  }

]

@NgModule({
    imports:[ 
  RouterModule.forRoot(appRoutes,{preloadingStrategy:PreloadAllModules})
],
exports:[RouterModule]
})
export class AppRoutingModule {     
}