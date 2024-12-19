import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from '../dlcoModule/components/registration/employee/employee.component';
import { AuthGuard } from '../guards/auth.guard';
import { CeoRegDetailsComponent } from './components/ceo-reg-details/ceo-reg-details.component';
import { MliDistrictReportComponent } from './components/mpfcLandInspection/mli-district-report/mli-district-report.component';
import { MliMandalReportComponent } from './components/mpfcLandInspection/mli-mandal-report/mli-mandal-report.component';
import { MliStateReportComponent } from './components/mpfcLandInspection/mli-state-report/mli-state-report.component';
import { NewMasterDetailsAddComponent } from './components/new-master-details-add/new-master-details-add.component';
import { PacksgismapComponent } from './components/packsgismap/packsgismap.component';
import { PacsLandAllotmentphasetwoComponent } from './components/pacs-land-allotmentphasetwo/pacs-land-allotmentphasetwo.component';
import { PacsLandHandOverphaseComponent } from './components/pacs-land-hand-overphase/pacs-land-hand-overphase.component';
import { PacsLandallotmentphaseThreeInsComponent } from './components/pacs-landallotmentphase-three-ins/pacs-landallotmentphase-three-ins.component';
import { PacsLandallotmentphaseThreeRptComponent } from './components/pacs-landallotmentphase-three-rpt/pacs-landallotmentphase-three-rpt.component';
import { PacsgeotagginglistComponent } from './components/pacsgeotagginglist/pacsgeotagginglist.component';
import { PlaDistrictReportComponent } from './components/pacsLandAllotment/pla-district-report/pla-district-report.component';
import { PlaMandalReportComponent } from './components/pacsLandAllotment/pla-mandal-report/pla-mandal-report.component';
import { PlaStateReportComponent } from './components/pacsLandAllotment/pla-state-report/pla-state-report.component';
import { PacsmasterComponent } from './components/pacsmaster/pacsmaster.component';
import { PasswordresetComponent } from './components/passwordreset/passwordreset.component';



import { SharedComponent } from './components/shared/shared.component';
import { DeleteDetailsPhaseWhiseComponent } from './components/delete-details-phase-whise/delete-details-phase-whise.component';
import { PacsWiseDeviceRecStatusRptComponent } from './components/pacs-wise-device-rec-status-rpt/pacs-wise-device-rec-status-rpt.component';
import { PacsComputerisationAbstractDistDetailsComponent } from './components/pacs-computerisation-abstract-dist-details/pacs-computerisation-abstract-dist-details.component';
import { PacsComputerisationAbstractDistRptComponent } from './components/pacs-computerisation-abstract-dist-rpt/pacs-computerisation-abstract-dist-rpt.component';
import { PacsComputerisationAbstractDivisionDetailsComponent } from './components/pacs-computerisation-abstract-division-details/pacs-computerisation-abstract-division-details.component';
import { PacsComputerisationAbstractDivisionRptComponent } from './components/pacs-computerisation-abstract-division-rpt/pacs-computerisation-abstract-division-rpt.component';
import { NotCompletedPacsDetailsComponent } from './components/not-completed-pacs-details/not-completed-pacs-details.component';
import { NotCompletedPacsRptComponent } from './components/not-completed-pacs-rpt/not-completed-pacs-rpt.component';
import { CompletedPacsForDeliveryDetailsComponent } from './components/completed-pacs-for-delivery-details/completed-pacs-for-delivery-details.component';
import { CompletedPacsForDeliveryRptComponent } from './components/completed-pacs-for-delivery-rpt/completed-pacs-for-delivery-rpt.component';
import { CompletedPacsForInstallationDetailsComponent } from './components/completed-pacs-for-installation-details/completed-pacs-for-installation-details.component';
import { CompletedPacsForInstallationRptComponent } from './components/completed-pacs-for-installation-rpt/completed-pacs-for-installation-rpt.component';
import { CompletedPacsForSiteDetailsComponent } from './components/completed-pacs-for-site-details/completed-pacs-for-site-details.component';
import { CompletedPacsForSiteRptComponent } from './components/completed-pacs-for-site-rpt/completed-pacs-for-site-rpt.component';
import { SitePacsDeleteRptComponent } from './components/site-pacs-delete-rpt/site-pacs-delete-rpt.component';
import { TechnicialManagerComponent } from './components/technicial-manager/technicial-manager.component';
import { CalibrationPaymentsComponent } from './components/calibration-payments/calibration-payments.component';
import { CalibrationPaymentsReportComponent } from './components/calibration-payments-report/calibration-payments-report.component';
import { FinalApprovalCalibrationPaymentsComponent } from './components/final-approval-calibration-payments/final-approval-calibration-payments.component';
import { CalibrationStateLevelAbstractReportComponent } from './components/calibration-state-level-abstract-report/calibration-state-level-abstract-report.component';
import { CalibrationPacsTotalReportComponent } from './components/calibration-pacs-total-report/calibration-pacs-total-report.component';
import { CeoDetailsEditAndUpdateComponent } from './components/ceo-details-edit-and-update/ceo-details-edit-and-update.component';
import { FinalCertificateCompletedDetailsComponent } from './components/final-certificate-completed-details/final-certificate-completed-details.component';
import { FinalCertificateCompletedRptComponent } from './components/final-certificate-completed-rpt/final-certificate-completed-rpt.component';
import { PacsRemarksReportComponent } from './components/pacs-remarks-report/pacs-remarks-report.component';
import { PacsCertificateComponent } from './components/pacs-certificate/pacs-certificate.component';
import { CalibrationPacsTotalDetailsComponent } from './components/calibration-pacs-total-details/calibration-pacs-total-details.component';
import { HardwarePaymentsTotalnoofPacsReportComponent } from './components/hardware-payments-totalnoof-pacs-report/hardware-payments-totalnoof-pacs-report.component';
import { HardwarePaymentsTotalnoofPacsDetailsComponent } from './components/hardware-payments-totalnoof-pacs-details/hardware-payments-totalnoof-pacs-details.component';
import { HardwarePaymentPacsRptComponent } from './components/hardware-payment-pacs-rpt/hardware-payment-pacs-rpt.component';
import { CalibrationStateLevelAbstractDetailsComponent } from './components/calibration-state-level-abstract-details/calibration-state-level-abstract-details.component';
import { CalibrationSubmittedDetailsComponent } from './components/calibration-submitted-details/calibration-submitted-details.component';
import { CalibrationSubmittedReporComponent } from './components/calibration-submitted-repor/calibration-submitted-repor.component';
import { ApcobDgmFileDetailspendingComponent } from './components/apcob-dgm-file-detailspending/apcob-dgm-file-detailspending.component';
import { InternetConnectionCalibComponent } from '../technicianModule/components/internet-connection-calib/internet-connection-calib.component';
import { InternetDepartmentVerificationComponent } from './components/internet-department-verification/internet-department-verification.component';
import { CalibrationInternetDetailsReportComponent } from './components/calibration-internet-details-report/calibration-internet-details-report.component';

const roles = ['1'];
const routes: Routes = [
  {
    path: '',
    component: SharedComponent,
    children: [
      {
        path: '',
        redirectTo: 'pacsLandAllotmentStateReport',
        pathMatch: 'full',
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
        path: 'Passwordreset',
        component: PasswordresetComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },
      {
        path: 'Pacsmaster',
        component: PacsmasterComponent,
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
        path: 'pacsAllotmentphaseT',
        component: PacsLandAllotmentphasetwoComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },
      {
        path: 'pacslandhandoverphaseTwo',
        component: PacsLandHandOverphaseComponent,
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
        path: 'MasterDataAddRemove',
        component: NewMasterDetailsAddComponent,
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
        path: 'WrongentersDetails',
        component: DeleteDetailsPhaseWhiseComponent,
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

      //-----------------------------------------------------------------

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
        component: CompletedPacsForSiteDetailsComponent,
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
        component: CompletedPacsForDeliveryDetailsComponent,
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
        component: CompletedPacsForInstallationDetailsComponent,
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
        component: FinalCertificateCompletedRptComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },
      {
        path: 'FinalCertificateCompletedDetails',
        component: FinalCertificateCompletedDetailsComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },
      {
        path: 'PacsDetailsDetRpt',
        component: SitePacsDeleteRptComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },
      {
        path: 'TechnicialManager',
        component: TechnicialManagerComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },

      {
        path: 'CalibrationPayments',
        component: CalibrationPaymentsComponent,
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
        path: 'FinalApprovalCalibrationPayments',
        component: FinalApprovalCalibrationPaymentsComponent,
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
        component: CalibrationPacsTotalReportComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },


      {
        path: 'PacsDetailsEditrpt',
        component: CeoDetailsEditAndUpdateComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },
      {
        path: 'PacsRemarksReport',
        component: PacsRemarksReportComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },
      {
        path: 'PacsCertification',
        component: PacsCertificateComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },

      {
        path: 'CalibrationPacsTotalDetails',
        component: CalibrationPacsTotalDetailsComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },
      {
        path: 'HardwarePaymentsTotalnoofPacs',
        component: HardwarePaymentsTotalnoofPacsReportComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },
      {
        path: 'HardwarePaymentsTotalnoofPacsDetails',
        component: HardwarePaymentsTotalnoofPacsDetailsComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },
      {
        path: 'HardwarePaymentsPacsRpt',
        component: HardwarePaymentPacsRptComponent,
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
        path: 'CalibrationSubmittedDetails',
        component: CalibrationSubmittedDetailsComponent,
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
        path: 'Internetcalibrationins',
        component: InternetConnectionCalibComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },
      {
        path: 'DepartmentInternetDetails',
        component: InternetDepartmentVerificationComponent,
        canActivate: [AuthGuard],
        data: {
          roles,
        },
      },
      {
        path: 'CalibInternetDetailsRpt',
        component: CalibrationInternetDetailsReportComponent,
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
export class AdminRoutingModule { }
