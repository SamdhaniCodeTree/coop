import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TechnicRoutingModule } from './technic-routing.module';
import { CalibrationCopsComponent } from './components/calibration-cops/calibration-cops.component';
import { CommonComponent } from './components/common/common.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { HomeComponent } from './components/home/home.component';
import { DmtdetailsaprComponent } from './components/dmtdetailsapr/dmtdetailsapr.component';
import { AdminModule } from '../adminModule/admin.module';
import { InternetConnectionCalibComponent } from './components/internet-connection-calib/internet-connection-calib.component';
 


@NgModule({
  declarations: [CalibrationCopsComponent, CommonComponent, HomeComponent, DmtdetailsaprComponent, InternetConnectionCalibComponent],
  imports: [
    CommonModule,
    TechnicRoutingModule,
    FormsModule,
    ReactiveFormsModule,BsDatepickerModule,AdminModule    
  ]
})
export class TechnicModule { }
