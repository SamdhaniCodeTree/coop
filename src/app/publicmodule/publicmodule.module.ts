import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicmoduleRoutingModule } from './publicmodule-routing.module';
import { SharedComponent } from './components/shared/shared.component';
import { RegCoopSocIndividualComponent } from './components/reg-coop-soc-individual/reg-coop-soc-individual.component';
import { RrgistredCoopSocietiesComponent } from './components/rrgistred-coop-societies/rrgistred-coop-societies.component';
import { PublicCooperativeSocietyDetailsComponent } from './components/public-cooperative-society-details/public-cooperative-society-details.component';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PublicApplicationDetailsComponent } from './components/public-application-details/public-application-details.component';
import { PublicSocietyDetailsComponent } from './components/public-society-details/public-society-details.component';


@NgModule({
  declarations: [SharedComponent, RegCoopSocIndividualComponent, RrgistredCoopSocietiesComponent, PublicCooperativeSocietyDetailsComponent, PublicApplicationDetailsComponent, PublicSocietyDetailsComponent],
  imports: [
    CommonModule,
    PublicmoduleRoutingModule,
    BsDatepickerModule,
    FormsModule,
  ]
})
export class PublicmoduleModule { }
