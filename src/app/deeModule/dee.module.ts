import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeeRoutingModule } from './dee-routing.module';
import { SharedComponent } from './components/shared/shared.component';
import { SiteInspectionDeeComponent } from './components/site-inspection-dee/site-inspection-dee.component';
import { FoundationLevelDeeComponent } from './components/construction/foundation-level-dee/foundation-level-dee.component';
import { FinishingLevelDeeComponent } from './components/construction/finishing-level-dee/finishing-level-dee.component';
import { SuperStructureLevelDeeComponent } from './components/construction/super-structure-level-dee/super-structure-level-dee.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { SharedModule } from '../sharedModule/shared.module';

@NgModule({
  declarations: [
    SharedComponent,
    SiteInspectionDeeComponent,
    FoundationLevelDeeComponent,
    FinishingLevelDeeComponent,
    SuperStructureLevelDeeComponent,
  ],
  imports: [
    CommonModule,
    DeeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    SharedModule,
  ],
})
export class DeeModule {}
