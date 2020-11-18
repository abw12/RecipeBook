import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from './store/app.reducer';
import * as AuthAction from '../app/auth/store/auth.action';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(
    //private authService:AuthService
    private store:Store<fromApp.AppState>
    ){}
  // loadedScreen='recipe';

  // onNavigate(currentScreen:string){
  //   this.loadedScreen=currentScreen;
  // }
  ngOnInit(){
    //this.authService.autoLogin();
    this.store.dispatch(new AuthAction.AuthLogin());
  }
} 
