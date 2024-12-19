import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { PacsLandAllotmentService } from 'src/app/reportsModule/pacsLandAllotment/services/pacs-land-allotment.service';
import { SessionService } from 'src/app/sharedModule/services/session.service';
import { ToasterService } from 'src/app/sharedModule/services/toaster.service';
import { UtilsService } from 'src/app/sharedModule/services/utils.service';

@Component({
  selector: 'app-final-certificate-completed-rpt',
  templateUrl: './final-certificate-completed-rpt.component.html',
  styleUrls: ['./final-certificate-completed-rpt.component.css']
})
export class FinalCertificateCompletedRptComponent implements OnInit {

  type: any;
  districtName: any;
   divisionName: any;
 districtId: any;
   divisionId: any;
   fromDate: any;
   toDate: any;
   userName: any;

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
    this.districtName = decString.districtName;
    this.divisionName = decString.divisionName;
    this.districtId = decString.districtId;
    this.divisionId = decString.divisionId; 
    this.fromDate = decString.fromDate; 
    this.toDate = decString.toDate; 


    if(this.type == '27' || this.type == '20'){
      this.userName = " FINAL CERTIFICATE COMPLETED PACS REPORT"
    }
  }

  btnBack(): void {    debugger; 
    if(this.type=== '27'){
      if(this.session.role==='1'){
        this.router.navigate(['/admin/DistrictWiseAbstractReport'], {      
        });
      }else if(this.session.role==='701'){
        this.router.navigate(['/dccb/DistrictWiseAbstractReport'], {      
        });
      }
      else if(this.session.role==='702'){
        this.router.navigate(['/dccbhwv/DistrictWiseAbstractReport'], {      
        });
      }
      else if(this.session.role==='303'){
        this.router.navigate(['/technican/DistrictWiseAbstractReport'], {      
        });
      }
      else if(this.session.role==='222'){
        this.router.navigate(['/apcob/DistrictWiseAbstractReport'], {      
        });
      }
       
    }
    else{
      
 const requestData = {
      type: "2",
      districtName: this.districtName,       
       divisionId:this.divisionId , 
       districtcode :this.districtId ,       
       fromDate :this.fromDate ,       
       toDate :this.toDate ,       
    }; 
      const encryptedString = this.utils.encrypt(JSON.stringify(requestData));
        if(this.session.role=='1')
      this.router.navigate(['/admin/DivisionWiseAbstractReport'], {
        queryParams: { request: encryptedString},
      });
      if(this.session.role=='502')
        this.router.navigate(['/jc/DivisionWiseAbstractReport'], {
          queryParams: { request: encryptedString},
          });

      if(this.session.role=='101')
        this.router.navigate(['/dco/DivisionWiseAbstractReport'], {
          queryParams: { request: encryptedString},
          });
      if(this.session.role=='501')
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
    }


  }

}

