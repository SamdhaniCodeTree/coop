import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { CeoService } from 'src/app/ceoModule/services/ceo.service';
import { LoginService } from 'src/app/loginModule/services/login.service';
import { MpfcLandInspectionService } from 'src/app/reportsModule/mpfcLandInspection/services/mpfc-land-inspection.service';
import { SessionService } from 'src/app/sharedModule/services/session.service';
import { SharedService } from 'src/app/sharedModule/services/shared.service';
import { ToasterService } from 'src/app/sharedModule/services/toaster.service';
import { UtilsService } from 'src/app/sharedModule/services/utils.service';

@Component({
  selector: 'app-calibration-internet-details-report',
  templateUrl: './calibration-internet-details-report.component.html',
  styleUrls: ['./calibration-internet-details-report.component.css']
})
export class CalibrationInternetDetailsReportComponent implements OnInit {

  type = '';
  districtId = ''; 
  DeparmentList: any = []; 
  userrole = '';
  excelData: any[] = []; 

   ReportTotals = {
    S_NO: '-',
    DISTRICT_NAME: 'TOTAL',
    NO_OF_PACS: 0,
    DATA_SUBMITTED: 0,
    DATA_NOT_SUBMITTED: 0,
    TOTAL_NINT_PACS: 0,
    TOTAL_INT_PACS: 0,
    TOTAL_NINT_PENDING: 0,
    TOTAL_INT_SUBMITTED: 0,
    CEO_INT_PENDING:0,
    CEO_INT_APPROVED: 0,
    CEO_INT_REJECTED: 0,
    DGM_INT_PENDING: 0,
    DGM_INT_APPROVED: 0,
    DGM_INT_REJECTED: 0,
    COPS_INT_PENDING: 0,
    COPS_INT_VIEWED: 0,
   }




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

  }

  async LoadReport(): Promise<void> {
    try {

      this.ReportTotals = {
        S_NO: '-',
        DISTRICT_NAME: 'TOTAL',
        NO_OF_PACS: 0,
        DATA_SUBMITTED: 0,
        DATA_NOT_SUBMITTED: 0,
        TOTAL_NINT_PACS: 0,
        TOTAL_INT_PACS: 0,
        TOTAL_NINT_PENDING: 0,
        TOTAL_INT_SUBMITTED: 0,
        CEO_INT_PENDING:0,
        CEO_INT_APPROVED: 0,
        CEO_INT_REJECTED: 0,
        DGM_INT_PENDING: 0,
        DGM_INT_APPROVED: 0,
        DGM_INT_REJECTED: 0,
        COPS_INT_PENDING: 0,
        COPS_INT_VIEWED: 0,
       }

      this.DeparmentList = [];
      const req = {
        type: "11",
      };

      this.spinner.show();

      const response = await this.ceoAPI.InternetGetDetails(req);
      this.spinner.hide();
      debugger;
      if (response.success) {
        this.DeparmentList = response.result;
       // this.excelData = this.DeparmentList;

        for(var i = 0 ; i < this.DeparmentList.length;i++){
           this.ReportTotals.NO_OF_PACS += parseInt(
           this.DeparmentList[i].NO_OF_PACS
          );

           this.ReportTotals.DATA_SUBMITTED +=parseInt(
            this.DeparmentList[i].DATA_SUBMITTED
           );
           this.ReportTotals.DATA_NOT_SUBMITTED +=parseInt(
            this.DeparmentList[i].DATA_NOT_SUBMITTED
           );
           this.ReportTotals.TOTAL_NINT_PACS +=parseInt(
            this.DeparmentList[i].TOTAL_NINT_PACS
           );
           this.ReportTotals.TOTAL_INT_PACS +=parseInt(
            this.DeparmentList[i].TOTAL_INT_PACS
           );
           this.ReportTotals.TOTAL_NINT_PENDING +=parseInt(
            this.DeparmentList[i].TOTAL_NINT_PENDING
           );
           this.ReportTotals.TOTAL_INT_SUBMITTED +=parseInt(
            this.DeparmentList[i].TOTAL_INT_SUBMITTED
           );
           this.ReportTotals.CEO_INT_PENDING +=parseInt(
            this.DeparmentList[i].CEO_INT_PENDING
           );
           this.ReportTotals.CEO_INT_APPROVED +=parseInt(
            this.DeparmentList[i].CEO_INT_APPROVED
           );
           this.ReportTotals.CEO_INT_REJECTED +=parseInt(
            this.DeparmentList[i].CEO_INT_REJECTED
           );
           this.ReportTotals.DGM_INT_PENDING +=parseInt(
            this.DeparmentList[i].DGM_INT_PENDING
           );
           this.ReportTotals.DGM_INT_APPROVED +=parseInt(
            this.DeparmentList[i].DGM_INT_APPROVED
           );
           this.ReportTotals.DGM_INT_REJECTED +=parseInt(
            this.DeparmentList[i].DGM_INT_REJECTED
           );
           this.ReportTotals.COPS_INT_PENDING +=parseInt(
            this.DeparmentList[i].COPS_INT_PENDING
           );
           this.ReportTotals.COPS_INT_VIEWED +=parseInt(
            this.DeparmentList[i].COPS_INT_VIEWED
           );

           const singleRow = {
            S_NO: i + 1,
            DISTRICT_NAME: this.DeparmentList[i].DISTRICT_NAME,
            NO_OF_PACS: this.DeparmentList[i].NO_OF_PACS,
            DATA_SUBMITTED:this.DeparmentList[i].DATA_SUBMITTED,
            DATA_NOT_SUBMITTED:this.DeparmentList[i].DATA_NOT_SUBMITTED,
            TOTAL_NINT_PACS: this.DeparmentList[i].TOTAL_NINT_PACS,
            TOTAL_INT_PACS: this.DeparmentList[i].TOTAL_INT_PACS,
            TOTAL_NINT_PENDING: this.DeparmentList[i].TOTAL_NINT_PENDING,
            TOTAL_INT_SUBMITTED: this.DeparmentList[i].TOTAL_INT_SUBMITTED,
            CEO_INT_PENDING: this.DeparmentList[i].CEO_INT_PENDING,
            CEO_INT_APPROVED: this.DeparmentList[i].CEO_INT_APPROVED,
            CEO_INT_REJECTED: this.DeparmentList[i].CEO_INT_REJECTED,
            DGM_INT_PENDING: this.DeparmentList[i].DGM_INT_PENDING,
            DGM_INT_APPROVED: this.DeparmentList[i].DGM_INT_APPROVED,
            DGM_INT_REJECTED: this.DeparmentList[i].DGM_INT_REJECTED,
            COPS_INT_PENDING: this.DeparmentList[i].COPS_INT_PENDING,
            COPS_INT_VIEWED: this.DeparmentList[i].COPS_INT_VIEWED, 
           };
           this.excelData.push(singleRow);
        }
        this.excelData.push(this.ReportTotals); 
      }
      else {
        this.toast.info(response.message);
      }
      this.rerender();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async btnPdfView(path: string, obj: any): Promise<void> {
    try {
      debugger;

      const pacs = obj.PACS_CODE
     // this.Departmentverify(pacs);
      await this.utils.viewJPVPDFcop(path);
      // await this.utils.viewJPVPDFcopcrystal(path);
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  // async Departmentverify(packcode: any): Promise<void> {
  //   try {

  //     debugger;
  //     const req = {
  //       type: "10",
  //       num1: "5",
  //       pacs_code: packcode,
  //       inserted_by: this.session.userName,
  //       role: this.session.role

  //     };

  //     this.spinner.show();

  //     const response = await this.ceoAPI.InternetGetDetails(req);
  //     this.spinner.hide();
  //     debugger;
  //     if (response.success) {

  //       this.LoadReport();

  //     }
  //     else {
  //       // this.toast.info(response.message);
  //     }
  //     this.rerender();
  //   } catch (error) {
  //     this.spinner.hide();
  //     this.utils.catchResponse(error);
  //   }
  // }


  btnExcelDownload(): void {
    this.utils.JSONToCSVConvertor(
      this.excelData,
      'Technicial Manager Reports',
      true
    );
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


}
