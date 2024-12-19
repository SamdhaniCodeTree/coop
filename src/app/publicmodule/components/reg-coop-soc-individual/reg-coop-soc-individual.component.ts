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
  selector: 'app-reg-coop-soc-individual',
  templateUrl: './reg-coop-soc-individual.component.html',
  styleUrls: ['./reg-coop-soc-individual.component.css']
})
export class RegCoopSocIndividualComponent implements OnInit {
  bsDatepickerConfig: Partial<BsDatepickerConfig> = this.utils.getbsdatepicker();

  minDate!: Date;
  maxDate!: Date;

  titleId:any;genderId:any;authapplicantsociety:any;titleId1:any;genderId1:any;authapplicantsociety1:any;country:any;
  stateId:any;districtId:any;division:any;subdivision:any;mandalId:any;villageId:any;hamletstreet:any;doorno:any;
  
  // minDate:Date;
  // maxDate:Date;
  dteofregister:any;
  dteofresolution:any;
  dateregister:any;
dteofresolution1:any;

  coopsapplicationdetails={
    applicantsociety:'',
    registrationnumber:'',
    dteofregister:'',
    registrationauth:'',
    registercertpdf:'',
    titleId:'',
    name:'',
    surname:'',
    careoff:'',
    genderId:'',
    aadharno:'',
    aadharcardpdf:'',
    authapplicantsociety:'',
    agendanumber:'',
    dteofresolution:'',
    resolutionpdf:'',
    membersociety:'',
    registrationno:'',
    dateregister:'',
    registrationauthority:'',
    upldregistercertpdf:'',
    titleId1:'',
    name1:'',
    surname1:'',
    careoff1:'',
    genderId1:'',
    aadharno1:'',
    aadharcardpdf1:'',
    authapplicantsociety1:'',
    agendanumber1:'',dteofresolution1:'',resolutionpdf1:'',amtcaptial:'',amtentrance:'',
    pincode:'',country:'',stateId:'',districtId:'',division:'',subdivision:'',mandalId:'',
    villageId:'',hamletstreet:'',doorno:'',doctype:'',docname:'',uploaddoc:'',
    
    insertedBy:'',
    source:''

  }
  currentTab: any;
  tabs: any;
  
 
  constructor(private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private router: Router,    
    private utils: UtilsService,
     
    private session: SessionService,
    private datePicker: DatePickerService) {

    // this.minDate = this.session.getDOBMinDate();
    //   this.maxDate = this.session.getDOBMaxDate();

      this.titleId="";
      this.genderId="";
      this.authapplicantsociety="";
      this.titleId1="";
      this.genderId1="";
      this.authapplicantsociety1="";
      this.country="";
      this.stateId="";
      this.districtId="";
      this.division="";
      this.subdivision="";
      this.mandalId="";
      this.villageId="";
      this.hamletstreet="";
      this.doorno="";

      this.visible1=true;
      this.visible2=false;
      this.visible3=false;
   }

  ngOnInit(): void {
  }

//   async onregistercerfchange(event:any): Promise<void> {
//     try {// this.LandAllocateData.POSSESSION_CERT_JD_SUB ='';

//     const element = event.currentTarget as HTMLInputElement;
//     let fileList: FileList | null = element.files;
  
//   if(element.files[0].name.split('.').length.toString()!=='2')      
//   { this.toast.warning('Please Upload PDF files only');  

//   event.target.value = '';
// return;
//   }else{
//       const res: any = await this.utils.encodedString(
//         event,
//         this.utils.fileType.PDF,
//         this.utils.fileSize.oneMB
//       );
//       if (!this.utils.isEmpty(res)) {
//        // this.LandAllocateData.POSSESSION_CERT_JD_SUB = res.split('base64,')[1]; 
//       //  this.LandAllocateData.POSSESSION_CERT_JD_SUB = res.replace('data:application/pdf;base64,','' );
//       }
//     }
//     } catch (error) {
//       this.toast.warning('Please select Possession pdf');
//       //this.utils.catchResponse(error);
//     }
//   }

//   async onaadharcardchange(event:any): Promise<void> {
//     try {// this.LandAllocateData.POSSESSION_CERT_JD_SUB ='';

//     const element = event.currentTarget as HTMLInputElement;
//     let fileList: FileList | null = element.files;
  
//   if(element.files[0].name.split('.').length.toString()!=='2')      
//   { this.toast.warning('Please Upload PDF files only');  

//   event.target.value = '';
// return;
//   }else{
//       const res: any = await this.utils.encodedString(
//         event,
//         this.utils.fileType.PDF,
//         this.utils.fileSize.oneMB
//       );
//       if (!this.utils.isEmpty(res)) {
//        // this.LandAllocateData.POSSESSION_CERT_JD_SUB = res.split('base64,')[1]; 
//       //  this.LandAllocateData.POSSESSION_CERT_JD_SUB = res.replace('data:application/pdf;base64,','' );
//       }
//     }
//     } catch (error) {
//       this.toast.warning('Please select Possession pdf');
//       //this.utils.catchResponse(error);
//     }
//   }

//   async onresolutionchange(event:any): Promise<void> {
//     try {// this.LandAllocateData.POSSESSION_CERT_JD_SUB ='';

//     const element = event.currentTarget as HTMLInputElement;
//     let fileList: FileList | null = element.files;
  
//   if(element.files[0].name.split('.').length.toString()!=='2')      
//   { this.toast.warning('Please Upload PDF files only');  

//   event.target.value = '';
// return;
//   }else{
//       const res: any = await this.utils.encodedString(
//         event,
//         this.utils.fileType.PDF,
//         this.utils.fileSize.oneMB
//       );
//       if (!this.utils.isEmpty(res)) {
//        // this.LandAllocateData.POSSESSION_CERT_JD_SUB = res.split('base64,')[1]; 
//       //  this.LandAllocateData.POSSESSION_CERT_JD_SUB = res.replace('data:application/pdf;base64,','' );
//       }
//     }
//     } catch (error) {
//       this.toast.warning('Please select Possession pdf');
//       //this.utils.catchResponse(error);
//     }
//   }

//   async onregistercerfchange1(event:any): Promise<void> {
//     try {// this.LandAllocateData.POSSESSION_CERT_JD_SUB ='';

//     const element = event.currentTarget as HTMLInputElement;
//     let fileList: FileList | null = element.files;
  
//   if(element.files[0].name.split('.').length.toString()!=='2')      
//   { this.toast.warning('Please Upload PDF files only');  

//   event.target.value = '';
// return;
//   }else{
//       const res: any = await this.utils.encodedString(
//         event,
//         this.utils.fileType.PDF,
//         this.utils.fileSize.oneMB
//       );
//       if (!this.utils.isEmpty(res)) {
//        // this.LandAllocateData.POSSESSION_CERT_JD_SUB = res.split('base64,')[1]; 
//       //  this.LandAllocateData.POSSESSION_CERT_JD_SUB = res.replace('data:application/pdf;base64,','' );
//       }
//     }
//     } catch (error) {
//       this.toast.warning('Please select Possession pdf');
//       //this.utils.catchResponse(error);
//     }
//   }

//   async onaadharcardchange1(event:any): Promise<void> {
//     try {// this.LandAllocateData.POSSESSION_CERT_JD_SUB ='';

//     const element = event.currentTarget as HTMLInputElement;
//     let fileList: FileList | null = element.files;
  
//   if(element.files[0].name.split('.').length.toString()!=='2')      
//   { this.toast.warning('Please Upload PDF files only');  

//   event.target.value = '';
// return;
//   }else{
//       const res: any = await this.utils.encodedString(
//         event,
//         this.utils.fileType.PDF,
//         this.utils.fileSize.oneMB
//       );
//       if (!this.utils.isEmpty(res)) {
//        // this.LandAllocateData.POSSESSION_CERT_JD_SUB = res.split('base64,')[1]; 
//       //  this.LandAllocateData.POSSESSION_CERT_JD_SUB = res.replace('data:application/pdf;base64,','' );
//       }
//     }
//     } catch (error) {
//       this.toast.warning('Please select Possession pdf');
//       //this.utils.catchResponse(error);
//     }
//   }

//   async onresolutionchange1(event:any): Promise<void> {
//     try {// this.LandAllocateData.POSSESSION_CERT_JD_SUB ='';

//     const element = event.currentTarget as HTMLInputElement;
//     let fileList: FileList | null = element.files;
  
//   if(element.files[0].name.split('.').length.toString()!=='2')      
//   { this.toast.warning('Please Upload PDF files only');  

//   event.target.value = '';
// return;
//   }else{
//       const res: any = await this.utils.encodedString(
//         event,
//         this.utils.fileType.PDF,
//         this.utils.fileSize.oneMB
//       );
//       if (!this.utils.isEmpty(res)) {
//        // this.LandAllocateData.POSSESSION_CERT_JD_SUB = res.split('base64,')[1]; 
//       //  this.LandAllocateData.POSSESSION_CERT_JD_SUB = res.replace('data:application/pdf;base64,','' );
//       }
//     }
//     } catch (error) {
//       this.toast.warning('Please select Possession pdf');
//       //this.utils.catchResponse(error);
//     }
//   }

//   async ondocuploadchange(event:any): Promise<void> {
//     try {// this.LandAllocateData.POSSESSION_CERT_JD_SUB ='';

//     const element = event.currentTarget as HTMLInputElement;
//     let fileList: FileList | null = element.files;
  
//   if(element.files[0].name.split('.').length.toString()!=='2')      
//   { this.toast.warning('Please Upload PDF files only');  

//   event.target.value = '';
// return;
//   }else{
//       const res: any = await this.utils.encodedString(
//         event,
//         this.utils.fileType.PDF,
//         this.utils.fileSize.oneMB
//       );
//       if (!this.utils.isEmpty(res)) {
//        // this.LandAllocateData.POSSESSION_CERT_JD_SUB = res.split('base64,')[1]; 
//       //  this.LandAllocateData.POSSESSION_CERT_JD_SUB = res.replace('data:application/pdf;base64,','' );
//       }
//     }
//     } catch (error) {
//       this.toast.warning('Please select Possession pdf');
//       //this.utils.catchResponse(error);
//     }
//   }


  async btnSubmit(): Promise<void> {
    try {
      if (this.validate()) {
        this.coopsapplicationdetails.dteofregister=moment(this.dteofregister, 'DD-MM-YYYY').format('DD-MM-YYYY');
        this.coopsapplicationdetails.dteofresolution=moment(this.dteofresolution, 'DD-MM-YYYY').format('DD-MM-YYYY');
        this.coopsapplicationdetails.dateregister=moment(this.dateregister, 'DD-MM-YYYY').format('DD-MM-YYYY');
        this.coopsapplicationdetails.dteofresolution1=moment(this.dteofresolution1, 'DD-MM-YYYY').format('DD-MM-YYYY');
        
         this.coopsapplicationdetails.districtId = this.session.districtId;
         this.coopsapplicationdetails.insertedBy = this.session.userName;
         this.coopsapplicationdetails.source = 'web';
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
       this.coopsapplicationdetails.applicantsociety=== '' ||
       this.coopsapplicationdetails.applicantsociety === null ||
       this.coopsapplicationdetails.applicantsociety === undefined
     )
     {
       this.toast.warning('Please Enter Name Of The Applicant Society');
       return false;
     }
    if (
      this.coopsapplicationdetails.registrationnumber=== '' ||
      this.coopsapplicationdetails.registrationnumber === null ||
      this.coopsapplicationdetails.registrationnumber === undefined
   )
    {
     this.toast.warning('Please Enter Registration Number');
     return false;
   }

   if (
    this.coopsapplicationdetails.dteofregister=== '' ||
    this.coopsapplicationdetails.dteofregister === null ||
    this.coopsapplicationdetails.dteofregister === undefined
 )
  {
   this.toast.warning('Please Select Date of Registration');
   return false;
 }

 if (
  this.coopsapplicationdetails.registrationauth=== '' ||
  this.coopsapplicationdetails.registrationauth === null ||
  this.coopsapplicationdetails.registrationauth === undefined
 )
  {
  this.toast.warning('Please Enter Registration Authority');
  return false;
  }

  if (
  this.coopsapplicationdetails.registercertpdf=== '' ||
  this.coopsapplicationdetails.registercertpdf === null ||
  this.coopsapplicationdetails.registercertpdf === undefined
  )
  {
  this.toast.warning('Please  Upload Registration Certificate (PDF)');
  return false;
  }
  if (
  this.coopsapplicationdetails.titleId=== '' ||
  this.coopsapplicationdetails.titleId === null ||
  this.coopsapplicationdetails.titleId === undefined
  )
  {
  this.toast.warning('Please Select Title');
  return false;
  }


  if (
  this.coopsapplicationdetails.name=== '' ||
  this.coopsapplicationdetails.name === null ||
  this.coopsapplicationdetails.name === undefined
  )
  {
  this.toast.warning('Please Enter Name');
  return false;
  }
  if (
  this.coopsapplicationdetails.surname=== '' ||
  this.coopsapplicationdetails.surname === null ||
  this.coopsapplicationdetails.surname === undefined
  )
  {
  this.toast.warning('Please Enter SurName');
  return false;
  }

  if (
  this.coopsapplicationdetails.careoff=== '' ||
  this.coopsapplicationdetails.careoff === null ||
  this.coopsapplicationdetails.careoff === undefined
  )
  {
  this.toast.warning('Please Enter S/o,W/o,D/o,C/o');
  return false;
  }

  if (
  this.coopsapplicationdetails.genderId=== '' ||
  this.coopsapplicationdetails.genderId === null ||
  this.coopsapplicationdetails.genderId === undefined
  )
  {
  this.toast.warning('Please Enter Gender');
  return false;
  }

  if (
  this.coopsapplicationdetails.aadharno=== '' ||
  this.coopsapplicationdetails.aadharno === null ||
  this.coopsapplicationdetails.aadharno === undefined
  )
  {
  this.toast.warning('Please Enter UID(Aadhar No)');
  return false;
  }

  if (
  this.coopsapplicationdetails.aadharcardpdf=== '' ||
  this.coopsapplicationdetails.aadharcardpdf === null ||
  this.coopsapplicationdetails.aadharcardpdf === undefined
  )
  {
  this.toast.warning('Please Upload Aadhar Card (PDF)');
  return false;
  }
  if (
  this.coopsapplicationdetails.authapplicantsociety=== '' ||
  this.coopsapplicationdetails.mandalId === null ||
  this.coopsapplicationdetails.mandalId === undefined
  )
  {
  this.toast.warning('Please Select Designation of the Authorised Person in the Applicant Society');
  return false;
  }

  if (
  this.coopsapplicationdetails.agendanumber=== '' ||
  this.coopsapplicationdetails.agendanumber === null ||
  this.coopsapplicationdetails.agendanumber === undefined
  )
  {
  this.toast.warning('Please Enter Agenda Number');
  return false;
  }
  if (
  this.coopsapplicationdetails.dteofresolution=== '' ||
  this.coopsapplicationdetails.dteofresolution === null ||
  this.coopsapplicationdetails.dteofresolution === undefined
  )
  {
  this.toast.warning('Please Select Date of Resolution ');
  return false;
  }

  if (
  this.coopsapplicationdetails.resolutionpdf=== '' ||
  this.coopsapplicationdetails.resolutionpdf === null ||
  this.coopsapplicationdetails.resolutionpdf === undefined
  )
  {
  this.toast.warning('Please Upload Resolution Copy (PDF) ');
  return false;
  }
  if (
  this.coopsapplicationdetails.membersociety=== '' ||
  this.coopsapplicationdetails.membersociety === null ||
  this.coopsapplicationdetails.membersociety === undefined
  )
  {
  this.toast.warning('Please Enter Name Of The Member Society ');
  return false;
  }

  if (
  this.coopsapplicationdetails.registrationno=== '' ||
  this.coopsapplicationdetails.registrationno === null ||
  this.coopsapplicationdetails.registrationno === undefined
  )
  {
  this.toast.warning('Please Enter Registration Number ');
  return false;
  }

  if (
  this.coopsapplicationdetails.dateregister=== '' ||
  this.coopsapplicationdetails.dateregister === null ||
  this.coopsapplicationdetails.dateregister === undefined
  )
  {
  this.toast.warning('Please Select Date of Registration ');
  return false;
  }

  if (
  this.coopsapplicationdetails.registrationauthority=== '' ||
  this.coopsapplicationdetails.registrationauthority === null ||
  this.coopsapplicationdetails.registrationauthority === undefined
  )
  {
  this.toast.warning('Please Enter Registration Authority ');
  return false;
  }

  if (
  this.coopsapplicationdetails.upldregistercertpdf=== '' ||
  this.coopsapplicationdetails.upldregistercertpdf === null ||
  this.coopsapplicationdetails.upldregistercertpdf === undefined
  )
  {
  this.toast.warning('Please Upload Registration Certificate (PDF) ');
  return false;
  }

  if (
  this.coopsapplicationdetails.titleId1=== '' ||
  this.coopsapplicationdetails.titleId1 === null ||
  this.coopsapplicationdetails.titleId1 === undefined
  )
  {
  this.toast.warning('Please Enter Title ');
  return false;
  }

  if (
  this.coopsapplicationdetails.name1=== '' ||
  this.coopsapplicationdetails.name1 === null ||
  this.coopsapplicationdetails.name1 === undefined
  )
  {
  this.toast.warning('Please Enter Name ');
  return false;
  }

  if (
  this.coopsapplicationdetails.surname1=== '' ||
  this.coopsapplicationdetails.surname1 === null ||
  this.coopsapplicationdetails.surname1 === undefined
  )
  {
  this.toast.warning('Please Enter SurName ');
  return false;
  }

  if (
  this.coopsapplicationdetails.careoff1=== '' ||
  this.coopsapplicationdetails.careoff1 === null ||
  this.coopsapplicationdetails.careoff1 === undefined
  )
  {
  this.toast.warning('Please Enter S/o,W/o,D/o,C/o ');
  return false;
  }

  if (
  this.coopsapplicationdetails.genderId1=== '' ||
  this.coopsapplicationdetails.genderId1 === null ||
  this.coopsapplicationdetails.genderId1 === undefined
  )
  {
  this.toast.warning('Please Select Gender ');
  return false;
  }

  if (
  this.coopsapplicationdetails.aadharno1=== '' ||
  this.coopsapplicationdetails.aadharno1 === null ||
  this.coopsapplicationdetails.aadharno1 === undefined
  )
  {
  this.toast.warning('Please Enter UID(Aadhar No) ');
  return false;
  }

  if (
  this.coopsapplicationdetails.aadharcardpdf1=== '' ||
  this.coopsapplicationdetails.aadharcardpdf1 === null ||
  this.coopsapplicationdetails.aadharcardpdf1 === undefined
  )
  {
  this.toast.warning('Please Upload Aadhar Card (PDF) ');
  return false;
  }

  if (
  this.coopsapplicationdetails.authapplicantsociety1=== '' ||
  this.coopsapplicationdetails.authapplicantsociety1 === null ||
  this.coopsapplicationdetails.authapplicantsociety1 === undefined
  )
  {
  this.toast.warning('Please Select Designation of the Authorised Person in the Applicant Society ');
  return false;
  }
  if (
  this.coopsapplicationdetails.agendanumber1=== '' ||
  this.coopsapplicationdetails.agendanumber1 === null ||
  this.coopsapplicationdetails.agendanumber1 === undefined
  )
  {
  this.toast.warning('Please Enter Agenda Number ');
  return false;
  }
  if (
  this.coopsapplicationdetails.dteofresolution1=== '' ||
  this.coopsapplicationdetails.dteofresolution1 === null ||
  this.coopsapplicationdetails.dteofresolution1 === undefined
  )
  {
  this.toast.warning('Please Select Date of Resolution ');
  return false;
  }

  if (
  this.coopsapplicationdetails.resolutionpdf1=== '' ||
  this.coopsapplicationdetails.resolutionpdf1 === null ||
  this.coopsapplicationdetails.resolutionpdf1 === undefined
  )
  {
  this.toast.warning('Please Upload Resolution Copy (PDF) ');
  return false;
  }  


  if (
  this.coopsapplicationdetails.amtcaptial=== '' ||
  this.coopsapplicationdetails.amtcaptial === null ||
  this.coopsapplicationdetails.amtcaptial === undefined
  )
  {
  this.toast.warning('Please Enter Amount of Share Captial Remitted  ');
  return false;
  }  

  if (
  this.coopsapplicationdetails.amtentrance=== '' ||
  this.coopsapplicationdetails.amtentrance === null ||
  this.coopsapplicationdetails.amtentrance === undefined
  )
  {
  this.toast.warning('Please Enter Amount of Entrance Fee Remitted');
  return false;
  }  

  if (
  this.coopsapplicationdetails.pincode=== '' ||
  this.coopsapplicationdetails.pincode === null ||
  this.coopsapplicationdetails.pincode === undefined
  )
  {
  this.toast.warning('Please Enter Pincode ');
  return false;
  }  

  if (
  this.coopsapplicationdetails.country=== '' ||
  this.coopsapplicationdetails.country === null ||
  this.coopsapplicationdetails.country === undefined
  )
  {
  this.toast.warning('Please Select Country');
  return false;
  }  

  if (
  this.coopsapplicationdetails.stateId=== '' ||
  this.coopsapplicationdetails.stateId === null ||
  this.coopsapplicationdetails.stateId === undefined
  )
  {
  this.toast.warning('Please Select State ');
  return false;
  }  

  if (
  this.coopsapplicationdetails.districtId=== '' ||
  this.coopsapplicationdetails.districtId === null ||
  this.coopsapplicationdetails.districtId === undefined
  )
  {
  this.toast.warning('Please Select District ');
  return false;
  }  

  if (
  this.coopsapplicationdetails.division=== '' ||
  this.coopsapplicationdetails.division === null ||
  this.coopsapplicationdetails.division === undefined
  )
  {
  this.toast.warning('Please Select Division  ');
  return false;
  }  

  if (
  this.coopsapplicationdetails.subdivision=== '' ||
  this.coopsapplicationdetails.subdivision === null ||
  this.coopsapplicationdetails.subdivision === undefined
  )
  {
  this.toast.warning('Please Select Sub-Division ');
  return false;
  }  

  if (
  this.coopsapplicationdetails.mandalId=== '' ||
  this.coopsapplicationdetails.mandalId === null ||
  this.coopsapplicationdetails.mandalId === undefined
  )
  {
  this.toast.warning('Please Select Mandal ');
  return false;
  }  

  if (
  this.coopsapplicationdetails.villageId=== '' ||
  this.coopsapplicationdetails.villageId === null ||
  this.coopsapplicationdetails.villageId === undefined
  )
  {
  this.toast.warning('Please Select City/Town/Revenue Village');
  return false;
  }  

  if (
  this.coopsapplicationdetails.hamletstreet=== '' ||
  this.coopsapplicationdetails.hamletstreet === null ||
  this.coopsapplicationdetails.hamletstreet === undefined
  )
  {
  this.toast.warning('Please Enter Hamlet/Street');
  return false;
  }  

  if (
  this.coopsapplicationdetails.doorno=== '' ||
  this.coopsapplicationdetails.doorno === null ||
  this.coopsapplicationdetails.doorno === undefined
  )
  {
  this.toast.warning('Please Enter Door No/Flat No ');
  return false;
  }  

  if (
  this.coopsapplicationdetails.doctype=== '' ||
  this.coopsapplicationdetails.doctype === null ||
  this.coopsapplicationdetails.doctype === undefined
  )
  {
  this.toast.warning('Please Enter Document Type');
  return false;
  }  

  if (
  this.coopsapplicationdetails.docname=== '' ||
  this.coopsapplicationdetails.docname === null ||
  this.coopsapplicationdetails.docname === undefined
  )
  {
  this.toast.warning('Please Enter Document Name');
  return false;
  }  

  if (
  this.coopsapplicationdetails.uploaddoc=== '' ||
  this.coopsapplicationdetails.uploaddoc === null ||
  this.coopsapplicationdetails.uploaddoc === undefined
  )
  {
  this.toast.warning('Please Upload Document (PDF)');
  return false;
  } 
  return true; 

  }

  visible1:any;
  visible2:any;
  visible3:any;

  async  prev1(): Promise<void> {
    try {
          this.visible1=false;
          this.visible2=false;
          this.visible3=false;
        } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
  async  next1(): Promise<void> {
      try {
        this.visible1=false;
        this.visible2=true;
        this.visible3=false;
      } catch (error) {
        this.spinner.hide();
        this.utils.catchResponse(error);
      }
  }
  async  prev2(): Promise<void> {
    try {
      
      this.visible1=true;
      this.visible2=false;
      this.visible3=false; 
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
  async  next2(): Promise<void> {
    try {
      this.visible1=false;
      this.visible2=false;
      this.visible3=true; 
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    } 
}
  async  prev3(): Promise<void> {
    try {
      
      this.visible1=false;
      this.visible2=true;
      this.visible3=false; 
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
  async  next3(): Promise<void> {
    try {
      this.visible1=false;
      this.visible2=false;
      this.visible3=false; 
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
}
}


