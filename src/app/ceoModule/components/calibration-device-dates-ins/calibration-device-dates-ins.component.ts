import { Component, Input, OnInit } from '@angular/core';
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
import { CeoService } from '../../services/ceo.service';
import { promise } from 'protractor';
import * as moment from 'moment';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-calibration-device-dates-ins',
  templateUrl: './calibration-device-dates-ins.component.html',
  styleUrls: ['./calibration-device-dates-ins.component.css']
})
export class CalibrationDeviceDatesInsComponent implements OnInit {
  bsDatepickerConfig: Partial<BsDatepickerConfig> = this.utils.getbsdatepicker();
  constructor(
    private spinner: NgxSpinnerService,
  private toast: ToasterService,
  private ngxToaster: NgxToasterService,
  private router: Router,
  private utils: UtilsService,
  private session: SessionService,
  private console: ConsoleService,
  private jcAPI: JcService,
  private sharedAPI: SharedService,
  private sanitizer: DomSanitizer,
  private ceoAPI: CeoService
  ) {  this.maxDate = this.session.getTodayDate();
    this.minDate=new Date('20-01-2022');}
  minDate!: Date;
  maxDate!: Date;
 // minDate1!: Date;
  districtId:any;
  DeviceList: any[] = [];
  DeviceDetailsList: any[] = [];
  pacslistData: any[] = [];
  DistrictlistData: any[] = [];
  MandallistData: any[] = [];
  inspectionDate:any;
  DeliveryNoteDate:any;
  Edit_inspectionDate:any;
  Edit_DeliveryNote_date:any;
  installDate:any;
  installDateinternet:any;
  Edit_installDate:any;
  btnsubmitstatus=true;
  internetcntvty=false;
  internetshowhide=false;
  internetdtsshow=false;
  internetdtsshow1=false;
  hidedate=true;
  show=true;



  DeviceDetails={
    Districtcode:'',
  Mandalcode:'',
    deviceId:'',
    Device_name:'',
    SerialNo:'',
    Acknowledgment:'',
    inspectionDate:'',
    DeviceImage:'',
    componentname:'',
    modeldetails:'',
    invoicepdf:'',
    challanpdf:'',

    installDate:'',
    internetprovname:'',
    internetSpeed:'',

    vendorcharges:'',
    ServicenodeviceImage:'',
    PACS_CODE:'',
    PACS_NAME:'' ,
    DeliveryNoteDate:'',
    TaxinvoiceNumber:'',
    IsinternetConnection:''
  }
  
  EditDeviceDetails={
    deviceId:'',
    Device_name:'',
    SerialNo:'',
    Acknowledgment:'',
    inspectionDate:'',
    DeviceImage:'',
    Update_DeviceImage:'',
    componentname:'',
    modeldetails:'',
    update_invoicepdf:'',
    invoicepdf:'',
    challanpdf:'',
    update_challanpdf:'',

    installDate:'',
    internetprovname:'',
    internetSpeed:'',
    vendorcharges:'',
    ServicenodeviceImage:'',
    old_ServicenodeviceImage:'',
    Packname:'',
    DeliveryNote_date:'',
    PackId:'',
    TaxinvoiceNumber:'',
  } 
  update_challanpdf:any;
  update_invoicepdf:any;
  Update_DeviceImage:any;
  invoicepdf:any;
  challanpdf:any;
  DeviceReceivedPopUp = false;
  showtext=false;  

  deviceChange(obj:any){

    let objvalue= this.DeviceList.find(data=>data.DEVICE_ID==obj);
    debugger;
    this.DeviceDetails.Device_name=objvalue.DEVICE_NAME; 
    if(this.DeviceDetails.deviceId=="111"){
      this.internetshowhide = true;
      this.internetdtsshow = false;
      this.internetdtsshow1 = false;
    
    }
    else if( this.DeviceDetails.deviceId!="111"){
      this.internetshowhide = false;
      this.internetdtsshow = true;
      this.internetdtsshow1 = false;
    }
          else{
      this.internetshowhide = false;
      this.internetdtsshow= false;
      this.internetdtsshow1 = false;
    }


    if(this.DeviceDetails.deviceId=="111"){
      this.show=false;
    }
    else{
      this.show=true;
    }



    this.loadDevDetails();
  }

  PacsChange(obj:any){

    this.DeviceDetailslistView(obj);
    this.loadDeviceDetails(obj);
    // let objvalue= this.DeviceList.find(data=>data.PACS_CODE==obj);
    // debugger;
    // this.DeviceDetails.Device_name=objvalue.PACS_NAME; 
    //if(this.DeviceDetails.deviceId=="111")
    
  }
  errorMessage: string = '';
  

  // Function to check if the date is valid
  isValidDate(date: any): boolean {
    return date instanceof Date && !isNaN(date.getTime());
  }

  DistChange(obj:any)
  {
this.loadMandalDetails(obj);
  }
  MandalChange(obj:any){
    this.loadpacksDetails(obj);
  }

 // this.DeviceDetailslist();

  ngOnInit(): void {
    this.loadDistrictDetails();
    //this.loadpacksDetails();
   // this.loadDeviceDetails();
   
    let dt = new Date();
  this.inspectionDate='';
 // this.inspectionDate=this.session.getDateddmmyyyyString(dt);
   // this.inspectionDate= this.session.getTodayDateString(); 
  }

  async loadDistrictDetails(): Promise<void> {
    try { debugger;
      const req = {
        type: '43',
        mobileno:this.session.uniqueId  //pacId,
         
      }; debugger;
      this.spinner.show();
      const response = await this.sharedAPI.Hrmsemp(req);
      if (response.success) { 
        
         
      this.DistrictlistData=response.result;
      //this.DeviceDetails.PACS_CODE=this.session.pacId ;
      // let objvalue= this.DeviceList.find(data=>data.PACS_CODE==this.session.pacId);
      // this.DeviceDetails.PACS_NAME=objvalue.PACS_NAME; 

      }  
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async loadMandalDetails(obj:any): Promise<void> {
    try { debugger;
      const req = {
        type: '44',
        mobileno:this.session.uniqueId,
        cfmsid:this.DeviceDetails.Districtcode  //pacId,
         
      }; debugger;
      this.spinner.show();
      const response = await this.sharedAPI.Hrmsemp(req);
      if (response.success) { 
        
         
      this.MandallistData=response.result;
      //this.DeviceDetails.PACS_CODE=this.session.pacId ;
      // let objvalue= this.DeviceList.find(data=>data.PACS_CODE==this.session.pacId);
      // this.DeviceDetails.PACS_NAME=objvalue.PACS_NAME; 

      }  
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
 
  async loadpacksDetails(obj:any): Promise<void> {
    try { debugger;
      const req = {
        type: '45',
        mobileno:this.session.uniqueId,
        cfmsid:this.DeviceDetails.Districtcode,
        alternativemobileno:obj  //pacId,
         
      }; debugger;
      this.spinner.show();
      const response = await this.sharedAPI.Hrmsemp(req);
      if (response.success) { 
        
         
      this.pacslistData=response.result;
      //this.DeviceDetails.PACS_CODE=this.session.pacId ;
      // let objvalue= this.DeviceList.find(data=>data.PACS_CODE==this.session.pacId);
      // this.DeviceDetails.PACS_NAME=objvalue.PACS_NAME; 

      }  
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async loadDeviceDetails(obj:any): Promise<void> {
    try {
      const req = {
        type: '210',
        mobileno:obj,
         
      }; 
      this.spinner.show();
      debugger;
      const response = await this.sharedAPI.Hrmsemp(req);
      if (response.success) {
        this.DeviceList = response.result;
        this.btnsubmitstatus=true;
        // if(response.result[0].SITESTATUS=="1")
        //   {this.btnsubmitstatus=true;
        //  this.DeviceList = response.result;}
        //   else
        //   {
        //     this.btnsubmitstatus=false;
        //     this.DeviceList =[];
        //    // this.toast.info("Site Preparation Details Not Completed");

        //   }
      } else {
        this.DeviceList = [];
        if(this.DeviceDetails.deviceId == ""){
          this.btnsubmitstatus=false;
          this.toast.info("Device Details Submission Completed !!!");
       }else{  
        //this.toast.info(response.message);

       }
      
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async DeviceDetailslistView(obj:any): Promise<void> {
    try {  
      debugger;
      this.DeviceDetailsList=[];
      const req = {
        type: '230',
        mobileno:obj,         
      };
      this.spinner.show();
      const response = await this.sharedAPI.Hrmsemp(req);
      debugger;
      if (response.success) {
        this.DeviceDetailsList = response.result;
        // if(this.DeviceDetailsList.length==17)
        // {
        //   alert("Hai .....");
        // }
      } else {
        //this.toast.info(response.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
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

//   async btnCalibration():Promise<void>{
//     try {
// debugger;
// if(this.DeviceDetails.IsinternetConnection === '2'){
//   this.DeviceDetails.inspectionDate="";
//   this.DeviceDetails.installDate="";
//       this.DeviceDetails.DeliveryNoteDate="";
//       this.SubmitCalibDetails();
// }
// else{
//   this.DeviceDetails.inspectionDate=moment(this.inspectionDate, 'DD-MM-YYYY').format('DD-MM-YYYY');
//   this.DeviceDetails.installDate=moment(this.installDate, 'DD-MM-YYYY').format('DD-MM-YYYY');
//       this.DeviceDetails.DeliveryNoteDate=moment(this.DeliveryNoteDate, 'DD-MM-YYYY').format('DD-MM-YYYY');
//       this.SubmitCalibDetails();
// }
//       // this.DeviceDetails.IsinternetConnection='';
//      // this.DeviceDetails.inspectionDate=moment(this.inspectionDate, 'DD-MM-YYYY').format('DD-MM-YYYY');
//       this.DeviceDetails.installDate=moment(this.installDate, 'DD-MM-YYYY').format('DD-MM-YYYY');
//       this.DeviceDetails.DeliveryNoteDate=moment(this.DeliveryNoteDate, 'DD-MM-YYYY').format('DD-MM-YYYY');

//       if (this.DeviceDetails.deviceId === '' ||  this.DeviceDetails.deviceId === null ||    this.DeviceDetails.deviceId === undefined) {
//         this.toast.warning('Please Select Device');
//         return;
//       } 
//       if(this.DeviceDetails.deviceId === "111"){ 

//         if(this.DeviceDetails.IsinternetConnection === "1"){
       
//         if (    this.DeviceDetails.inspectionDate === '' ||  this.DeviceDetails.inspectionDate === null ||    this.DeviceDetails.inspectionDate === undefined ||
//           this.DeviceDetails.inspectionDate === 'Invalid date'  ) {
//           this.toast.warning('Please Select Received Date');
//           return;
//         } 
//         if (this.DeviceDetails.SerialNo === '' ||  this.DeviceDetails.SerialNo === null ||    this.DeviceDetails.SerialNo === undefined) {
//           this.toast.warning('Please Enter Serial Number');
//           return;
//         }
//         if (this.DeviceDetails.Acknowledgment === '' ||  this.DeviceDetails.Acknowledgment === null ||    this.DeviceDetails.Acknowledgment === undefined) {
//           this.toast.warning('Please Enter Acknowledgment Number');
//           return;
//         }
//         if (this.DeviceDetails.componentname === '' ||  this.DeviceDetails.componentname === null ||    this.DeviceDetails.componentname === undefined) {
//           this.toast.warning('Please Enter Component Name');
//           return;
//         }
//         if (this.DeviceDetails.modeldetails === '' ||  this.DeviceDetails.modeldetails === null ||    this.DeviceDetails.modeldetails === undefined) {
//           this.toast.warning('Please Enter Model Details');
//           return;
//         }
//         debugger;
//         if (this.DeviceDetails.DeviceImage === '' ||  this.DeviceDetails.DeviceImage === null ||    this.DeviceDetails.DeviceImage === undefined) {
//           this.toast.warning('Please Select Image JPG Only');
//           return;
      
//         }
      
//         if (this.DeviceDetails.invoicepdf === '' ||  this.DeviceDetails.invoicepdf === null ||    this.DeviceDetails.invoicepdf === undefined) {
//           this.toast.warning('Please Select Invoice Pdf Only');
//           return;
      
//         }
      
//         if (this.DeviceDetails.challanpdf === '' ||  this.DeviceDetails.challanpdf === null ||    this.DeviceDetails.challanpdf === undefined) {
//           this.toast.warning('Please Select Challan Pdf Only');
//           return;
      
//         }
//         if (this.DeviceDetails.ServicenodeviceImage === '' ||  this.DeviceDetails.ServicenodeviceImage === null ||    this.DeviceDetails.ServicenodeviceImage === undefined) {
//           this.toast.warning('Please Select Serial Number Image');
//           return;
      
//         }
      
//         if (this.DeviceDetails.IsinternetConnection === '1') {
      
//           if (this.DeviceDetails.internetprovname === '' ||  this.DeviceDetails.internetprovname === null ||    this.DeviceDetails.internetprovname === undefined) {
//             this.toast.warning('Please Enter Internet Service Provider Name');
//             return;
//           }
//           if (this.DeviceDetails.internetSpeed === '' ||  this.DeviceDetails.internetSpeed === null ||    this.DeviceDetails.internetSpeed === undefined) {
//             this.toast.warning('Please Enter Internet Speed');
//             return;
//           }
//           if (this.DeviceDetails.installDate === '' ||  this.DeviceDetails.installDate === null ||    this.DeviceDetails.installDate === undefined || this.DeviceDetails.installDate === 'Invalid date') {
//             this.toast.warning('Please Enter Date of Installation');
//             return;
//           }
//           if (this.DeviceDetails.vendorcharges === '' ||  this.DeviceDetails.vendorcharges === null ||    this.DeviceDetails.vendorcharges === undefined) {
//             this.toast.warning('Please Select Whether the first months charges Have Been Paid by the Vendor');
//             return;
        
//           }
//           // this.toast.warning('Please Select Device');
//           // return;
//         }
      
//         if (this.DeviceDetails.DeliveryNoteDate === '' ||  this.DeviceDetails.DeliveryNoteDate === null ||    this.DeviceDetails.DeliveryNoteDate === undefined) {
//           this.toast.warning('Please Select Deliverty Note Date');
//           return;
      
//         }
//         if (this.DeviceDetails.TaxinvoiceNumber === '' ||  this.DeviceDetails.TaxinvoiceNumber === null ||    this.DeviceDetails.TaxinvoiceNumber === undefined) {
//           this.toast.warning('Please Enter Tax Invoice Number');
//           return;
      
//         }
//       } 

//       this.SubmitCalibDetails();

//       }
//       else{ 

//   if (    this.DeviceDetails.inspectionDate === '' ||  this.DeviceDetails.inspectionDate === null ||    this.DeviceDetails.inspectionDate === undefined ||
//     this.DeviceDetails.inspectionDate === 'Invalid date'  ) {
//     this.toast.warning('Please Select Received Date');
//     return;
//   } 
//   if (this.DeviceDetails.SerialNo === '' ||  this.DeviceDetails.SerialNo === null ||    this.DeviceDetails.SerialNo === undefined) {
//     this.toast.warning('Please Enter Serial Number');
//     return;
//   }
//   if (this.DeviceDetails.Acknowledgment === '' ||  this.DeviceDetails.Acknowledgment === null ||    this.DeviceDetails.Acknowledgment === undefined) {
//     this.toast.warning('Please Enter Acknowledgment Number');
//     return;
//   }
//   if (this.DeviceDetails.componentname === '' ||  this.DeviceDetails.componentname === null ||    this.DeviceDetails.componentname === undefined) {
//     this.toast.warning('Please Enter Component Name');
//     return;
//   }
//   if (this.DeviceDetails.modeldetails === '' ||  this.DeviceDetails.modeldetails === null ||    this.DeviceDetails.modeldetails === undefined) {
//     this.toast.warning('Please Enter Model Details');
//     return;
//   }
//   debugger;
//   if (this.DeviceDetails.DeviceImage === '' ||  this.DeviceDetails.DeviceImage === null ||    this.DeviceDetails.DeviceImage === undefined) {
//     this.toast.warning('Please Select Image JPG Only');
//     return;

//   }

//   if (this.DeviceDetails.invoicepdf === '' ||  this.DeviceDetails.invoicepdf === null ||    this.DeviceDetails.invoicepdf === undefined) {
//     this.toast.warning('Please Select Invoice Pdf Only');
//     return;

//   }

//   if (this.DeviceDetails.challanpdf === '' ||  this.DeviceDetails.challanpdf === null ||    this.DeviceDetails.challanpdf === undefined) {
//     this.toast.warning('Please Select Challan Pdf Only');
//     return;

//   }
//   if (this.DeviceDetails.ServicenodeviceImage === '' ||  this.DeviceDetails.ServicenodeviceImage === null ||    this.DeviceDetails.ServicenodeviceImage === undefined) {
//     this.toast.warning('Please Select Serial Number Image');
//     return;

//   } 

//   if (this.DeviceDetails.DeliveryNoteDate === '' ||  this.DeviceDetails.DeliveryNoteDate === null ||    this.DeviceDetails.DeliveryNoteDate === undefined ||    this.DeviceDetails.DeliveryNoteDate === 'Invalid date') {
//     this.toast.warning('Please Select Deliverty Note Date');
//     return;

//   }
//   if (this.DeviceDetails.TaxinvoiceNumber === '' ||  this.DeviceDetails.TaxinvoiceNumber === null ||    this.DeviceDetails.TaxinvoiceNumber === undefined) {
//     this.toast.warning('Please Enter Tax Invoice Number');
//     return;

//   }

//   this.SubmitCalibDetails();
//   }

 

// debugger; 

// if(this.DeviceDetails.deviceId == "111"){
//   this.installDateinternet = this.DeviceDetails.installDate;
//   this.SubmitCalibDetails();
// }
// else{
//   this.installDateinternet = "";
//   this.SubmitCalibDetails();
// }

   

// // const req={
// //   type:"2",
// //   affiliated_dccb_branch:this.DeviceDetails.deviceId,	     
// //   district_name:this.DeviceDetails.Device_name,	 
// //   mandal_name:this.DeviceDetails.inspectionDate,	 
// //   name:this.DeviceDetails.SerialNo,	 
// //   input1:this.DeviceDetails.DeviceImage,	         
// //   registration_number:this.session.userName,	 
// //   dist_code:this.DeviceDetails.PACS_CODE,     
// //   mobile_no:this.session.role,         
// //   uid_num:this.session.uniqueId,	
// //   mail_id:this.DeviceDetails.Acknowledgment,
// //   name_of_the_dccb:this.DeviceDetails.componentname,     
// //   pacs_name:this.DeviceDetails.modeldetails,
// //   input2:this.DeviceDetails.invoicepdf,
// //   input3:this.DeviceDetails.challanpdf,
// //   input4:this.DeviceDetails.internetprovname,
// //   input5:this.DeviceDetails.internetSpeed,
// //   input6:this.installDateinternet,
// //   input7:this.DeviceDetails.vendorcharges,
// //   input8:this.DeviceDetails.ServicenodeviceImage,
// //   input9:this.DeviceDetails.DeliveryNoteDate,
// //   input10:this.DeviceDetails.TaxinvoiceNumber
      
// //     }
   
// //       this.spinner.show();
// //       const response = await this.ceoAPI.CeoDeviceSubDetails(req);
// //      // const response = await this.ceoAPI.calibrationDeviceDetails(req);
// //       debugger;
// //       if (response.success) {
// //   //       this.DeviceDetails={
// //   // //         Districtcode:'',
// //   // // Mandalcode:'',
// //   //         deviceId:'',
// //   //         Device_name:'',
// //   //         SerialNo:'',
// //   //         Acknowledgment:'',
// //   //         inspectionDate:'',
// //   //         DeviceImage:'',
// //   //         componentname:'',
// //   //         modeldetails:'',
// //   //         invoicepdf:'',
// //   //         challanpdf:'',

// //   //         installDate:'',
// //   //   internetprovname:'',
// //   //   internetSpeed:'',
// //   //   vendorcharges:'',
// //   //   ServicenodeviceImage:'',
// //   //   //PACS_CODE:'',
// //   //   PACS_NAME:'',
// //   //   DeliveryNoteDate:'',
// //   //   TaxinvoiceNumber:''
           
// //   //       } 
// //   this.DeviceDetails.deviceId='';
// // this.DeviceDetails.Device_name='';
// // this.DeviceDetails.SerialNo='';
// // this.DeviceDetails.Acknowledgment='';
// // this.DeviceDetails.inspectionDate='';
// // this.DeviceDetails.DeviceImage='';
// // this.DeviceDetails.componentname='';
// // this.DeviceDetails.modeldetails='';
// // this.DeviceDetails.invoicepdf='';
// // this.DeviceDetails.challanpdf='';
// // this.DeviceDetails.installDate='';
// // this.DeviceDetails.internetprovname='';
// // this.DeviceDetails.internetSpeed='';
// // this.DeviceDetails.vendorcharges='';
// // this.DeviceDetails.ServicenodeviceImage='';
// // this.DeviceDetails.DeliveryNoteDate='';
// // this.DeviceDetails.TaxinvoiceNumber=''; 
// // this.DeviceDetails.IsinternetConnection='';
// //         this.inspectionDate='';
// //         this.DeliveryNoteDate='';
// //        $("#giftAndDeedPhotoUpload").val('');
// //        $("#servicePhotoUpload").val('');
// //         alert("Device Details Submitted Successfully");
// //        // this.DeviceDetailslist();
// //        this.loadDeviceDetails(this.DeviceDetails.PACS_CODE);
// //         this.DeviceDetailslistView(this.DeviceDetails.PACS_CODE);
// //         // this.DeviceDetails.PACS_CODE=this.DeviceDetails.PACS_CODE;
       
// //       } else { 
// //         this.toast.info(response.message);
// //       }
// //       this.spinner.hide();
// //    // }
//   } 
//   catch (error) {
//     this.spinner.hide();
//     this.utils.catchResponse(error);
//   }



    

 
//   }


  async SubmitWithInternetCalibDetails():Promise<void>{
    try {

      const req={
          type:"2",
          affiliated_dccb_branch:this.DeviceDetails.deviceId,	     
          district_name:this.DeviceDetails.Device_name,	 
          mandal_name:this.DeviceDetails.inspectionDate,	 
          name:this.DeviceDetails.SerialNo,	 
          input1:this.DeviceDetails.DeviceImage,	         
          registration_number:this.session.userName,	 
          dist_code:this.DeviceDetails.PACS_CODE,     
          mobile_no:this.session.role,         
          uid_num:this.session.uniqueId,	
          mail_id:this.DeviceDetails.Acknowledgment,
          name_of_the_dccb:this.DeviceDetails.componentname,     
          pacs_name:this.DeviceDetails.modeldetails,
          input2:this.DeviceDetails.invoicepdf,
          input3:this.DeviceDetails.challanpdf,
          input4:this.DeviceDetails.internetprovname,
          input5:this.DeviceDetails.internetSpeed,
          input6:this.installDateinternet,
          input7:this.DeviceDetails.vendorcharges,
          input8:this.DeviceDetails.ServicenodeviceImage,
          input9:this.DeviceDetails.DeliveryNoteDate,
          input10:this.DeviceDetails.TaxinvoiceNumber 
            }
           
              this.spinner.show();
              const response = await this.ceoAPI.CeoDeviceSubDetails(req); 
              debugger;
              if (response.success) { 
          this.DeviceDetails.deviceId='';
        this.DeviceDetails.Device_name='';
        this.DeviceDetails.SerialNo='';
        this.DeviceDetails.Acknowledgment='';
        this.DeviceDetails.inspectionDate='';
        this.DeviceDetails.DeviceImage='';
        this.DeviceDetails.componentname='';
        this.DeviceDetails.modeldetails='';
        this.DeviceDetails.invoicepdf='';
        this.DeviceDetails.challanpdf='';
        this.DeviceDetails.installDate='';
        this.DeviceDetails.internetprovname='';
        this.DeviceDetails.internetSpeed='';
        this.DeviceDetails.vendorcharges='';
        this.DeviceDetails.ServicenodeviceImage='';
        this.DeviceDetails.DeliveryNoteDate='';
        this.DeviceDetails.TaxinvoiceNumber=''; 
        this.DeviceDetails.IsinternetConnection='';
                this.inspectionDate='';
                this.DeliveryNoteDate='';
               $("#giftAndDeedPhotoUpload").val('');
               $("#servicePhotoUpload").val('');
                alert("Device Details Submitted Successfully");
               // this.DeviceDetailslist();
               this.loadDeviceDetails(this.DeviceDetails.PACS_CODE);
                this.DeviceDetailslistView(this.DeviceDetails.PACS_CODE);
                // this.DeviceDetails.PACS_CODE=this.DeviceDetails.PACS_CODE;
               
              } else { 
                this.toast.info(response.message);
              }
              this.spinner.hide();
             } 
           catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
          }
  }

  async SubmitWithoutInternetCalibDetails():Promise<void>{
    try { 
      const req={
          type:"2",
          affiliated_dccb_branch:this.DeviceDetails.deviceId,	     
          district_name:this.DeviceDetails.Device_name,	 
          mandal_name:"",	 
          name:"",	 
          input1:"",	         
          registration_number:this.session.userName,	 
          dist_code:this.DeviceDetails.PACS_CODE,     
          mobile_no:this.session.role,         
          uid_num:this.session.uniqueId,	
          mail_id:"",
          name_of_the_dccb:"",     
          pacs_name:"",
          input2:"",
          input3:"",
          input4:"",
          input5:"",
          input6:"",
          input7:"",
          input8:"",
          input9:"",
          input10:"" 
            } 
              this.spinner.show();
              const response = await this.ceoAPI.CeoDeviceSubDetails(req); 
              debugger;
              if (response.success) { 
          this.DeviceDetails.deviceId='';
        this.DeviceDetails.Device_name='';
        this.DeviceDetails.SerialNo='';
        this.DeviceDetails.Acknowledgment='';
        this.DeviceDetails.inspectionDate='';
        this.DeviceDetails.DeviceImage='';
        this.DeviceDetails.componentname='';
        this.DeviceDetails.modeldetails='';
        this.DeviceDetails.invoicepdf='';
        this.DeviceDetails.challanpdf='';
        this.DeviceDetails.installDate='';
        this.DeviceDetails.internetprovname='';
        this.DeviceDetails.internetSpeed='';
        this.DeviceDetails.vendorcharges='';
        this.DeviceDetails.ServicenodeviceImage='';
        this.DeviceDetails.DeliveryNoteDate='';
        this.DeviceDetails.TaxinvoiceNumber=''; 
        this.DeviceDetails.IsinternetConnection='';
                this.inspectionDate='';
                this.DeliveryNoteDate='';
               $("#giftAndDeedPhotoUpload").val('');
               $("#servicePhotoUpload").val('');
                alert("Device Details Submitted Successfully");
               // this.DeviceDetailslist();
               this.loadDeviceDetails(this.DeviceDetails.PACS_CODE);
                this.DeviceDetailslistView(this.DeviceDetails.PACS_CODE);
                // this.DeviceDetails.PACS_CODE=this.DeviceDetails.PACS_CODE;
               
              } else { 
                this.toast.info(response.message);
              }
              this.spinner.hide();
             } 
           catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
          }
  }


async btnCalibration():Promise<void>{ 
  try { 
    this.validate(); 
  } catch (error) {
        this.spinner.hide();
        this.utils.catchResponse(error);
      }
  }


  validate(): boolean {

    if (this.utils.isEmpty(this.DeviceDetails.Districtcode)) {
      this.toast.warning('Please Select District');
      return false;
    }
    if (this.utils.isEmpty(this.DeviceDetails.Mandalcode)) {
      this.toast.warning('Please Select Mandal');
      return false;
    }
    if (this.utils.isEmpty(this.DeviceDetails.PACS_CODE)) {
      this.toast.warning('Please Select PACS');
      return false;
    }
    if (this.utils.isEmpty(this.DeviceDetails.deviceId)) {
      this.toast.warning('Please Select Device');
      return false;
    }
    debugger;
    
    if( this.DeviceDetails.deviceId == "111"){

      if (this.utils.isEmpty(this.DeviceDetails.IsinternetConnection)) {
        this.toast.warning('Please Select is Internet Connectivity Provided by the Vendor');
        return false;
      }

      if(this.DeviceDetails.IsinternetConnection == "2"){ 
        this.SubmitWithoutInternetCalibDetails();
        return true;
      }
      else{

        this.DeviceDetails.inspectionDate=moment(this.inspectionDate, 'DD-MM-YYYY').format('DD-MM-YYYY');
        this.DeviceDetails.installDate=moment(this.installDate, 'DD-MM-YYYY').format('DD-MM-YYYY');
        this.DeviceDetails.DeliveryNoteDate=moment(this.DeliveryNoteDate, 'DD-MM-YYYY').format('DD-MM-YYYY');


        if (this.utils.isEmpty( this.DeviceDetails.inspectionDate) || this.DeviceDetails.inspectionDate =="Invalid date") {
          this.toast.warning('Please Select Received Date');
          return false;
        }
        if (this.utils.isEmpty( this.DeviceDetails.SerialNo)) {
          this.toast.warning('Please Enter Serial Number');
          return false;
        }
        if (this.utils.isEmpty( this.DeviceDetails.Acknowledgment)) {
          this.toast.warning('Please Enter Delivery Note Number');
          return false;
        }
        if (this.utils.isEmpty( this.DeviceDetails.componentname)) {
          this.toast.warning('Please Enter Maker Name');
          return false;
        }
        if (this.utils.isEmpty(this.DeviceDetails.modeldetails)) {
          this.toast.warning('Please Enter Model Details');
          return false;
        }
        if (this.utils.isEmpty(this.DeviceDetails.internetprovname)) {
          this.toast.warning('Please Enter Internet Service Provider Name');
          return false;
        }
        if (this.utils.isEmpty(this.DeviceDetails.internetSpeed)) {
          this.toast.warning('Please Enter Internet Speed');
          return false;
        }
        if (this.utils.isEmpty(this.DeviceDetails.installDate) || this.DeviceDetails.installDate =="Invalid date" ) {
          this.toast.warning('Please Select Date Of Installation');
          return false;
        }
        if (this.utils.isEmpty(this.DeviceDetails.vendorcharges)) {
          this.toast.warning('Please Select whether the first months charges have been paid by the vendor');
          return false;
        }
        if (this.utils.isEmpty(this.DeviceDetails.DeviceImage)) {
          this.toast.warning('Please Upload Device Image');
          return false;
        }
        if (this.utils.isEmpty(this.DeviceDetails.ServicenodeviceImage)) {
          this.toast.warning('Please Upload Serial Number Image');
          return false;
        }
        if (this.utils.isEmpty(this.DeviceDetails.invoicepdf)) {
          this.toast.warning('Please Upload Tax Invoice PDF');
          return false;
        }
        if (this.utils.isEmpty(this.DeviceDetails.challanpdf)) {
          this.toast.warning('Please Upload Delivery Challan PDF');
          return false;
        }
        if (this.utils.isEmpty(this.DeviceDetails.DeliveryNoteDate) || this.DeviceDetails.DeliveryNoteDate =="Invalid date") {
          this.toast.warning('Please Select Delivery Note Date');
          return false;
        }
        if (this.utils.isEmpty(this.DeviceDetails.TaxinvoiceNumber)) {
          this.toast.warning('Please Enter Tax Invoice Number');
          return false;
        } 

        this.SubmitWithInternetCalibDetails();
        return true;

      }
       
    }

    else{

      this.DeviceDetails.inspectionDate=moment(this.inspectionDate, 'DD-MM-YYYY').format('DD-MM-YYYY');
      this.DeviceDetails.installDate=moment(this.installDate, 'DD-MM-YYYY').format('DD-MM-YYYY');
      this.DeviceDetails.DeliveryNoteDate=moment(this.DeliveryNoteDate, 'DD-MM-YYYY').format('DD-MM-YYYY');
    debugger;

      if (this.utils.isEmpty( this.DeviceDetails.inspectionDate) || this.DeviceDetails.inspectionDate =="Invalid date") {
        this.toast.warning('Please Select Received Date');
        return false;
      }
      if (this.utils.isEmpty( this.DeviceDetails.SerialNo)) {
        this.toast.warning('Please Enter Serial Number');
        return false;
      }
      if (this.utils.isEmpty( this.DeviceDetails.Acknowledgment)) {
        this.toast.warning('Please Enter Delivery Note Number');
        return false;
      }
      if (this.utils.isEmpty( this.DeviceDetails.componentname)) {
        this.toast.warning('Please Enter Maker Name');
        return false;
      }
      if (this.utils.isEmpty(this.DeviceDetails.modeldetails)) {
        this.toast.warning('Please Enter Model Details');
        return false;
      }
      // if (this.utils.isEmpty(this.DeviceDetails.internetprovname)) {
      //   this.toast.warning('Please Enter Internet Service Provider Name');
      //   return false;
      // }
      // if (this.utils.isEmpty(this.DeviceDetails.internetSpeed)) {
      //   this.toast.warning('Please Enter Internet Speed');
      //   return false;
      // }
      // if (this.utils.isEmpty(this.DeviceDetails.installDate)) {
      //   this.toast.warning('Please Enter Date Of Installation');
      //   return false;
      // }
      // if (this.utils.isEmpty(this.DeviceDetails.vendorcharges)) {
      //   this.toast.warning('Please Select whether the first months charges have been paid by the vendor');
      //   return false;
      // }
      if (this.utils.isEmpty(this.DeviceDetails.DeviceImage)) {
        this.toast.warning('Please Upload Device Image');
        return false;
      }
      if (this.utils.isEmpty(this.DeviceDetails.ServicenodeviceImage)) {
        this.toast.warning('Please Upload Serial Number Image');
        return false;
      }
      if (this.utils.isEmpty(this.DeviceDetails.invoicepdf)) {
        this.toast.warning('Please Upload Tax Invoice PDF');
        return false;
      }
      if (this.utils.isEmpty(this.DeviceDetails.challanpdf)) {
        this.toast.warning('Please Upload Delivery Challan PDF');
        return false;
      }
      if (this.utils.isEmpty(this.DeviceDetails.DeliveryNoteDate) || this.DeviceDetails.DeliveryNoteDate =="Invalid date") {
        this.toast.warning('Please Select Delivery Note Date');
        return false;
      }
      if (this.utils.isEmpty(this.DeviceDetails.TaxinvoiceNumber)) {
        this.toast.warning('Please Enter Tax Invoice Number');
        return false;
      } 

      this.SubmitWithInternetCalibDetails();
      return true;

    }  
  }



  async onTitledevicePhotoChange_old(event: any): Promise<void> {
    try {
     
      if (event.target.files.length > 0) {
        const response: any = await this.utils.fileUploadEncodedString(
          event,
          this.utils.fileSize.threeMB
        );
        if (response) 
        {
          
          let file = (
            this.sanitizer.bypassSecurityTrustResourceUrl(response) as any
          ).changingThisBreaksApplicationSecurity;
          file = file.replace('data:image/jpeg;base64,', '');       
  
          this.DeviceDetails.DeviceImage = file;
          console.log(this.DeviceDetails.DeviceImage);
           
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




  async onTitledevicePhotoChange(event: any): Promise<void> {
    try {
      this.DeviceDetails.DeviceImage = '';
      if (event.target.files.length > 0) {
        if (event.target.files[0].type === 'image/jpeg') {
       
        const response: any = await this.utils.fileUploadEncodedString(
          event,
          this.utils.fileSize.twoHundredFiftyKB
        );
        if (response) {
          let file = (
            this.sanitizer.bypassSecurityTrustResourceUrl(response) as any
          ).changingThisBreaksApplicationSecurity;
          file = file.replace('data:image/jpeg;base64,', '');
          this.DeviceDetails.DeviceImage= file;

        } else {
      
          event.target.value = '';
          this.DeviceDetails.DeviceImage='';
        }
      }
      else{
        alert('Accept Only Jpg files Only..');
        event.target.value = '';
        this.DeviceDetails.DeviceImage='';
      }
      } else {
        this.ngxToaster.warning('file is Empty !!!, Please try again.');
        event.target.value = '';
        this.DeviceDetails.DeviceImage='';
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  async onTitleServicenodevicePhotoChange(event: any): Promise<void> {
    try {   debugger;
      this.DeviceDetails.ServicenodeviceImage = '';
      if (event.target.files.length > 0) {
        if (event.target.files[0].type === 'image/jpeg' || event.target.files[0].type === 'image/JPG') {
       
        const response: any = await this.utils.fileUploadEncodedString(
          event,
          this.utils.fileSize.twoHundredFiftyKB
        );
        if (response) {
          let file = (
            this.sanitizer.bypassSecurityTrustResourceUrl(response) as any
          ).changingThisBreaksApplicationSecurity;
          file = file.replace('data:image/jpeg;base64,', '');
          this.DeviceDetails.ServicenodeviceImage= file;

        } else {
      
          event.target.value = '';
          this.DeviceDetails.ServicenodeviceImage='';
        }
      }
      else{
        alert('Accept Only Jpg files Only..');
        event.target.value = '';
        this.DeviceDetails.DeviceImage='';
      }
      } else {
        this.ngxToaster.warning('file is Empty !!!, Please try again.');
        event.target.value = '';
        this.DeviceDetails.DeviceImage='';
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  async onTitleServicenoPhotoChangeEdit(event: any): Promise<void> {
    try {
      this.EditDeviceDetails.ServicenodeviceImage = '';
      if (event.target.files.length > 0) {
        if (event.target.files[0].type === 'image/jpeg') {
       
        const response: any = await this.utils.fileUploadEncodedString(
          event,
          this.utils.fileSize.twoHundredFiftyKB
        );
        if (response) {
          let file = (
            this.sanitizer.bypassSecurityTrustResourceUrl(response) as any
          ).changingThisBreaksApplicationSecurity;
          file = file.replace('data:image/jpeg;base64,', '');
          this.EditDeviceDetails.ServicenodeviceImage= file;

        } else {
      
          event.target.value = '';
          this.EditDeviceDetails.ServicenodeviceImage='';
        }
      }
      else{
        alert('Accept Only Jpg files Only..');
        event.target.value = '';
        this.DeviceDetails.DeviceImage='';
      }
      } else {
        this.ngxToaster.warning('file is Empty !!!, Please try again.');
        event.target.value = '';
        this.DeviceDetails.DeviceImage='';
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  async onpdffileChangeinvoice(event: any): Promise<void> {
    try {  debugger;
      this.invoicepdf="";
      if (event.target.files.length > 0) {
  
        if (event.target.files[0].type === 'application/pdf') {
        const response: any = await this.utils.fileUploadEncodedString(
          event,
          this.utils.fileSize.threeMB
        );
        if (response) {
          
          let file = (
            this.sanitizer.bypassSecurityTrustResourceUrl(response) as any
          ).changingThisBreaksApplicationSecurity;
          file = file.replace('data:application/pdf;base64,', '');
          debugger;
          this.DeviceDetails.invoicepdf= file;
        } else {
          this.ngxToaster.warning('file is Empty !!!, Please try again.');        
          event.target.value = '';
        }
      }
      else{
        alert('Accept Only Pdf files Only..');
        this.DeviceDetails.invoicepdf="";
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


  async onTitledevicePhotoChangeEdit(event: any): Promise<void> {
    try {

      this.EditDeviceDetails.Update_DeviceImage = '';
      if (event.target.files.length > 0) {
        if (event.target.files[0].type === 'image/jpeg') {
       
        const response: any = await this.utils.fileUploadEncodedString(
          event,
          this.utils.fileSize.twoHundredFiftyKB
        );
        if (response) {
          let file = (
            this.sanitizer.bypassSecurityTrustResourceUrl(response) as any
          ).changingThisBreaksApplicationSecurity;
          file = file.replace('data:image/jpeg;base64,', '');
          this.EditDeviceDetails.Update_DeviceImage= file;

        } else {
      
          event.target.value = '';
          this.EditDeviceDetails.Update_DeviceImage='';
        }
      }
      else{
        alert('Accept Only Jpg files Only..');
        event.target.value = '';
        this.DeviceDetails.DeviceImage='';
      }
      } else {
        this.ngxToaster.warning('file is Empty !!!, Please try again.');
        event.target.value = '';
        this.DeviceDetails.DeviceImage='';
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }


  async onpdffileChangeChallan(event: any): Promise<void> {
    try {  debugger;
      this.challanpdf="";
      if (event.target.files.length > 0) {
  
        if (event.target.files[0].type === 'application/pdf') {
        const response: any = await this.utils.fileUploadEncodedString(
          event,
          this.utils.fileSize.threeMB
        );
        if (response) {
          
          let file = (
            this.sanitizer.bypassSecurityTrustResourceUrl(response) as any
          ).changingThisBreaksApplicationSecurity;
          file = file.replace('data:application/pdf;base64,', '');
          debugger;
          this.DeviceDetails.challanpdf= file;
        } else {
          this.ngxToaster.warning('file is Empty !!!, Please try again.');
          this.DeviceDetails.challanpdf="";
          event.target.value = '';
        }
      }
      else{
        alert('Accept Only Pdf files Only..');
        this.challanpdf="";
        event.target.value = '';
      }
      } else {
        this.ngxToaster.warning('file is Empty !!!, Please try again.');
        this.challanpdf="";
        event.target.value = '';
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  } 
  
  async onpdffiletaxinvoiceChangeEdit(event: any): Promise<void> {
    try {  debugger;
      this.update_invoicepdf="";
      if (event.target.files.length > 0) {
  
        if (event.target.files[0].type === 'application/pdf') {
        const response: any = await this.utils.fileUploadEncodedString(
          event,
          this.utils.fileSize.threeMB
        );
        if (response) {
          
          let file = (
            this.sanitizer.bypassSecurityTrustResourceUrl(response) as any
          ).changingThisBreaksApplicationSecurity;
          file = file.replace('data:application/pdf;base64,', '');
          debugger;
          this.EditDeviceDetails.update_invoicepdf= file;
        } else {
          this.ngxToaster.warning('file is Empty !!!, Please try again.');
          this.EditDeviceDetails.update_invoicepdf="";
          event.target.value = '';
        }
      }
      else{
        alert('Accept Only Pdf files Only..');
        this.challanpdf="";
        event.target.value = '';
      }
      } else {
        this.ngxToaster.warning('file is Empty !!!, Please try again.');
        this.challanpdf="";
        event.target.value = '';
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  } 

  async onpdffiledeliverychallanChangeEdit(event: any): Promise<void> {
    try { 

      this.update_challanpdf="";
      if (event.target.files.length > 0) {
  
        if (event.target.files[0].type === 'application/pdf') {
        const response: any = await this.utils.fileUploadEncodedString(
          event,
          this.utils.fileSize.threeMB
        );
        if (response) {
          
          let file = (
            this.sanitizer.bypassSecurityTrustResourceUrl(response) as any
          ).changingThisBreaksApplicationSecurity;
          file = file.replace('data:application/pdf;base64,', '');
          debugger;
          this.EditDeviceDetails.update_challanpdf= file;
        } else {
          this.ngxToaster.warning('file is Empty !!!, Please try again.');        
          event.target.value = '';
        }
      }
      else{
        alert('Accept Only Pdf files Only..');
        this.EditDeviceDetails.update_challanpdf="";
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
  




  async btnViewEdit(obj:any):Promise<void>
  {
    debugger;
    this.EditDeviceDetails.deviceId=obj.DEVICE_ID;
    this.EditDeviceDetails.Device_name=obj.DEVICE_NAME;
    this.Edit_inspectionDate=obj.RECEIVED_DATE;
    this.EditDeviceDetails.SerialNo=obj.SERIAL_NUMBER;
    this.EditDeviceDetails.Acknowledgment=obj.ACK_NO;
    this.EditDeviceDetails.componentname=obj.COMPONENT_NAME;
    this.EditDeviceDetails.modeldetails=obj.MODEL_DETAILS;
    this.EditDeviceDetails.DeviceImage=obj.DEVICE_IMAGE;
    this.EditDeviceDetails.invoicepdf=obj.TAX_INVOICE;
    this.EditDeviceDetails.challanpdf=obj.DELIVERY_CHALLAN;
    this.EditDeviceDetails.internetprovname=obj.INTERNET_SERVICE_PROVIDER_NAME;
    this.EditDeviceDetails.internetSpeed=obj.INTERNET_SPEED;
    this.installDate=obj.DATE_OF_INSTALLATION;
    this.EditDeviceDetails.vendorcharges=obj.PAIDBYTHE_VENDOR;
    this.EditDeviceDetails.Packname=obj.PACS_NAME;
    this.EditDeviceDetails.PackId=obj.PACS_CODE;

    this.EditDeviceDetails.old_ServicenodeviceImage=obj.SLNO_IMAGE,
    this.Edit_DeliveryNote_date=obj.DELIVERYNOTDT,
    this.EditDeviceDetails.TaxinvoiceNumber=obj.TAXINVOICENUMBER,
    this.DeviceReceivedPopUp = true;

    if(obj.DEVICE_ID === 111){
      this.internetcntvty = true;
    }
    else{
      this.internetcntvty = false;
    }

  }

  async btnupdate():Promise<void>{
    
    if(this.EditDeviceDetails.deviceId!="111")
      {
    
    if (    this.Edit_inspectionDate === '' ||  this.Edit_inspectionDate === null ||    this.Edit_inspectionDate === undefined ||
      this.Edit_inspectionDate === 'Invalid date') {
      this.toast.warning('Please Select Received Date');
      return;
    } 
    if (    this.Edit_DeliveryNote_date === '' ||  this.Edit_DeliveryNote_date === null ||    this.Edit_DeliveryNote_date === undefined ||
      this.Edit_DeliveryNote_date === 'Invalid date') {
      this.toast.warning('Please Select Received Date');
      return;
    } 
    if (this.EditDeviceDetails.SerialNo === '' ||  this.EditDeviceDetails.SerialNo === null ||    this.EditDeviceDetails.SerialNo === undefined) {
      this.toast.warning('Please Enter Serial Number');
      return;
    }
    if (this.EditDeviceDetails.Acknowledgment === '' ||  this.EditDeviceDetails.Acknowledgment === null ||    this.EditDeviceDetails.Acknowledgment === undefined) {
      this.toast.warning('Please Enter Acknowledgment Number');
      return;
    }
    if (this.EditDeviceDetails.componentname === '' ||  this.EditDeviceDetails.componentname === null ||    this.EditDeviceDetails.componentname === undefined) {
      this.toast.warning('Please Enter Maker Name');
      return;
    }
    if (this.EditDeviceDetails.modeldetails === '' ||  this.EditDeviceDetails.modeldetails === null ||    this.EditDeviceDetails.modeldetails === undefined) {
      this.toast.warning('Please Enter Model Details');
      return;
    }
    if (this.EditDeviceDetails.TaxinvoiceNumber === '' ||  this.EditDeviceDetails.TaxinvoiceNumber === null ||    this.EditDeviceDetails.TaxinvoiceNumber === undefined) {
      this.toast.warning('Please Enter Tax Invoice Number');
      return;
    }

  }
    
    this.EditDeviceDetails.inspectionDate=moment(this.Edit_inspectionDate, 'DD-MM-YYYY').format('DD-MM-YYYY');
    this.EditDeviceDetails.installDate=moment(this.installDate , 'DD-MM-YYYY').format('DD-MM-YYYY');
    this.EditDeviceDetails.DeliveryNote_date=moment(this.Edit_DeliveryNote_date , 'DD-MM-YYYY').format('DD-MM-YYYY');
   
    if( this.EditDeviceDetails.inspectionDate=='Invalid date')
    {
      this.EditDeviceDetails.inspectionDate='';
    }
    if( this.EditDeviceDetails.installDate=='Invalid date')
    {
      this.EditDeviceDetails.installDate='';
    }
    if( this.EditDeviceDetails.DeliveryNote_date=='Invalid date')
    {
      this.EditDeviceDetails.DeliveryNote_date='';
    }
   debugger;
    // if(this.EditDeviceDetails.deviceId=="111")
    // {

    //   if (this.EditDeviceDetails.internetprovname === '' ||  this.EditDeviceDetails.internetprovname === null ||    this.EditDeviceDetails.internetprovname === undefined) {
    //     this.toast.warning('Please Enter Internet Service Provider Name');
    //     return;
    //   }
    //   if (this.EditDeviceDetails.internetSpeed === '' ||  this.EditDeviceDetails.internetSpeed === null ||    this.EditDeviceDetails.internetSpeed === undefined) {
    //     this.toast.warning('Please Enter Internet Speed');
    //     return;
    //   }
    //   if (this.EditDeviceDetails.installDate === '' ||  this.EditDeviceDetails.installDate === null ||    this.EditDeviceDetails.installDate === undefined) {
    //     this.toast.warning('Please Enter Date of Installation');
    //     return;
    //   }
    //   if (this.EditDeviceDetails.vendorcharges === '' ||  this.EditDeviceDetails.vendorcharges === null ||    this.EditDeviceDetails.vendorcharges === undefined) {
    //     this.toast.warning('Please Select Whether the first months charges Have Been Paid by the Vendor');
    //     return;
    
    //   }
    // }
     
    const req={
      type:"2",
      input4:this.EditDeviceDetails.deviceId,	     
      district_name:this.EditDeviceDetails.Device_name,	 
      mandal_name:this.EditDeviceDetails.inspectionDate,
      name:this.EditDeviceDetails.SerialNo,
      mail_id:this.EditDeviceDetails.Acknowledgment,
      name_of_the_dccb:this.EditDeviceDetails.componentname,
      input1:this.EditDeviceDetails.Update_DeviceImage,	
      input2:this.EditDeviceDetails.update_invoicepdf,
      input3:this.EditDeviceDetails.update_challanpdf,         
     // registration_number:this.session.userName,	 
     pacs_code:this.EditDeviceDetails.PackId,     
      //mobile_no:this.session.role,         
      //uid_num:this.session.uniqueId, 
       pacs_name:this.EditDeviceDetails.modeldetails,
      oldImage:this.EditDeviceDetails.DeviceImage,
      oldInvoice:this.EditDeviceDetails.invoicepdf,
      oldChalana:this.EditDeviceDetails.challanpdf,  
      
      
      input5:this.EditDeviceDetails.internetprovname,
      input6:this.EditDeviceDetails.internetSpeed,
      input7:this.EditDeviceDetails.installDate,
      input8:this.EditDeviceDetails.vendorcharges,
      input9:this.EditDeviceDetails.ServicenodeviceImage,
      input10:this.EditDeviceDetails.DeliveryNote_date,
      input11:this.EditDeviceDetails.TaxinvoiceNumber,

      input15:this.EditDeviceDetails.old_ServicenodeviceImage

        }
       
          this.spinner.show();
          const response = await this.ceoAPI.CeoDeviceSubDetailsEdit(req);
         // const response = await this.ceoAPI.calibrationDeviceDetails(req);
          debugger;
          if (response.success) {
            this.EditDeviceDetails={
              deviceId:'',
              Device_name:'',
              SerialNo:'',
              Acknowledgment:'',
              inspectionDate:'',
              DeviceImage:'',
              Update_DeviceImage:'',
              componentname:'',
              modeldetails:'',
              update_invoicepdf:'',
              invoicepdf:'',
              challanpdf:'',
              update_challanpdf:'',

              installDate:'',
              internetprovname:'',
              internetSpeed:'',
              vendorcharges:'',
              ServicenodeviceImage:'',
              old_ServicenodeviceImage:'',
              Packname:'',
              DeliveryNote_date:'',
              PackId:'',
              TaxinvoiceNumber:'',
            } 
            this.Edit_inspectionDate='';
            this.DeviceReceivedPopUp=false;
            this.DeviceDetailslistView(this.DeviceDetails.PACS_CODE);
           $("#giftAndDeedPhotoUpload").val('');
           $("#challanpdfupload").val('');
           $("#taxinvoiceUpload").val('');
            alert("Device Details Updated Successfully");
            //this.DeviceDetailslist();
           
           
          } else { 
            this.toast.info(response.message);
          }
          this.spinner.hide();
       // }

  }



  async btnPDFView(path: string): Promise<void> {
    try {
      debugger;
       await this.utils.viewJPVPDFcop(path);
       
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }



  async btnPDF(): Promise<void> {debugger;
    try {
      
      const req = { 
        pack_id:this.session.pacId
        //input2:this.year
      };
      debugger;
      const fileName = 'Calibration Details';
      let basePDF = '';
      this.spinner.show();
      
      const res = await this.ceoAPI.CalibrationDetails(req);
      if (res.success) {
        basePDF = res.result;
        this.utils.downloadPdfFile(basePDF, fileName);
      } else {
        this.toast.info(res.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  } 

  async loadDevDetails(): Promise<void> {debugger;
    try {
  
      const req = {
        type:48,
        cfmsid:this.DeviceDetails.deviceId, 
      }; 
      this.spinner.show(); 
      const res = await this.sharedAPI.Hrmsemp(req);
      if (res.success) {
        this.DeviceDetails.componentname = res.result[0].MAKER; 
        this.DeviceDetails.modeldetails = res.result[0].MODEL; 
      } else {
        this.toast.info(res.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  oninternetchange(){
    if(this.DeviceDetails.IsinternetConnection == "2"){
      this.showtext=true;
    }
    else   {
      this.showtext=false;
    }

      if(this.DeviceDetails.IsinternetConnection === "1"){
        this.internetdtsshow = true;
        this.internetdtsshow1 = true;
      }
      else{
        this.internetdtsshow = false;
        this.internetdtsshow1 = false;
      }
  }

  onDateChange(date: Date) {  debugger;
    if (this.isValidDate(date)) {
      console.log('Valid date:', date); // Check what date is being selected
      this.errorMessage = ''; // Clear error message if valid
    } else {
      this.toast.info("Invalid date selected!");
      return false;
    }
  
      // this.minDate=new Date(date);
  
      // if(date){
      //   this.hidedate = false;
      // }
      // else{
      //   this.hidedate=true;
      // }
  }

  
}
