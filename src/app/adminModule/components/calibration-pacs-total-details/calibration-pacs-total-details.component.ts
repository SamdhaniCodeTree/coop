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
  selector: 'app-calibration-pacs-total-details',
  templateUrl: './calibration-pacs-total-details.component.html',
  styleUrls: ['./calibration-pacs-total-details.component.css']
})
export class CalibrationPacsTotalDetailsComponent implements OnInit, OnDestroy, AfterViewInit { 

  @Output() onNoofPacsChange = new EventEmitter<string>();
  // @Output() onNodalNoofPacsChange = new EventEmitter<string>();
  // @Output() onCCRcsNoofPacsChange = new EventEmitter<string>();
  @Input() fromDate:any;
  @Input() toDate:any;
  stateLevelDetails: any = [];
  valueHideshow: any;
  distcode: any;

  typeid: any;
  type: any;

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
  // async loadReport(): Promise<void> {
  //   try {
  //     debugger;  
  //     const req = {
  //       type:"17",
  //       input_09: "2024/11/01" ,                // this.fromDate,
  //       input_10:  "2024/11/26"                    //this.toDate
  //     };
  //     this.spinner.show();
  //     const response = await this.sharedAPI.TechManagerGet(req);

  //     debugger;
  //     this.spinner.hide();
  //     if (response.success) {
  //       debugger;
  //       this.excelData = [];

  //       this.stateLevelDetails = response.result; 
  //       this.excelData=this.stateLevelDetails;


         

  //   //     if (this.stateLevelDetails.length > 1) {
  //         // const firstRow = this.stateLevelDetails[0];
  //         // const remainingRows = this.stateLevelDetails.slice(1);
  //   // debugger;
  //         // this.differenceDetails.SELLER_NO_OF_PACS = firstRow.SELLER_NO_OF_PACS - remainingRows.reduce((acc:any, row:any) => acc + row.SELLER_NO_OF_PACS, 0);
  //         // this.differenceDetails.SELLER_AMOUNT =    firstRow.SELLER_AMOUNT - remainingRows.reduce((acc:any, row:any) => acc + row.SELLER_AMOUNT, 0);
  //         // this.differenceDetails.NODAL_AGENCY_NO_OF_PACS =    firstRow.NODAL_AGENCY_NO_OF_PACS - remainingRows.reduce((acc:any, row:any) => acc + row.NODAL_AGENCY_NO_OF_PACS, 0);
  //         // this.differenceDetails.NODAL_AGENCY_AMOUNT =  firstRow.NODAL_AGENCY_AMOUNT - remainingRows.reduce((acc:any, row:any) => acc + row.NODAL_AGENCY_AMOUNT, 0);
  //         // this.differenceDetails.CC_RCS_OFFICE_NO_OF_PACS =  firstRow.CC_RCS_OFFICE_NO_OF_PACS - remainingRows.reduce((acc:any, row:any) => acc + row.CC_RCS_OFFICE_NO_OF_PACS, 0);
  //         // this.differenceDetails.CC_RCS_OFFICE_AMOUNT =  firstRow.CC_RCS_OFFICE_AMOUNT - remainingRows.reduce((acc:any, row:any) => acc + row.CC_RCS_OFFICE_AMOUNT, 0);
  //         // Add similar calculations for other fields...
  //       // }
  //     } else {
  //       this.toast.info(response.message);
  //     }
  //     this.rerender();
  //   } catch (error) {
  //     this.spinner.hide();
  //     this.utils.catchResponse(error);
  //   }
  // }

  async loadReport(): Promise<void> {
    try {
      debugger;  
      const req = {
        type: 1,
        input_12: this.fromDate,
        input_13: this.toDate
      };
      this.spinner.show();
      const response = await this.sharedAPI.CalibrationPacsReports(req);
      debugger;
      this.spinner.hide();
      if (response.success) {  
        debugger;
        this.excelData = [];

        this.stateLevelDetails = response.result; 
        this.excelData=this.stateLevelDetails; 
      } else {
        this.toast.info(response.message);
      }
      this.rerender();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
  statusId: any;

  btnSellerDetails(obj: any): void {
    debugger;

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
       type:"26",
       statusId:this.statusId,
       fromDate:this.fromDate,
       toDate:this.toDate,
      // districtId:obj.DISTRICT_CODE
     };   
 
     const encryptedString = this.utils.encrypt(JSON.stringify(requestData));
     this.onNoofPacsChange.emit(encryptedString);
   }
   btnNodalAgencyDetails(obj: any): void {
    debugger;

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
       type:"27",
       statusId:this.statusId,
       fromDate:this.fromDate,
       toDate:this.toDate,
      // districtId:obj.DISTRICT_CODE
     };   
 
     const encryptedString = this.utils.encrypt(JSON.stringify(requestData));
     this.onNoofPacsChange.emit(encryptedString);
   }
   btnccrcsDetails(obj: any): void {
    debugger;

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
       type:"28",
       statusId:this.statusId,
       fromDate:this.fromDate,
       toDate:this.toDate,
      // districtId:obj.DISTRICT_CODE
     };   
 
     const encryptedString = this.utils.encrypt(JSON.stringify(requestData));
     this.onNoofPacsChange.emit(encryptedString);
   }

  btnExcelDownload(): void {
    this.utils.JSONToXlsxConvertor(
      this.excelData,
      'CALIBRATION PACS ABSTRACT REPORT' + this.Reportdate,
      true
    );
  }

  // async btnPDF(): Promise<void> {
  //   try {
  //     const req = {
  //       type: this.type,
  //       input_01: this.typeid,
  //       input_02: this.pdfdate

  //     };
  //     const fileName = 'CalibrationstateLevelAbstractReport' + this.Reportdate;
  //     let basePDF = '';
  //     this.spinner.show();
  //     const res = await this.allotmentAPI.CalibrationAbstractReport(req);
  //     if (res.success) {
  //       basePDF = res.result;
  //       this.utils.downloadPdfFile(basePDF, fileName);
  //     } else {
  //       this.toast.info(res.message);
  //     }
  //     this.spinner.hide();
  //   } catch (error) {
  //     this.spinner.hide();
  //     this.utils.catchResponse(error);
  //   }
  // }

  async btnPDF(): Promise<void> {
    try { 
        const req = {
          type: 1,
          input_01: this.pdfdate,
          input_12: this.fromDate,
          input_13: this.toDate
        };
      const fileName = 'HARDWAREPAYMENTTOTALREPORT' + this.Reportdate;
      let basePDF = '';
      this.spinner.show();
      const res = await this.sharedAPI.HardwarePaymentTotalReport(req);
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




}
