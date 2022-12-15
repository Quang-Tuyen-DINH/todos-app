import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../shared/services/auth/auth.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {
  url: string;
  error = null;
  emailForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.url = this.router.url;
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

  confirmSignIn() {
    this.error = null;
    this.authService.confirmSignIn(this.emailForm.controls["email"].value, this.url)
    .then(
      () => {
        this.router.navigate(['/todos']);
        this.toastr.success(
          "You signed in successfully!"
        )
      }
    )
    .catch((error) => {
      this.error = error;
    });
  }
}
