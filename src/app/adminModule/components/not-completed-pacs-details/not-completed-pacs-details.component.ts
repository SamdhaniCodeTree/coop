import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
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
  selector: 'app-not-completed-pacs-details',
  templateUrl: './not-completed-pacs-details.component.html',
  styleUrls: ['./not-completed-pacs-details.component.css']
})
export class NotCompletedPacsDetailsComponent implements OnInit, OnDestroy, AfterViewInit
{ 
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
  Reportdate:any;  today=new Date();
  input: any;
  pdfdate: any;

  district=false;
  division=false; 
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
    
    private route: ActivatedRoute,
    private session: SessionService,
    private router: Router
  ) {
   
  }

  ngOnInit(): void {   debugger;
    this.Reportdate = formatDate(this.today,'ddMMyyyyhhmmssa', 'en-US', '+0530');

    this.pdfdate = formatDate(this.today,'dd-MM-yyyy hh:mm:ssa', 'en-US', '+0530');

    if(this.type=== '3' || this.type=== '4' || this.type=== '5' || this.type=== '6'){
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
      
      const req = {
        
        type: this.type,      //TYPE
        input_01:this.districtId,      //INPUT_01
        input_02:this.divisionId,       //INPUT_01
        input_09:this.fromDate,       //INPUT_01
        input_10:this.toDate,       //INPUT_01
      };
      this.spinner.show();
      const response = await this.allotmentAPI.PacsCeoDetailsGet(
        req
      );
      this.spinner.hide();
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
    if(this.type=='3' || this.type=='7'){
      this.utils.JSONToXlsxConvertor(
        this.excelData,
        'SITE PREPARATION NOT COMPLETED PACS REPORT'+this.Reportdate,
        true
      );
    }
    else if(this.type=='4' || this.type=='8'){
      this.utils.JSONToXlsxConvertor(
        this.excelData,
        'DELIVERY NOT COMPLETED PACS REPORT'+this.Reportdate,
        true
      );
     }
     else if(this.type=='5' || this.type=='9'){
      this.utils.JSONToXlsxConvertor(
        this.excelData,
        ' INSTALLATION NOT COMPLETED PACS REPORT'+this.Reportdate,
        true
      );
     }
     else if(this.type=='6' || this.type=='10'){
      this.utils.JSONToXlsxConvertor(
        this.excelData,
        'NOT APPROVED LIST'+this.Reportdate,
        true
      );
     } 
  }


  
  async btnPDF(type:any): Promise<void> {
    try {
      if(this.type==='3' || this.type==='4'|| this.type==='5'||this.type==='6'){
      const req = {
        TYPE:type,
        INPUT_01: this.districtId,
        INPUT_04: this.districtName,
        INPUT_05: this.pdfdate,
        INPUT_09: this.fromDate,
        INPUT_10: this.toDate,
       
      }; 
      const fileName = 'NotCompletedPacsComputerizationReport'+this.Reportdate;
      let basePDF = '';
      this.spinner.show();
      const res = await this.allotmentAPI.NotCompletedPacsReport(req);
      if (res.success) {
        basePDF = res.result;
        this.utils.downloadPdfFile(basePDF, fileName);
      } else {
        this.toast.info(res.message);
      }
    }
    else{
      const req = {
        TYPE:type,
        INPUT_01:this.districtId,
        INPUT_02: this.divisionId,
        INPUT_04: this.divisionName,
        INPUT_05: this.pdfdate,
       
      }; 
      const fileName = 'NotCompletedPacsComputerizationReport'+this.Reportdate;
      let basePDF = '';
      this.spinner.show();
      const res = await this.allotmentAPI.NotCompletedPacsReport(req);
      if (res.success) {
        basePDF = res.result;
        this.utils.downloadPdfFile(basePDF, fileName);
      } else {
        this.toast.info(res.message);
      }
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


