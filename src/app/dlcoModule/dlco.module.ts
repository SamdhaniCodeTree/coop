import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DlcoRoutingModule } from './dlco-routing.module';
import { SharedComponent } from './components/shared/shared.component';
import { PacsCreationComponent } from './components/pacs-creation/pacs-creation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CeoRegistrationComponent } from './components/ceo-registration/ceo-registration.component';
import { SharedModule } from '../sharedModule/shared.module';
import { CeoListComponent } from './components/ceo-list/ceo-list.component';
import { PacsListComponent } from './components/pacs-list/pacs-list.component';
import { DataTablesModule } from 'angular-datatables';
import { PacsgeotagginglistComponent } from './components/pacsgeotagginglist/pacsgeotagginglist.component';
import { PacsgeotaggingapprovalComponent } from './components/pacsgeotaggingapproval/pacsgeotaggingapproval.component';
import { PacksgismapComponent } from './components/packsgismap/packsgismap.component';
import { EmployeeComponent } from './components/registration/employee/employee.component';
import { RegcoopSocietieComponent } from './components/regcoop-societie/regcoop-societie.component';
import { IndSocietieregistrationComponent } from './components/ind-societieregistration/ind-societieregistration.component';
import { RegisteredSocietiesComponent } from './components/registered-societies/registered-societies.component';
import { RegisteredSocietyInsComponent } from './components/registered-society-ins/registered-society-ins.component';
import { SitePreparationGetDetailsComponent } from './components/site-preparation-get-details/site-preparation-get-details.component';
import { CalibrattionsPARDtailsComponent } from './components/calibrattions-pardtails/calibrattions-pardtails.component';


@NgModule({
  declarations: [
    SharedComponent,
    PacsCreationComponent,
    CeoRegistrationComponent,
    CeoListComponent,
    PacsListComponent,
    PacsgeotagginglistComponent,
    PacsgeotaggingapprovalComponent,
    PacksgismapComponent,
    EmployeeComponent,
    RegcoopSocietieComponent,
    IndSocietieregistrationComponent,
    RegisteredSocietiesComponent,
    RegisteredSocietyInsComponent,
    SitePreparationGetDetailsComponent,
    CalibrattionsPARDtailsComponent,
  ],
  imports: [
    CommonModule,
    DlcoRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class DlcoModule {}
