import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { ApplicantregistrationComponent } from './components/applicantregistration/applicantregistration.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PasswordUpdateComponent } from './components/password-update/password-update.component';
import { ServiceUnavailableComponent } from './components/service-unavailable/service-unavailable.component';
import { UnAuthorizedComponent } from './components/un-authorized/un-authorized.component';

const roles: string[] = [];
const routes: Routes = [
  {
    path: 'pageNotFound',
    component: PageNotFoundComponent,
  },
  {
    path: 'serviceUnavailable',
    component: ServiceUnavailableComponent,
  },
  {
    path: 'unAuthorized',
    component: UnAuthorizedComponent,
  },
  {
    path: 'applicantregistration',
    component: ApplicantregistrationComponent,
  },
  
  {
    path: 'passwordUpdate',
    component: PasswordUpdateComponent,
    canActivate: [AuthGuard],
    data: {
      roles,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SharedRoutingModule {}
