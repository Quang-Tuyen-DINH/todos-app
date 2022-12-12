import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  usersRef: AngularFireList<any>;
  userRef: AngularFireObject<any>;
  private _registeredEmail: boolean;

  get registeredEmail(): boolean {
    return this._registeredEmail;
  }

  set registeredEmail(check: boolean) {
    this._registeredEmail = check;
  }

  constructor(
    private db: AngularFireDatabase
  ) { }

  public checkRegistered(email: string): Promise<any> {
    return this.db.database.ref("users-list").orderByChild("email").equalTo(email).once("value").then((snapshot) => {
      this.registeredEmail = snapshot.exists();
    });
  }

  public addUser(user: User) {
    this.usersRef.push({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName
    });
  }

  public getUser(id: string) {
    this.userRef = this.db.object("users-list/" + id);
    return this.userRef;
  }

  public getUsersList() {
    this.usersRef = this.db.list("users-list");
    return this.usersRef;
  }

  public updateUser(user: User) {
    this.userRef.update({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName
    })
  }

  public deleteUser(id: string) {
    this.userRef = this.db.object("users-list/" + id);
    this.userRef.remove();
  }
}
