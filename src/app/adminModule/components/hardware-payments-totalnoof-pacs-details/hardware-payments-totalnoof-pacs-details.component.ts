import { formatDate } from '@angular/common';
import { AfterViewInit, Component, Input, OnDestroy, OnInit, Output, ViewChild,EventEmitter } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { PacsLandAllotmentService } from 'src/app/reportsModule/pacsLandAllotment/services/pacs-land-allotment.service';
import { SessionService } from 'src/app/sharedModule/services/session.service';
import { SharedService } from 'src/app/sharedModule/services/shared.service';
import { ToasterService } from 'src/app/sharedModule/services/toaster.service';
import { UtilsService } from 'src/app/sharedModule/services/utils.service';
 

@Component({
  selector: 'app-hardware-payments-totalnoof-pacs-details',
  templateUrl: './hardware-payments-totalnoof-pacs-details.component.html',
  styleUrls: ['./hardware-payments-totalnoof-pacs-details.component.css']
})
export class HardwarePaymentsTotalnoofPacsDetailsComponent implements OnInit, OnDestroy, AfterViewInit { 
 @Output() onPacsChange=new EventEmitter<string>();
  @Input() type:any;
  @Input() statusId:any;
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

  reportTotals = {
    S_NO: '-',
    DISTRICT_NAME: 'TOTAL',
    NAME_OF_THE_DCCB:  0,
    REQUESTS: 0,
    NO_OF_TRANSACTION_IDS: 0,
    AMOUNT: 0, 
  };

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
debugger;
    this.Reportdate = formatDate(this.today, 'ddMMyyyyhhmmssa', 'en-US', '+0530');

    this.pdfdate = formatDate(this.today, 'dd-MM-yyyy hh:mm:ssa', 'en-US', '+0530');
   this.loadReport();    
  } 
  pacsTypeid:any;
  // async loadReport(): Promise<void> {
  //   try {
  //   if(this.type=="26")
  //   {
  //     this.pacsTypeid=29;
  //   }
  //   else if(this.type=="27")
  //   {
  //     this.pacsTypeid=30;
  //   }
  //   else if(this.type=="28")
  //   {
  //     this.pacsTypeid=31;
  //   }

  //     this.reportTotals = {
  //       S_NO: '-',
  //       DISTRICT_NAME: 'TOTAL',
  //       NAME_OF_THE_DCCB:  0,
  //       REQUESTS: 0,
  //       NO_OF_TRANSACTION_IDS: 0,
  //       AMOUNT: 0, 
  //     };
       
  //     debugger;
  //     const req = {
  //       type:this.type,
  //       input_01: this.statusId,
  //       input_09: this.fromDate,
  //       input_10: this.toDate,
  //     };
  //     this.spinner.show();
  //     const response = await this.sharedAPI.TechManagerGet(req);

  //     debugger;
  //     this.spinner.hide();
  //     if (response.success) {
  //       debugger;
  //       this.excelData = [];

  //       this.stateLevelDetails = response.result; 
  //       // this.excelData=this.stateLevelDetails;
  //       for (let i = 0; i < this.stateLevelDetails.length; i++) {
  //         // tslint:disable-next-line: radix
  //         this.reportTotals.NAME_OF_THE_DCCB += parseInt(
  //           this.stateLevelDetails[i].NAME_OF_THE_DCCB
  //         );
  //         this.reportTotals.REQUESTS += parseInt(
  //           this.stateLevelDetails[i].REQUESTS
  //         );
  //         // tslint:disable-next-line: radix
  //         this.reportTotals.NO_OF_TRANSACTION_IDS += parseInt(
  //           this.stateLevelDetails[i].NO_OF_TRANSACTION_IDS
  //         );
  //         // tslint:disable-next-line: radix
  //         this.reportTotals.AMOUNT += parseInt(
  //           this.stateLevelDetails[i].AMOUNT
  //         );
          
  //         const singleRow = {
  //           S_NO: i + 1,
  //           DISTRICT_NAME: this.stateLevelDetails[i].DISTRICT_NAME,
  //           NAME_OF_THE_DCCB: this.stateLevelDetails[i].NAME_OF_THE_DCCB,
  //           REQUESTS:this.stateLevelDetails[i].REQUESTS,
  //           NO_OF_TRANSACTION_IDS:this.stateLevelDetails[i].NO_OF_TRANSACTION_IDS,
  //           AMOUNT: this.stateLevelDetails[i].AMOUNT,
            
  //           };

  //         this.excelData.push(singleRow);
  //       } 
  //       this.excelData.push(this.reportTotals);
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
    if(this.type=="26")
    {
      this.pacsTypeid=29;
    }
    else if(this.type=="27")
    {
      this.pacsTypeid=30;
    }
    else if(this.type=="28")
    {
      this.pacsTypeid=31;
    }

      this.reportTotals = {
        S_NO: '-',
        DISTRICT_NAME: 'TOTAL',
        NAME_OF_THE_DCCB:  0,
        REQUESTS: 0,
        NO_OF_TRANSACTION_IDS: 0,
        AMOUNT: 0, 
      };
       
      debugger;
      const req = {
        type:this.type,
        input_01: this.statusId,
        input_12: this.fromDate,
        input_13: this.toDate,
      };
      this.spinner.show();
      //const response = await this.sharedAPI.TechManagerGet(req);
      const response = await this.sharedAPI.CalibrationPacsReports(req);
      debugger;
      this.spinner.hide();
      if (response.success) {
        debugger;
        this.excelData = [];

        this.stateLevelDetails = response.result; 
        // this.excelData=this.stateLevelDetails;
        for (let i = 0; i < this.stateLevelDetails.length; i++) {
          // tslint:disable-next-line: radix
          this.reportTotals.NAME_OF_THE_DCCB += parseInt(
            this.stateLevelDetails[i].NAME_OF_THE_DCCB
          );
          this.reportTotals.REQUESTS += parseInt(
            this.stateLevelDetails[i].REQUESTS
          );
          // tslint:disable-next-line: radix
          this.reportTotals.NO_OF_TRANSACTION_IDS += parseInt(
            this.stateLevelDetails[i].NO_OF_TRANSACTION_IDS
          );
          // tslint:disable-next-line: radix
          this.reportTotals.AMOUNT += parseInt(
            this.stateLevelDetails[i].AMOUNT
          );
          
          const singleRow = {
            S_NO: i + 1,
            DISTRICT_NAME: this.stateLevelDetails[i].DISTRICT_NAME,
            NAME_OF_THE_DCCB: this.stateLevelDetails[i].NAME_OF_THE_DCCB,
            REQUESTS:this.stateLevelDetails[i].REQUESTS,
            NO_OF_TRANSACTION_IDS:this.stateLevelDetails[i].NO_OF_TRANSACTION_IDS,
            AMOUNT: this.stateLevelDetails[i].AMOUNT,
            
            };

          this.excelData.push(singleRow);
        } 
        this.excelData.push(this.reportTotals);
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
      'CALIBRATION PACS ABSTRACT REPORT' + this.Reportdate,
      true
    );
  }

  async btnPDF(): Promise<void> {
    try { 
        const req = {
          type:this.type,
          input_01: this.statusId,
          input_02: this.pdfdate,
          input_12: this.fromDate,
          input_13: this.toDate,
        };
      const fileName = 'HARDWAREPAYMENTTOTALREPORT' + this.Reportdate;
      let basePDF = '';
      this.spinner.show();
      const res = await this.sharedAPI.HardwarePaymentsTotalsclickReport(req);
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
    debugger;

     const requestData = {
       type:this.pacsTypeid,
       statusId:this.statusId,
       districtId:obj.DISTRICT_CODE,
       fromDate:this.fromDate,
       toDate:this.toDate,
     };   
 
     const encryptedString = this.utils.encrypt(JSON.stringify(requestData));
     this.onPacsChange.emit(encryptedString);
   }


}
