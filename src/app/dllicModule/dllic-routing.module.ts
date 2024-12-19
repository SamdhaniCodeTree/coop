import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { SharedComponent } from './components/shared/shared.component';
// tslint:disable-next-line: max-line-length
import { SiteInspectionUpdateComponent } from './components/siteInspectionDashboard/site-inspection-update/site-inspection-update.component';
import { InspectionDashboardComponent } from './components/siteInspectionDashboard/inspection-dashboard/inspection-dashboard.component';
import { SiteInspectionDllicComponent } from './components/site-inspection-dllic/site-inspection-dllic.component';
import { FinishingLevelDllicComponent } from './components/construction/finishing-level-dllic/finishing-level-dllic.component';
import { FoundationLevelDllicComponent } from './components/construction/foundation-level-dllic/foundation-level-dllic.component';
import { SuperStructureLevelDllicComponent } from './components/construction/super-structure-level-dllic/super-structure-level-dllic.component';
import { MliMandalReportComponent } from '../adminModule/components/mpfcLandInspection/mli-mandal-report/mli-mandal-report.component';
import { MliDistrictReportComponent } from '../adminModule/components/mpfcLandInspection/mli-district-report/mli-district-report.component';
import { MliStateReportComponent } from '../adminModule/components/mpfcLandInspection/mli-state-report/mli-state-report.component';
import { PlaMandalReportComponent } from '../adminModule/components/pacsLandAllotment/pla-mandal-report/pla-mandal-report.component';
import { PlaDistrictReportComponent } from '../adminModule/components/pacsLandAllotment/pla-district-report/pla-district-report.component';
import { PlaStateReportComponent } from '../adminModule/components/pacsLandAllotment/pla-state-report/pla-state-report.component';
import { VillageStatusComponent } from './components/construction/village-status/village-status.component';
import { PacsgeotagginglistComponent } from './components/pacsgeotagginglist/pacsgeotagginglist.component';
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


const roles = ['501','101'];
const routes: Routes = [
  {
    path: '',
    component: SharedComponent,
    children: [

      {
        path: '',
        redirectTo: 'VillageStatus',
        pathMatch: 'full',
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
        // canActivate: [AuthGuard],
        // data: {
        //  // roles,
        // },
      },
      {
        path: 'siteInspectionUpdate',
        component: SiteInspectionUpdateComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },
      {
        path: 'siteInspectionDashboard',
        component: InspectionDashboardComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },
      {
        path: 'foundationLevel',
        component: FoundationLevelDllicComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },
      {
        path: 'superStructureLevel',
        component: SuperStructureLevelDllicComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },
      {
        path: 'finishingLevel',
        component: FinishingLevelDllicComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },
      {
        path: 'pacsLandAllotmentStateReport',
        component: PlaStateReportComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },
      {
        path: 'pacsLandAllotmentDistrictReport',
        component: PlaDistrictReportComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },
      {
        path: 'pacsLandAllotmentMandalReport',
        component: PlaMandalReportComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },

      {
        path: 'MPFCLandInspectionStateReport',
        component: MliStateReportComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },
      {
        path: 'MPFCLandInspectionDistrictReport',
        component: MliDistrictReportComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },
      {
        path: 'MPFCLandInspectionMandalReport',
        component: MliMandalReportComponent,
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
export class DllicRoutingModule {}
