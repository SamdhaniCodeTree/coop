import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpocRoutingModule } from './spoc-routing.module';
import { SharedComponent } from './components/shared/shared.component';


@NgModule({
  declarations: [SharedComponent],
  imports: [
    CommonModule,
    SpocRoutingModule
  ]
})
export class SpocModule { }
