import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'todos', loadChildren: () => import('./todos/todos.module').then(m => m.TodosModule) },
  { path: '', loadChildren: () => import('./landing/landing.module').then(m => m.LandingModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }