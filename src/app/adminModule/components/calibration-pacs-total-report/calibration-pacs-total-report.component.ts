import { formatDate } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { PacsLandAllotmentService } from 'src/app/reportsModule/pacsLandAllotment/services/pacs-land-allotment.service';
import { SessionService } from 'src/app/sharedModule/services/session.service';
import { SharedService } from 'src/app/sharedModule/services/shared.service';
import { ToasterService } from 'src/app/sharedModule/services/toaster.service';
import { UtilsService } from 'src/app/sharedModule/services/utils.service';
import { CalibrationPacsTotalDetailsComponent } from '../calibration-pacs-total-details/calibration-pacs-total-details.component';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import * as moment from 'moment';

@Component({
  selector: 'app-calibration-pacs-total-report',
  templateUrl: './calibration-pacs-total-report.component.html',
  styleUrls: ['./calibration-pacs-total-report.component.css']
})
export class CalibrationPacsTotalReportComponent implements OnInit {

  @ViewChild(CalibrationPacsTotalDetailsComponent)
  private NoofPacsRpt!: CalibrationPacsTotalDetailsComponent;
  bsDatepickerConfig: Partial<BsDatepickerConfig> = this.utils.getbsdatepicker();
  tempId: any;
  fromDate: any;
  toDate: any;
  reportFromDate: any;
  reportToDate: any;
  minDate!: Date;
  maxDate!: Date;
  type:any; 
  districtName:any;
  districtId:any;
  FromDateformat:any;
  ToDateformat:any;
  input:any;
  constructor(
    private router: Router,
    private toast: ToasterService,
    private session: SessionService,
    private utils: UtilsService,
    private route: ActivatedRoute,
  ) {
   // route.queryParams.subscribe((params) => (this.input = params['request']));
  }
  ngOnInit(): void { 
    this.minDate =new Date()// this.session.getMinDate();
    this.maxDate = new Date();
    this.fromDate =new Date('08-01-2023');//moment(this.session.getFromDateString()).format('DD-MM-YYYY');
    this.toDate =new Date();// this.session.getTodayDateString();

     //this.FromDateformat=moment(this.fromDate, 'DD-MM-YYYY').format('YYYY/MM/DD');
     //this.ToDateformat=moment(this.toDate, 'DD-MM-YYYY').format('YYYY/MM/DD');
     //this.btnLoadReport();

     this.reportFromDate=moment(this.fromDate, 'DD-MM-YYYY').format('DD-MM-YYYY');
     this.reportToDate=moment(this.toDate, 'DD-MM-YYYY').format('DD-MM-YYYY');

    //  this.reportFromDate=moment(this.fromDate, 'DD-MM-YYYY').format('YYYY/MM/DD');
    //  this.reportToDate=moment(this.toDate, 'DD-MM-YYYY').format('YYYY/MM/DD');
debugger;
  //    const decString = JSON.parse(this.utils.decrypt(this.input));  
  //    this.fromDate=decString.fromDate;
  //    this.toDate=decString.toDate;
 
  //    if (this.input != undefined) {
  //      const decString = JSON.parse(this.utils.decrypt(this.input));
  //      this.fromDate=decString.fromDate;
  //      this.toDate=decString.toDate;
  //      this.btnLoadReport();
  // }  
}
  onNoofPacsChange(result: any): void {  
    if(this.session.role=='1')
    {
      this.router.navigate(['/admin/HardwarePaymentsTotalnoofPacs'], {
        queryParams: { request: result },
      }); 
    }
    else if(this.session.role=='701')
    {
      this.router.navigate(['/dccb/HardwarePaymentsTotalnoofPacs'], {
        queryParams: { request: result },
      }); 
    }
         
  } 
  // onNodalNoofPacsChange(result: any): void {  
  //       this.router.navigate(['/admin/HardwarePaymentsTotalnoofPacs'], {
  //         queryParams: { request: result },
  //       });  
  // } 
  // onCCRcsNoofPacsChange(result: any): void {  
  //       this.router.navigate(['/admin/HardwarePaymentsTotalnoofPacs'], {
  //         queryParams: { request: result },
  //       });  
  // } 
  
  // btnLoadReport(): void {   debugger;
  //   this.NoofPacsRpt.loadReport();
  // }

  btnLoadReport(): void {
    debugger;
    if (this.utils.isEmpty(this.fromDate)) {
      this.toast.warning('From Date Is Empty');
      return;
    }
    else if (this.utils.isEmpty(this.toDate)) {
      this.toast.warning('To Date Is Empty');
      return;
    }
     else{ 
      this.NoofPacsRpt.loadReport();
    }
   
  }

  FromDateChange()
  {
    this.reportFromDate=moment(this.fromDate, 'DD-MM-YYYY').format('DD-MM-YYYY');
    //this.reportFromDate=moment(this.fromDate, 'DD-MM-YYYY').format('YYYY/MM/DD');
    //console.log( this.reportFromDate);
  }
  ToDateChange()
  {
    this.reportToDate=moment(this.toDate, 'DD-MM-YYYY').format('DD-MM-YYYY');
   // this.reportToDate=moment(this.toDate, 'DD-MM-YYYY').format('YYYY/MM/DD');
  // console.log( this.reportToDate);
  }

}
