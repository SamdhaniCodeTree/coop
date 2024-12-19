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
import { MpfcLandInspectionService } from '../../services/mpfc-land-inspection.service';
import { SessionService } from 'src/app/sharedModule/services/session.service';
@Component({
  selector: 'app-mli-state',
  templateUrl: './mli-state.component.html',
  styleUrls: ['./mli-state.component.css'],
})
export class MliStateComponent implements OnInit, OnDestroy, AfterViewInit {
  // tslint:disable-next-line: no-output-on-prefix
  type = '';
  districtId = '';
  @Output() onDistrictChange = new EventEmitter<string>();
  stateLevelDetails: any = [];
  userrole = '';
  reportTotals = {
    S_NO: '-',
    DISTRICT_NAME: 'TOTAL',
    GODOWNS_SACTIONED: 0,
    SITES_READY_FOR_CONS: 0,
    //SITES_REG_NREGA_WORKS: 0,
    SITE_NOT_SUITABLE_FOR_CONS: 0,
    FOUNDATION_STAGE: 0,
    SUPER_STRUCTURE_STAGE: 0,
    FINISHING_STAGE: 0,
    HANDOVER_COMPLETED: 0,
    HANDOVER_NOT_COMPLETED: 0,
  };
  excelData: any[] = [];

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;

  dtOptions: DataTables.Settings = this.utils.dataTableOptions();
  dtTrigger: Subject<any> = new Subject();
  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private inspectionAPI: MpfcLandInspectionService,
    private utils: UtilsService,
    private session: SessionService,
  ) 
  {
    this.userrole=this.session.role;;
  }

  ngOnInit(): void {
    this.loadReport();
  }

  async loadReport(): Promise<void> {
    try {
      this.reportTotals = {
        S_NO: '-',
        DISTRICT_NAME: 'TOTAL',
        GODOWNS_SACTIONED: 0,
        SITES_READY_FOR_CONS: 0,
        //SITES_REG_NREGA_WORKS: 0,
        SITE_NOT_SUITABLE_FOR_CONS: 0,
        FOUNDATION_STAGE: 0,
        SUPER_STRUCTURE_STAGE: 0,
        FINISHING_STAGE: 0,
        HANDOVER_COMPLETED: 0,
        HANDOVER_NOT_COMPLETED: 0,
      };
      if(this.session.role==0 || this.session.role==1){
        this.type="1";
        
      }
      if(this.session.role!=1){
        this.type="5";
        this.districtId=this.session.districtId;
      }
      const req = {
        type:this.type,
        districtId:this.districtId,
      };
      this.spinner.show();
      const response = await this.inspectionAPI.mpfcLandInspectionStateReport(req);
     
      this.spinner.hide();
      debugger;
      if (response.success) {
        this.excelData = [];
        
         
        this.stateLevelDetails=response.result;
        for (let i = 0; i < this.stateLevelDetails.length; i++) {
          // tslint:disable-next-line: radix
          this.reportTotals.GODOWNS_SACTIONED += parseInt(
            this.stateLevelDetails[i].GODOWNS_SACTIONED
          );
          // tslint:disable-next-line: radix
          this.reportTotals.SITES_READY_FOR_CONS += parseInt(
            this.stateLevelDetails[i].SITES_READY_FOR_CONS
          );
          // tslint:disable-next-line: radix
          this.reportTotals.SITE_NOT_SUITABLE_FOR_CONS += parseInt(
            this.stateLevelDetails[i].SITE_NOT_SUITABLE_FOR_CONS
          );
          // tslint:disable-next-line: radix
          // this.reportTotals.SITES_REG_NREGA_WORKS += parseInt(
          //   this.stateLevelDetails[i].SITES_REG_NREGA_WORKS
          // );
          // tslint:disable-next-line: radix
          this.reportTotals.FOUNDATION_STAGE += parseInt(
            this.stateLevelDetails[i].FOUNDATION_STAGE
          );
          // tslint:disable-next-line: radix
          this.reportTotals.SUPER_STRUCTURE_STAGE += parseInt(
            this.stateLevelDetails[i].SUPER_STRUCTURE_STAGE
          );
          // tslint:disable-next-line: radix
          this.reportTotals.FINISHING_STAGE += parseInt(
            this.stateLevelDetails[i].FINISHING_STAGE
          );
          this.reportTotals.HANDOVER_COMPLETED += parseInt(
            this.stateLevelDetails[i].HANDOVER_COMPLETED
          );
          this.reportTotals.HANDOVER_NOT_COMPLETED += parseInt(
            this.stateLevelDetails[i].HANDOVER_NOT_COMPLETED
          );
          const singleRow = {
            S_NO: i + 1,
            DISTRICT_NAME: this.stateLevelDetails[i].DISTRICT_NAME,
            GODOWNS_SACTIONED: this.stateLevelDetails[i].GODOWNS_SACTIONED,
            SITES_READY_FOR_CONS:
              this.stateLevelDetails[i].SITES_READY_FOR_CONS,
            // SITES_REG_NREGA_WORKS:
            //   this.stateLevelDetails[i].SITES_REG_NREGA_WORKS,
            SITE_NOT_SUITABLE_FOR_CONS:
              this.stateLevelDetails[i].SITE_NOT_SUITABLE_FOR_CONS,
            FOUNDATION_STAGE: this.stateLevelDetails[i].FOUNDATION_STAGE,
            SUPER_STRUCTURE_STAGE:
              this.stateLevelDetails[i].SUPER_STRUCTURE_STAGE,
            FINISHING_STAGE: this.stateLevelDetails[i].FINISHING_STAGE,
            HANDOVER_COMPLETED: this.stateLevelDetails[i].HANDOVER_COMPLETED,
            HANDOVER_NOT_COMPLETED: this.stateLevelDetails[i].HANDOVER_NOT_COMPLETED,
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
    this.utils.JSONToCSVConvertor(
      this.excelData,
      'Land Inspection State Level Report',
      true
    );
  }

  async btnPDF(): Promise<void> {
    try {
      const fileName = 'stateLevelLandInspection';
      let basePDF = '';
      this.spinner.show();
      const req = {
        type: "1", 
      };
      const res = await this.inspectionAPI.mpfcLandInspectionStateReport(req);
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
