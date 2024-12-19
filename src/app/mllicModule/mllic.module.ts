import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MllicRoutingModule } from './mllic-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { SharedModule } from '../sharedModule/shared.module';
import { SharedComponent } from './components/shared/shared.component';
import { FinishingLevelComponent } from './components/construction/finishing-level/finishing-level.component';

@NgModule({
  declarations: [SharedComponent, FinishingLevelComponent],
  imports: [
    CommonModule,
    MllicRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    SharedModule,
  ],
})
export class MllicModule {}
