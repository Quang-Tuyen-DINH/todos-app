import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/landing/shared/services/auth/auth.service';
import { Task } from '../shared/models/task.model';
import { TasksService } from '../shared/services/tasks.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();
  tasksList: Task[] = []

  constructor(
    private tasksService: TasksService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getTasksList();
  }

  getTasksList() {
    this.subscriptions.add(
      this.authService.getAuthState().subscribe((auth) => {
        if(auth) {
          this.authService.loggedInEmail = auth.multiFactor.user.email;
      
          this.tasksService.getTasksList().then(() => {
            this.tasksList = this.tasksService.tasksList;
          });
        }
      })
    )
  }

  signOut() {
    this.authService.signOut();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
