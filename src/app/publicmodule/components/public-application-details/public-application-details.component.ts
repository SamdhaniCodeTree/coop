import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePickerService } from 'src/app/sharedModule/services/date-picker.service';
import { SessionService } from 'src/app/sharedModule/services/session.service';
import { ToasterService } from 'src/app/sharedModule/services/toaster.service';
import { UtilsService } from 'src/app/sharedModule/services/utils.service';

@Component({
  selector: 'app-public-application-details',
  templateUrl: './public-application-details.component.html',
  styleUrls: ['./public-application-details.component.css']
})
export class PublicApplicationDetailsComponent implements OnInit {

  titleId:any;surname:any;name:any;careoff:any;genderId:any;aadharno:any;uploadaadhar:any;dateofbirth:any;
  email:any;landlineno:any;countryId:any;stateId:any;mandalId:any;villageId:any;addapplicant:any;mobileno:any;districtId:any;
  pincode:any; age:any;showAge:any;accountData:any;
  // maxDate: Date;
  // minDate: Date;
  applicationDetails={

    titleId:'',
    name:'',
    surname:'',
    careoff:'',
    genderId:'',
    aadharno:'',
    uploadaadhar:'',
    dateofbirth:'',
    pincode:'',
    countryId:'',
    stateId:'',
    districtId:'',
    mandalId:'',
    villageId:'',
    addapplicant:'',
    mobileno:'',
    landlineno:'',
    email:'',
    insertedBy:'',
    source: '',
    
  }
  
  constructor(private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private router: Router,    
    private utils: UtilsService,
    
    private session: SessionService,
    private datePicker: DatePickerService )
     { 

    // this.minDate = this.session.getDOBMinDate();
    // this.maxDate = this.session.getDOBMaxDate();
     this.titleId="";
     this.genderId="";
     this.countryId=""; 
     this.stateId=""; 
     this.mandalId=""; 
     this.villageId="";  
     this.districtId=""; 
    }    

  ngOnInit(): void {
  }

    // async uploadaadharChange(event): Promise<void> {
    //     try {
    //       const element = event.currentTarget as HTMLInputElement;
    //       let fileList: FileList | null = element.files;
        
    //     if(element.files[0].name.split('.').length.toString()!=='2')      
    //     { this.toast.warning('Please Upload Aadhar jpg files only');  
      
    //     event.target.value = '';
    //   return;
    //     }else{
    
    //       const res = await this.utils.encodedString(
    //         event,
    //         this.utils.fileType.IMAGE,
    //         this.utils.fileSize.twoMB
    //       );
    //       if (res) {
    //         this.accountData.passBookImg = res.replace(
    //           'data:image/jpeg;base64,',
    //           ''
    //         );
    //       }
    //     }
    //     } catch (error) {
    //       this.utils.catchResponse(error);
    //     }
    //   }

      // async btnSubmit(): Promise<void> {
      //   try {
      //   } catch (error) {
      //     this.spinner.hide();
      //     this.utils.catchResponse(error);
      //   }
      // }

      async btnSubmit(): Promise<void> {
        try {
          if (this.validate()) {

            
             this.applicationDetails.districtId = this.session.districtId;
             this.applicationDetails.insertedBy = this.session.userName;
             this.applicationDetails.source = 'web';
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
           this.applicationDetails.titleId=== '' ||
           this.applicationDetails.titleId === null ||
           this.applicationDetails.titleId === undefined
        )
         {
          this.toast.warning('Please Select Title');
          return false;
        }
        if (
          this.applicationDetails.name=== '' ||
          this.applicationDetails.name === null ||
          this.applicationDetails.name === undefined
       )
        {
         this.toast.warning('Please Enter Name');
         return false;
       }

       if (
        this.applicationDetails.surname=== '' ||
        this.applicationDetails.surname === null ||
        this.applicationDetails.surname === undefined
     )
      {
       this.toast.warning('Please Enter SurName');
       return false;
     }

     if (
      this.applicationDetails.careoff=== '' ||
      this.applicationDetails.careoff === null ||
      this.applicationDetails.careoff === undefined
   )
    {
     this.toast.warning('Please Enter Care Off');
     return false;
   }
   
   if (
    this.applicationDetails.genderId=== '' ||
    this.applicationDetails.genderId === null ||
    this.applicationDetails.genderId === undefined
 )
  {
   this.toast.warning('Please Select Gender');
   return false;
 }
 if (
  this.applicationDetails.aadharno=== '' ||
  this.applicationDetails.aadharno === null ||
  this.applicationDetails.aadharno === undefined
)
{
 this.toast.warning('Please Enter Aadhar Number');
 return false;
}
 

if (
  this.applicationDetails.uploadaadhar=== '' ||
  this.applicationDetails.uploadaadhar === null ||
  this.applicationDetails.uploadaadhar === undefined
)
{
 this.toast.warning('Please Upload Aadhar Card');
 return false;
}
if (
  this.applicationDetails.dateofbirth=== '' ||
  this.applicationDetails.dateofbirth === null ||
  this.applicationDetails.dateofbirth === undefined
)
{
 this.toast.warning('Please Select Date Of Birth');
 return false;
}

if (
  this.applicationDetails.pincode=== '' ||
  this.applicationDetails.pincode === null ||
  this.applicationDetails.pincode === undefined
)
{
 this.toast.warning('Please Enter Pin Code');
 return false;
}

if (
  this.applicationDetails.countryId=== '' ||
  this.applicationDetails.countryId === null ||
  this.applicationDetails.countryId === undefined
)
{
 this.toast.warning('Please Select Country');
 return false;
}

if (
  this.applicationDetails.stateId=== '' ||
  this.applicationDetails.stateId === null ||
  this.applicationDetails.stateId === undefined
)
{
 this.toast.warning('Please Select State');
 return false;
}

if (
  this.applicationDetails.districtId=== '' ||
  this.applicationDetails.districtId === null ||
  this.applicationDetails.districtId === undefined
)
{
 this.toast.warning('Please Select District');
 return false;
}
if (
  this.applicationDetails.mandalId=== '' ||
  this.applicationDetails.mandalId === null ||
  this.applicationDetails.mandalId === undefined
)
{
 this.toast.warning('Please Select Mandal');
 return false;
}

if (
  this.applicationDetails.villageId=== '' ||
  this.applicationDetails.villageId === null ||
  this.applicationDetails.villageId === undefined
)
{
 this.toast.warning('Please Select City/Town/Revenue Village');
 return false;
}
if (
  this.applicationDetails.addapplicant=== '' ||
  this.applicationDetails.addapplicant === null ||
  this.applicationDetails.addapplicant === undefined
)
{
 this.toast.warning('Please Enter Address of the Applicant ');
 return false;
}

if (
  this.applicationDetails.mobileno=== '' ||
  this.applicationDetails.mobileno === null ||
  this.applicationDetails.mobileno === undefined
)
{
 this.toast.warning('Please Enter Mobile Number ');
 return false;
}
if (
  this.applicationDetails.landlineno=== '' ||
  this.applicationDetails.landlineno === null ||
  this.applicationDetails.landlineno === undefined
)
{
 this.toast.warning('Please Enter Land Line Number ');
 return false;
}

if (
  this.applicationDetails.email=== '' ||
  this.applicationDetails.email === null ||
  this.applicationDetails.email === undefined
)
{
 this.toast.warning('Please Enter E-Mail ');
 return false;
}
return true;
      }
async onAgeChange(timeDiff:any): Promise<void> {
   if(this.applicationDetails.dateofbirth){
     const convertAge = new Date(this.applicationDetails.dateofbirth);
      timeDiff = Math.abs(Date.now() - convertAge.getTime());
     this.showAge = Math.floor(timeDiff / (1000 * 3600 * 24) / 365);
     var ageblow=18;
     debugger;
     if(this.showAge < ageblow){
       this.toast.warning('Not Eligible for below 18 Years');
       this.applicationDetails.dateofbirth='';
       this.age=false;
         return;
 
     }
     else{
       this.age=true;
      }

   }
}


}

