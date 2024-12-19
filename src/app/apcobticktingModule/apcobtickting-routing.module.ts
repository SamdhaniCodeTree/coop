import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompletedPacsForDeliveryDetailsComponent } from '../adminModule/components/completed-pacs-for-delivery-details/completed-pacs-for-delivery-details.component';
import { CompletedPacsForDeliveryRptComponent } from '../adminModule/components/completed-pacs-for-delivery-rpt/completed-pacs-for-delivery-rpt.component';
import { CompletedPacsForInstallationDetailsComponent } from '../adminModule/components/completed-pacs-for-installation-details/completed-pacs-for-installation-details.component';
import { CompletedPacsForInstallationRptComponent } from '../adminModule/components/completed-pacs-for-installation-rpt/completed-pacs-for-installation-rpt.component';
import { CompletedPacsForSiteDetailsComponent } from '../adminModule/components/completed-pacs-for-site-details/completed-pacs-for-site-details.component';
import { CompletedPacsForSiteRptComponent } from '../adminModule/components/completed-pacs-for-site-rpt/completed-pacs-for-site-rpt.component';
import { NotCompletedPacsDetailsComponent } from '../adminModule/components/not-completed-pacs-details/not-completed-pacs-details.component';
import { NotCompletedPacsRptComponent } from '../adminModule/components/not-completed-pacs-rpt/not-completed-pacs-rpt.component';
import { PacsComputerisationAbstractDistDetailsComponent } from '../adminModule/components/pacs-computerisation-abstract-dist-details/pacs-computerisation-abstract-dist-details.component';
import { PacsComputerisationAbstractDistRptComponent } from '../adminModule/components/pacs-computerisation-abstract-dist-rpt/pacs-computerisation-abstract-dist-rpt.component';
import { PacsComputerisationAbstractDivisionDetailsComponent } from '../adminModule/components/pacs-computerisation-abstract-division-details/pacs-computerisation-abstract-division-details.component';
import { PacsComputerisationAbstractDivisionRptComponent } from '../adminModule/components/pacs-computerisation-abstract-division-rpt/pacs-computerisation-abstract-division-rpt.component';
import { AuthGuard } from '../guards/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { SharedComponent } from './components/shared/shared.component';

const roles = ['333'];
const routes: Routes = [{
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

    {
      path: 'DistrictWiseAbstractReport',
      component: PacsComputerisationAbstractDistRptComponent,
      canActivate: [AuthGuard],
      data: {
        roles,
      },
    },
    {
      path: 'DistrictWiseAbstractDetails',
      component: PacsComputerisationAbstractDistDetailsComponent,
      canActivate: [AuthGuard],
      data: {
        roles,
      },
    },
    {
      path: 'DivisionWiseAbstractReport',
      component: PacsComputerisationAbstractDivisionRptComponent,
      canActivate: [AuthGuard],
      data: {
        roles,
      },
    },
    {
      path: 'DivisionWiseAbstractDetails',
      component: PacsComputerisationAbstractDivisionDetailsComponent,
      canActivate: [AuthGuard],
      data: {
        roles,
      },
    },
    
    {
      path: 'NotCompletedPacsDetails',
      component: NotCompletedPacsDetailsComponent,
      canActivate: [AuthGuard],
      data: {
        roles,
      },
    },
    
    {
      path: 'NotCompletedPacsRpt',
      component: NotCompletedPacsRptComponent,
      canActivate: [AuthGuard],
      data: {
        roles,
      },
    },
    
    {
      path: 'CompletedPacsForSiteDetails',
      component:CompletedPacsForSiteDetailsComponent,
      canActivate: [AuthGuard],
      data: {
        roles,
      },
    },
    {
      path: 'CompletedPacsForSiteRpt',
      component: CompletedPacsForSiteRptComponent,
      canActivate: [AuthGuard],
      data: {
        roles,
      },
    },
    {
      path: 'CompletedPacsForDeliveryDetails',
      component:CompletedPacsForDeliveryDetailsComponent,
      canActivate: [AuthGuard],
      data: {
        roles,
      },
    },
    {
      path: 'CompletedPacsForDeliveryRpt',
      component: CompletedPacsForDeliveryRptComponent,
      canActivate: [AuthGuard],
      data: {
        roles,
      },
    },
    {
      path: 'CompletedPacsForInstallationDetails',
      component:CompletedPacsForInstallationDetailsComponent,
      canActivate: [AuthGuard],
      data: {
        roles,
      },
    },
    {
      path: 'CompletedPacsForInstallationRpt',
      component: CompletedPacsForInstallationRptComponent,
      canActivate: [AuthGuard],
      data: {
        roles,
      },
    },

     
     
     
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApcobticktingRoutingModule { }
