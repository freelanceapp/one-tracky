import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './components/login/login.component';

import { MatCardModule, MatInputModule, MatFormFieldModule, MatButtonModule } from '@angular/material';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './components/signup/signup.component';
import { LoginHeaderComponent } from './components/login-header/login-header.component';
import { LoginLayoutComponent } from './components/login-layout/login-layout.component';



@NgModule({
  declarations: [LoginComponent, ResetPasswordComponent, SignupComponent, LoginHeaderComponent, LoginLayoutComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LoginRoutingModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule
  ],
  exports: [FormsModule]
})
export class LoginModule { }
