import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DmtRoutingModule } from './dmt-routing.module';
import { HomeComponent } from './components/home/home.component';
import { SharedComponent } from './components/shared/shared.component';
import { SharedModule } from '../sharedModule/shared.module';


@NgModule({
  declarations: [ SharedComponent,HomeComponent],
  imports: [
    CommonModule,
    DmtRoutingModule,
    SharedModule
  ]
})
export class DmtModule {
  
 }
