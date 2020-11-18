import {NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecipeStartComponent } from '../recipe-start/recipe-start.component';
import { RecipeEditComponent } from '../recipes/recipe-edit/recipe-edit.component';
import { RecipesDetailsComponent } from '../recipes/recipes-details/recipes-details.component';
import {RecipesComponent} from "../recipes/recipes.component";
import {RecipeRsolverService} from '../recipes/recipe-resolver.service';
import{AuthGuard} from '../auth/authGuard.service';

const routes:Routes=[
    {
        path:'',
        component:RecipesComponent,
        canActivate:[AuthGuard],
        children:[
          {
            path:'',
            component:RecipeStartComponent
          },
          {
            path:'new',
            component:RecipeEditComponent
          },
          {
            path:':id',
            component:RecipesDetailsComponent,
            resolve:[RecipeRsolverService]
          },
          {
            path:':id/edit',
            component:RecipeEditComponent,
            resolve:[RecipeRsolverService]
          }
        ]
      }
]
@NgModule({
    imports:[
        RouterModule.forChild(routes)
    ],
    exports:[RouterModule]
})
export class RecipesRoutingModule {}