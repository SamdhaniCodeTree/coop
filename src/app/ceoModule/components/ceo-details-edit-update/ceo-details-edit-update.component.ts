import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { NgxSpinnerService } from 'ngx-spinner';
import { JcService } from 'src/app/jcModule/services/jc.service';
import { ConsoleService } from 'src/app/sharedModule/services/console.service';
import { NgxToasterService } from 'src/app/sharedModule/services/ngx-toaster.service';
import { SessionService } from 'src/app/sharedModule/services/session.service';
import { SharedService } from 'src/app/sharedModule/services/shared.service';
import { ToasterService } from 'src/app/sharedModule/services/toaster.service';
import { UtilsService } from 'src/app/sharedModule/services/utils.service';
import { CeoService } from '../../services/ceo.service';
import { Console } from 'console';

@Component({
  selector: 'app-ceo-details-edit-update',
  templateUrl: './ceo-details-edit-update.component.html',
  styleUrls: ['./ceo-details-edit-update.component.css']
})
export class CeoDetailsEditUpdateComponent implements OnInit {

  bsDatepickerConfig: Partial<BsDatepickerConfig> = this.utils.getbsdatepicker();

  minDate!: Date; 
  maxDate!: Date; 
  btnupdate=true;
  ceoDetailsList: any[] = [];
  DistList: any[] = [];
  mandalList: any[] = [];
  rbkList: any[] = [];
  packsList: any[] = [];
  villageList: any[] = [];
  SurveypacksList: any[] = [];
  
  inspectionDate:any
  desktopManufactureDate:any;
  cpuManufactureDate:any;
  mouseManufactureDate:any;
  keyBoardManufactureDate:any;
  upsManufactureDate:any;
  EleWeightManufactureDate:any;
  ups1KvaManufactureDate:any;
  batteryKvaManufactureDate:any;
  matrixPrinterManufactureDate:any;
  matrixScanerManufactureDate:any;
  WebCamManufactureDate:any;
  internetDevManufactureDate:any;
  BiometricscannerManufactureDate:any;
  TabletDate:any;
  BluetooththermalprinterDate:any;
  BarcodescannerDate:any;
  posdeviceDate:any;
  PassbookprinterDate:any;



  CeoDetailsedit={

    type:'1',
    affiliated_dccb_branch:'',
    district_name:'',
    dist_code:'2',
    mail_id:'',
    mandal_name:'',
    mobile_no:'',
    name:'',
    name_of_the_dccb:'',
    pacs_name:'',
    pacs_code:'4',
    registration_number:'',
    uid_num:'',
    unique_id:'',
    village:'',
    input1:'',
    input2:'',
    input3:'',
    input4:'',
    input5:'',

     NameofPacs:'',
     pacsuniqeid:'',
     Nameofceo:'',
     Mailidofpacs:'',
     ddcbifsccode:'',
     name_President:'',
     PresidentName:'',
     NameoftheCEO:'',
     PhoneNumberofCEO:'',
     MailIDofPACS:'',
     dccb_bank_name:'',
     nabard_unique_id:''
    // affiliateddccb:'',
    // affiliateddccbbranch:'',
    // VillageName:'',
    // MandalName:'',
    // DistrictName:'',
    // Pincode:'',
    // PresidentName:'',
    // NameoftheCEO:'',
    // PhoneNumberofCEO:'',
    // MailIDofPACS:'',
    // Remarks:'',

//     unique_id:'',
//     affiliated_dccb_branch:'',
//     village:'',
//     mandal_name:'',
// district_name:'',
// name:'',

// registration_number:'',
// 
// input1:'',

  }
   
   
  
 
  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private ngxToaster: NgxToasterService,
    private router: Router,
    private utils: UtilsService,
    private session: SessionService,
    private console: ConsoleService,
    private jcAPI: JcService,
    private sharedAPI: SharedService,
    private sanitizer: DomSanitizer,
    private ceoAPI: CeoService
    
  ) {
    this.maxDate = this.session.getTodayDate();
    this.minDate=new Date('20-01-2022');
  }
  StatusCode:any;
  
  ngOnInit(): void {
    this.StatusDetailsList();
   
   // this.loaddistricts();
    this.inspectionDate='';
  }

  async StatusDetailsList(): Promise<void> {
 
    try {
        //  if (this.validate()) {
        
      const req={
        type:"499",        
        pacId:this.session.pacId  
        
      }
     
        this.spinner.show();
        const response = await this.sharedAPI.SocietyMasterList(req);
        debugger;
        if (response.success) {
          this.StatusCode=response.result[0].STATUS;
          // if(response.result[0].STATUS=="1")
          // {
          //   this.StatusCode=response.result[0].STATUS=="1";
          // }
          // else{
          //   this.StatusCode="0";
          // }
          
          this.CeoDetailsList();
          
        } else {
          this.toast.info(response.message);
        }
        this.spinner.hide();
     // }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async CeoDetailsList(): Promise<void> {
 
    try {
        //  if (this.validate()) {
        
      const req={
        type:"500",        
        pacId:this.session.pacId,
        uniqueId:this.StatusCode,
      }
     
        this.spinner.show();
        const response = await this.sharedAPI.SocietyMasterList(req);
        debugger;
        if (response.success) {
          this.ceoDetailsList=response.result;

          this.CeoDetailsedit.pacs_name=this.ceoDetailsList[0].PACS_NAME;
          this.CeoDetailsedit.registration_number=this.ceoDetailsList[0].REGISTRATION_NUMBER;
          this.CeoDetailsedit.unique_id=this.ceoDetailsList[0].UNIQUE_ID;
          this.CeoDetailsedit.affiliated_dccb_branch=this.ceoDetailsList[0].AFFILIATED_DCCB_BRANCH;
          this.CeoDetailsedit.village=this.ceoDetailsList[0].VILLAGE;
          this.CeoDetailsedit.mandal_name=this.ceoDetailsList[0].MANDAL_NAME;
          this.CeoDetailsedit.district_name=this.ceoDetailsList[0].DISTRICT_NAME;
          this.CeoDetailsedit.name=this.ceoDetailsList[0].NAME_OF_THE_DCCB;   //NAME
         // this.CeoDetailsedit.name_President='';   //NAME
          this.CeoDetailsedit.name_of_the_dccb=this.ceoDetailsList[0].NAME;//NAME_OF_THE_DCCB
          this.CeoDetailsedit.mail_id=this.ceoDetailsList[0].MAIL_ID;
         // if(this.this.ceoDetailsList[0].MAIL_ID)
          this.CeoDetailsedit.ddcbifsccode=this.ceoDetailsList[0].IFSC_CODE;
          this.CeoDetailsedit.mobile_no=this.ceoDetailsList[0].MOBILE_NO;
          this.CeoDetailsedit.dccb_bank_name=this.ceoDetailsList[0].DCCB_BANK_NAME;
          this.CeoDetailsedit.nabard_unique_id=this.ceoDetailsList[0].NABARD_UNIQUE_ID;

           
          if(this.ceoDetailsList[0].SITESTATUS=="1") this.btnupdate=false; else this.btnupdate=true;
          
         // window.location.reload();
        } else {
          this.toast.info(response.message);
        }
        this.spinner.hide();
     // }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

 
  

  async btnCeoDetailsSub(): Promise<void> {
 
    try {
      if (this.validate()) {
              //  this.calibrationDetails.insertedBy = this.session.userName;
       // this.calibrationDetails.source = 'web';
 debugger;
 this.CeoDetailsedit.input1=this.CeoDetailsedit.ddcbifsccode;
 this.CeoDetailsedit.pacs_code=this.session.pacId; 
        this.spinner.show();
        const response = await this.ceoAPI.CeoInfoSubDetails(
          this.CeoDetailsedit
        );
        if (response.success) {
          alert(response.message);
         // window.location.reload();
         this.StatusDetailsList();
        } else {
          this.toast.info(response.message);
        }
        this.spinner.hide();
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }


  validate(): boolean {
    debugger;
      if (this.utils.isEmpty(this.CeoDetailsedit.pacs_name)) {
        this.toast.warning('please Enter Name of PACS');
        return false;
      }
      if (this.utils.isEmpty(this.CeoDetailsedit.registration_number)) {
        this.toast.warning('Please Enter Registration Number');
        return false;
      }
      
      if (this.utils.isEmpty(this.CeoDetailsedit.affiliated_dccb_branch)) {
        this.toast.warning('Please Enter Affiliated DCCB Branch');
        return false;
      }
      if (this.utils.isEmpty(this.CeoDetailsedit.ddcbifsccode)) {
        this.toast.warning('Please Enter Dccb IFSC Code');
        return false;
      }

      if (this.utils.isEmpty(this.CeoDetailsedit.village)) {
        this.toast.warning('Please Enter Village Name');
        return false;
      }
      if (this.utils.isEmpty(this.CeoDetailsedit.mandal_name)) {
        this.toast.warning('Please Enter Mandal Name');
        return false;
      }
      if (this.utils.isEmpty(this.CeoDetailsedit.district_name)) {
        this.toast.warning('Please Enter District Name');
        return false;
      }
       
      
      if (this.utils.isEmpty(this.CeoDetailsedit.name)) {
        this.toast.warning('Please Enter Name of the President');
        return false;
      }
      if (this.utils.isEmpty(this.CeoDetailsedit.name_of_the_dccb)) {
        this.toast.warning('Please Enter Name of the CEO');
        return false;
      }
      if (this.utils.isEmpty(this.CeoDetailsedit.mobile_no)) {
        this.toast.warning('Please Enter Phone Number of CEO');
        return false;
      }

      if (
        !this.utils.mobileNumCheck(this.CeoDetailsedit.mobile_no)
      ) {
        this.toast.warning(
          'Please Enter Valid Phone Number of CEO'
        );
        return false;
      }

      if (this.utils.isEmpty(this.CeoDetailsedit.mail_id)) {
        this.toast.warning('Please Enter Mail ID of PACS');
        return false;
      }
      
       
      
      return true;
    } 
    

}
