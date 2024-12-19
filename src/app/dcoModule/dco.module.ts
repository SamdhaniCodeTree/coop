import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DcoRoutingModule } from './dco-routing.module';
import { SharedComponent } from './components/shared/shared.component';
import { SocietyRegistrationComponent } from './components/society-registration/society-registration.component';
import { CeoListComponent } from './components/ceo-list/ceo-list.component';
import { PacsListComponent } from './components/pacs-list/pacs-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../sharedModule/shared.module';
import { DataTablesModule } from 'angular-datatables';
import { PacsLandInspectionComponent } from './components/pacs-land-inspection/pacs-land-inspection.component';

@NgModule({
  declarations: [
    SharedComponent,
    SocietyRegistrationComponent,
    CeoListComponent,
    PacsListComponent,
    PacsLandInspectionComponent,
  ],
  imports: [
    CommonModule,
    DcoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    SharedModule,
  ],
})
export class DcoModule {}
