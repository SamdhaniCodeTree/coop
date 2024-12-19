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
  selector: 'app-pacsgeotagginglist',
  templateUrl: './pacsgeotagginglist.component.html',
  styleUrls: ['./pacsgeotagginglist.component.css']
})
export class PacsgeotagginglistComponent implements OnInit {

  geotagmodal= false;
  rbklistmodal= false;
  levelStatus = 0;
  dataAvailable = false;
  dataNotAvailable = false;
  geotagstatus = '';
  maxDate!: Date;
  Geotaglist: any[] = [];
  Geotaglistcompleted: any[] = [];
  rbklistall: any[] = [];
  reportTotals = {
    NO_OF_CEO_REGIS: 0,
    NO_OF_NOT_SUB_PACS: 0,
    NO_OF_NOT_SUB_RBKS: 0,
    NO_OF_SUB_PACS: 0,
    NO_OF_SUB_RBKS: 0,
    TOTAL_PACS: 0,
    TOTAL_RBKS: 0,
  };
  excelData: any[] = [];
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
    
    this.geotaglist();
  }

  
  async geotaglist(): Promise<void> {
    try {
     
      const req = {
        type:'1',
        districtId:'',
        divisionId:'',
        mandalId:'',
        pacsId:'',
        rbkId:'',
      };
      this.reportTotals = {
        NO_OF_CEO_REGIS: 0,
        NO_OF_NOT_SUB_PACS: 0,
        NO_OF_NOT_SUB_RBKS: 0,
        NO_OF_SUB_PACS: 0,
        NO_OF_SUB_RBKS: 0,
        TOTAL_PACS: 0,
        TOTAL_RBKS: 0,
      };
      this.spinner.show();
      const response = await this.sharedAPI.sergeotaglist(req);
      this.spinner.hide();
      if (response.success) {
        this.excelData = [];
        this.Geotaglist = response.result;
        for (let i = 0; i < this.Geotaglist.length; i++) {
          this.reportTotals.NO_OF_CEO_REGIS += parseInt(
            this.Geotaglist[i].NO_OF_CEO_REGIS
          );
          this.reportTotals.NO_OF_NOT_SUB_PACS += parseInt(
            this.Geotaglist[i].NO_OF_NOT_SUB_PACS
          );
          this.reportTotals.NO_OF_NOT_SUB_RBKS += parseInt(
            this.Geotaglist[i].NO_OF_NOT_SUB_RBKS
          );
          this.reportTotals.NO_OF_SUB_PACS += parseInt(
            this.Geotaglist[i].NO_OF_SUB_PACS
          );
          this.reportTotals.NO_OF_SUB_RBKS += parseInt(
            this.Geotaglist[i].NO_OF_SUB_RBKS
          );
          this.reportTotals.TOTAL_PACS += parseInt(
            this.Geotaglist[i].TOTAL_PACS
          );
          this.reportTotals.TOTAL_RBKS += parseInt(
            this.Geotaglist[i].TOTAL_RBKS
          );
          const singleRow = {
            S_NO: i + 1,
            DIST_NAME: this.Geotaglist[i].DIST_NAME,
            NO_OF_CEO_REGIS: this.Geotaglist[i].NO_OF_CEO_REGIS,
            TOTAL_PACS:this.Geotaglist[i].TOTAL_PACS,
            GIO_Tagged_PACS:this.Geotaglist[i].NO_OF_SUB_PACS,
            GIO_not_Tagged_PACS:this.Geotaglist[i].NO_OF_NOT_SUB_PACS,
            TOTAL_RBKS: this.Geotaglist[i].TOTAL_RBKS,
            Coverd_RBKS: this.Geotaglist[i].NO_OF_SUB_RBKS,
            Not_Submit_RBKS:this.Geotaglist[i].NO_OF_NOT_SUB_RBKS,
           
          };

          this.excelData.push(singleRow);
        }
      } 
      else {
        this.toast.info(response.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
  async getgeotagcompletedlist(obj: any): Promise<void> {
    try {
      const req = {
        type:'2',
        districtId:obj.DISTRICT_CODE,
        divisionId:'',
        mandalId:'',
        pacsId:'',
        rbkId:'',
      };
      this.geotagstatus='';
      this.spinner.show();
      const response = await this.sharedAPI.sergeotaglist(req);
      this.spinner.hide();
      if (response.success) {
        this.geotagstatus='District Name: '+obj.DIST_NAME+' (Geotag Completed)';
        this.geotagmodal = true;
        this.Geotaglistcompleted = [];
        this.Geotaglistcompleted = response.result;
       
      } 
      else {
        this.toast.info(response.message);
      }
          
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
    
  }
  async getgeotagpendinglist(obj: any): Promise<void> {
    try {
      const req = {
        type:'3',
        districtId:obj.DISTRICT_CODE,
        divisionId:'',
        mandalId:'',
        pacsId:'',
        rbkId:'',
      };
       this.geotagstatus='';
      this.spinner.show();
      const response = await this.sharedAPI.sergeotaglist(req);
      this.spinner.hide();
      if (response.success) {
        this.geotagstatus='District Name: '+obj.DIST_NAME+' (Geotag Pending)';
        this.geotagmodal = true;
        this.Geotaglistcompleted = [];
        this.Geotaglistcompleted = response.result;
       
       
      } 
      else {
        this.toast.info(response.message);
      }
          
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
    
  }
  async getrbklist(obj: any): Promise<void> {
    try {
      const req = {
        type:'4',
        districtId:obj.DISTRICT_CODE,
        divisionId:'',
        mandalId:'',
        pacsId:'',
        rbkId:'',
      };
      this.spinner.show();
      const response = await this.sharedAPI.sergeotaglist(req);
      this.spinner.hide();
      if (response.success) {
        this.rbklistmodal = true;
        this.rbklistall = [];
        this.rbklistall = response.result;
       
      } 
      else {
        this.toast.info(response.message);
      }
          
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
    
  }
  btnExcelDownload(): void {
    this.utils.JSONToCSVConvertor(
      this.excelData,
      'Packs Geo Tagging',
      true
    );
  }

  
}
 