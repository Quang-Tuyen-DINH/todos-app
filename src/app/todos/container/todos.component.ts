import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/landing/shared/services/auth/auth.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  constructor(
    private authService: AuthService
  ) {

  }

  ngOnInit(): void {
    
  }

  signOut() {
    this.authService.signOut();
  }
}
