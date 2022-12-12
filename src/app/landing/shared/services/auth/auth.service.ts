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
  constructor(
    private afAuth: AngularFireAuth,
    private usersApi: UsersService,
    private toastr: ToastrService
  ) {}

  public signIn(email: string): Promise<any> {
    return this.usersApi.checkRegistered(email).then(() => {
      if(!this.usersApi.registeredEmail) {
        this.toastr.error(
          email + " has not been registered"
        )
      } else {
        const actionCodeSettings = { ...environment.actionCodeSettings };
        return this.afAuth.sendSignInLinkToEmail(email, actionCodeSettings);
      }
    })
  }

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
