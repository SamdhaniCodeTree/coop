import { AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { LoginService } from 'src/app/loginModule/services/login.service';
import { MpfcLandInspectionService } from 'src/app/reportsModule/mpfcLandInspection/services/mpfc-land-inspection.service';
import { SessionService } from 'src/app/sharedModule/services/session.service';
import { SharedService } from 'src/app/sharedModule/services/shared.service';
import { ToasterService } from 'src/app/sharedModule/services/toaster.service';
import { UtilsService } from 'src/app/sharedModule/services/utils.service';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';


@Component({
  selector: 'app-technicial-manager',
  templateUrl: './technicial-manager.component.html',
  styleUrls: ['./technicial-manager.component.css']
})
export class TechnicialManagerComponent implements OnInit, OnDestroy, AfterViewInit {
  // tslint:disable-next-line: no-output-on-prefix
  type = '';
  districtId = '';
  @Output() onDistrictChange = new EventEmitter<string>();
   DEVICEDETAILSLIST: any = [];
   CalibrationDeviceList: any = [];
  selectedRecords: any[] = [];
  DCCBLIST: any[] = [];
  EQUIPMENTLIST: any[] = []; 
  AadharotpResult: any[] = []; 

  dccbid:any;
  equipmentid:any;
  Remarks:any;
  userAadharNo:any;
  Aadharotp:any;
  aadharResult:any;
  totalSum=0;

  selectedCount=0;

  userrole = ''; 
  excelData: any[] = [];
  allSelected = false;
  isSubmitVisible = false;  
  DeviceDetailsshow = false;  
  TeckDetailsshow = false;  
  resendotpshow = false;  
  resendotpshow1 = false;  
  sendotpdsiable = false;  
  aadhardisable = false;  
  hideotp = false;  

  ShowRejectPopup = false;
  ShowApprovePopup = false;  

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;

  dtOptions: DataTables.Settings = this.utils.dataTableOptions();
  dtTrigger: Subject<any> = new Subject();
    ngxToaster: any;
  constructor(
      private spinner: NgxSpinnerService,
      private toast: ToasterService,
      private inspectionAPI: MpfcLandInspectionService,
      private utils: UtilsService,
      private session: SessionService,
      private sharedAPI: SharedService,
      private loginAPI: LoginService,
  ) {
      this.userrole = this.session.role;;
  }

  ngOnInit(): void { 
      this.LoadDccbs();
      this.LoadDevices();
  }


  
  async LoadDccbs(): Promise<void> {
    try {   debugger;
        const req = {
            type: "1",
        };
        this.spinner.show();
       // const res = await this.inspectionAPI.TechManagerGet(req);
        const res = await this.sharedAPI.TechManagerGet(req);
        if (res.success) {
           this.DCCBLIST = res.result;  
        } else {
            this.toast.info(res.message);
        }
        this.spinner.hide();
    } catch (error) {
        this.spinner.hide();
        this.utils.catchResponse(error);
    }
}
  async LoadDevices(): Promise<void> {
    try {  
        const req = {
            type: "2",
        };
        this.spinner.show();
        //const res = await this.inspectionAPI.TechManagerGet(req);
        const res = await this.sharedAPI.TechManagerGet(req);
        if (res.success) {
           this.EQUIPMENTLIST = res.result;  
        } else {
            this.toast.info(res.message);
        }
        this.spinner.hide();
    } catch (error) {
        this.spinner.hide();
        this.utils.catchResponse(error);
    }
}

  async GetDetails(): Promise<void> { 

    this.selectedRecords = [];
    if(this.dccbid == null || this.dccbid == "" || this.dccbid == undefined ){
        this.toast.info("Please Select DCCB Name");
        return;
    } 

    this.DEVICEDETAILSLIST = [];
      try { 
          const req = {
              type: "3",
              input_01: this.dccbid, 
          };
          this.spinner.show();
         //const response = await this.inspectionAPI.TechManagerGet(req);
          const response = await this.sharedAPI.TechManagerGet(req);
          this.spinner.hide();
          debugger;
          if (response.success) { 
           
              this.DEVICEDETAILSLIST = response.result; 
              this.TeckDetailsshow=true;
             this.selectedCount=0;
             this.totalSum=0;
          } else {
              //this.toast.info(response.message);
              this.toast.info("CEO Not Authorized Any PACS ...!!");
          }
         // this.rerender();
      } catch (error) {
          this.spinner.hide();
          this.utils.catchResponse(error); 
      }
  }

  onClear() {
    this.DeviceDetailsshow = false;
    this.TeckDetailsshow = true;
    //this.GetDetails();
   // this.CalibrationDeviceList=[];
  }

  async DeviceGetDetails(obj:any): Promise<void> { 
     debugger;
      try { 
          const req = {
              type: "9",
              pacs_id: obj, 
          };
          this.spinner.show();
         //const response = await this.inspectionAPI.TechManagerGet(req);
          const response = await this.sharedAPI.TechManagerGet(req);
          this.spinner.hide();
          debugger;
          if (response.success) { 
              this.CalibrationDeviceList = response.result; 
             
             
          } else {
              this.toast.info(response.message);
          }
         // this.rerender();
      } catch (error) {
          this.spinner.hide();
          this.utils.catchResponse(error);
      }
  }
  packid:any;
  async btnGetDetails(obj:any):Promise<void>{
this.packid=obj.PACS_CODE;
    this.DeviceGetDetails(obj.PACS_CODE);
this.DeviceDetailsshow=true;
  }


  btnExcelDownload(): void {
      this.utils.JSONToCSVConvertor(
          this.excelData,
          'Technicial Manager Reports',
          true
      );
  }

  async btnPDF(): Promise<void> {
      try {
          const fileName = 'stateLevelLandInspection';
          let basePDF = '';
          this.spinner.show();
          const req = {
              type: "1",
          };
          const res = await this.inspectionAPI.mpfcLandInspectionStateReport(req);
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

  async btnPdfView(path: string): Promise<void> {
    try {
      debugger;
      await this.utils.viewJPVPDFcop(path);
     // await this.utils.viewJPVPDFcopcrystal(path);
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  } 

  async btnPhotoView(path: string): Promise<void> {
    try {
      debugger;
       await this.utils.viewJPVImagecop(path);
      // await this.utils.viewImage(path);
       
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

  selectAll(event: Event): void {
      debugger
      this.allSelected = (event.target as HTMLInputElement).checked;
      this.DEVICEDETAILSLIST.forEach((record: { selected: boolean; }) => record.selected = this.allSelected);
      this.updateSubmitVisibility();

      this.calculateSum();
      this.countSelected();

  }

  updateSubmitVisibility(): void {
      this.isSubmitVisible = this.DEVICEDETAILSLIST.some((record: { selected: any; }) => record.selected);       

      //this.DEVICEDETAILSLIST[0][obj.ACK_NO];
      this.calculateSum();
      this.countSelected();
  }
Value=0
  calculateSum(): void {
    this.totalSum = this.DEVICEDETAILSLIST
      .filter((record: { selected: boolean; }) => record.selected) // Only sum the selected records
      .reduce((acc: number, record: { TOTAL_GST_AMOUNT: number; }) => acc + Number(record.TOTAL_GST_AMOUNT),this.Value); // Sum the ACK_NO values
}
countSelected(): void {
    this.selectedCount = this.DEVICEDETAILSLIST
      .filter((record: { selected: boolean; }) => record.selected) // Filter only selected records
      .length; // Count the number of selected records
}

async btnSubmitView():Promise<void> { 

    this.ShowApprovePopup = true;
}


  async btnSubmit():Promise<void> { 
    try { 
        // if (this.CertifcateFile === '' || this.CertifcateFile === null || this.CertifcateFile === undefined) {
        //     this.toast.info("Payment Request Pdf File Upload");
        //     return;
        //   }
    this.selectedRecords = this.DEVICEDETAILSLIST.filter((record: { selected: any; }) => record.selected);
    //console.log(this.selectedRecords);
debugger;


    const devicedetails = this.selectedRecords.map(device => ({
        pacs_name: device.PACS_NAME || '',
        pacs_code: device.PACS_CODE || '', 
        serial_number: device.TOTAL_GST_AMOUNT || '',  
      }));

      //console.log(devicedetailslist); 

        const req = {
            type: "2",
            devicedetailslist:devicedetails,
            input02:this.selectedCount,
            input03:this.totalSum,
            role:this.session.role,
            inserted_by: this.session.userName, 
            unique_id: this.session.uniqueId,
            input04:this.userAadharNo
        };
        this.spinner.show();
        const response = await this.inspectionAPI.TechManagerDetailsIns(req);
        //const response = await this.sharedAPI.Hrmsemp(req);
        this.spinner.hide();
        debugger;
        if (response.success) { 
            if(response.result[0].STATUS == '1'){
            this.toast.successNavigate("OTP Verified & Data Submitted Successfully..!!!");
            }
            else if(response.result[0].STATUS == '2'){
                this.toast.infoNavigate("Data Already Submitted");
            }
            else{
                this.toast.infoNavigate(response.message); 
            }
        } else {
            this.toast.info(response.message);
        } 
    } catch (error) {
        this.spinner.hide();
        this.utils.catchResponse(error);
    }


    }

formatIndianNumber(value: number): string {
    if (isNaN(value)) {
        return '';
    }

    let [integerPart, decimalPart] = value.toString().split('.');
    let result = '';

    // Handle the integer part
    if (integerPart.length > 3) {
        // The last three digits (hundreds)
        result = integerPart.slice(-3);
        integerPart = integerPart.slice(0, -3);

        // Group the rest in pairs of two
        while (integerPart.length > 0) {
            result = integerPart.slice(-2) + ',' + result;
            integerPart = integerPart.slice(0, -2);
        }
    } else {
        result = integerPart;
    }

    // Remove leading comma if necessary
    result = result.replace(/^,/, '');

    // Handle decimal part
    if (decimalPart) {
        result += '.' + decimalPart;
    }

    return result;
    }


shouldShowRowspan(index: number, field: string): boolean {
    debugger;
    if (index === 0) {
        return true;
    }
    return this.CalibrationDeviceList[index][field] !== this.CalibrationDeviceList[index - 1][field];
}

// Function to calculate how many rows the cell should span
getRowspan(index: number, field: string): number {
    debugger;
    let rowspan = 1;
    for (let i = index + 1; i < this.CalibrationDeviceList.length; i++) {
        if (this.CalibrationDeviceList[i][field] === this.CalibrationDeviceList[index][field]) {
            rowspan++;
        } else {
            break;
        }
    }
    return rowspan;
}



// getRowSpan(index: number): number {
//     if (index === 0 || this.CalibrationDeviceList[index].category !== this.CalibrationDeviceList[index - 1].category) {
//       return this.CalibrationDeviceList.filter(item => item.category === this.CalibrationDeviceList[index].category).length;
//     }
//     return 0;
//   }

CertifcateFile:any;
async onpdffileChange(event: any): Promise<void> {
  try {  debugger;
    this.CertifcateFile="";
    if (event.target.files.length > 0) {

      if (event.target.files[0].type === 'application/pdf') {
      const response: any = await this.utils.fileUploadEncodedString(
        event,
        this.utils.fileSize.oneMB
      );
      if (response) {
        
          
let file=response;
      //   let file = (
      //     this.sanitizer.bypassSecurityTrustResourceUrl(response) as any
      //   ).changingThisBreaksApplicationSecurity;
        file = file.replace('data:application/pdf;base64,', '');
        debugger;
        this.CertifcateFile= file;
      } else {
        this.ngxToaster.warning('file is Empty !!!, Please try again.');        
        event.target.value = '';
      }
    }
    else{
      alert('Accept Only Pdf files Only..');
      this.CertifcateFile="";
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


btnReject(){ 

   // alert("working in Process ..!!");

    if(this.isSubmitVisible == true) {
         this.ShowRejectPopup = true;
     }
     else{
     this.ShowRejectPopup = false;
     this.toast.info("Please check the checkbox to Reject the Data ..!!!")
     }
}
onClear1(){
 this.ShowRejectPopup = false;
}
onClear2(){
 this.ShowApprovePopup = false;
 this.userAadharNo = "";
 this.Aadharotp = "";
 this.resendotpshow=false;
this.countdown=0;
this.aadhardisable=false;
this.sendotpdsiable=false;
this.hideotp=false;
}
async btnRejectSubmit():Promise<void>{  debugger;

 this.selectedRecords = this.DEVICEDETAILSLIST.filter((record: { selected: any; }) => record.selected);

 const devicedetails = this.selectedRecords.map(device => ({                       
     pacs_code: device.PACS_CODE || '', 
   }));

 try {           debugger;
  const req = {
     type:"5",
     devicedetailslist : devicedetails,
     input02:"9",
     input04:this.Remarks,
     inserted_by:this.session.userName,
     role:this.session.role,
  }

  this.spinner.show(); 
   const response = await this.inspectionAPI.TechManagerDetailsupdate(req);
   this.spinner.hide();
   debugger;
   if (response.success) { 
      // this.PACSDETAILSLIST = response.result;
       this.toast.successNavigate("Details Rejected Successfully ..!!!");
   } else {
       this.toast.info(response.message);
   } 
} catch (error) {
   this.spinner.hide();
   this.utils.catchResponse(error);
}
}

async btnAadhar_Status(): Promise<void> {
    try {
 
      const response = this.utils.validateVerhoeff(this.userAadharNo);    //this.uidNum
      if (response == true) {
        this.spinner.hide(); 
      } 
      else {
        this.userAadharNo='';
               this.toast.info("Invalid Aadhar Number...!");
        this.spinner.hide(); 
      } 
      const req = {
        type:'4',
        userName: this.userAadharNo,
        password: this.session.role
      };

      this.spinner.show();
      const res: any = await this.loginAPI.AadharStatus(req);
      this.spinner.hide();
      debugger;
      if(res.success){


       if(res.result[0].STATUS=='1')
       { 
        this.btnAadharsendotp();
        this.spinner.hide();
           this.toast.success('OTP Sent Successfully');
       }
       else{ 
        this.toast.info('Enter Valid Aadhar Number ...!');
        this.spinner.hide();
       }

      }
     
    } catch (error: any) { 
      alert(error.error.error_description);
      this.spinner.hide();
    }
  }


  async btnAadharsendotp():Promise<void>{
    //this.Aadhar_login();
    debugger;
   
    //this.spinner.show();
    const req = {
     // uid:'736274683579',
      uid:this.userAadharNo,
      FLAG: 'OTPGENERATE',
      
    };
     
    const res: any = await this.loginAPI.CeoAadharotp1(req); 
   
    if (res.success) {  debugger;
     //  this.Aadhar_Status();
this.AadharotpResult=res.result;

this.aadharResult = this.AadharotpResult;

this.resendotpshow = true;
this.sendotpdsiable = true;
this.aadhardisable = true;
this.hideotp=true;

this.startCountdown();
      
   // this.spinner.hide();
     //  this.toast.success(res.message);
     // console.log(res);
    }
  else{ debugger;
    this.toast.success(res.message);
  }

  }


  async btnVerifySubmit():Promise<void>{

    if(this.Aadharotp===null || this.Aadharotp==="" || this.Aadharotp===undefined){
      this.toast.info("Please Enter OTP");
      return;
    } 
    
        const req = {
         
           uid:this.userAadharNo,
           FLAG: 'OTPVALIDATE',
           PIDXML:this.AadharotpResult,
           otp:this.Aadharotp
           
         };
         debugger;
        // this.spinner.show();
         const res: any = await this.loginAPI.CeoAadharotp1(req);
        // this.spinner.hide();
         debugger;
         if (res.success) {
              this.AadharotpResult=res.result; 
          
              this.btnSubmit(); 
         }else{ 
          this.toast.info("Please Enter Valid OTP");
         }  
      }


        aadharNumber: string = '';
    maskedAadhar: string = '';

    onInput(event: Event) {
        debugger;
        this.aadharNumber = this.utils.ValueGet(event);

    }
    onFocus(): void {
        debugger;
        this.maskedAadhar = this.aadharNumber;
    }
    onBlur(): void {
        this.maskedAadhar = this.utils.maskAadharNumber(this.aadharNumber);  // Mask the Aadhar number on blur
    }

countdown: number = 60;

startCountdown() {
  const timer$ = interval(1000).pipe(take(60)); // Emit every second, take only 60 emissions

  timer$.subscribe((elapsed) => {
    this.countdown = 60 - elapsed - 1;  // Update countdown (subtract elapsed time)

    if(this.countdown.valueOf()== 0){
      this.resendotpshow1= true;
    }

   
  });
}

}