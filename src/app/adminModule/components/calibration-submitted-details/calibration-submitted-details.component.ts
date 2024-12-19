import { formatDate } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { PacsLandAllotmentService } from 'src/app/reportsModule/pacsLandAllotment/services/pacs-land-allotment.service';
import { SessionService } from 'src/app/sharedModule/services/session.service';
import { SharedService } from 'src/app/sharedModule/services/shared.service';
import { ToasterService } from 'src/app/sharedModule/services/toaster.service';
import { UtilsService } from 'src/app/sharedModule/services/utils.service';

@Component({
  selector: 'app-calibration-submitted-details',
  templateUrl: './calibration-submitted-details.component.html',
  styleUrls: ['./calibration-submitted-details.component.css']
})
export class CalibrationSubmittedDetailsComponent implements OnInit {

  @Input() type:any;
@Input() districtName:any;
@Input() districtcode:any;
@Input() dccbName:any;
@Input() dccbCode:any;
@Input() typeid:any;
@Input() fromDate:any;
@Input() toDate:any;


disthide = false;
dccbhide = false;

   stateLevelDetails: any = [];
   valueHideshow: any;
   distcode: any;
 
   //typeid: any;
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

    if(this.type == 32){
      this.disthide = true;
      this.dccbhide = false;
    }
    else{
      this.disthide = false;
      this.dccbhide = true;
    }
 
     this.Reportdate = formatDate(this.today, 'ddMMyyyyhhmmssa', 'en-US', '+0530');
    this.loadReport();    
   } 
   districtname:any;
   async loadReport(): Promise<void> {
     try {
     
       
        
       debugger;
       const req = {
         type:this.type,
        // input_01: this.statusId,
         input_02: this.districtcode,
         input_03: this.dccbCode,
         input_09: this.fromDate,
         input_10: this.toDate,
       };
       this.spinner.show();
       const response = await this.sharedAPI.TechManagerGet(req);
 
       debugger;
       this.spinner.hide();
       if (response.success) {
         debugger;
         this.excelData = [];
 
         this.stateLevelDetails = response.result; 
          this.excelData=this.stateLevelDetails;
         //this.districtname=response.result[0].DISTRICT_NAME;
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
    if(this.type == 32){
      this.utils.JSONToXlsxConvertor(
        this.excelData,
        'DISTRICT CALIBRATION SUBMITTED REPORT' + this.Reportdate,
        true
      );
    }
    else{
      this.utils.JSONToXlsxConvertor(
        this.excelData,
        'DCCB CALIBRATION SUBMITTED REPORT' + this.Reportdate,
        true
      );
    }
    
   }
 
   async btnPDF(): Promise<void> {
     try {
       const req = {
         TYPE: "1",
         INPUT_05: this.pdfdate
 
       };
       const fileName = 'stateLevelPacsComputerizationReport' + this.Reportdate;
       let basePDF = '';
       this.spinner.show();
       const res = await this.allotmentAPI.DistrictWisePacsReport(req);
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
 
