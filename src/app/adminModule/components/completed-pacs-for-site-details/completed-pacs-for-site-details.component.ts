import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { PacsLandAllotmentService } from 'src/app/reportsModule/pacsLandAllotment/services/pacs-land-allotment.service';
import { SessionService } from 'src/app/sharedModule/services/session.service';
import { ToasterService } from 'src/app/sharedModule/services/toaster.service';
import { UtilsService } from 'src/app/sharedModule/services/utils.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-completed-pacs-for-site-details',
  templateUrl: './completed-pacs-for-site-details.component.html',
  styleUrls: ['./completed-pacs-for-site-details.component.css']
})
export class CompletedPacsForSiteDetailsComponent implements OnInit {

  @Input() type: any;
  @Input() districtName: any;
  @Input() divisionName: any;
  @Input() districtId: any;
 @Input() divisionId: any;
 @Input() fromDate: any;
 @Input() toDate: any;


  // tslint:disable-next-line: no-output-on-prefix
  @Output() onMandalChange = new EventEmitter<string>();
  districtLevelDetails: any = [];

  input: any;
  userName: any;
  pdfdate: any;
  FDate='';
  TDate='';

  userhide=false;

  district=false;
  division=false; 
  excelData: any[] = [];

  Reportdate:any;  today=new Date();

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;

  dtOptions: DataTables.Settings = this.utils.dataTableOptions();
  dtTrigger: Subject<any> = new Subject();

  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private allotmentAPI: PacsLandAllotmentService,
    private utils: UtilsService,
    
    private route: ActivatedRoute,
    private session: SessionService,
    private router: Router
  ) {
   
  }
  reportTotals = {
    S_NO:'-',
    name_of_the_district:'-',
    name_of_the_dccb:'-',
    name_of_the_pacs:'-',
    monitor_make:'-',
    monitor_model_details:'-',
    monitor_received_date:'-',
    monitor_warranty_date:'-',
    monitor_amc_date:'-',
    monitor_image:'-',					
    cpu_make:'-',
    cpu_model_details:'-',
    cpu_received_date:'-',
    cpu_warranty_date:'-',
    cpu_amc_date:'-',
    cpu_image		:'-',			
    mouse_make:'-',
    mouse_model_details:'-',
    mouse_received_date:'-',
    mouse_warranty_date:'-',
    mouse_amc_date:'-',
    mouse_image:'-',
    key_board_make:'-',
    key_board_model_details:'-',
    key_board_received_date:'-',
    key_board_warranty_date:'-',
    key_board_amc_date:'-',
    key_board_image:'-',
    ups_2kva_make:'-',
    ups_2kva_model_details:'-',
    ups_2kva_received_date:'-',
    ups_2kva_warranty_date:'-',
    ups_2kva_amc_date:'-',
    ups_2kva_image:'-',
    ups_battery1_make:'-',
    ups_battery1_model_details:'-',
    ups_battery1_received_date:'-',
    ups_battery1_warranty_date:'-',
    ups_battery1_amc_date:'-',
    ups_battery1_image:'-',
    ups_battery_2_make:'-',
    ups_battery_2_model_details:'-',
    ups_battery_2_received_date:'-',
    ups_battery_2_warranty_date:'-',
    ups_battery_2_amc_date:'-',
    ups_battery_2_image:'-',
    multi_functional_device_make:'-',
    multi_functional_device_model_details:'-',
    multi_functional_device_received_date:'-',
    multi_functional_device_warranty_date:'-',
    multi_functional_device_amc_date:'-',
    multi_functional_device_image:'-',
    vpn_device_make:'-',
    vpn_device_model_details:'-',
    vpn_device_received_date:'-',
    vpn_device_warranty_date:'-',
    vpn_device_amc_date:'-',
    vpn_device_image:'-',
    webcam_make:'-',
    webcam_model_details:'-',
    webcam_received_date:'-',
    webcam_warranty_date:'-',
    webcam_amc_date:'-',
    webcam_image:'-',
    internet_connectivity_make:'-',
    internet_connectivity_model_details:'-',
    internet_connectivity_received_date:'-',
    internet_connectivity_warranty_date:'-',
    internet_connectivity_amc_date:'-',
    internet_connectivity_image:'-',
    biometric_scanner_make:'-',
    biometric_scanner_model_details:'-',
    biometric_scanner_received_date:'-',
    biometric_scanner_warranty_date:'-',
    biometric_scanner_amc_date:'-',
    biometric_scanner_image:'-',
    tab_make:'-',
    tab_model_details:'-',
    tab_received_date:'-',
    tab_warranty_date:'-',
    tab_amc_date:'-',
    tab_image:'-',					
    bluetooth_thermal_printer_make:'-',
    bluetooth_thermal_printer_model_details:'-',
    bluetooth_thermal_printer_received_date:'-',
    bluetooth_thermal_printer_warranty_date:'-',
    bluetooth_thermal_printer_amc_date:'-',
    bluetooth_thermal_printer_image:'-',					
    barcode_scanner_make:'-',
    barcode_scanner_model_details:'-',
    barcode_scanner_received_date:'-',
    barcode_scanner_warranty_date:'-',
    barcode_scanner_amc_date:'-',
    barcode_scanner_image:'-',					
    pos_device_hand_held_make:'-',
    pos_device_hand_held_model_details:'-',
    pos_device_hand_held_received_date:'-',
    pos_device_hand_held_warranty_date:'-',
    pos_device_hand_held_amc_date:'-',
    pos_device_hand_held_image:'-',
    passbook_printer_make:'-',
    passbook_printer_model_details:'-',
    passbook_printer_received_date:'-',
    passbook_printer_warranty_date:'-',
    passbook_printer_amc_date:'-',
    passbook_printer_image:'-',
  }
   
  ngOnInit(): void {   debugger;
debugger;
    console.log(this.divisionName);
    this.pdfdate = formatDate(this.today,'dd-MM-yyyy hh:mm:ssa', 'en-US', '+0530');
    this.Reportdate = formatDate(this.today,'ddMMyyyyhhmmssa', 'en-US', '+0530');

    if(this.type=== '11'){
      this.district=true;
      this.division=false;
    }
    else{
      this.district=false;
      this.division=true;
    }
   
    this.loadReport();
    
  } 
  async loadReport(): Promise<void> {
    debugger;
    try {
      
       if(this.type==''|| this.type==undefined){
  
        this.type = '20';
        this.districtId = this.session.districtId;
        this.divisionId = this.session.divisionId;
        this.userhide=true;
        this.divisionName=this.session.divisionName;
        this.fromDate = this.fromDate; 
        this.toDate = this.toDate; 
       }

       if(this.type=='20'){ 
        this.userName = "DETAILED LEVEL PACS REPORT"; 
        this.divisionName = this.divisionName; 
        this.fromDate = this.fromDate; 
        this.toDate = this.toDate; 
        // if(this.session.divisionName="" ){
          
        // }
        // else{
        //   this.divisionName=this.session.divisionName;
        // }
      } 

      const req = {
        
        type: this.type,      //TYPE
        input_01:this.districtId,      //INPUT_01
        input_02:this.divisionId,      //INPUT_01
        input_03:this.session.pacId,      //INPUT_01
        input_09:this.fromDate,      //INPUT_01
        input_10:this.toDate,      //INPUT_01
      };
      this.spinner.show();
     // const response = await this.allotmentAPI.CopsConsolidatedReportGet(        req      );
      const response = await this.allotmentAPI.PacsCeoDetailsGet(        req      );
      this.spinner.hide();
      debugger;
      if (response.success) {
        this.excelData = [];
        
        this.districtLevelDetails = response.result;
       
        this.excelData = this.districtLevelDetails;
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
    if(this.type == '11' || this.type == '14'){

      this.utils.JSONToXlsxConvertor(
        this.excelData,
        'SITE PREPARATION COMPLETED PACS REPORT'+this.Reportdate,
        true
      );
    }  
    else{
      this.utils.JSONToXlsxConvertor(
        this.excelData,
        'DETAILED LEVEL PACS REPORT'+this.Reportdate,
        true
      );
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

  async btnPDFView(path: string): Promise<void> {
    try {
      debugger;
       await this.utils.viewJPVPDFcop(path);
       
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }


  async btnPDF(type:any): Promise<void> {
    try {
      const req = {
        TYPE:type,
        INPUT_01:this.districtId,
        INPUT_02:this.divisionId,
        INPUT_03:this.session.pacId,
        INPUT_04:this.districtName,
        INPUT_05:this.pdfdate,
        INPUT_06:"DISTRICT",
        INPUT_07:"DIVISION",
        INPUT_08:this.divisionName, 
        INPUT_09:this.fromDate, 
        INPUT_10:this.toDate, 
      };
      const fileName = 'CompletedPacsComputerizationReport'+this.Reportdate;
      let basePDF = '';
      this.spinner.show();
      const res = await this.allotmentAPI.CompletedPacsWiseReport(req);
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


