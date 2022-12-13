import { Component, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../shared/services/auth/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  email: string;
  emailForm: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.createEmailForm();
  }

  createEmailForm() {
    this.emailForm = this.fb.group({
      email: [
        "",
        [
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
        ]
      ]
    })
  }

  signIn() {
    this.authService.signIn(this.emailForm.controls["email"].value)
      .then(() => {})
      .catch((error) => {
        this.toastr.error(
          error
        )
      });

    this.resetForm();
  }

  resetForm() {
    this.emailForm.reset();
  }
}
