import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperriserRoutingModule } from './superriser-routing.module';
import { SharedComponent } from './components/shared/shared.component';
import { HomeComponent } from './components/home/home.component';
import { SitePreparationAproveRejectComponent } from './components/site-preparation-aprove-reject/site-preparation-aprove-reject.component';


@NgModule({
  declarations: [SharedComponent, HomeComponent, SitePreparationAproveRejectComponent],
  imports: [
    CommonModule,
    SuperriserRoutingModule
  ]
})
export class SuperriserModule { }
