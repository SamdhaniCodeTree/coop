import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JcRoutingModule } from './jc-routing.module';
import { SharedComponent } from './components/shared/shared.component';
import { PacsLandHandOverComponent } from './components/pacs-land-hand-over/pacs-land-hand-over.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { SharedModule } from '../sharedModule/shared.module';
import { PacsLandAllotmentComponent } from './components/pacs-land-allotment/pacs-land-allotment.component';
import { AdminModule } from '../adminModule/admin.module';

@NgModule({
  declarations: [
    SharedComponent,
    PacsLandAllotmentComponent,
    PacsLandHandOverComponent,
  ],
  imports: [
    CommonModule,
    JcRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    SharedModule,
    AdminModule
  ],
})
export class JcModule {}
