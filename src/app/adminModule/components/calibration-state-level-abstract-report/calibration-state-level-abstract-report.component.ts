import { formatDate } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import * as moment from 'moment';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { PacsLandAllotmentService } from 'src/app/reportsModule/pacsLandAllotment/services/pacs-land-allotment.service';
import { SessionService } from 'src/app/sharedModule/services/session.service';
import { SharedService } from 'src/app/sharedModule/services/shared.service';
import { ToasterService } from 'src/app/sharedModule/services/toaster.service';
import { UtilsService } from 'src/app/sharedModule/services/utils.service';

@Component({
  selector: 'app-calibration-state-level-abstract-report',
  templateUrl: './calibration-state-level-abstract-report.component.html',
  styleUrls: ['./calibration-state-level-abstract-report.component.css']
})
export class CalibrationStateLevelAbstractReportComponent implements OnInit, OnDestroy, AfterViewInit { 
  stateLevelDetails: any = [];
  valueHideshow: any;
  distcode: any;

  bsDatepickerConfig: Partial<BsDatepickerConfig> = this.utils.getbsdatepicker();
  tempId: any;
  fromDate: any;
  toDate: any;
  reportFromDate: any;
  reportToDate: any;
  minDate!: Date;
  maxDate!: Date;

  FromDateformat:any;
  ToDateformat:any;
  typeid: any;
  type: any;

  districthide: boolean = false;
  dccbshide: boolean = false;
  reportTotals = {
    S_NO: '-',
    DISTRICT_NAME: undefined as string | undefined,
    NAME_OF_THE_DCCB: undefined as string | undefined,
    TOTAL_PACS: 0,
    CALIBRATION_DONE: 0,
    CALIBRATION_NOT_DONE: 0,
    CEO_APPROVED: 0,
    CEO_NOT_APPROVED: 0,
    HARDWARE_REQUESTED: 0,
    HARDWARE_NOT_REQUESTED: 0,
    DGM_PAYMENT_REQUESTED: 0,
    DGM_PAYMENT_NOT_REQUESTED: 0,
    DEPT_PAYMENT_PAID: 0,
    DEPT_PAYMENT_NOT_PAID: 0,
    };
  excelData: any[] = [];

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
    private router: Router
  ) { }

  ngOnInit(): void {

    this.minDate =new Date()// this.session.getMinDate();
    this.maxDate = new Date();
    this.fromDate =new Date('08-01-2023');//moment(this.session.getFromDateString()).format('DD-MM-YYYY');
    this.toDate =new Date();// this.session.getTodayDateString();

     this.FromDateformat=moment(this.fromDate, 'DD/MM/YYYY').format('YYYY/MM/DD');
     this.ToDateformat=moment(this.toDate, 'DD/MM/YYYY').format('YYYY/MM/DD');

    this.Reportdate = formatDate(this.today, 'ddMMyyyyhhmmssa', 'en-US', '+0530');
    this.pdfdate = formatDate(this.today, 'dd-MM-yyyy hh:mm:ssa', 'en-US', '+0530');
  }


  GetDetails() { 
debugger;
    this.reportFromDate=moment(this.fromDate, 'DD/MM/YY').format('YYYY/MM/DD');
    this.reportToDate=moment(this.toDate, 'DD/MM/YY').format('YYYY/MM/DD');
    debugger; 
    if (this.typeid == "1" || this.typeid == 1) {
      this.type = 15;
      this.districthide = true;
      this.dccbshide = false;
      this.loadReport();

    }
    else {
      this.type = 16;
      this.districthide = false;
      this.dccbshide = true;
      this.loadReport();
    }
  }

  async loadReport(): Promise<void> {
    try {
      debugger;


      if(this.typeid == null || this.typeid == "" || this.typeid == undefined){
        this.toast.info("Please Select Type");
        return ;
      }
      this.reportTotals = {
        S_NO: '-',
        DISTRICT_NAME: undefined as string | undefined,
        NAME_OF_THE_DCCB: undefined as string | undefined,
        TOTAL_PACS: 0,
        CALIBRATION_DONE: 0,
        CALIBRATION_NOT_DONE: 0,
        CEO_APPROVED: 0,
        CEO_NOT_APPROVED: 0,
        HARDWARE_REQUESTED: 0,
        HARDWARE_NOT_REQUESTED: 0,
        DGM_PAYMENT_REQUESTED: 0,
        DGM_PAYMENT_NOT_REQUESTED: 0,
        DEPT_PAYMENT_PAID: 0,
        DEPT_PAYMENT_NOT_PAID: 0,
    };
      debugger;
      const req = {
        type: this.type,
        input_01: this.typeid
      };
      this.spinner.show();
      const response = await this.sharedAPI.TechManagerGet(req);

      debugger;
      this.spinner.hide();
      if (response.success) {
        debugger;
        this.excelData = [];

        this.stateLevelDetails = response.result; 

        for (let i = 0; i < this.stateLevelDetails.length; i++) {
          // tslint:disable-next-line: radix
          this.reportTotals.TOTAL_PACS += parseInt(
              this.stateLevelDetails[i].TOTAL_PACS
          );
          this.reportTotals.CALIBRATION_DONE += parseInt(
              this.stateLevelDetails[i].CALIBRATION_DONE
          );
          // tslint:disable-next-line: radix
          this.reportTotals.CALIBRATION_NOT_DONE += parseInt(
              this.stateLevelDetails[i].CALIBRATION_NOT_DONE
          );
          // tslint:disable-next-line: radix
          this.reportTotals.CEO_APPROVED += parseInt(
              this.stateLevelDetails[i].CEO_APPROVED
          );
          // tslint:disable-next-line: radix
          this.reportTotals.CEO_NOT_APPROVED += parseInt(
              this.stateLevelDetails[i].CEO_NOT_APPROVED
          );
          // tslint:disable-next-line: radix
          this.reportTotals.HARDWARE_REQUESTED += parseInt(
              this.stateLevelDetails[i].HARDWARE_REQUESTED
          );
          // tslint:disable-next-line: radix
          this.reportTotals.HARDWARE_NOT_REQUESTED += parseInt(
              this.stateLevelDetails[i].HARDWARE_NOT_REQUESTED
          );
          // tslint:disable-next-line: radix
          this.reportTotals.DGM_PAYMENT_REQUESTED += parseInt(
              this.stateLevelDetails[i].DGM_PAYMENT_REQUESTED
          );
          this.reportTotals.DGM_PAYMENT_NOT_REQUESTED += parseInt(
              this.stateLevelDetails[i].DGM_PAYMENT_NOT_REQUESTED
          );
          // tslint:disable-next-line: radix
          this.reportTotals.DEPT_PAYMENT_PAID += parseInt(
              this.stateLevelDetails[i].DEPT_PAYMENT_PAID
          );
          this.reportTotals.DEPT_PAYMENT_NOT_PAID += parseInt(
              this.stateLevelDetails[i].DEPT_PAYMENT_NOT_PAID
          );





          let dynamicField: any;

          if (this.typeid == 1 || this.typeid === "1") {
              dynamicField = { DISTRICT_NAME: this.stateLevelDetails[i].DISTRICT_NAME };
          } else {
              dynamicField = { NAME_OF_THE_DCCB: this.stateLevelDetails[i].NAME_OF_THE_DCCB };
          }



          const singleRow = {
              S_NO: i + 1,
              ...dynamicField,
              TOTAL_PACS: this.stateLevelDetails[i].TOTAL_PACS,
              CALIBRATION_DONE: this.stateLevelDetails[i].CALIBRATION_DONE,
              CALIBRATION_NOT_DONE: this.stateLevelDetails[i].CALIBRATION_NOT_DONE,
              CEO_APPROVED: this.stateLevelDetails[i].CEO_APPROVED,
              CEO_NOT_APPROVED: this.stateLevelDetails[i].CEO_NOT_APPROVED,
              HARDWARE_REQUESTED: this.stateLevelDetails[i].HARDWARE_REQUESTED,
              HARDWARE_NOT_REQUESTED: this.stateLevelDetails[i].HARDWARE_NOT_REQUESTED,
              DGM_PAYMENT_REQUESTED: this.stateLevelDetails[i].DGM_PAYMENT_REQUESTED,
              DGM_PAYMENT_NOT_REQUESTED: this.stateLevelDetails[i].DGM_PAYMENT_NOT_REQUESTED,
              DEPT_PAYMENT_PAID: this.stateLevelDetails[i].DEPT_PAYMENT_PAID,
              DEPT_PAYMENT_NOT_PAID: this.stateLevelDetails[i].DEPT_PAYMENT_NOT_PAID,
          }; 
          this.excelData.push(singleRow); 
      }
      if (this.typeid == 1 || this.typeid === "1") {
          this.reportTotals.DISTRICT_NAME = 'TOTAL';
          delete this.reportTotals.NAME_OF_THE_DCCB; 
      } else {
          this.reportTotals.NAME_OF_THE_DCCB = 'TOTAL';
          delete this.reportTotals.DISTRICT_NAME;
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
      'CALIBRATION STATE LEVEL ABSTRACT REPORT' + this.Reportdate,
      true
    );
  }

  async btnPDF(): Promise<void> {
    try {
      const req = {
        type: this.type,
        input_01: this.typeid,
        input_02: this.pdfdate

      };
      const fileName = 'CalibrationstateLevelAbstractReport' + this.Reportdate;
      let basePDF = '';
      this.spinner.show();
      const res = await this.allotmentAPI.CalibrationAbstractReport(req);
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

  // btnGetDetails(obj: any): void {
  //   debugger;
  //   const requestData = {
  //     type: "2",
  //     districtName: obj.DISTRICT_NAME,
  //     districtcode: obj.DISTRICT_CODE
  //   };

  //   const encryptedString = this.utils.encrypt(JSON.stringify(requestData));
  //   this.onDistrictChange.emit(encryptedString);
  // }
  // btnSitenotdoneDetails(obj: any): void {
  //   debugger;

  //   const requestData = {
  //     type: "3",
  //     districtName: obj.DISTRICT_NAME,
  //     districtId: obj.DISTRICT_CODE
  //   };

  //   const encryptedString = this.utils.encrypt(JSON.stringify(requestData));
  //   this.onSiteNotDoneChange.emit(encryptedString);
  // }
  // btndevicenotdoneDetails(obj: any): void {

  //   const requestData = {
  //     type: "4",
  //     districtName: obj.DISTRICT_NAME,
  //     districtId: obj.DISTRICT_CODE
  //   };

  //   const encryptedString = this.utils.encrypt(JSON.stringify(requestData));
  //   this.ondeviceNotDoneChange.emit(encryptedString);
  // }
  // btnCalibnotdoneDetails(obj: any): void {

  //   const requestData = {
  //     type: "5",
  //     districtName: obj.DISTRICT_NAME,
  //     districtId: obj.DISTRICT_CODE
  //   };

  //   const encryptedString = this.utils.encrypt(JSON.stringify(requestData));
  //   this.oncalibNotDoneChange.emit(encryptedString);
  // }
  // btnDMTnotdoneDetails(obj: any): void {

  //   const requestData = {
  //     type: "6",
  //     districtName: obj.DISTRICT_NAME,
  //     districtId: obj.DISTRICT_CODE
  //   };

  //   const encryptedString = this.utils.encrypt(JSON.stringify(requestData));
  //   this.onDMTNotDoneChange.emit(encryptedString);
  // }
  // btnSitedoneDetails(obj: any): void {
  //   debugger;
  //   const requestData = {
  //     type: "11",
  //     districtName: obj.DISTRICT_NAME,
  //     districtId: obj.DISTRICT_CODE
  //   };

  //   const encryptedString = this.utils.encrypt(JSON.stringify(requestData));
  //   this.onSiteDoneChange.emit(encryptedString);
  // }

  // btnDevicedoneDetails(obj: any): void {
  //   debugger;
  //   const requestData = {
  //     type: "12",
  //     districtName: obj.DISTRICT_NAME,
  //     districtId: obj.DISTRICT_CODE
  //   };

  //   const encryptedString = this.utils.encrypt(JSON.stringify(requestData));
  //   this.onDeviceDoneChange.emit(encryptedString);
  // }
  // btnInstalldoneDetails(obj: any): void {
  //   debugger;
  //   const requestData = {
  //     type: "13",
  //     districtName: obj.DISTRICT_NAME,
  //     districtId: obj.DISTRICT_CODE
  //   };

  //   const encryptedString = this.utils.encrypt(JSON.stringify(requestData));
  //   this.onInstallDoneChange.emit(encryptedString);
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
  onDistrictChange(result: any): void { 
    
    if(this.session.role ==='701'){
      this.router.navigate(['/dccb/CalibrationSubmittedReport'], {
        queryParams: { request: result },
      }); 
    }
    else if(this.session.role ==='702'){
      this.router.navigate(['/dccbhwv/CalibrationSubmittedReport'], {
        queryParams: { request: result },
      }); 
    }
    else if(this.session.role ==='303'){
      this.router.navigate(['/technican/CalibrationSubmittedReport'], {
        queryParams: { request: result },
      }); 
    }
    else if(this.session.role ==='222'){
      this.router.navigate(['/apcob/CalibrationSubmittedReport'], {
        queryParams: { request: result },
      }); 
    }
    else{
      this.router.navigate(['/admin/CalibrationSubmittedReport'], {
        queryParams: { request: result },
      });
    }
    



     
}
}
