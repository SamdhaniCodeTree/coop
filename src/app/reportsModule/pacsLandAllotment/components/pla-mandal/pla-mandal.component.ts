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
import { SharedService } from 'src/app/sharedModule/services/shared.service';
import { ToasterService } from 'src/app/sharedModule/services/toaster.service';
import { UtilsService } from 'src/app/sharedModule/services/utils.service';
import { PacsLandAllotmentService } from '../../services/pacs-land-allotment.service';

@Component({
  selector: 'app-pla-mandal',
  templateUrl: './pla-mandal.component.html',
  styleUrls: ['./pla-mandal.component.css'],
})
export class PlaMandalComponent
  implements OnInit, OnDestroy, AfterViewInit, OnChanges
{
  [x: string]: any;
  @Input() fromDate: any;
  @Input() toDate: any;
  @Input() tempId: any;
  @Input() districtId: any;
  @Input() districtName: any;
  @Input() mandalId: any;
  @Input() mandalName: any;
  mandalLevelDetails: any = [];

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
    private sharedAPI: SharedService
  ) {}

  ngOnInit(): void {
    // this.loadReport();
  }
  ngOnChanges(): void {
    if (
      !this.utils.isEmpty(this.fromDate) &&
      !this.utils.isEmpty(this.toDate) &&
      !this.utils.isEmpty(this.districtId) &&
      !this.utils.isEmpty(this.mandalId)
    ) {
      this.loadReport();
    }
  }

  async loadReport(): Promise<void> {
    try {
      const req = {
        districtId: this.districtId,
        mandalId: this.mandalId,
        fromDate: this.fromDate,
        toDate: this.toDate,
      };
      this.spinner.show();
      const response = await this.allotmentAPI.pacsLandAllotmentMandalReport(
        req
      );
      this.spinner.hide();
      if (response.success) {
        this.excelData = [];
        this.mandalLevelDetails = response.result;
        for (let i = 0; i < this.mandalLevelDetails.length; i++) {
          const singleRow = {
            S_NO: i + 1,
            DIVISION_NAME: this.mandalLevelDetails[i].DIVISION_NAME,
            VILLAGE_NAME: this.mandalLevelDetails[i].VILLAGE_NAME,
            PUBLIC_OWN_LAND: this.mandalLevelDetails[i].PUBLIC_OWN_LAND,
            SURVEY_NUMBER: this.mandalLevelDetails[i].SURVEY_NUMBER,
            AREA: this.mandalLevelDetails[i].AREA,
            LAND_ALLOTMENT_STATUS:
              this.mandalLevelDetails[i].LAND_ALLOTMENT_STATUS,
            LATITUDE: this.mandalLevelDetails[i].LATITUDE,
            LONGITUDE: this.mandalLevelDetails[i].LONGITUDE,
            NORTH_BOUNDARY: this.mandalLevelDetails[i].NORTH_BOUNDARY,
            SOUTH_BOUNDARY: this.mandalLevelDetails[i].SOUTH_BOUNDARY,
            EAST_BOUNDARY: this.mandalLevelDetails[i].EAST_BOUNDARY,
            WEST_BOUNDARY: this.mandalLevelDetails[i].WEST_BOUNDARY,
            HANDOVER_VILLAGE_NAME:
              this.mandalLevelDetails[i].HANDOVER_VILLAGE_NAME,
            SIGNED_BY_PERSON: this.mandalLevelDetails[i].SIGNED_BY_PERSON,
            LAND_TAKEN_BY_NAME: this.mandalLevelDetails[i].LAND_TAKEN_BY_NAME,
            LAND_TAKEN_BY_MOB_NO:
              this.mandalLevelDetails[i].LAND_TAKEN_BY_MOB_NO,
            LAND_TAKEN_BY_DISIGNATION:
              this.mandalLevelDetails[i].LAND_TAKEN_BY_DISIGNATION,
            LAND_HANDOVER_BY_NAME:
              this.mandalLevelDetails[i].LAND_HANDOVER_BY_NAME,
            LAND_HANDOVER_BY_MOB_NO:
              this.mandalLevelDetails[i].LAND_HANDOVER_BY_MOB_NO,
            LAND_HANDOVER_BY_DISIGNATION:
              this.mandalLevelDetails[i].LAND_HANDOVER_BY_DISIGNATION,
          };
          this.excelData.push(singleRow);
        }
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
      'Land Allotment Mandal Level Report',
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
      const fileName = 'mandalLevelMPFCLandAllotment';
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

  async btnPdfView(path: string): Promise<void> {
    try {
      await this.utils.viewJPVPDFcop(path);
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async btnPhotoView(path: string): Promise<void> {
    try {
      debugger;
      await this.utils.viewJPVImagecop(path);
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
}
