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
    private usersService: UsersService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
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
      firstName: ["", [
        Validators.required,
        Validators.pattern("[a-zA-Z][a-zA-Z ]+")
      ]],
      lastName: ["", [
        Validators.required,
        Validators.pattern("[a-zA-Z][a-zA-Z ]+")
      ]]
    })
  }

  resetForm() {
    this.userForm.reset();
  }

  submitUserData() {
    return this.usersService.checkRegistered(this.userForm.controls["email"].value).then(() => {
      if(this.usersService.registeredEmail) {
        this.toastr.error(
          this.userForm.controls["email"].value + " has been registered"
        )
        this.resetForm();
      } else {
        this.usersService.addUser(this.userForm.value);
        this.resetForm();
      }
    })
  }
}
