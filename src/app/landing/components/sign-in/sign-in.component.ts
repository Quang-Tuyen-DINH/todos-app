import { Component, OnInit  } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, isSignInWithEmailLink, sendSignInLinkToEmail, signInWithEmailLink, signOut } from "firebase/auth";
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  user: Observable<any>;
  email: any;
  emailSent = false;
  errorMessage: string;

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router
  ) {}

  ngOnInit() {
    this.user = this.afAuth.authState;
    const url = this.router.url;
    if (url.includes("signIn")) {
      this.confirmSignIn();
    }
  }

  sendEmailLink() {
    const actionCodeSettings = { ...environment.actionCodeSettings }
    const auth = getAuth();
    sendSignInLinkToEmail(auth, this.email, actionCodeSettings)
      .then(() => {
        window.localStorage.setItem("emailForSignIn", this.email);
        this.emailSent = true;
      })
      .catch((error) => {
        this.errorMessage = error.message;
      })
  }

  confirmSignIn() {
    const auth = getAuth();
    
    if(isSignInWithEmailLink(auth, window.location.href)) {
      let email = window.localStorage.getItem("emailForSignIn");

      if(!email) {
        email = window.prompt("Please provide your email for confirmation");
      } else {
        signInWithEmailLink(auth, email, window.location.href)
          .then((result) => {
            window.localStorage.removeItem("emailForSignIn");
            console.log(result.user);
          })
          .catch((error) => {})
      }
    }
  }

  logout() {
    const auth = getAuth();
    signOut(auth).then(() => {

    }).catch((error) => {})
  }
}
