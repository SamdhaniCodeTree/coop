import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { DcmsInformationProformaComponent } from './components/dcms-information-proforma/dcms-information-proforma.component';
import { PacsLandInspectionComponent } from './components/pacs-land-inspection/pacs-land-inspection.component';
import { SharedComponent } from './components/shared/shared.component';
import { CeoDetailsEditUpdateComponent } from './components/ceo-details-edit-update/ceo-details-edit-update.component';
import { SitePreparationSubComponent } from './components/site-preparation-sub/site-preparation-sub.component';
import { CalibrationCopsComponent } from '../technicianModule/components/calibration-cops/calibration-cops.component';
import { CalibrationDeviceDatesInsComponent } from './components/calibration-device-dates-ins/calibration-device-dates-ins.component';
import { CalibrationInspectionDInsComponent } from './components/calibration-inspection-dins/calibration-inspection-dins.component';
import { HomeComponent } from './components/home/home.component';
import { CalibrationCopsUpdComponent } from './components/calibration-cops-upd/calibration-cops-upd.component';
import { CalibrattionsPARDtailsComponent } from '../dlcoModule/components/calibrattions-pardtails/calibrattions-pardtails.component';
import { PacsComputerisationAbstractDistDetailsComponent } from '../adminModule/components/pacs-computerisation-abstract-dist-details/pacs-computerisation-abstract-dist-details.component';
import { PacsComputerisationAbstractDistRptComponent } from '../adminModule/components/pacs-computerisation-abstract-dist-rpt/pacs-computerisation-abstract-dist-rpt.component';
import { PacsComputerisationAbstractDivisionDetailsComponent } from '../adminModule/components/pacs-computerisation-abstract-division-details/pacs-computerisation-abstract-division-details.component';
import { PacsComputerisationAbstractDivisionRptComponent } from '../adminModule/components/pacs-computerisation-abstract-division-rpt/pacs-computerisation-abstract-division-rpt.component';
import { CompletedPacsForDeliveryDetailsComponent } from '../adminModule/components/completed-pacs-for-delivery-details/completed-pacs-for-delivery-details.component';
import { CompletedPacsForDeliveryRptComponent } from '../adminModule/components/completed-pacs-for-delivery-rpt/completed-pacs-for-delivery-rpt.component';
import { CompletedPacsForInstallationDetailsComponent } from '../adminModule/components/completed-pacs-for-installation-details/completed-pacs-for-installation-details.component';
import { CompletedPacsForInstallationRptComponent } from '../adminModule/components/completed-pacs-for-installation-rpt/completed-pacs-for-installation-rpt.component';
import { CompletedPacsForSiteDetailsComponent } from '../adminModule/components/completed-pacs-for-site-details/completed-pacs-for-site-details.component';
import { CompletedPacsForSiteRptComponent } from '../adminModule/components/completed-pacs-for-site-rpt/completed-pacs-for-site-rpt.component';
import { NotCompletedPacsDetailsComponent } from '../adminModule/components/not-completed-pacs-details/not-completed-pacs-details.component';
import { NotCompletedPacsRptComponent } from '../adminModule/components/not-completed-pacs-rpt/not-completed-pacs-rpt.component';
import { SitePreparationAproveRejectComponent } from '../superriserModule/components/site-preparation-aprove-reject/site-preparation-aprove-reject.component';
import { FinalCertificateCompletedDetailsComponent } from '../adminModule/components/final-certificate-completed-details/final-certificate-completed-details.component';
import { FinalCertificateCompletedRptComponent } from '../adminModule/components/final-certificate-completed-rpt/final-certificate-completed-rpt.component';
import { InternetAproveRejectComponent } from './components/internet-aprove-reject/internet-aprove-reject.component';


//const roles = ['301'];
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
      {
        path: 'dcmsInformationProforma',
        component: DcmsInformationProformaComponent,
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
        path: 'pacsDetailsGet',
        component: CeoDetailsEditUpdateComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },
      {
        path: 'SitePreparationSub',
        component: SitePreparationSubComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },
     
      {
        path: 'CalibrationDeviceDetails',
        component: CalibrationDeviceDatesInsComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },
      {
        path: 'CalibrationDeviceInspection',
        component: CalibrationInspectionDInsComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },
      {
        path: 'Calibration',
        component: CalibrationCopsComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },

      {
        path: 'CalibrationRegistration',
        component: CalibrationCopsUpdComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },
      // {
      //   path: 'CalibrationAPRDetails',
      //   component: CalibrattionsPARDtailsComponent,
      //   canActivate: [AuthGuard],
      //   data: {
      //     roles,
      //   },
      // },


//15052024
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

{
  path: 'CalibrationAPRDetails',
  component: CalibrattionsPARDtailsComponent,
  canActivate: [AuthGuard],
  data: {
    roles,
  },
},


{
path: 'SitePreparationARDetails',
component: SitePreparationAproveRejectComponent,
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

{
  path: 'InternetCertificateDetails',
  component:InternetAproveRejectComponent,
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
export class CeoRoutingModule { }
