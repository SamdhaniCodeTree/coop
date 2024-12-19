import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { PacsLandAllotmentService } from 'src/app/reportsModule/pacsLandAllotment/services/pacs-land-allotment.service';
import { ToasterService } from 'src/app/sharedModule/services/toaster.service';
import { UtilsService } from 'src/app/sharedModule/services/utils.service';
import { formatDate } from '@angular/common';
import { SessionState } from 'http2';
import { SessionService } from 'src/app/sharedModule/services/session.service';

@Component({
  selector: 'app-pacs-computerisation-abstract-division-details',
  templateUrl: './pacs-computerisation-abstract-division-details.component.html',
  styleUrls: ['./pacs-computerisation-abstract-division-details.component.css']
})
export class PacsComputerisationAbstractDivisionDetailsComponent  implements OnInit, OnDestroy, AfterViewInit
{ 
  @Input() type: any;
  @Input() districtName: any;
  @Input() districtcode: any;
  @Input() divisionName: any;
  @Input() fromDate: any;
  @Input() toDate: any;
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onDivisionChange = new EventEmitter<string>();
  @Output() onSiteNotDoneChange = new EventEmitter<string>();
  @Output() ondeviceNotDoneChange = new EventEmitter<string>();
  @Output() oncalibNotDoneChange = new EventEmitter<string>();
  @Output() onDMTNotDoneChange = new EventEmitter<string>();
  @Output() onSiteDoneChange = new EventEmitter<string>();
  @Output() onDeviceDoneChange = new EventEmitter<string>();
  @Output() onInstallDoneChange = new EventEmitter<string>();
  @Output() onDMTDoneChange = new EventEmitter<string>();
  districtLevelDetails: any = [];


  district='';
  distName='';
  fDate='';
  tDate='';
  pdfdate:any;
  
 Reportdate:any;  today=new Date();

  reportTotals = {
    S_NO: '-',        
    division: '-',
    name_of_the_dccbs: 'TOTAL',           
          total_pacs:  0,
          site_prepared_pacs_completed:  0,
          site_prepared_pacs_not_completed:  0,
          delivery_of_all_items_completed:  0,
          delivery_of_all_items_not_completed:  0,
          supply_and_installation_of_all_hardware_items_completed:  0,
          supply_and_installation_of_all_hardware_items_not_completed:  0,
          final_certificate_submitted_pacs_for_release_of_payments_completed:  0,
          final_certificate_submitted_pacs_for_release_of_payments_not_completed:  0,
  };
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
    private session :SessionService
  ) {}

  ngOnInit(): void {   
    this.Reportdate = formatDate(this.today,'ddMMyyyyhhmmssa', 'en-US', '+0530');

    this.pdfdate = formatDate(this.today,'dd-MM-yyyy hh:mm:ssa', 'en-US', '+0530');
    


  this.loadReport(); 
}
  async loadReport(): Promise<void> {
    debugger;
    try {
      this.reportTotals = {
        S_NO: '-',        
        division: '-',
        name_of_the_dccbs:'TOTAL', 
          total_pacs:  0,
          site_prepared_pacs_completed:  0,
          site_prepared_pacs_not_completed:  0,
          delivery_of_all_items_completed:  0,
          delivery_of_all_items_not_completed:  0,
          supply_and_installation_of_all_hardware_items_completed:  0,
          supply_and_installation_of_all_hardware_items_not_completed:  0,
          final_certificate_submitted_pacs_for_release_of_payments_completed:  0,
          final_certificate_submitted_pacs_for_release_of_payments_not_completed:  0,
      };

      if(this.districtcode == undefined && this.districtName == undefined){ debugger;
        this.district = this.session.districtId;
        this.districtName = this.session.districtName
      }  
      else{
        this.district= this.districtcode;
        this.districtName = this.districtName
        this.fromDate = this.fromDate
        this.toDate = this.toDate
      }
      const req = {
        
        type:"2",     
        input_01:this.district
      };
      this.spinner.show();
      const response = await this.allotmentAPI.PacsCeoDetailsGet(      //CopsConsolidatedReportGet
        req
      );
      this.spinner.hide();
      if (response.success) {
        this.excelData = [];
        
        this.districtLevelDetails = response.result;
        for (let i = 0; i < this.districtLevelDetails.length; i++) {
          // tslint:disable-next-line: radix
          this.reportTotals.total_pacs += parseInt(
            this.districtLevelDetails[i].TOTAL_PACS
          );
          // tslint:disable-next-line: radix
          this.reportTotals.site_prepared_pacs_completed += parseInt(
            this.districtLevelDetails[i].SITE_DONE
          );
          // tslint:disable-next-line: radix
          this.reportTotals.site_prepared_pacs_not_completed += parseInt(
            this.districtLevelDetails[i].SITE_NOT_DONE
          );
          // tslint:disable-next-line: radix
          this.reportTotals.delivery_of_all_items_completed += parseInt(
            this.districtLevelDetails[i].DEVICE_DONE
          );
          this.reportTotals.delivery_of_all_items_not_completed += parseInt(
            this.districtLevelDetails[i].DEVICE_NOT_DONE
          );
          // tslint:disable-next-line: radix
          this.reportTotals.supply_and_installation_of_all_hardware_items_completed += parseInt(
            this.districtLevelDetails[i].CALIBRATION_DONE
          );
          // tslint:disable-next-line: radix
          this.reportTotals.supply_and_installation_of_all_hardware_items_not_completed += parseInt(
            this.districtLevelDetails[i].CALIBRATION_NOT_DONE
          );
          // tslint:disable-next-line: radix
          this.reportTotals.final_certificate_submitted_pacs_for_release_of_payments_completed += parseInt(
            this.districtLevelDetails[i].DMT_DONE
          );
          // tslint:disable-next-line: radix
          this.reportTotals.final_certificate_submitted_pacs_for_release_of_payments_not_completed += parseInt(
            this.districtLevelDetails[i].DMT_NOT_DONE
          );
          const singleRow = {
            S_NO: i + 1,
            division: this.districtLevelDetails[i].DIV_NAME,
            name_of_the_dccbs: this.districtLevelDetails[i].NAME_OF_THE_DCCB,
            total_pacs: this.districtLevelDetails[i].TOTAL_PACS,
            site_prepared_pacs_completed:this.districtLevelDetails[i].SITE_DONE,
            site_prepared_pacs_not_completed:this.districtLevelDetails[i].SITE_NOT_DONE,
            delivery_of_all_items_completed:this.districtLevelDetails[i].DEVICE_DONE,
            delivery_of_all_items_not_completed:this.districtLevelDetails[i].DEVICE_NOT_DONE,
            supply_and_installation_of_all_hardware_items_completed:this.districtLevelDetails[i].CALIBRATION_DONE,
            supply_and_installation_of_all_hardware_items_not_completed:this.districtLevelDetails[i].CALIBRATION_NOT_DONE,
            final_certificate_submitted_pacs_for_release_of_payments_completed:this.districtLevelDetails[i].DMT_DONE,
            final_certificate_submitted_pacs_for_release_of_payments_not_completed:this.districtLevelDetails[i].DMT_NOT_DONE,
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
    this.utils.JSONToXlsxConvertor(
      this.excelData,
      'Division Wise Report'+this.Reportdate,
      true
    );
  }

  async btnPDF(): Promise<void> {
    try {
      const req = {
        TYPE:"2",
        INPUT_01: this.district,
        INPUT_04: this.districtName,
        INPUT_05: this.pdfdate,
        INPUT_09: this.fromDate,
        INPUT_10: this.toDate,
       
      };
      const fileName = 'districtLevelPacsComputerizationReport'+this.Reportdate;
      let basePDF = '';
      this.spinner.show();
      const res = await this.allotmentAPI.DistrictWisePacsReport(req);
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
    debugger;
    const requestData = {
      type: "20",
      divisionName: obj.DIV_NAME,       
      divisionId: obj.DIV_CODE,
      districtName:this.districtName,   
      districtId:obj.DISTRICT_CODE  
    };
    const encryptedString = this.utils.encrypt(JSON.stringify(requestData));
    this.onDivisionChange.emit(encryptedString);
  }

  btnSiteNotDoneDetails(obj: any): void {
    debugger;
    const requestData = {
      type: "7",
      divisionName: obj.DIV_NAME,       
      divisionId: obj.DIV_CODE,
      districtName:this.districtName,   
      districtId:obj.DISTRICT_CODE,  
      fromDate:this.fromDate,  
      toDate:this.toDate  
    };
    const encryptedString = this.utils.encrypt(JSON.stringify(requestData));
    this.onSiteNotDoneChange.emit(encryptedString);
  }

  btnDeviceNotDoneDetails(obj: any): void {
    debugger;
    const requestData = {
      type: "8",
      divisionName: obj.DIV_NAME,  
      divisionId: obj.DIV_CODE, 
      districtName:this.districtName,
      districtId:obj.DISTRICT_CODE,
      fromDate:this.fromDate,  
      toDate:this.toDate     
    };
    const encryptedString = this.utils.encrypt(JSON.stringify(requestData));
    this.ondeviceNotDoneChange.emit(encryptedString);
  }

  btnCalibNotDoneDetails(obj: any): void {
    debugger;
    const requestData = {
      type: "9",
      divisionName: obj.DIV_NAME, 
      divisionId: obj.DIV_CODE, 
      districtName:this.districtName,
      districtId:obj.DISTRICT_CODE,
      fromDate:this.fromDate,  
      toDate:this.toDate      
    };
    const encryptedString = this.utils.encrypt(JSON.stringify(requestData));
    this.oncalibNotDoneChange.emit(encryptedString);
  }

  btnDmtNotDoneDetails(obj: any): void {
    debugger;
    const requestData = {
      type: "10",
      divisionName: obj.DIV_NAME, 
      divisionId: obj.DIV_CODE, 
      districtName:this.districtName,
      districtId:obj.DISTRICT_CODE,
      fromDate:this.fromDate,  
      toDate:this.toDate      
    };
    const encryptedString = this.utils.encrypt(JSON.stringify(requestData));
    this.onDMTNotDoneChange.emit(encryptedString);
  }
  btnDmtDoneDetails(obj: any): void {
    debugger;
    const requestData = {
      type: "28",
      divisionName: obj.DIV_NAME, 
      divisionId: obj.DIV_CODE, 
      districtName:this.districtName,
      districtId:obj.DISTRICT_CODE,
      fromDate:this.fromDate,
      toDate:this.toDate

    };
    const encryptedString = this.utils.encrypt(JSON.stringify(requestData));
    this.onDMTDoneChange.emit(encryptedString);
  }
  btnSiteDoneDetails(obj: any): void {
    debugger;
    const requestData = {
      type: "14",
      divisionName: obj.DIV_NAME, 
      divisionId: obj.DIV_CODE, 
      districtName:this.districtName,
      districtId:obj.DISTRICT_CODE,
      fromDate:this.fromDate,
      toDate:this.toDate     
    };
    const encryptedString = this.utils.encrypt(JSON.stringify(requestData));
    this.onSiteDoneChange.emit(encryptedString);
  }
  btnDeviceDoneDetails(obj: any): void {
    debugger;
    const requestData = {
      type: "15",
      divisionName: obj.DIV_NAME, 
      divisionId: obj.DIV_CODE, 
      districtName:this.districtName,  
      districtId:obj.DISTRICT_CODE,    
      fromDate:this.fromDate ,   
      toDate:this.toDate    
    };
    const encryptedString = this.utils.encrypt(JSON.stringify(requestData));
    this.onDeviceDoneChange.emit(encryptedString);
  }
  btnInstallDoneDetails(obj: any): void {
    debugger;
    const requestData = {
      type: "16",
      divisionName: obj.DIV_NAME, 
      divisionId: obj.DIV_CODE, 
      districtName:this.districtName ,
      districtId:obj.DISTRICT_CODE,
      fromDate:this.fromDate ,   
      toDate:this.toDate      
    };
    const encryptedString = this.utils.encrypt(JSON.stringify(requestData));
    this.onInstallDoneChange.emit(encryptedString);
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


