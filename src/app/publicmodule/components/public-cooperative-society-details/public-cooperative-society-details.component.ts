import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePickerService } from 'src/app/sharedModule/services/date-picker.service';
import { SessionService } from 'src/app/sharedModule/services/session.service';
import { ToasterService } from 'src/app/sharedModule/services/toaster.service';
import { UtilsService } from 'src/app/sharedModule/services/utils.service';

@Component({
  selector: 'app-public-cooperative-society-details',
  templateUrl: './public-cooperative-society-details.component.html',
  styleUrls: ['./public-cooperative-society-details.component.css']
})
export class PublicCooperativeSocietyDetailsComponent implements OnInit {
  bsDatepickerConfig: Partial<BsDatepickerConfig> = this.utils.getbsdatepicker();

 
  
  act:any;nameofcooperative:any;society:any;registeredno:any;districtId:any;mandalId:any;village:any;areaofoperation:any;
  aidedorunaided:any;noofmembers:any;sharecaptial:any;management:any;nameofsecretry:any;noofemployees:any;nameofpresident:any;
  auditedby:any;auditcompleted:any;profitloss:any;designation:any;
  dteofregistern:any;electionsconducted:any;duedateelections:any; 
  
   minDate!: Date;
   maxDate!: Date;
  cooperativeSocietyDetails={

    act:'',
    nameofcooperative:'',
    society:'',
    registeredno:'',
    dteofregister:'',
    districtcode:'',
    mandalId:'',
    village:'',
    areaofoperation:'',
    aidedorunaided:'',
    noofmembers:'',
    sharecaptial:'',
    management:'',
    nameofsecretry: '',
    noofemployees: '',
    electionsconducted: '',
    nameofpresident: '',
    duedateelections: '',
    auditedby: '',
    auditcompleted: '',
    profitloss: '',
    insertedBy:'',
    source:'',
    designation:''
    
  }
  
  constructor(private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private router: Router,    
    private utils: UtilsService,
    
    private session: SessionService,
    private datePicker: DatePickerService) {

      

    this.act='';
    this.society='';
    this.districtId='';
    this.mandalId='';
    this.areaofoperation='';
    this.aidedorunaided='';
    this.management='';
    this.auditedby='';
    this.auditcompleted='';
    this.profitloss='';
   }

  ngOnInit(): void {
 
  }

  async btnSubmit(): Promise<void> {
    try {
      this.cooperativeSocietyDetails.dteofregister=moment(this.dteofregistern, 'DD-MM-YYYY').format('DD-MM-YYYY');
      this.cooperativeSocietyDetails.electionsconducted=moment(this.electionsconducted, 'DD-MM-YYYY').format('DD-MM-YYYY');
      this.cooperativeSocietyDetails.duedateelections=moment(this.duedateelections, 'DD-MM-YYYY').format('DD-MM-YYYY');
        
      if (this.validate()) {
        //  this.cooperativeSocietyDetails.districtcode = this.session.districtId;
        //  this.cooperativeSocietyDetails.insertedBy = this.session.userName;
        //  this.cooperativeSocietyDetails.source = 'web';
         this.spinner.show();
        //  const response = await this.mcuAPI.amcuBuildingInspectionSub(
        //    this.applicationDetails
        //  );
        //  if (response.success) {
        //    alert(response.message);
           window.location.reload();
        //  } else {
        //   this.toast.info(response.message);
        //  }
        this.spinner.hide();
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  validate(): boolean {
    if (
       this.cooperativeSocietyDetails.act=== '' ||
       this.cooperativeSocietyDetails.act === null ||
       this.cooperativeSocietyDetails.act === undefined
    )
     {
      this.toast.warning('Please Select Act');
      return false;
    }
    if (
      this.cooperativeSocietyDetails.nameofcooperative=== '' ||
      this.cooperativeSocietyDetails.nameofcooperative === null ||
      this.cooperativeSocietyDetails.nameofcooperative === undefined
   )
    {
     this.toast.warning('Please Enter Name of the Cooperative');
     return false;
   }

   if (
    this.cooperativeSocietyDetails.society=== '' ||
    this.cooperativeSocietyDetails.society === null ||
    this.cooperativeSocietyDetails.society === undefined
 )
  {
   this.toast.warning('Please Select Society');
   return false;
 }

 if (
  this.cooperativeSocietyDetails.registeredno=== '' ||
  this.cooperativeSocietyDetails.registeredno === null ||
  this.cooperativeSocietyDetails.registeredno === undefined
)
{
 this.toast.warning('Please Enter Registered Number');
 return false;
}

if (
this.cooperativeSocietyDetails.dteofregister=== '' ||
this.cooperativeSocietyDetails.dteofregister === null ||
this.cooperativeSocietyDetails.dteofregister === undefined
)
{
this.toast.warning('Please Select Date of Registration');
return false;
}
if (
this.cooperativeSocietyDetails.districtcode=== '' ||
this.cooperativeSocietyDetails.districtcode === null ||
this.cooperativeSocietyDetails.districtcode === undefined
)
{
this.toast.warning('Please Select District');
return false;
}


if (
this.cooperativeSocietyDetails.mandalId=== '' ||
this.cooperativeSocietyDetails.mandalId === null ||
this.cooperativeSocietyDetails.mandalId === undefined
)
{
this.toast.warning('Please Select Mandal');
return false;
}
if (
this.cooperativeSocietyDetails.village=== '' ||
this.cooperativeSocietyDetails.village === null ||
this.cooperativeSocietyDetails.village === undefined
)
{
this.toast.warning('Please Enter Village ');
return false;
}

if (
this.cooperativeSocietyDetails.areaofoperation=== '' ||
this.cooperativeSocietyDetails.areaofoperation === null ||
this.cooperativeSocietyDetails.areaofoperation === undefined
)
{
this.toast.warning('Please Select Area of the operation');
return false;
}

if (
this.cooperativeSocietyDetails.aidedorunaided=== '' ||
this.cooperativeSocietyDetails.aidedorunaided === null ||
this.cooperativeSocietyDetails.aidedorunaided === undefined
)
{
this.toast.warning('Please Select Aided or Unaided ');
return false;
}

if (
this.cooperativeSocietyDetails.noofmembers=== '' ||
this.cooperativeSocietyDetails.noofmembers === null ||
this.cooperativeSocietyDetails.noofmembers === undefined
)
{
this.toast.warning('Please Enter Number of members  ');
return false;
}

if (
this.cooperativeSocietyDetails.sharecaptial=== '' ||
this.cooperativeSocietyDetails.sharecaptial === null ||
this.cooperativeSocietyDetails.sharecaptial === undefined
)
{
this.toast.warning('Please Enter Share Capital ');
return false;
}
if (
this.cooperativeSocietyDetails.management=== '' ||
this.cooperativeSocietyDetails.management === null ||
this.cooperativeSocietyDetails.management === undefined
)
{
this.toast.warning('Please Select Management');
return false;
}

if (
this.cooperativeSocietyDetails.nameofsecretry=== '' ||
this.cooperativeSocietyDetails.nameofsecretry === null ||
this.cooperativeSocietyDetails.nameofsecretry === undefined
)
{
this.toast.warning('Please Enter Name of the Secretary/ CEO');
return false;
}
if (
this.cooperativeSocietyDetails.noofemployees=== '' ||
this.cooperativeSocietyDetails.noofemployees === null ||
this.cooperativeSocietyDetails.noofemployees === undefined
)
{
this.toast.warning('Please Enter Number of Employees ');
return false;
}

if (
this.cooperativeSocietyDetails.electionsconducted=== '' ||
this.cooperativeSocietyDetails.electionsconducted === null ||
this.cooperativeSocietyDetails.electionsconducted === undefined
)
{
this.toast.warning('Please Select Date of last Elections conducted ');
return false;
}

if (
this.cooperativeSocietyDetails.duedateelections=== '' ||
this.cooperativeSocietyDetails.duedateelections === null ||
this.cooperativeSocietyDetails.duedateelections === undefined
)
{
this.toast.warning('Please select Due date for Elections for MC ');
return false;
}

if (
  this.cooperativeSocietyDetails.nameofpresident=== '' ||
  this.cooperativeSocietyDetails.nameofpresident === null ||
  this.cooperativeSocietyDetails.nameofpresident === undefined
  )
  {
  this.toast.warning('Please Enter Name of the President/ Special Officer/ PIC Chair person/ Adhoc Chair person');
  return false;
  }

  if (
    this.cooperativeSocietyDetails.designation=== '' ||
    this.cooperativeSocietyDetails.designation === null ||
    this.cooperativeSocietyDetails.designation === undefined
    )
    {
    this.toast.warning('Please Select Designation');
    return false;
    }

if (
this.cooperativeSocietyDetails.auditedby=== '' ||
this.cooperativeSocietyDetails.auditedby === null ||
this.cooperativeSocietyDetails.auditedby === undefined
)
{
this.toast.warning('Please Select Audited By ');
return false;
}
if (
this.cooperativeSocietyDetails.auditcompleted=== '' ||
this.cooperativeSocietyDetails.auditcompleted === null ||
this.cooperativeSocietyDetails.auditcompleted === undefined
)
{
this.toast.warning('Please Select Audit completed Upto the year ');
return false;
 }

if (
this.cooperativeSocietyDetails.profitloss=== '' ||
this.cooperativeSocietyDetails.profitloss === null ||
this.cooperativeSocietyDetails.profitloss === undefined
)
{
this.toast.warning('Please Select Profit/Loss ');
return false;
}
return true;
}
}





