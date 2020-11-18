import {Component,ComponentFactoryResolver, OnDestroy, OnInit,ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {Store} from '@ngrx/store';

import {AuthService} from'./auth.service';
import {AlertComponent} from '../shared/alert/alert.component';
import { PlaceHolderDirective } from '../shared/placeholder/placeholder.directive';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from  './store/auth.action';

@Component({
    selector:'app-auth',
    templateUrl:'./auth.component.html',
    styleUrls:['./auth.component.css']
})
export class AuthComponent implements OnInit,OnDestroy{
    hide=true;
    isLoggedIn=true;
    isLoading=false;
    errorMsg=null;
    closeSub:Subscription;
    storeSub:Subscription;
    @ViewChild(PlaceHolderDirective,{static:false}) alertHost:PlaceHolderDirective;

    constructor(private authService:AuthService,
        private router:Router,
        private alertComponent:AlertComponent,
        private componentFactoryResolver:ComponentFactoryResolver,
        private store:Store<fromApp.AppState>){}
    
    ngOnInit(){
       this.storeSub= this.store.select('auth').subscribe(authState=>{
            this.isLoading=authState.Loading;
            this.errorMsg=authState.authError;
            if(this.errorMsg){
                this.showErrorAlert(this.errorMsg);
            }
        })
    }


    onSwtichButtonClick(){
        this.isLoggedIn=!this.isLoggedIn;
    }

    onSubmit(form:NgForm){
        if(!form.valid){
            return;
        }
        const email=form.value.email;
        const password=form.value.password;
        const firstName=form.value.FirstName;
        
        //let authObservable:Observable<AuthResponseData>;

       // this.isLoading=true;
        if(this.isLoggedIn){
            //authObservable =this.authService.login(email,password)
            this.store.dispatch(new AuthActions.Login_Start({email:email,password:password}));
        }else{
           // authObservable= this.authService.signup(email,password)
           this.store.dispatch(new AuthActions.SignupStart({email:email,password:password,firstName:firstName}));
            //this.authService.addContactTODatabase(email,firstName);
        }

        // authObservable.subscribe(resData=>{   //we outsource the subcribe logic coz both login & signup uses same logic to subscribe so avoid repeatative code we are stroing subscribe logic in one observable variable
        //     console.log(resData);
        //     this.isLoading=false;
        //     this.router.navigate(['/recipes']);
        // },errMessage=>{
        //     console.log(errMessage);
        //     this.errorMsg=errMessage;
        //     this.showErrorAlert(errMessage);
        //     this.isLoading=false;
        // })

        form.reset();
    }
    HandleAlert(){
        //this.errorMsg=null;
        this.store.dispatch(new AuthActions.ClearError());
    }

    ngOnDestroy(){
        if(this.closeSub){
            this.closeSub.unsubscribe();
        }
        if(this.storeSub){
            this.storeSub.unsubscribe();
        }
    }

    
    
    //this is an alternative approach to show alert error messae using programatically creating the component ,
    //this approach is rarely used and it is much tedious task as we have to create a component on our own using componentFactoryResolver & use placeholder kind of helper to let known the angular where we need to put the component in the dom(template)
    //ngIf is much better aproach to implement such scenario as angular create the component underhood   
    private showErrorAlert(message:string){
        const alerComFactory=this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
        
        const hostViewContainerHost=this.alertHost.viewContainerRef;
        hostViewContainerHost.clear();
        const componentRef=hostViewContainerHost.createComponent(alerComFactory);

        componentRef.instance.message=message;
        this.closeSub=componentRef.instance.close.subscribe(()=>{
            this.closeSub.unsubscribe();
            hostViewContainerHost.clear();
        })
    }
}