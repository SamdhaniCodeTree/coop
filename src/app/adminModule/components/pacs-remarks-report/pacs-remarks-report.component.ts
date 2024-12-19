import { formatDate } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { PacsLandAllotmentService } from 'src/app/reportsModule/pacsLandAllotment/services/pacs-land-allotment.service';
import { SessionService } from 'src/app/sharedModule/services/session.service';
import { SharedService } from 'src/app/sharedModule/services/shared.service';
import { ToasterService } from 'src/app/sharedModule/services/toaster.service';
import { UtilsService } from 'src/app/sharedModule/services/utils.service';

@Component({
  selector: 'app-pacs-remarks-report',
  templateUrl: './pacs-remarks-report.component.html',
  styleUrls: ['./pacs-remarks-report.component.css']
})
export class PacsRemarksReportComponent implements OnInit, OnDestroy, AfterViewInit {
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
  //  this.loadReport();
  }

  async GetDetails(): Promise<void> {
    try {

      if(this.typeid == null || this.typeid == "" || this.typeid == undefined){
        this.toast.info("please select Type");
      }
   
      const req = {
      type:23,
      input_01:this.typeid
      }
      debugger;
      this.spinner.show();
      const response = await this.sharedAPI.TechManagerGet(req);
      this.spinner.hide();
      if (response.success) {
        debugger;
        this.excelData = [];

         this.stateLevelDetails = response.result;
         this.excelData = this.stateLevelDetails;
      }
      else{
        this.toast.warning("No Data Available !!!");
      }
   this.rerender();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
  // async loadReport(): Promise<void> {
  //   try {
  //     debugger;

  //     debugger;
  //     const req = {
  //       type: "17"
  //       //input_01: 1
  //     };
  //     this.spinner.show();
  //     const response = await this.sharedAPI.TechManagerGet(req);

  //     debugger;
  //     this.spinner.hide();
  //     if (response.success) {
  //       debugger;
  //       this.excelData = [];

  //       this.stateLevelDetails = response.result;
  //       this.excelData = this.stateLevelDetails;
  //       if (this.stateLevelDetails.length > 1) {
  //         const firstRow = this.stateLevelDetails[0];
  //         const remainingRows = this.stateLevelDetails.slice(1);
  //         debugger;
  //         this.differenceDetails.SELLER_NO_OF_PACS = firstRow.SELLER_NO_OF_PACS - remainingRows.reduce((acc: any, row: any) => acc + row.SELLER_NO_OF_PACS, 0);
  //         this.differenceDetails.SELLER_AMOUNT = firstRow.SELLER_AMOUNT - remainingRows.reduce((acc: any, row: any) => acc + row.SELLER_AMOUNT, 0);
  //         this.differenceDetails.NODAL_AGENCY_NO_OF_PACS = firstRow.NODAL_AGENCY_NO_OF_PACS - remainingRows.reduce((acc: any, row: any) => acc + row.NODAL_AGENCY_NO_OF_PACS, 0);
  //         this.differenceDetails.NODAL_AGENCY_AMOUNT = firstRow.NODAL_AGENCY_AMOUNT - remainingRows.reduce((acc: any, row: any) => acc + row.NODAL_AGENCY_AMOUNT, 0);
  //         this.differenceDetails.CC_RCS_OFFICE_NO_OF_PACS = firstRow.CC_RCS_OFFICE_NO_OF_PACS - remainingRows.reduce((acc: any, row: any) => acc + row.CC_RCS_OFFICE_NO_OF_PACS, 0);
  //         this.differenceDetails.CC_RCS_OFFICE_AMOUNT = firstRow.CC_RCS_OFFICE_AMOUNT - remainingRows.reduce((acc: any, row: any) => acc + row.CC_RCS_OFFICE_AMOUNT, 0);
  //         // Add similar calculations for other fields...
  //       }
  //     } else {
  //       this.toast.info(response.message);
  //     }
  //     this.rerender();
  //   } catch (error) {
  //     this.spinner.hide();
  //     this.utils.catchResponse(error);
  //   }
  // }

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
