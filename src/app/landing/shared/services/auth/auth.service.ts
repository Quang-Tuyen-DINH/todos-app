import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signOut } from "firebase/auth";
import { Observable } from 'rxjs';
import { UsersService } from '../users/users.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _loggedInEmail: string;

  get loggedInEmail(): string {
    return this._loggedInEmail;
  }

  set loggedInEmail(email: string) {
    this._loggedInEmail = email;
  }

  constructor(
    private afAuth: AngularFireAuth,
    private usersService: UsersService,
    private toastr: ToastrService
  ) { }

  signIn(email: string): Promise<any> {
    return this.usersService.checkRegistered(email).then(() => {
      if(!this.usersService.registeredEmail) {
        this.toastr.error(
          email + " has not been registered"
        )
      } else {
        const actionCodeSettings = { ...environment.actionCodeSettings };
        this.afAuth.sendSignInLinkToEmail(email, actionCodeSettings);
        return this.toastr.success(
          "Login link has been sent to " + email
        )
      }
    })
  }

  confirmSignIn(email: string, url: string): Promise<any> {
    this.setLoggedInEmail(email);
    return this.afAuth.signInWithEmailLink(email, url)
  }

  setLoggedInEmail(email: string) {
    this.loggedInEmail = email;
  }

  signOut() {
    const auth = getAuth();

    signOut(auth)
      .then(() => {
        this.loggedInEmail = "";
        this.toastr.success(
          "You signed out successfully!"
        );
      })
      .catch((error) => {})
  }

  getAuthState(): Observable<any> {
    return this.afAuth.authState;
  }
}
