import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ServiceUnavailableComponent } from './components/service-unavailable/service-unavailable.component';
import { UnAuthorizedComponent } from './components/un-authorized/un-authorized.component';
import { ToastrModule } from 'ngx-toastr';
import { PasswordUpdateComponent } from './components/password-update/password-update.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MultiSelectDropdownComponent } from './components/multi-select-dropdown/multi-select-dropdown.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SiteInspectionComponent } from './components/constructionAndInspection/site-inspection/site-inspection.component';
import { FinishingLevelComponent } from './components/constructionAndInspection/construction/finishing-level/finishing-level.component';
import { FoundationLevelComponent } from './components/constructionAndInspection/construction/foundation-level/foundation-level.component';
import { SuperStructureLevelComponent } from './components/constructionAndInspection/construction/super-structure-level/super-structure-level.component';
import { ApplicantregistrationComponent } from './components/applicantregistration/applicantregistration.component';
import { NumbersOnly } from '../directives/NumberDirective';
import { DigitsDirective } from '../directives/DigitsDirective.directive';
import { LetterDirective } from '../directives/letters-only.directive';
import { AlphaNumbersDirective } from '../directives/alpha-numbers.directive';
import { dateDirective } from '../directives/date-only.directive';
import { SortDirective } from '../directives/sort.directive';

@NgModule({
  declarations: [
    PageNotFoundComponent,
    ServiceUnavailableComponent,
    UnAuthorizedComponent,
    PasswordUpdateComponent,
    MultiSelectDropdownComponent,
    DatePickerComponent,
    SiteInspectionComponent,
    FinishingLevelComponent,
    FoundationLevelComponent,
    SuperStructureLevelComponent,
    ApplicantregistrationComponent,  
    NumbersOnly,
     DigitsDirective,
     LetterDirective,
     AlphaNumbersDirective,
    dateDirective,SortDirective
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(), // ToastrModule added
    NgMultiSelectDropDownModule.forRoot(),
    BsDatepickerModule.forRoot()    
  ],
  exports : [
    SortDirective,
    MultiSelectDropdownComponent,
    DatePickerComponent,
    SiteInspectionComponent,
    FinishingLevelComponent,
    FoundationLevelComponent,
    SuperStructureLevelComponent,
    BsDatepickerModule, NumbersOnly,
    DigitsDirective,LetterDirective,
     AlphaNumbersDirective,
    dateDirective
  ]
})
export class SharedModule {}
