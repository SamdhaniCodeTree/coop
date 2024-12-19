import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CeoRoutingModule } from './ceo-routing.module';
import { SharedComponent } from './components/shared/shared.component';
import { DcmsInformationProformaComponent } from './components/dcms-information-proforma/dcms-information-proforma.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { SharedModule } from '../sharedModule/shared.module';
import { PacsLandInspectionComponent } from './components/pacs-land-inspection/pacs-land-inspection.component';
import { CeoDetailsEditUpdateComponent } from './components/ceo-details-edit-update/ceo-details-edit-update.component';
import { SitePreparationSubComponent } from './components/site-preparation-sub/site-preparation-sub.component';
import { CalibrationDeviceDatesInsComponent } from './components/calibration-device-dates-ins/calibration-device-dates-ins.component';
import { CalibrationInspectionDInsComponent } from './components/calibration-inspection-dins/calibration-inspection-dins.component';
import { HomeComponent } from './components/home/home.component';
import { CalibrationCopsUpdComponent } from './components/calibration-cops-upd/calibration-cops-upd.component';
import { AdminModule } from '../adminModule/admin.module';
import { InternetAproveRejectComponent } from './components/internet-aprove-reject/internet-aprove-reject.component';

@NgModule({
  declarations: [SharedComponent, DcmsInformationProformaComponent, PacsLandInspectionComponent, CeoDetailsEditUpdateComponent, SitePreparationSubComponent, CalibrationDeviceDatesInsComponent, CalibrationInspectionDInsComponent, HomeComponent, CalibrationCopsUpdComponent, InternetAproveRejectComponent],
  imports: [
    CommonModule,
    CeoRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AdminModule
  ]
})
export class CeoModule { }
