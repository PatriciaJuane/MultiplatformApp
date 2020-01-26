import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { AuthService } from './authentication.service';
const auth = require('nativescript-plugin-firebase/app');
const firebase = require('nativescript-plugin-firebase');

@Injectable({
    providedIn: 'root'
})
export class AuthMobileService extends AuthService {
    user: User;

    constructor(
        public router: Router
    ) {
        super();
        firebase.init({
            onAuthStateChanged: function (data) {
                console.log(data.loggedIn ? 'Logged in to firebase' : 'Logged out from firebase');
                if (data.loggedIn) {
                    console.log('users email address: ' + (data.user.email ? data.user.email : 'N/A'));
                }
            }
        }).then((instance) => {
            console.log('[*] Firebase was successfully initialised');
        }, (error) => {
            console.log('[*] Huston we have an initialization error: ' + error);
        });
    }

    // Firebase Google Sign-in
    SigninWithGoogle() {
        console.log('Entered signinwith Google');
        firebase.login({
            type: firebase.LoginType.GOOGLE,
        }).then((result) => {
            console.log('[*] Google Auth Response: ' + JSON.stringify(result));
            this.user = result;
            this.router.navigate(['/user']);
        }, (errorMessage) => {
            console.log('[*] Google Auth Error: ' + errorMessage);
        });
    }

    // Firebase Logout
    SignOut() {
        this.user = null;
        return firebase.logout({
            type: firebase.LoginType.GOOGLE,
        }).then((result) => {
            this.router.navigate(['/login']);
        }, (errorMessage) => {
            console.log('[*] Google Auth Error: ' + errorMessage);
        });
    }

    getCurrentUser() {
        return firebase.getCurrentUser();
    }

    public getIsLoggedIn(): boolean {
        return (this.user !== null) ? true : false;
    }

}
