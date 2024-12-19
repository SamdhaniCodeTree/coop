import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject, interval } from 'rxjs';
import { take } from 'rxjs/operators';
import { CeoService } from 'src/app/ceoModule/services/ceo.service';
import { LoginService } from 'src/app/loginModule/services/login.service';
import { MpfcLandInspectionService } from 'src/app/reportsModule/mpfcLandInspection/services/mpfc-land-inspection.service';
import { SessionService } from 'src/app/sharedModule/services/session.service';
import { SharedService } from 'src/app/sharedModule/services/shared.service';
import { ToasterService } from 'src/app/sharedModule/services/toaster.service';
import { UtilsService } from 'src/app/sharedModule/services/utils.service';

@Component({
  selector: 'app-internet-verification',
  templateUrl: './internet-verification.component.html',
  styleUrls: ['./internet-verification.component.css']
})
export class InternetVerificationComponent implements OnInit {

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
      private ceoAPI: CeoService,
  ) {
      this.userrole = this.session.role;;
  }

  ngOnInit(): void { 
    this.LoadReport();
     // this.LoadDccbs();
     // this.LoadDevices();
  }

  async LoadReport(): Promise<void> {  
    try { 
      this.selectedRecords = [];
      this.DEVICEDETAILSLIST=[];
        const req = {
            type: "7", 
        };
        
        this.spinner.show();
       //const response = await this.inspectionAPI.TechManagerGet(req);
        const response = await this.ceoAPI.InternetGetDetails(req);
        this.spinner.hide();
        debugger;
        if (response.success) { 
            this.DEVICEDETAILSLIST = response.result;  
            this.excelData=this.DEVICEDETAILSLIST;
            this.TeckDetailsshow=true;
            this.selectedCount=0;
        }
         else {
            this.toast.info(response.message);
        }
        //this.rerender();
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

//   async DeviceGetDetails(obj:any): Promise<void> { 
//      debugger;
//       try { 
//           const req = {
//               type: "9",
//               pacs_id: obj, 
//           };
//           this.spinner.show();
//          //const response = await this.inspectionAPI.TechManagerGet(req);
//           const response = await this.sharedAPI.TechManagerGet(req);
//           this.spinner.hide();
//           debugger;
//           if (response.success) { 
//               this.CalibrationDeviceList = response.result; 
             
             
//           } else {
//               this.toast.info(response.message);
//           }
//          // this.rerender();
//       } catch (error) {
//           this.spinner.hide();
//           this.utils.catchResponse(error);
//       }
//   }
//   packid:any;
//   async btnGetDetails(obj:any):Promise<void>{
// this.packid=obj.PACS_CODE;
//     this.DeviceGetDetails(obj.PACS_CODE);
// this.DeviceDetailsshow=true;
//   }


  btnExcelDownload(): void {
      this.utils.JSONToCSVConvertor(
          this.excelData,
          'Technicial Manager Reports',
          true
      );
  }

  // async btnPDF(): Promise<void> {
  //     try {
  //         const fileName = 'stateLevelLandInspection';
  //         let basePDF = '';
  //         this.spinner.show();
  //         const req = {
  //             type: "1",
  //         };
  //         const res = await this.inspectionAPI.mpfcLandInspectionStateReport(req);
  //         if (res.success) {
  //             basePDF = res.result;
  //             this.utils.downloadPdfFile(basePDF, fileName);
  //         } else {
  //             this.toast.info(res.message);
  //         }
  //         this.spinner.hide();
  //     } catch (error) {
  //         this.spinner.hide();
  //         this.utils.catchResponse(error);
  //     }
  // }

  // async btnPdfView(path: string): Promise<void> {
  //   try {
  //     debugger;
  //     await this.utils.viewJPVPDFcop(path);
  //    // await this.utils.viewJPVPDFcopcrystal(path);
  //   } catch (error) {
  //     this.spinner.hide();
  //     this.utils.catchResponse(error);
  //   }
  // } 

  // async btnPhotoView(path: string): Promise<void> {
  //   try {
  //     debugger;
  //      await this.utils.viewJPVImagecop(path);
  //     // await this.utils.viewImage(path);
       
  //   } catch (error) {
  //     this.spinner.hide();
  //     this.utils.catchResponse(error);
  //   }
  // } 

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
      this.countSelected();

  }

  updateSubmitVisibility(): void {
      this.isSubmitVisible = this.DEVICEDETAILSLIST.some((record: { selected: any; }) => record.selected);            
      
      this.countSelected();
  }

countSelected(): void {
    this.selectedCount = this.DEVICEDETAILSLIST
      .filter((record: { selected: boolean; }) => record.selected) // Filter only selected records
      .length; // Count the number of selected records
}

async btnSubmitView():Promise<void> { 

   // this.ShowApprovePopup = true;
   this.btnSubmit();
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
  async btnPdfViewCrystal(path: string): Promise<void> {
    try { 
      debugger;
      await this.utils.viewJPVPDFcopcrystal(path);
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  } 


  async btnSubmit():Promise<void> { 
    try { 
         
    this.selectedRecords = this.DEVICEDETAILSLIST.filter((record: { selected: any; }) => record.selected);
    //console.log(this.selectedRecords);
debugger;


    const devicedetails = this.selectedRecords.map(device => ({
        pacs_name: device.PACS_NAME || '',
        pacs_code: device.PACS_CODE || '', 
        //serial_number: device.TOTAL_GST_AMOUNT || '',  
      }));

      //console.log(devicedetailslist); 

        const req = {
                        type:"8",
          devicedetailslist : devicedetails,
          input01:"",
         num1:"3",     
         inserted_by:this.session.userName,
          role:this.session.role,
        };
        this.spinner.show();
        const response = await this.inspectionAPI.InternetDetailsIns(req);
        //const response = await this.sharedAPI.Hrmsemp(req);
        this.spinner.hide();
        debugger;
        if (response.success) { 
            if(response.result[0].STATUS == '1'){
            this.toast.successNavigate("Data Submitted Successfully..!!!");
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
  this.Remarks='';
 this.ShowRejectPopup = false;
}
 
async btnRejectSubmit():Promise<void>{  

  if(this.Remarks=="" || this.Remarks ==undefined )
  {
    this.toast.info("Please Enter Remarks");
    return;
  }

 this.selectedRecords = this.DEVICEDETAILSLIST.filter((record: { selected: any; }) => record.selected);

 const devicedetails = this.selectedRecords.map(device => ({                       
     pacs_code: device.PACS_CODE || '', 
   }));

 try {           debugger;
  const req = {
     type:"8",
     devicedetailslist : devicedetails,
     input01:this.Remarks,
     num1:"4",     
     inserted_by:this.session.userName,
     role:this.session.role,
  }

  this.spinner.show(); 
   const response = await this.inspectionAPI.InternetDetailsIns(req);
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

 


 
 

}
