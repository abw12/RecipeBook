import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import {HeaderComponent}from './Header/header.component';
import {AppRoutingModule} from './app-routing.modules';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.modules';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import * as fromApp from './store/app.reducer';
import {AuthEffects} from './auth/store/auth.effects';
import {RecipeEffects} from './recipes/store/recipe.effects';
import{AuthModule} from './auth/auth.module';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import{MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
       
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule, 
    StoreModule.forRoot(fromApp.appReducer),  //the forRoot for storeModule expect an actionReducerMap in this case it is our function so key is any name & value is out shoppinglistreducer function
    EffectsModule.forRoot([AuthEffects,RecipeEffects]),
    StoreDevtoolsModule.instrument({logOnly:environment.production}),
    SharedModule,
    CoreModule,
    BrowserAnimationsModule,
    MatIconModule,
    AuthModule
    
    
  ],
  //providers: [],
  bootstrap: [AppComponent],
  // entryComponents:[
  //   AlertComponent     //this was required for angular version below 9
  // ]
})
export class AppModule { }
