import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router'; 
import * as moment from 'moment';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { NgxSpinnerService } from 'ngx-spinner';
import { JcService } from 'src/app/jcModule/services/jc.service';
import { ConsoleService } from 'src/app/sharedModule/services/console.service';
import { NgxToasterService } from 'src/app/sharedModule/services/ngx-toaster.service';
import { SessionService } from 'src/app/sharedModule/services/session.service';
import { SharedService } from 'src/app/sharedModule/services/shared.service';
import { ToasterService } from 'src/app/sharedModule/services/toaster.service';
import { UtilsService } from 'src/app/sharedModule/services/utils.service';
import { CeoService } from '../../services/ceo.service';
import { PacsLandAllotmentService } from 'src/app/reportsModule/pacsLandAllotment/services/pacs-land-allotment.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-calibration-cops-upd',
  templateUrl: './calibration-cops-upd.component.html',
  styleUrls: ['./calibration-cops-upd.component.css']
})
export class CalibrationCopsUpdComponent implements OnInit {

  bsDatepickerConfig: Partial<BsDatepickerConfig> = this.utils.getbsdatepicker();
  btnlandsub=true;   
minDate!: Date;
maxDate!: Date;  
btnclisub=true;
DeviceList: any[] = [];
calibrationList: any[] = []; 
pacslistData: any[] = []; 
DistrictlistData: any[] = [];
MandallistData: any[] = [];
DeviceReceiveList: any[] = [];
StatuscalibrationList: any[] = [];
Status=true;
CalibrationPopUp=false;
hideEdit=false;
finalsub=false;
btnclisubFinalsub = false;

calibrationDetails1={
  Districtcode:'',
  Mandalcode:'',
  devisioncode:'',
  deviceId:'',
  inspectionDate:'',
  MakerId:'',
  SerialNo:'',
  ManufactureDate:'',
  CoverId:'',
  UploadImage:'',
  pdffileUpd:'',
  PACS_CODE:'',

}
ManufactureDate:any;
DeviceText:any;
fileupdforpdf:any;
receiveddate:any;

inspectionDate:any  

calibrationdetails=true;
TableDetails=true;
CertificationStatus=false;
MessageStatus=false;
 


@ViewChild(DataTableDirective, { static: false })
dtElement!: DataTableDirective;

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
  private jcAPI: JcService,
  private sharedAPI: SharedService,
  private sanitizer: DomSanitizer,
  private ceoAPI: CeoService,
  private allotmentAPI: PacsLandAllotmentService,
  
) {
  this.maxDate = this.session.getTodayDate();
  this.minDate=new Date('20-01-2022');
  this.calibrationDetails1.deviceId;
  this.calibrationDetails1.CoverId;
}
EditInspection_date:any;
  EditinspectionDate:any; 
EditManufactureDate:any; 

EditcalibrationDetails={
  Devicename:'',
  Inspection_date:'',
  Maker:'',
  Serial_number:'',
  Manufacture_date:'',
  Is_cover_received:'',
  olddeviceimage:'',
  oldinstallationdoc:'',
  editdeviceimage:'',
  editinstallationdoc:'',
  DeviceId:'',
  pacId:'',

}
ngOnInit(): void {
 // this.loaddistricts();
//  this.btnPDF();
let dt = new Date();
  this.inspectionDate=this.session.getDateddmmyyyyString(dt);
this.loadDistrictDetails();
  //this.loadDeviceDetails(); 
 // this.loadCalibDetails();
 

}
errorMessage: string = '';
isValidDate(date: any): boolean {
  return date instanceof Date && !isNaN(date.getTime());
}
// Handle date changes here
onDateChange(date: Date) {
  if (this.isValidDate(date)) {
    console.log('Valid date:', date); // Check what date is being selected
    this.errorMessage = ''; // Clear error message if valid
  } else {
    this.errorMessage = 'Invalid date selected!';
    console.error('Invalid date selected:', date);
  }
}

deviceChange (obj:any) {   
  let objvalue= this.DeviceList.find(data=>data.DEVICE_ID==obj);
  debugger;
  this.calibrationDetails1.UploadImage=''; 
  this.calibrationDetails1.pdffileUpd=''; 
  this.DeviceText=objvalue.DEVICE_NAME;
  this.CalibDeviceDetails(obj);
}

async CalibDeviceDetails(obj:any): Promise<void> {  
  try {
    debugger;
   // this.DeviceReceiveList=[];
    const req = {
      type: '24',
      pacs_id:this.calibrationDetails1.PACS_CODE,
      input_01:obj
    };
    this.spinner.show();
    const response = await this.allotmentAPI.PacsCeoDetailsGet(req);
    if (response.success) {
      // this.DeviceReceiveList = response.result; 
      this.calibrationDetails1.MakerId=response.result[0]["COMPONENT_NAME"];
      this.calibrationDetails1.SerialNo=response.result[0]["SERIAL_NUMBER"];
      this.ManufactureDate=response.result[0]["RECEIVED_DATE"];
      this.loadCalibDetails();
      if(this.calibrationDetails1.deviceId=='111' && response.result[0].INTERNET_STATUS == "1" )
      {
        this.calibrationDetails1.MakerId= this.calibrationDetails1.MakerId;
        this.calibrationDetails1.SerialNo=this.calibrationDetails1.SerialNo;
        this.ManufactureDate=this.ManufactureDate;
      }
    } else { 
      this.calibrationDetails1.MakerId='';
        this.calibrationDetails1.SerialNo='';
        this.ManufactureDate='';
      
    }
    this.rerender();
    this.spinner.hide();
  } catch (error) {
    this.spinner.hide();
    this.utils.catchResponse(error);
  }
} 
PacsChange(obj:any){

  // this.DeviceDetailslistView(obj);
  // this.loadDeviceDetails(obj);

  this.EditStatus();
   this.loadDeviceDetails(obj); 
   this.loadCalibDetails();
   this.btnclisubFinalsub= false;
   this. StatusloadCalibDetails();
  
  
}

DistChange(obj:any)
{
this.loadMandalDetails(obj);
}
MandalChange(obj:any){
  this.loadpacksDetails(obj);
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
    this.MandallistData=[];
    const req = {
      type: '44',
      mobileno:this.session.uniqueId,
      cfmsid:obj 
      // mobileno:this.session.uniqueId,
      //   cfmsid:this.DeviceDetails.Districtcode  //pacId,
       
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
    this.pacslistData=[];
    const req = {
      type: '310',       
      mobileno:this.session.uniqueId,
        cfmsid:this.calibrationDetails1.Districtcode,
        alternativemobileno:obj
        
       
    }; debugger;
    this.spinner.show();
    const response = await this.sharedAPI.Hrmsemp(req);
    if (response.success) { 
             
    this.pacslistData=response.result;
    

    }  
    this.spinner.hide();
  } catch (error) {
    this.spinner.hide();
    this.utils.catchResponse(error);
  }
}


async TimeUpdate(deviceid:any,Pacsid:any): Promise<void> {
  try { debugger;
    this.pacslistData=[];
    const req = {
      type: '54',       
      empname:this.session.userName,
      office:deviceid,
      mobileno:Pacsid
      
    }; debugger;
    this.spinner.show();
    const response = await this.sharedAPI.Hrmsemp(req);
    if (response.success) { 
             
  //  this.pacslistData=response.result;
    

    }  
    this.spinner.hide();
  } catch (error) {
    this.spinner.hide();
    this.utils.catchResponse(error);
  }
}

//cALIBRATION Grid Table
async loadCalibDetails(): Promise<void> {   debugger;
  try {
    this.calibrationList=[];
    const req = {
      type: '180',
      pacs_id:this.calibrationDetails1.PACS_CODE,
    };
    this.spinner.show();
    const response = await this.allotmentAPI.PacsCeoDetailsGet(req);
    if (response.success) {
      this.calibrationList = response.result; 
debugger;
      if(response.result.length == '17'){

       if(response.result[0].TECH_STATUS=='1')
       {
        this.FinalStatus();
        this.btnclisubFinalsub=false;
       }
      

      
       
      } 
      
    } else {
      this.calibrationList = response.result;
      //this.toast.info(response.message);
    }

   
    this.rerender();
    this.spinner.hide();
  } catch (error) {
    this.spinner.hide();
    this.utils.catchResponse(error);
  }
} 

  async loadDeviceDetails(obj:any): Promise<void> {   debugger;
    try {
      debugger;
      const req = {
        type: '190',
        pacs_id:obj,
      };
      this.spinner.show();  
      const response = await this.allotmentAPI.PacsCeoDetailsGet(req);
      if (response.success) {debugger;
        this.btnclisub=true;
            if(response.result[0].DEVICESTATUS=='0' && response.result[0].CSTATUS=='0')      // DEVICES NOT SUBMITTING OR PENDING IN DEVICES         
                {  
                  this.CertificationStatus=false; 
                  this.MessageStatus=false;    
                  this.calibrationdetails=true;
                  this.DeviceList = response.result;  
                             
                }
                else if(response.result[0].REG_STATUS=='9')
                  {
                    this.CertificationStatus=true;this.MessageStatus=false;this.calibrationdetails=false;
                  }
            else if(response.result[0].CSTATUS=='2' && response.result[0].DEVICESTATUS=='3' && response.result[0].REG_STATUS!='9')     //ALL DEVICES  SUBMITTING IN CALIBRATION     
                 { this.CertificationStatus=true;this.MessageStatus=false;this.calibrationdetails=false;
                  this.StatusloadDeviceDetails();
                 }
               
                  else{
                    this.CertificationStatus=false; 
                  this.MessageStatus=false;    
                  this.calibrationdetails=true;
                  this.DeviceList = response.result; 
                  }
                
      } 
      else {debugger;this.btnclisub=false;
        this.CertificationStatus=false;
        this.calibrationdetails=true;
        this.DeviceList =[];
                  this.MessageStatus=false; 
        //this.toast.info(response.message)
      }
      this.spinner.hide();
      // this.loadCalibDetails();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }  


  async StatusloadDeviceDetails(): Promise<void> {   debugger;
    try {
      const req = {
        type: '21',
        input_01:'2',
        pacs_id:this.calibrationDetails1.PACS_CODE,
      };
      this.spinner.show();  
      const response = await this.allotmentAPI.PacsCeoDetailsGet(req);
      if (response.success) {debugger;

            if(response.result[0].PDF_STATUS == "0" )             
                {  
                 
                  this.CertificationStatus=true; 
                  this.MessageStatus=false;    
                  this.calibrationdetails=false;   
                }
                          else {
                            this.CertificationStatus=false;debugger;
                            this.MessageStatus=true;    
                            this.calibrationdetails=false;
              
                  
                }
                
      } 
      else {  
        //this.toast.info(response.message)
      }
      this.spinner.hide();
      // this.loadCalibDetails();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  } 
  
  mandate:any;
  async ReceivedDateGet(obj:any): Promise<void> {   debugger;
    try {
       
      this.mandate = obj;
      const date2=new Date(this.mandate); 
      const req = { 
        type: "22",
        input_01:this.calibrationDetails1.deviceId,
        pacs_id:this.calibrationDetails1.PACS_CODE
      }; debugger;
      this.spinner.show();
      const response = await this.allotmentAPI.PacsCeoDetailsGet(req);
      if (response.success) {
        this.calibrationList = response.result; 
        this.receiveddate = response.result[0].RECEIVED_DATE; 
         
  
        const date1=new Date(this.receiveddate);
         
          
          //const date1 = moment(dt1, 'DD-MM-YYYY').format('DD-MM-YYYY');
          //const date2 = moment(dt2, 'DD-MM-YYYY').format('DD-MM-YYYY'); 
          if(date1 > date2)
              this.toast.info("Please Select Less than Device Received Date");  
      } else {
        //this.toast.info(response.message);
      }
      this.rerender();
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }


  async ReceivedDateStatus(): Promise<void> {   debugger;
    try {
     
      
if(this.calibrationDetails1.deviceId=='111')
{

  
 
  this.SubmitDetails();
}
else{




      const req = { 
        type: "23",
        input_01:this.calibrationDetails1.deviceId,
        input_02:this.calibrationDetails1.ManufactureDate,
        pacs_id:this.calibrationDetails1.PACS_CODE
      }; debugger;
      this.spinner.show();
      const response = await this.allotmentAPI.PacsCeoDetailsGet(req);
      if (response.success) {
        if(response.result[0].STATUS=="1")
        this.SubmitDetails();
      
        else {

          this.toast.info("The Date of Manufacture should be Earlier than the Date of Received");
          //this.toast.info("Please Select "+response.result[0].RECEIVED_DATE+ " is earlier than the Manufacture Date");
          this.loadDeviceDetails(this.calibrationDetails1.PACS_CODE); 
          this.btnclisub=true;
        }
      } else{

      }
    } 
      
      this.rerender();
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }


async SubmitDetails():Promise<void>{
  try { 
    this.spinner.show();
    const req={

      type:"1",
      input_01:this.calibrationDetails1.deviceId,
      input_02:this.DeviceText,
      input_03:this.calibrationDetails1.inspectionDate,
      input_04:this.calibrationDetails1.SerialNo,
      input_05:this.calibrationDetails1.MakerId,
      input_06:this.calibrationDetails1.ManufactureDate,
      input_07:this.calibrationDetails1.CoverId,
      input_08:this.calibrationDetails1.UploadImage,
      input_09:this.calibrationDetails1.pdffileUpd,
      input_10:this.calibrationDetails1.PACS_CODE,
      inserted_by:this.session.userName,
      role:this.session.role,  
      unique_id:this.session.uniqueId,
    }
    this.spinner.show();
    const response = await this.ceoAPI.CalibrationDetailsIns(req);
    debugger;
    if (response.success) {
      this.loadDeviceDetails(this.calibrationDetails1.PACS_CODE);
      this.loadCalibDetails();
       
     this.ManufactureDate='';
        this.calibrationDetails1.deviceId='';
         
        this.calibrationDetails1.MakerId='';
        this.calibrationDetails1.SerialNo='';
        this.calibrationDetails1.ManufactureDate='';
        this.calibrationDetails1.CoverId='';
        $("#UploadImage").val('');
        $("#pdffileUpd").val('');
        
        
     

      alert(response.message);
       
       

    } else {
      this.toast.info(response.message);
    }
    this.spinner.hide();
  } catch (error) {
    this.spinner.hide();
    this.utils.catchResponse(error);
  } 
}

async btnCalibrationSub(): Promise<void> {
          debugger;
  try { 
    this.btnclisub=false;
     
     this.calibrationDetails1.inspectionDate=moment(this.inspectionDate, 'DD-MM-YYYY').format('DD-MM-YYYY');
    this.calibrationDetails1.ManufactureDate=moment(this.ManufactureDate, 'DD-MM-YYYY').format('DD-MM-YYYY');

   
      if (this.validate()) {

        this.ReceivedDateStatus();
          this.spinner.hide();
      }
      else{
        this.btnclisub=true;
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    } 
  } 

async FinalStatus():Promise<void>{

  try { 
    const req = {
      type:"13",
      input_09:this.session.uniqueId,
      input_01:this.session.userName,
      input_02:this.calibrationDetails1.PACS_CODE,           
      input_03:"1",           
    };
    this.spinner.show();
    debugger;
   // const response = await this.ceoAPI.CalibrationDetailsInsert(req);
    const response = await this.sharedAPI.TechManagerGet(req);
    if (response.success) {  
     // alert(response.message);
      
      this.finalsub=true;
    } else { 

    }
    this.spinner.hide();
  } catch (error) {
    this.spinner.hide();
    this.utils.catchResponse(error);
  }

}
 
validate(): boolean { debugger

  if (this.utils.isEmpty(this.calibrationDetails1.deviceId)) {
  this.toast.warning('PLEASE SELECT DEVICE');
  return false;
} 

if(this.calibrationDetails1.deviceId=='111')
{
  this.calibrationDetails1.inspectionDate='';
  this.calibrationDetails1.SerialNo='';
  this.calibrationDetails1.ManufactureDate='';
  return true;
}
else{
  
if (this.utils.isEmpty(this.calibrationDetails1.inspectionDate) || this.calibrationDetails1.inspectionDate ==="Invalid date") {
  this.toast.warning('PLEASE ENTER INSPECTION DATE');
  return false;
} 
if (this.utils.isEmpty(this.calibrationDetails1.MakerId)) {
  this.toast.warning('PLEASE ENTER '+this.DeviceText+' MAKER');
  return false;
} 
if (this.utils.isEmpty(this.calibrationDetails1.SerialNo)) {
  this.toast.warning('PLEASE ENTER '+this.DeviceText+' SERIAL NUMBER');
  return false;
} 
debugger;
if (this.utils.isEmpty(this.calibrationDetails1.ManufactureDate) || this.calibrationDetails1.ManufactureDate === "Invalid date") {
  this.toast.warning('PLEASE ENTER '+this.DeviceText+' MANUFACTURE DATE');
  return false;
} 
if (this.utils.isEmpty(this.calibrationDetails1.CoverId)) {
  this.toast.warning('PLEASE SELECT IS '+this.DeviceText+' COVER RECEIVED');
  return false;
} 
if (this.utils.isEmpty(this.calibrationDetails1.UploadImage)) {
  this.toast.warning('PLEASE UPLOAD '+this.DeviceText+' IMAGE');
  return false;
} 
if (this.utils.isEmpty(this.calibrationDetails1.pdffileUpd)) {
  this.toast.warning('PLEASE UPLOAD '+this.DeviceText+' INSTALLATION DOCUMENT');
  return false;
} 

if(this.calibrationDetails1.CoverId === '0'){
  this.toast.warning('PLEASE SELECT YES FOR IS '+this.DeviceText+' COVER RECEIVED');
  return false;
}
}
 
  return true;
  
} 
async btnPDF(): Promise<void> {debugger;
  try {
    
    const req = { 
      type:"2",
      pack_id:this.calibrationDetails1.PACS_CODE
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
     // this.toast.info(res.message);
     // this.toast.info('Site Preparation is Not Submitted');
    }
    this.spinner.hide();
  } catch (error) {
    this.spinner.hide();
    this.utils.catchResponse(error);
  }
}
CertifcateFile:any;



async OnlyJpegUpload(event: any,id:any): Promise<void> {
  try {

    this.calibrationDetails1.UploadImage='';  
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

        this.calibrationDetails1.UploadImage=file; 
      } else {
    
        event.target.value = '';
      }
    }
    else{
      alert('Accept Only Jpeg files Only..');
      this.calibrationDetails1.UploadImage="";
      event.target.value = '';
    }
    } else {
      this.ngxToaster.warning('file is Empty !!!, Please try again.');
      this.calibrationDetails1.UploadImage="";
      event.target.value = '';
    }
  } catch (error) {
    this.utils.catchResponse(error);
  }
}  

async EditOnlyJpegUpload(event: any): Promise<void> {
  try {   debugger;

    this.EditcalibrationDetails.editdeviceimage='';  
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

        this.EditcalibrationDetails.editdeviceimage=file; 
      } else {
    
        event.target.value = '';
      }
    }
    else{
      alert('Accept Only Jpeg files Only..');
      this.EditcalibrationDetails.editdeviceimage='';  
      event.target.value = '';
    }
    } else {
      this.ngxToaster.warning('file is Empty !!!, Please try again.');
      this.EditcalibrationDetails.editdeviceimage='';  
      event.target.value = '';
    }
  } catch (error) {
    this.utils.catchResponse(error);
  }
}  

async onpdffileChange(event: any): Promise<void> {
  try {  debugger;
    this.calibrationDetails1.pdffileUpd="";
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
        this.calibrationDetails1.pdffileUpd = file;
      } else {
        this.ngxToaster.warning('file is Empty !!!, Please try again.');
        this.calibrationDetails1.pdffileUpd="";
        event.target.value = '';
      }
    }
    else{
      alert('Accept Only Pdf files Only..');
      this.calibrationDetails1.pdffileUpd="";
      event.target.value = '';
    }
    } else {
      this.ngxToaster.warning('file is Empty !!!, Please try again.');
      this.calibrationDetails1.pdffileUpd="";
      event.target.value = '';
    }
  } catch (error) {
    this.utils.catchResponse(error);  
  }
} 

async onpdffiletaxinvoiceChangeEdit(event: any): Promise<void> {
  try {  debugger;
    this.EditcalibrationDetails.editinstallationdoc='';
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
        this.EditcalibrationDetails.editinstallationdoc = file;
      } else {
        this.ngxToaster.warning('file is Empty !!!, Please try again.');
        this.EditcalibrationDetails.editinstallationdoc='';
        event.target.value = '';
      }
    }
    else{
      alert('Accept Only Pdf files Only..');
      this.EditcalibrationDetails.editinstallationdoc='';
      event.target.value = '';
    }
    } else {
      this.ngxToaster.warning('file is Empty !!!, Please try again.');
      this.EditcalibrationDetails.editinstallationdoc='';
      event.target.value = '';
    }
  } catch (error) {
    this.utils.catchResponse(error);
  }
} 

async EditonpdffileChange(event: any): Promise<void> {
  try {  debugger;
    this.calibrationDetails1.pdffileUpd="";
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
        this.calibrationDetails1.pdffileUpd = file;
      } else {
        this.ngxToaster.warning('file is Empty !!!, Please try again.');
        this.calibrationDetails1.pdffileUpd="";
        event.target.value = '';
      }
    }
    else{
      alert('Accept Only Pdf files Only..');
      this.calibrationDetails1.pdffileUpd="";
      event.target.value = '';
    }
    } else {
      this.ngxToaster.warning('file is Empty !!!, Please try again.');
      this.calibrationDetails1.pdffileUpd="";
      event.target.value = '';
    }
  } catch (error) {
    this.utils.catchResponse(error);
  }
} 


async onpdffileChange1(event: any): Promise<void> {
  try {  debugger;
    this.fileupdforpdf="";
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
        this.fileupdforpdf= file;
      } else {
        this.ngxToaster.warning('file is Empty !!!, Please try again.');        
        event.target.value = '';
      }
    }
    else{
      alert('Accept Only Pdf files Only..');
      this.fileupdforpdf="";
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

 


async btnPhotoView(path: string): Promise<void> {
  try {
    debugger;
    await this.utils.viewJPVImagecop(path);
  } catch (error) {
    this.spinner.hide();
    this.utils.catchResponse(error);
  }
}

async btnPdfView(path: string): Promise<void> {
  try {
    debugger;
    await this.utils.viewJPVPDFcop(path);
  } catch (error) {
    this.spinner.hide();
    this.utils.catchResponse(error);
  }
}

ngOnDestroy(): void {
  // Do not forget to unsubscribe the event
  this.dtTrigger.unsubscribe();
}

ngAfterViewInit(): void {
  this.dtTrigger.next();
}

rerender(): void {
  this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
    dtInstance.clear().draw(); // Add this  line to clear all rows..
    // Destroy the table first
    dtInstance.destroy();
    // Call the dtTrigger to rerender again
    this.dtTrigger.next();
  });
}

async btnViewEdit1(obj:any):Promise<void>
{
  this.EditcalibrationDetails.editdeviceimage='';
  this.EditcalibrationDetails.editinstallationdoc=''; 
debugger;
  this.EditcalibrationDetails.DeviceId=obj.DEVICE_ID;
  this.EditcalibrationDetails.Devicename= obj.DEVICE_NAME;
  this.EditInspection_date= obj.INSPECTION_DATE;
  this.EditcalibrationDetails.Maker= obj.MAKER;
  this.EditcalibrationDetails.Serial_number= obj.SERIAL_NUMBER;
  this.EditManufactureDate= obj.MANUFACTURE_DATA;
  this.EditcalibrationDetails.Is_cover_received= obj.COVER_RECEIVED_STATUS;
  this.EditcalibrationDetails.olddeviceimage= obj.DEVICE_IMAGE_UPD;
  this.EditcalibrationDetails.oldinstallationdoc= obj.INSTALLATION_DOC;
  this.EditcalibrationDetails.pacId=obj.PACS_CODE;
this.CalibrationPopUp=true;
  

}

async btnupdate():Promise<void>{
  debugger
  const reqpackid={
    type:"11",
    input_01:this.EditcalibrationDetails.pacId,
    input_02:this.EditcalibrationDetails.DeviceId
  }
  const responsepackid = await this.ceoAPI.CalibrationDetailsIns(reqpackid);

 if (responsepackid.success) {
 
 }
else{

}
  this.EditcalibrationDetails.Inspection_date=moment(this.EditInspection_date, 'DD-MM-YYYY').format('DD-MM-YYYY');
  this.EditcalibrationDetails.Manufacture_date=moment(this.EditManufactureDate, 'DD-MM-YYYY').format('DD-MM-YYYY'); 

   if (this.EditcalibrationDetails.Inspection_date == "Invalid date") {
    this.EditcalibrationDetails.Inspection_date ="";
    } 
   if (this.EditcalibrationDetails.Manufacture_date == "Invalid date") {
      this.EditcalibrationDetails.Manufacture_date ="";
    } 

   
  const req={
    input_01:this.EditcalibrationDetails.Serial_number,
    input_02:this.EditcalibrationDetails.Maker,
    input_03:this.EditcalibrationDetails.Manufacture_date,
    input_04:this.EditcalibrationDetails.Is_cover_received,
    input_05:this.EditcalibrationDetails.pacId,
    input_06:this.EditcalibrationDetails.DeviceId,
    input_07:this.EditcalibrationDetails.Inspection_date,
    input_08:this.EditcalibrationDetails.editdeviceimage,
    input_09:this.EditcalibrationDetails.editinstallationdoc,
    input_14:this.EditcalibrationDetails.olddeviceimage,
    input_15:this.EditcalibrationDetails.oldinstallationdoc,



      }
     
        this.spinner.show();
        const response = await this.ceoAPI.CalibrationEdit(req);
       // const response = await this.ceoAPI.calibrationDeviceDetails(req);
        debugger;
        if (response.success) {
          
          // this.Edit_inspectionDate='';
          this.CalibrationPopUp=false;
         $("#giftAndDeedPhotoUpload").val('');
         $("#challanpdfupload").val('');
         $("#taxinvoiceUpload").val('');
          alert("Device Details Updated Successfully");
          this.TimeUpdate(this.EditcalibrationDetails.DeviceId,this.EditcalibrationDetails.pacId);
          this.loadCalibDetails();
         
        } else { 
          this.toast.info(response.message);
        }
        this.spinner.hide();
     // }

}

async EditStatus(): Promise<void> { 
  debugger;
  try {
   

      const req = {
        type: '51',
        cfmsid: this.calibrationDetails1.PACS_CODE,
        
      };
      this.spinner.show();
      debugger;
     const response = await this.sharedAPI.Hrmsemp(req);
      this.spinner.hide();
      if (response.success) {
       
        if(response.result[0].EDIT_STATUS == 1 ){
          this.hideEdit = true; 
        } 
        else  if(response.result[0].EDIT_STATUS == 0){
          this.hideEdit = false; 
        }
        else{
          this.hideEdit = true; 
        } 
      }
      else {
        this.toast.info(response.message);
      }
    }
  catch (error) {

    this.spinner.hide();
    this.utils.catchResponse(error);
  }
}

async calibbtnPDF(): Promise<void> {
  debugger;
  try {

    const req = {
      type: "22",
      pack_id:this.calibrationDetails1.PACS_CODE
      //input2:this.year
    };
    debugger;
    const fileName = 'Calibration Details';
    let basePDF = '';
    this.spinner.show();

    const res = await this.ceoAPI.DeviceVerificationCert(req);
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



async StatusloadCalibDetails(): Promise<void> {   debugger;
  try {
    this.StatuscalibrationList=[];
    const req = {
      type: '1800',
      pacs_id:this.calibrationDetails1.PACS_CODE,
    };
    this.spinner.show();
    const response = await this.allotmentAPI.PacsCeoDetailsGet(req);
    if (response.success) {
      this.StatuscalibrationList = response.result; 
debugger;
      if(response.result[0].CALIB_STATUS=='1'){
        this.finalsub=true;
        this.loadCalibDetails();
       
       
      } 
      else{
        this.loadCalibDetails();
        this.finalsub=false;
      }
      
    } else {
     // this.calibrationList = response.result;
      //this.toast.info(response.message);
    }
    this.rerender();
    this.spinner.hide();
  } catch (error) {
    this.spinner.hide();
    this.utils.catchResponse(error);
  }
}

}
