import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from 'src/app/sharedModule/services/session.service';
import { UtilsService } from 'src/app/sharedModule/services/utils.service';

@Component({
  selector: 'app-pacs-computerisation-abstract-division-rpt',
  templateUrl: './pacs-computerisation-abstract-division-rpt.component.html',
  styleUrls: ['./pacs-computerisation-abstract-division-rpt.component.css']
})
export class PacsComputerisationAbstractDivisionRptComponent implements OnInit {

  input: any;
  districtId: any;
  districtName: any;
  divisionName: any;
  districtcode: any;
  fromDate: any;
  toDate: any;

  type:any
  divbackbtn=false;

  constructor(
    private utils: UtilsService,
    private route: ActivatedRoute,
    private session: SessionService,
    private router: Router
  ) {
    route.queryParams.subscribe((params) => (this.input = params['request']));   
  }

  ngOnInit(): void { 
      debugger;
      if(this.session.role=== "101" || this.session.role=== "501" || this.session.role=== "502"){
        this.divbackbtn=false;
        }else{
          this.divbackbtn=true;
        }
    const decString = JSON.parse(this.utils.decrypt(this.input)); 
    console.log(decString);
    this.type = decString.type;
    this.districtName = decString.districtName;
    this.districtcode = decString.districtcode;
    this.divisionName = decString.divisionName;
    this.fromDate = decString.fromDate;
    this.toDate = decString.toDate;


  }
 
  onDivisionChange(result: any): void { 
    if(this.session.role =='1'){
    this.router.navigate(['/admin/CompletedPacsForSiteRpt'], {
      queryParams: { request: result },
    }); 
  }
    else if(this.session.role =='502'){
     this.router.navigate(['/jc/CompletedPacsForSiteRpt'], {
      queryParams: { request: result },
    }); 
    }
    else if(this.session.role =='101'){
     this.router.navigate(['/dco/CompletedPacsForSiteRpt'], {
      queryParams: { request: result },
    }); 
    }

    else if(this.session.role =='501'){
      this.router.navigate(['/dllic/CompletedPacsForSiteRpt'], {
       queryParams: { request: result },
     }); 
     }
     
    else if(this.session.role =='301'){
      this.router.navigate(['/ceo/CompletedPacsForSiteRpt'], {
       queryParams: { request: result },
     }); 
     }
    else if(this.session.role =='302'){
      this.router.navigate(['/Superriser/CompletedPacsForSiteRpt'], {
       queryParams: { request: result },
     }); 
     }
    else if(this.session.role =='303'){
      this.router.navigate(['/technican/CompletedPacsForSiteRpt'], {
       queryParams: { request: result },
     }); 
     }
    
    else if(this.session.role =='701'){
      debugger;
      this.router.navigate(['/dccb/CompletedPacsForSiteRpt'], {
       queryParams: { request: result },
     }); 
     }
    else if(this.session.role =='702'){
      debugger;
      this.router.navigate(['/dccbhwv/CompletedPacsForSiteRpt'], {
       queryParams: { request: result },
     }); 
     }
    else if(this.session.role =='222'){
      debugger;
      this.router.navigate(['/apcob/CompletedPacsForSiteRpt'], {
       queryParams: { request: result },
     }); 
     }
  }

  onSiteNotDoneChange(result: any): void { 
    if(this.session.role =='1'){
    this.router.navigate(['/admin/NotCompletedPacsRpt'], {
      queryParams: { request: result },
    }); 
  }
    else if(this.session.role =='502'){
     this.router.navigate(['/jc/NotCompletedPacsRpt'], {
      queryParams: { request: result },
    }); 
    }
    else if(this.session.role =='101'){
     this.router.navigate(['/dco/NotCompletedPacsRpt'], {
      queryParams: { request: result },
    }); 
    }

    else if(this.session.role =='501'){
      this.router.navigate(['/dllic/NotCompletedPacsRpt'], {
       queryParams: { request: result },
     }); 
     }
     else if(this.session.role =='701'){
      this.router.navigate(['/dccb/NotCompletedPacsRpt'], {
       queryParams: { request: result },
     }); 
     }
     else if(this.session.role =='702'){
      this.router.navigate(['/dccbhwv/NotCompletedPacsRpt'], {
       queryParams: { request: result },
     }); 
     }
     else if(this.session.role =='301'){
      this.router.navigate(['/ceo/NotCompletedPacsRpt'], {
       queryParams: { request: result },
     }); 
     }
    else if(this.session.role =='302'){
      this.router.navigate(['/Superriser/NotCompletedPacsRpt'], {
       queryParams: { request: result },
     }); 
     }
    else if(this.session.role =='303'){
      this.router.navigate(['/technican/NotCompletedPacsRpt'], {
       queryParams: { request: result },
     }); 
     }

     else if(this.session.role =='222'){
      this.router.navigate(['/apcob/NotCompletedPacsRpt'], {
       queryParams: { request: result },
     }); 
     }
  }
  ondeviceNotDoneChange(result: any): void { 
    if(this.session.role =='1'){
    this.router.navigate(['/admin/NotCompletedPacsRpt'], {
      queryParams: { request: result },
    });
  }
    else if(this.session.role =='502'){
      this.router.navigate(['/jc/NotCompletedPacsRpt'], {
       queryParams: { request: result },
     }); 
     }
     else if(this.session.role =='101'){
      this.router.navigate(['/dco/NotCompletedPacsRpt'], {
       queryParams: { request: result },
     }); 
     }
     else if(this.session.role =='501'){
      this.router.navigate(['/dllic/NotCompletedPacsRpt'], {
       queryParams: { request: result },
     }); 
     }

     else if(this.session.role =='301'){
      this.router.navigate(['/ceo/NotCompletedPacsRpt'], {
       queryParams: { request: result },
     }); 
     }
    else if(this.session.role =='302'){
      this.router.navigate(['/Superriser/NotCompletedPacsRpt'], {
       queryParams: { request: result },
     }); 
     }
    else if(this.session.role =='303'){
      this.router.navigate(['/technican/NotCompletedPacsRpt'], {
       queryParams: { request: result },
     }); 
     }

     else if(this.session.role =='701'){
      this.router.navigate(['/dccb/NotCompletedPacsRpt'], {
       queryParams: { request: result },
     }); 
     }
     else if(this.session.role =='702'){
      this.router.navigate(['/dccbhwv/NotCompletedPacsRpt'], {
       queryParams: { request: result },
     }); 
     }
     else if(this.session.role =='222'){
      this.router.navigate(['/apcob/NotCompletedPacsRpt'], {
       queryParams: { request: result },
     }); 
     }
  }
  oncalibNotDoneChange(result: any): void { 
    if(this.session.role =='1'){
    this.router.navigate(['/admin/NotCompletedPacsRpt'], {
      queryParams: { request: result },
    }); 
  }
    else if(this.session.role =='502'){
      this.router.navigate(['/jc/NotCompletedPacsRpt'], {
       queryParams: { request: result },
     }); 
     }
     else if(this.session.role =='101'){
      this.router.navigate(['/dco/NotCompletedPacsRpt'], {
       queryParams: { request: result },
     }); 
     }
     else if(this.session.role =='501'){
      this.router.navigate(['/dllic/NotCompletedPacsRpt'], {
       queryParams: { request: result },
     }); 
     }


     else if(this.session.role =='301'){
      this.router.navigate(['/ceo/NotCompletedPacsRpt'], {
       queryParams: { request: result },
     }); 
     }
    else if(this.session.role =='302'){
      this.router.navigate(['/Superriser/NotCompletedPacsRpt'], {
       queryParams: { request: result },
     }); 
     }
    else if(this.session.role =='303'){
      this.router.navigate(['/technican/NotCompletedPacsRpt'], {
       queryParams: { request: result },
     }); 
     }

     else if(this.session.role =='701'){
      this.router.navigate(['/dccb/NotCompletedPacsRpt'], {
       queryParams: { request: result },
     }); 
     }
     else if(this.session.role =='702'){
      this.router.navigate(['/dccbhwv/NotCompletedPacsRpt'], {
       queryParams: { request: result },
     }); 
     }
     else if(this.session.role =='222'){
      this.router.navigate(['/apcob/NotCompletedPacsRpt'], {
       queryParams: { request: result },
     }); 
     }
  }
  onDMTNotDoneChange(result: any): void { 
    if(this.session.role =='1'){
    this.router.navigate(['/admin/NotCompletedPacsRpt'], {
      queryParams: { request: result },
    }); 
  }
  else if(this.session.role =='502'){
    this.router.navigate(['/jc/NotCompletedPacsRpt'], {
     queryParams: { request: result },
   }); 
   }
   else if(this.session.role =='101'){
    this.router.navigate(['/dco/NotCompletedPacsRpt'], {
     queryParams: { request: result },
   }); 
   }
   else if(this.session.role =='501'){
    this.router.navigate(['/dllic/NotCompletedPacsRpt'], {
     queryParams: { request: result },
   }); 
   }

   else if(this.session.role =='301'){
    this.router.navigate(['/ceo/NotCompletedPacsRpt'], {
     queryParams: { request: result },
   }); 
   }
  else if(this.session.role =='302'){
    this.router.navigate(['/Superriser/NotCompletedPacsRpt'], {
     queryParams: { request: result },
   }); 
   }
  else if(this.session.role =='303'){
    this.router.navigate(['/technican/NotCompletedPacsRpt'], {
     queryParams: { request: result },
   }); 
   }
   else if(this.session.role =='701'){
    this.router.navigate(['/dccb/NotCompletedPacsRpt'], {
     queryParams: { request: result },
   }); 
   }
   else if(this.session.role =='702'){
    this.router.navigate(['/dccbhwv/NotCompletedPacsRpt'], {
     queryParams: { request: result },
   }); 
   }
   else if(this.session.role =='222'){
    this.router.navigate(['/apcob/NotCompletedPacsRpt'], {
     queryParams: { request: result },
   }); 
   }
  } 
  onSiteDoneChange(result: any): void { 
    if(this.session.role =='1'){
    this.router.navigate(['/admin/CompletedPacsForSiteRpt'], {
      queryParams: { request: result },
    }); 
  }
  else if(this.session.role =='502'){
    this.router.navigate(['/jc/CompletedPacsForSiteRpt'], {
     queryParams: { request: result },
   }); 
   }
   else if(this.session.role =='101'){
    this.router.navigate(['/dco/CompletedPacsForSiteRpt'], {
     queryParams: { request: result },
   }); 
   }
   else if(this.session.role =='501'){
    this.router.navigate(['/dllic/CompletedPacsForSiteRpt'], {
     queryParams: { request: result },
   }); 
   }


   else if(this.session.role =='301'){
    this.router.navigate(['/ceo/CompletedPacsForSiteRpt'], {
     queryParams: { request: result },
   }); 
   }
  else if(this.session.role =='302'){
    this.router.navigate(['/Superriser/CompletedPacsForSiteRpt'], {
     queryParams: { request: result },
   }); 
   }
  else if(this.session.role =='303'){
    this.router.navigate(['/technican/CompletedPacsForSiteRpt'], {
     queryParams: { request: result },
   }); 
   }

   else if(this.session.role =='701'){
    this.router.navigate(['/dccb/CompletedPacsForSiteRpt'], {
     queryParams: { request: result },
   }); 
   }
   else if(this.session.role =='702'){
    this.router.navigate(['/dccbhwv/CompletedPacsForSiteRpt'], {
     queryParams: { request: result },
   }); 
   }
   else if(this.session.role =='222'){
    this.router.navigate(['/apcob/CompletedPacsForSiteRpt'], {
     queryParams: { request: result },
   }); 
   }
  } 
  onDeviceDoneChange(result: any): void { 
    if(this.session.role =='1'){
    this.router.navigate(['/admin/CompletedPacsForDeliveryRpt'], {
      queryParams: { request: result },
    }); 
  }
  else if(this.session.role =='502'){
    this.router.navigate(['/jc/CompletedPacsForDeliveryRpt'], {
     queryParams: { request: result },
   }); 
   }
   else if(this.session.role =='101'){
    this.router.navigate(['/dco/CompletedPacsForDeliveryRpt'], {
     queryParams: { request: result },
   }); 
   }
   else if(this.session.role =='501'){
    this.router.navigate(['/dllic/CompletedPacsForDeliveryRpt'], {
     queryParams: { request: result },
   }); 
   }


   else if(this.session.role =='301'){
    this.router.navigate(['/ceo/CompletedPacsForDeliveryRpt'], {
     queryParams: { request: result },
   }); 
   }
  else if(this.session.role =='302'){
    this.router.navigate(['/Superriser/CompletedPacsForDeliveryRpt'], {
     queryParams: { request: result },
   }); 
   }
  else if(this.session.role =='303'){
    this.router.navigate(['/technican/CompletedPacsForDeliveryRpt'], {
     queryParams: { request: result },
   }); 
   }

   else if(this.session.role =='701'){
    this.router.navigate(['/dccb/CompletedPacsForDeliveryRpt'], {
     queryParams: { request: result },
   }); 
   }
   
   else if(this.session.role =='702'){
    this.router.navigate(['/dccbhwv/CompletedPacsForDeliveryRpt'], {
     queryParams: { request: result },
   }); 
   }
   else if(this.session.role =='222'){
    this.router.navigate(['/apcob/CompletedPacsForDeliveryRpt'], {
     queryParams: { request: result },
   }); 
   }
   
  } 
  onInstallDoneChange(result: any): void { 
    if(this.session.role =='1'){
    this.router.navigate(['/admin/CompletedPacsForInstallationRpt'], {
      queryParams: { request: result },
    });
  } 
  else if(this.session.role =='502'){
    this.router.navigate(['/jc/CompletedPacsForInstallationRpt'], {
     queryParams: { request: result },
   }); 
   }

   else if(this.session.role =='101'){
    this.router.navigate(['/dco/CompletedPacsForInstallationRpt'], {
     queryParams: { request: result },
   }); 
   }
   else if(this.session.role =='501'){
    this.router.navigate(['/dllic/CompletedPacsForInstallationRpt'], {
     queryParams: { request: result },
   }); 
   }


   else if(this.session.role =='301'){
    this.router.navigate(['/ceo/CompletedPacsForInstallationRpt'], {
     queryParams: { request: result },
   }); 
   }
  else if(this.session.role =='302'){
    this.router.navigate(['/Superriser/CompletedPacsForInstallationRpt'], {
     queryParams: { request: result },
   }); 
   }
  else if(this.session.role =='303'){
    this.router.navigate(['/technican/CompletedPacsForInstallationRpt'], {
     queryParams: { request: result },
   }); 
   }

   else if(this.session.role =='701'){
    this.router.navigate(['/dccb/CompletedPacsForInstallationRpt'], {
     queryParams: { request: result },
   }); 
   }
   else if(this.session.role =='702'){
    this.router.navigate(['/dccbhwv/CompletedPacsForInstallationRpt'], {
     queryParams: { request: result },
   }); 
   }
   else if(this.session.role =='222'){
    this.router.navigate(['/apcob/CompletedPacsForInstallationRpt'], {
     queryParams: { request: result },
   }); 
   }
  } 
  onDMTDoneChange(result: any): void { 
    if(this.session.role =='1'){
    this.router.navigate(['/admin/FinalCertificateCompletedRpt'], {
      queryParams: { request: result },
    });
  } 
  else if(this.session.role =='502'){
    this.router.navigate(['/jc/FinalCertificateCompletedRpt'], {
     queryParams: { request: result },
   }); 
   }

   else if(this.session.role =='101'){
    this.router.navigate(['/dco/FinalCertificateCompletedRpt'], {
     queryParams: { request: result },
   }); 
   }
   else if(this.session.role =='501'){
    this.router.navigate(['/dllic/FinalCertificateCompletedRpt'], {
     queryParams: { request: result },
   }); 
   }


   else if(this.session.role =='301'){
    this.router.navigate(['/ceo/FinalCertificateCompletedRpt'], {
     queryParams: { request: result },
   }); 
   }
  else if(this.session.role =='302'){
    this.router.navigate(['/Superriser/FinalCertificateCompletedRpt'], {
     queryParams: { request: result },
   }); 
   }
  else if(this.session.role =='303'){
    this.router.navigate(['/technican/FinalCertificateCompletedRpt'], {
     queryParams: { request: result },
   }); 
   }

   else if(this.session.role =='701'){
    this.router.navigate(['/dccb/FinalCertificateCompletedRpt'], {
     queryParams: { request: result },
   }); 
   }
   else if(this.session.role =='702'){
    this.router.navigate(['/dccbhwv/FinalCertificateCompletedRpt'], {
     queryParams: { request: result },
   }); 
   }
   else if(this.session.role =='222'){
    this.router.navigate(['/apcob/FinalCertificateCompletedRpt'], {
     queryParams: { request: result },
   }); 
   }
  } 

  btnBack(): void { 
    if(this.session.role =='1'){
      this.router.navigate(['/admin/DistrictWiseAbstractReport'], {        
      });
    }
    else if(this.session.role =='701'){
      this.router.navigate(['/dccb/DistrictWiseAbstractReport'], {
      
     }); 
     }
    else if(this.session.role =='702'){
      this.router.navigate(['/dccbhwv/DistrictWiseAbstractReport'], {
      
     }); 
     }
    else if(this.session.role =='502'){
      this.router.navigate(['/jc/DivisionWiseAbstractReport'], {       
     }); 
     }

     else if(this.session.role =='101'){
      this.router.navigate(['/dco/DivisionWiseAbstractReport'], {
      
     }); 
     }

     else if(this.session.role =='501'){
      this.router.navigate(['/dllic/DivisionWiseAbstractReport'], {
      
     }); 
     }
     else if(this.session.role =='301'){
      this.router.navigate(['/ceo/DivisionWiseAbstractReport'], {
      
     }); 
     }
     else if(this.session.role =='302'){
      this.router.navigate(['/Superriser/DivisionWiseAbstractReport'], {
      
     }); 
     }
     else if(this.session.role =='303'){
      this.router.navigate(['/technican/DistrictWiseAbstractReport'], {
      
     }); 
    }
     else if(this.session.role =='222'){
      this.router.navigate(['/apcob/DistrictWiseAbstractReport'], {
      
     }); 
     }
    

     
    
   
  }

}
