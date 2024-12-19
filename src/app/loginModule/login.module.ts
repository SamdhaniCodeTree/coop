import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IndexPageComponent } from './components/index-page/index-page.component';
import { SharedComponent } from './components/shared/shared.component';


@NgModule({
  declarations: [LoginComponent, IndexPageComponent, SharedComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class LoginModule { }
