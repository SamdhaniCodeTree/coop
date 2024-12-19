import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlaStateComponent } from './components/pla-state/pla-state.component';
import { PlaDistrictComponent } from './components/pla-district/pla-district.component';
import { PlaMandalComponent } from './components/pla-mandal/pla-mandal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { SharedModule } from 'src/app/sharedModule/shared.module';

@NgModule({
  declarations: [PlaStateComponent, PlaDistrictComponent, PlaMandalComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    SharedModule,
  ],
  exports: [PlaStateComponent, PlaDistrictComponent, PlaMandalComponent],
})
export class PacsLandAllotmentModule {}
