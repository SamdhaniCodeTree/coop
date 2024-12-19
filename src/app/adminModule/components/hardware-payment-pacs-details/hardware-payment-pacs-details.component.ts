import { formatDate } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { PacsLandAllotmentService } from 'src/app/reportsModule/pacsLandAllotment/services/pacs-land-allotment.service';
import { SessionService } from 'src/app/sharedModule/services/session.service';
import { SharedService } from 'src/app/sharedModule/services/shared.service';
import { ToasterService } from 'src/app/sharedModule/services/toaster.service';
import { UtilsService } from 'src/app/sharedModule/services/utils.service';

@Component({
  selector: 'app-hardware-payment-pacs-details',
  templateUrl: './hardware-payment-pacs-details.component.html',
  styleUrls: ['./hardware-payment-pacs-details.component.css']
})
export class HardwarePaymentPacsDetailsComponent implements OnInit, OnDestroy, AfterViewInit { 
  @Output() onPacsChange=new EventEmitter<string>();
  


   @Input() type:any;
@Input() statusId:any;
@Input() districtId:any;
@Input() fromDate:any;
@Input() toDate:any;

   stateLevelDetails: any = [];
   valueHideshow: any;
   distcode: any;
 
   typeid: any;
  // type: any;
 
   districthide: boolean = false;
   dccbshide: boolean = false; 
   excelData: any[] = [];
 
   differenceDetails: any = {};
 
   
 
   Reportdate: any; today = new Date();
   pdfdate: any;
   @ViewChild(DataTableDirective, { static: false })
   dtElement!: DataTableDirective;
 
   dtOptions: DataTables.Settings = this.utils.dataTableOptions();
   dtTrigger: Subject<any> = new Subject();
 
   constructor(
     private spinner: NgxSpinnerService,
     private toast: ToasterService,
     private allotmentAPI: PacsLandAllotmentService,
     private utils: UtilsService,
     private session: SessionService,
     private sharedAPI: SharedService,
   ) { }
 
   ngOnInit(): void {
 
     this.Reportdate = formatDate(this.today, 'ddMMyyyyhhmmssa', 'en-US', '+0530');
     this.pdfdate = formatDate(this.today,'dd-MM-yyyy hh:mm:ssa', 'en-US', '+0530');
    this.loadReport();    
   } 
   districtname:any;
  //  async loadReport(): Promise<void> {
  //    try {
     
       
        
  //      debugger;
  //      const req = {
  //        type:this.type,
  //        input_01: this.statusId,
  //        input_02: this.districtId,
  //      };
  //      this.spinner.show();
  //      const response = await this.sharedAPI.TechManagerGet(req);
 
  //      debugger;
  //      this.spinner.hide();
  //      if (response.success) {
  //        debugger;
  //        this.excelData = [];
 
  //        this.stateLevelDetails = response.result; 
  //         this.excelData=this.stateLevelDetails;
  //        this.districtname=response.result[0].DISTRICT_NAME;
  //       // this.excelData.push(this.reportTotals);
  //      } else {
  //        this.toast.info(response.message);
  //      }
  //      this.rerender();
  //    } catch (error) {
  //      this.spinner.hide();
  //      this.utils.catchResponse(error);
  //    }
  //  }

  async loadReport(): Promise<void> {
       try { 
         debugger;
         const req = {
           type:this.type,
           input_01: this.statusId,
           input_02: this.districtId,
           input_12:this.fromDate,
           input_13:this.toDate,
         };
         this.spinner.show();
        // const response = await this.sharedAPI.TechManagerGet(req);
        const response = await this.sharedAPI.CalibrationPacsReports(req);
   
         debugger;
         this.spinner.hide();
         if (response.success) {
           debugger;
           this.excelData = [];
   
           this.stateLevelDetails = response.result; 
            this.excelData=this.stateLevelDetails;
           this.districtname=response.result[0].DISTRICT_NAME;
          // this.excelData.push(this.reportTotals);
         } else {
           this.toast.info(response.message);
         }
         this.rerender();
       } catch (error) {
         this.spinner.hide();
         this.utils.catchResponse(error);
       }
     }
 
   btnExcelDownload(): void {
     this.utils.JSONToXlsxConvertor(
       this.excelData,
       'HARDWARE PAYMENT TOTAL REPORT' + this.Reportdate,
       true
     );
   }
 
   async btnPDF(): Promise<void> {
    try { 
        const req = { 
            type:this.type,
            input_03:this.pdfdate,
            input_02:this.districtId,
            input_01:this.statusId,
            input_04:this.fromDate,
            input_05:this.toDate,
            input_06:this.districtname 
        };
      const fileName = 'HARDWAREPAYMENTTOTALREPORT' + this.Reportdate;
      let basePDF = '';
      this.spinner.show();
      const res = await this.sharedAPI.TransactionidHardwarePaymentReport(req);
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
 
 
   password: string = '';
   passwordFieldType: string = 'password'; // Set the default type to 'password'
 
   togglePasswordVisibility() {
     this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
   }
 
 
   btnPacsDetails(obj: any): void {
     if(obj.PARTICULARS=="TOTAL NO OF PACS PAYMENT REQUESTS MADE"){
       this.statusId = 1; 
     }
     else if(obj.PARTICULARS=="TOTAL NO OF PACS PAYMENT REQUESTS GOT REJECTED"){
       this.statusId = 2; 
     }
     else if(obj.PARTICULARS=="TOTAL NO OF PACS PAYMENT REQUESTS UNDER PROCESS"){
       this.statusId = 3; 
     }
     else if(obj.PARTICULARS=="TOTAL NO OF PACS PAYMENT REQUESTS GOT APPROVED"){
       this.statusId = 4; 
     }
     else if(obj.PARTICULARS=="BALANCE NO. OF PACS PAYMENT REQUESTS PENDING"){
       this.statusId = 5; 
     }
     
 
      const requestData = {
        type:"29",
        statusId:this.statusId,
        districtId:obj.DISTRICT_CODE
      };   
  
      const encryptedString = this.utils.encrypt(JSON.stringify(requestData));
      this.onPacsChange.emit(encryptedString);
    }
 
 
 }
 
