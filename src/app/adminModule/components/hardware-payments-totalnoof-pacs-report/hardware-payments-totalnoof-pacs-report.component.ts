import { formatDate } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { request } from 'http';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { PacsLandAllotmentService } from 'src/app/reportsModule/pacsLandAllotment/services/pacs-land-allotment.service';
import { SessionService } from 'src/app/sharedModule/services/session.service';
import { SharedService } from 'src/app/sharedModule/services/shared.service';
import { ToasterService } from 'src/app/sharedModule/services/toaster.service';
import { UtilsService } from 'src/app/sharedModule/services/utils.service';

@Component({
  selector: 'app-hardware-payments-totalnoof-pacs-report',
  templateUrl: './hardware-payments-totalnoof-pacs-report.component.html',
  styleUrls: ['./hardware-payments-totalnoof-pacs-report.component.css']
})
export class HardwarePaymentsTotalnoofPacsReportComponent implements OnInit {

  type: any;
  statusId: any;
  districtName: any;
   divisionName: any;
 districtId: any;
   divisionId: any;
   userName: any;
   fromDate: any;
   toDate: any;

   district=false;

division=false;


   input:any;
  constructor(

    private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private allotmentAPI: PacsLandAllotmentService,
    private utils: UtilsService,
    
    private route: ActivatedRoute,
    private session: SessionService,
    private router: Router
  ) { 
    route.queryParams.subscribe((params) => (this.input = params['request']));
  }

  ngOnInit(): void {    debugger;

    const decString = JSON.parse(this.utils.decrypt(this.input)); 
    this.type = decString.type;
    this.statusId = decString.statusId; 
    this.fromDate = decString.fromDate; 
    this.toDate = decString.toDate; 
      
  }

  onPacsChange(result:any){

    if(this.session.role=='1')
    {
      this.router.navigate(['/admin/HardwarePaymentsPacsRpt'], {      
        queryParams:{request:result}     });
    } else if(this.session.role=='701')
    {
      this.router.navigate(['/dccb/HardwarePaymentsPacsRpt'], {      
        queryParams:{request:result} });
    }

  }

  btnBack(): void { 
    
    if(this.session.role=='1')
    {
      this.router.navigate(['/admin/CalibrationPacsTotalReport'], {      
      });
    }
    else if(this.session.role=='701')
    {
      this.router.navigate(['/dccb/CalibrationPacsTotalReport'], {      
      });
    }
    
       
      }


  // btnBack(): void {  

  //   //     const result = this.utils.encrypt(JSON.stringify(this.typeid));
  //   //         this.router.navigate(['/admin/CalibrationStateLevelAbstractReport'], {
  //   //             queryParams: { request: result },
  //   //         });
        
  //       // this.router.navigate(['/admin/CalibrationStateLevelAbstractReport'], {
  //       //   //queryParams: { request: encryptedString},
  //       //       });
  //       const req = {
  //         fromDate : this.fromDate,
  //         toDate   :this.toDate
  //       } 
  //       if(this.session.role =='1'){ 
  //         const result = this.utils.encrypt(JSON.stringify(req));
  //           this.router.navigate(['/admin/CalibrationPacsTotalReport'], {
  //               queryParams: { request: result },
  //           });
  //       }
  //       else if(this.session.role =='701'){
  //         const result = this.utils.encrypt(JSON.stringify(req));
  //           this.router.navigate(['/dccb/CalibrationPacsTotalReport'], {
  //               queryParams: { request: result },
  //           });
  //        }
    
  //        else if(this.session.role =='702'){
  //         const result = this.utils.encrypt(JSON.stringify(req));
  //           this.router.navigate(['/dccbhwv/CalibrationPacsTotalReport'], {
  //               queryParams: { request: result },
  //           });
            
  //        }
  //       else if(this.session.role =='502'){
  //         const result = this.utils.encrypt(JSON.stringify(req));
  //           this.router.navigate(['/jc/CalibrationPacsTotalReport'], {
  //               queryParams: { request: result },
  //           });
           
  //        }
    
  //        else if(this.session.role =='101'){
  //         const result = this.utils.encrypt(JSON.stringify(req));
  //           this.router.navigate(['/dco/CalibrationPacsTotalReport'], {
  //               queryParams: { request: result },
  //           });
           
  //        }
    
  //        else if(this.session.role =='501'){
  //         const result = this.utils.encrypt(JSON.stringify(req));
  //         this.router.navigate(['/dllic/CalibrationPacsTotalReport'], {
  //             queryParams: { request: result },
  //           });
           
  //        }
  //        else if(this.session.role =='301'){
  //         const result = this.utils.encrypt(JSON.stringify(req));
  //         this.router.navigate(['/ceo/CalibrationPacsTotalReport'], {
  //             queryParams: { request: result },
  //           });
           
  //        }
  //        else if(this.session.role =='302'){
    
  //         const result = this.utils.encrypt(JSON.stringify(req));
  //         this.router.navigate(['/Superriser/CalibrationPacsTotalReport'], {
  //             queryParams: { request: result },
  //           });
           
  //        }
  //        else if(this.session.role =='303'){
  //         const result = this.utils.encrypt(JSON.stringify(req));
  //         this.router.navigate(['/technican/CalibrationPacsTotalReport'], {
  //             queryParams: { request: result },
  //           });
            
  //       }
  //        else if(this.session.role =='222'){
  //         const result = this.utils.encrypt(JSON.stringify(req));
  //         this.router.navigate(['/apcob/CalibrationPacsTotalReport'], {
  //             queryParams: { request: result },
  //           });
           
  //        }
  //   //     else if(this.session.role =='702'){
  //   //       const result = this.utils.encrypt(JSON.stringify(this.typeid));
  //   //       this.router.navigate(['/admin/CalibrationStateLevelAbstractReport'], {
  //   //           queryParams: { request: result },
  //   //         }); 
  //   //      }
  //   //     else if(this.session.role =='502'){
  //   //       const result = this.utils.encrypt(JSON.stringify(this.typeid));
  //   //         this.router.navigate(['/admin/CalibrationStateLevelAbstractReport'], {
  //   //             queryParams: { request: result },
  //   //         });
  //   //      }
    
  //   //      else if(this.session.role =='101'){
  //   //       const result = this.utils.encrypt(JSON.stringify(this.typeid));
  //   //         this.router.navigate(['/admin/CalibrationStateLevelAbstractReport'], {
  //   //             queryParams: { request: result },
  //   //         });
  //   //      }
    
  //   //      else if(this.session.role =='501'){
  //   //       const result = this.utils.encrypt(JSON.stringify(this.typeid));
  //   //         this.router.navigate(['/admin/CalibrationStateLevelAbstractReport'], {
  //   //             queryParams: { request: result },
  //   //         });
  //   //      }
  //   //      else if(this.session.role =='301'){
  //   //       const result = this.utils.encrypt(JSON.stringify(this.typeid));
  //   //       this.router.navigate(['/admin/CalibrationStateLevelAbstractReport'], {
  //   //           queryParams: { request: result },
  //   //         });
  //   //      }
  //   //      else if(this.session.role =='302'){
  //   //       const result = this.utils.encrypt(JSON.stringify(this.typeid));
  //   //         this.router.navigate(['/admin/CalibrationStateLevelAbstractReport'], {
  //   //             queryParams: { request: result },
  //   //         });
  //   //      }
  //   //      else if(this.session.role =='303'){
  //   //       const result = this.utils.encrypt(JSON.stringify(this.typeid));
  //   //         this.router.navigate(['/admin/CalibrationStateLevelAbstractReport'], {
  //   //             queryParams: { request: result },
  //   //         });
  //   //     }
  //   //      else if(this.session.role =='222'){
  //   //       const result = this.utils.encrypt(JSON.stringify(this.typeid));
  //   //         this.router.navigate(['/admin/CalibrationStateLevelAbstractReport'], {
  //   //             queryParams: { request: result },
  //   //         });
  //   //      }
  //          }
 

}