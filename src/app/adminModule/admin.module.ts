import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedComponent } from './components/shared/shared.component';
import { PlaStateReportComponent } from './components/pacsLandAllotment/pla-state-report/pla-state-report.component';
import { PlaDistrictReportComponent } from './components/pacsLandAllotment/pla-district-report/pla-district-report.component';
import { PlaMandalReportComponent } from './components/pacsLandAllotment/pla-mandal-report/pla-mandal-report.component';
import { PacsLandAllotmentModule } from '../reportsModule/pacsLandAllotment/pacs-land-allotment.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { SharedModule } from '../sharedModule/shared.module';
import { MliStateReportComponent } from './components/mpfcLandInspection/mli-state-report/mli-state-report.component';
import { MliDistrictReportComponent } from './components/mpfcLandInspection/mli-district-report/mli-district-report.component';
import { MliMandalReportComponent } from './components/mpfcLandInspection/mli-mandal-report/mli-mandal-report.component';
import { MpfcLandInspectionModule } from '../reportsModule/mpfcLandInspection/mpfc-land-inspection.module';
import { PasswordresetComponent } from './components/passwordreset/passwordreset.component';
import { PacsmasterComponent } from './components/pacsmaster/pacsmaster.component';
import { MliVillageReportComponent } from './components/mpfcLandInspection/mli-village-report/mli-village-report.component';
import { PacsgeotagginglistComponent } from './components/pacsgeotagginglist/pacsgeotagginglist.component';
import { PacksgismapComponent } from './components/packsgismap/packsgismap.component';
import { EmployeeComponent } from './components/registration/employee/employee.component';
import { PacsLandAllotmentphase2Component } from './components/pacs-land-allotmentphase2/pacs-land-allotmentphase2.component';
import { PacsLandHandOverphaseComponent } from './components/pacs-land-hand-overphase/pacs-land-hand-overphase.component';
import { PacsLandAllotmentphasetwoComponent } from './components/pacs-land-allotmentphasetwo/pacs-land-allotmentphasetwo.component';
import { PacsLandallotmentphaseThreeInsComponent } from './components/pacs-landallotmentphase-three-ins/pacs-landallotmentphase-three-ins.component';
import { PacsLandallotmentphaseThreeRptComponent } from './components/pacs-landallotmentphase-three-rpt/pacs-landallotmentphase-three-rpt.component';
import { PacsLandHandOverPhaseTwoComponent } from './components/pacs-land-hand-over-phase-two/pacs-land-hand-over-phase-two.component';
import { PacsLandHandoverPhaseThreeComponent } from './components/pacs-land-handover-phase-three/pacs-land-handover-phase-three.component';
import { NewMasterDetailsAddComponent } from './components/new-master-details-add/new-master-details-add.component';
import { CeoRegDetailsComponent } from './components/ceo-reg-details/ceo-reg-details.component';
import { DeleteDetailsPhaseWhiseComponent } from './components/delete-details-phase-whise/delete-details-phase-whise.component';
import { PacsWiseDeviceRecStatusRptComponent } from './components/pacs-wise-device-rec-status-rpt/pacs-wise-device-rec-status-rpt.component';
import { PacsComputerisationAbstractDistRptComponent } from './components/pacs-computerisation-abstract-dist-rpt/pacs-computerisation-abstract-dist-rpt.component';
import { PacsComputerisationAbstractDistDetailsComponent } from './components/pacs-computerisation-abstract-dist-details/pacs-computerisation-abstract-dist-details.component';
import { PacsComputerisationAbstractDivisionRptComponent } from './components/pacs-computerisation-abstract-division-rpt/pacs-computerisation-abstract-division-rpt.component';
import { PacsComputerisationAbstractDivisionDetailsComponent } from './components/pacs-computerisation-abstract-division-details/pacs-computerisation-abstract-division-details.component';
import { NotCompletedPacsDetailsComponent } from './components/not-completed-pacs-details/not-completed-pacs-details.component';
import { NotCompletedPacsRptComponent } from './components/not-completed-pacs-rpt/not-completed-pacs-rpt.component';
import { CompletedPacsForSiteDetailsComponent } from './components/completed-pacs-for-site-details/completed-pacs-for-site-details.component';
import { CompletedPacsForSiteRptComponent } from './components/completed-pacs-for-site-rpt/completed-pacs-for-site-rpt.component';
import { CompletedPacsForDeliveryDetailsComponent } from './components/completed-pacs-for-delivery-details/completed-pacs-for-delivery-details.component';
import { CompletedPacsForDeliveryRptComponent } from './components/completed-pacs-for-delivery-rpt/completed-pacs-for-delivery-rpt.component';
import { CompletedPacsForInstallationDetailsComponent } from './components/completed-pacs-for-installation-details/completed-pacs-for-installation-details.component';
import { CompletedPacsForInstallationRptComponent } from './components/completed-pacs-for-installation-rpt/completed-pacs-for-installation-rpt.component';
import { SitePacsDeleteRptComponent } from './components/site-pacs-delete-rpt/site-pacs-delete-rpt.component';
import { TechnicialManagerComponent } from './components/technicial-manager/technicial-manager.component';
import { CalibrationPaymentsComponent } from './components/calibration-payments/calibration-payments.component';
import { CalibrationPaymentsReportComponent } from './components/calibration-payments-report/calibration-payments-report.component';
import { FinalApprovalCalibrationPaymentsComponent } from './components/final-approval-calibration-payments/final-approval-calibration-payments.component';
import { CalibrationStateLevelAbstractReportComponent } from './components/calibration-state-level-abstract-report/calibration-state-level-abstract-report.component';
import { CalibrationPacsTotalReportComponent } from './components/calibration-pacs-total-report/calibration-pacs-total-report.component';
import { PaymentStatusReportDetailsComponent } from './components/payment-status-report-details/payment-status-report-details.component';
import { CeoDetailsEditAndUpdateComponent } from './components/ceo-details-edit-and-update/ceo-details-edit-and-update.component';
import { FinalCertificateCompletedDetailsComponent } from './components/final-certificate-completed-details/final-certificate-completed-details.component';
import { FinalCertificateCompletedRptComponent } from './components/final-certificate-completed-rpt/final-certificate-completed-rpt.component';
import { PacsRemarksReportComponent } from './components/pacs-remarks-report/pacs-remarks-report.component';
import { PacsCertificateComponent } from './components/pacs-certificate/pacs-certificate.component';
import { HardwarePaymentsTotalnoofPacsReportComponent } from './components/hardware-payments-totalnoof-pacs-report/hardware-payments-totalnoof-pacs-report.component';
import { HardwarePaymentsTotalnoofPacsDetailsComponent } from './components/hardware-payments-totalnoof-pacs-details/hardware-payments-totalnoof-pacs-details.component';
import { CalibrationPacsTotalDetailsComponent } from './components/calibration-pacs-total-details/calibration-pacs-total-details.component';
import { HardwarePaymentPacsDetailsComponent } from './components/hardware-payment-pacs-details/hardware-payment-pacs-details.component';
import { HardwarePaymentPacsRptComponent } from './components/hardware-payment-pacs-rpt/hardware-payment-pacs-rpt.component';
import { CalibrationStateLevelAbstractDetailsComponent } from './components/calibration-state-level-abstract-details/calibration-state-level-abstract-details.component';
import { CalibrationSubmittedDetailsComponent } from './components/calibration-submitted-details/calibration-submitted-details.component';
import { CalibrationSubmittedReporComponent } from './components/calibration-submitted-repor/calibration-submitted-repor.component';
import { ApcobDgmFileDetailspendingComponent } from './components/apcob-dgm-file-detailspending/apcob-dgm-file-detailspending.component';
import { InternetVerificationComponent } from './internet-verification/internet-verification.component';
import { InternetDepartmentVerificationComponent } from './components/internet-department-verification/internet-department-verification.component';
import { CalibrationInternetDetailsReportComponent } from './components/calibration-internet-details-report/calibration-internet-details-report.component';

@NgModule({
  declarations: [
    SharedComponent,
    PlaStateReportComponent,
    PlaDistrictReportComponent,
    PlaMandalReportComponent,
    MliStateReportComponent,
    MliDistrictReportComponent,
    MliMandalReportComponent,
    PasswordresetComponent,
    PacsmasterComponent,
    MliVillageReportComponent,
    PacsgeotagginglistComponent,
    PacksgismapComponent,
    EmployeeComponent,
    PacsLandAllotmentphase2Component,
    PacsLandHandOverphaseComponent,
    PacsLandAllotmentphasetwoComponent,
    PacsLandallotmentphaseThreeInsComponent,
    PacsLandallotmentphaseThreeRptComponent,
    PacsLandHandOverPhaseTwoComponent,
    PacsLandHandoverPhaseThreeComponent,
    NewMasterDetailsAddComponent,
    CeoRegDetailsComponent,
    DeleteDetailsPhaseWhiseComponent,
    PacsWiseDeviceRecStatusRptComponent,
    PacsComputerisationAbstractDistRptComponent,
    PacsComputerisationAbstractDistDetailsComponent,
    PacsComputerisationAbstractDivisionRptComponent,
    PacsComputerisationAbstractDivisionDetailsComponent,
    NotCompletedPacsDetailsComponent,
    NotCompletedPacsRptComponent,
    CompletedPacsForSiteDetailsComponent,
    CompletedPacsForSiteRptComponent,
    CompletedPacsForDeliveryDetailsComponent,
    CompletedPacsForDeliveryRptComponent,
    CompletedPacsForInstallationDetailsComponent,
    CompletedPacsForInstallationRptComponent,
    SitePacsDeleteRptComponent,
    TechnicialManagerComponent,
    CalibrationPaymentsComponent,
    CalibrationPaymentsReportComponent,
    FinalApprovalCalibrationPaymentsComponent,
    CalibrationStateLevelAbstractReportComponent,
    CalibrationPacsTotalReportComponent,
    PaymentStatusReportDetailsComponent,
    CeoDetailsEditAndUpdateComponent,
    FinalCertificateCompletedDetailsComponent,
    FinalCertificateCompletedRptComponent,
    PacsRemarksReportComponent,
    PacsCertificateComponent,
    HardwarePaymentsTotalnoofPacsReportComponent,
    HardwarePaymentsTotalnoofPacsDetailsComponent,
    CalibrationPacsTotalDetailsComponent,
    HardwarePaymentPacsDetailsComponent,
    HardwarePaymentPacsRptComponent,
    CalibrationStateLevelAbstractDetailsComponent,
    CalibrationSubmittedDetailsComponent,
    CalibrationSubmittedReporComponent,
    ApcobDgmFileDetailspendingComponent,
    InternetVerificationComponent,
    InternetDepartmentVerificationComponent,
    CalibrationInternetDetailsReportComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    PacsLandAllotmentModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    SharedModule,
    MpfcLandInspectionModule
  ],
  exports:[
    PacsComputerisationAbstractDistRptComponent,
    PacsComputerisationAbstractDistDetailsComponent,
    PacsComputerisationAbstractDivisionRptComponent,
    PacsComputerisationAbstractDivisionDetailsComponent,
    NotCompletedPacsDetailsComponent,
    NotCompletedPacsRptComponent, 
    CompletedPacsForSiteDetailsComponent,
    CompletedPacsForSiteRptComponent,
    CompletedPacsForDeliveryDetailsComponent,
    CompletedPacsForDeliveryRptComponent,
    CompletedPacsForInstallationDetailsComponent,
    CompletedPacsForInstallationRptComponent,
    FinalCertificateCompletedRptComponent,
    FinalCertificateCompletedDetailsComponent,
    PacsRemarksReportComponent
    ,HardwarePaymentsTotalnoofPacsReportComponent,
    HardwarePaymentsTotalnoofPacsDetailsComponent,
    HardwarePaymentPacsRptComponent,
    CalibrationSubmittedReporComponent
    
  ]
  
})
export class AdminModule {
  
}

