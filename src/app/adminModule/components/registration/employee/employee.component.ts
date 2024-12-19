import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
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

  fromDate: any;
  toDate: any;
  reportFromDate: any;
  reportToDate: any;
  minDate!: Date;
  maxDate!: Date;
  formsection = false;
  formdesigsection = false;
  
  hrmsreq = {
    type: '9',
    cfmsid: '',
    empname: '',
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

  ) { }

  ngOnInit(): void {

    this.hrmsreq.insertedby = this.session.userName;
    this.getregisteemplist(); this.getGenderlist();
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
    this.hrmsreq.dateof_joining='';
    this.formsection = true;
  }

  async getGenderlist(): Promise<void> {
    try {

      const req = {
        type: '3',

      };
      this.spinner.show();
      const response = await this.sharedAPI.Hrmsemp(req);
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
        type: '9',

      };
      this.spinner.show();
      const response = await this.sharedAPI.Hrmsemp(req);
      this.spinner.hide();
      if (response.success) {
        this.employeeList = response.result;
      } else {
        this.toast.info(response.message);
      }
    } catch (error) {
      this.spinner.hide();
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
        this.toast.info(response.message);
      }
    } catch (error) {
      this.spinner.hide();
      //this.utils.catchResponse(error);
    }
  }
  async updatedesignation(obj: any): Promise<void> {
    this.hrmsreq.cfmsid=obj.CFMS_ID;
    this.hrmsreq.empname=obj.EMP_NAME;this.Officetypelist();
    this.caderlist();this.servicelist();this.Designationlist();this.Postlist();
   this.getemployeeDesignList();
   this.hrmsreq.dateof_joining='';
    this.formdesigsection = true;
  }
  async btnSubmitregistration(): Promise<void> {
     
    try {
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
      if (this.hrmsreq.alternativemobileno!=="" && this.utils.mobileNumCheck(this.hrmsreq.alternativemobileno)) {
        this.toast.warning('Enter valid alternative mobile number');
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
     
      this.hrmsreq.type = "7",
        this.spinner.show();
      let response: any;
      response = await this.sharedAPI.Hrmsemp(this.hrmsreq);
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

    debugger;
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
      if (this.utils.isEmpty(this.hrmsreq.designation) && Number(this.hrmsreq.cadre) < 105) {
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
}
