import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { ConsoleService } from 'src/app/sharedModule/services/console.service';
import { NgxToasterService } from 'src/app/sharedModule/services/ngx-toaster.service';
import { SessionService } from 'src/app/sharedModule/services/session.service';
import { SharedService } from 'src/app/sharedModule/services/shared.service';
import { ToasterService } from 'src/app/sharedModule/services/toaster.service';
import { UtilsService } from 'src/app/sharedModule/services/utils.service';
import { DcoService } from '../../services/dco.service';

@Component({
  selector: 'app-ceo-list',
  templateUrl: './ceo-list.component.html',
  styleUrls: ['./ceo-list.component.css'],
})
export class CeoListComponent implements OnInit, OnDestroy, AfterViewInit {
  districtId = '';
  divisionId = '';
  mandalId = '';
  divisionList: any[] = [];
  mandalList: any[] = [];
  ceoList: any[] = [];

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
    private console: ConsoleService,
    private sharedAPI: SharedService,
    private dcoAPI: DcoService
  ) {}

  ngOnInit(): void {
    this.districtId = this.session.districtId;
    this.loadDivisionList();
  }

  async loadDivisionList(): Promise<void> {
    try {
      this.divisionId = '';
      this.divisionList = [];
      const req = {
        districtId: this.districtId,
      };
      this.spinner.show();
      const response = await this.sharedAPI.divisionList(req);
      this.spinner.hide();
      if (response.success) {
        this.divisionList = response.result;
      } else {
        this.toast.info(response.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async loadDivisionChange(): Promise<void> {
    try {
      this.mandalId = '';
      this.mandalList = [];
      this.ceoList = [];
      if (this.utils.isEmpty(this.divisionId)) {
        return;
      }
      const req = {
        districtId: this.session.districtId,
        divisionId: this.divisionId,
      };
      this.spinner.show();
      const response = await this.sharedAPI.mandalList(req);
      this.spinner.hide();
      if (response.success) {
        this.mandalList = response.result;
      } else {
        this.toast.info(response.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async onMandalChange(): Promise<void> {
    try {
      this.ceoList = [];
      if (this.utils.isEmpty(this.mandalId)) {
        return;
      }
      const req = {
        mandalId: this.mandalId,
      };
      this.spinner.show();
      const response = await this.dcoAPI.ceoListByMandalId(req);
      this.spinner.hide();
      if (response.success) {
        this.ceoList = response.result;
        this.rerender();
      } else {
        this.toast.info(response.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async btnResend(obj: any): Promise<void> {
    try {
      const req = {
        uniqueId: obj.UNIQUE_ID,
      };
      this.spinner.show();
      const response = await this.dcoAPI.ceoResendPassword(req);
      this.spinner.hide();
      if (response.success) {
        this.ngxToaster.success(response.message);
        this.onMandalChange();
      } else {
        this.ngxToaster.info(response.message);
      }
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
