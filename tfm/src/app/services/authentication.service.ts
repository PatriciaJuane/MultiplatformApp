import { Injectable, NgZone } from '@angular/core';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { User } from '../models/User';
import firebase from '@firebase/app';

@Injectable()
export abstract class AuthService {

    constructor() {}

    // Firebase Google Sign-in
    public SigninWithGoogle(): any {
    }

    // Firebase Logout
    public SignOut(): any {
    }

    public getCurrentUser(): any {
    }

    public getIsLoggedIn(): any {
    }
}
