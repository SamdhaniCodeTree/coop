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
  selector: 'app-site-preparation-get-details',
  templateUrl: './site-preparation-get-details.component.html',
  styleUrls: ['./site-preparation-get-details.component.css']
})
export class SitePreparationGetDetailsComponent implements OnInit {

  fromDate: any;
  toDate: any;
  reportFromDate: any;
  reportToDate: any;
 
  minDate : any;
  maxDate : any;
  formsection = false;
  formdesigsection = false;
  formsectioneditemp = false;
  Sitepreparationaprove={
    type:'',
    status:'',
    packid:'',
    Remrks:'',
  }
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
  };
   

  SitePreparationList: any[] = [];

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

  showaprovedPopup=false;
  ngOnInit(): void {
    this.hrmsreq.insertedby = this.session.userName;
    this.hrmsreq.updatedby = this.session.userName;
    this.getregisteemplist(); this.getGenderlist();

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
 
  //list Site Properation
  async getregisteemplist(): Promise<void> {
    try {

      const req = {
        type: '13',

      };
      this.spinner.show();
      const response = await this.sharedAPI.Hrmsemp(req);
      this.spinner.hide();
      if (response.success) {
        this.SitePreparationList = response.result;
      } else {
        //this.toast.info(response.message);
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


 
  
 
  async Ediempdetails(obj: any): Promise<void> {

    this.Sitepreparationaprove.status=obj.STATUS;
    this.Sitepreparationaprove.packid=obj.PACS_ID;
debugger;
    try {
      if (confirm('are you sure want to Approved Site Preparation Details  ....')) {
       
        const req = {
          type: '14',
          
    cfmsid:"1",
    mobileno:this.Sitepreparationaprove.packid,
        };
        this.spinner.show();
        let response: any;
        response = await this.sharedAPI.Hrmsemp(req);
        this.spinner.hide();
        if (response.success) {
          this.toast.success('Details Approved  Sucessfully Completed');
          this.getregisteemplist();
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
    
    // this.hrmsreq.cfmsid= '',
    // this.hrmsreq.empname= '',this.hrmsreq.dateof_joining='';
    // this.hrmsreq.mobileno='';
    // this.hrmsreq.cfmsid= obj.CFMS_ID,
    // this.hrmsreq.empname= obj.EMP_NAME,
    // this.hrmsreq.mobileno= obj.MOBILE_NO,
    // this.formsectioneditemp = true;
     
  }

  Rejectdetails(obj:any){
    this.Sitepreparationaprove.status=obj.STATUS;
    this.Sitepreparationaprove.packid=obj.PACS_ID;
    this.showaprovedPopup=true;

  }
  

  async btnSubmitDetails(): Promise<void> {

    

    try {
      if (confirm('are you sure want to Reject Site Preparation Details  ....')) {
       
        const req = {
          type: '15',
          
    cfmsid:"2",
    mobileno:this.Sitepreparationaprove.packid,
    emailid:this.Sitepreparationaprove.Remrks

        };
        this.spinner.show();
        let response: any;
        response = await this.sharedAPI.Hrmsemp(req);
        this.spinner.hide();
        if (response.success) {
          this.toast.success('Details Approved  Sucessfully Completed');
          this.showaprovedPopup=false;
          this.getregisteemplist();
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
    
    // this.hrmsreq.cfmsid= '',
    // this.hrmsreq.empname= '',this.hrmsreq.dateof_joining='';
    // this.hrmsreq.mobileno='';
    // this.hrmsreq.cfmsid= obj.CFMS_ID,
    // this.hrmsreq.empname= obj.EMP_NAME,
    // this.hrmsreq.mobileno= obj.MOBILE_NO,
    // this.formsectioneditemp = true;
     
  }

  onClear(){
    this.showaprovedPopup=false;
  }

 
 
}
