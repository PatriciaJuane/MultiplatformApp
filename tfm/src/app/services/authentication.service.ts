import { Injectable, NgZone } from '@angular/core';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../models/User';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    user: User;

    constructor(
        public router: Router,
        public ngZone: NgZone,
        public afAuth: AngularFireAuth
    ) {
        this.afAuth.authState.subscribe(user => {
            this.user = user;
        });
    }

    // Firebase SignInWithPopup
    OAuthProvider(provider) {
        return this.afAuth.auth.signInWithPopup(provider)
            .then((res) => {
                this.ngZone.run(() => {
                    this.router.navigate(['/user']);
                })
            }).catch((error) => {
                window.alert(error);
            });
    }

    // Firebase Google Sign-in
    SigninWithGoogle() {
        return this.OAuthProvider(new auth.GoogleAuthProvider())
            .then(res => {
                this.router.navigate(['/user']);
                console.log('Successfully logged in!');
            }).catch(error => {
                console.log(error);
            });
    }

    // Firebase Logout
    SignOut() {
        this.user = null;
        return this.afAuth.auth.signOut().then(() => {
            this.router.navigate(['/login']);
        });
    }

    getCurrentUser() {
      return this.afAuth.auth.currentUser;
    }

    get isLoggedIn(): boolean {
        return (this.user !== null) ? true : false;
    }

}
