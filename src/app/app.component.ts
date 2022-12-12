import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './landing/shared/services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    public router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initializeApp();
  }

  initializeApp() {
    this.authService.getAuthState().subscribe((auth) => {
      if(!auth) {
        if(this.router.url.split('?')[0] === "/welcome") {
          return;
        }
        this.router.navigate(['']);
      }
    });
  }
}
