import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { PacsLandAllotmentService } from 'src/app/reportsModule/pacsLandAllotment/services/pacs-land-allotment.service';
import { SessionService } from 'src/app/sharedModule/services/session.service';
import { ToasterService } from 'src/app/sharedModule/services/toaster.service';
import { UtilsService } from 'src/app/sharedModule/services/utils.service';

@Component({
  selector: 'app-calibration-submitted-repor',
  templateUrl: './calibration-submitted-repor.component.html',
  styleUrls: ['./calibration-submitted-repor.component.css']
})
export class CalibrationSubmittedReporComponent implements OnInit {

  type: any;
  statusId: any;
  districtName: any;
  districtcode: any;
  dccbName: any;
  dccbCode: any;
   divisionId: any;
   userName: any;
   typeid: any;
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
  HeadingName:any;
  ngOnInit(): void {    debugger;

    const decString = JSON.parse(this.utils.decrypt(this.input)); 
    this.type = decString.type;
    this.districtName = decString.districtName;
    this.districtcode=decString.districtcode;
    this.dccbName=decString.dccbName;
    this.dccbCode=decString.dccbCode;
    this.typeid=decString.typeid;
    this.fromDate=decString.fromDate;
    this.toDate=decString.toDate;

    if(this.type == "32"){
      this.HeadingName = "DISTRICTS SUBMITTED REPORT";
    }
    else{
       this.HeadingName = "DCCBS SUBMITTED REPORT";
    }

    // if(this.statusId=='1' && this.type=="26")
    // {

    // }
    // if(this.statusId=='1'|| this.statusId=='2' || this.statusId=='3' || this.statusId=='4' || this.statusId=='5')
    // {
    //   this.type='26';
    // }
     
  }

  pacsTypeid:any;
  btnBack(): void {  

//     const result = this.utils.encrypt(JSON.stringify(this.typeid));
//         this.router.navigate(['/admin/CalibrationStateLevelAbstractReport'], {
//             queryParams: { request: result },
//         });
    
    // this.router.navigate(['/admin/CalibrationStateLevelAbstractReport'], {
    //   //queryParams: { request: encryptedString},
    //       });
     
     
    if(this.session.role =='1'){
      const result = this.utils.encrypt(JSON.stringify(this.typeid));
        this.router.navigate(['/admin/CalibrationStateLevelAbstractReport'], {
            queryParams: { request: result },
        });
    }
    else if(this.session.role =='701'){
      const result = this.utils.encrypt(JSON.stringify(this.typeid));
        this.router.navigate(['/dccb/CalibrationStateLevelAbstractReport'], {
            queryParams: { request: result },
        });
     }

     else if(this.session.role =='702'){
      const result = this.utils.encrypt(JSON.stringify(this.typeid));
        this.router.navigate(['/dccbhwv/CalibrationStateLevelAbstractReport'], {
            queryParams: { request: result },
        });
        
     }
    else if(this.session.role =='502'){
      const result = this.utils.encrypt(JSON.stringify(this.typeid));
        this.router.navigate(['/jc/CalibrationStateLevelAbstractReport'], {
            queryParams: { request: result },
        });
       
     }

     else if(this.session.role =='101'){
      const result = this.utils.encrypt(JSON.stringify(this.typeid));
        this.router.navigate(['/dco/CalibrationStateLevelAbstractReport'], {
            queryParams: { request: result },
        });
       
     }

     else if(this.session.role =='501'){
      const result = this.utils.encrypt(JSON.stringify(this.typeid));
      this.router.navigate(['/dllic/CalibrationStateLevelAbstractReport'], {
          queryParams: { request: result },
        });
       
     }
     else if(this.session.role =='301'){
      const result = this.utils.encrypt(JSON.stringify(this.typeid));
      this.router.navigate(['/ceo/CalibrationStateLevelAbstractReport'], {
          queryParams: { request: result },
        });
       
     }
     else if(this.session.role =='302'){

      const result = this.utils.encrypt(JSON.stringify(this.typeid));
      this.router.navigate(['/Superriser/CalibrationStateLevelAbstractReport'], {
          queryParams: { request: result },
        });
       
     }
     else if(this.session.role =='303'){
      const result = this.utils.encrypt(JSON.stringify(this.typeid));
      this.router.navigate(['/technican/CalibrationStateLevelAbstractReport'], {
          queryParams: { request: result },
        });
        
    }
     else if(this.session.role =='222'){
      const result = this.utils.encrypt(JSON.stringify(this.typeid));
      this.router.navigate(['/apcob/CalibrationStateLevelAbstractReport'], {
          queryParams: { request: result },
        });
       
     }
//     else if(this.session.role =='702'){
//       const result = this.utils.encrypt(JSON.stringify(this.typeid));
//       this.router.navigate(['/admin/CalibrationStateLevelAbstractReport'], {
//           queryParams: { request: result },
//         }); 
//      }
//     else if(this.session.role =='502'){
//       const result = this.utils.encrypt(JSON.stringify(this.typeid));
//         this.router.navigate(['/admin/CalibrationStateLevelAbstractReport'], {
//             queryParams: { request: result },
//         });
//      }

//      else if(this.session.role =='101'){
//       const result = this.utils.encrypt(JSON.stringify(this.typeid));
//         this.router.navigate(['/admin/CalibrationStateLevelAbstractReport'], {
//             queryParams: { request: result },
//         });
//      }

//      else if(this.session.role =='501'){
//       const result = this.utils.encrypt(JSON.stringify(this.typeid));
//         this.router.navigate(['/admin/CalibrationStateLevelAbstractReport'], {
//             queryParams: { request: result },
//         });
//      }
//      else if(this.session.role =='301'){
//       const result = this.utils.encrypt(JSON.stringify(this.typeid));
//       this.router.navigate(['/admin/CalibrationStateLevelAbstractReport'], {
//           queryParams: { request: result },
//         });
//      }
//      else if(this.session.role =='302'){
//       const result = this.utils.encrypt(JSON.stringify(this.typeid));
//         this.router.navigate(['/admin/CalibrationStateLevelAbstractReport'], {
//             queryParams: { request: result },
//         });
//      }
//      else if(this.session.role =='303'){
//       const result = this.utils.encrypt(JSON.stringify(this.typeid));
//         this.router.navigate(['/admin/CalibrationStateLevelAbstractReport'], {
//             queryParams: { request: result },
//         });
//     }
//      else if(this.session.role =='222'){
//       const result = this.utils.encrypt(JSON.stringify(this.typeid));
//         this.router.navigate(['/admin/CalibrationStateLevelAbstractReport'], {
//             queryParams: { request: result },
//         });
//      }
       }
       

}
