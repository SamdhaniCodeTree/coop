import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-calibration-inspection-dins',
  templateUrl: './calibration-inspection-dins.component.html',
  styleUrls: ['./calibration-inspection-dins.component.css']
})
export class CalibrationInspectionDInsComponent implements OnInit {

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
  districtId:any;
  DeviceList: any[] = [];
  DeviceDetailsList: any[] = [];
  manufacture_date :any;
  inspectionDate :any;
  ReceivedDate='';
  downloadCert=false;
 
  DeviceDetailsservice_id='';
  DeviceDetails={
    deviceId:'',
    Modelnumber:'',
    SerialNo:'',
    DeviceMaker:'',
    Acknowledgment:'',
    manufacture_date :'',
    inspectionDate:'',
    DeviceImage:''
  }
  deviceChange(obj:any){

    let objvalue= this.DeviceList.find(data=>data.DEVICE_ID==obj);
    this.ReceivedDate=objvalue.SERIAL_NUMBER;
    debugger;
    this.DeviceDetailsservice_id=objvalue.SERIAL_NUMBER; 
  }

  ngOnInit(): void {
    this.loadDeviceDetails();
    this.DeviceMakerList();
     
  }

  async DeviceMakerList():Promise<void>{
    try {
      const req = {
        type: '26',
        mobileno:this.session.pacId,
      };
      this.spinner.show();
      const response = await this.sharedAPI.Hrmsemp(req);
      debugger;
      if (response.success) {
        if(response.result.length == response.result[0].COUNT)
        {
this.downloadCert=true;
        }
        else{
          this.downloadCert=false;
        }
        this.DeviceDetailsList = response.result;
       

      } else {
        this.toast.info(response.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async loadDeviceDetails(): Promise<void> {
    try {
      const req = {
        type: '23',
        mobileno:this.session.pacId,
      };
      this.spinner.show();
      const response = await this.sharedAPI.Hrmsemp(req);
      if (response.success) {
        this.DeviceList = response.result;
      } else {
        this.toast.info(response.message);
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

  async btnCalibration():Promise<void>{
    try {
      
    if (this.DeviceDetails.deviceId === '' ||  this.DeviceDetails.deviceId === null ||    this.DeviceDetails.deviceId === undefined) {
    this.toast.warning('Please Select Device');
    return;
  }
  if (    this.inspectionDate  === '' ||  this.inspectionDate  === null ||    this.inspectionDate  === undefined ||
    this.inspectionDate  === 'Invalid date'  ) {
    this.toast.warning('Please Select Inspection Date');
    return;
  } 
  if (this.DeviceDetails.SerialNo === '' ||  this.DeviceDetails.SerialNo === null ||    this.DeviceDetails.SerialNo === undefined) {
    this.toast.warning('Please Enter Serial Number');
    return;
  }
  
 
  if (this.DeviceDetails.DeviceMaker === '' ||  this.DeviceDetails.DeviceMaker === null ||    this.DeviceDetails.DeviceMaker === undefined) {
    this.toast.warning('Please Enter Maker Name');
    return;
  }
  if (    this.manufacture_date  === '' ||  this.manufacture_date  === null ||    this.manufacture_date  === undefined ||
    this.manufacture_date  === 'Invalid date'  ) {
    this.toast.warning('Please Select Manufacture Date');
    return;
  } 
  if (this.DeviceDetails.DeviceImage === '' ||  this.DeviceDetails.DeviceImage === null ||    this.DeviceDetails.DeviceImage === undefined) {
    this.toast.warning('Please Select Image JPG Only');
    return;

  }
  if(this.DeviceDetailsservice_id==this.DeviceDetails.SerialNo)
  {
    this.DeviceDetails.manufacture_date =moment(this.manufacture_date , 'DD-MM-YYYY').format('DD-MM-YYYY');
    this.DeviceDetails.inspectionDate =moment(this.inspectionDate , 'DD-MM-YYYY').format('DD-MM-YYYY');

    const req={
      type:"25",
      cfmsid:this.DeviceDetails.deviceId,	     
      empname:this.DeviceDetails.manufacture_date,	 
      remarks:this.DeviceDetails.inspectionDate,	 
      emailid:this.DeviceDetails.SerialNo,
      Gender:this.DeviceDetails.Modelnumber,	 
       mobileno:this.session.pacId,     
     // office:this.DeviceDetails.deviceId,     
             insertedby:this.DeviceDetails.DeviceMaker,
             updatedby:this.DeviceDetails.DeviceImage,	  
        
        }
                 this.spinner.show();
          const response = await this.ceoAPI.calibrationDeviceDetails(req);
         
          debugger;
          if (response.result[0].STATUS==1) {
            alert("Calibrtion Details Added Successfully");
            window.location.reload();
          } else {
            this.toast.info(response.message);
          }
          this.spinner.hide();
  }
  else{
    this.toast.info("Please Enter Valid Service Number")
//     this.DeviceDetails.manufacture_date =moment(this.manufacture_date , 'DD-MM-YYYY').format('DD-MM-YYYY');

// const req={
//   type:"22",
//   villageId:this.DeviceDetails.deviceId,
//   DesktopPhotoUpload:this.DeviceDetails.DeviceImage,
//   surveyNo:this.DeviceDetails.SerialNo,
//   insertedBy:this.DeviceDetails.manufacture_date,
//   pacsCode:this.DeviceDetails.DeviceMaker,
//   rbkId:this.DeviceDetails.Modelnumber

    
 
      
//     }
   
//       this.spinner.show();
//       const response = await this.ceoAPI.calibrationDeviceDetails(req);
//       debugger;
//       if (response.success) {
//         alert(response.message);
//         window.location.reload();
//       } else {
//         this.toast.info(response.message);
//       }
//       this.spinner.hide();
    }
  } 
  catch (error) {
    this.spinner.hide();
    this.utils.catchResponse(error);
  }



    

 
  }


  async btndownloadCalibration():Promise<void>{
    try {
      const req={
        pack_id:this.session.pacId
      }
      const response = await this.ceoAPI.CalibrationDetails(req);
      debugger;
      if (response.success) {
        this.utils.downloadPdfFile(response.result, 'Calibration_Cert_Statement');
        
      } else {
        this.toast.info(response.message);
      }
      this.spinner.hide();
    
  } catch (error) {
    this.spinner.hide();
    this.utils.catchResponse(error);
  }


  }
  async onTitledevicePhotoChange(event: any): Promise<void> {
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
          file = file.replace('data:image/jpeg;base64,', '');       
  
          this.DeviceDetails.DeviceImage = file;
          console.log(this.DeviceDetails.DeviceImage);
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

