import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { PacsLandAllotmentService } from 'src/app/reportsModule/pacsLandAllotment/services/pacs-land-allotment.service';
import { SessionService } from 'src/app/sharedModule/services/session.service';
import { ToasterService } from 'src/app/sharedModule/services/toaster.service';
import { UtilsService } from 'src/app/sharedModule/services/utils.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-pacs-computerisation-abstract-dist-details',
  templateUrl: './pacs-computerisation-abstract-dist-details.component.html',
  styleUrls: ['./pacs-computerisation-abstract-dist-details.component.css']
})
export class PacsComputerisationAbstractDistDetailsComponent implements OnInit, OnDestroy, AfterViewInit
{
  
  // @Input() type: any;
  // @Input() districtName: any;
  // @Input() districtId: any;
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onDistrictChange = new EventEmitter<string>();
  @Output() onSiteNotDoneChange = new EventEmitter<string>();
  @Output() ondeviceNotDoneChange = new EventEmitter<string>();
  @Output() oncalibNotDoneChange = new EventEmitter<string>();
  @Output() onDMTNotDoneChange = new EventEmitter<string>();
  @Output() onSiteDoneChange = new EventEmitter<string>();
  @Output() onDeviceDoneChange = new EventEmitter<string>();
  @Output() onInstallDoneChange = new EventEmitter<string>();
  @Output() onDMTDoneChange = new EventEmitter<string>();

  @Input() fromDate:any; 
  @Input() toDate:any; 
  stateLevelDetails: any = [];

  distcode:any;

  reportTotals = {
    S_NO: '-',
          name_of_the_district: 'TOTAL',
          no_of_dccbs:  0, 
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
  excelData1: any[] = [];

  Reportdate:any;  today=new Date();
  pdfdate:any;   
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;

  dtOptions: DataTables.Settings = this.utils.dataTableOptions();
  dtTrigger: Subject<any> = new Subject();

  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private allotmentAPI: PacsLandAllotmentService,
    private utils: UtilsService,
    private session: SessionService,
  ) {}

  ngOnInit(): void {

    this.Reportdate = formatDate(this.today,'ddMMyyyyhhmmssa', 'en-US', '+0530');
    this.pdfdate = formatDate(this.today,'dd-MM-yyyy hh:mm:ssa', 'en-US', '+0530');
   
      this.loadReport();
  }
  // ngOnChanges(): void {
  //   if (
  //     !this.utils.isEmpty(this.fromDate) &&
  //     !this.utils.isEmpty(this.toDate)
  //   ) {
  //     this.loadReport();
  //   }
  // }

  async loadReport(): Promise<void> {
    try {
      debugger;
      this.reportTotals = {
        S_NO: '-',
        name_of_the_district: 'TOTAL',
        no_of_dccbs:  0, 
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
      
      // if(this.session.role==0 || this.session.role==1 || this.session.role==504){
      //   this.type="1";
        
      // }
      // else if(this.session.role==504){
      //   this.type="1";
      // }
      // else
      // if(this.session.role!=1){
      //   this.type="4";
      //   this.districtId=this.session.districtId;
      // }
      debugger;
      const req = {
        // type:"1", 
        // input_09:this.fromDate,       
        // input_010 :this.toDate,
          TYPE:"29",
          INPUT_09:this.fromDate,       
        INPUT_10 :this.toDate,
      };
      this.spinner.show();
      const response = await this.allotmentAPI.CopsConsolidatedReportGet(      //CopsConsolidatedReportGet ///PacsCeoDetailsGet
        req
      );
      debugger;
      this.spinner.hide();
      if (response.success) {
        debugger;
        this.excelData = [];
        
        this.stateLevelDetails = response.result;
          for (let i = 0; i < this.stateLevelDetails.length; i++) {
          // tslint:disable-next-line: radix
          this.reportTotals.no_of_dccbs += parseInt(
            this.stateLevelDetails[i].NAME_OF_THE_DCCB
          );
          this.reportTotals.total_pacs += parseInt(
            this.stateLevelDetails[i].TOTAL_PACS
          );
          // tslint:disable-next-line: radix
          this.reportTotals.site_prepared_pacs_completed += parseInt(
            this.stateLevelDetails[i].SITE_DONE
          );
          // tslint:disable-next-line: radix
          this.reportTotals.site_prepared_pacs_not_completed += parseInt(
            this.stateLevelDetails[i].SITE_NOT_DONE
          );
          // tslint:disable-next-line: radix
          this.reportTotals.delivery_of_all_items_completed += parseInt(
            this.stateLevelDetails[i].DEVICE_DONE
          );
          // tslint:disable-next-line: radix
          this.reportTotals.delivery_of_all_items_not_completed += parseInt(
            this.stateLevelDetails[i].DEVICE_NOT_DONE
          );
          // tslint:disable-next-line: radix
          this.reportTotals.supply_and_installation_of_all_hardware_items_completed += parseInt(
            this.stateLevelDetails[i].CALIBRATION_DONE
          );
          // tslint:disable-next-line: radix
          this.reportTotals.supply_and_installation_of_all_hardware_items_not_completed += parseInt(
            this.stateLevelDetails[i].CALIBRATION_NOT_DONE
          );
          this.reportTotals.final_certificate_submitted_pacs_for_release_of_payments_completed += parseInt(
            this.stateLevelDetails[i].DMT_DONE
          );
          // tslint:disable-next-line: radix
          this.reportTotals.final_certificate_submitted_pacs_for_release_of_payments_not_completed += parseInt(
            this.stateLevelDetails[i].DMT_NOT_DONE
          ); 
          const singleRow = {
            S_NO: i + 1,
            name_of_the_district: this.stateLevelDetails[i].DISTRICT_NAME,
            no_of_dccbs: this.stateLevelDetails[i].NAME_OF_THE_DCCB,
            total_pacs:this.stateLevelDetails[i].TOTAL_PACS,
            site_prepared_pacs_completed:this.stateLevelDetails[i].SITE_DONE,
            site_prepared_pacs_not_completed: this.stateLevelDetails[i].SITE_NOT_DONE,
            delivery_of_all_items_completed: this.stateLevelDetails[i].DEVICE_DONE,
            delivery_of_all_items_not_completed:this.stateLevelDetails[i].DEVICE_NOT_DONE,
            supply_and_installation_of_all_hardware_items_completed:this.stateLevelDetails[i].CALIBRATION_DONE,
            supply_and_installation_of_all_hardware_items_not_completed:this.stateLevelDetails[i].CALIBRATION_NOT_DONE,
            final_certificate_submitted_pacs_for_release_of_payments_completed:this.stateLevelDetails[i].DMT_DONE,
            final_certificate_submitted_pacs_for_release_of_payments_not_completed:this.stateLevelDetails[i].DMT_NOT_DONE,
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
      'DISTRICT WISE REPORT'+this.Reportdate,
      true
    );
  }

  async btnPDF(): Promise<void> {
    try {
      const req = {
        TYPE:"29",
        INPUT_05:this.pdfdate,
        INPUT_09:this.fromDate,
        INPUT_10:this.toDate,

      };
      const fileName = 'stateLevelPacsComputerizationReport'+this.Reportdate;
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
      type:"2",
      districtName:obj.DISTRICT_NAME,
      districtcode:obj.DISTRICT_CODE,
      fromDate:this.fromDate,       
      toDate :this.toDate,
    };   

    const encryptedString = this.utils.encrypt(JSON.stringify(requestData));
    this.onDistrictChange.emit(encryptedString);
  }
  btnSitenotdoneDetails(obj: any): void {   debugger;
   
    const requestData = {
      type:"3",
      districtName:obj.DISTRICT_NAME,
      districtId:obj.DISTRICT_CODE,
      fromDate:this.fromDate,       
      toDate :this.toDate,
    };   

    const encryptedString = this.utils.encrypt(JSON.stringify(requestData));
    this.onSiteNotDoneChange.emit(encryptedString);
  }
  btndevicenotdoneDetails(obj: any): void {
   
    const requestData = {
      type:"4",
      districtName:obj.DISTRICT_NAME,
      districtId:obj.DISTRICT_CODE,
      fromDate:this.fromDate,       
      toDate :this.toDate,
    };   

    const encryptedString = this.utils.encrypt(JSON.stringify(requestData));
    this.ondeviceNotDoneChange.emit(encryptedString);
  }
  btnCalibnotdoneDetails(obj: any): void {
   
    const requestData = {
      type:"5",
      districtName:obj.DISTRICT_NAME,
      districtId:obj.DISTRICT_CODE,
      fromDate:this.fromDate,       
      toDate :this.toDate,
    };   

    const encryptedString = this.utils.encrypt(JSON.stringify(requestData));
    this.oncalibNotDoneChange.emit(encryptedString);
  }
  btnDMTnotdoneDetails(obj: any): void {
   
    const requestData = {
      type:"6",
      districtName:obj.DISTRICT_NAME,
      districtId:obj.DISTRICT_CODE,
      fromDate:this.fromDate,       
      toDate :this.toDate,
    };   

    const encryptedString = this.utils.encrypt(JSON.stringify(requestData));
    this.onDMTNotDoneChange.emit(encryptedString);
  }
  btnDMTdoneDetails(obj: any): void {
   
    const requestData = {
      type:"27",
      districtName:obj.DISTRICT_NAME,
      districtId:obj.DISTRICT_CODE,
      fromDate:this.fromDate,       
      toDate :this.toDate,
    };   

    const encryptedString = this.utils.encrypt(JSON.stringify(requestData));
    this.onDMTDoneChange.emit(encryptedString);
  }
  btnSitedoneDetails(obj: any): void {
   debugger;
    const requestData = {
      type:"11",
      districtName:obj.DISTRICT_NAME,
      districtId:obj.DISTRICT_CODE,
      fromDate:this.fromDate,       
      toDate :this.toDate,
    };   

    const encryptedString = this.utils.encrypt(JSON.stringify(requestData));
    this.onSiteDoneChange.emit(encryptedString);
  }

  btnDevicedoneDetails(obj: any): void {
    debugger;
     const requestData = {
       type:"12",
       districtName:obj.DISTRICT_NAME,
       districtId:obj.DISTRICT_CODE,
       fromDate:this.fromDate,       
      toDate :this.toDate,
     };   
 
     const encryptedString = this.utils.encrypt(JSON.stringify(requestData));
     this.onDeviceDoneChange.emit(encryptedString);
   }
  btnInstalldoneDetails(obj: any): void {
    debugger;
     const requestData = {
       type:"13",
       districtName:obj.DISTRICT_NAME,
       districtId:obj.DISTRICT_CODE,
       fromDate:this.fromDate,       
      toDate :this.toDate,
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

  async btnSiteDoneDownload(type:any,statusId:any): Promise<void> {
    try { 
      debugger;
      const req = {
        type: type,
        input_07:statusId,
        input_09:this.fromDate,
        input_10:this.toDate,

      };
      this.spinner.show();
      const response = await this.allotmentAPI.PacsCeoDetailsGet(         //CopsConsolidatedReportGet
        req
      );
      debugger;
      this.spinner.hide();
      this.excelData1 = []; 
      if (response.success) {
        debugger;
        this.excelData1 = response.result;

        if(type == 30 && statusId == 1){
        this.utils.JSONToXlsxConvertor(
          this.excelData1,
          'COMPLETED PACS SITE PREPARATION'+this.Reportdate,
          true
        );
       }else if(type == 30 && statusId == 2){        
        this.utils.JSONToXlsxConvertor(
          this.excelData1,
          'NOT COMPLETED PACS SITE PREPARATION '+this.Reportdate,
          true
        );
       }else if(type == 31 && statusId == 1){        
        this.utils.JSONToXlsxConvertor(
          this.excelData1,
          'COMPLETED PACS DELIVERY OF ALL ITEMS '+this.Reportdate,
          true
        );
       }else if(type == 31 && statusId == 2){        
        this.utils.JSONToXlsxConvertor(
          this.excelData1,
          'NOT COMPLETED PACS DELIVERY OF ALL ITEMS '+this.Reportdate,
          true
        );
       }else if(type == 32 && statusId == 1){        
        this.utils.JSONToXlsxConvertor(
          this.excelData1,
          'COMPLETED PACS SUPPLY AND INSTALLATION OF ALL HARDWARE ITEMS '+this.Reportdate,
          true
        );
       } else if(type == 32 && statusId == 2){        
        this.utils.JSONToXlsxConvertor(
          this.excelData1,
          'NOT COMPLETED PACS SUPPLY AND INSTALLATION OF ALL HARDWARE ITEMS'+this.Reportdate,
          true
        );
       }
        else if(type == 33 && statusId == 1){        
        this.utils.JSONToXlsxConvertor(
          this.excelData1,
          'COMPLETED PACS FINAL CERTIFICATE SUBMITTED PACS FOR RELEASE OF PAYMENTS '+this.Reportdate,
          true
        );
       }

       else if(type == 33 && statusId == 2){        
        this.utils.JSONToXlsxConvertor(
          this.excelData1,
          'NOT COMPLETED PACS FINAL CERTIFICATE SUBMITTED PACS FOR RELEASE OF PAYMENTS '+this.Reportdate,
          true
        );
       }

        this.loadReport();
      
      } else {
        this.toast.info(response.message);
      }
      this.rerender();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
}
