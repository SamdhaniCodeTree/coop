import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexPageComponent } from './components/index-page/index-page.component';
import { LoginComponent } from './components/login/login.component';
import { SharedComponent } from './components/shared/shared.component';

const routes: Routes = [
  
  {
    
    path: '',
    component: IndexPageComponent,
  },
  {
    
    path: 'login',
    component: LoginComponent,
  },
  {
    
    path: 'ApplicantRegistration',
    component: SharedComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
