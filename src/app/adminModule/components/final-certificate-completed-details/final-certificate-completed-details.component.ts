import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { PacsLandAllotmentService } from 'src/app/reportsModule/pacsLandAllotment/services/pacs-land-allotment.service';
import { SessionService } from 'src/app/sharedModule/services/session.service';
import { SharedService } from 'src/app/sharedModule/services/shared.service';
import { ToasterService } from 'src/app/sharedModule/services/toaster.service';
import { UtilsService } from 'src/app/sharedModule/services/utils.service';

@Component({
  selector: 'app-final-certificate-completed-details',
  templateUrl: './final-certificate-completed-details.component.html',
  styleUrls: ['./final-certificate-completed-details.component.css']
})
export class FinalCertificateCompletedDetailsComponent implements OnInit {

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

  district=false;
  division=false; 
  excelData: any[] = [];
  DeviceList: any[] = [];

  variable:any; 
  repeatArray = Array(1).fill(0);

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
    private router: Router,
    private sharedAPI: SharedService,
  ) {
   
  }
  Reportdate:any;  today=new Date();
  pdfdate:any;  

  ngOnInit(): void {   debugger;
    this.pdfdate = formatDate(this.today,'dd-MM-yyyy hh:mm:ssa', 'en-US', '+0530');
    this.Reportdate = formatDate(this.today,'ddMMyyyyhhmmssa', 'en-US', '+0530');

    if(this.type=== '27'){
      this.district=true;
      this.division=false;
    }
    else{
      this.district=false;
      this.division=true;
    } 
    //this.loadDeviceDetails();
    this.loadReport();

  } 


  // async loadDeviceDetails(): Promise<void> {   debugger;
  //   try {
  //     const req = {
  //       type: '17',
  //       //mobileno:this.session.pacId,
  //     };
  //     this.spinner.show();
  //     const response = await this.allotmentAPI.PacsCeoDetailsGet(req);
  //     if (response.success) {
  //       this.DeviceList = response.result;

  //       let var1  =  response.result[0].DEVICE_NAME

  //       this.variable =var1;

  //     } else {
  //       this.toast.info(response.message);
  //     }
  //     this.spinner.hide();
  //   } catch (error) {
  //     this.spinner.hide();
  //     this.utils.catchResponse(error);
  //   }
  // }
  async loadReport(): Promise<void> {
    debugger;
    try {
      
      const req = {
        
        type: this.type,      //TYPE
        input_01:this.districtId,      //INPUT_01
        input_02:this.divisionId ,      //INPUT_01
        input_09:this.fromDate ,      //INPUT_01
        input_10:this.toDate       //INPUT_01
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
    if(this.type == '12' || this.type == '15'){
    this.utils.JSONToXlsxConvertor(
      this.excelData,
      'DELIVERY COMPLETED PACS REPORT'+this.Reportdate,
      true
    );
  }
  }
  

  async btnPhotoView(path: string): Promise<void> {
    try {
      debugger;
       await this.utils.viewJPVImagecop(path);
      // await this.utils.viewImage(path);
       
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
        //INPUT_03:this.session.pacId,
        INPUT_04:this.districtName,
        INPUT_05:this.pdfdate,
        INPUT_06:"DISTRICT",
        INPUT_07:"DIVISION",
        INPUT_08:this.divisionName, 
      };
      const fileName = 'DeliveryCompletedPacsComputerizationReport'+this.Reportdate;
      let basePDF = '';
      this.spinner.show();
      const res = await this.allotmentAPI.DeliveryCompletedPacsReport(req);
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



