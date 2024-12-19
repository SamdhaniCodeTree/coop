import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedComponent } from './components/shared/shared.component';
import { AuthGuard } from '../guards/auth.guard';
import { HomeComponent } from './components/home/home.component';


const roles = ['301'];
const routes: Routes = [
  {
    path: '',
    component: SharedComponent,
    children: [
      {
        path: '',
        redirectTo: 'Home',
        pathMatch: 'full',
      },

      {
        path: 'Home',
        component: HomeComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },
       



    ],
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DmtRoutingModule { }
