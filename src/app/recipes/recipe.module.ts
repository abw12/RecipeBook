import {NgModule} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import{RecipesRoutingModule} from './recipes-routing.module';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import{MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { AngularFireFunctionsModule } from '@angular/fire/functions';



import { RecipesComponent } from '../recipes/recipes.component';
import { RecipesListComponent } from '../recipes/recipes-list/recipes-list.component';
import { RecipesDetailsComponent } from '../recipes/recipes-details/recipes-details.component';
import { RecipesItemComponent } from '../recipes/recipes-list/recipes-item/recipes-item.component';
import { RecipeStartComponent } from '../recipe-start/recipe-start.component';
import { RecipeEditComponent } from '../recipes/recipe-edit/recipe-edit.component';
import {FilterByNamePipe} from './recipes-list/filterByName.pipe';
import {SharedModule } from '../shared/shared.module';
import { environment } from '../../environments/environment';




@NgModule({
declarations:[
    RecipesComponent,
    RecipesListComponent,
    RecipesDetailsComponent,
    RecipesItemComponent,
    RecipeStartComponent,
    RecipeEditComponent,
    FilterByNamePipe
],
imports:[
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    RecipesRoutingModule,
    SharedModule,
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireFunctionsModule,
]
})
export class RecipeModule{}