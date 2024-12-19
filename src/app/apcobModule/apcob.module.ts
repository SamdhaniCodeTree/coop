import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApcobRoutingModule } from './apcob-routing.module';
import { AdminModule } from '../adminModule/admin.module';
import { SharedComponent } from './components/shared/shared.component';



@NgModule({
  declarations: [
    
    SharedComponent],
  imports: [
    CommonModule,
    ApcobRoutingModule,
    AdminModule
  ]
})
export class ApcobModule { }
