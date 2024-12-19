import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { DlcoService } from 'src/app/dlcoModule/services/dlco.service';
import { ConsoleService } from 'src/app/sharedModule/services/console.service';
import { NgxToasterService } from 'src/app/sharedModule/services/ngx-toaster.service';
import { SessionService } from 'src/app/sharedModule/services/session.service';
import { SharedService } from 'src/app/sharedModule/services/shared.service';
import { ToasterService } from 'src/app/sharedModule/services/toaster.service';
import { UtilsService } from 'src/app/sharedModule/services/utils.service';

@Component({
  selector: 'app-ceo-reg-details',
  templateUrl: './ceo-reg-details.component.html',
  styleUrls: ['./ceo-reg-details.component.css']
})
export class CeoRegDetailsComponent implements OnInit {

  ceoReq = {
    
    name: '',
    type: '',
    ipaddress: '1234',
    districtid: '',
    divisionid: '',
    districtId: '',
    divisionId: '',
    mandalid: '',
    mandalId: '',
    mobileno: '',
    uniqueId: '',
    fatherhusbandname: '',
    residentialaddress: '',
    uidnum: '',
    pannumber: '',
    rationcardnumber: '',
    mailid: '',
    designation: '',
    insertedby: '',
    source: 'web',
    pacsid: '',
    uniqueid: '',
    password: '',
    recordAlreadyAvailable: false,
  };
  excelData: any[] = [];
  RegCeoLevelDetails: any[] = [];
   
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
    private dlcoAPI: DlcoService
  ) {}

  ngOnInit(): void {
     
    this.ceoReq.districtId = this.session.divisionId;
     debugger;
    this.divisionListload();
  }
  async divisionListload(): Promise<void> {
    try {
      this.ceoReq.type = '11';
      this.spinner.show();
      const response = await this.sharedAPI.packsmandalList(this.ceoReq);
      this.spinner.hide();
      debugger
      if (response.success) {
        
        this.RegCeoLevelDetails = response.result;
        this.rerender();
      } else {
        this.toast.info(response.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
  
  // btnExcelDownload(): void {
  //   this.utils.JSONToCSVConvertor(
  //     this.excelData,
  //     'Land Allotment State Level Report',
  //     true
  //   );
  // }

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
