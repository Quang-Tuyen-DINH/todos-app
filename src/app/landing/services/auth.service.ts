import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, isSignInWithEmailLink, sendSignInLinkToEmail, signInWithEmailLink, signOut } from "firebase/auth";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth
  ) {}

  public signIn(email: string): Promise<any> {
    const actionCodeSettings = { ...environment.actionCodeSettings };
    return this.afAuth.sendSignInLinkToEmail(email, actionCodeSettings);
  }

  // public confirmSignIn(email: string, url: string): Promise<any> {
  //   const auth = getAuth();
    
  //   if(isSignInWithEmailLink(auth, window.location.href)) {
  //     let email = window.localStorage.getItem("emailForSignIn");

  //     if(!email) {
  //       email = window.prompt("Please provide your email for confirmation");
  //     } else {
  //       signInWithEmailLink(auth, email, window.location.href)
  //         .then((result) => {
  //           window.localStorage.removeItem("emailForSignIn");
  //         })
  //         .catch((error) => {})
  //     }
  //   }
  // }

  public confirmSignIn(email: string, url: string): Promise<any> {
    return this.afAuth.signInWithEmailLink(email, url);
  }

  public signOut() {
    const auth = getAuth();

    signOut(auth)
      .then(() => {})
      .catch((error) => {})
  }

  public getAuthState(): Observable<any> {
    return this.afAuth.authState;
  }
}
