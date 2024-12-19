import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { SessionService } from 'src/app/sharedModule/services/session.service';
import { ToasterService } from 'src/app/sharedModule/services/toaster.service';
import { UtilsService } from 'src/app/sharedModule/services/utils.service';
import * as moment from 'moment';

@Component({
  selector: 'app-pla-state-report',
  templateUrl: './pla-state-report.component.html',
  styleUrls: ['./pla-state-report.component.css']
})
export class PlaStateReportComponent implements OnInit {

  bsDatepickerConfig: Partial<BsDatepickerConfig> = this.utils.getbsdatepicker();
  tempId: any;
  fromDate: any;
  toDate: any;
  reportFromDate: any;
  reportToDate: any;
  minDate!: Date;
  maxDate!: Date;

  FromDateformat:any;
  ToDateformat:any;

  constructor(
    private router: Router,
    private toast: ToasterService,
    private session: SessionService,
    private utils: UtilsService
  ) {}
  ngOnInit(): void {
    this.minDate =new Date()// this.session.getMinDate();
    this.maxDate = new Date();
    this.fromDate =new Date('01-01-2021');//moment(this.session.getFromDateString()).format('DD-MM-YYYY');
    this.toDate =new Date();// this.session.getTodayDateString();

    this.FromDateformat=moment(this.fromDate, 'DD-MM-YYYY').format('YYYY/MM/DD');
    this.ToDateformat=moment(this.toDate, 'DD-MM-YYYY').format('YYYY/MM/DD');

   // this.minDate = this.session.getMinDate();
   // this.maxDate = this.session.getTodayDate();
    // this.fromDate = this.session.getFromDateString();
    // this.toDate = this.session.getTodayDateString();
    this.btnLoadReport();
  }

  btnLoadReport(): void {
    if (this.utils.isEmpty(this.fromDate)) {
      this.toast.warning('From Date Is Empty');
      return;
    }
    if (this.utils.isEmpty(this.toDate)) {
      this.toast.warning('To Date Is Empty');
      return;
    }
    this.reportFromDate=moment(this.fromDate, 'DD-MM-YYYY').format('YYYY/MM/DD');
    this.reportToDate=moment(this.toDate, 'DD-MM-YYYY').format('YYYY/MM/DD');
    // this.reportFromDate = this.fromDate;
    // this.reportToDate = this.toDate;
    this.tempId = this.utils.getRandomId();
  }

  onDistrictChange(result: any): void {
   
    if(this.session.role=="501"|| this.session.role=="503" || this.session.role=="504" ) {
      this.router.navigate(['/dllic/pacsLandAllotmentDistrictReport'], {
        queryParams: { request: result },
      });
    }
   else if(this.session.role=="502") {
      this.router.navigate(['/jc/pacsLandAllotmentDistrictReport'], {
        queryParams: { request: result },
      });
    }
    else{
      this.router.navigate(['/admin/pacsLandAllotmentDistrictReport'], {
        queryParams: { request: result },
      });
    }
    
  }

}
