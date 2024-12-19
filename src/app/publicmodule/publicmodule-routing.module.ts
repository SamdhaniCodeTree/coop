import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegcoopSocietieComponent } from '../dlcoModule/components/regcoop-societie/regcoop-societie.component';
import { AuthGuard } from '../guards/auth.guard';
import { RegCoopSocIndividualComponent } from './components/reg-coop-soc-individual/reg-coop-soc-individual.component';
import { RrgistredCoopSocietiesComponent } from './components/rrgistred-coop-societies/rrgistred-coop-societies.component';
import { SharedComponent } from './components/shared/shared.component';
import { PublicCooperativeSocietyDetailsComponent } from './components/public-cooperative-society-details/public-cooperative-society-details.component';
import { PublicApplicationDetailsComponent } from './components/public-application-details/public-application-details.component';
import { PublicSocietyDetailsComponent } from './components/public-society-details/public-society-details.component';

const roles = ['502'];
const routes: Routes = [
  {
    path: '',
    component: SharedComponent,
    children: [
      {
        path: '',
        redirectTo: 'ApplicationRegCoopS',
        pathMatch: 'full',
      },
      {
        path: 'ApplicationRegCoopS',
        component:RegcoopSocietieComponent ,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },
      {
        path: 'IndividualRegsocieties',
        component:RegCoopSocIndividualComponent ,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },
      {
        path: 'Registredcoopsocieties',
        component:RrgistredCoopSocietiesComponent ,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },
      {
        path: 'publiccoopsocieties',
        component:PublicCooperativeSocietyDetailsComponent ,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },
      {
        path: 'publicApplicationdts',
        component:PublicApplicationDetailsComponent ,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },
      {
        path: 'publicSocietyDetails',
        component:PublicSocietyDetailsComponent ,
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
export class PublicmoduleRoutingModule { }
