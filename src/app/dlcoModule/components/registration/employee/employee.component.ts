import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
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
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  bsDatepickerConfig: Partial<BsDatepickerConfig> = this.utils.getbsdatepicker();
  Dateofbirth: any;
  dateof_joining: any;
  toDate: any;
  reportFromDate: any;
  reportToDate: any;

  minDate!: Date;
  maxDate!: Date;
 
  // minDate : any;
  // maxDate : any;
  formsection = false;
  formdesigsection = false;
  formsectioneditemp = false;
  hrmsreq = {
    type: '9',
    cfmsid: '',
    empname:'', 
    Gender: '',
    mobileno: '',
    alternativemobileno: '',
    emailid: '',
    Dateofbirth: '',
    dateof_joining: '',
    dateofreteried: '',
    cadre: '',
    eofficeid: '',
    typeofservice: '',
    typeofpost: '',
    designation: '',
    office: '',
    officetype: '',
    
    dateofreleving: '',
    remarks: '',
    insertedby: '',
    updatedby: '',

    officer_code:'',
    WorkPlace:'1',
    Service_code:'',
    Designation:'',
    PhotoUpload:'',
  };
   

  employeeList: any[] = [];
  employeeDesignList: any[] = [];
  GenderArr: any[] = [];
  CaderArr: any[] = [];
  ServiceArr: any[] = [];
  DesignationArr: any[] = [];
  PostArr: any[] = [];
  OfficeArr: any[] = [];
  OfficetypeArr: any[] = [];
  OfficetypeList: any[] = [];
  DistrictList: any[] = [];
  ServiceList: any[] = [];
  DisignationList: any[] = [];
  
  dtOptions: DataTables.Settings = this.utils.dataTableOptions();
  dtTrigger: Subject<any> = new Subject();
  sanitizer: any;
  calibrationDetails: any;
  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private ngxToaster: NgxToasterService,
    private router: Router,
    private utils: UtilsService,
    private session: SessionService,
    private console: ConsoleService,
    private sharedAPI: SharedService,
    private ceoApi:CeoService

  ) { }

  ngOnInit(): void {
    this.hrmsreq.insertedby = this.session.userName;
    this.hrmsreq.updatedby = this.session.userName;
    this.maxDate = new Date();
    this.Dateofbirth=new Date();
   
    this.getregisteemplist();
     this.getGenderlist();
     this.getOfficerlist();
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
  
   
  async showsection(): Promise<void> {
    this.hrmsreq.cfmsid= '',
    this.hrmsreq.empname= '',
    this.hrmsreq.mobileno= '',
    
    this.hrmsreq.empname= '',this.hrmsreq.dateof_joining='';
    this.formsection = true;
  }

  // async getGenderlist(): Promise<void> {
  //   try {

  //     const req = {
  //       type: '3',

  //     };
  //     this.spinner.show();
  //     const response = await this.sharedAPI.Hrmsemp(req);
  //     this.spinner.hide();
  //     if (response.success) {
  //       this.GenderArr = response.result;
  //     } else {
  //       this.toast.info(response.message);
  //     }
  //   } catch (error) {
  //     this.spinner.hide();
  //     this.utils.catchResponse(error);
  //   }
  // }

  async getOfficerlist(): Promise<void> {
    try {

      const req = {
        type: '1',

      };
      this.spinner.show();
      const response = await this.sharedAPI.OfficeDetailsGet(req);
      this.spinner.hide();
      if (response.success) {
        debugger;
        this.OfficetypeList = response.result;
      } else {
        this.toast.info(response.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async Clickoffice(obj:any):Promise<void>{

    if(obj=='100')
    {
      this.getDisignationlist(obj);
    }
    // if()
    // {

    //   this.getDistrictlist(obj);
    // }
    if(obj=='101' || obj=='102'|| obj=='103' || obj=='103'){

this.getDevisionlist(obj)
this.getDisignationlist(obj);
    }
    
    
    this.getServicelist();
   

  }

  async ClickWork(obj:any):Promise<void>{
    this.hrmsreq.WorkPlace=obj;
  }

  async getDistrictlist(obj:any): Promise<void> {
    try {

      const req = {
        type: '2',
        input1:obj

      };
      this.spinner.show();
      const response = await this.sharedAPI.OfficeDetailsGet(req);
      this.spinner.hide();
      this.DistrictList=[];
      if (response.success) {
         
        this.DistrictList = response.result;
      } else {
        this.toast.info(response.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async getDevisionlist(obj:any): Promise<void> {
    try {

      const req = {
        type: '3',
        input1:obj

      };
      this.spinner.show();
      this.DistrictList=[];
      const response = await this.sharedAPI.OfficeDetailsGet(req);
      this.spinner.hide();
      if (response.success) {
        debugger;
        this.DistrictList = response.result;
      } else {
        this.toast.info(response.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async getGenderlist(): Promise<void> {
    try {

      const req = {
        type: '5'
       

      };
      this.spinner.show();
      this.GenderArr=[];
      const response = await this.sharedAPI.OfficeDetailsGet(req);
      this.spinner.hide();
      if (response.success) {
        
        this.GenderArr = response.result;
      } else {
        this.toast.info(response.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async getDisignationlist(obj:any): Promise<void> {
    try {

      const req = {
        type: '6',
        input1:obj

      };
      this.spinner.show();
      this.DisignationList=[];
      const response = await this.sharedAPI.OfficeDetailsGet(req);
      this.spinner.hide();
      if (response.success) {
        
        this.DisignationList = response.result;
      } else {
        this.toast.info(response.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }


  async getServicelist(): Promise<void> {
    try {

      const req = {
        type: '4',

      };
      this.spinner.show();
      const response = await this.sharedAPI.OfficeDetailsGet(req);
      this.spinner.hide();
      if (response.success) {
         
        this.ServiceList = response.result;
      } else {
        this.toast.info(response.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
  async caderlist(): Promise<void> {
    try {

      const req = {
        type: '1',

      };
      this.spinner.show();
      const response = await this.sharedAPI.Hrmsemp(req);
      this.spinner.hide();
      if (response.success) {
        this.CaderArr = response.result;
      } else {
        this.toast.info(response.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async servicelist(): Promise<void> {
    try {

      const req = {
        type: '4',

      };
      this.spinner.show();
      const response = await this.sharedAPI.Hrmsemp(req);
      this.spinner.hide();
      if (response.success) {
        this.ServiceArr = response.result;
      } else {
        this.toast.info(response.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
  async Designationlist(): Promise<void> {
    try {

      const req = {
        type: '2',

      };
      this.spinner.show();
      const response = await this.sharedAPI.Hrmsemp(req);
      this.spinner.hide();
      if (response.success) {
        this.DesignationArr = response.result;
      } else {
        this.toast.info(response.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async Postlist(): Promise<void> {
    try {

      const req = {
        type: '6',

      };
      this.spinner.show();
      const response = await this.sharedAPI.Hrmsemp(req);
      this.spinner.hide();
      if (response.success) {
        this.PostArr = response.result;
      } else {
        this.toast.info(response.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
  async Officetypelist(): Promise<void> {
    try {

      const req = {
        type: '5',

      };
      this.spinner.show();
      const response = await this.sharedAPI.Hrmsemp(req);
      this.spinner.hide();
      if (response.success) {
        this.OfficetypeArr = response.result;
      } else {
        this.toast.info(response.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
  async onofficetypeChange(): Promise<void> {
    try {

      const req = {
        type: '5',
        alternativemobileno: this.hrmsreq.officetype,
      };
      this.spinner.show();
      const response = await this.sharedAPI.Hrmsemp(req);
      this.spinner.hide();
      if (response.success) {
        this.OfficeArr = response.result;
      } else {
        this.toast.info(response.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
  async getregisteemplist(): Promise<void> {
    try {

      const req = {
        type: '8',

      };
      this.spinner.show();
      const response = await this.sharedAPI.OfficeDetailsGet(req);
      debugger;
      this.spinner.hide();
      if (response.success) {
        this.employeeList = response.result;
      } else {
        //this.toast.info(response.message);
      }
    } catch (error) {
      this.spinner.hide();
      //this.utils.catchResponse(error);
    }
  }

  async onImageChange(event: any): Promise<void> {
    try {
      debugger;
      if (event.target.files.length > 0) {
        const response: any = await this.utils.fileUploadEncodedString(
          event,
          this.utils.fileSize.oneMB
        );
        if (response) 
        {
          
          // let file = (  this.sanitizer.bypassSecurityTrustResourceUrl(response) as any
          // ).changingThisBreaksApplicationSecurity;
          let file = response.replace('data:image/jpeg;base64,', '');
                  this.hrmsreq.PhotoUpload = file;
           
        } else {
          this.ngxToaster.warning('file is Empty !!!, Please try again.');
          event.target.value = '';
        }
      } else {
        this.ngxToaster.warning('file is Empty !!!, Please try again.');
        event.target.value = '';
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  async getemployeeDesignList(): Promise<void> {
    try {

      const req = {
        type: '10',
        cfmsid: this.hrmsreq.cfmsid,
      };
      this.employeeDesignList=[];
      this.spinner.show();
      const response = await this.sharedAPI.Hrmsemp(req);
      this.spinner.hide();
      if (response.success) {
        this.employeeDesignList = response.result;
      } else {
       // this.toast.info(response.message);
      }
    } catch (error) {
      this.spinner.hide();
     // this.utils.catchResponse(error);
    }
  }
  async updatedesignation(obj: any): Promise<void> {
    this.hrmsreq.cfmsid=obj.CFMS_ID;
    this.hrmsreq.empname=obj.EMP_NAME;this.Officetypelist();
    this.caderlist();this.servicelist();this.Designationlist();this.Postlist();
   this.getemployeeDesignList();this.hrmsreq.dateof_joining='';
    this.formdesigsection = true;
  }
  async btnSubmitregistration(): Promise<void> {

    try {

      this.hrmsreq.Dateofbirth=moment(this.Dateofbirth, 'DD-MM-YYYY').format('YYYY/MM/DD');
      this.hrmsreq.dateof_joining=moment(this.dateof_joining, 'DD-MM-YYYY').format('YYYY/MM/DD');

      if (this.utils.isEmpty(this.hrmsreq.cfmsid)) {
        this.toast.warning('Enter CFMS Id');
        return;
      }
      if (this.utils.isEmpty(this.hrmsreq.empname)) {
        this.toast.warning('Enter Employee Name');
        return;
      }
      if (this.utils.isEmpty(this.hrmsreq.Gender)) {
        this.toast.warning('Select Gender');
        return;
      }
      if (this.utils.isEmpty(this.hrmsreq.mobileno)) {
        this.toast.warning('Enter Mobile No');
        return;
      }
      if (!this.utils.mobileNumCheck(this.hrmsreq.mobileno)) {
        this.toast.warning('Enter valid mobile number');
        return;
      }
       
      
      if (this.hrmsreq.emailid!=="" && this.utils.mailCheck(this.hrmsreq.emailid)) {
        this.toast.warning('Enter valid mail id');
        return;
      }
      if (this.utils.isEmpty(this.hrmsreq.Dateofbirth)) {
        this.toast.warning('Enter Valid Date Of Birth');
        return;
      }
      if (this.utils.isEmpty(this.hrmsreq.dateof_joining)) {
        this.toast.warning('Enter Valid Date Of Joing in Service');
        return;
      }
     
      debugger;
      let date = new Date(this.hrmsreq.Dateofbirth);
      let currentDate = new Date(this.hrmsreq.dateof_joining);
  
      let days = Math.floor((currentDate.getTime() - date.getTime()) / 1000 / 60 / 60 / 24);
      if (Number(days)< 5400) {
        this.toast.warning('check Date Of Birth & Date Of Joing in Service');
        return;
      }

      this.Dateofbirth=moment(this.Dateofbirth, 'DD-MM-YYYY').format('YYYY/MM/DD');

      const req = {
        type: '7',
        input1:this.hrmsreq.officer_code,
        input2:this.hrmsreq.WorkPlace,
        input3:this.hrmsreq.Service_code,
        input4:this.hrmsreq.cfmsid,
        input5:this.hrmsreq.Gender,
        input6:this.hrmsreq.empname,
        input7:this.hrmsreq.Designation,
        input8:this.hrmsreq.mobileno,
        input9:this.hrmsreq.alternativemobileno,
        input10:this.hrmsreq.emailid,
        input11:this.hrmsreq.Dateofbirth,
        input12:this.hrmsreq.dateof_joining,
        input13:this.session.role,
        input14:this.session.uniqueId,
        input15:this.session.userName,
        input20:this.hrmsreq.PhotoUpload,
       

      };
      
      //this.hrmsreq.type = "6",
        this.spinner.show();
      let response: any;
      response = await this.sharedAPI.EmployeeDetailsIns(req);
      this.spinner.hide();
      if (response.success) {

        alert("Employee Registration successfully Completed");
        this.formsection = false;
        location.reload();
      } else {
        alert("Employee Registration Fail");
      }
    } catch (error) {
      alert("Employee Registration Fail");
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
  async btnsubmitdesignation(): Promise<void> {

  
    try {
      if (this.utils.isEmpty(this.hrmsreq.cfmsid)) {
        this.toast.warning('Enter CFMS Id');
        return;
      }
      if (this.utils.isEmpty(this.hrmsreq.empname)) {
        this.toast.warning('Enter Employee Name');
        return;
      }
      if (this.utils.isEmpty(this.hrmsreq.cadre)) {
        this.toast.warning('Select Cadre');
        return;
      }
       
      if (this.utils.isEmpty(this.hrmsreq.typeofservice)) {
        this.toast.warning('Select Type of Service');
        return;
      }
      if (this.utils.isEmpty(this.hrmsreq.designation)) {
        this.toast.warning('Select Designation');
        return;
      }
      if (this.utils.isEmpty(this.hrmsreq.typeofpost)) {
        this.toast.warning('Select Type of Post');
        return;
      }
      if (this.utils.isEmpty(this.hrmsreq.officetype)) {
        this.toast.warning('Select Type Office');
        return;
      }
      if (this.utils.isEmpty(this.hrmsreq.office)) {
        this.toast.warning('Select Office');
        return;
      }
      if (this.utils.isEmpty(this.hrmsreq.dateof_joining)) {
        this.toast.warning('Enter Valid Date Of Joing in Service');
        return;
      }
      this.hrmsreq.type = "8",
      this.hrmsreq.alternativemobileno = this.hrmsreq.officetype,
      this.spinner.show();
      let response: any;
      response = await this.sharedAPI.Hrmsemp(this.hrmsreq);
      this.spinner.hide();
      if (response.success) {

        alert("Employee Designation Add successfully Completed");
        this.getemployeeDesignList();
      } else {
        alert("Employee Designation Add Fail");
      }
    } catch (error) {
      alert("Employee Designation Add Fail");
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
  async InactiveDesignation(obj: any): Promise<void> {
   
    try {
      if (confirm('are you sure want to inactive designation..Employee name  ....' +this.hrmsreq.empname+'')) {
       
        const req = {
          type: '12',
          cfmsid: obj.CFMS_ID,
          alternativemobileno: obj.UNIQUE_ID,
        };
        this.spinner.show();
        let response: any;
        response = await this.sharedAPI.Hrmsemp(this.hrmsreq);
        this.spinner.hide();
        if (response.success) {
          this.toast.success('Designation Inactive  Sucessfully Completed');
          this.getemployeeDesignList();
        } 
        else {
          this.toast.info(response.message);
          this.getemployeeDesignList();
        }
      }
    } catch (error) {
      this.getemployeeDesignList();
      this.spinner.hide();
      this.utils.catchResponse(error);
    }

     
  }
  async Ediempdetails(obj: any): Promise<void> {
    
    this.hrmsreq.cfmsid= '',
    this.hrmsreq.empname= '',this.hrmsreq.dateof_joining='';
    this.hrmsreq.mobileno='';
    this.hrmsreq.cfmsid= obj.CFMS_ID,
    this.hrmsreq.empname= obj.EMP_NAME,
    this.hrmsreq.mobileno= obj.MOBILE_NO,
    this.formsectioneditemp = true;
     
  }
  async btnSubmitregistrationedit(): Promise<void> {

    try {
      this.hrmsreq.type = "11",
        this.spinner.show();
      let response: any;
      response = await this.sharedAPI.Hrmsemp(this.hrmsreq);
      this.spinner.hide();
      if (response.success) {

        alert("Employee Edit successfully Completed");
        this.formsectioneditemp = false;
        location.reload();
      } else {
        alert("Employee Edit Fail");
      }
    } catch (error) {
      alert("Employee Edit Fail");
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
}
