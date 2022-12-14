import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from '../../shared/models/task.model';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent implements OnInit {
  @Input() tasksList: Task[] = [];
  @Output() refreshList: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {
  }

  refresh() {
    this.refreshList.emit("Refreshed")
  }
}
