import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConsoleService } from 'src/app/sharedModule/services/console.service';
import { NgxToasterService } from 'src/app/sharedModule/services/ngx-toaster.service';
import { SessionService } from 'src/app/sharedModule/services/session.service';
import { SharedService } from 'src/app/sharedModule/services/shared.service';
import { ToasterService } from 'src/app/sharedModule/services/toaster.service';
import { UtilsService } from 'src/app/sharedModule/services/utils.service';
import { DlcoService } from '../../services/dlco.service';

@Component({
  selector: 'app-ceo-registration',
  templateUrl: './ceo-registration.component.html',
  styleUrls: ['./ceo-registration.component.css'],
})
export class CeoRegistrationComponent implements OnInit {
  ceoReq = {
    
    name: '',
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

  mandalList: any[] = [];
  divisionList: any[] = [];
  pacList: any[] = [];

  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private ngxToaster: NgxToasterService,
    private router: Router,
    private utils: UtilsService,
    private session: SessionService,
    private console: ConsoleService,
    private sharedAPI: SharedService,
    private dlcoAPI: DlcoService
  ) {}

  ngOnInit(): void {
    this.ceoReq.districtid = this.session.districtId;
    this.ceoReq.districtId = this.session.districtId;
    this.ceoReq.insertedby = this.session.uniqueId;
    this.divisionListload();
  }
  async divisionListload(): Promise<void> {
    try {
      this.ceoReq.type = '2';
      this.spinner.show();
      const response = await this.sharedAPI.packsmandalList(this.ceoReq);
      debugger;
      this.spinner.hide();
      if (response.success) {
        this.divisionList = response.result;
      } else {
        this.toast.info(response.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

   
  async onDivisionChange(): Promise<void> {

    try {
      try {
        this.ceoReq.type = '3';
        this.ceoReq.divisionId = this.ceoReq.divisionid;
        this.spinner.show();
        const response = await this.sharedAPI.packsmandalList(this.ceoReq);
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

  async onMandalChange(): Promise<void> {
    try {
      this.pacList = [];
      this.ceoReq.type = '4';
      this.ceoReq.name = '';
      this.ceoReq.mobileno = '';
      this.ceoReq.uniqueId = '';
      this.ceoReq.fatherhusbandname = '';
      this.ceoReq.residentialaddress = '';
      this.ceoReq.uidnum ='';
      this.ceoReq.pannumber = '';
      this.ceoReq.rationcardnumber = '';
      this.ceoReq.mailid = '';
      this.ceoReq.recordAlreadyAvailable = false;
      this.ceoReq.pacsid = '';
      this.ceoReq.mandalId=this.ceoReq.mandalid;
      if (this.utils.isEmpty(this.ceoReq.mandalId)) {
        return;
      }
      this.spinner.show();
      const response = await this.sharedAPI.packsmandalList(this.ceoReq);
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

 

  async btnSubmit(): Promise<void> {
    this.ceoReq.mandalId=this.ceoReq.mandalid;
    this.ceoReq.divisionId = this.ceoReq.divisionid;
    try {
      if (this.utils.isEmpty(this.ceoReq.mandalid)) {
        this.toast.warning('Select mandal');
        return;
      }
      if (this.utils.isEmpty(this.ceoReq.pacsid)) {
        this.toast.warning('Select PAC');
        return;
      }
      if (this.utils.isEmpty(this.ceoReq.name)) {
        this.toast.warning('Enter CEO name');
        return;
      }
      if (this.utils.isEmpty(this.ceoReq.uniqueid)) {
        this.toast.warning('Enter CEO ID');
        return;
      }
      if (this.utils.isEmpty(this.ceoReq.name)) {
        this.toast.warning('Enter Valid CEO name');
        return;
      }
      if (this.utils.isEmpty(this.ceoReq.designation)) {
        this.toast.warning('Enter Valid CEO Designation');
        return;
      }
      if (this.utils.isEmpty(this.ceoReq.mobileno)) {
        this.toast.warning('Enter mobile number');
        return;
      }
      if (!this.utils.mobileNumCheck(this.ceoReq.mobileno)) {
        this.toast.warning('Enter valid mobile number');
        return;
      }
      if (this.utils.isEmpty(this.ceoReq.fatherhusbandname)) {
        this.toast.warning('Enter father/husband name');
        return;
      }
      if (this.utils.isEmpty(this.ceoReq.residentialaddress)) {
        this.toast.warning('Enter residential address');
        return;
      }
      if (this.utils.isEmpty(this.ceoReq.uidnum)) {
        this.toast.warning('Enter aadhaar number');
        return;
      }
      if (!this.utils.validateVerhoeff(this.ceoReq.uidnum)) {
        this.toast.warning('Enter valid aadhaar number');
        return;
      }
     
       
      if (this.utils.isEmpty(this.ceoReq.mailid)) {
        this.toast.warning('Enter mail id');
        return;
      }
      if (this.utils.mailCheck(this.ceoReq.mailid)) {
        this.toast.warning('Enter valid mail id');
        return;
      }
     
      this.ceoReq.type="1",
      this.ceoReq.password=this.ceoReq.mobileno;
      this.spinner.show();
      let response: any;
      response = await this.dlcoAPI.pacCEOSub(this.ceoReq);
      this.spinner.hide();
      if (response.success) {
        alert(response.message);
        location.reload();
      } 
      else {
        this.toast.info("fail..Please check CEO Mobile Number already registered.");
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
}
