import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MliStateComponent } from './components/mli-state/mli-state.component';
import { MliDistrictComponent } from './components/mli-district/mli-district.component';
import { MliMandalComponent } from './components/mli-mandal/mli-mandal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { SharedModule } from 'src/app/sharedModule/shared.module';
import { MliVillageComponent } from './components/mli-village/mli-village.component';
import { MliVillageStatusComponent } from './components/mli-village-status/mli-village-status.component';

@NgModule({
  declarations: [MliStateComponent, MliDistrictComponent, MliMandalComponent, MliVillageComponent, MliVillageStatusComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    SharedModule,
  ],
  exports: [MliStateComponent, MliDistrictComponent, MliMandalComponent],
})
export class MpfcLandInspectionModule {}
