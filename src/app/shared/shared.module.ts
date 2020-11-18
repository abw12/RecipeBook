import { NgModule } from '@angular/core';

import{LoadingSpinnerComponent} from './loading-spinner/loading-spinner.component';
import {DropdownDirective} from './dropdown.directive';
import{AlertComponent} from './alert/alert.component';
import {PlaceHolderDirective}from './placeholder/placeholder.directive';
import { CommonModule } from '@angular/common';


@NgModule({
    declarations:[
        LoadingSpinnerComponent,
        AlertComponent,
        PlaceHolderDirective,
        DropdownDirective
    ],
    imports:[
        CommonModule
    ],
    exports:[
        LoadingSpinnerComponent,
        AlertComponent,
        PlaceHolderDirective,
        DropdownDirective,
        CommonModule
    ]

})
export class SharedModule{}