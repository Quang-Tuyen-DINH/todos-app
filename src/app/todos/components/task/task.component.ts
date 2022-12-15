import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/landing/shared/services/auth/auth.service';
import { Task } from '../../shared/models/task.model';
import { TasksService } from '../../shared/services/tasks.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  @Input() task: Task;
  @Output() updatedTask: EventEmitter<string> = new EventEmitter<string>();
  @Output() removedTask: EventEmitter<string> = new EventEmitter<string>();
  taskForm: FormGroup;
  modifiable: boolean = false;

  constructor(
    private authService: AuthService,
    private tasksService: TasksService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.createTaskForm();
  }

  createTaskForm() {
    this.taskForm = this.fb.group({
      title: [this.task.title, [Validators.required]],
      content: [this.task.content, [Validators.required]]
    })
  }

  resetForm() {
    this.taskForm.reset();
  }

  updateTask() {
    if(this.authService.loggedInEmail) {
      this.tasksService.updateTask({
        taskId: this.task.taskId,
        email: this.task.email,
        title: this.taskForm.controls["title"].value,
        content: this.taskForm.controls["content"].value
      });
      this.resetForm();
      this.modifiable = false;
      this.updatedTask.emit("Updated");
    }
  }

  removeTask() {
    this.tasksService.removeTask(this.task);
    this.removedTask.emit("Removed");
  }
}
