import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { debug } from 'console';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { ToasterService } from 'src/app/sharedModule/services/toaster.service';
import { UtilsService } from 'src/app/sharedModule/services/utils.service';
import { PacsLandAllotmentService } from '../../services/pacs-land-allotment.service';

@Component({
  selector: 'app-pla-district',
  templateUrl: './pla-district.component.html',
  styleUrls: ['./pla-district.component.css'],
})
export class PlaDistrictComponent
  implements OnInit, OnDestroy, AfterViewInit, OnChanges
{
  @Input() fromDate: any;
  @Input() toDate: any;
  @Input() tempId: any;
  @Input() districtId: any;
  @Input() districtName: any;
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onMandalChange = new EventEmitter<string>();
  districtLevelDetails: any = [];

  reportTotals = {
    S_NO: '-',
    MANDAL: 'TOTAL',
    TOTAL_RBKS: 0,
    TOTAL_SUBMIT_RBKS: 0,
    TOTAL_NOT_SUBMIT_RBKS: 0,
    TOTAL_LAND_SUBMITTED: 0,
    TOTAL_SUBMIT_VILLAGES: 0,
    PERCENTAGE_COMPLETED: 0,
    TOTAL_LAND_NOT_SUBMITTED: 0,
    PERCENTAGE_NOT_COMPLETED: 0,
    TOTAL_LAND_HANDOVER_SUBMIT: 0,
    TOTAL_LAND_HANDOVER_NOT_SUBMIT: 0,
  };
  excelData: any[] = [];

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;

  dtOptions: DataTables.Settings = this.utils.dataTableOptions();
  dtTrigger: Subject<any> = new Subject();

  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private allotmentAPI: PacsLandAllotmentService,
    private utils: UtilsService
  ) {}

  ngOnInit(): void {
    // this.loadReport();
  }
  ngOnChanges(): void {
    
    if (
      !this.utils.isEmpty(this.fromDate) &&
      !this.utils.isEmpty(this.toDate) &&
      !this.utils.isEmpty(this.districtId)
    ) {
      this.loadReport();
    }
  }

  async loadReport(): Promise<void> {
    
    try {
      this.reportTotals = {
        S_NO: '-',
        MANDAL: 'TOTAL',
        TOTAL_RBKS: 0,
        TOTAL_SUBMIT_RBKS: 0,
        TOTAL_NOT_SUBMIT_RBKS: 0,
        TOTAL_LAND_SUBMITTED: 0,
        TOTAL_SUBMIT_VILLAGES:0,
        PERCENTAGE_COMPLETED: 0,
        TOTAL_LAND_NOT_SUBMITTED: 0,
        PERCENTAGE_NOT_COMPLETED: 0,
        TOTAL_LAND_HANDOVER_SUBMIT: 0,
        TOTAL_LAND_HANDOVER_NOT_SUBMIT: 0,
      };
      const req = {
        districtId: this.districtId,
        fromDate: this.fromDate,
        toDate: this.toDate,
      };
      this.spinner.show();
      const response = await this.allotmentAPI.pacsLandAllotmentDistrictReport(
        req
      );
      this.spinner.hide();
      if (response.success) {
        this.excelData = [];
        
        this.districtLevelDetails = response.result;
        for (let i = 0; i < this.districtLevelDetails.length; i++) {
          // tslint:disable-next-line: radix
          this.reportTotals.TOTAL_RBKS += parseInt(
            this.districtLevelDetails[i].TOTAL_RBKS
          );
          // tslint:disable-next-line: radix
          this.reportTotals.TOTAL_SUBMIT_RBKS += parseInt(
            this.districtLevelDetails[i].TOTAL_SUBMIT_RBKS
          );
          // tslint:disable-next-line: radix
          this.reportTotals.TOTAL_NOT_SUBMIT_RBKS += parseInt(
            this.districtLevelDetails[i].TOTAL_NOT_SUBMIT_RBKS
          );
          // tslint:disable-next-line: radix
          this.reportTotals.TOTAL_LAND_SUBMITTED += parseInt(
            this.districtLevelDetails[i].TOTAL_LAND_SUBMITTED
          );
          this.reportTotals.TOTAL_SUBMIT_VILLAGES += parseInt(
            this.districtLevelDetails[i].TOTAL_SUBMIT_VILLAGES
          );
          // tslint:disable-next-line: radix
          this.reportTotals.TOTAL_LAND_NOT_SUBMITTED += parseInt(
            this.districtLevelDetails[i].TOTAL_LAND_NOT_SUBMITTED
          );
          // tslint:disable-next-line: radix
          this.reportTotals.TOTAL_LAND_HANDOVER_SUBMIT += parseInt(
            this.districtLevelDetails[i].TOTAL_LAND_HANDOVER_SUBMIT
          );
          // tslint:disable-next-line: radix
          this.reportTotals.TOTAL_LAND_HANDOVER_NOT_SUBMIT += parseInt(
            this.districtLevelDetails[i].TOTAL_LAND_HANDOVER_NOT_SUBMIT
          );
          const singleRow = {
            S_NO: i + 1,
            MANDAL: this.districtLevelDetails[i].MANDAL_NAME,
            TOTAL_RBKS: this.districtLevelDetails[i].TOTAL_RBKS,
            TOTAL_SUBMIT_RBKS: this.districtLevelDetails[i].TOTAL_SUBMIT_RBKS,
            TOTAL_NOT_SUBMIT_RBKS:
              this.districtLevelDetails[i].TOTAL_NOT_SUBMIT_RBKS,
            TOTAL_LAND_SUBMITTED:
              this.districtLevelDetails[i].TOTAL_LAND_SUBMITTED,
            PERCENTAGE_COMPLETED:
              this.districtLevelDetails[i].PERCENTAGE_COMPLETED,
            TOTAL_LAND_NOT_SUBMITTED:
              this.districtLevelDetails[i].TOTAL_LAND_NOT_SUBMITTED,
              TOTAL_SUBMIT_VILLAGES:
              this.districtLevelDetails[i].TOTAL_SUBMIT_VILLAGES,
            PERCENTAGE_NOT_COMPLETED:
              this.districtLevelDetails[i].PERCENTAGE_NOT_COMPLETED,
            TOTAL_LAND_HANDOVER_SUBMIT:
              this.districtLevelDetails[i].TOTAL_LAND_HANDOVER_SUBMIT,
            TOTAL_LAND_HANDOVER_NOT_SUBMIT:
              this.districtLevelDetails[i].TOTAL_LAND_HANDOVER_NOT_SUBMIT,
          };

          this.excelData.push(singleRow);
        }
        this.reportTotals.PERCENTAGE_COMPLETED =
          (this.reportTotals.TOTAL_SUBMIT_RBKS /
            this.reportTotals.TOTAL_RBKS) *
          100;
        this.reportTotals.PERCENTAGE_COMPLETED = parseFloat(
          this.reportTotals.PERCENTAGE_COMPLETED.toFixed(2)
        );
        this.reportTotals.PERCENTAGE_NOT_COMPLETED =
          ((this.reportTotals.TOTAL_NOT_SUBMIT_RBKS) /
            this.reportTotals.TOTAL_RBKS) *
          100;
        this.reportTotals.PERCENTAGE_NOT_COMPLETED = parseFloat(
          this.reportTotals.PERCENTAGE_NOT_COMPLETED.toFixed(2)
        );
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
    this.utils.JSONToCSVConvertor(
      this.excelData,
      'Land Allotment District Level Report',
      true
    );
  }

  async btnPDF(): Promise<void> {
    try {
      const req = {
        districtId: this.districtId,
        fromDate: this.fromDate,
        toDate: this.toDate,
      };
      const fileName = 'districtLevelMPFCLandAllotment';
      let basePDF = '';
      this.spinner.show();
      const res = await this.allotmentAPI.pacsLandAllotmentStateReport(req);
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

  btnGetDetails(obj: any): void {
    debugger;
    const requestData = {
      districtId: obj.DISTRICT_CODE,
      districtName: obj.DISTRICT_NAME,
      mandalName: obj.MANDAL_NAME,
      mandalId: obj.MANDAL_CODE,
      fromDate: this.fromDate,
      toDate: this.toDate,
    };

    const encryptedString = this.utils.encrypt(JSON.stringify(requestData));
    this.onMandalChange.emit(encryptedString);
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
