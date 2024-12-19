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
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataTableDirective } from 'angular-datatables';
import { ConsoleService } from 'src/app/sharedModule/services/console.service';
import { InspectionService } from 'src/app/sharedModule/services/inspection.service';
import { NgxToasterService } from 'src/app/sharedModule/services/ngx-toaster.service';
import { SessionService } from 'src/app/sharedModule/services/session.service';
import { SharedService } from 'src/app/sharedModule/services/shared.service';
import { ToasterService } from 'src/app/sharedModule/services/toaster.service';
import { UtilsService } from 'src/app/sharedModule/services/utils.service';

@Component({
  selector: 'app-pacsmaster',
  templateUrl: './pacsmaster.component.html',
  styleUrls: ['./pacsmaster.component.css']
})
export class PacsmasterComponent implements OnInit {
  districtId = '';
  levelStatus = 0;
  dataAvailable = false;
  dataNotAvailable = false;
  maxDate!: Date;
  packsmasterlist: any[] = [];
  districtlist: any[] = [];

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
    private dllicAPI: InspectionService,
    private sharedAPI: SharedService,
    private sanitizer: DomSanitizer
  ) {
    this.maxDate = this.session.getTodayDate();
  }

  ngOnInit(): void {
    this.loaddistrict();
     
  }


  async packslist(): Promise<void> {
    
    try {
      
      if (this.utils.isEmpty(this.districtId)) {
        this.toast.warning('select district');
        return;
      }
      else{
        const req = {

          type: '3',
          mandalname: '',
          mandalcode: '',
          pacsname: '',
          pacscode: '',
          rbkname: '',
          rbkcode: '',
          villagename: '',
          villagecode: '',
          revvillagecode: '',
          updatedby: '',
          distcode: this.districtId,
          distname: '',
          divisoncode: '',
          divisionname: ''
        };
        this.spinner.show();
        const response = await this.sharedAPI.adminpacksist(req);
        this.spinner.hide();
        if (response.success) {
          this.packsmasterlist = response.result;
        } else {
          this.toast.info(response.message);
        }
      }
     
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
  btnExcelDownload(): void {
    this.utils.JSONToCSVConvertor(
      this.packsmasterlist,
      'Packs Master',
      true
    );
  }
  async loaddistrict(): Promise<void> {
    try {

       
      this.spinner.show();
      const response = await this.sharedAPI.districtList();
      this.spinner.hide();
      if (response.success) {
        this.districtlist = response.result;
      } else {
        this.toast.info(response.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
  btnupdatepassword(obj: any): void {
    this.packsmasterlist = obj.result;
    try {
      if (confirm('are you sure want delete')) {


      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }


  }

}
