import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { JcService } from 'src/app/jcModule/services/jc.service';
import { ConsoleService } from 'src/app/sharedModule/services/console.service';
import { NgxToasterService } from 'src/app/sharedModule/services/ngx-toaster.service';
import { SessionService } from 'src/app/sharedModule/services/session.service';
import { SharedService } from 'src/app/sharedModule/services/shared.service';
import { ToasterService } from 'src/app/sharedModule/services/toaster.service';
import { UtilsService } from 'src/app/sharedModule/services/utils.service';
import { DlcoService } from '../../services/dlco.service';

@Component({
  selector: 'app-regcoop-societie',
  templateUrl: './regcoop-societie.component.html',
  styleUrls: ['./regcoop-societie.component.css']
})
export class RegcoopSocietieComponent implements OnInit {

  showeditPopup=false;
  RegistercoopSocieties = {

  
      application_type: '',
      user_type:'',
      
      Applicant_surname:'', 
      Applicant_name:'', 
      Applicant_Gender:'',            
      wellvesher:'',
      uidNum:'',
      uidNum_file:'',
      applicat_age:'',
      District_id:'',
      mandalid:'',
     
      villageId:'',
      mobileno:'',
      landlinenumber:'',
      email_id:'',
      applicat_pincode:'',
      residentialaddress:'',
      

    
       
  };
  DistList: any[] = [];
  display_age=false;
  Rpttype:any;
  Rpttype1:any;
  Rpttype2:any;

  statetype:any;
  uidNum:any;
  minDate: Date;
  maxDate: Date;
  age:any;
  showAge:any;
  divisionList = [];
  mandalList=[];
  pacList=[];
  villageList = [];
  

  details={
  UID_IMG:'',
  image:'',
  passBookImg:'',
  dob:'',
  }
  Reqdetails = {
    
    name: '',
    faxno:'',
    landlinenumber:'',
    type: '',
    ipaddress: '1234',
    districtid: '',
    divisionid: '',
    districtId: '',
    divisionId: '',
    mandalid: '',
    mandalId: '',
    mobileno: '',
    uniqueId: '',
    fatherhusbandname: '',
    residentialaddress: '',
    uidnum: '',
    pannumber: '',
    rationcardnumber: '',
    mailid: '',
    designation: '',
    insertedby: '',
    source: 'web',
    pacsid: '',
    uniqueid: '',
    password: '',
    recordAlreadyAvailable: false,
  };

  constructor( private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private ngxToaster: NgxToasterService,
    private router: Router,
    private utils: UtilsService,
    private session: SessionService,
    private console: ConsoleService,
    private sharedAPI: SharedService,
    private dlcoAPI: DlcoService,
    private jcAPI: JcService,
    private httpClient: HttpClient
    ) {
      this.minDate = this.session.getTodayDate();
      this.maxDate = this.session.getTodayDate();
     }

  ngOnInit(): void {
   // this.loaddistricts();
  }

  onRpttypeChange(){

    
  }
 
  async onAadharChange(event: any): Promise<void> {
    try {
      // const res = await this.utils.fileUploadEncodedString(
      //   event,
      //   this.utils.fileType.IMAGE,
      //   this.utils.fileSize.hundredKB,
      // );
      // if (res) {
      //   this.passBookImg = res.replace('data:image/jpeg;base64,', '');
      // }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  ageCalculator() {
   
    if (this.RegistercoopSocieties.applicat_age) {
      const convertAge = new Date(this.RegistercoopSocieties.applicat_age);
      const timeDiff = Math.abs(Date.now() - convertAge.getTime());
      this.showAge = Math.floor(timeDiff / (1000 * 3600 * 24) / 365);
      var ageblow=18;
      debugger;
      if(this.showAge < ageblow){
        this.toast.warning('Not Eligibla for below 18 Years');
        this.RegistercoopSocieties.applicat_age='';
        this.display_age=false;
          return;
  
      }
      else{
        this.display_age=true;
      }
    }
     
  }

  async loaddistricts(): Promise<void> {
    try {
      const req = {
        districtId:'1',
        mandalId:'',
        pacsId:'',
        rbkId:'',
        villageId:'',
        phase:'2',
        type:'1'
      };
      this.spinner.show();
     debugger;
      const response = await this.jcAPI.pacsMandalListByDistrictIdphase(req);
      debugger;
      if (response.success) {
     
        this.DistList = response.result;
      } else {
        this.toast.info(response.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async districtlist(): Promise<void> {

    try {
      try {
        this.Reqdetails.type = '3';
        this.Reqdetails.divisionId = this.Reqdetails.divisionid;
        this.spinner.show();
        const response = await this.sharedAPI.packsmandalList(this.Reqdetails);
        this.spinner.hide();
        if (response.success) {
          this.mandalList = response.result;
        } else {
          this.toast.info(response.message);
        }
      } catch (error) {
        this.spinner.hide();
        this.utils.catchResponse(error);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async loadMandals(): Promise<void> {
    try {
      const req = {
        districtId: this.session.districtId,
        phase:'2',
        type:'2'
      };
      this.spinner.show();
      const response = await this.jcAPI.pacsMandalListByDistrictIdphase(req);
      if (response.success) {
        this.mandalList = response.result;
      } else {
        this.toast.info(response.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  districtChange(): void {
    this.RegistercoopSocieties.mandalid = '';
    this.RegistercoopSocieties.villageId = '';
    this.mandalList = [];
    if (this.RegistercoopSocieties.District_id === '') {
      return;
    }
    this.loadMandals();
  }


  async onMandalChange(): Promise<void> {
    try {
      this.pacList = [];
      this.Reqdetails.type = '4';
      this.Reqdetails.name = '';
      this.Reqdetails.mobileno = '';
      this.Reqdetails.uniqueId = '';
      this.Reqdetails.fatherhusbandname = '';
      this.Reqdetails.residentialaddress = '';
      this.Reqdetails.uidnum ='';
      this.Reqdetails.pannumber = '';
      this.Reqdetails.rationcardnumber = '';
      this.Reqdetails.mailid = '';
      this.Reqdetails.recordAlreadyAvailable = false;
      this.Reqdetails.pacsid = '';
      this.Reqdetails.mandalId=this.Reqdetails.mandalid;
      if (this.utils.isEmpty(this.Reqdetails.mandalId)) {
        return;
      }
      this.spinner.show();
      const response = await this.sharedAPI.packsmandalList(this.Reqdetails);
      this.spinner.hide();
      if (response.success) {
        this.pacList = response.result;
      } else {
        this.toast.info('all packs CEO registration completed selected Mandal');
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async loadVillageList(): Promise<void> {
  //   try {
  //     this.selectedItems = [];
  //     this.pacReq.villagesList = [];
  //     this.pacReq.pacName = '';
  //     this.villageList = [];
  //     if (this.utils.isEmpty(this.pacReq.mandalId)) {
  //       return;
  //     }
  //     this.pacReq.districtId = this.session.districtId;
  //     this.pacReq.divisionId = this.session.divisionId;
  //     this.spinner.show();
  //     const response = await this.sharedAPI.pacsNotAssignedVillageList(
  //       this.pacReq
  //     );
  //     this.spinner.hide();
  //     if (response.success) {
  //       this.villageList = response.result;
  //     } else {
  //       this.toast.info(response.message);
  //     }
  // }
  //    catch (error) {
  //     this.spinner.hide();
  //     this.utils.catchResponse(error);
  //   }
   }


   async btnsubmit(): Promise<void>{

    try {
      if (this.utils.isEmpty(this.RegistercoopSocieties.application_type)) {
        this.toast.warning('Please Select Application Type');
        return;
      }
      if (this.utils.isEmpty(this.RegistercoopSocieties.user_type)) {
        this.toast.warning('Please Select User Type');
        return;
      }
      if (this.utils.isEmpty(this.RegistercoopSocieties.Applicant_name)) {
        this.toast.warning('Please Enter Name');
        return;
      }
      if (this.utils.isEmpty(this.RegistercoopSocieties.Applicant_surname)) {
        this.toast.warning('Please Enter Surname');
        return;
      }
      if (this.utils.isEmpty(this.RegistercoopSocieties.Applicant_Gender)) {
        this.toast.warning('Please Select Gender');
        return;
      }
      if (this.utils.isEmpty(this.RegistercoopSocieties.uidNum)) {
        this.toast.warning('Please Enter Aadhar No');
        return;
      }
      if (this.utils.isEmpty(this.RegistercoopSocieties.uidNum_file)) {
        this.toast.warning('Aadhar File Upload');
        return;
      }
      if (this.utils.isEmpty(this.RegistercoopSocieties.applicat_age)) {
        this.toast.warning('Please Select Age');
        return;
      }
      if (this.utils.isEmpty(this.RegistercoopSocieties.District_id)) {
        this.toast.warning('Please Select District');
        return;
      }
      if (this.utils.isEmpty(this.RegistercoopSocieties.mandalid)) {
        this.toast.warning('Please Select Mandal');
        return;
      }
      if (this.utils.isEmpty(this.RegistercoopSocieties.villageId)) {
        this.toast.warning('Please Select Village');
        return;
      }
      if (
        this.RegistercoopSocieties.mobileno === '' ||
        this.RegistercoopSocieties.mobileno === null ||
        this.RegistercoopSocieties.mobileno === undefined
      ) {
        this.toast.warning('Please Enter Mobile Number');
        return;
      }  
      if (!this.utils.mobileNumCheck(this.RegistercoopSocieties.mobileno)) {
        this.toast.warning('Please Enter Valid Digital Assistant Mobile Number');
        return;
      }
      if (
        this.RegistercoopSocieties.landlinenumber === '' ||
        this.RegistercoopSocieties.landlinenumber === null ||
        this.RegistercoopSocieties.landlinenumber === undefined
      ) {
        this.toast.warning('Please Enter Land Line  / Mobile Number');
        return;
      } 
      if (this.utils.isEmpty(this.RegistercoopSocieties.email_id)) {
        this.toast.warning('Please Enter E-mailid');
        return;
      } 
     

    
     
      
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
   }
   async btnPreview():Promise<void>{

    this.showeditPopup=true;
   }

   async onClear(): Promise<void> {
    try {
      
    
     
      
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

 

}
