import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodosComponent } from './container/todos.component';
import { TaskComponent } from './components/task/task.component';
import { TasksListComponent } from './components/tasks-list/tasks-list.component';
import { TodosRoutingModule } from './todos-routing.module';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    TodosComponent,
    TaskComponent,
    TasksListComponent,
    CreateTaskComponent
  ],
  imports: [
    CommonModule,
    TodosRoutingModule,
    ReactiveFormsModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatInputModule,
  ]
})
export class TodosModule { }
