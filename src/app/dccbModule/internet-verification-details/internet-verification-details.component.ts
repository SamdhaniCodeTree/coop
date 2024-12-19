import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { CeoService } from 'src/app/ceoModule/services/ceo.service';
import { MpfcLandInspectionService } from 'src/app/reportsModule/mpfcLandInspection/services/mpfc-land-inspection.service';
import { SessionService } from 'src/app/sharedModule/services/session.service';
import { SharedService } from 'src/app/sharedModule/services/shared.service';
import { ToasterService } from 'src/app/sharedModule/services/toaster.service';
import { UtilsService } from 'src/app/sharedModule/services/utils.service';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { CONNREFUSED } from 'dns';
import { InternetList } from '../Model/requetresponse';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-internet-verification-details',
  templateUrl: './internet-verification-details.component.html',
  styleUrls: ['./internet-verification-details.component.css']
})
export class InternetVerificationDetailsComponent implements OnInit {

  masterSelected=false;
  type = '';
  districtId = '';
  @Output() onDistrictChange = new EventEmitter<string>();
  InternetList: InternetList[] = []
   TRANSACTIONLIST: any = [];
   PACSDETAILSLIST: any = [];
  selectedRecords: any[] = [];
  DCCBLIST: any[] = [];
  EQUIPMENTLIST: any[] = []; 

  dccbid:any;
  equipmentid:any;
  transactionId:any;
  pacscode:any;
  transId:any;
  pacsid:any;
  Remarks:any;
  totalSum=0;

  selectedCount=0;

  userrole = ''; 
  excelData: any[] = [];
  allSelected = false;
  isSubmitVisible = false;  
  DeviceDetails = true;  
  TransactionDetails = false;  
  ViewPACSDet = false;  
  ShowRejectPopup = false;  
  ApprovedRejectDetailsPopup = false;  

//   isChecked = false;




obj = {
    isChecked : false  // Initial checkbox state
  };

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;

  dtOptions: DataTables.Settings = this.utils.dataTableOptions();
  dtTrigger: Subject<any> = new Subject();
    ngxToaster: any;
  constructor(
      private spinner: NgxSpinnerService,
      private toast: ToasterService,
      private inspectionAPI: MpfcLandInspectionService,
      private utils: UtilsService,
      private session: SessionService,
      private sharedAPI: SharedService,
      private ceoAPI: CeoService,
      private cdr: ChangeDetectorRef
  ) {
    this.masterSelected = false;
      this.userrole = this.session.role;
  }
  Checkboxdisable=true;
 
  ngOnInit(): void {  
      this.LoadReport();
      
  }  

  employees = [
    { id: 1, name: 'John Doe', position: 'Manager', selected: false },
    { id: 2, name: 'Jane Smith', position: 'Developer', selected: false },
    { id: 3, name: 'Alice Brown', position: 'Designer', selected: false },
  ];

  // Select or deselect all checkboxes
  selectAlltest(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.employees.forEach((employee) => {
      employee.selected = checked;
    });
  }
  async LoadReport(): Promise<void> {  
      try { 
        this.selectedRecords = [];
        this.InternetList=[];
          const req = {
              type: "7", 
          };
          
          this.spinner.show();
         //const response = await this.inspectionAPI.TechManagerGet(req);
          const response = await this.ceoAPI.InternetGetDetails(req);
          this.spinner.hide();
          debugger;
          if (response.success) { 
              this.InternetList = response.result;  
              this.excelData=this.InternetList;
              this.selectedCount=0;
          }
           else {
              this.toast.info(response.message);
          }
          //this.rerender();
      } catch (error) {
          this.spinner.hide();
          this.utils.catchResponse(error);
      }
  }

  btnExcelDownload(): void {
      this.utils.JSONToxlxsConvertor(
          this.excelData,
          'Computerisation PACS Internet Report',
          true
      );
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

//   selectAll(event: Event): void {
//     debugger
//     this.allSelected = (event.target as HTMLInputElement).checked;
//     this.InternetEDETAILSLIST.forEach((record: { selected: boolean; }) => record.selected = this.allSelected);
//     this.updateSubmitVisibility();
 
//     this.countSelected();

// }

// updateSubmitVisibility(): void {
//   console.log(this.InternetEDETAILSLIST);
  
//   this.isSubmitVisible = this.InternetEDETAILSLIST.some((record: { selected: boolean }) => record.selected);
//   this.countSelected();
// }
// Value=0
 
// countSelected(): void {
//   this.selectedCount = this.InternetEDETAILSLIST.filter((record: any) => record.selected).length;
selectAll(event: Event): void {
  const checked = (event.target as HTMLInputElement).checked;
  this.InternetList.forEach(x => {
    x.selected = checked;
  });

  this.cdr.detectChanges();
}

// }
 // Select All functionality
//  selectAll(event: Event): void {
//   const isChecked = (event.target as HTMLInputElement).checked;
//   this.allSelected = isChecked;
//   this.InternetList.forEach((record: { selected: boolean; }) => {
//     record.selected = isChecked;
//   });
//   this.SubmitVisibility();
// }




// Update Submit button visibility
SubmitVisibility(): void {
  debugger
  this.isSubmitVisible = this.InternetList.some((record: { selected: boolean; }) => record.selected);
  console.log('Submit Visible:', this.isSubmitVisible);
  console.log('Current List State:', this.InternetList);
}
 

 

 

 
 
}
