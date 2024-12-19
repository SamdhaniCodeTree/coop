import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { PacsLandAllotmentService } from 'src/app/reportsModule/pacsLandAllotment/services/pacs-land-allotment.service';
import { SessionService } from 'src/app/sharedModule/services/session.service';
import { ToasterService } from 'src/app/sharedModule/services/toaster.service';
import { UtilsService } from 'src/app/sharedModule/services/utils.service';

@Component({
  selector: 'app-hardware-payment-pacs-rpt',
  templateUrl: './hardware-payment-pacs-rpt.component.html',
  styleUrls: ['./hardware-payment-pacs-rpt.component.css']
})
export class HardwarePaymentPacsRptComponent implements OnInit {

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
    this.districtId=decString.districtId; 
    this.fromDate=decString.fromDate; 
    this.toDate=decString.toDate; 

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
    
    if(this.type=="29")
    {
this.pacsTypeid=26;
    }
    else if(this.type=="30")
    {
      this.pacsTypeid=27;
    }
    else if(this.type =="31")
    {
      this.pacsTypeid=28;
    } 
    // if(this.session.role=='1')
    // {
    //   this.router.navigate(['/admin/HardwarePaymentsTotalnoofPacs'], { 
    //     queryParams: { request:this.input  },     
    //   });
    // }
    // else if(this.session.role=='701')
    // {
    //   this.router.navigate(['/dccb/HardwarePaymentsTotalnoofPacs'], {     
    //     queryParams: { request:this.input  },   
    //   });
    // } else{
      debugger;
      const requestData = {
           type:this.pacsTypeid,             
            statusId :this.statusId,
     districtId:this.districtId ,     
     fromDate:this.fromDate ,     
     toDate:this.toDate      
         }; 
           const encryptedString = this.utils.encrypt(JSON.stringify(requestData));
             if(this.session.role=='1')
           this.router.navigate(['/admin/HardwarePaymentsTotalnoofPacs'], {
             queryParams: { request: encryptedString},
           });
           if(this.session.role=='502')
             this.router.navigate(['/jc/HardwarePaymentsTotalnoofPacs'], {
               queryParams: { request: encryptedString},
               });
     
           if(this.session.role=='101')
             this.router.navigate(['/dco/HardwarePaymentsTotalnoofPacs'], {
               queryParams: { request: encryptedString},
               });
           if(this.session.role=='501')
             this.router.navigate(['/dllic/HardwarePaymentsTotalnoofPacs'], {
               queryParams: { request: encryptedString},
               });
           else if(this.session.role=='701')
             this.router.navigate(['/dccb/HardwarePaymentsTotalnoofPacs'], {
             queryParams: { request: encryptedString},
                 });
           else if(this.session.role=='702')
             this.router.navigate(['/dccbhwv/HardwarePaymentsTotalnoofPacs'], {
             queryParams: { request: encryptedString},
                 });
           else if(this.session.role=='303')
             this.router.navigate(['/technican/HardwarePaymentsTotalnoofPacs'], {
             queryParams: { request: encryptedString},
                 });
           else if(this.session.role=='222')
             this.router.navigate(['/apcob/HardwarePaymentsTotalnoofPacs'], {
             queryParams: { request: encryptedString},
                 });
        // }
     
     
       }

}
