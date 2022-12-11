import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent {
  @Output() addTask = new EventEmitter<string>();
  taskForm = this.fb.group({
    taskId: '',
    taskTitle: '',
    taskContent: ''
  })

  constructor(private fb: FormBuilder) { }

  onSubmit() {
    const task = {
      id: this.taskForm.value.taskId,
      title: this.taskForm.value.taskTitle,
      content: this.taskForm.value.taskContent
    }
    
    if (!this.taskForm.valid) return;
    // this.addTask.emit(task);
    this.taskForm.reset();
  }
}
