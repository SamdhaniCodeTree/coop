import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedComponent } from './components/shared/shared.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from '../guards/auth.guard';
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
import { PacsComputerisationAbstractDistDetailsComponent } from '../adminModule/components/pacs-computerisation-abstract-dist-details/pacs-computerisation-abstract-dist-details.component';
import { PacsComputerisationAbstractDistRptComponent } from '../adminModule/components/pacs-computerisation-abstract-dist-rpt/pacs-computerisation-abstract-dist-rpt.component';
import { CalibrationPaymentsReportComponent } from '../adminModule/components/calibration-payments-report/calibration-payments-report.component';
import { PaymentStatusReportDetailsComponent } from '../adminModule/components/payment-status-report-details/payment-status-report-details.component';
import { CalibrationStateLevelAbstractReportComponent } from '../adminModule/components/calibration-state-level-abstract-report/calibration-state-level-abstract-report.component';
import { CalibrationPacsTotalReportComponent } from '../adminModule/components/calibration-pacs-total-report/calibration-pacs-total-report.component';
import { FinalCertificateCompletedDetailsComponent } from '../adminModule/components/final-certificate-completed-details/final-certificate-completed-details.component';
import { FinalCertificateCompletedRptComponent } from '../adminModule/components/final-certificate-completed-rpt/final-certificate-completed-rpt.component';
import { PacsRemarksReportComponent } from '../adminModule/components/pacs-remarks-report/pacs-remarks-report.component';
import { CalibrationPacsTotalDetailsComponent } from '../adminModule/components/calibration-pacs-total-details/calibration-pacs-total-details.component';
import { HardwarePaymentsTotalnoofPacsReportComponent } from '../adminModule/components/hardware-payments-totalnoof-pacs-report/hardware-payments-totalnoof-pacs-report.component';
import { HardwarePaymentsTotalnoofPacsDetailsComponent } from '../adminModule/components/hardware-payments-totalnoof-pacs-details/hardware-payments-totalnoof-pacs-details.component';
import { HardwarePaymentPacsRptComponent } from '../adminModule/components/hardware-payment-pacs-rpt/hardware-payment-pacs-rpt.component';
import { FinalApprovalCalibrationPaymentsComponent } from '../adminModule/components/final-approval-calibration-payments/final-approval-calibration-payments.component';
import { ApcobDgmFileDetailspendingComponent } from '../adminModule/components/apcob-dgm-file-detailspending/apcob-dgm-file-detailspending.component';
import { CalibrationStateLevelAbstractDetailsComponent } from '../adminModule/components/calibration-state-level-abstract-details/calibration-state-level-abstract-details.component';
import { CalibrationSubmittedReporComponent } from '../adminModule/components/calibration-submitted-repor/calibration-submitted-repor.component';
import { InternetVerificationDetailsComponent } from './internet-verification-details/internet-verification-details.component';
import { InternetVerificationComponent } from '../adminModule/internet-verification/internet-verification.component';

const roles = ['701'];
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
    //20052024
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
      path: 'CalibrationPaymentsReport',
      component: CalibrationPaymentsReportComponent,
      canActivate: [AuthGuard],
      data: {
        roles,
      },
    },
    {
      path: 'PaymentsCalibReport',
      component: PaymentStatusReportDetailsComponent,
      canActivate: [AuthGuard],
      data: {
        roles,
      },
    },
    {
      path: 'CalibrationStateLevelAbstractReport',
      component: CalibrationStateLevelAbstractReportComponent,
      canActivate: [AuthGuard],
      data: {
        roles,
      },
    },
    {
      path: 'CalibrationPacsTotalReport',
      component:CalibrationPacsTotalReportComponent,
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
      path: 'PacsRemarksReport',
      component:PacsRemarksReportComponent,
      canActivate: [AuthGuard],
      data: {
        roles,
      },
      },
{
  path: 'CalibrationPacsTotalDetails',
  component:CalibrationPacsTotalDetailsComponent,
  canActivate: [AuthGuard],
  data: {
    roles,
  },
},
{
  path: 'HardwarePaymentsTotalnoofPacs',
  component:HardwarePaymentsTotalnoofPacsReportComponent,
  canActivate: [AuthGuard],
  data: {
    roles,
  },
},
{
  path: 'HardwarePaymentsTotalnoofPacsDetails',
  component:HardwarePaymentsTotalnoofPacsDetailsComponent,
  canActivate: [AuthGuard],
  data: {
    roles,
  },
},
{
  path: 'HardwarePaymentsPacsRpt',
  component:HardwarePaymentPacsRptComponent,
  canActivate: [AuthGuard],
  data: {
    roles,
  },
}, 
{
  path: 'FinalApprovalCalibrationPayments',
  component: FinalApprovalCalibrationPaymentsComponent,
  canActivate: [AuthGuard],
  data: {
    roles,
  },
},
{
  path: 'DeptpendingDetails',
  component: ApcobDgmFileDetailspendingComponent,
  canActivate: [AuthGuard],
  data: {
    roles,
  },
}, 
{
  path: 'CalibrationStateLevelAbstractDetails',
  component: CalibrationStateLevelAbstractDetailsComponent,
  canActivate: [AuthGuard],
  data: {
    roles,
  },
},
{
  path: 'CalibrationSubmittedReport',
  component: CalibrationSubmittedReporComponent,
  canActivate: [AuthGuard],
  data: {
    roles,
  },
},
{
  path: 'InternetVerifyDetails',
  component: InternetVerificationComponent,
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
export class DccbRoutingModule { }
