import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import * as moment from 'moment';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { PacsLandAllotmentService } from 'src/app/reportsModule/pacsLandAllotment/services/pacs-land-allotment.service';
import { SessionService } from 'src/app/sharedModule/services/session.service';
import { ToasterService } from 'src/app/sharedModule/services/toaster.service';
import { UtilsService } from 'src/app/sharedModule/services/utils.service';

@Component({
  selector: 'app-pacs-wise-device-rec-status-rpt',
  templateUrl: './pacs-wise-device-rec-status-rpt.component.html',
  styleUrls: ['./pacs-wise-device-rec-status-rpt.component.css']
})
export class PacsWiseDeviceRecStatusRptComponent implements OnInit {

  @ViewChild(DataTableDirective, { static: false })
  bsDatepickerConfig: Partial<BsDatepickerConfig> = this.utils.getbsdatepicker();

  dtElement!: DataTableDirective;

  @ViewChildren(DataTableDirective) dtElementslist!:QueryList<DataTableDirective>;

  dtOptions: DataTables.Settings = this.utils.dataTableOptions();
  dtTrigger2: Subject<any> = new Subject();
  dtTrigger: Subject<any> = new Subject();

  level1: boolean = false;
  level2: boolean = false;

  sortDir = 1;//1= 'ASE' -1= DSC


  tempId: any;
  fromDate: any;
  toDate: any;
  reportFromDate: any;
  reportToDate: any;
  minDate!: Date;
  maxDate!: Date;

  FromDateformat:any;
  ToDateformat:any;

    districtId: any;
  districtName: any;
   mandalId: any;
  mandalName: any;

  Mandal_div=false;
  District_div=true;
  Rbk_div=false;

  type = '';
  
  stateLevelDetails: any = [];
  districtLevelDetails: any = [];
  mandalLevelDetails: any = [];


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
    SANCTION_LANDS: 0,
    TOTAL_SUBMIT_VILLAGES:0,
    PERCENTAGE_COMPLETED: 0,
    TOTAL_LAND_NOT_SUBMITTED: 0,
    PERCENTAGE_NOT_COMPLETED: 0,
    TOTAL_LAND_HANDOVER_SUBMIT: 0,
    TOTAL_LAND_HANDOVER_NOT_SUBMIT: 0,
  };

  reportTotalsMandals = {
    S_NO: '-',
    MANDAL: 'TOTAL',
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

  excelDatadistrict: any[] = [];
  excelDataMandals: any[] = [];
  excelDataRbks: any[] = [];
  datedisable=false;

  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private session: SessionService,
    private allotmentAPI: PacsLandAllotmentService,
    private utils: UtilsService
  ) {}
  ngOnInit(): void {

   

    this.minDate =new Date()// this.session.getMinDate();
    this.maxDate = new Date(); //this.session.getTodayDate();
    this.fromDate =new Date('06-01-2022');//moment(this.session.getFromDateString()).format('DD-MM-YYYY');
    this.toDate =new Date();// this.session.getTodayDateString();

    this.FromDateformat=moment(this.fromDate, 'DD-MM-YYYY').format('YYYY/MM/DD');
    this.ToDateformat=moment(this.toDate, 'DD-MM-YYYY').format('YYYY/MM/DD');
    
    this.loadReport();
  }

  btnLoadReport(): void {
    if (this.utils.isEmpty(this.fromDate)) {
      this.toast.warning('From Date Is Empty');
      return;
    }
    if (this.utils.isEmpty(this.toDate)) {
      this.toast.warning('To Date Is Empty');
      return;
    }
    this.FromDateformat=moment(this.fromDate, 'DD-MM-YYYY').format('YYYY/MM/DD');
    this.ToDateformat=moment(this.toDate, 'DD-MM-YYYY').format('YYYY/MM/DD');

    this.loadReport();

    
  }
  async loadReport(): Promise<void> {
    try {
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
        SANCTION_LANDS: 0,
        TOTAL_SUBMIT_VILLAGES:0,
        PERCENTAGE_COMPLETED: 0,
        TOTAL_LAND_NOT_SUBMITTED: 0,
        PERCENTAGE_NOT_COMPLETED: 0,
        TOTAL_LAND_HANDOVER_SUBMIT: 0,
        TOTAL_LAND_HANDOVER_NOT_SUBMIT: 0,
      };
      
     
      const req = {
        fromDate: this.FromDateformat,
        toDate: this.ToDateformat,
        type:"1",
        districtId:this.districtId,
      };
      this.spinner.show();
      const response = await this.allotmentAPI.pacsLandAllotmentStateReportPhasetwo(
        req
      );
      this.spinner.hide();
      if (response.success) {
        
        this.excelDatadistrict = [];
        this.District_div=true
        this.Mandal_div=false;
        
        
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
          // tslint:disable-next-line: radix
          this.reportTotals.SANCTION_LANDS += parseInt(
            this.stateLevelDetails[i].SANCTION_LANDS
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
              SANCTION_LANDS:
              this.stateLevelDetails[i].SANCTION_LANDS,
            PERCENTAGE_COMPLETED:
              this.stateLevelDetails[i].PERCENTAGE_COMPLETED,
            TOTAL_LAND_NOT_SUBMITTED:
              this.stateLevelDetails[i].TOTAL_LAND_NOT_SUBMITTED,
              TOTAL_SUBMIT_VILLAGES:
              this.stateLevelDetails[i].TOTAL_SUBMIT_VILLAGES,
            PERCENTAGE_NOT_COMPLETED:
              this.stateLevelDetails[i].PERCENTAGE_NOT_COMPLETED,
            TOTAL_LAND_HANDOVER_SUBMIT:
              this.stateLevelDetails[i].TOTAL_LAND_HANDOVER_SUBMIT,
            TOTAL_LAND_HANDOVER_NOT_SUBMIT:
              this.stateLevelDetails[i].TOTAL_LAND_HANDOVER_NOT_SUBMIT,
          };

          this.excelDatadistrict.push(singleRow);
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
        this.excelDatadistrict.push(this.reportTotals);
      } else {
        this.toast.info(response.message);
      }
      this.rerender();
     // this.dtTrigger.next();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }


  btnGetDetails(obj: any): void {

    this.districtId= obj.DIST_CODE;
    this.districtName= obj.DISTRICT_NAME;
    // this.mandalName=obj.MANDAL_NAME,
    // this.mandalId= obj.MANDAL_CODE,
    this.loadReportMandal();
    
  }
  

  btnGetDetails_rbks(obj: any): void {
   
    this.districtId= obj.DISTRICT_CODE;
    this.districtName= obj.DISTRICT_NAME;
    this.mandalName=obj.MANDAL_NAME,
    this.mandalId= obj.MANDAL_CODE,
    this.loadReportRbks();
    
   
  }


  btnback():void{
    this.District_div=true;
        this.Mandal_div=false;
        this.Rbk_div=false;
        
  }
  btnrbk_back():void{
    this.District_div=false;
        this.Mandal_div=true;
        this.Rbk_div=false;
        
  }
  
  

  async loadReportMandal(): Promise<void> {
    try {
      this.reportTotalsMandals = {
        S_NO: '-',
        MANDAL: 'TOTAL',
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
      const req = {
        districtId: this.districtId,
        fromDate: this.FromDateformat,
        toDate: this.ToDateformat,
        type:"2",
      };
debugger;
      this.spinner.show();
      const response = await this.allotmentAPI.pacsLandAllotmentStateReportPhasetwo(
        req
      );
      this.spinner.hide();
      if (response.success) {
        this.District_div=false;
        this.Mandal_div=true;

        this.excelDataMandals = [];
        
        this.districtLevelDetails = response.result;
        for (let i = 0; i < this.districtLevelDetails.length; i++) {
          // tslint:disable-next-line: radix
          this.reportTotalsMandals.TOTAL_RBKS += parseInt(
            this.districtLevelDetails[i].TOTAL_RBKS
          );
          // tslint:disable-next-line: radix
          this.reportTotalsMandals.TOTAL_SUBMIT_RBKS += parseInt(
            this.districtLevelDetails[i].TOTAL_SUBMIT_RBKS
          );
          // tslint:disable-next-line: radix
          this.reportTotalsMandals.TOTAL_NOT_SUBMIT_RBKS += parseInt(
            this.districtLevelDetails[i].TOTAL_NOT_SUBMIT_RBKS
          );
          // tslint:disable-next-line: radix
          this.reportTotalsMandals.TOTAL_LAND_SUBMITTED += parseInt(
            this.districtLevelDetails[i].TOTAL_LAND_SUBMITTED
          );
          this.reportTotalsMandals.TOTAL_SUBMIT_VILLAGES += parseInt(
            this.districtLevelDetails[i].TOTAL_SUBMIT_VILLAGES
          );
          // tslint:disable-next-line: radix
          this.reportTotalsMandals.TOTAL_LAND_NOT_SUBMITTED += parseInt(
            this.districtLevelDetails[i].TOTAL_LAND_NOT_SUBMITTED
          );
          // tslint:disable-next-line: radix
          this.reportTotalsMandals.TOTAL_LAND_HANDOVER_SUBMIT += parseInt(
            this.districtLevelDetails[i].TOTAL_LAND_HANDOVER_SUBMIT
          );
          // tslint:disable-next-line: radix
          this.reportTotalsMandals.TOTAL_LAND_HANDOVER_NOT_SUBMIT += parseInt(
            this.districtLevelDetails[i].TOTAL_LAND_HANDOVER_NOT_SUBMIT
          );
          const singleRow = {
            S_NO: i + 1,
            MANDAL: this.districtLevelDetails[i].MANDAL_NAME,
            TOTAL_RBKS: this.districtLevelDetails[i].TOTAL_RBKS,
            TOTAL_SUBMIT_RBKS: this.districtLevelDetails[i].TOTAL_SUBMIT_RBKS,
            TOTAL_NOT_SUBMIT_RBKS:
              this.districtLevelDetails[i].TOTAL_NOT_SUBMIT_RBKS,
            TOTAL_LAND_SUBMITTED:
              this.districtLevelDetails[i].TOTAL_LAND_SUBMITTED,
              TOTAL_SUBMIT_VILLAGES:
              this.districtLevelDetails[i].TOTAL_SUBMIT_VILLAGES,
            PERCENTAGE_COMPLETED:
              this.districtLevelDetails[i].PERCENTAGE_COMPLETED,            
              
            TOTAL_LAND_NOT_SUBMITTED:
              this.districtLevelDetails[i].TOTAL_LAND_NOT_SUBMITTED,
            PERCENTAGE_NOT_COMPLETED:
              this.districtLevelDetails[i].PERCENTAGE_NOT_COMPLETED,
            TOTAL_LAND_HANDOVER_SUBMIT:
              this.districtLevelDetails[i].TOTAL_LAND_HANDOVER_SUBMIT,
            TOTAL_LAND_HANDOVER_NOT_SUBMIT:
              this.districtLevelDetails[i].TOTAL_LAND_HANDOVER_NOT_SUBMIT,
          };
          debugger;
          this.excelDataMandals.push(singleRow);
        }
        this.reportTotalsMandals.PERCENTAGE_COMPLETED =
          (this.reportTotalsMandals.TOTAL_SUBMIT_RBKS /
            this.reportTotalsMandals.TOTAL_RBKS) *
          100;
        this.reportTotalsMandals.PERCENTAGE_COMPLETED = parseFloat(
          this.reportTotalsMandals.PERCENTAGE_COMPLETED.toFixed(2)
        );
        this.reportTotalsMandals.PERCENTAGE_NOT_COMPLETED =
          (this.reportTotalsMandals.TOTAL_NOT_SUBMIT_RBKS /
            this.reportTotalsMandals.TOTAL_RBKS) *
          100;
        this.reportTotalsMandals.PERCENTAGE_NOT_COMPLETED = parseFloat(
          this.reportTotalsMandals.PERCENTAGE_NOT_COMPLETED.toFixed(2)
        );
        this.excelDataMandals.push(this.reportTotalsMandals);
        if (this.level1) {
          this.rebindDataTable_unitdata();
        }
        else { this.dtTrigger2.next(); this.level1 = true; }
      } else {
        this.District_div=true;
        this.Mandal_div=false;
        this.toast.info(response.message);
      }
      
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async loadReportRbks(): Promise<void> {
    try {
      const req = {
        districtId: this.districtId,
        mandalId: this.mandalId,
        fromDate: this.FromDateformat,
        toDate: this.ToDateformat,
        type:"3",
      };
      this.spinner.show();
      const response = await this.allotmentAPI.pacsLandAllotmentStateReportPhasetwo(
        req
      );
      debugger;
      // this.spinner.hide();
      if (response.success) {
        this.District_div=false;
        this.Mandal_div=false;
        this.Rbk_div=true;
        this.spinner.hide();
        this.excelDataRbks = [];
        this.mandalLevelDetails = response.result;
        for (let i = 0; i < this.mandalLevelDetails.length; i++) {

          const singleRow = {
            S_NO: i + 1,
          
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
          this.excelDataRbks.push(singleRow);
        }
      } else {
        this.spinner.hide();
        this.District_div=false;
        this.Mandal_div=true;
        this.Rbk_div=false;
        this.toast.info(response.message);
      }
      //this.rerender();
    } catch (error) {
      debugger;
      this.spinner.hide();
      //this.utils.catchResponse(error);
    }
  }

  async btnPdfView(path: string): Promise<void> {
    try {
      debugger;
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
  btnExcelDownloadDistrict(): void {
    this.utils.JSONToCSVConvertor(
      this.excelDatadistrict,
      'Land Allotment District Level Report',
      true
    );
  }
  btnExcelDownloadMandal(): void {
    this.utils.JSONToCSVConvertor(
      this.excelDataMandals,
      'Land Allotment Mandal Level Report',
      true
    );
  }
  btnExcelDownload(): void {
    this.utils.JSONToCSVConvertor(
      this.excelDataRbks,
      'Land Allotment rbk Level Report',
      true
    );
  }

//   onKeyUpEvent(event: any){
//     debugger;
// this.stateLevelDetails=event;
    

//     // $('#DistrictTable').DataTable({
//     //   "searching": false // false to disable search (or any other option)
//     // });
//     // $('.dataTables_length').addClass('bs-select');
 
//  }



  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    //this.dtTrigger.unsubscribe();
  }

  ngAfterViewInit(): void {
    //this.dtTrigger.next();
  }
  rerender(): void {
    if(this.dtElement!=null){
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.clear().draw(); // Add this  line to clear all rows..
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }
  }

  rebindDataTable_unitdata() {

    this.dtElementslist.forEach((dtElement: DataTableDirective, index) => {
      if (index==1) {
        dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          console.log(dtElement);
          dtInstance.draw() && dtInstance.clear() && dtInstance.destroy() && this.dtTrigger2.next()
        });
      }
    });

  }


  onSortClick(event:any) {
    let values = ["TOTAL_MANDALS","TOTAL_SUBMIT_MANDALS","TOTAL_NOT_SUBMIT_MANDALS"];
    let target = event.currentTarget,
      classList = target.classList;

    if (classList.contains('fa-chevron-up')) {
      classList.remove('fa-chevron-up');
      classList.add('fa-chevron-down');
      this.sortDir=-1;
    } else {
      classList.add('fa-chevron-up');
      classList.remove('fa-chevron-down');
      this.sortDir=1;
    }
    values.sort((a,b) => 0 - (a > b ? -1 : 1));
    this.sortArr('DISTRICT_NAME');
    this.sortArr('TOTAL_MANDALS');
    this.sortArr('TOTAL_SUBMIT_MANDALS');
    this.sortArr('TOTAL_NOT_SUBMIT_MANDALS');
    this.sortArr('TOTAL_RBKS');
    this.sortArr('TOTAL_SUBMIT_RBKS');
    this.sortArr('TOTAL_NOT_SUBMIT_RBKS');
    this.sortArr('TOTAL_LAND_SUBMITTED');
  }

  
  sortArr(colName:any){
    // this.stateLevelDetails.sort((n1:any,n2:any) => {
    //   if (n1 > n2) {
    //       return 1;
    //   }
  
    //   if (n1 < n2) {
    //       return -1;
    //   }
  
    //   return 0;
    // });
    this.stateLevelDetails.sort((a:any,b:any)=>{
      a= a[colName].toLowerCase();
      b= b[colName].toLowerCase();
      return a.localeCompare(b) *this.sortDir;
    });
  }

  
}
