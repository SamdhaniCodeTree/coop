import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { PacsLandAllotmentService } from 'src/app/reportsModule/pacsLandAllotment/services/pacs-land-allotment.service';
import { SessionService } from 'src/app/sharedModule/services/session.service';
import { ToasterService } from 'src/app/sharedModule/services/toaster.service';
import { UtilsService } from 'src/app/sharedModule/services/utils.service';

@Component({
  selector: 'app-not-completed-pacs-rpt',
  templateUrl: './not-completed-pacs-rpt.component.html',
  styleUrls: ['./not-completed-pacs-rpt.component.css']
})
export class NotCompletedPacsRptComponent implements OnInit {


  type: any;
  districtName: any;
   divisionName: any;
 districtId: any;
   divisionId: any;
   fromDate: any;
   toDate: any;

   district=false;

division=false;


   input:any;
   userName:any;
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
    this.districtName = decString.districtName;
    this.divisionName = decString.divisionName;
    this.districtId = decString.districtId;
    this.divisionId = decString.divisionId;
    this.fromDate = decString.fromDate;
    this.toDate = decString.toDate;

    if(this.type=='3' || this.type=='7'){
      this.userName = "SITE PREPARATION NOT COMPLETED PACS REPORT";
      return;
    }
    else if(this.type=='4' || this.type=='8'){
      this.userName = "DELIVERY NOT COMPLETED PACS REPORT";
      return;
     }
     else if(this.type=='5' || this.type=='9'){
      this.userName = "INSTALLATION NOT COMPLETED PACS REPORT";
      return;
     }
     else if(this.type=='6' || this.type=='10'){
      this.userName = "NOT APPROVED LIST";
      return;
     } 
  }

  btnBack(): void {    debugger; 
    if(this.type=== '3' || this.type=== '4' || this.type=== '5' || this.type=== '6'){
      if(this.session.role=='1')
      this.router.navigate(['/admin/DistrictWiseAbstractReport'], {      
      });
      else if(this.session.role=='701')
        this.router.navigate(['/dccb/DistrictWiseAbstractReport'], {      
        });
      else if(this.session.role=='702')
        this.router.navigate(['/dccbhwv/DistrictWiseAbstractReport'], {      
        });
      else if(this.session.role=='303')
        this.router.navigate(['/technican/DistrictWiseAbstractReport'], {      
        });
      else if(this.session.role=='222')
        this.router.navigate(['/apcob/DistrictWiseAbstractReport'], {      
        });
    //   else if(this.session.role=='502'){

    //     const requestData = {
    //       type: "2",
    //       districtName: this.districtName,       
    //        divisionId:this.divisionId ,       
    //     };  
    //     const encryptedString = this.utils.encrypt(JSON.stringify(requestData));
    //     this.router.navigate(['/jc/DivisionWiseAbstractReport'], {
    //     queryParams: { request: encryptedString},
    //     });
    //   }
    }
    else{
      
 const requestData = {
      type: "2",
      districtName: this.districtName, 
      districtcode :this.districtId ,                       //this.session.districtId,      
       divisionId:this.divisionId ,       
       fromDate:this.fromDate ,       
       toDate:this.toDate ,       
    };
    const encryptedString = this.utils.encrypt(JSON.stringify(requestData));
    if(this.session.role=='1')
      this.router.navigate(['/admin/DivisionWiseAbstractReport'], { 
        queryParams: { request: encryptedString},     
      });
      else if(this.session.role=='502')
      this.router.navigate(['/jc/DivisionWiseAbstractReport'], {  
        queryParams: { request: encryptedString},    
      }); 
      else if(this.session.role=='101')
      this.router.navigate(['/dco/DivisionWiseAbstractReport'], {  
        queryParams: { request: encryptedString},    
      }); 
      else if(this.session.role=='501')
      this.router.navigate(['/dllic/DivisionWiseAbstractReport'], {  
        queryParams: { request: encryptedString},    
      }); 
      else if(this.session.role=='701')
        this.router.navigate(['/dccb/DivisionWiseAbstractReport'], {  
          queryParams: { request: encryptedString},    
        }); 
      else if(this.session.role=='702')
        this.router.navigate(['/dccbhwv/DivisionWiseAbstractReport'], {  
          queryParams: { request: encryptedString},    
        }); 
      else if(this.session.role=='303')
        this.router.navigate(['/technican/DivisionWiseAbstractReport'], {  
          queryParams: { request: encryptedString},    
        }); 
      else if(this.session.role=='222')
        this.router.navigate(['/apcob/DivisionWiseAbstractReport'], {  
          queryParams: { request: encryptedString},    
        }); 
//     this.router.navigate(['/admin/DivisionWiseAbstractReport'], {
//       queryParams: { request: encryptedString},
//     });

    }


  }

}
