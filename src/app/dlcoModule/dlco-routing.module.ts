import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CeoRegDetailsComponent } from '../adminModule/components/ceo-reg-details/ceo-reg-details.component';
import { AuthGuard } from '../guards/auth.guard';
import { CeoListComponent } from './components/ceo-list/ceo-list.component';
import { CeoRegistrationComponent } from './components/ceo-registration/ceo-registration.component';
import { PacksgismapComponent } from './components/packsgismap/packsgismap.component';
import { PacsCreationComponent } from './components/pacs-creation/pacs-creation.component';
import { PacsListComponent } from './components/pacs-list/pacs-list.component';
import { PacsgeotaggingapprovalComponent } from './components/pacsgeotaggingapproval/pacsgeotaggingapproval.component';
import { PacsgeotagginglistComponent } from './components/pacsgeotagginglist/pacsgeotagginglist.component';
import { RegcoopSocietieComponent } from './components/regcoop-societie/regcoop-societie.component';
import { RegisteredSocietiesComponent } from './components/registered-societies/registered-societies.component';
import { RegisteredSocietyInsComponent } from './components/registered-society-ins/registered-society-ins.component';
import { EmployeeComponent } from './components/registration/employee/employee.component';
import { SharedComponent } from './components/shared/shared.component';
import { SitePreparationGetDetailsComponent } from './components/site-preparation-get-details/site-preparation-get-details.component';
import { CalibrattionsPARDtailsComponent } from './components/calibrattions-pardtails/calibrattions-pardtails.component';
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
import { FinalCertificateCompletedDetailsComponent } from '../adminModule/components/final-certificate-completed-details/final-certificate-completed-details.component';
import { FinalCertificateCompletedRptComponent } from '../adminModule/components/final-certificate-completed-rpt/final-certificate-completed-rpt.component';

const roles = ['201'];
const routes: Routes = [
  {
    path: '',
    component: SharedComponent,
    children: [
      {
        path: '',
        redirectTo: 'ceoRegistration',
        pathMatch: 'full',
      },
      {
        path: 'pacsCreation',
        component: PacsCreationComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },
      {
        path: 'ceoRegistration',
        component: CeoRegistrationComponent,
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
        path: 'ceoList',
        component: CeoListComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },
      {
        path: 'Pacsgeotagging',
        component: PacsgeotagginglistComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },
      {
        path: 'Pacsgeotaggingapproval',
        component: PacsgeotaggingapprovalComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },
      {
        path: 'Pacsgeotaggingmap',
        component: PacksgismapComponent,
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
        path: 'AppcoopSocieties',
        component: RegcoopSocietieComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },
      {
        path: 'RegSocieties',
        component: RegisteredSocietiesComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },
      {
        path: 'CeoDetailsRpt',
        component: CeoRegDetailsComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },
      {
        path: 'SocietyRegisterIns',
        component: RegisteredSocietyInsComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },
      {
        path: 'SitePreParationDetails',
        component: SitePreparationGetDetailsComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },
      {
        path: 'CalibrationAPRDetails',
        component: CalibrattionsPARDtailsComponent,
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
export class DlcoRoutingModule {}
