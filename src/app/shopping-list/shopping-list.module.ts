import {NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'
import {MatCardModule} from '@angular/material/card';

import { ShoppingListComponent } from '../shopping-list/shopping-list.component';
import { ShoppingEditComponent } from '../shopping-list/shopping-edit/shopping-edit.component';
import {SharedModule } from '../shared/shared.module';
import { AuthGuard } from '../auth/authGuard.service';
;
@NgModule({
    declarations:[
        ShoppingListComponent,
        ShoppingEditComponent
    ],
    imports:[
        FormsModule,
        RouterModule.forChild([
            {
                path:'',
                component:ShoppingListComponent,
                canActivate:[AuthGuard]
              }
        ]),
        SharedModule,
        MatCardModule
    ]
})
export class ShoppingListModule{}