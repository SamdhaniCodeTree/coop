import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { NgxSpinnerService } from 'ngx-spinner';
import { CeoService } from 'src/app/ceoModule/services/ceo.service';
import { JcService } from 'src/app/jcModule/services/jc.service';
import { ConsoleService } from 'src/app/sharedModule/services/console.service';
import { NgxToasterService } from 'src/app/sharedModule/services/ngx-toaster.service';
import { SessionService } from 'src/app/sharedModule/services/session.service';
import { SharedService } from 'src/app/sharedModule/services/shared.service';
import { ToasterService } from 'src/app/sharedModule/services/toaster.service';
import { UtilsService } from 'src/app/sharedModule/services/utils.service';

@Component({
  selector: 'app-calibration-cops',
  templateUrl: './calibration-cops.component.html',
  styleUrls: ['./calibration-cops.component.css']
})
export class CalibrationCopsComponent implements OnInit {  

  bsDatepickerConfig: Partial<BsDatepickerConfig> = this.utils.getbsdatepicker();
  btnlandsub=true;   
minDate!: Date;
maxDate!: Date; 

divisionList: any[] = [];
DistList: any[] = [];
mandalList: any[] = [];
rbkList: any[] = [];
packsList: any[] = [];
villageList: any[] = [];
SurveypacksList: any[] = [];

Status=true;

inspectionDate:any
desktopManufactureDate:any;
cpuManufactureDate:any;
mouseManufactureDate:any;
keyBoardManufactureDate:any;
upsManufactureDate:any;
EleWeightManufactureDate:any;
ups1KvaManufactureDate:any;
batteryKvaManufactureDate:any;
matrixPrinterManufactureDate:any;
matrixScanerManufactureDate:any;
WebCamManufactureDate:any;
internetDevManufactureDate:any;
BiometricscannerManufactureDate:any;
TabletDate:any;
BluetooththermalprinterDate:any;
BarcodescannerDate:any;
posdeviceDate:any;
PassbookprinterDate:any;
 
CalibrationStatus=true;
CertificationStatus=false;
MessageStatus=false;

calibrationDetails = {
  inspectionDate:'',
  isDesktopAvailable:'',
  desktopMaker:'',
  desktopSerialNo:'',
  desktopManufactureDate:'',
  DesktopPhotoUpload:'',

      //rbtn1
      cpuMaker:'',
      cpuSerialNo:'',
      cpuManufactureDate:'',
      mouseMaker:'',
      mouseSerialNo:'',
      mouseManufactureDate:'',
      keyBoardMaker:'',
      keyBoardSerialNo:'',
      keyBoardManufactureDate:'',
      upsMaker:'',
      upsSerialNo:'',
      upsManufactureDate:'',
      mousePhotoUpload:'',
      cpuPhotoUpload:'',
      keyboardPhotoUpload:'',
      upsmakerPhotoUpload:'',

isEleWeightScale:'',
electronicWeightScaleMaker:'',
electronicWeightScaleSerialNo:'',
EleWeightManufactureDate:'',
ElectronicWeighImage:'',

is24Pin80ColMatrixPrinter:'',
matrixPrinterMaker:'',
matrixPrinterSerialNo:'',
matrixPrinterManufactureDate:'',
MatrixPrinterImage:'',

    //rbtn2
    isUps1Kva:'',
    ups1KVAMaker:'',
    ups1KVASerialNo:'',
    ups1KvaManufactureDate:'',
    UPS1KVAImage:'',

isBattery:'',
BatteryMaker:'',
BatterySerialNo:'',
batteryKvaManufactureDate:'',
BatteryImage:'',

internetDevice:'',
internetDevManufactureDate:'',
internetDevMaker:'',
internetDevSerialNo:'',
donglrOrModemImage:'',

isscaner:'',
matrixScanerMaker:'',
matrixScanerSerialNo:'',
matrixScanerManufactureDate:'',
MatrixScanerImage:'',


isWebCam:'',
matrixWebCamMaker:'',
matrixWebCamSerialNo:'',
WebCamManufactureDate:'',
WebCamImgage:'',

isBiometricscanner:'',
Biometricscannermaker:'',
BiometricscannerSerialNo:'',
BiometricscannerManufactureDate:'',
BiometricscannerImage:'',

isTablet:'',
Tabletmaker:'',
TabletSerialNo:'',
TabletDate:'',
TabletImage:'',

isBluetooththermalprinter:'',
Bluetooththermalprintermaker:'',
BluetooththermalprinterSerialNo:'', 
BluetooththermalprinterDate:'',
BluetooththermalprinterImage:'',

isBarcodescanner:'',
Barcodescannermaker:'',
BarcodescannerSerialNo:'',
BarcodescannerDate:'',
BarcodescannerImage:'',

isposdevice:'',
posdevicemaker:'',
posdeviceSerialNo:'',
posdeviceDate:'',
POSdeviceImage:'',

isPassbookprinter:'',
PassbookprinterMaker:'',
PassbookprinterSerialNo:'',
PassbookprinterDate:'',
PassbookprinterImage:'',
  
  
  pacsCode: '',
  pacsName: '',
  rbkId: '',
   
  villageId: '',
  mandalId: '',
  districtId: '',
  surveyNo: '',
  area: '',
   
  insertedBy: '',
   
  source: '',
  
 
 
 
   
};
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
  
) {
  this.maxDate = this.session.getTodayDate();
  this.minDate=new Date('20-01-2022');
}

ngOnInit(): void {
 // this.loaddistricts();
//  this.btnPDF();
let dt = new Date();
  this.inspectionDate=this.session.getDateddmmyyyyString(dt);
  this.StatusList();
}

async StatusList(): Promise<void> {
 
  try {
      //  if (this.validate()) {
      
                const req={
                  type:"501",        
                  pacId:this.session.pacId     
                }
          
              this.spinner.show(); 
              const response = await this.sharedAPI.SocietyMasterList(req); 
              this.spinner.hide();
              if (response.success) { 
                this.CalibrationStatus=false;
                this.CertificationStatus=false;
                this.MessageStatus=false; 

                if(response.result[0].DEVICESTATUS=="1") 
                      {
                      this.btnlandsub=true;
                      }
                      else
                      {
                        this.btnlandsub=false;
                        this.toast.info("Devices are not Received for this PACS  !!!");
                      }

                if(response.result[0].STATUS=="1") 
                  this.CertificationStatus=true; 
              else if(response.result[0].STATUS=="2") 
                  this.MessageStatus=true;  
                else 
                  this.CalibrationStatus=true;  
              } 
              else  
                  this.toast.info(response.message); 
   // }
  } catch (error) {
    this.spinner.hide();
    this.utils.catchResponse(error);
  }
}

 


async rbtnvalue(id:any): Promise<void>
 {

        try {
              if(id=='1')
                {
                  this.calibrationDetails.desktopMaker='';
                  this.calibrationDetails.desktopSerialNo='';
                  this.calibrationDetails.desktopManufactureDate='';
                  this.desktopManufactureDate='';

                  this.calibrationDetails.cpuMaker='';
                  this.calibrationDetails.cpuSerialNo='';                   
                  this.calibrationDetails.cpuManufactureDate='';
                  this.cpuManufactureDate='';

                  this.calibrationDetails.mouseMaker='';
                  this.calibrationDetails.mouseSerialNo='';
                  this.calibrationDetails.mouseManufactureDate='';
                  this.mouseManufactureDate='';

                  
                  this.calibrationDetails.keyBoardMaker='';
                  this.calibrationDetails.keyBoardSerialNo='';
                  this.calibrationDetails.keyBoardManufactureDate='';
                  this.keyBoardManufactureDate='';
                  //this.keyboardImgUpload='';

                  this.calibrationDetails.upsMaker='';
                  this.calibrationDetails.upsSerialNo='';
                  this.calibrationDetails.ups1KvaManufactureDate='';
                  this.upsManufactureDate='';


                  this.calibrationDetails.mouseMaker='';
                  this.calibrationDetails.mouseSerialNo='';
                  this.calibrationDetails.mouseManufactureDate;
                  this.mouseManufactureDate='';

                  this.calibrationDetails.keyBoardMaker='';
                  this.calibrationDetails.keyBoardSerialNo='';
                  this.calibrationDetails.keyBoardManufactureDate='';
                  this.keyBoardManufactureDate='';

                  this.calibrationDetails.upsMaker='';
                  this.calibrationDetails.upsSerialNo='';
                  this.calibrationDetails.upsManufactureDate='';
                  this.upsManufactureDate=''; 


                  // this.calibrationDetails.DesktopPhotoUpload=''; 
                  // this.calibrationDetails.cpuManufactureDate='';  
                  // this.calibrationDetails.mousePhotoUpload='';
                  // this.calibrationDetails.cpuPhotoUpload='';
                  // this.calibrationDetails.keyboardPhotoUpload='';
                  // this.calibrationDetails.upsmakerPhotoUpload='';
                }
               else if(id=='2' )
                  { 
                    this.calibrationDetails.ups1KVAMaker='';
                    this.calibrationDetails.ups1KVASerialNo='';
                    this.calibrationDetails.ups1KvaManufactureDate='';
                    this.ups1KvaManufactureDate=''; 
                  }
                  else if(id=='3')
                    {
                        this.calibrationDetails.BatteryMaker='';
                        this.calibrationDetails.BatterySerialNo='';
                        this.calibrationDetails.batteryKvaManufactureDate='';
                        this.batteryKvaManufactureDate='';
                       
                    } 
                    else if(id=='4'    )
                      {
                         this.calibrationDetails.matrixPrinterMaker='';
                         this.calibrationDetails.matrixPrinterSerialNo='';
                        this.calibrationDetails.matrixPrinterManufactureDate='';
                        this.matrixPrinterManufactureDate='';
                        
                      }
                      else if(id=='5'   )  //Scaner
                        { 
                          this.calibrationDetails.matrixScanerMaker='';
                          this.calibrationDetails.matrixScanerSerialNo='';
                         this.calibrationDetails.matrixScanerManufactureDate='';
                         this.matrixScanerManufactureDate=''; 
                        }

                        else if(id=='6'    ) //WebCam
                          { 
                            this.calibrationDetails.matrixWebCamMaker='';
                            this.calibrationDetails.matrixWebCamSerialNo='';
                           this.calibrationDetails.WebCamManufactureDate='';
                           this.WebCamManufactureDate=''; 
                          }

                          
                          else if(id=='7'    ) //Internet Connectivity Device
                          { 
                            this.calibrationDetails.internetDevMaker='';
                            this.calibrationDetails.internetDevSerialNo='';
                           this.calibrationDetails.internetDevManufactureDate='';
                           this.internetDevManufactureDate=''; 
                          }
                          else if(id=='8'    ) //Biometric Scanner 
                          { 
                            this.calibrationDetails.Biometricscannermaker='';
                            this.calibrationDetails.BiometricscannerSerialNo='';
                           this.calibrationDetails.BiometricscannerManufactureDate='';
                           this.BiometricscannerManufactureDate=''; 
                          }

                          else if(id=='9'    ) //Tablet
                          { 
                            this.calibrationDetails.Tabletmaker='';
                            this.calibrationDetails.TabletSerialNo='';
                           this.calibrationDetails.TabletDate='';
                           this.TabletDate=''; 
                          }
                          else if(id=='10'    ) //Bluetooth Thermal Printer
                          { 
                            this.calibrationDetails.Bluetooththermalprintermaker='';
                            this.calibrationDetails.BluetooththermalprinterSerialNo='';
                           this.calibrationDetails.BluetooththermalprinterDate='';
                           this.BluetooththermalprinterDate=''; 
                          } 

                           
                          else if(id=='11'    ) //Barcode Scanner
                          { 
                            this.calibrationDetails.Barcodescannermaker='';
                            this.calibrationDetails.BarcodescannerSerialNo='';
                           this.calibrationDetails.BarcodescannerDate='';
                           this.BarcodescannerDate=''; 
                          } 
                          else if(id=='12'    ) //POS Device
                          { 
                            this.calibrationDetails.posdevicemaker='';
                            this.calibrationDetails.posdeviceSerialNo='';
                           this.calibrationDetails.posdeviceDate='';
                           this.posdeviceDate=''; 
                          } 
                          else if(id=='13'    ) //PassBook Printer
                          { 
                            this.calibrationDetails.PassbookprinterMaker='';
                            this.calibrationDetails.PassbookprinterSerialNo='';
                           this.calibrationDetails.PassbookprinterDate='';
                           this.PassbookprinterDate=''; 
                          } 
                     

               // this.toast.warning('Radiobutton value='+id);

        } catch (error) {
          
        }

  }

async OnlyJpegUpload(event: any,id:any): Promise<void> {
  try {

          if(id=='1') this.calibrationDetails.DesktopPhotoUpload  = ''
     else if(id=='2') this.calibrationDetails.cpuPhotoUpload = '' 
     else if(id=='3') this.calibrationDetails.mousePhotoUpload = ''
     else if(id=='4') this.calibrationDetails.keyboardPhotoUpload  = ''
     else if(id=='5') this.calibrationDetails.upsmakerPhotoUpload  = ''

     else if(id=='6') this.calibrationDetails.UPS1KVAImage= ''
     else if(id=='7')  this.calibrationDetails.BatteryImage=''
     else if(id=='8')this.calibrationDetails.MatrixPrinterImage = '';
     else if(id=='9')this.calibrationDetails.MatrixScanerImage = '';
     else if(id=='10')this.calibrationDetails.WebCamImgage= '';
     else if(id=='11')this.calibrationDetails.donglrOrModemImage= '';
     else if(id=='12')this.calibrationDetails.BiometricscannerImage = '';

     else if(id=='13')this.calibrationDetails.TabletImage = '';
     else if(id=='14')this.calibrationDetails.BluetooththermalprinterImage = '';
     else if(id=='15')this.calibrationDetails.BarcodescannerImage = '';     
     else if(id=='16')this.calibrationDetails.POSdeviceImage = '';

     else if(id=='17')this.calibrationDetails.PassbookprinterImage = '';
    //  else if(id=='18')this.calibrationDetails.BiometricscannerImage = '';
    //  else if(id=='19')this.calibrationDetails.BiometricscannerImage = '';
    //  else if(id=='20')this.calibrationDetails.BiometricscannerImage = '';

    if (event.target.files.length > 0) {
      if (event.target.files[0].type === 'image/jpeg') {
     
      const response: any = await this.utils.fileUploadEncodedString(
        event,
        this.utils.fileSize.hundredKB
      );
      if (response) {
        let file = (
          this.sanitizer.bypassSecurityTrustResourceUrl(response) as any
        ).changingThisBreaksApplicationSecurity;
        file = file.replace('data:image/jpeg;base64,', '');
        
        
              if(id=='1')  this.calibrationDetails.DesktopPhotoUpload = file;
         else if(id=='2')  this.calibrationDetails.cpuPhotoUpload = file;         //CPU Photo Upload
         else if(id=='3')  this.calibrationDetails.mousePhotoUpload = file;       //Mouse Photo Upload
         else if(id=='4')  this.calibrationDetails.keyboardPhotoUpload = file;    //Keyboard Photo Upload 
         else if(id=='5')  this.calibrationDetails.upsmakerPhotoUpload = file;    //UPS Photo Upload 

         else if(id=='6')   this.calibrationDetails.UPS1KVAImage = file;          //UPS 1KVA Photo Upload 

         else if(id=='7')  this.calibrationDetails.BatteryImage = file;           //Battery Photo Upload

         else if(id=='8')this.calibrationDetails.MatrixPrinterImage = file;       //Matrix Printer Photo Upload

         else if(id=='9')  this.calibrationDetails.MatrixScanerImage = file;      //Scaner Photo Upload 
         else if(id=='10') this.calibrationDetails.WebCamImgage = file;           //WebCam Photo Upload 
         else if(id=='11') this.calibrationDetails.donglrOrModemImage = file;     //Dongle/Modem Photo Upload
         else if(id=='12') this.calibrationDetails.BiometricscannerImage = file;  //Biometric Scanner Photo Upload

         else if(id=='13')  this.calibrationDetails.TabletImage = file;           //Tablet Photo Upload 
         else if(id=='14')  this.calibrationDetails.BluetooththermalprinterImage = file;  //Bluetooth Thermal Printer Photo Upload 
         else if(id=='15')  this.calibrationDetails.BarcodescannerImage = file;   //Barcode Scanner Photo Upload
       
         else if(id=='16')  this.calibrationDetails.POSdeviceImage = file;        //POS Device Photo Upload
         else if(id=='17') this.calibrationDetails.PassbookprinterImage = file;  //Biometric Scanner Photo Upload
        //  else if(id=='18') this.calibrationDetails.BiometricscannerImage = file;  //Biometric Scanner Photo Upload
        //  else if(id=='19') this.calibrationDetails.BiometricscannerImage = file;  //Biometric Scanner Photo Upload
        //  else if(id=='20') this.calibrationDetails.BiometricscannerImage = file;  //Biometric Scanner Photo Upload

      } else {
    
        event.target.value = '';
      }
    }
    else{
      alert('Accept Only Jpeg files Only..');
      event.target.value = '';
    }
    } else {
      //this.ngxToaster.warning('file is Empty !!!, Please try again.');
      event.target.value = '';
    }
  } catch (error) {
    this.utils.catchResponse(error);
  }
}











async loaddistricts(): Promise<void> {
  try {
    const req = {
      districtId:'1',
      mandalId:'',
      pacsId:'',
      rbkId:'',
      villageId:'',
      phase:'3',
      type:'1'
    };
    this.spinner.show();
    debugger;
    const response = await this.jcAPI.pacsMandalListByDistrictIdphase(req);
    if (response.success) {
      this.DistList = response.result;
    } else {
      this.toast.info(response.message);
    }
    this.spinner.hide();
  } catch (error) {
    this.spinner.hide();
    this.utils.catchResponse(error);
  }
}

async loadMandals(): Promise<void> {
  try {
    const req = {
      districtId: this.calibrationDetails.districtId,
      phase:'3',
      type:'2'
    };
    this.spinner.show();
    const response = await this.jcAPI.pacsMandalListByDistrictIdphase(req);
    if (response.success) {
      this.mandalList = response.result;
    } else {
      this.toast.info(response.message);
    }
    this.spinner.hide();
  } catch (error) {
    this.spinner.hide();
    this.utils.catchResponse(error);
  }
}
async districtChange(obj:any): Promise<void> {
  this.calibrationDetails.rbkId = '';
  this.calibrationDetails.villageId = '';
  this.calibrationDetails.districtId=''
  this.calibrationDetails.districtId=obj;
  this.mandalList = [];
  if (this.calibrationDetails.districtId === '') {
    return;
  }
  this.loadMandals();
}
onMandalChange(): void {
  this.calibrationDetails.rbkId = '';
  this.calibrationDetails.villageId = '';
  this.rbkList = [];
  if (this.calibrationDetails.mandalId === '') {
    return;
  }
  this.loadRBKList();
}

async loadRBKList(): Promise<void> {
  try {
    const req = {
      districtId: this.calibrationDetails.districtId,
      mandalId: this.calibrationDetails.mandalId,
      phase:'3',
      type:'3'
    };
    this.spinner.show();
    const response = await this.jcAPI.pacsMandalListByDistrictIdphase(req);
    if (response.success) {
      this.rbkList = response.result;
    } else {
      this.toast.info(response.message);
    }
    this.spinner.hide();
  } catch (error) {
    this.spinner.hide();
    this.utils.catchResponse(error);
  }
}

onRbkChange(): void {
  this.calibrationDetails.villageId = '';
  this.villageList = [];
  if (this.calibrationDetails.rbkId === '') {
    return;
  }
  this.loadVillageList();
}

async loadVillageList(): Promise<void> {
  try {
    const req = {
      districtId: this.calibrationDetails.districtId,
      mandalId: this.calibrationDetails.mandalId,
      rbkId: this.calibrationDetails.rbkId,
      phase:'3',
      type:'4'
    };
    this.spinner.show();
    const response = await this.jcAPI.pacsMandalListByDistrictIdphase(req);
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
async PACSList(): Promise<void> {
  try {
    const req = {
      districtId: this.calibrationDetails.districtId,
      mandalId: this.calibrationDetails.mandalId,
      rbkId: this.calibrationDetails.rbkId,
      phase:'3',
      type:'5'
    };
    this.spinner.show();
    const response = await this.jcAPI.pacsMandalListByDistrictIdphase(req);
    if (response.success) {
      this.packsList = response.result;
    } else {
      this.toast.info(response.message);
    }
    this.spinner.hide();
  } catch (error) {
    this.spinner.hide();
    this.utils.catchResponse(error);
  }
}
async onVillageChange(): Promise<void> {
  try {
    //this.calibrationDetails.villageId = '';
    this.packsList = [];
    if (this.calibrationDetails.rbkId === '') {
      return;
    }
   this. PACSList();
  
  } catch (error) {
    this.spinner.hide();
    this.utils.catchResponse(error);
  }
}

async onpacsChange(): Promise<void> {
  try {
    const req = {
      districtId: this.calibrationDetails.districtId,
       mandalId: this.calibrationDetails.mandalId,
      rbkId: this.calibrationDetails.pacsCode,
      //pacsCode:this.calibrationDetails.pacsCode,
      phase:'3',
      type:'6'
    };
     
    this.spinner.show();
    const response = await this.jcAPI.pacsMandalListByDistrictIdphase(req);
    if (response.success) {
     
      this.SurveypacksList = response.result;
      
    } else {
     // this.toast.info(response.message);
     alert('Proceed To Land Allotment  ...!');
    }
    this.spinner.hide();
  } catch (error) {
    this.spinner.hide();
    this.utils.catchResponse(error);
  }
}



 

async btnLandAllotmentSub(): Promise<void> {
 
  try {
    this.calibrationDetails.inspectionDate=moment(this.inspectionDate, 'DD-MM-YYYY').format('DD-MM-YYYY');
      this.calibrationDetails.desktopManufactureDate=moment(this.desktopManufactureDate, 'DD-MM-YYYY').format('DD-MM-YYYY');
      this.calibrationDetails.cpuManufactureDate=moment(this.cpuManufactureDate, 'DD-MM-YYYY').format('DD-MM-YYYY');
      this.calibrationDetails.mouseManufactureDate=moment(this.mouseManufactureDate, 'DD-MM-YYYY').format('DD-MM-YYYY');
      this.calibrationDetails.keyBoardManufactureDate=moment(this.keyBoardManufactureDate, 'DD-MM-YYYY').format('DD-MM-YYYY');
      this.calibrationDetails.keyBoardManufactureDate=moment(this.keyBoardManufactureDate, 'DD-MM-YYYY').format('DD-MM-YYYY');
      this.calibrationDetails.PassbookprinterDate=moment(this.PassbookprinterDate, 'DD-MM-YYYY').format('DD-MM-YYYY');
      this.calibrationDetails.posdeviceDate=moment(this.posdeviceDate, 'DD-MM-YYYY').format('DD-MM-YYYY');
      this.calibrationDetails.BarcodescannerDate=moment(this.BarcodescannerDate, 'DD-MM-YYYY').format('DD-MM-YYYY');
      this.calibrationDetails.BluetooththermalprinterDate=moment(this.BluetooththermalprinterDate, 'DD-MM-YYYY').format('DD-MM-YYYY');
      this.calibrationDetails.TabletDate=moment(this.TabletDate, 'DD-MM-YYYY').format('DD-MM-YYYY');
      this.calibrationDetails.BiometricscannerManufactureDate=moment(this.BiometricscannerManufactureDate, 'DD-MM-YYYY').format('DD-MM-YYYY');
      this.calibrationDetails.internetDevManufactureDate=moment(this.internetDevManufactureDate, 'DD-MM-YYYY').format('DD-MM-YYYY');
      this.calibrationDetails.WebCamManufactureDate=moment(this.WebCamManufactureDate, 'DD-MM-YYYY').format('DD-MM-YYYY');
      this.calibrationDetails.matrixScanerManufactureDate=moment(this.matrixScanerManufactureDate, 'DD-MM-YYYY').format('DD-MM-YYYY');
      this.calibrationDetails.matrixPrinterManufactureDate=moment(this.matrixPrinterManufactureDate, 'DD-MM-YYYY').format('DD-MM-YYYY');
      this.calibrationDetails.batteryKvaManufactureDate=moment(this.batteryKvaManufactureDate, 'DD-MM-YYYY').format('DD-MM-YYYY');
      this.calibrationDetails.ups1KvaManufactureDate=moment(this.ups1KvaManufactureDate, 'DD-MM-YYYY').format('DD-MM-YYYY');
      this.calibrationDetails.upsManufactureDate=moment(this.upsManufactureDate, 'DD-MM-YYYY').format('DD-MM-YYYY');
     if (this.validate()) {
      
    const req={
      type:"1",
      inspectionDate:this.calibrationDetails.inspectionDate,
    isDesktopAvailable:this.calibrationDetails.isDesktopAvailable,
    desktopMaker:this.calibrationDetails.desktopMaker,
    desktopSerialNo:this.calibrationDetails.desktopSerialNo,
    desktopManufactureDate:this.calibrationDetails.desktopManufactureDate,
    DesktopPhotoUpload:this.calibrationDetails.DesktopPhotoUpload,
    cpuMaker:this.calibrationDetails.cpuMaker,
    cpuSerialNo:this.calibrationDetails.cpuSerialNo,
    cpuManufactureDate:this.calibrationDetails.cpuManufactureDate,
    cpuPhotoUpload:this.calibrationDetails.cpuPhotoUpload,
    mouseMaker:this.calibrationDetails.mouseMaker,
    mouseSerialNo:this.calibrationDetails.mouseSerialNo,
    mouseManufactureDate:this.calibrationDetails.mouseManufactureDate,
    mousePhotoUpload:this.calibrationDetails.mousePhotoUpload,
    keyBoardMaker:this.calibrationDetails.keyBoardMaker,
    keyBoardSerialNo:this.calibrationDetails.keyBoardSerialNo,
    keyBoardManufactureDate:this.calibrationDetails.keyBoardManufactureDate,
    keyboardPhotoUpload:this.calibrationDetails.keyboardPhotoUpload,
    upsMaker:this.calibrationDetails.upsMaker,
    upsSerialNo:this.calibrationDetails.upsSerialNo,
    upsManufactureDate:this.calibrationDetails.upsManufactureDate,
  upsmakerPhotoUpload:this.calibrationDetails.upsmakerPhotoUpload,
  isEleWeightScale:this.calibrationDetails.isEleWeightScale,
  electronicWeightScaleMaker:this.calibrationDetails.electronicWeightScaleMaker,
  electronicWeightScaleSerialNo:this.calibrationDetails.electronicWeightScaleSerialNo,
  EleWeightManufactureDate:this.calibrationDetails.EleWeightManufactureDate,
  ElectronicWeighImage:this.calibrationDetails.ElectronicWeighImage,
  is24Pin80ColMatrixPrinter:this.calibrationDetails.is24Pin80ColMatrixPrinter,
  matrixPrinterMaker:this.calibrationDetails.matrixPrinterMaker,
  matrixPrinterSerialNo:this.calibrationDetails.matrixPrinterSerialNo,
  matrixPrinterManufactureDate:this.calibrationDetails.matrixScanerManufactureDate,
  MatrixPrinterImage:this.calibrationDetails.MatrixPrinterImage,
  isUps1Kva:this.calibrationDetails.isUps1Kva,
  ups1KVAMaker:this.calibrationDetails.ups1KVAMaker,
  ups1KVASerialNo:this.calibrationDetails.ups1KVASerialNo,
  ups1KvaManufactureDate:this.calibrationDetails.ups1KvaManufactureDate,
  UPS1KVAImage:this.calibrationDetails.UPS1KVAImage,
  isBattery:this.calibrationDetails.isBattery,
  BatteryMaker:this.calibrationDetails.BatteryMaker,
  BatterySerialNo:this.calibrationDetails.BatterySerialNo,
  batteryKvaManufactureDate:this.calibrationDetails.batteryKvaManufactureDate,
  BatteryImage:this.calibrationDetails.BatteryImage,
  internetDevice:this.calibrationDetails.internetDevice,
  internetDevManufactureDate:this.calibrationDetails.internetDevManufactureDate,
  internetDevMaker:this.calibrationDetails.internetDevMaker,
  internetDevSerialNo:this.calibrationDetails.internetDevSerialNo,
  donglrOrModemImage:this.calibrationDetails.donglrOrModemImage,
  isscaner:this.calibrationDetails.isscaner,
  matrixScanerMaker:this.calibrationDetails.matrixWebCamMaker,
  matrixScanerSerialNo:this.calibrationDetails.matrixPrinterSerialNo,
  matrixScanerManufactureDate:this.calibrationDetails.matrixPrinterManufactureDate,
  MatrixScanerImage:this.calibrationDetails.MatrixScanerImage,
  isWebCam:this.calibrationDetails.isWebCam,
  matrixWebCamMaker:this.calibrationDetails.matrixWebCamMaker,
  matrixWebCamSerialNo:this.calibrationDetails.matrixWebCamSerialNo,
  WebCamManufactureDate:this.calibrationDetails.WebCamManufactureDate,
  WebCamImgage:this.calibrationDetails.WebCamImgage,
  isBiometricscanner:this.calibrationDetails.isBiometricscanner,
  Biometricscannermaker:this.calibrationDetails.Biometricscannermaker,
  BiometricscannerSerialNo:this.calibrationDetails.BiometricscannerSerialNo,
  BiometricscannerManufactureDate:this.calibrationDetails.BiometricscannerManufactureDate,
  BiometricscannerImage:this.calibrationDetails.BiometricscannerImage,
  isTablet:this.calibrationDetails.isTablet,
  Tabletmaker:this.calibrationDetails.Tabletmaker,
  TabletSerialNo:this.calibrationDetails.TabletSerialNo,
  TabletDate:this.calibrationDetails.TabletDate,
  TabletImage:this.calibrationDetails.TabletImage,
  isBluetooththermalprinter:this.calibrationDetails.isBluetooththermalprinter,
  Bluetooththermalprintermaker:this.calibrationDetails.Bluetooththermalprintermaker,
  BluetooththermalprinterSerialNo: this.calibrationDetails.BluetooththermalprinterSerialNo,
  BluetooththermalprinterDate:this.calibrationDetails.BluetooththermalprinterDate,
  BluetooththermalprinterImage:this.calibrationDetails.BluetooththermalprinterImage,
  isBarcodescanner:this.calibrationDetails.isBarcodescanner,
  Barcodescannermaker:this.calibrationDetails.Barcodescannermaker,
  BarcodescannerSerialNo:this.calibrationDetails.BarcodescannerSerialNo,
  BarcodescannerDate:this.calibrationDetails.BarcodescannerDate,
  BarcodescannerImage:this.calibrationDetails.BarcodescannerImage,
  isposdevice:this.calibrationDetails.isposdevice,
  posdevicemaker:this.calibrationDetails.posdevicemaker,
  posdeviceSerialNo:this.calibrationDetails.posdeviceSerialNo,
  posdeviceDate:this.calibrationDetails.posdeviceDate,
  POSdeviceImage:this.calibrationDetails.POSdeviceImage,
  isPassbookprinter:this.calibrationDetails.isPassbookprinter,
  PassbookprinterMaker:this.calibrationDetails.PassbookprinterMaker,
  PassbookprinterSerialNo:this.calibrationDetails.PassbookprinterSerialNo,
  PassbookprinterDate:this.calibrationDetails.PassbookprinterDate,
  PassbookprinterImage: this.calibrationDetails.PassbookprinterImage,
  pacsCode:this.session.pacId,
  pacsName:this.session.pacName,
  rbkId: this.session.pacId,  
  villageId:this.session.divisionId,
  mandalId:this.session.mandalId,
  districtId:this.session.districtId,
  surveyNo:"",
  area:"", 
  insertedBy:this.session.userName,  
  source:"Web"
    }
   
      this.spinner.show();
      const response = await this.ceoAPI.calibrationDetailsSub(req);
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

async Certificateupload():Promise<void>{

  try {
    const req = {
      
      cfmsid:this.session.pacId,
      updatedby:this.CertifcateFile,
      Gender:"2"
    };
    this.spinner.show();
    debugger;
    const response = await this.ceoAPI.calibrationDeviceDetailsupdate(req);
    if (response.success) {
     
      alert(response.message);
        window.location.reload();
    } else {
      alert(response.message);
    }
    this.spinner.hide();
  } catch (error) {
    this.spinner.hide();
    this.utils.catchResponse(error);
  }

}

async onTitleDesktopPhotoChange(event: any): Promise<void> {
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

        this.calibrationDetails.DesktopPhotoUpload = file;
        console.log(this.calibrationDetails.DesktopPhotoUpload);
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

async onCPUImageChange(event: any): Promise<void> {
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
                this.calibrationDetails.cpuPhotoUpload = file;
        
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


async onMouseImageChange(event: any): Promise<void> {
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
                this.calibrationDetails.mousePhotoUpload = file;
        
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

async onKeyBoardImageChange(event: any): Promise<void> {
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
                this.calibrationDetails.keyboardPhotoUpload = file;
        
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

async onUPSImageChange(event: any): Promise<void> {
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
                this.calibrationDetails.upsmakerPhotoUpload = file;
        
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

async onElectronicWeighImageChange(event: any): Promise<void> {
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
                this.calibrationDetails.ElectronicWeighImage = file;
        
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

async onUPS1KVAImgChange(event: any): Promise<void> {
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
                this.calibrationDetails.UPS1KVAImage = file;
        
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

async onBatteryImgChange(event: any): Promise<void> {
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
                this.calibrationDetails.BatteryImage = file;
        
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

async onMatrixPrinterImgChange(event: any): Promise<void> {
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
                this.calibrationDetails.MatrixPrinterImage = file;
        
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

async ondonglrOrModemImgChange(event: any): Promise<void> {
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
                this.calibrationDetails.donglrOrModemImage = file;
        
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

async onMatrixScanerImgChange(event: any): Promise<void> {
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
                this.calibrationDetails.MatrixScanerImage = file;
        
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

async onWebCamImgChange(event: any): Promise<void> {
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
                this.calibrationDetails.WebCamImgage = file;
        
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

async onBiometricscannerImgChange(event: any): Promise<void> {
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
                this.calibrationDetails.BiometricscannerImage = file;
        
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

async onTabletImgChange(event: any): Promise<void> {
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
                this.calibrationDetails.TabletImage = file;
        
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


async onBluetooththermalprinterImgChange(event: any): Promise<void> {
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
                this.calibrationDetails.BluetooththermalprinterImage = file;
        
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

async onBarcodescannerImgChange(event: any): Promise<void> {
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
                this.calibrationDetails.BarcodescannerImage = file;
        
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


async onPOSdeviceImgChange(event: any): Promise<void> {
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
                this.calibrationDetails.POSdeviceImage = file;
        
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


async onPassbookprinterImgChange(event: any): Promise<void> {
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
                this.calibrationDetails.PassbookprinterImage = file;
        
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

validate(): boolean { debugger

if(this.calibrationDetails.isDesktopAvailable=='0'  || this.calibrationDetails.isDesktopAvailable=='' ||
this.calibrationDetails.isUps1Kva=='0'  || this.calibrationDetails.isUps1Kva==''  ||
this.calibrationDetails.isBattery=='0'  || this.calibrationDetails.isBattery==''  ||
this.calibrationDetails.is24Pin80ColMatrixPrinter=='0'  || this.calibrationDetails.is24Pin80ColMatrixPrinter==''  ||
this.calibrationDetails.isscaner=='0'  || this.calibrationDetails.isscaner==''  ||
this.calibrationDetails.isWebCam=='0'  || this.calibrationDetails.isWebCam==''  ||
this.calibrationDetails.internetDevice=='0'  || this.calibrationDetails.internetDevice==''  ||
this.calibrationDetails.isBiometricscanner=='0'  || this.calibrationDetails.isBiometricscanner==''  ||
this.calibrationDetails.isTablet=='0'  || this.calibrationDetails.isTablet==''  ||
this.calibrationDetails.isBluetooththermalprinter=='0'  || this.calibrationDetails.isBluetooththermalprinter==''  ||
this.calibrationDetails.isBarcodescanner=='0'  || this.calibrationDetails.isBarcodescanner==''  ||
this.calibrationDetails.isposdevice=='0'  || this.calibrationDetails.isposdevice==''  ||
this.calibrationDetails.isPassbookprinter=='0' || this.calibrationDetails.isPassbookprinter==''    )
{
  this.toast.warning('All Devices should be Available to Submit Calibration  !!!');
  return false;
}

debugger;

  // if (this.utils.isEmpty(this.calibrationDetails.districtId)) {
  //   this.toast.warning('please select District');
  //   return false;
  // }
  // if (this.utils.isEmpty(this.calibrationDetails.mandalId)) {
  //       this.toast.warning('please select mandal');
  //       return false;
  //     }
    
  //     if (this.utils.isEmpty(this.calibrationDetails.rbkId)) {
  //       this.toast.warning('please select rbk');
  //       return false;
  //     }
    
  //     if (this.utils.isEmpty(this.calibrationDetails.villageId)) {
  //       this.toast.warning('please select village');
  //       return false;
  //     }
    
  //     if (this.utils.isEmpty(this.calibrationDetails.pacsCode)) {
  //       this.toast.warning('please select pacs');
  //       return false;
  //     }
  if (    this.calibrationDetails.inspectionDate === '' ||  this.calibrationDetails.inspectionDate === null ||    this.calibrationDetails.inspectionDate === undefined ||
    this.calibrationDetails.inspectionDate === 'Invalid date'  ) {
    this.toast.warning('Please Select Inspection Date');
    return false;
  } 
  if (
    this.calibrationDetails.isDesktopAvailable === '' ||    this.calibrationDetails.isDesktopAvailable === null ||    this.calibrationDetails.isDesktopAvailable === undefined) {
    this.toast.warning('Please Select Desktop Available');
    return false;
  }

  if (this.calibrationDetails.isDesktopAvailable === '1') 
    {
    if (
      this.calibrationDetails.desktopMaker === '' ||
      this.calibrationDetails.desktopMaker === null ||
      this.calibrationDetails.desktopMaker === undefined   
    ) {
      this.toast.warning('Please Enter Desktop Maker');
      return false;
    }
  
    if (
      this.calibrationDetails.desktopSerialNo === '' ||
      this.calibrationDetails.desktopSerialNo === null ||
      this.calibrationDetails.desktopSerialNo === undefined   
    ) {
      this.toast.warning('Please Enter Desktop Serial No');
      return false;
    }
  
    if (
      this.calibrationDetails.desktopManufactureDate === '' ||
      this.calibrationDetails.desktopManufactureDate === null ||
      this.calibrationDetails.desktopManufactureDate === undefined ||
      this.calibrationDetails.desktopManufactureDate === 'Invalid date' 
    ) {
      this.toast.warning('Please  Select Desktop Manufacture Date');
      return false;
    }

    if (this.utils.isEmpty(this.calibrationDetails.DesktopPhotoUpload)) {
            this.toast.warning('Please Upload Desktop Photo');
            return false;
          }

          if (
            this.calibrationDetails.cpuMaker === '' ||
            this.calibrationDetails.cpuMaker === null ||
            this.calibrationDetails.cpuMaker === undefined   
          ) {
            this.toast.warning('Please Enter CPU Maker');
            return false;
          }
        
          if (
            this.calibrationDetails.cpuSerialNo === '' ||
            this.calibrationDetails.cpuSerialNo === null ||
            this.calibrationDetails.cpuSerialNo === undefined   
          ) {
            this.toast.warning('Please Enter CPU Serial No');
            return false;
          }
        
          if (
            this.calibrationDetails.cpuManufactureDate === '' ||
            this.calibrationDetails.cpuManufactureDate === null ||
            this.calibrationDetails.cpuManufactureDate === undefined ||
            this.calibrationDetails.cpuManufactureDate === 'Invalid date'  
          ) {
            this.toast.warning('Please Select CPU Manufacture Date');
            return false;
          }
           
          if (
            this.calibrationDetails.cpuPhotoUpload === '' ||
            this.calibrationDetails.cpuPhotoUpload === null ||
            this.calibrationDetails.cpuPhotoUpload === undefined   
          ) {
            this.toast.warning('Please Upload CPU Photo');
            return false;
          }

          if (
            this.calibrationDetails.mouseMaker === '' ||
            this.calibrationDetails.mouseMaker === null ||
            this.calibrationDetails.mouseMaker === undefined   
          ) {
            this.toast.warning('Please Enter Mouse Maker');
            return false;
          }
        
          if (
            this.calibrationDetails.mouseSerialNo === '' ||
            this.calibrationDetails.mouseSerialNo === null ||
            this.calibrationDetails.mouseSerialNo === undefined   
          ) {
            this.toast.warning('Please Enter Mouse Serial No');
            return false;
          }
        
          if (
            this.calibrationDetails.mouseManufactureDate === '' ||
            this.calibrationDetails.mouseManufactureDate === null ||
            this.calibrationDetails.mouseManufactureDate === undefined ||
            this.calibrationDetails.mouseManufactureDate === 'Invalid date'   
          ) {
            this.toast.warning('Please Select Mouse Manufacture Date');
            return false;
          }
          if (
            this.calibrationDetails.mousePhotoUpload === '' ||
            this.calibrationDetails.mousePhotoUpload === null ||
            this.calibrationDetails.mousePhotoUpload === undefined   
          ) {
            this.toast.warning('Please Upload Mouse Photo ');
            return false;
          }
                    if (
            this.calibrationDetails.keyBoardMaker === '' ||
            this.calibrationDetails.keyBoardMaker === null ||
            this.calibrationDetails.keyBoardMaker === undefined   
          ) {
            this.toast.warning('Please Enter Key Board Maker');
            return false;
          }
          if (
            this.calibrationDetails.keyBoardSerialNo === '' ||
            this.calibrationDetails.keyBoardSerialNo === null ||
            this.calibrationDetails.keyBoardSerialNo === undefined   
          ) {
            this.toast.warning('Please Enter key Board Serial No');
            return false;
          }
          if (
            this.calibrationDetails.keyBoardManufactureDate === '' ||
            this.calibrationDetails.keyBoardManufactureDate === null ||
            this.calibrationDetails.keyBoardManufactureDate === undefined ||
            this.calibrationDetails.keyBoardManufactureDate === 'Invalid date'   
          ) {
            this.toast.warning('Please Select key Board Manufacture Date');
            return false;
          }

          if (
            this.calibrationDetails.keyboardPhotoUpload === '' ||
            this.calibrationDetails.keyboardPhotoUpload === null ||
            this.calibrationDetails.keyboardPhotoUpload === undefined   
          ) {
            this.toast.warning('Please Upload Key Board Photo ');
            return false;
          }

          if (
            this.calibrationDetails.upsMaker === '' ||
            this.calibrationDetails.upsMaker === null ||
            this.calibrationDetails.upsMaker === undefined   
          ) {
            this.toast.warning('Please Enter UPS Maker');
            return false;
          }
          if (
            this.calibrationDetails.upsSerialNo === '' ||
            this.calibrationDetails.upsSerialNo === null ||
            this.calibrationDetails.upsSerialNo === undefined   
          ) {
            this.toast.warning('Please Enter UPS Serial No');
            return false;
          }
        
          if (
            this.calibrationDetails.upsManufactureDate === '' ||
            this.calibrationDetails.upsManufactureDate === null ||
            this.calibrationDetails.upsManufactureDate === undefined ||
            this.calibrationDetails.upsManufactureDate === 'Invalid date'   
          ) {
            this.toast.warning('Please Select UPS Manufacture Date');
            return false;
          }
        
          if (
            this.calibrationDetails.upsmakerPhotoUpload === '' ||
            this.calibrationDetails.upsmakerPhotoUpload === null ||
            this.calibrationDetails.upsmakerPhotoUpload === undefined   
          ) {
            this.toast.warning('Please Upload UPS Maker Photo');
            return false;
          }

      }
      if (
        this.calibrationDetails.isUps1Kva === '' ||
        this.calibrationDetails.isUps1Kva === null ||
        this.calibrationDetails.isUps1Kva === undefined     
      ) {
        this.toast.warning('Please Select UPS 1 KVA');
        return false;
      }

 if (this.calibrationDetails.isUps1Kva === '1') {

  

  if (
    this.calibrationDetails.ups1KVAMaker === '' ||
    this.calibrationDetails.ups1KVAMaker === null ||
    this.calibrationDetails.ups1KVAMaker === undefined     
  ) {
    this.toast.warning('Please Enter UPS 1 KVA Maker');
    return false;
  }

  if (
    this.calibrationDetails.ups1KVASerialNo === '' ||
    this.calibrationDetails.ups1KVASerialNo === null ||
    this.calibrationDetails.ups1KVASerialNo === undefined     
  ) {
    this.toast.warning('Please Enter UPS 1 KVA Serial No');
    return false;
  }

  if (
    this.calibrationDetails.ups1KvaManufactureDate === '' ||
    this.calibrationDetails.ups1KvaManufactureDate === null ||
    this.calibrationDetails.ups1KvaManufactureDate === undefined  ||
    this.calibrationDetails.ups1KvaManufactureDate === 'Invalid date'   
  ) {
    this.toast.warning('Please  Select UPS 1 KVA Manufacture Date');
    return false;
  }

  if (
    this.calibrationDetails.UPS1KVAImage === '' ||
    this.calibrationDetails.UPS1KVAImage === null ||
    this.calibrationDetails.UPS1KVAImage === undefined     
  ) {
    this.toast.warning('Please Upload UPS 1 KVA Image');
    return false;
  }
 }

 if (
  this.calibrationDetails.isBattery === '' ||
  this.calibrationDetails.isBattery === null ||
  this.calibrationDetails.isBattery === undefined     
) {
  this.toast.warning('Please Select Battery');
  return false;
}

 if(this.calibrationDetails.isBattery==='1')
 {
  if (
    this.calibrationDetails.BatteryMaker === '' ||
    this.calibrationDetails.BatteryMaker === null ||
    this.calibrationDetails.BatteryMaker === undefined
  ) {
    this.toast.warning('Please  Enter Battery KVA Maker');
    return false;
  }
  if (
    this.calibrationDetails.BatterySerialNo === '' ||
    this.calibrationDetails.BatterySerialNo === null ||
    this.calibrationDetails.BatterySerialNo === undefined
  ) {
    this.toast.warning('Please  Enter Battery Serial No');
    return false;
  }
  if (
    this.calibrationDetails.batteryKvaManufactureDate === '' ||
    this.calibrationDetails.batteryKvaManufactureDate === null ||
    this.calibrationDetails.batteryKvaManufactureDate === undefined  ||
    this.calibrationDetails.batteryKvaManufactureDate === 'Invalid date'   
  ) {
    this.toast.warning('Please  Select Battery KVA Manufacture Date');
    return false;
  }
  if (
    this.calibrationDetails.BatteryImage === '' ||
    this.calibrationDetails.BatteryImage === null ||
    this.calibrationDetails.BatteryImage === undefined     
  ) {
    this.toast.warning('Please Upload Battery Image');
    return false;
  }

 }

 if (
  this.calibrationDetails.is24Pin80ColMatrixPrinter === '' ||
  this.calibrationDetails.is24Pin80ColMatrixPrinter === null ||
  this.calibrationDetails.is24Pin80ColMatrixPrinter === undefined   
) {
  this.toast.warning('Please Select Printer');
  return false;
}

 if(this.calibrationDetails.is24Pin80ColMatrixPrinter==='1'){
  

  if (
    this.calibrationDetails.matrixPrinterMaker === '' ||
    this.calibrationDetails.matrixPrinterMaker === null ||
    this.calibrationDetails.matrixPrinterMaker === undefined   
  ) {
    this.toast.warning('Please Enter Matrix Printer Maker');
    return false;
  }

  if (
    this.calibrationDetails.matrixPrinterSerialNo === '' ||
    this.calibrationDetails.matrixPrinterSerialNo === null ||
    this.calibrationDetails.matrixPrinterSerialNo === undefined   
  ) {
    this.toast.warning('Please Enter Matrix Printer Serial No');
    return false;
  }

  if (
    this.calibrationDetails.matrixPrinterManufactureDate === '' ||
    this.calibrationDetails.matrixPrinterManufactureDate === null ||
    this.calibrationDetails.matrixPrinterManufactureDate === undefined  ||
    this.calibrationDetails.matrixPrinterManufactureDate === 'Invalid date'   
  ) {
    this.toast.warning('Please Enter Matrix Printer Manufacture Date');
    return false;
  }

  if (
    this.calibrationDetails.MatrixPrinterImage === '' ||
    this.calibrationDetails.MatrixPrinterImage === null ||
    this.calibrationDetails.MatrixPrinterImage === undefined     
  ) {
    this.toast.warning('Please Upload Matrix Printer Image');
    return false;
  }

 }

 if (
  this.calibrationDetails.isscaner === '' ||
  this.calibrationDetails.isscaner === null ||
  this.calibrationDetails.isscaner === undefined     
) {
  this.toast.warning('Please Select Scanner');
  return false;
}
  
if(this.calibrationDetails.isscaner==='1')
{
  
  if (
    this.calibrationDetails.matrixScanerMaker === '' ||
    this.calibrationDetails.matrixScanerMaker === null ||
    this.calibrationDetails.matrixScanerMaker === undefined     
  ) {
    this.toast.warning('Please Enter Matrix Scanner Maker');
    return false;
  }
  if (
    this.calibrationDetails.matrixScanerSerialNo === '' ||
    this.calibrationDetails.matrixScanerSerialNo === null ||
    this.calibrationDetails.matrixScanerSerialNo === undefined     
  ) {
    this.toast.warning('Please Enter Matrix Scanner Serial No');
    return false;
  }
  if (
    this.calibrationDetails.matrixScanerManufactureDate === '' ||
    this.calibrationDetails.matrixScanerManufactureDate === null ||
    this.calibrationDetails.matrixScanerManufactureDate === undefined  ||
    this.calibrationDetails.matrixScanerManufactureDate === 'Invalid date'   
  ) {
    this.toast.warning('Please  Select Matrix Scanner Manufacture Date');
    return false;
  }

  if (
    this.calibrationDetails.MatrixScanerImage === '' ||
    this.calibrationDetails.MatrixScanerImage === null ||
    this.calibrationDetails.MatrixScanerImage === undefined     
  ) {
    this.toast.warning('Please Upload Matrix Scanner Image');
    return false;
  }
}




if (
  this.calibrationDetails.isWebCam === '' ||
  this.calibrationDetails.isWebCam === null ||
  this.calibrationDetails.isWebCam === undefined     
) {
  this.toast.warning('Please Select WebCam');
  return false;
}

  if(this.calibrationDetails.isWebCam==='1'){
    
    if (
      this.calibrationDetails.matrixWebCamMaker === '' ||
      this.calibrationDetails.matrixWebCamMaker === null ||
      this.calibrationDetails.matrixWebCamMaker === undefined     
    ) {
      this.toast.warning('Please Enter Matrix WebCam Maker');
      return false;
    }
    if (
      this.calibrationDetails.matrixWebCamSerialNo === '' ||
      this.calibrationDetails.matrixWebCamSerialNo === null ||
      this.calibrationDetails.matrixWebCamSerialNo === undefined     
    ) {
      this.toast.warning('Please Enter Matrix WebCam Serial No');
      return false;
    }
    if (
      this.calibrationDetails.WebCamManufactureDate === '' ||
      this.calibrationDetails.WebCamManufactureDate === null ||
      this.calibrationDetails.WebCamManufactureDate === undefined  ||
      this.calibrationDetails.WebCamManufactureDate === 'Invalid date'   
    ) {
      this.toast.warning('Please  Select Matrix WebCam Manufacture Date');
      return false;
    }
    if (
      this.calibrationDetails.WebCamImgage === '' ||
      this.calibrationDetails.WebCamImgage === null ||
      this.calibrationDetails.WebCamImgage === undefined     
    ) {
      this.toast.warning('Please Upload Matrix WebCam Image');
      return false;
    }
  }
 
  if (
    this.calibrationDetails.internetDevice === '' ||
    this.calibrationDetails.internetDevice === null ||
    this.calibrationDetails.internetDevice === undefined     
  ) {
    this.toast.warning('Please Select Internet Device');
    return false;
  }
  if(this.calibrationDetails.internetDevice==='1'){

  
    
  
    if (
      this.calibrationDetails.internetDevMaker === '' ||
      this.calibrationDetails.internetDevMaker === null ||
      this.calibrationDetails.internetDevMaker === undefined     
    ) {
      this.toast.warning('Please Enter Dongle/Modem Maker');
      return false;
    }
  
    if (
      this.calibrationDetails.internetDevSerialNo === '' ||
      this.calibrationDetails.internetDevSerialNo === null ||
      this.calibrationDetails.internetDevSerialNo === undefined     
    ) {
      this.toast.warning('Please Enter Dongle/Modem Serial No');
      return false;
    }
    if (
      this.calibrationDetails.internetDevManufactureDate === '' ||
      this.calibrationDetails.internetDevManufactureDate === null ||
      this.calibrationDetails.internetDevManufactureDate === undefined  ||
      this.calibrationDetails.internetDevManufactureDate === 'Invalid date'   
    ) {
      this.toast.warning('Please  Select Dongle/Modem Manufacture Date');
      return false;
    }
  
    if (
      this.calibrationDetails.donglrOrModemImage === '' ||
      this.calibrationDetails.donglrOrModemImage === null ||
      this.calibrationDetails.donglrOrModemImage === undefined     
    ) {
      this.toast.warning('Please Upload Dongle/Modem Image');
      return false;
    }
  }
  if (
    this.calibrationDetails.isBiometricscanner === '' ||
    this.calibrationDetails.isBiometricscanner === null ||
    this.calibrationDetails.isBiometricscanner === undefined     
  ) {
    this.toast.warning('Please Select Biometric Scanner');
    return false;
  }
  if(this.calibrationDetails.isBiometricscanner==='1')
  {
    
    if (
      this.calibrationDetails.Biometricscannermaker === '' ||
      this.calibrationDetails.Biometricscannermaker === null ||
      this.calibrationDetails.Biometricscannermaker === undefined     
    ) {
      this.toast.warning('Please Enter Biometric Scanner Maker');
      return false;
    }
  
    if (
      this.calibrationDetails.BiometricscannerSerialNo === '' ||
      this.calibrationDetails.BiometricscannerSerialNo === null ||
      this.calibrationDetails.BiometricscannerSerialNo === undefined     
    ) {
      this.toast.warning('Please Enter Biometric Scanner Serial No');
      return false;
    }
  
    if (
      this.calibrationDetails.BiometricscannerManufactureDate === '' ||
      this.calibrationDetails.BiometricscannerManufactureDate === null ||
      this.calibrationDetails.BiometricscannerManufactureDate === undefined  ||
      this.calibrationDetails.BiometricscannerManufactureDate === 'Invalid date'   
    ) {
      this.toast.warning('Please Select Biometric Scanner Manufacture Date');
      return false;
    }
  
    if (
      this.calibrationDetails. BiometricscannerImage === '' ||
      this.calibrationDetails. BiometricscannerImage === null ||
      this.calibrationDetails. BiometricscannerImage === undefined     
    ) {
      this.toast.warning('Please Upload Biometric Scanner Image');
      return false;
    }
  }

  if (
    this.calibrationDetails.isTablet === '' ||
    this.calibrationDetails.isTablet === null ||
    this.calibrationDetails.isTablet === undefined     
  ) {
    this.toast.warning('Please Select Tablet');
    return false;
  }
  if(this.calibrationDetails.isTablet==='1')
  {
    if (
      this.calibrationDetails.Tabletmaker === '' ||
      this.calibrationDetails.Tabletmaker === null ||
      this.calibrationDetails.Tabletmaker === undefined     
    ) {
      this.toast.warning('Please Enter Tablet Maker');
      return false;
    }
    if (
      this.calibrationDetails.TabletSerialNo === '' ||
      this.calibrationDetails.TabletSerialNo === null ||
      this.calibrationDetails.TabletSerialNo === undefined     
    ) {
      this.toast.warning('Please Enter Tablet Serial No');
      return false;
    }
  
    if (
      this.calibrationDetails.TabletDate === '' ||
      this.calibrationDetails.TabletDate === null ||
      this.calibrationDetails.TabletDate === undefined  ||
      this.calibrationDetails.TabletDate === 'Invalid date'   
    ) {
      this.toast.warning('Please Select Tablet Manufacture Date');
      return false;
    } 
  
    if (
      this.calibrationDetails.TabletImage === '' ||
      this.calibrationDetails.TabletImage === null ||
      this.calibrationDetails.TabletImage === undefined     
    ) {
      this.toast.warning('Please Upload Tablet Image');
      return false;
    }
  }
  if (
    this.calibrationDetails.isBluetooththermalprinter === '' ||
    this.calibrationDetails.isBluetooththermalprinter === null ||
    this.calibrationDetails.isBluetooththermalprinter === undefined     
  ) {
    this.toast.warning('Please Select Bluetooth Thermal Printer');
    return false;
  }
  if(this.calibrationDetails.isBluetooththermalprinter==='1')
  {
    
    if (
      this.calibrationDetails.Bluetooththermalprintermaker=== '' ||
      this.calibrationDetails.Bluetooththermalprintermaker=== null ||
      this.calibrationDetails.Bluetooththermalprintermaker=== undefined     
    ) {
      this.toast.warning('Please Enter Bluetooth Thermal Printer Maker');
      return false;
    }
    if (
      this.calibrationDetails.BluetooththermalprinterSerialNo=== '' ||
      this.calibrationDetails.BluetooththermalprinterSerialNo=== null ||
      this.calibrationDetails.BluetooththermalprinterSerialNo=== undefined     
    ) {
      this.toast.warning('Please Enter Bluetooth Thermal Printer Serial No');
      return false;
    }
    if (
      this.calibrationDetails.BluetooththermalprinterDate === '' ||
      this.calibrationDetails.BluetooththermalprinterDate === null ||
      this.calibrationDetails.BluetooththermalprinterDate === undefined  ||
      this.calibrationDetails.BluetooththermalprinterDate === 'Invalid date'   
    ) {
      this.toast.warning('Please Select Bluetooth Thermal Printer Manufacture Date');
      return false;
    }
    if (
      this.calibrationDetails.BluetooththermalprinterImage === '' ||
      this.calibrationDetails.BluetooththermalprinterImage === null ||
      this.calibrationDetails.BluetooththermalprinterImage === undefined     
    ) {
      this.toast.warning('Please Upload Bluetooth Thermal Printer Image');
      return false;
    }
  }

  if (
    this.calibrationDetails.isBarcodescanner === '' ||
    this.calibrationDetails.isBarcodescanner === null ||
    this.calibrationDetails.isBarcodescanner === undefined     
  ) {
    this.toast.warning('Please Select Barcode Scanner');
    return false;
  }
  
  
  if(this.calibrationDetails.isBarcodescanner === '1')
  {

    if (
      this.calibrationDetails.Barcodescannermaker === '' ||
      this.calibrationDetails.Barcodescannermaker === null ||
      this.calibrationDetails.Barcodescannermaker === undefined     
    ) {
      this.toast.warning('Please Enter Barcode Scanner Maker');
      return false;
    }
    if (
      this.calibrationDetails.BarcodescannerSerialNo === '' ||
      this.calibrationDetails.BarcodescannerSerialNo === null ||
      this.calibrationDetails.BarcodescannerSerialNo === undefined     
    ) {
      this.toast.warning('Please Enter Barcode Scanner Serial No');
      return false;
    }
    if (
      this.calibrationDetails.BarcodescannerDate === '' ||
      this.calibrationDetails.BarcodescannerDate === null ||
      this.calibrationDetails.BarcodescannerDate === undefined  ||
      this.calibrationDetails.BarcodescannerDate === 'Invalid date'   
    ) {
      this.toast.warning('Please Select Barcode Scanner Manufacture Date');
      return false;
    }
    if (
      this.calibrationDetails.BarcodescannerImage === '' ||
      this.calibrationDetails.BarcodescannerImage === null ||
      this.calibrationDetails.BarcodescannerImage === undefined     
    ) {
      this.toast.warning('Please Upload Barcode Scanner Image');
      return false;
    }
  }



  if (
    this.calibrationDetails.isposdevice === '' ||
    this.calibrationDetails.isposdevice === null ||
    this.calibrationDetails.isposdevice === undefined   
  ) {
    this.toast.warning('Please Select POS Device');
    return false;
  }

  if(this.calibrationDetails.isposdevice==='1')
  {
    if (
      this.calibrationDetails.posdevicemaker === '' ||
      this.calibrationDetails.posdevicemaker === null ||
      this.calibrationDetails.posdevicemaker === undefined   
    ) {
      this.toast.warning('Please Enter POS Device Maker');
      return false;
    }
    if (
      this.calibrationDetails.posdeviceSerialNo === '' ||
      this.calibrationDetails.posdeviceSerialNo === null ||
      this.calibrationDetails.posdeviceSerialNo === undefined   
    ) {
      this.toast.warning('Please Enter POS Device Serial No');
      return false;
    }
    if (
      this.calibrationDetails.posdeviceDate === '' ||
      this.calibrationDetails.posdeviceDate === null ||
      this.calibrationDetails.posdeviceDate === undefined ||
      this.calibrationDetails.posdeviceDate === 'Invalid date'   
    ) {
      this.toast.warning('Please Select POS Device Manufacture Date');
      return false;
    }
    if (
      this.calibrationDetails.POSdeviceImage === '' ||
      this.calibrationDetails.POSdeviceImage === null ||
      this.calibrationDetails.POSdeviceImage === undefined         
    ) {
      this.toast.warning('Please Upload POS Device Image');
      return false;
    }

    

  }
  if (
    this.calibrationDetails.isPassbookprinter === '' ||
    this.calibrationDetails.isPassbookprinter === null ||
    this.calibrationDetails.isPassbookprinter === undefined   
  ) {
    this.toast.warning('Please Select Passbook Printer');
    return false;
  }


  if(this.calibrationDetails.isPassbookprinter==='1')
  {
    if (
      this.calibrationDetails.PassbookprinterMaker === '' ||
      this.calibrationDetails.PassbookprinterMaker === null ||
      this.calibrationDetails.PassbookprinterMaker === undefined   
    ) {
      this.toast.warning('Please Enter Passbook Printer Maker');
      return false;
    }
    if (
      this.calibrationDetails.PassbookprinterSerialNo === '' ||
      this.calibrationDetails.PassbookprinterSerialNo === null ||
      this.calibrationDetails.PassbookprinterSerialNo === undefined   
    ) {
      this.toast.warning('Please Enter Passbook Printer Serial No');
      return false;
    }
    if (
      this.calibrationDetails.PassbookprinterDate === '' ||
      this.calibrationDetails.PassbookprinterDate === null ||
      this.calibrationDetails.PassbookprinterDate === undefined ||
      this.calibrationDetails.PassbookprinterDate === 'Invalid date'   
    ) {
      this.toast.warning('Please Select Passbook Printer Manufacture Date');
      return false;
    }
    if (
      this.calibrationDetails.PassbookprinterImage === '' ||        //matrixScanerImgUpload
      this.calibrationDetails.PassbookprinterImage === null ||     //PassbookprinterImage
      this.calibrationDetails.PassbookprinterImage === undefined         
    ) {
      this.toast.warning('Please Upload Passbook Printer Image');
      return false;
    }

    

  }

  // if (
  //   this.calibrationDetails.isEleWeightScale === '' ||
  //   this.calibrationDetails.isEleWeightScale === null ||
  //   this.calibrationDetails.isEleWeightScale === undefined   
  // ) {
  //   this.toast.warning('Please Enter Electric Weight Scale');
  //   return false;
  // }
  // if (
  //   this.calibrationDetails.electronicWeightScaleMaker === '' ||
  //   this.calibrationDetails.electronicWeightScaleMaker === null ||
  //   this.calibrationDetails.electronicWeightScaleMaker === undefined   
  // ) {
  //   this.toast.warning('Please Enter Electric Weight Scale Maker');
  //   return false;
  // }

  // if (
  //   this.calibrationDetails.electronicWeightScaleSerialNo === '' ||
  //   this.calibrationDetails.electronicWeightScaleSerialNo === null ||
  //   this.calibrationDetails.electronicWeightScaleSerialNo === undefined   
  // ) {
  //   this.toast.warning('Please Enter Electric Weight Scale Serial No');
  //   return false;
  // }
  // if (
  //   this.calibrationDetails.EleWeightManufactureDate === '' ||
  //   this.calibrationDetails.EleWeightManufactureDate === null ||
  //   this.calibrationDetails.EleWeightManufactureDate === undefined ||
  //   this.calibrationDetails.EleWeightManufactureDate === 'Invalid date'   
  // ) {
  //   this.toast.warning('Please Select Electronic Weight Manufacture Date');
  //   return false;
  // }
  // if (
  //   this.calibrationDetails.ElectronicWeighImage === '' ||
  //   this.calibrationDetails.ElectronicWeighImage === null ||
  //   this.calibrationDetails.ElectronicWeighImage === undefined   
  // ) {
  //   this.toast.warning('Please Select Electronic Weight Image');
  //   return false;
  // }

  

  return true;
} 

async btnPDF(): Promise<void> {debugger;
  try {
    
    const req = { 
      type:"2",
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
CertifcateFile:any;
async onpdffileChange(event: any): Promise<void> {
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

        this.CertifcateFile = file;
        console.log(this.calibrationDetails.DesktopPhotoUpload);
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
