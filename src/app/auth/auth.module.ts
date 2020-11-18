import { CommonModule } from '@angular/common';
import {NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';

import { AuthComponent } from './auth.component';
import{SharedModule} from '../shared/shared.module';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { environment } from '../../environments/environment';



@NgModule({
    declarations:[AuthComponent],
    imports:[
        CommonModule,
        FormsModule,
        RouterModule.forChild([
        {
            path:'',
            component:AuthComponent
        }
        ]),
        SharedModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        AngularFirestoreModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
    ]
})
export class AuthModule{}