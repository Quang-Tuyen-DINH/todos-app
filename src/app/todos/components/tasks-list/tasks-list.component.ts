import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent {
  @Input() tasks: any[] = [];
  @Output() completed = new EventEmitter<any>();
}
