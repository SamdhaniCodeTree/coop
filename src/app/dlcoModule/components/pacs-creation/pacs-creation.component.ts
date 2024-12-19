import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConsoleService } from 'src/app/sharedModule/services/console.service';
import { NgxToasterService } from 'src/app/sharedModule/services/ngx-toaster.service';
import { SessionService } from 'src/app/sharedModule/services/session.service';
import { SharedService } from 'src/app/sharedModule/services/shared.service';
import { ToasterService } from 'src/app/sharedModule/services/toaster.service';
import { UtilsService } from 'src/app/sharedModule/services/utils.service';
import { pacsReqModel, villagesModel } from '../../models/pacs-creation.model';
import { DlcoService } from '../../services/dlco.service';

@Component({
  selector: 'app-pacs-creation',
  templateUrl: './pacs-creation.component.html',
  styleUrls: ['./pacs-creation.component.css'],
})
export class PacsCreationComponent implements OnInit {
  pacReq: pacsReqModel = {
    districtId: '',
    divisionId: '',
    mandalId: '',
    pacName: '',
    villagesList: [],
    insertedBy: '',
    source: 'web',
  };

  mandalList: any[] = [];
  villageList: any[] = [];

  selectedItems: villagesModel[] = [];
  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private ngxToaster: NgxToasterService,
    private router: Router,
    private utils: UtilsService,
    private session: SessionService,
    private console: ConsoleService,
    private sharedAPI: SharedService,
    private dlcoAPI: DlcoService
  ) {}

  ngOnInit(): void {
    this.loadMandalList();
  }

  async loadMandalList(): Promise<void> {
    try {
      this.pacReq.districtId = this.session.districtId;
      this.pacReq.divisionId = this.session.divisionId;
      this.spinner.show();
      const response = await this.sharedAPI.mandalList(this.pacReq);
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

  async loadVillageList(): Promise<void> {
    try {
      this.selectedItems = [];
      this.pacReq.villagesList = [];
      this.pacReq.pacName = '';
      this.villageList = [];
      if (this.utils.isEmpty(this.pacReq.mandalId)) {
        return;
      }
      this.pacReq.districtId = this.session.districtId;
      this.pacReq.divisionId = this.session.divisionId;
      this.spinner.show();
      const response = await this.sharedAPI.pacsNotAssignedVillageList(
        this.pacReq
      );
      this.spinner.hide();
      if (response.success) {
        this.villageList = response.result;
      } else {
        this.toast.info(response.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async btnSubmit(): Promise<void> {
    try {
      if (this.utils.isEmpty(this.pacReq.mandalId)) {
        this.toast.warning('Select mandal');
        return;
      }
      if (this.selectedItems.length < 1) {
        this.toast.warning('Select atleast one village');
        return;
      }
      if (this.utils.isEmpty(this.pacReq.pacName)) {
        this.toast.warning('Enter PAC name');
        return;
      }
      if (!this.utils.isValidName(this.pacReq.pacName)) {
        this.toast.warning('Enter Valid PAC name');
        return;
      }
      if (await this.pacNameCheck()) {
        this.pacReq.villagesList = this.selectedItems;
        this.pacReq.insertedBy = this.session.uniqueId;
        this.spinner.show();
        const response = await this.dlcoAPI.pacsSub(this.pacReq);
        this.spinner.hide();
        if (response.success) {
          alert(response.message);
          window.location.reload();
        } else {
          this.toast.info(response.message);
        }
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async pacNameCheck(): Promise<boolean> {
    let result = false;
    try {
      this.spinner.show();
      const response = await this.dlcoAPI.pacNameCheck(this.pacReq);
      this.spinner.hide();
      if (response.success) {
        result = true;
      } else {
        this.toast.info(response.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
    return result;
  }
}
