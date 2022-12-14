import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../shared/services/auth/auth.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {
  email: string;
  url: string;
  error = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.url = this.router.url;
  }

  confirmSignIn() {
    this.error = null;
    this.authService.confirmSignIn(this.email, this.url)
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
