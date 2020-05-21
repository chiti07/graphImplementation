import { Subject } from 'rxjs';
//import { from } from 'rxjs';

import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {AngularFireAuth } from '@angular/fire/auth';


@Injectable()
export class AuthService{
    authChange = new Subject<boolean>();
    private isAuthenticated = false;
    
    constructor(private router: Router, 
        private afAuth: AngularFireAuth 
        ){

    }

    registerUser(authData: AuthData){
        this.afAuth.createUserWithEmailAndPassword(
            authData.email, 
            authData.password
            ).then(result => {
               console.log(result); 
            })
            .catch(error => {
                console.log(error);
            });
        this.authSuccessfully();
        this.authChange.next(true);

    }

    login(authData: AuthData){
        this.afAuth.signInWithEmailAndPassword(
            authData.email,
            authData.password
        ).then(result => {
            console.log(result); 
         })
         .catch(error => {
             console.log(error);
         });
       
        this.authSuccessfully();
        this.authChange.next(true);



    }

    logout(){
        this.authChange.next(false);
        this.router.navigate(['/login']);
        this.isAuthenticated = true;
    }

    isAuth(){
        return this.isAuthenticated;
    }

    private authSuccessfully(){
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/dashboard']);
    }
}