import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { NgxSpinnerService } from 'ngx-spinner';
import { CeoService } from 'src/app/ceoModule/services/ceo.service';
import { JcService } from 'src/app/jcModule/services/jc.service';
import { AadharValidationService } from 'src/app/sharedModule/services/AadharValidationService';
import { ConsoleService } from 'src/app/sharedModule/services/console.service';
import { NgxToasterService } from 'src/app/sharedModule/services/ngx-toaster.service';
import { SessionService } from 'src/app/sharedModule/services/session.service';
import { SharedService } from 'src/app/sharedModule/services/shared.service';
import { ToasterService } from 'src/app/sharedModule/services/toaster.service';
import { UtilsService } from 'src/app/sharedModule/services/utils.service';

@Component({
  selector: 'app-ceo-details-edit-and-update',
  templateUrl: './ceo-details-edit-and-update.component.html',
  styleUrls: ['./ceo-details-edit-and-update.component.css']
})
export class CeoDetailsEditAndUpdateComponent implements OnInit {

  bsDatepickerConfig: Partial<BsDatepickerConfig> = this.utils.getbsdatepicker();

  minDate!: Date; 
  maxDate!: Date; 
  btnupdate=true;
  EditDiv=false;
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

     
    mobile_no:'',
    name:'',
    name_of_the_dccb:'',
    pacs_name:'',
    pacs_code:'',
    registration_number:'',
    uid_num:'',
    unique_id:'',
    village:'',
    input1:'',
    input2:'',
    input3:'',
    input4:'',
    input5:'',
    mail_id:'',
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
     nabard_unique_id:'',
     Aadharnumber:''
    

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
    private ceoAPI: CeoService,
    private Aadhar: AadharValidationService
    
  ) {
    this.maxDate = this.session.getTodayDate();
    this.minDate=new Date('20-01-2022');
  }
  StatusCode:any;
  
  ngOnInit(): void {
    
     
  }

 

  btnSearch(){

    if (this.utils.isEmpty(this.CeoDetailsedit.pacs_code)) {
      this.toast.warning('Please Enter PACS Code');
      return;
    }
    else{
this.CeoDetailsList();
    }


  }
  async CeoDetailsList(): Promise<void> {
 
    try {
        
        
      const req={
        type:"503",        
        pacId:this.CeoDetailsedit.pacs_code,
         
      }
     
        this.spinner.show();
        const response = await this.sharedAPI.SocietyMasterList(req);
        debugger;
        if (response.success) {
          this.ceoDetailsList=response.result;
          this.EditDiv=true;

          this.CeoDetailsedit.pacs_name=this.ceoDetailsList[0].PACS_NAME;
          this.CeoDetailsedit.registration_number=this.ceoDetailsList[0].REGISTRATION_NUMBER;
          this.CeoDetailsedit.unique_id=this.ceoDetailsList[0].UNIQUE_ID;
          
          this.CeoDetailsedit.name=this.ceoDetailsList[0].NAME_OF_THE_DCCB;   //NAME
         // this.CeoDetailsedit.name_President='';   //NAME
          this.CeoDetailsedit.name_of_the_dccb=this.ceoDetailsList[0].NAME;//NAME_OF_THE_DCCB
          this.CeoDetailsedit.mail_id=this.ceoDetailsList[0].MAIL_ID;
         // if(this.this.ceoDetailsList[0].MAIL_ID)
          this.CeoDetailsedit.ddcbifsccode=this.ceoDetailsList[0].IFSC_CODE;
          this.CeoDetailsedit.mobile_no=this.ceoDetailsList[0].MOBILE_NO;
          this.CeoDetailsedit.dccb_bank_name=this.ceoDetailsList[0].DCCB_BANK_NAME;
          this.CeoDetailsedit.nabard_unique_id=this.ceoDetailsList[0].NABARD_UNIQUE_ID;
          this.CeoDetailsedit.Aadharnumber=this.ceoDetailsList[0].UID_NUM;

           
           this.btnupdate=true;
          
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
      
 debugger;
 const req={
  type:"19",
 pacs_id:this.CeoDetailsedit.pacs_code,
 input_01:this.CeoDetailsedit.name_of_the_dccb,
 input_02:this.CeoDetailsedit.mobile_no,
 input_03:this.CeoDetailsedit.Aadharnumber,
 input_04:this.CeoDetailsedit.mail_id
 } 
//  this.CeoDetailsedit.input1=this.CeoDetailsedit.ddcbifsccode;
//  this.CeoDetailsedit.pacs_code=this.session.pacId; 

        this.spinner.show();
        const response = await this.sharedAPI.TechManagerGet(req);
        if (response.success) {
          this.apcobDataSubmission();
          alert(response.message);
         // window.location.reload();
        
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


  async apcobDataSubmission(): Promise<void> {
 
    try {
     
      
 debugger;
        const req={
        type : "102",
        input01:this.CeoDetailsedit.nabard_unique_id,
        input02:this.CeoDetailsedit.Aadharnumber,
        input03:this.CeoDetailsedit.mail_id,
        input04: this.CeoDetailsedit.mobile_no,
        input05:this.CeoDetailsedit.name_of_the_dccb
        } 
        this.spinner.show();
        const response = await this.sharedAPI.apcobDatainsert1(req);
        if (response.success) { 
        
        } else {
          //this.toast.info(response.message);
        }
        this.spinner.hide(); 
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
      
      if (this.utils.isEmpty(this.CeoDetailsedit.mobile_no)) {
        this.toast.warning('Please Enter Phone Number of CEO');
        return false;
      }
      if (this.utils.isEmpty(this.CeoDetailsedit.mail_id)) {
        this.toast.warning('Please Enter Mail ID of PACS');
        return false;
      }
      if (this.utils.isEmpty(this.CeoDetailsedit.Aadharnumber)) {
        this.toast.warning('Please Enter Aadhar Number');
        return false;
      }

      if (!this.Aadhar.validateAadhar(this.CeoDetailsedit.Aadharnumber)) {
        this.toast.warning('Please Enter Valid Aadhar Number');
        return false;
      }
      
       
      
      return true;
    } 
    

}