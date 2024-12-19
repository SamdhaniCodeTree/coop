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
  selector: 'app-applicantregistration',
  templateUrl: './applicantregistration.component.html',
  styleUrls: ['./applicantregistration.component.css']
})
export class ApplicantregistrationComponent implements OnInit {

  fromDate: any;
  toDate: any;
  reportFromDate: any;
  reportToDate: any;
  minDate!: Date;
  maxDate!: Date;
  formsection = false;
  formdesigsection = false;
  isReadonly = true;
  otpwindow = true;
  otpenterwindow = false;
  appreq = {
    type:'',
title:'',
name:'',
surname:'',
co:'',
gender:'',
aadhar:'',
mobileno:'',
emailid:'',
dateofbirth:'',
otp:'',
careofname:'',
username:'',
password:'',
status:'',
insertedby:'',
updatedby:'',
OTP: '',
  };
  genderarry: any[] = [];
  careofrarry: any[] = [];
  Titlearry: any[] = [];
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

  ngOnInit(): void 
  {
    this.genderarry = [{'name': 'Male'}, {'name': 'Female'}, {'name': 'Transgender'}];
    this.careofrarry = [{'name': 'C/o'}, {'name': 'S/o'}, {'name': 'W/o'},{'name': 'D/o'}];
    this.Titlearry = [{'name': 'Sri'}, {'name': 'Smt'}, {'name': 'Kum'}];
    this.inputclear();
    
     
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
  async btnotpsendwindow(): Promise<void> {

    try {
      if (this.utils.isEmpty(this.appreq.title)) {
        this.toast.warning('Select Title');
        return;
      }
      if (this.utils.isEmpty(this.appreq.name)) {
        this.toast.warning('Enter Name');
        return;
      }
      if (this.utils.isEmpty(this.appreq.surname)) {
        this.toast.warning('Enter Surname');
        return;
      }
      if (this.utils.isEmpty(this.appreq.co)) {
        this.toast.warning('Select CO');
        return;
      }
      if (this.utils.isEmpty(this.appreq.gender)) {
        this.toast.warning('Select Gender');
        return;
      }
      if (this.utils.isEmpty(this.appreq.aadhar)) {
        this.toast.warning('Enter Aadhar');
        return;
      }
      
      if (this.utils.isEmpty(this.appreq.dateofbirth)) {
        this.toast.warning('Enter Valid Date Of Birth');
        return;
      }
      this.spinner.show();
      alert("Otp Send successfully above mobileno..");
      this.otpwindow = false;
      this.otpenterwindow = true;
      this.spinner.hide();
    } catch (error) {
      alert("Employee Registration Fail");
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
  async btnSubmitregistration(): Promise<void> {

    try {
      if (this.utils.isEmpty(this.appreq.title)) {
        this.toast.warning('Select Title');
        return;
      }
      if (this.utils.isEmpty(this.appreq.name)) {
        this.toast.warning('Enter Name');
        return;
      }
      if (this.utils.isEmpty(this.appreq.surname)) {
        this.toast.warning('Enter Surname');
        return;
      }
      if (this.utils.isEmpty(this.appreq.co)) {
        this.toast.warning('Select CO');
        return;
      }
      if (this.utils.isEmpty(this.appreq.gender)) {
        this.toast.warning('Select Gender');
        return;
      }
      if (this.utils.isEmpty(this.appreq.aadhar)) {
        this.toast.warning('Enter Aadhar');
        return;
      }
      
      if (this.utils.isEmpty(this.appreq.dateofbirth)) {
        this.toast.warning('Enter Valid Date Of Birth');
        return;
      }
      if (this.utils.isEmpty(this.appreq.OTP)) {
        this.toast.warning('Enter OTP 6 digits OTP');
        return;
      }
      
      this.spinner.show();
      let response: any;
      this.appreq.type='1',
      response = await this.sharedAPI.applicantsubmit(this.appreq);
      this.spinner.hide();
      if (response.success) {

        alert("Applicant Registration successfully Completed");
        this.inputclear();
        location.reload();
      } else {
        alert("Applicant Registration Fail");
      }
       
    } catch (error) {
      alert("Applicant Registration Fail");
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
  async btnclear(): Promise<void> {
    
    this.inputclear();
  }
  async inputclear() {
    this.appreq.title='';
    this.appreq.name='';
    this.appreq.surname='';
    this.appreq.co='';
    this.appreq.gender='';
    this.appreq.aadhar='';
    this.appreq.mobileno='';
    this.appreq.emailid='';
    this.appreq.dateofbirth='';
    this.appreq.otp='';
    this.appreq.careofname='';
    this.appreq.username='';
    this.appreq.password='';
    this.appreq.status='';
    this.appreq.insertedby='';
    this.appreq.updatedby='';
    this.otpwindow = true;
    this.otpenterwindow = false;
 }
}
