import { HttpClient } from '@angular/common/http';
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

import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import * as moment from 'moment';

@Component({
  selector: 'app-registered-societies',
  templateUrl: './registered-societies.component.html',
  styleUrls: ['./registered-societies.component.css']
})
export class RegisteredSocietiesComponent implements OnInit {

  bsDatepickerConfig: Partial<BsDatepickerConfig> = this.utils.getbsdatepicker();

  currentYear: number = new Date().getFullYear();
date:any;
year:any;
divisionList = [];
  mandalList=[];
  pacList=[];
  villageList = [];

  societydetails={
    Act_details:'',
    Category_details:'',
    Mng_society:'',
    Conduct_audit:''

  }

  

  Regdetails = {
    
    name: '',
    societytype:'',
    societyActs:'',
    societyNumber:'',
    Mng_society:'',
    Registration_date:'',
    districtId: '',
    mandalid: '',
    villageId:'',
    Category_society:'',
    numberofmembers:'',
    aeraofsociety:'',
    nameofthePresident:'',
    nameofthesecretaryofSociety:'',
    custodianofregsociety:'',
    dateofelectionconducted:'',
    ElectionsDuedate:'',
    Conduct_audit:'',
    Final_Audit_date:'',
    Date_of_issue_Audit_Certificate:'',


    faxno:'',

    landlinenumber:'',
    type: '',
    ipaddress: '1234',
    districtid: '',
    divisionid: '',

    
    divisionId: '',
    
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
    currentYear:'',
  };
  minMonth: any;
  number:any;
  maxDate: Date;
  //regdates values
  Registration_date_m:any;
  dateof_electionconducted_m:any;
  ElectionsDuedate_m:any;
  Final_Audit_date_m:any;
  Date_of_issue_Audit_Certificate_m:any;


  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private ngxToaster: NgxToasterService,
    private router: Router,
    private utils: UtilsService,
    private session: SessionService,
    private console: ConsoleService,
    private sharedAPI: SharedService,
    private dlcoAPI: DlcoService,
    private httpClient: HttpClient
  ) { 
    this.maxDate = this.session.getTodayDate();
  }

  ngOnInit(): void {
   this.Registration_date_m =new Date();
   this.dateof_electionconducted_m =new Date();
   this.ElectionsDuedate_m =new Date();
   this.Final_Audit_date_m =new Date();
   this.Date_of_issue_Audit_Certificate_m =new Date();
    this.date = this.session.getTodayDateString();
    //this.number = this.session.getFullYear();
  }
  onActdetailsChange(){


  }

  async onDivisionChange(): Promise<void> {

  
      try {
        this.Regdetails.type = '3';
        this.Regdetails.divisionId = this.Regdetails.divisionid;
        this.spinner.show();
        const response = await this.sharedAPI.packsmandalList(this.Regdetails);
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
    
  }

  async onMandalChange(): Promise<void> {
    try {
      this.pacList = [];
      this.Regdetails.type = '4';
      this.Regdetails.name = '';
      this.Regdetails.mobileno = '';
      this.Regdetails.uniqueId = '';
      this.Regdetails.fatherhusbandname = '';
      this.Regdetails.residentialaddress = '';
      this.Regdetails.uidnum ='';
      this.Regdetails.pannumber = '';
      this.Regdetails.rationcardnumber = '';
      this.Regdetails.mailid = '';
      this.Regdetails.recordAlreadyAvailable = false;
      this.Regdetails.pacsid = '';
      this.Regdetails.mandalId=this.Regdetails.mandalid;
      if (this.utils.isEmpty(this.Regdetails.mandalId)) {
        return;
      }
      this.spinner.show();
      const response = await this.sharedAPI.packsmandalList(this.Regdetails);
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

  //Registered Details
  async btnsubmit(): Promise<void>{

    try {
      this.Regdetails.Registration_date= moment(this.Registration_date_m, 'DD-MM-YYYY').format('YYYY/MM/DD');
      this.Regdetails.dateofelectionconducted= moment(this.dateof_electionconducted_m, 'DD-MM-YYYY').format('YYYY/MM/DD');
      this.Regdetails.ElectionsDuedate= moment(this.ElectionsDuedate_m, 'DD-MM-YYYY').format('YYYY/MM/DD');
      this.Regdetails.Final_Audit_date= moment(this.Final_Audit_date_m, 'DD-MM-YYYY').format('YYYY/MM/DD');
      this.Regdetails.Date_of_issue_Audit_Certificate= moment(this.Date_of_issue_Audit_Certificate_m, 'DD-MM-YYYY').format('YYYY/MM/DD');

      

      if (this.validate()) 
      {

        const req = {
          Pname_of_the_coop_soci:this.Regdetails.name,
          Ptype_of_society:this.Regdetails.societytype,
          Pact_of_soci_regis:this.Regdetails.societyActs, 
          PNumber_of_Soci_Regis: this.Regdetails.societyNumber,
          PDate_of_Regis:this.Regdetails.Registration_date
          // PAddress_of_soci:
          // PCategory_of_soci:
          // PNumber_of_members: 
          // PShare_Capital_of_members:
          // PGovernment_Share_Capital: 
          // PArea_of_operation_of_Soci:  
          // PName_Presi_SpecOff_orinchag: 
          // PName_of_Secretary_of_Soci: 
          // PName_of_custbooks_regis_soci: 
          // PDate_of_Elect_conducted: 
          // PPresent_Manment_of_Soci: 
          // PDue_date_for_elections: 
          // PAuthority_to_conduct_audit: 
          // PYear_of_completion_of_Audit: 
          // PDate_of_submis_of_FinalAudit: 
          // pDate_of_issue_of_FinalAudit: 
          // Pcapital_of_society: 
          // PGross_profit: 
          // PNet_profit: 
          // PBusiness_Turnover: 
          // PNo_of_Employees: 
          // PINSERTED_DATE: 
          // PINSERTED_BY: 
          // Pdistrict_id: 
          // Pmandal_id: 
          // Pvillage_id: 
          // Punique_id:
          // role:
        }
        this.spinner.show();
        const response = await this.dlcoAPI.SocietiesRegistrationIns(
          req
          
        );
        debugger;
        if (response.success) {
          alert(response.message);
          window.location.reload();
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
    if (this.utils.isEmpty(this.Regdetails.name)) {
      this.toast.warning('Please Enter Cooperative Society Name');
      return false;
    }
    if (this.utils.isEmpty(this.Regdetails.societytype)) {
      this.toast.warning('Please Select Society Type');
      return false;
    }
    if (this.utils.isEmpty(this.Regdetails.societyActs)) {
      this.toast.warning('Please Select ACT Type');
      return false;
    }
    if (this.utils.isEmpty(this.Regdetails.societyNumber)) {
      this.toast.warning('Please Enter Society Number');
      return false;
    }
    if (this.utils.isEmpty(this.Registration_date_m)) {
      this.toast.warning('Please Select Registration Date');
      return false;
    }
    if (this.utils.isEmpty(this.Regdetails.districtId)) {
      this.toast.warning('Please Select District');
      return false;
    }
    if (this.utils.isEmpty(this.Regdetails.mandalid)) {
      this.toast.warning('Please Select Mandal');
      return false;
    }
    if (this.utils.isEmpty(this.Regdetails.villageId)) {
      this.toast.warning('Please Select Village');
      return false;
    }
    if (this.utils.isEmpty(this.Regdetails.residentialaddress)) {
      this.toast.warning('Please Enter Address');
      return false;
    }
    if (this.utils.isEmpty(this.Regdetails.Category_society)) {
      this.toast.warning('Please Select Category Society');
      return false;
    }
    if (this.utils.isEmpty(this.Regdetails.numberofmembers)) {
      this.toast.warning('Please Enter Number of Members');
      return false;
    }
    if (this.utils.isEmpty(this.Regdetails.aeraofsociety)) {
      this.toast.warning('Please Enter Number Aera of Society');
      return false;
    }
    if (this.utils.isEmpty(this.Regdetails.nameofthePresident)) {
      this.toast.warning('Please Enter Name of President');
      return false;
    }
    if (this.utils.isEmpty(this.Regdetails.nameofthesecretaryofSociety)) {
      this.toast.warning('Please Enter Name of President');
      return false;
    }
    if (this.utils.isEmpty(this.Regdetails.custodianofregsociety)) {
      this.toast.warning('Please Enter Name of Custodi of Registration Society');
      return false;
    }
    if (this.utils.isEmpty(this.dateof_electionconducted_m)) {
      this.toast.warning('Please Enter Date of Elections conducted');
      return false;
    }
    if (this.utils.isEmpty(this.Regdetails.Mng_society)) {
      this.toast.warning('Please Select Present Management of the Society');
      return false;
    }
    if (this.utils.isEmpty(this.ElectionsDuedate_m)) {
      this.toast.warning('Please Select Due Date Elections');
      return false;
    }
    if (this.utils.isEmpty(this.Final_Audit_date_m)) {
      this.toast.warning('Please Select Due Date Elections');
      return false;
    }
    if (this.utils.isEmpty(this.Regdetails.Conduct_audit)) {
      this.toast.warning('Please Select Audit');
      return false;
    }
    return true;
   }

}
