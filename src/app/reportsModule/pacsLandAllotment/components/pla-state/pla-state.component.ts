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
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { ToasterService } from 'src/app/sharedModule/services/toaster.service';
import { UtilsService } from 'src/app/sharedModule/services/utils.service';
import { PacsLandAllotmentService } from '../../services/pacs-land-allotment.service';
import { SessionService } from 'src/app/sharedModule/services/session.service';
@Component({
  selector: 'app-pla-state',
  templateUrl: './pla-state.component.html',
  styleUrls: ['./pla-state.component.css'],
})
export class PlaStateComponent
  implements OnInit, OnDestroy, AfterViewInit, OnChanges
{
  type = '';
  districtId = '';
  @Input() fromDate: any;
  @Input() toDate: any;
  @Input() tempId: any;
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onDistrictChange = new EventEmitter<string>();
  stateLevelDetails: any = [];

  reportTotals = {
    S_NO: '-',
    DISTRICT: 'TOTAL',
    TOTAL_MANDALS: 0,
    TOTAL_SUBMIT_MANDALS: 0,
    TOTAL_NOT_SUBMIT_MANDALS: 0,
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
  excelData: any[] = [];

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
  ) {}

  ngOnInit(): void {
   
  }
  ngOnChanges(): void {
    if (
      !this.utils.isEmpty(this.fromDate) &&
      !this.utils.isEmpty(this.toDate)
    ) {
      this.loadReport();
    }
  }

  async loadReport(): Promise<void> {
    try {
      debugger;
      this.reportTotals = {
        S_NO: '-',
        DISTRICT: 'TOTAL',
        TOTAL_MANDALS: 0,
        TOTAL_SUBMIT_MANDALS: 0,
        TOTAL_NOT_SUBMIT_MANDALS: 0,
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
      
      if(this.session.role==0 || this.session.role==1 || this.session.role==504){
        this.type="1";
        
      }
      else if(this.session.role==504){
        this.type="1";
      }
      else
      if(this.session.role!=1){
        this.type="4";
        this.districtId=this.session.districtId;
      }
      debugger;
      const req = {
        fromDate: this.fromDate,
        toDate: this.toDate,
        type:this.type,
        districtId:this.districtId,
      };
      this.spinner.show();
      const response = await this.allotmentAPI.pacsLandAllotmentStateReport(
        req
      );
      debugger;
      this.spinner.hide();
      if (response.success) {
        
        this.excelData = [];
        
        this.stateLevelDetails = response.result;

        for (let i = 0; i < this.stateLevelDetails.length; i++) {    
          // tslint:disable-next-line: radix
          this.reportTotals.TOTAL_MANDALS += parseInt(
            this.stateLevelDetails[i].TOTAL_MANDALS
          );
          // tslint:disable-next-line: radix
          this.reportTotals.TOTAL_SUBMIT_MANDALS += parseInt(
            this.stateLevelDetails[i].TOTAL_SUBMIT_MANDALS
          );
          // tslint:disable-next-line: radix
          this.reportTotals.TOTAL_NOT_SUBMIT_MANDALS += parseInt(
            this.stateLevelDetails[i].TOTAL_NOT_SUBMIT_MANDALS
          );
          // tslint:disable-next-line: radix
          this.reportTotals.TOTAL_RBKS += parseInt(
            this.stateLevelDetails[i].TOTAL_RBKS
          );
          // tslint:disable-next-line: radix
          this.reportTotals.TOTAL_SUBMIT_RBKS += parseInt(
            this.stateLevelDetails[i].TOTAL_SUBMIT_RBKS
          );
          // tslint:disable-next-line: radix
          this.reportTotals.TOTAL_NOT_SUBMIT_RBKS += parseInt(
            this.stateLevelDetails[i].TOTAL_NOT_SUBMIT_RBKS
          );
          // tslint:disable-next-line: radix
          this.reportTotals.TOTAL_LAND_SUBMITTED += parseInt(
            this.stateLevelDetails[i].TOTAL_LAND_SUBMITTED
          );
          this.reportTotals.TOTAL_SUBMIT_VILLAGES += parseInt(
            this.stateLevelDetails[i].TOTAL_SUBMIT_VILLAGES
          );
          // tslint:disable-next-line: radix
          this.reportTotals.TOTAL_LAND_NOT_SUBMITTED += parseInt(
            this.stateLevelDetails[i].TOTAL_LAND_NOT_SUBMITTED
          );
          // tslint:disable-next-line: radix
          this.reportTotals.TOTAL_LAND_HANDOVER_SUBMIT += parseInt(
            this.stateLevelDetails[i].TOTAL_LAND_HANDOVER_SUBMIT
          );
          // tslint:disable-next-line: radix
          this.reportTotals.TOTAL_LAND_HANDOVER_NOT_SUBMIT += parseInt(
            this.stateLevelDetails[i].TOTAL_LAND_HANDOVER_NOT_SUBMIT
          );
          const singleRow = {
            S_NO: i + 1,
            DISTRICT: this.stateLevelDetails[i].DISTRICT_NAME,
            TOTAL_MANDALS: this.stateLevelDetails[i].TOTAL_MANDALS,
            TOTAL_SUBMIT_MANDALS:
              this.stateLevelDetails[i].TOTAL_SUBMIT_MANDALS,
            TOTAL_NOT_SUBMIT_MANDALS:
              this.stateLevelDetails[i].TOTAL_NOT_SUBMIT_MANDALS,
            TOTAL_RBKS: this.stateLevelDetails[i].TOTAL_RBKS,
            TOTAL_SUBMIT_RBKS: this.stateLevelDetails[i].TOTAL_SUBMIT_RBKS,
            TOTAL_NOT_SUBMIT_RBKS:
              this.stateLevelDetails[i].TOTAL_NOT_SUBMIT_RBKS,
            TOTAL_LAND_SUBMITTED:
              this.stateLevelDetails[i].TOTAL_LAND_SUBMITTED,
              TOTAL_SUBMIT_VILLAGES:
              this.stateLevelDetails[i].TOTAL_SUBMIT_VILLAGES,
            PERCENTAGE_COMPLETED:
              this.stateLevelDetails[i].PERCENTAGE_COMPLETED,
            TOTAL_LAND_NOT_SUBMITTED:
              this.stateLevelDetails[i].TOTAL_LAND_NOT_SUBMITTED,
            PERCENTAGE_NOT_COMPLETED:
              this.stateLevelDetails[i].PERCENTAGE_NOT_COMPLETED,
            TOTAL_LAND_HANDOVER_SUBMIT:
              this.stateLevelDetails[i].TOTAL_LAND_HANDOVER_SUBMIT,
            TOTAL_LAND_HANDOVER_NOT_SUBMIT:
              this.stateLevelDetails[i].TOTAL_LAND_HANDOVER_NOT_SUBMIT,
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
          (this.reportTotals.TOTAL_NOT_SUBMIT_RBKS /
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
    this.utils.JSONToxlxsConvertor(
      this.excelData,
      'Land Allotment State Level Report',
      true
    );
  }

  async btnPDF(): Promise<void> {
    try {
      const req = {
        fromDate: this.fromDate,
        toDate: this.toDate,
      };
      const fileName = 'stateLevelMPFCLandAllotment';
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
   
    const requestData = {
      districtId: obj.DISTRICT_CODE,
      districtName: obj.DISTRICT_NAME,
      fromDate: this.fromDate,
      toDate: this.toDate,
    };

    const encryptedString = this.utils.encrypt(JSON.stringify(requestData));
    this.onDistrictChange.emit(encryptedString);
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
