import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { DllicService } from 'src/app/dllicModule/services/dllic.service';
import { NgxToasterService } from 'src/app/sharedModule/services/ngx-toaster.service';
import { SessionService } from 'src/app/sharedModule/services/session.service';
import { ToasterService } from 'src/app/sharedModule/services/toaster.service';
import { UtilsService } from 'src/app/sharedModule/services/utils.service';

@Component({
  selector: 'app-inspection-dashboard',
  templateUrl: './inspection-dashboard.component.html',
  styleUrls: ['./inspection-dashboard.component.css']
})
export class InspectionDashboardComponent implements OnInit , OnDestroy, AfterViewInit
{
  districtId = '';
  divisionId = '';
  inspectionList: any[] = [];
  headingText = '';
  requestType = '';

  dashboardCounts = {
    Pending: 0,
    Approve: 0,
    Reject: 0,
  };

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;

  dtOptions: DataTables.Settings = this.utils.dataTableOptions();
  dtTrigger: Subject<any> = new Subject();

  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private ngxToaster: NgxToasterService,
    private router: Router,
    private utils: UtilsService,
    private session: SessionService,
    private dllicAPI: DllicService
  ) {}

  ngOnInit(): void {
    this.districtId = this.session.districtId;
    this.divisionId = this.session.divisionId;
    this.loadDashboardCounts();
  }

  async loadDashboardCounts(): Promise<void> {
    try {
      const req = {
        districtId: this.districtId,
        divisionId: this.divisionId,
      };
      this.spinner.show();
      const response = await this.dllicAPI.committeInspectionDashboard(req);
      this.spinner.hide();
      if (response.success) {
        this.dashboardCounts = response.result[0];
      } else {
        this.toast.info(response.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async btnInspectionrDashboardDetails(obj: any): Promise<void> {
    try {
      this.inspectionList = [];
      this.requestType = obj;

      if (this.requestType === '0' && this.dashboardCounts.Pending === 0) {
        return;
      }
      if (this.requestType === '1' && this.dashboardCounts.Approve === 0) {
        return;
      }
      if (this.requestType === '2' && this.dashboardCounts.Reject === 0) {
        return;
      }
      const req = {
        districtId: this.districtId,
        divisionId: this.divisionId,
        status: '0',
      };

      this.spinner.show();
      let res: any;
      if (this.requestType === '0') {
        this.headingText = 'PENDING LIST';
        req.status = '0';
        res = await this.dllicAPI.committeInspectionList(req);
      } else if (this.requestType === '1') {
        this.headingText = 'APPROVED LIST';
        req.status = '1';
        res = await this.dllicAPI.committeInspectionList(req);
      } else if (this.requestType === '2') {
        this.headingText = 'REJECTED LIST';
        req.status = '2';
        res = await this.dllicAPI.committeInspectionList(req);
      }
      this.spinner.hide();

      if (res.success) {
        this.inspectionList = res.result;
        this.rerender();
      } else {
        this.toast.info(res.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async btnViewDetails(obj: any): Promise<void> {
    try {
      const encryptedString = this.utils.encrypt(JSON.stringify(obj));
      this.router.navigate(['/dllic/siteInspectionUpdate'], {
        queryParams: { request: encryptedString },
      });
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

