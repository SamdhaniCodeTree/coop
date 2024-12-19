import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MliDistrictReportComponent } from '../adminModule/components/mpfcLandInspection/mli-district-report/mli-district-report.component';
import { MliMandalReportComponent } from '../adminModule/components/mpfcLandInspection/mli-mandal-report/mli-mandal-report.component';
import { MliStateReportComponent } from '../adminModule/components/mpfcLandInspection/mli-state-report/mli-state-report.component';
import { PacsLandAllotmentphase2Component } from '../adminModule/components/pacs-land-allotmentphase2/pacs-land-allotmentphase2.component';
import { PacsLandAllotmentphasetwoComponent } from '../adminModule/components/pacs-land-allotmentphasetwo/pacs-land-allotmentphasetwo.component';
import { PacsLandHandOverphaseComponent } from '../adminModule/components/pacs-land-hand-overphase/pacs-land-hand-overphase.component';
import { PacsLandHandoverPhaseThreeComponent } from '../adminModule/components/pacs-land-handover-phase-three/pacs-land-handover-phase-three.component';
import { PacsLandallotmentphaseThreeInsComponent } from '../adminModule/components/pacs-landallotmentphase-three-ins/pacs-landallotmentphase-three-ins.component';
import { PacsLandallotmentphaseThreeRptComponent } from '../adminModule/components/pacs-landallotmentphase-three-rpt/pacs-landallotmentphase-three-rpt.component';
import { PlaDistrictReportComponent } from '../adminModule/components/pacsLandAllotment/pla-district-report/pla-district-report.component';
import { PlaMandalReportComponent } from '../adminModule/components/pacsLandAllotment/pla-mandal-report/pla-mandal-report.component';
import { PlaStateReportComponent } from '../adminModule/components/pacsLandAllotment/pla-state-report/pla-state-report.component';
import { AuthGuard } from '../guards/auth.guard';
import { PacsLandAllotmentComponent } from './components/pacs-land-allotment/pacs-land-allotment.component';
import { PacsLandHandOverComponent } from './components/pacs-land-hand-over/pacs-land-hand-over.component';


import { SharedComponent } from './components/shared/shared.component';
import { PacsWiseDeviceRecStatusRptComponent } from '../adminModule/components/pacs-wise-device-rec-status-rpt/pacs-wise-device-rec-status-rpt.component';
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
import { FinalCertificateCompletedRptComponent } from '../adminModule/components/final-certificate-completed-rpt/final-certificate-completed-rpt.component';
import { FinalCertificateCompletedDetailsComponent } from '../adminModule/components/final-certificate-completed-details/final-certificate-completed-details.component';

const roles = ['502'];
const routes: Routes = [
  {
    path: '',
    component: SharedComponent,
    children: [
      {
        path: '',
        redirectTo: 'PacsLandAllotmentphase2',
        pathMatch: 'full',
      },
      {
        path: 'pacsLandAllotment',
        component: PacsLandAllotmentComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },
      {
        path: 'pacsLandHandOver',
        component: PacsLandHandOverComponent,
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
        path: 'PacsLandAllotmentphase2',
        component: PacsLandAllotmentphase2Component,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
        
      },
      {
        path: 'pacsLandHandOverphase2',
        component:PacsLandHandOverphaseComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
        
      },
      {
        path: 'pacsAllotmentphaseT',
        component: PacsLandAllotmentphasetwoComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },
      {
        path: 'pacsLandAllotmentphase3',
        component: PacsLandallotmentphaseThreeInsComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },
      {
        path: 'pacsLandAllotmentphaserpt3',
        component: PacsLandallotmentphaseThreeRptComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },
      {
        path: 'pacsLandHandOverphase3',
        component: PacsLandHandoverPhaseThreeComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },
      {
        path: 'PacsDeviceRecRpt',
        component: PacsWiseDeviceRecStatusRptComponent,
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
  exports: [RouterModule]
})
export class JcRoutingModule { }
