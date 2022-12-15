import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './landing/shared/services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();

  constructor(
    public router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initializeApp();
  }

  initializeApp() {
    this.subscriptions.add(
      this.authService.getAuthState().subscribe((auth) => {
        if(!auth) {
          if(this.router.url.split("?")[0] === "/welcome" || this.router.url.split("?")[0] === "/landing") {
            return;
          }
          this.router.navigate([""]);
        } else {
          if(this.router.url.split("?")[0] === "/welcome" || this.router.url.split("?")[0] === "/landing") {
            this.router.navigate(["/todos"]);
          }
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
