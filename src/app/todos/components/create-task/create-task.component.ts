import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/landing/shared/services/auth/auth.service';
import { TasksService } from '../../shared/services/tasks.service';
const { v4: uuidv4 } = require('uuid');

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {
  @Output() addedNewTask: EventEmitter<string> = new EventEmitter<string>();
  taskForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private tasksService: TasksService
    ) { }
  
  ngOnInit(): void {
    this.createTaskForm();
  }

  createTaskForm() {
    this.taskForm = this.fb.group({
      title: ["", [Validators.required]],
      content: ["", [Validators.required]]
    })
  }

  resetForm() {
    this.taskForm.reset();
  }

  submitTask() {
    if(this.authService.loggedInEmail) {
      const uuid = uuidv4();

      this.tasksService.addTask({
        taskId: uuid,
        email: this.authService.loggedInEmail,
        title: this.taskForm.controls["title"].value,
        content: this.taskForm.controls["content"].value
      });
      this.resetForm();
      this.addedNewTask.emit("Added");
    }
  }
}
