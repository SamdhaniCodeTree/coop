import { Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { SessionService } from 'src/app/sharedModule/services/session.service';
import { ToasterService } from 'src/app/sharedModule/services/toaster.service';
import { UtilsService } from 'src/app/sharedModule/services/utils.service';
import { PacsComputerisationAbstractDistDetailsComponent } from '../pacs-computerisation-abstract-dist-details/pacs-computerisation-abstract-dist-details.component';

@Component({
  selector: 'app-pacs-computerisation-abstract-dist-rpt',
  templateUrl: './pacs-computerisation-abstract-dist-rpt.component.html',
  styleUrls: ['./pacs-computerisation-abstract-dist-rpt.component.css']
})
export class PacsComputerisationAbstractDistRptComponent implements OnInit {

  @ViewChild(PacsComputerisationAbstractDistDetailsComponent)
  private promoterState!: PacsComputerisationAbstractDistDetailsComponent;

  type:any; 
  districtName:any;
  districtId:any;

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
    this.fromDate =new Date('08-01-2023');//moment(this.session.getFromDateString()).format('DD-MM-YYYY');
    this.toDate =new Date();// this.session.getTodayDateString();

    //  this.FromDateformat=moment(this.fromDate, 'DD/MM/YYYY').format('YYYY/MM/DD');
    //  this.ToDateformat=moment(this.toDate, 'DD/MM/YYYY').format('YYYY/MM/DD');

    this.reportFromDate=moment(this.fromDate, 'DD/MM/YY').format('YYYY/MM/DD');
    this.reportToDate=moment(this.toDate, 'DD/MM/YY').format('YYYY/MM/DD');
    debugger;

this.btnReportLoading();
  }  
  btnReportLoading(): void {
    if (this.utils.isEmpty(this.fromDate)) {
      this.toast.warning('From Date Is Empty');
      return;
    }
    if (this.utils.isEmpty(this.toDate)) {
      this.toast.warning('To Date Is Empty');
      return;
    } 
    // this.reportFromDate = this.fromDate;
    // this.reportToDate = this.toDate;
    //this.tempId = this.utils.getRandomId();
    this.promoterState.loadReport();
  }
  onDistrictChange(result: any): void { 
       
      if(this.session.role ==='701'){
        this.router.navigate(['/dccb/DivisionWiseAbstractReport'], {
          queryParams: { request: result },
        }); 
      }
      else if(this.session.role ==='702'){
        this.router.navigate(['/dccbhwv/DivisionWiseAbstractReport'], {
          queryParams: { request: result },
        }); 
      }
      else if(this.session.role ==='303'){
        this.router.navigate(['/technican/DivisionWiseAbstractReport'], {
          queryParams: { request: result },
        }); 
      }
      else if(this.session.role ==='222'){
        this.router.navigate(['/apcob/DivisionWiseAbstractReport'], {
          queryParams: { request: result },
        }); 
      }
      else{
        this.router.navigate(['/admin/DivisionWiseAbstractReport'], {
          queryParams: { request: result },
        });
      }
  }
  onSiteNotDoneChange(result: any): void { 
    if(this.session.role ==='701'){
      this.router.navigate(['/dccb/NotCompletedPacsRpt'], {
        queryParams: { request: result },
      }); 
    }
    else if(this.session.role ==='702'){
      this.router.navigate(['/dccbhwv/NotCompletedPacsRpt'], {
        queryParams: { request: result },
      }); 
    }
    else if(this.session.role ==='303'){
      this.router.navigate(['/technican/NotCompletedPacsRpt'], {
        queryParams: { request: result },
      }); 
    }
    else if(this.session.role ==='222'){
      this.router.navigate(['/apcob/NotCompletedPacsRpt'], {
        queryParams: { request: result },
      }); 
    }
    else{
      this.router.navigate(['/admin/NotCompletedPacsRpt'], {
        queryParams: { request: result },
      });
    }
       
  }
  ondeviceNotDoneChange(result: any): void { 
    if(this.session.role ==='701'){
      this.router.navigate(['/dccb/NotCompletedPacsRpt'], {
        queryParams: { request: result },
      }); 
    }
    else if(this.session.role ==='702'){
      this.router.navigate(['/dccbhwv/NotCompletedPacsRpt'], {
        queryParams: { request: result },
      }); 
    }
    else if(this.session.role ==='303'){
      this.router.navigate(['/technican/NotCompletedPacsRpt'], {
        queryParams: { request: result },
      }); 
    }
    else if(this.session.role ==='222'){
      this.router.navigate(['/apcob/NotCompletedPacsRpt'], {
        queryParams: { request: result },
      }); 
    }
    else{
      this.router.navigate(['/admin/NotCompletedPacsRpt'], {
        queryParams: { request: result },
      });
    }

       
  }
  oncalibNotDoneChange(result: any): void { 

    if(this.session.role ==='701'){
      this.router.navigate(['/dccb/NotCompletedPacsRpt'], {
        queryParams: { request: result },
      }); 
    }
    else if(this.session.role ==='702'){
      this.router.navigate(['/dccbhwv/NotCompletedPacsRpt'], {
        queryParams: { request: result },
      }); 
    }
    else if(this.session.role ==='303'){
      this.router.navigate(['/technican/NotCompletedPacsRpt'], {
        queryParams: { request: result },
      }); 
    }
    else if(this.session.role ==='222'){
      this.router.navigate(['/apcob/NotCompletedPacsRpt'], {
        queryParams: { request: result },
      }); 
    }
    else{
      this.router.navigate(['/admin/NotCompletedPacsRpt'], {
        queryParams: { request: result },
      });
    }
      
  }
  onDMTNotDoneChange(result: any): void { 
    if(this.session.role ==='701'){
      this.router.navigate(['/dccb/NotCompletedPacsRpt'], {
        queryParams: { request: result },
      }); 
    }
    else if(this.session.role ==='702'){
      this.router.navigate(['/dccbhwv/NotCompletedPacsRpt'], {
        queryParams: { request: result },
      }); 
    }
    else if(this.session.role ==='303'){
      this.router.navigate(['/technican/NotCompletedPacsRpt'], {
        queryParams: { request: result },
      }); 
    }
    else if(this.session.role ==='222'){
      this.router.navigate(['/apcob/NotCompletedPacsRpt'], {
        queryParams: { request: result },
      }); 
    }
    else{
      this.router.navigate(['/admin/NotCompletedPacsRpt'], {
        queryParams: { request: result },
      });
    }
       
  } 
  onSiteDoneChange(result: any): void { 

    if(this.session.role ==='701'){
      this.router.navigate(['/dccb/CompletedPacsForSiteRpt'], {
        queryParams: { request: result },
      }); 
    }
    else if(this.session.role ==='702'){
      this.router.navigate(['/dccbhwv/CompletedPacsForSiteRpt'], {
        queryParams: { request: result },
      }); 
    }
    else if(this.session.role ==='303'){
      this.router.navigate(['/technican/CompletedPacsForSiteRpt'], {
        queryParams: { request: result },
      }); 
    }
    else if(this.session.role ==='222'){
      this.router.navigate(['/apcob/CompletedPacsForSiteRpt'], {
        queryParams: { request: result },
      }); 
    }
    else{
      this.router.navigate(['/admin/CompletedPacsForSiteRpt'], {
        queryParams: { request: result },
      });
    }
      
  } 
  onDeviceDoneChange(result: any): void { 
    if(this.session.role ==='701'){
      this.router.navigate(['/dccb/CompletedPacsForDeliveryRpt'], {
        queryParams: { request: result },
      }); 
    }
    else if(this.session.role ==='702'){
      this.router.navigate(['/dccbhwv/CompletedPacsForDeliveryRpt'], {
        queryParams: { request: result },
      }); 
    }
    else if(this.session.role ==='303'){
      this.router.navigate(['/technican/CompletedPacsForDeliveryRpt'], {
        queryParams: { request: result },
      }); 
    }
    else if(this.session.role ==='222'){
      this.router.navigate(['/apcob/CompletedPacsForDeliveryRpt'], {
        queryParams: { request: result },
      }); 
    }
    else{
      this.router.navigate(['/admin/CompletedPacsForDeliveryRpt'], {
        queryParams: { request: result },
      });
    }
        
  } 
  onInstallDoneChange(result: any): void { 
    if(this.session.role ==='701'){
      this.router.navigate(['/dccb/CompletedPacsForInstallationRpt'], {
        queryParams: { request: result },
      }); 
    }
    else if(this.session.role ==='702'){
      this.router.navigate(['/dccbhwv/CompletedPacsForInstallationRpt'], {
        queryParams: { request: result },
      }); 
    }
    else if(this.session.role ==='303'){
      this.router.navigate(['/technican/CompletedPacsForInstallationRpt'], {
        queryParams: { request: result },
      }); 
    }
    else if(this.session.role ==='222'){
      this.router.navigate(['/apcob/CompletedPacsForInstallationRpt'], {
        queryParams: { request: result },
      }); 
    }
    else{
      this.router.navigate(['/admin/CompletedPacsForInstallationRpt'], {
        queryParams: { request: result },
      });
    }

        
  } 
  onDMTDoneChange(result: any): void { 
    if(this.session.role ==='701'){
      this.router.navigate(['/dccb/FinalCertificateCompletedRpt'], {
        queryParams: { request: result },
      }); 
    }
    else if(this.session.role ==='702'){
      this.router.navigate(['/dccbhwv/FinalCertificateCompletedRpt'], {
        queryParams: { request: result },
      }); 
    }
    else if(this.session.role ==='303'){
      this.router.navigate(['/technican/FinalCertificateCompletedRpt'], {
        queryParams: { request: result },
      }); 
    }
    else if(this.session.role ==='222'){
      this.router.navigate(['/apcob/FinalCertificateCompletedRpt'], {
        queryParams: { request: result },
      }); 
    }
    else{
      this.router.navigate(['/admin/FinalCertificateCompletedRpt'], {
        queryParams: { request: result },
      });
    }

        
  } 


  FromdateChange(){  
    this.reportFromDate=moment(this.fromDate, 'DD/MM/YY').format('YYYY/MM/DD');
  }
  TodateChange(){
    this.reportToDate=moment(this.toDate, 'DD/MM/YY').format('YYYY/MM/DD');
  }





  
  // btnLoadReport(): void {   
  
  // }

}
