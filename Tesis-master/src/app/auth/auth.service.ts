import { Subject } from 'rxjs';
//import { from } from 'rxjs';

import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UIService } from '../shared/ui.service';


@Injectable()
export class AuthService{
    authChange = new Subject<boolean>();
    private isAuthenticated = false;
    
    constructor(private router: Router, 
        private afAuth: AngularFireAuth, private snackbar: MatSnackBar, private uiService: UIService
        ){

    }

    registerUser(authData: AuthData){
        this.uiService.loadinStateChanged.next(true);
        this.afAuth.createUserWithEmailAndPassword(
            authData.email, 
            authData.password
            ).then(result => {
               this.uiService.loadinStateChanged.next(false);
               console.log(result); 
               this.authSuccessfully();
               this.authChange.next(true);
               this.uiService.showSnackbar("User created successfully", null, 3000);


            })
            .catch(error => {
                this.uiService.loadinStateChanged.next(false);
                console.log(error);
                this.uiService.showSnackbar(error.message, null, 3000);

            });

    }

    login(authData: AuthData){
        this.uiService.loadinStateChanged.next(true);
        this.afAuth.signInWithEmailAndPassword(
            authData.email,
            authData.password
        ).then(result => {
            this.uiService.loadinStateChanged.next(false);
            console.log(result);
            this.authSuccessfully();
            this.authChange.next(true);
         })
         .catch(error => {
            this.uiService.loadinStateChanged.next(false);
             console.log(error);             
             this.uiService.showSnackbar(error.message, null, 3000);
         });
    }

    logout(){
        this.isAuthenticated = false;
        this.authChange.next(false);
        this.router.navigate(['/']);

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