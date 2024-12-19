import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DllicRoutingModule } from './dllic-routing.module';
import { SharedComponent } from './components/shared/shared.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { SharedModule } from '../sharedModule/shared.module';
// tslint:disable-next-line: max-line-length
import { SiteInspectionUpdateComponent } from './components/siteInspectionDashboard/site-inspection-update/site-inspection-update.component';
import { InspectionDashboardComponent } from './components/siteInspectionDashboard/inspection-dashboard/inspection-dashboard.component';
import { SiteInspectionDllicComponent } from './components/site-inspection-dllic/site-inspection-dllic.component';
import { FinishingLevelDllicComponent } from './components/construction/finishing-level-dllic/finishing-level-dllic.component';
import { FoundationLevelDllicComponent } from './components/construction/foundation-level-dllic/foundation-level-dllic.component';
import { SuperStructureLevelDllicComponent } from './components/construction/super-structure-level-dllic/super-structure-level-dllic.component';
import { VillageStatusComponent } from './components/construction/village-status/village-status.component';
import { PacsgeotagginglistComponent } from './components/pacsgeotagginglist/pacsgeotagginglist.component';

@NgModule({
  declarations: [
    SharedComponent,
    SiteInspectionUpdateComponent,
    InspectionDashboardComponent,
    SiteInspectionDllicComponent,
    FinishingLevelDllicComponent,
    FoundationLevelDllicComponent,
    SuperStructureLevelDllicComponent,
    VillageStatusComponent,
    PacsgeotagginglistComponent,

  ],
  imports: [
    CommonModule,
    DllicRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    SharedModule,
  ],
})
export class DllicModule {}
