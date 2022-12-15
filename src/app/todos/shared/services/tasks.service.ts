import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/landing/shared/services/auth/auth.service';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  tasksRef: AngularFireList<any>;
  taskRef: AngularFireObject<any>;
  private _selectedTaskKey: string;
  private _tasksList: Task[];

  get selectedTaskKey(): string {
    return this._selectedTaskKey;
  }

  set selectedTaskKey(taskKey: string) {
    this._selectedTaskKey = taskKey;
  }

  get tasksList(): Task[] {
    return this._tasksList;
  }

  set tasksList(tasks: Task[]) {
    this._tasksList = tasks;
  }

  constructor(
    private db: AngularFireDatabase,
    private toastr: ToastrService,
    private authService: AuthService
  ) { }

  addTask(task: Task) {
    this.tasksRef = this.db.list("tasks-list/");
    this.tasksRef.push(task);
    this.toastr.success(
      "Task " + task.title + " has been successfully added!"
    )
  }

  getTaskKey(taskId: string): Promise<any> {
    return this.db.database.ref("tasks-list")
      .orderByChild("taskId")
      .equalTo(taskId)
      .once("value")
      .then((snapshot) => {
        const value = snapshot.val();
        if(value) {
          this.selectedTaskKey = Object.keys(value)[0];
        }
      })
  }

  getTasksList(): Promise<any> {
    return this.db.database.ref("tasks-list")
      .orderByChild("email")
      .equalTo(this.authService.loggedInEmail)
      .once("value")
      .then((snapshot) => {
        const tempValue = snapshot.val();
        this.tasksList = Object.keys(tempValue).map(key => {
          return tempValue[key];
        })
      })
  }

  updateTask(task: Task) {
    return this.getTaskKey(task.taskId).then(() => {
      const taskKey: string = this.selectedTaskKey;
      if(taskKey !== "") {
        this.taskRef = this.db.object("tasks-list/" + taskKey);
        this.taskRef.update(task);
        return this.toastr.success(
          "Task " + task.title + " has been successfully updated"
        )
      }
    });
  }

  removeTask(task: Task) {
    return this.getTaskKey(task.taskId).then(() => {
      const taskKey: string = this.selectedTaskKey;
      if(taskKey !== "") {
        this.taskRef = this.db.object("tasks-list/" + taskKey);
        this.taskRef.remove();
        return this.toastr.success(
          "Task " + task.title + " has been successfully removed!"
        )
      }
    });
  }
}
