import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
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

@Component({
  selector: 'app-mli-district',
  templateUrl: './mli-district.component.html',
  styleUrls: ['./mli-district.component.css'],
})
export class MliDistrictComponent implements OnInit, OnDestroy, AfterViewInit {
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onMandalChange = new EventEmitter<string>();
  @Input() districtId: any;
  @Input() districtName: any;
  districtLevelDetails: any = [];

  reportTotals = {
    S_NO: '-',
    MANDAL_NAME: 'TOTAL',
    GODOWNS_SACTIONED: 0,
    SITES_READY_FOR_CONS: 0,
   // SITES_REG_NREGA_WORKS: 0,
    SITE_NOT_SUITABLE_FOR_CONS: 0,
    FOUNDATION_STAGE: 0,
    SUPER_STRUCTURE_STAGE: 0,
    FINISHING_STAGE: 0,
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
    private utils: UtilsService
  ) {}

  ngOnInit(): void {
    this.loadReport();
  }

  async loadReport(): Promise<void> {
    try {
      this.reportTotals = {
        S_NO: '-',
        MANDAL_NAME: 'TOTAL',
        GODOWNS_SACTIONED: 0,
        SITES_READY_FOR_CONS: 0,
        //SITES_REG_NREGA_WORKS: 0,
        SITE_NOT_SUITABLE_FOR_CONS: 0,
        FOUNDATION_STAGE: 0,
        SUPER_STRUCTURE_STAGE: 0,
        FINISHING_STAGE: 0,
      };
      const req = {
        districtId: this.districtId, 
      };
      this.spinner.show();
      const response =
        await this.inspectionAPI.mpfcLandInspectionDistrictReport(req);
      this.spinner.hide();
      if (response.success) {
        this.excelData = [];
        this.districtLevelDetails = response.result;
        for (let i = 0; i < this.districtLevelDetails.length; i++) {
          // tslint:disable-next-line: radix
          this.reportTotals.GODOWNS_SACTIONED += parseInt(
            this.districtLevelDetails[i].GODOWNS_SACTIONED
          );
          // tslint:disable-next-line: radix
          this.reportTotals.SITES_READY_FOR_CONS += parseInt(
            this.districtLevelDetails[i].SITES_READY_FOR_CONS
          );
          // tslint:disable-next-line: radix
          this.reportTotals.SITE_NOT_SUITABLE_FOR_CONS += parseInt(
            this.districtLevelDetails[i].SITE_NOT_SUITABLE_FOR_CONS
          );
          // tslint:disable-next-line: radix
          // this.reportTotals.SITES_REG_NREGA_WORKS += parseInt(
          //   this.districtLevelDetails[i].SITES_REG_NREGA_WORKS
          // );
          // tslint:disable-next-line: radix
          this.reportTotals.FOUNDATION_STAGE += parseInt(
            this.districtLevelDetails[i].FOUNDATION_STAGE
          );
          // tslint:disable-next-line: radix
          this.reportTotals.SUPER_STRUCTURE_STAGE += parseInt(
            this.districtLevelDetails[i].SUPER_STRUCTURE_STAGE
          );
          // tslint:disable-next-line: radix
          this.reportTotals.FINISHING_STAGE += parseInt(
            this.districtLevelDetails[i].FINISHING_STAGE
          );
          const singleRow = {
            S_NO: i + 1,
            MANDAL_NAME: this.districtLevelDetails[i].MANDAL_NAME,
            GODOWNS_SACTIONED: this.districtLevelDetails[i].GODOWNS_SACTIONED,
            SITES_READY_FOR_CONS:
              this.districtLevelDetails[i].SITES_READY_FOR_CONS,
            // SITES_REG_NREGA_WORKS:
            //   this.districtLevelDetails[i].SITES_REG_NREGA_WORKS,
            SITE_NOT_SUITABLE_FOR_CONS:
              this.districtLevelDetails[i].SITE_NOT_SUITABLE_FOR_CONS,
            FOUNDATION_STAGE: this.districtLevelDetails[i].FOUNDATION_STAGE,
            SUPER_STRUCTURE_STAGE:
              this.districtLevelDetails[i].SUPER_STRUCTURE_STAGE,
            FINISHING_STAGE: this.districtLevelDetails[i].FINISHING_STAGE,
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
      'Land Inspection District Level Report',
      true
    );
  }

  async btnPDF(): Promise<void> {
    try {
      const fileName = 'districtLevelMPFCLandInspection';
      let basePDF = '';
      const req = {
        districtId: this.districtId,
      };
      this.spinner.show();
      const response =
        await this.inspectionAPI.mpfcLandInspectionDistrictReport(req);
      if (response.success) {
        basePDF = response.result;
        this.utils.downloadPdfFile(basePDF, fileName);
      } else {
        this.toast.info(response.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  btnGetDetails(obj:any): void {
    const requestData = {
      districtId: this.districtId,
      districtName: this.districtName,
      mandalId:obj.MANDAL_CODE,
      mandalName:obj.MANDAL_NAME,
    };
debugger;
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
