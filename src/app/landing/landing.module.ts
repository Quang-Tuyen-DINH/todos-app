import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LandingPageComponent } from './container/landing-page.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LandingPageComponent,
    SignInComponent,
    SignUpComponent
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    FormsModule
  ]
})
export class LandingModule { }