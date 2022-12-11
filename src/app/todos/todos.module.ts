import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodosComponent } from './container/todos.component';
import { TaskComponent } from './components/task/task.component';
import { TasksListComponent } from './components/tasks-list/tasks-list.component';
import { TodosRoutingModule } from './todos-routing.module';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { ReactiveFormsModule } from '@angular/forms';


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
    ReactiveFormsModule
  ]
})
export class TodosModule { }
