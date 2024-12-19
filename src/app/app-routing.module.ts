import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './sharedModule/components/page-not-found/page-not-found.component';

const routes: Routes = [
  
  {
    path: '',
    loadChildren: () =>
      import('./loginModule/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'ceo',
    loadChildren: () =>
      import('./ceoModule/ceo.module').then((m) => m.CeoModule),
  },
  {
    path: 'mllic',
    loadChildren: () =>
      import('./mllicModule/mllic.module').then((m) => m.MllicModule),
  },
  {
    path: 'dlco',
    loadChildren: () =>
      import('./dlcoModule/dlco.module').then((m) => m.DlcoModule),
  },
  {
    path: 'dco',
    loadChildren: () =>
      import('./dcoModule/dco.module').then((m) => m.DcoModule),
  },
  {
    path: 'dllic',
    loadChildren: () =>
      import('./dllicModule/dllic.module').then((m) => m.DllicModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./adminModule/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'shared',
    loadChildren: () =>
      import('./sharedModule/shared.module').then((m) => m.SharedModule),
  },
  {
    path: 'dee',
    loadChildren: () =>
      import('./deeModule/dee.module').then((m) => m.DeeModule),
  },
  {
    path: 'jc',
    loadChildren: () =>
      import('./jcModule/jc.module').then((m) => m.JcModule),
  },
  {
    path: 'public',
    loadChildren: () =>
      import('./publicmodule/publicmodule.module').then((m) => m.PublicmoduleModule),
  },
  {
    path: 'technican',
    loadChildren: () =>
      import('./technicianModule/technic.module').then((m) => m.TechnicModule),
  },
  {
    path: 'Superriser',
    loadChildren: () =>
      import('./superriserModule/superriser.module').then((m) => m.SuperriserModule),
  },
  {
    
    path: 'dmt',
    loadChildren: () =>
      import('./dmtModule/dmt.module').then((m) => m.DmtModule),
  },
  {
    path: 'dccb',
    loadChildren: () =>
      import('./dccbModule/dccb.module').then((m) => m.DccbModule),
  },
  {
    path: 'dccbhwv',
    loadChildren: () =>
      import('./dccbhwvModule/dccbhwv.module').then((m) => m.DccbhwvModule),
  },
  {
    path: 'apcob',
    loadChildren: () =>
      import('./apcobModule/apcob.module').then((m) => m.ApcobModule),
  },
  {
    path: 'apcobtickting',
    loadChildren: () =>
      import('./apcobticktingModule/apcobtickting.module').then((m) => m.ApcobticktingModule),
  },
  {
    path: 'spoc',
    loadChildren: () =>
      import('./spocModule/spoc.module').then((m) => m.SpocModule),
  },
  {
    path: 'CallCenter',
    loadChildren: () =>
      import('./CallcenterModule/callcenter.module').then((m) => m.CallcenterModule),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
 
  {
    path: '**',
    pathMatch: 'full',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
