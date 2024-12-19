import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { CeoService } from 'src/app/ceoModule/services/ceo.service';
import { ConsoleService } from 'src/app/sharedModule/services/console.service';
import { NgxToasterService } from 'src/app/sharedModule/services/ngx-toaster.service';
import { SessionService } from 'src/app/sharedModule/services/session.service';
import { SharedService } from 'src/app/sharedModule/services/shared.service';
import { ToasterService } from 'src/app/sharedModule/services/toaster.service';
import { UtilsService } from 'src/app/sharedModule/services/utils.service';

@Component({
  selector: 'app-site-preparation-aprove-reject',
  templateUrl: './site-preparation-aprove-reject.component.html',
  styleUrls: ['./site-preparation-aprove-reject.component.css']
})
export class SitePreparationAproveRejectComponent implements OnInit {

  searchTerm: string = ""
 
  
  pacsid: any;
  deviceId: any;
  pacsId: any;
  Remarks: any;
  SitePrepartionDetailsList: any[] = [];
 
  minDate : any;
  maxDate : any;
  formsection = false;
  formdesigsection = false;
  formsectioneditemp = false;
  supervisible = false;
  remarksupd=false;

  CalibrationCounts: any = '';
  Sitepreparationaprove={
    type:'',
    status:'',
    packid:'',
    Remrks:'',
  }
  Unique_id='';

   

  CalibrationDisList: any[] = [];
  
  PacsDisList: any[] = [];
  PackId:any;

  employeeDesignList: any[] = [];
  GenderArr: any[] = [];
  CaderArr: any[] = [];
  ServiceArr: any[] = [];
  DesignationArr: any[] = [];
  PostArr: any[] = [];
  OfficeArr: any[] = [];
  OfficetypeArr: any[] = [];
  
  reportType:any;
  DetailsView:any;

  dtOptions: DataTables.Settings = this.utils.dataTableOptions();
  dtTrigger: Subject<any> = new Subject();
  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private ngxToaster: NgxToasterService,
    private router: Router,
    private utils: UtilsService,
    private session: SessionService,
    private console: ConsoleService,
    private sharedAPI: SharedService,
    private ceoAPI: CeoService,
    private sanitizer: DomSanitizer,

  ) { }

  RejectshowaprovedPopup=false;
  showapprovedPopup=false;
  CalibrationDashboardview=true;
  actionStatus=false;
  ngOnInit(): void {
    // this.hrmsreq.insertedby = this.session.userName;
    // this.hrmsreq.updatedby = this.session.userName;
      
    this. CalibrationDashboardview=true;
     
    this.SitePrepartionDetails(); 
  }
  letterOnly(event: { which: any; keyCode: any; preventDefault: () => void; }) : Boolean{
    const charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122)) {
      return false;
    }
    return true;
  }
  keyPressNumbers(event: { which: any; keyCode: any; preventDefault: () => void; }) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }
  
   
 

  
  
 
  //list Site Properation
  async SitePrepartionDetails(): Promise<void> {
    try {
    this.SitePrepartionDetailsList=[];
    
      const req = {
        type: '37',
        alternativemobileno:this.session.uniqueId
      };
      this.spinner.show();
      const response = await this.sharedAPI.Hrmsemp(req);
      debugger; 
      this.spinner.hide();
      if (response.success) {
        this.SitePrepartionDetailsList = response.result;           
        
      }
      
       else {
        //this.toast.info(response.message);
        this.toast.info("No Data Available to Show Report !!!");
      }
    } catch (error) {
      this.spinner.hide();
      //this.utils.catchResponse(error);
    }
  }

 


  async btnPhotoView(path: string): Promise<void> {
    try {
      debugger;
       await this.utils.viewJPVImagecop(path);
       
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async btnPDFView(path: string): Promise<void> {
    try {
      debugger;
       await this.utils.viewJPVPDFcop(path);
       
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
  async btnPDFViewcrystal(path: string): Promise<void> {
    try {
      debugger;
       await this.utils.viewJPVPDFcopcrystal(path);
       
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }


 
  
 
  
  
  BtnRejectDetails(obj:any){
    
    this.packcode=obj.PACS_ID; 
    this.RejectshowaprovedPopup=true;
   
  }
  packcode='';
  

  async Approveddetails(obj:any): Promise<void> {
    debugger;
    this.packcode=obj.PACS_ID;
    this.Unique_id=obj.UNIQUE_ID;  
        try {
      if (confirm('are you sure want to Approved Site Preparation Details ??')) {
       
        const req = {
          type: '10',          
          input_01:this.packcode,
          input_02:'1',
          input_03:"",
          inserted_by:this.session.userName,
        
        };
        debugger;
        this.spinner.show();
        const response = await this.ceoAPI.CalibrationDetailsIns(req);
        this.spinner.hide();
        if (response.success) {
          this.SitePrepartionDetails(); 
          this.toast.success('Details Approved  Sucessfully Completed'); 
          
        } 
        else {
          this.toast.info(response.message);
           
        }
      }
    } catch (error) {
       
      this.spinner.hide();
      this.utils.catchResponse(error);
    }

  }


  async RegbtnSubmitDetails(): Promise<void> {
    debugger;
    this.Remarks=$('#Remarksid').val();    
     if(this.Remarks == null || this.Remarks =="" || this.Remarks == undefined ){
      this.toast.info("Please Enter Remarks");
      return;
     }

    try {
      if (confirm('are you sure want to Approved Site Preparation Details ??')) {
       
        const req = {

          type: '10',          
          input_01:this.packcode,
          input_02:'9',
          input_03:this.Remarks,
          inserted_by:this.session.userName
        };
        debugger;
        this.spinner.show();
        const response = await this.ceoAPI.CalibrationDetailsIns(req);
        this.spinner.hide();
        if (response.success) {
          this.toast.success('Details Approved  Sucessfully Completed');
          this.SitePrepartionDetails();  
          this.RejectshowaprovedPopup=false;
         // this.DeviceDetailslist();
        } 
        else {
          this.toast.info(response.message);
          //this.getemployeeDesignList();
        }
      }
    } catch (error) {
       
      this.spinner.hide();
      this.utils.catchResponse(error);
    }

  }
  
  onClear(){
    this.RejectshowaprovedPopup=false;    
    
  }
  
 
  

  async btnPDF(): Promise<void> {debugger;
    try {
      
      const req = { 
        type:"5",
        pack_id:this.packcode
        //input2:this.year
      };
      debugger;
      const fileName = 'Calibration Details';
      let basePDF = '';
      this.spinner.show();
      
      const res = await this.ceoAPI.DeviceVerificationCert(req);
      if (res.success) {
        basePDF = res.result;
        this.utils.downloadPdfFile(basePDF, fileName);
      } else {
        this.toast.info(res.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

   


 

 
 
}