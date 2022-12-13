import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../../shared/services/users/users.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit{
  userForm: FormGroup;

  constructor(
    private usersApi: UsersService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.usersApi.getUsersList();
    this.createUserForm();
  }

  createUserForm() {
    this.userForm = this.fb.group({
      email: [
        "",
        [
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
        ]
      ],
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]]
    })
  }

  resetForm() {
    this.userForm.reset();
  }

  submitUserData() {
    return this.usersApi.checkRegistered(this.userForm.controls["email"].value).then(() => {
      if(this.usersApi.registeredEmail) {
        this.toastr.error(
          this.userForm.controls["email"].value + " has been registered"
        )
        this.resetForm();
      } else {
        this.usersApi.addUser(this.userForm.value);
        this.toastr.success(
          this.userForm.controls["firstName"].value + " successfully signed up!"
        )
        this.resetForm();
      }
    })
  }
}
