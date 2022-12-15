import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  usersRef: AngularFireList<any>;
  userRef: AngularFireObject<any>;
  private _registeredEmail: boolean;
  private _userToBeRemoved: string;

  get registeredEmail(): boolean {
    return this._registeredEmail;
  }

  set registeredEmail(check: boolean) {
    this._registeredEmail = check;
  }

  get userToBeRemoved(): string {
    return this._userToBeRemoved;
  }

  set userToBeRemoved(key: string) {
    this._userToBeRemoved = key;
  }

  constructor(
    private db: AngularFireDatabase,
    private toastr: ToastrService
  ) { }

  checkRegistered(email: string): Promise<any> {
    return this.db.database.ref("users-list")
      .orderByChild("email")
      .equalTo(email)
      .once("value")
      .then((snapshot) => {
        this.registeredEmail = snapshot.exists();
      });
  }

  addUser(user: User) {
    this.usersRef = this.db.list("users-list");
    this.usersRef.push(user);
    this.toastr.success(
      user.firstName + " successfully signed up!"
    )
  }

  getUserToBeRemovedKey(email: string): Promise<any> {
    return this.db.database.ref("users-list")
      .orderByChild("email")
      .equalTo(email)
      .once("value")
      .then((snapshot) => {
          const value = snapshot.val();
          if(value){
            this.userToBeRemoved = Object.keys(value)[0];
          }
      })
  }

  getUsersList() {
    this.usersRef = this.db.list("users-list");
    return this.usersRef;
  }

  updateUser(user: User) {
    this.userRef.update(user)
  }

  removeUser(email: string) {
  return this.checkRegistered(email).then(() => {
    if(this.registeredEmail) {
      this.getUserToBeRemovedKey(email).then(() => {
        const key: string = this.userToBeRemoved;
        if(key !== "") {
          this.userRef = this.db.object("users-list/" + key);
          this.userRef.remove();
          return this.toastr.success(
            "User with email " + email + " has been removed"
          )
        }
      });
    } else {
      return this.toastr.error(
        "User with email " + email + " has not been registered"
      )
    }
  })
  }
}
