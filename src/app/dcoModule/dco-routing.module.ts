import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from '../dlcoModule/components/registration/employee/employee.component';
import { AuthGuard } from '../guards/auth.guard';
import { CeoListComponent } from './components/ceo-list/ceo-list.component';
import { PacsLandInspectionComponent } from './components/pacs-land-inspection/pacs-land-inspection.component';
import { PacsListComponent } from './components/pacs-list/pacs-list.component';
import { SharedComponent } from './components/shared/shared.component';
import { SocietyRegistrationComponent } from './components/society-registration/society-registration.component';
import { VillageStatusComponent } from '../dllicModule/components/construction/village-status/village-status.component';
import { SiteInspectionDllicComponent } from '../dllicModule/components/site-inspection-dllic/site-inspection-dllic.component';
import { CompletedPacsForDeliveryDetailsComponent } from '../adminModule/components/completed-pacs-for-delivery-details/completed-pacs-for-delivery-details.component';
import { CompletedPacsForDeliveryRptComponent } from '../adminModule/components/completed-pacs-for-delivery-rpt/completed-pacs-for-delivery-rpt.component';
import { CompletedPacsForInstallationDetailsComponent } from '../adminModule/components/completed-pacs-for-installation-details/completed-pacs-for-installation-details.component';
import { CompletedPacsForInstallationRptComponent } from '../adminModule/components/completed-pacs-for-installation-rpt/completed-pacs-for-installation-rpt.component';
import { CompletedPacsForSiteDetailsComponent } from '../adminModule/components/completed-pacs-for-site-details/completed-pacs-for-site-details.component';
import { CompletedPacsForSiteRptComponent } from '../adminModule/components/completed-pacs-for-site-rpt/completed-pacs-for-site-rpt.component';
import { NotCompletedPacsDetailsComponent } from '../adminModule/components/not-completed-pacs-details/not-completed-pacs-details.component';
import { NotCompletedPacsRptComponent } from '../adminModule/components/not-completed-pacs-rpt/not-completed-pacs-rpt.component';
import { PacsComputerisationAbstractDivisionDetailsComponent } from '../adminModule/components/pacs-computerisation-abstract-division-details/pacs-computerisation-abstract-division-details.component';
import { PacsComputerisationAbstractDivisionRptComponent } from '../adminModule/components/pacs-computerisation-abstract-division-rpt/pacs-computerisation-abstract-division-rpt.component';
import { CeoDetailsEditAndUpdateComponent } from '../adminModule/components/ceo-details-edit-and-update/ceo-details-edit-and-update.component';
import { FinalCertificateCompletedDetailsComponent } from '../adminModule/components/final-certificate-completed-details/final-certificate-completed-details.component';
import { FinalCertificateCompletedRptComponent } from '../adminModule/components/final-certificate-completed-rpt/final-certificate-completed-rpt.component';

const roles = ['101'];
const routes: Routes = [
  {
    path: '',
    component: SharedComponent,
    children: [
      {
        path: '',
        redirectTo: 'ceoList',
        pathMatch: 'full',
      },
      {
        path: 'ceoList',
        component: CeoListComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },
      {
        path: 'pacsList',
        component: PacsListComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },
      {
        path: 'SocietyRegistration',
        component: SocietyRegistrationComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },
      {
        path: 'pacsLandInspection',
        component: PacsLandInspectionComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },
      {
        path: 'Employeeregistration',
        component: EmployeeComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },
      {
        path: 'VillageStatus',
        component: VillageStatusComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },
      {
        path: 'siteInspection',
        component: SiteInspectionDllicComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },
//15052024
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
      {
        path: 'PacsDetailsEditrpt',
        component:CeoDetailsEditAndUpdateComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },
{
  path: 'FinalCertificateCompletedRpt',
  component:FinalCertificateCompletedRptComponent,
  canActivate: [AuthGuard],
  data: {
    roles,
     },
      },
{
  path: 'FinalCertificateCompletedDetails',
  component:FinalCertificateCompletedDetailsComponent,
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
  exports: [RouterModule],
})
export class DcoRoutingModule {}
