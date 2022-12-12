import { Component, OnInit  } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  email: string;
  emailSent = false;
  error = null;

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  signIn() {
    this.emailSent = false;
    this.error = null;
    this.authService.signIn(this.email)
      .then(() => {
        this.emailSent = true;
      })
      .catch((error) => {
        this.error = error;
      });
  }
}
