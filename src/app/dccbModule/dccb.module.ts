import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DccbRoutingModule } from './dccb-routing.module';
import { SharedComponent } from './components/shared/shared.component';
import { AdminModule } from '../adminModule/admin.module';
import { InternetVerificationDetailsComponent } from './internet-verification-details/internet-verification-details.component';


@NgModule({
  declarations: [SharedComponent, InternetVerificationDetailsComponent],
  imports: [
    CommonModule,
    DccbRoutingModule,
    AdminModule
  ]
})
export class DccbModule { }
