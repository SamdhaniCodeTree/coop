import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CallcenterRoutingModule } from './callcenter-routing.module';
import { SharedComponent } from './components/shared/shared.component';


@NgModule({
  declarations: [SharedComponent],
  imports: [
    CommonModule,
    CallcenterRoutingModule
  ]
})
export class CallcenterModule { }
