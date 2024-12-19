import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { HomeComponent } from './technicianModulee/components/home/home.component';
import { SharedComponent } from './dccbhwvModule/components/shared/shared.component';
import { CertificatePacsCodeComponent } from './apddcfModule/components/certificate-pacs-code/certificate-pacs-code.component';
//import { CalibrationComponent } from './technicianModule/components/calibration/calibration.component';





@NgModule({
  declarations: [AppComponent, HomeComponent, SharedComponent, CertificatePacsCodeComponent, ],
  imports: [
    
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    NgxSpinnerModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates : true,
      progressBar:true,
      progressAnimation : 'decreasing',
      tapToDismiss : true,
      maxOpened : 3,
      newestOnTop : true,

    }), // ToastrModule added
    BsDatepickerModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
