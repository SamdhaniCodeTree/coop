import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { JcService } from 'src/app/jcModule/services/jc.service';
import { ConsoleService } from 'src/app/sharedModule/services/console.service';
import { NgxToasterService } from 'src/app/sharedModule/services/ngx-toaster.service';
import { SessionService } from 'src/app/sharedModule/services/session.service';
import { SharedService } from 'src/app/sharedModule/services/shared.service';
import { ToasterService } from 'src/app/sharedModule/services/toaster.service';
import { UtilsService } from 'src/app/sharedModule/services/utils.service';
import * as moment from 'moment';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { DlcoService } from '../../services/dlco.service';

@Component({
  selector: 'app-registered-society-ins',
  templateUrl: './registered-society-ins.component.html',
  styleUrls: ['./registered-society-ins.component.css']
})
export class RegisteredSocietyInsComponent implements OnInit {
  bsDatepickerConfig: Partial<BsDatepickerConfig> = this.utils.getbsdatepicker();
  maxDate: Date;
  dteofregister:any;
  dteelectionsconducted:any;
  duedateelections:any;
  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private ngxToaster: NgxToasterService,
    private router: Router,
    private utils: UtilsService,
    private session: SessionService,
    private console: ConsoleService,
    private dlcoAPI: DlcoService,    
    private sharedAPI: SharedService,
    private sanitizer: DomSanitizer,
  ) { 
    this.maxDate = this.session.getTodayDate();
  }
  Act1964=false;
  Act1995=false;
  nextElectionDate=false;

  ActDetailsList:any[]=[];
  ClassofSocietylist:any[]=[];
  TypeofSocietylist:any[]=[];
  ProfitlossDetailsList:any[]=[];
  ManagementDetailsList:any[]=[];
  Designationlist:any[]=[];

  DistrictList:any[]=[];
  MandalList:any[]=[];
  villageList:any[]=[];
  

  cooperativeSocietyDetails={

    act:'',
    nameofcooperative:'',
    Classofsociety:'',
    society:'',
    registeredno:'',
    dteofregister:'',
    Addressdetails:'',
    districtId:'',
    mandalId:'',
    village:'',
    areaofoperation:'',
    contactpersion:'',
    designation:'',
    mobilenumber:'',
    Landlineno:'',
    Emailid:'',

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
    dteelectionsconducted:'',
    auditfile:'',
    registerCertfile:'',
    memberdeposists:'',
    loansadvances:'',
    borroingrupes:'',
    headqutersofsociety:'',
    electedcommmumbers:'',
    EleStatus:'',

    Receiptpaymentfile:'',
    Tridingacount:'',
   manufacturingacctount:'',
  pfaccount:'',
  balancesheet:'',

  receipt_cert:'',
trading_cert:'', 
manufacturing_cert:'', 
pl_cert:'',  
bal_cert:'' 
    
  }

  ngOnInit(): void {
   // this.dteofregister =new Date();
    this.Actlist();
    this.Classsocietylist();
    this.SocietyTypelist();
    this.loaddistricts();
    this.Managementlist();
    this.Profitlosslist();
    this.PersionDesignationlist();
    
   
 
  }


  

  async loaddistricts(): Promise<void> {
    try {
      const req = {
        
        type:'101'
      };
      this.spinner.show();      
      const response = await this.sharedAPI.SocietyMasterList(req);      
      if (response.success) {
        this.DistrictList = response.result;
        this.MandalList=[];
        this.villageList=[];
      } else {
        this.toast.info(response.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
  loadMandalChange(districtid:any){
this.Mandallist(districtid);
  }

  
  async Mandallist(district:any):Promise<void>
  {
    try {
      const req = {
        
        type:'102',districtId:district
      };
      this.spinner.show();      
      const response = await this.sharedAPI.SocietyMasterList(req);       
      if (response.success) {
        this.MandalList = response.result;
        this.villageList=[];
      } else {
        this.toast.info(response.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
  loadvillagechange(mandalid:any){
    this.villagelist(mandalid);
  }
  async villagelist(mandalid:any):Promise<void>
  {
    try {
      const req = {
        
        type:'103',districtId:this.cooperativeSocietyDetails.districtId,mandalId:mandalid
      };
      this.spinner.show();      
      const response = await this.sharedAPI.SocietyMasterList(req);       
      if (response.success) {
        this.villageList = response.result;
      } else {
        this.toast.info(response.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async Actlist():Promise<void>
  {
    try {
      const req = {        
        type:'104'
      };
      this.spinner.show();      
      const response = await this.sharedAPI.SocietyMasterList(req);
        if (response.success) {
        this.ActDetailsList = response.result;
      } else {
        this.toast.info(response.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async Classsocietylist():Promise<void>
  {
    try {
      const req = {
        
        type:'107'
      };
      this.spinner.show();
      
      const response = await this.sharedAPI.SocietyMasterList(req);
      debugger;
      if (response.success) {
        this.ClassofSocietylist = response.result;
      } else {
        this.toast.info(response.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async SocietyTypelist():Promise<void>
  {
    try {
      const req = {        
        type:'106'
      };
      this.spinner.show();      
      const response = await this.sharedAPI.SocietyMasterList(req);
        if (response.success) {
        this.TypeofSocietylist = response.result;
      } else {
        this.toast.info(response.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async Profitlosslist():Promise<void>
  {
    try {
      const req = {        
        type:'105'
      };
      this.spinner.show();      
      const response = await this.sharedAPI.SocietyMasterList(req);
            if (response.success) {
        this.ProfitlossDetailsList = response.result;
      } else {
        this.toast.info(response.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async Managementlist():Promise<void>
  {
    try {
      const req = {
        
        type:'108'
      };
      this.spinner.show();      
      const response = await this.sharedAPI.SocietyMasterList(req);
      if (response.success) {
        this.ManagementDetailsList = response.result;
      } else {
        this.toast.info(response.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async PersionDesignationlist():Promise<void>
  {
    try {
      const req = {
        
        type:'109'
      };
      this.spinner.show();      
      const response = await this.sharedAPI.SocietyMasterList(req);
      if (response.success) {
        this.Designationlist = response.result;
      } else {
        this.toast.info(response.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }


 

  async btnSubmit(): Promise<void> {
  try{
   

       if (this.validate()) {
        this.cooperativeSocietyDetails.dteofregister=moment(this.dteofregister, 'DD-MM-YYYY').format('YYYY/MM/DD');
        this.cooperativeSocietyDetails.dteelectionsconducted=moment(this.dteelectionsconducted, 'DD-MM-YYYY').format('YYYY/MM/DD');
        this.cooperativeSocietyDetails.duedateelections=moment(this.duedateelections, 'DD-MM-YYYY').format('YYYY/MM/DD');
        this.spinner.show;
       $("#sumbitbtn").hide();
        const req = {

          type:111, 
          act:this.cooperativeSocietyDetails.act, 
          name_of_coop_society:this.cooperativeSocietyDetails.nameofcooperative, 
          type_of_society:this.cooperativeSocietyDetails.society, 
          class_of_society:this.cooperativeSocietyDetails.Classofsociety, 
          registered_id :this.cooperativeSocietyDetails.registeredno, 
          registration_date:this.cooperativeSocietyDetails.dteofregister, 
          head_quters_of_soceity:this.cooperativeSocietyDetails.headqutersofsociety, 
          district_id:this.cooperativeSocietyDetails.districtId, 
          mandal:this.cooperativeSocietyDetails.mandalId, 
          village:this.cooperativeSocietyDetails.village, 
          area_of_operation:this.cooperativeSocietyDetails.areaofoperation, 
          management:this.cooperativeSocietyDetails.management, 
          date_of_ele_conducted:this.cooperativeSocietyDetails.dteelectionsconducted, 
          no_of_elected_commite_members:this.cooperativeSocietyDetails.electedcommmumbers, 
          name_of_the_president:this.cooperativeSocietyDetails.nameofpresident, 
          designation:this.cooperativeSocietyDetails.designation, 
          next_date_of_elections:this.cooperativeSocietyDetails.Addressdetails, 
          name_of_the_secretary:this.cooperativeSocietyDetails.nameofsecretry, 
          no_of_employes:this.cooperativeSocietyDetails.noofemployees, 
          audited_by:this.cooperativeSocietyDetails.auditedby, 
          audit_completed_by:this.cooperativeSocietyDetails.auditcompleted, 
          profit_type:this.cooperativeSocietyDetails.profitloss, 
          no_of_members:this.cooperativeSocietyDetails.noofmembers, 
          paid_up_share_cap:this.cooperativeSocietyDetails.sharecaptial, 
          loans_and_advances:this.cooperativeSocietyDetails.loansadvances, 
          borrowing:this.cooperativeSocietyDetails.borroingrupes, 
          members_deposit:this.cooperativeSocietyDetails.memberdeposists, 
          registration_certificate:this.cooperativeSocietyDetails.registerCertfile, 
          insered_by:this.session.userName, 
          inserted_on:"", 
          aided_type:this.cooperativeSocietyDetails.aidedorunaided,
          auditfileupload:this.cooperativeSocietyDetails.auditfile,
          mobile_no:this.cooperativeSocietyDetails.mobilenumber,
          land_lineno:this.cooperativeSocietyDetails.Landlineno,
          email_id:this.cooperativeSocietyDetails.Emailid,
          name_of_the_con_person:this.cooperativeSocietyDetails.contactpersion,
          receipt_cert:this.cooperativeSocietyDetails.Receiptpaymentfile,
          trading_cert:this.cooperativeSocietyDetails.trading_cert,
          manufacturing_cert:this.cooperativeSocietyDetails.manufacturingacctount,
          pl_cert:this.cooperativeSocietyDetails.pl_cert,
          bal_cert:this.cooperativeSocietyDetails.bal_cert
          }

          const response = await this.dlcoAPI.SocietyRegistrationAct(req);
          debugger;
          if(response.message=="Society Registred submitted Faild")
          {
            alert('Society Registred submitted');
            window.location.reload();
            this.spinner.hide();
          }
          else{
            this.toast.info(response.message);
            $("#sumbitbtn").show();
          }
          // if (response.success) {
            
          // } else {
            
           }
          
         
        this.spinner.hide();
     // }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  validate(): boolean {

       this.cooperativeSocietyDetails.dteofregister=moment(this.dteofregister, 'DD-MM-YYYY').format('YYYY/MM/DD');
        this.cooperativeSocietyDetails.dteelectionsconducted=moment(this.dteelectionsconducted, 'DD-MM-YYYY').format('YYYY/MM/DD');
        this.cooperativeSocietyDetails.duedateelections=moment(this.duedateelections, 'DD-MM-YYYY').format('YYYY/MM/DD');
        var IndNum = /^[0]?[6789]\d{9}$/;
        var Emailfilter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

       
    
    if (
       this.cooperativeSocietyDetails.act=== '' ||
       this.cooperativeSocietyDetails.act === null ||
       this.cooperativeSocietyDetails.act === undefined
    )
     {
      this.toast.warning('Please Select Act Type');
      return false;
    }
    if (
      this.cooperativeSocietyDetails.nameofcooperative=== '' ||
      this.cooperativeSocietyDetails.nameofcooperative === null ||
      this.cooperativeSocietyDetails.nameofcooperative === undefined
   )
    {
     this.toast.warning('Please Enter Cooperative Name');
     return false;
   }
   if (
    this.cooperativeSocietyDetails.society=== '' ||
    this.cooperativeSocietyDetails.society === null ||
    this.cooperativeSocietyDetails.society === undefined
 )
  {
   this.toast.warning('Please Select Society Type');
   return false;
 }
 if (
  this.cooperativeSocietyDetails.Classofsociety=== '' ||
  this.cooperativeSocietyDetails.Classofsociety === null ||
  this.cooperativeSocietyDetails.Classofsociety === undefined
)
{
 this.toast.warning('Please Select Class of Society');
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
this.cooperativeSocietyDetails.dteofregister === undefined || this.cooperativeSocietyDetails.dteofregister === 'Invalid date'
)
{
this.toast.warning('Please Select Date of Registration');
return false;
}
if (
  this.cooperativeSocietyDetails.headqutersofsociety=== '' ||
  this.cooperativeSocietyDetails.headqutersofsociety === null ||
  this.cooperativeSocietyDetails.headqutersofsociety === undefined
  )
  {
  this.toast.warning('Please Enter Head Quarters of Society');
  return false;
  }

  // if (
  //   this.cooperativeSocietyDetails.registerCertfile=== '' ||
  //   this.cooperativeSocietyDetails.registerCertfile === null ||
  //   this.cooperativeSocietyDetails.registerCertfile === undefined
  //   )
  //   {
  //   this.toast.warning('Please Upload Registration Certificate');
  //   return false;
  //   }

  if (
    this.cooperativeSocietyDetails.Addressdetails=== '' ||
    this.cooperativeSocietyDetails.Addressdetails === null ||
    this.cooperativeSocietyDetails.Addressdetails === undefined
    )
    {
    this.toast.warning('Please Enter Address of Society');
    return false;
    }

if (
this.cooperativeSocietyDetails.districtId=== '' ||
this.cooperativeSocietyDetails.districtId === null ||
this.cooperativeSocietyDetails.districtId === undefined
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
this.toast.warning('Please Enter Area of the operation');
return false;
}

if (
  this.cooperativeSocietyDetails.contactpersion=== '' ||
  this.cooperativeSocietyDetails.contactpersion === null ||
  this.cooperativeSocietyDetails.contactpersion === undefined
  )
  {
  this.toast.warning('Please Enter Name of The Contact person');
  return false;
  }

  if (
    this.cooperativeSocietyDetails.nameofsecretry=== '' ||
    this.cooperativeSocietyDetails.nameofsecretry === null ||
    this.cooperativeSocietyDetails.nameofsecretry === undefined
    )
    {
    this.toast.warning('Please Select Person Designation');
    return false;
    }
  
    if (
      this.cooperativeSocietyDetails.mobilenumber=== '' ||
      this.cooperativeSocietyDetails.mobilenumber === null ||
      this.cooperativeSocietyDetails.mobilenumber === undefined
      )
      {
      this.toast.warning('Please Enter Mobile Number');
      return false;
      }
      
      if (!(IndNum.test(this.cooperativeSocietyDetails.mobilenumber))) {
				this.toast.warning("Please Enter a mobilenumber starts with 6(or)7(or)8(or)9");
				return false;
			}
      
      // if (
      //   this.cooperativeSocietyDetails.Landlineno=== '' ||
      //   this.cooperativeSocietyDetails.Landlineno === null ||
      //   this.cooperativeSocietyDetails.Landlineno === undefined
      //   )
      //   {
      //   this.toast.warning('Please Enter E-mail id');
      //   return false;
      //   }
        // if (!(Emailfilter.test(this.cooperativeSocietyDetails.Landlineno))) {
        //   this.toast.warning("Please Enter a Valid Mail Id");
        //   return false;
        // }

        // if (
        //   this.cooperativeSocietyDetails.Emailid=== '' ||
        //   this.cooperativeSocietyDetails.Emailid === null ||
        //   this.cooperativeSocietyDetails.Emailid === undefined
        //   )
        //   {
        //   this.toast.warning('Please Enter E-mail id');
        //   return false;
        //   }
          // if (!(Emailfilter.test(this.cooperativeSocietyDetails.Emailid))) {
          //   this.toast.warning("Please Enter a Valid Mail Id");
          //   return false;
          // }

          if(this.cooperativeSocietyDetails.act=="101")
          {
            if (
              this.cooperativeSocietyDetails.aidedorunaided=== '' ||
              this.cooperativeSocietyDetails.aidedorunaided === null ||
              this.cooperativeSocietyDetails.aidedorunaided === undefined
              )
              {
              this.toast.warning('Please Select Aided or Unaided ');
              return false;
              }
          }

          // if (
          //   this.cooperativeSocietyDetails.management=== '' ||
          //   this.cooperativeSocietyDetails.management === null ||
          //   this.cooperativeSocietyDetails.management === undefined
          //   )
          //   {
          //   this.toast.warning('Please Select Management');
          //   return false;
          //   }

          //   if (
          //     this.cooperativeSocietyDetails.dteelectionsconducted=== '' ||
          //     this.cooperativeSocietyDetails.dteelectionsconducted === null ||
          //     this.cooperativeSocietyDetails.dteelectionsconducted === undefined || this.cooperativeSocietyDetails.dteelectionsconducted=== 'Invalid date'
          //     )
          //     {
          //     this.toast.warning('Please Select Date of Election Conducted');
          //     return false;
          //     }


          //     if (
          //       this.cooperativeSocietyDetails.electedcommmumbers=== '' ||
          //       this.cooperativeSocietyDetails.electedcommmumbers === null ||
          //       this.cooperativeSocietyDetails.electedcommmumbers === undefined || this.cooperativeSocietyDetails.electedcommmumbers==="0" || this.cooperativeSocietyDetails.electedcommmumbers==="00" || this.cooperativeSocietyDetails.electedcommmumbers==="000"
          //       )
          //       {
          //       this.toast.warning('Please Enter Election Committee Members');
          //       return false;
          //       }
          //       if (
          //         this.cooperativeSocietyDetails.nameofpresident=== '' ||
          //         this.cooperativeSocietyDetails.nameofpresident === null ||
          //         this.cooperativeSocietyDetails.nameofpresident === undefined
          //         )
          //         {
          //         this.toast.warning('Please Enter Name of the President/ Special Officer/ PIC Chair person/ Adhoc Chair person ');
          //         return false;
          //         }


          //         if (
          //           this.cooperativeSocietyDetails.designation=== '' ||
          //           this.cooperativeSocietyDetails.designation === null ||
          //           this.cooperativeSocietyDetails.designation === undefined
          //           )
          //           {
          //           this.toast.warning('Please Enter Designation');
          //           return false;
          //           }

          //           if (
          //             this.cooperativeSocietyDetails.auditedby=== '' ||
          //             this.cooperativeSocietyDetails.auditedby === null ||
          //             this.cooperativeSocietyDetails.auditedby === undefined
          //             )
          //             {
          //             this.toast.warning('Please Select Audited By ');
          //             return false;
          //             }
          //             if (
          //             this.cooperativeSocietyDetails.auditcompleted=== '' ||
          //             this.cooperativeSocietyDetails.auditcompleted === null ||
          //             this.cooperativeSocietyDetails.auditcompleted === undefined
          //             )
          //             {
          //             this.toast.warning('Please Select Audit completed Upto the year ');
          //             return false;
          //              }

///not use
        //             if (
        //               this.cooperativeSocietyDetails.EleStatus=== '' ||
        //               this.cooperativeSocietyDetails.EleStatus === null ||
        //               this.cooperativeSocietyDetails.EleStatus === undefined
        //               )
        //               {
        //               this.toast.warning('Please Select Elections Status');
        //               return false;
        //               }


        // if(this.cooperativeSocietyDetails.EleStatus=="10")
        // {
        //   if (
        //     this.cooperativeSocietyDetails.duedateelections=== '' ||
        //     this.cooperativeSocietyDetails.duedateelections === null ||
        //     this.cooperativeSocietyDetails.duedateelections === undefined || this.cooperativeSocietyDetails.duedateelections=== 'Invalid date'
        //     )
        //     {
        //     this.toast.warning('Please Select Next Date for Election');
        //     return false;
        //     }
        // }
/// not
// if (
// this.cooperativeSocietyDetails.noofmembers=== '' ||
// this.cooperativeSocietyDetails.noofmembers === null ||
// this.cooperativeSocietyDetails.noofmembers === undefined || this.cooperativeSocietyDetails.noofmembers==="0" || this.cooperativeSocietyDetails.noofmembers==="00" || this.cooperativeSocietyDetails.noofmembers==="000" || this.cooperativeSocietyDetails.noofmembers==="0000" || this.cooperativeSocietyDetails.noofmembers==="00000"
// )
// {
// this.toast.warning('Please Enter Number of members  ');
// return false;
// }

// if (
// this.cooperativeSocietyDetails.sharecaptial=== '' ||
// this.cooperativeSocietyDetails.sharecaptial === null ||
// this.cooperativeSocietyDetails.sharecaptial === undefined || this.cooperativeSocietyDetails.sharecaptial==="0" || this.cooperativeSocietyDetails.sharecaptial==="00" || this.cooperativeSocietyDetails.sharecaptial==="000" || this.cooperativeSocietyDetails.sharecaptial==="0000" || this.cooperativeSocietyDetails.sharecaptial==="00000"
// )
// {
// this.toast.warning('Please Enter Paid up Share Capital');
// return false;
// }
// if (
// this.cooperativeSocietyDetails.noofemployees=== '' ||
// this.cooperativeSocietyDetails.noofemployees === null ||
// this.cooperativeSocietyDetails.noofemployees === undefined || this.cooperativeSocietyDetails.noofemployees==="0" || this.cooperativeSocietyDetails.noofemployees==="00" || this.cooperativeSocietyDetails.noofemployees==="000" || this.cooperativeSocietyDetails.noofemployees==="0000" || this.cooperativeSocietyDetails.noofemployees==="00000"
// )
// {
// this.toast.warning('Please Enter Number of Employees');
// return false;
// }

// if (
//   this.cooperativeSocietyDetails.profitloss=== '' ||
//   this.cooperativeSocietyDetails.profitloss === null ||
//   this.cooperativeSocietyDetails.profitloss === undefined
//   )
//   {
//   this.toast.warning('Please Select Profit/Loss ');
//   return false;
//   }

//   if (
//     this.cooperativeSocietyDetails.borroingrupes=== '' ||
//     this.cooperativeSocietyDetails.borroingrupes === null ||
//     this.cooperativeSocietyDetails.borroingrupes === undefined
//     )
//     {
//     this.toast.warning('Please Enter Borroings');
//     return false;
//     }
//     if (
//       this.cooperativeSocietyDetails.loansadvances=== '' ||
//       this.cooperativeSocietyDetails.loansadvances === null ||
//       this.cooperativeSocietyDetails.loansadvances === undefined
//       )
//       {
//       this.toast.warning('Please Enter Loans and Advances');
//       return false;
//       }
//       if (
//         this.cooperativeSocietyDetails.memberdeposists=== '' ||
//         this.cooperativeSocietyDetails.memberdeposists === null ||
//         this.cooperativeSocietyDetails.memberdeposists === undefined
//         )
//         {
//         this.toast.warning('Please Enter Member Deposits');
//         return false;
//         }
//  if (
//   this.cooperativeSocietyDetails.auditfile=== '' ||
//   this.cooperativeSocietyDetails.auditfile === null ||
//   this.cooperativeSocietyDetails.auditfile === undefined
//   )
//   {
//   this.toast.warning('Please Select Audit File Upload');
//   return false;
//   }
//  if (
//   this.cooperativeSocietyDetails.Receiptpaymentfile=== '' ||
//   this.cooperativeSocietyDetails.Receiptpaymentfile === null ||
//   this.cooperativeSocietyDetails.Receiptpaymentfile === undefined
//   )
//   {
//   this.toast.warning('Please Select Receipt & Payment File Upload');
//   return false;
//   }
//  if (
//   this.cooperativeSocietyDetails.trading_cert=== '' ||
//   this.cooperativeSocietyDetails.trading_cert === null ||
//   this.cooperativeSocietyDetails.trading_cert === undefined
//   )
//   {
//   this.toast.warning('Please Select Trading File Upload');
//   return false;
//   }
//  if (
//   this.cooperativeSocietyDetails.manufacturingacctount=== '' ||
//   this.cooperativeSocietyDetails.manufacturingacctount === null ||
//   this.cooperativeSocietyDetails.manufacturingacctount === undefined
//   )
//   {
//   this.toast.warning('Please Select Manufacturing File Upload');
//   return false;
//   }
//  if (
//   this.cooperativeSocietyDetails.pl_cert=== '' ||
//   this.cooperativeSocietyDetails.pl_cert === null ||
//   this.cooperativeSocietyDetails.pl_cert === undefined
//   )
//   {
//   this.toast.warning('Please Select Profit or Loss File Upload');
//   return false;
//   }
//  if (
//   this.cooperativeSocietyDetails.bal_cert=== '' ||
//   this.cooperativeSocietyDetails.bal_cert === null ||
//   this.cooperativeSocietyDetails.bal_cert === undefined
//   )
//   {
//   this.toast.warning('Please Select Balance File Upload');
//   return false;
//   }



      // if (
      //   this.cooperativeSocietyDetails.registerCertfile=== '' ||
      //   this.cooperativeSocietyDetails.registerCertfile === null ||
      //   this.cooperativeSocietyDetails.registerCertfile === undefined
      //   )
      //   {
      //   this.toast.warning('Please Upload Registerd Certificate');
      //   return false;
      //   }

return true;
}

onActChange(acttype:any): void {
  this.Act1964=false;
   
if(acttype =="101")
  this.Act1964=true;   
else
this.Act1964=false; 
   
}

// onElestatusChange(Status:any){
//   if(Status =="10")
//   this.nextElectionDate=true;   
// else
// this.nextElectionDate=false; 
   
// }



async onAuditfileChange(event: any): Promise<void> {
  try {
    
    if (event.target.files.length > 0) {
      
      const response: any = await this.utils.fileUploadEncodedString(
        event,
        this.utils.fileSize.oneMB
      );
      if (response) 
      {        
        let file = (
          this.sanitizer.bypassSecurityTrustResourceUrl(response) as any
        ).changingThisBreaksApplicationSecurity;
        file = file.replace('data:application/pdf;base64,', "");
        this.cooperativeSocietyDetails.auditfile = file;
          
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
async onRegfileChange(event: any): Promise<void> {
  try {
    
    if (event.target.files.length > 0) {
      const response: any = await this.utils.fileUploadEncodedString(
        event,
        this.utils.fileSize.oneMB
      );
      if (response) 
      {
        
        let file = (
          this.sanitizer.bypassSecurityTrustResourceUrl(response) as any
        ).changingThisBreaksApplicationSecurity;
        file = file.replace('data:application/pdf;base64,', "");
        this.cooperativeSocietyDetails.registerCertfile = file;
         
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

async onReceiptChange(event: any): Promise<void> {
  try {
    debugger;
    if (event.target.files.length > 0) {
      const response: any = await this.utils.fileUploadEncodedString(
        event,
        this.utils.fileSize.oneMB
      );
      if (response) 
      {
        
        let file = (
          this.sanitizer.bypassSecurityTrustResourceUrl(response) as any
        ).changingThisBreaksApplicationSecurity;
        file = file.replace('data:application/pdf;base64,', "");
        this.cooperativeSocietyDetails.Receiptpaymentfile = file;
         
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

async onTradingChange(event: any): Promise<void> {
  try {
     
    if (event.target.files.length > 0) {
      const response: any = await this.utils.fileUploadEncodedString(
        event,
        this.utils.fileSize.oneMB
      );
      if (response) 
      {
        
        let file = (
          this.sanitizer.bypassSecurityTrustResourceUrl(response) as any
        ).changingThisBreaksApplicationSecurity;
        file = file.replace('data:application/pdf;base64,', "");
        this.cooperativeSocietyDetails.trading_cert = file;
         
        
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
async onManufacturingChange(event: any): Promise<void> {
  try {
    
    if (event.target.files.length > 0) {
      const response: any = await this.utils.fileUploadEncodedString(
        event,
        this.utils.fileSize.oneMB
      );
      if (response) 
      {
        
        let file = (
          this.sanitizer.bypassSecurityTrustResourceUrl(response) as any
        ).changingThisBreaksApplicationSecurity;
        file = file.replace('data:application/pdf;base64,', "");
        this.cooperativeSocietyDetails.manufacturingacctount = file;
        console.log(this.cooperativeSocietyDetails.manufacturingacctount);
        debugger;
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
async onProfitChange(event: any): Promise<void> {
  try {
    debugger;
    if (event.target.files.length > 0) {
      const response: any = await this.utils.fileUploadEncodedString(
        event,
        this.utils.fileSize.oneMB
      );
      if (response) 
      {
        
        let file = (
          this.sanitizer.bypassSecurityTrustResourceUrl(response) as any
        ).changingThisBreaksApplicationSecurity;
        file = file.replace('data:application/pdf;base64,', "");
        this.cooperativeSocietyDetails.pl_cert = file;
        console.log(this.cooperativeSocietyDetails.pl_cert);
        debugger;
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
async onBalancesheetChange(event: any): Promise<void> {
  try {
    
    if (event.target.files.length > 0) {
      const response: any = await this.utils.fileUploadEncodedString(
        event,
        this.utils.fileSize.oneMB
      );
      if (response) 
      {
        
        let file = (
          this.sanitizer.bypassSecurityTrustResourceUrl(response) as any
        ).changingThisBreaksApplicationSecurity;
        file = file.replace('data:application/pdf;base64,', "");
        this.cooperativeSocietyDetails.bal_cert = file;
        console.log(this.cooperativeSocietyDetails.bal_cert);
        debugger;
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





}
