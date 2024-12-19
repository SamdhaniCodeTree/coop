import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
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
  selector: 'app-internet-department-verification',
  templateUrl: './internet-department-verification.component.html',
  styleUrls: ['./internet-department-verification.component.css']
})
export class InternetDepartmentVerificationComponent implements OnInit {


  type = '';
  districtId = '';
  @Output() onDistrictChange = new EventEmitter<string>();
  DeparmentList: any = [];





  userrole = '';
  excelData: any[] = [];




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

      this.DeparmentList = [];
      const req = {
        type: "9",
      };

      this.spinner.show();

      const response = await this.ceoAPI.InternetGetDetails(req);
      this.spinner.hide();
      debugger;
      if (response.success) {
        this.DeparmentList = response.result;
        this.excelData = this.DeparmentList;


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
      this.Departmentverify(pacs);
      await this.utils.viewJPVPDFcop(path);
      // await this.utils.viewJPVPDFcopcrystal(path);
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async Departmentverify(packcode: any): Promise<void> {
    try {

      debugger;
      const req = {
        type: "10",
        num1: "5",
        pacs_code: packcode,
        inserted_by: this.session.userName,
        role: this.session.role

      };

      this.spinner.show();

      const response = await this.ceoAPI.InternetGetDetails(req);
      this.spinner.hide();
      debugger;
      if (response.success) {

        this.LoadReport();

      }
      else {
        // this.toast.info(response.message);
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
