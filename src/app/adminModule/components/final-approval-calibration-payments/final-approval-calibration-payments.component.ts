import { AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { CeoService } from 'src/app/ceoModule/services/ceo.service';
import { MpfcLandInspectionService } from 'src/app/reportsModule/mpfcLandInspection/services/mpfc-land-inspection.service';
import { SessionService } from 'src/app/sharedModule/services/session.service';
import { SharedService } from 'src/app/sharedModule/services/shared.service';
import { ToasterService } from 'src/app/sharedModule/services/toaster.service';
import { UtilsService } from 'src/app/sharedModule/services/utils.service';

@Component({
  selector: 'app-final-approval-calibration-payments',
  templateUrl: './final-approval-calibration-payments.component.html',
  styleUrls: ['./final-approval-calibration-payments.component.css']
})
export class FinalApprovalCalibrationPaymentsComponent  implements OnInit, OnDestroy, AfterViewInit {
  // tslint:disable-next-line: no-output-on-prefix
  type = '';
  districtId = '';
  transaction_id = '';
  @Output() onDistrictChange = new EventEmitter<string>();
   DEVICEDETAILSLIST: any = [];
   TRANSACTIONLIST: any = [];
   PACSDETAILSLIST: any = [];
  selectedRecords: any[] = [];
  DCCBLIST: any[] = [];
  EQUIPMENTLIST: any[] = []; 
  APPROVEREJECTDETAILS: any[] = []; 

  dccbid:any;
  equipmentid:any;
  transactionId:any;
  pacscode:any;
  transId:any;
  pacsid:any;
  headingname:any;
  totalSum=0;

  selectedCount=0;

  userrole = ''; 
  excelData: any[] = [];
  excelData1: any[] = [];
  allSelected = false;
  isSubmitVisible = false;  
  DeviceDetails = true;  
  TransactionDetails = false;  
  ViewPACSDet = false;  
  showapprovedPopup = false;  
  ApprovedRejectDetailsPopup = false;  
  approverejectdisable = true;  
  detailhide = true;  

//   isChecked = false;

obj = {
    isChecked : false  // Initial checkbox state
  };

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;

  dtOptions: DataTables.Settings = this.utils.dataTableOptions();
  dtTrigger: Subject<any> = new Subject();
    sanitizer: any;
    ngxToaster: any;
  constructor(
      private spinner: NgxSpinnerService,
      private toast: ToasterService,
      private inspectionAPI: MpfcLandInspectionService,
      private utils: UtilsService,
      private session: SessionService,
      private sharedAPI: SharedService,
      private ceoAPI: CeoService,
  ) {
      this.userrole = this.session.role;;
  }

  ngOnInit(): void { 
    this.LoadReport();
    // if(this.session.role=="701")
    //   {
    //     this.detailhide=false;
         
    //   }
    //   else{
    //     this.detailhide=true;
    //   }
      
    // if(this.session.role=='1')
    //   {
    //     this.LoadReport();
    //   } 
      // else if(this.session.role=='701')
      // {
      //   this.TransactionDetails = true;
      //             this.DeviceDetails = false;
      //             this.detailhide = false;
      //             this.approverejectdisable=false;
      //             //this.headingname = "Approved Details"
      //             this.btnPendingapprovedDetails('0');
      //             // this.btnPendingapprovedDetails('1');
      // }
      
  }  
  async LoadReport(): Promise<void> {  
      try { 
          const req = {
              type: "10", 
          };
          this.spinner.show();
         //const response = await this.inspectionAPI.TechManagerGet(req);
          const response = await this.sharedAPI.TechManagerGet(req);
          this.spinner.hide();
          debugger;
          if (response.success) { 
              this.DEVICEDETAILSLIST = response.result;  
              this.excelData = this.DEVICEDETAILSLIST;
              this.filterdata = this.DEVICEDETAILSLIST;
          } else {
              this.toast.info(response.message);
          }
          //this.rerender();
      } catch (error) {
          this.spinner.hide();
          this.utils.catchResponse(error);
      }
  }

  filterdata:any[]=[];
  searchQuery:any;
  applyFilter() {  
    this.filterdata = this.DEVICEDETAILSLIST.filter((item:any) =>
        { 
      for (const key in item) {
        if (item.hasOwnProperty(key) && String(item[key]).toLowerCase().includes(this.searchQuery.toLowerCase())) {
          return true;
        }
      }
      return false;
        });
  
     }
     filterdataTransaction:any[]=[];
  searchQueryTransaction:any;
     applyFilterTransaction() {  
      this.filterdataTransaction = this.TRANSACTIONLIST.filter((item:any) =>
          { 
        for (const key in item) {
          if (item.hasOwnProperty(key) && String(item[key]).toLowerCase().includes(this.searchQuery.toLowerCase())) {
            return true;
          }
        }
        return false;
          });
    
       }

  Details(obj: any) {
    this.transaction_id = obj.TRANSACTION_ID;
   // this.RejectshowaprovedPopup = true;
   this.showapprovedPopup=true;
  }
  onClear(){
    this.showapprovedPopup=false;
    this.CertifcateFile='';
    $("#giftAndDeedPhotoUpload").val('');
  }
  btnExcelDownload(): void {  debugger;
      this.utils.JSONToxlxsConvertor(
          this.excelData,
          'Technicial Manager Reports',
          true
      );
  }
  btnExcelDownload1(): void { debugger;
      this.utils.JSONToxlxsConvertor(
          this.excelData1,
          'Technicial Manager Reports',
          true
      );
  }
  CertifcateFile:any;
  async onpdffileChange(event: any): Promise<void> {
    try {  debugger;
      this.CertifcateFile="";
      if (event.target.files.length > 0) {
  
        if (event.target.files[0].type === 'application/pdf') {
        const response: any = await this.utils.fileUploadEncodedString(
          event,
          this.utils.fileSize.oneMB
        );
        if (response) {
          
            
  let file=response;
        //   let file = (
        //     this.sanitizer.bypassSecurityTrustResourceUrl(response) as any
        //   ).changingThisBreaksApplicationSecurity;
          file = file.replace('data:application/pdf;base64,', '');
          debugger;
          this.CertifcateFile= file;
        } else {
          this.ngxToaster.warning('file is Empty !!!, Please try again.');        
          event.target.value = '';
        }
      }
      else{
        alert('Accept Only Pdf files Only..');
        this.CertifcateFile="";
        event.target.value = '';
      }
      } else {
        this.ngxToaster.warning('file is Empty !!!, Please try again.');      
        event.target.value = '';
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  } 

  today:any;
  async Certificateupload(): Promise<void> {
    debugger;
    try {
      this.today=new Date();
    //   this.Reportdate = formatDate(this.today, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0530');
      if (this.CertifcateFile === '' || this.CertifcateFile === null || this.CertifcateFile === undefined) {
        this.toast.info("Please Upload PDF File");
        return;
      }
      const req = {
         type:"18",
        input_03: this.session.userName,
        input_02: this.CertifcateFile,
        input_04: this.session.role,
        input_01: this.transaction_id,
        input_05:this.session.uniqueId
      };
      this.spinner.show();
      debugger;
      const response = await this.ceoAPI.PaymenetDetailsIns(req);
      if (response.success) {

        alert('Payment File Upload Successfully ...!');
        this.onClear();
        window.location.reload();
      } else {
        alert(response.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }

  }

  async btnPDF(): Promise<void> {
      try {
          const fileName = 'stateLevelLandInspection';
          let basePDF = '';
          this.spinner.show();
          const req = {
              type: "1",
          };
          const res = await this.inspectionAPI.mpfcLandInspectionStateReport(req);
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

  async btnPdfView(path: string): Promise<void> {
    try { 
      debugger;
      await this.utils.viewJPVPDFcop(path);
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  } 
  async btnPdfViewCrystal(path: string): Promise<void> {
    try { 
      debugger;
      await this.utils.viewJPVPDFcopcrystal(path);
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
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



  btnGetDetails(obj: any): void { 

    console.log(obj);
      this.transactionId= obj.TRANSACTION_ID; 

      this.DeviceDetails = false;
      this.TransactionDetails = true;
      this.ViewPACSDet = false;
      this.detailhide = true;

      this.approverejectdisable = false;
      this.LoadTransDetails();
    } 
   async LoadTransDetails():Promise<void> { 
        try { 
            const req = {
                type: "11", 
                input_01:this.transactionId
            };
            this.spinner.show();
           //const response = await this.inspectionAPI.TechManagerGet(req);
            const response = await this.sharedAPI.TechManagerGet(req);
            this.spinner.hide();
            debugger;
            if (response.success) { 
                this.TRANSACTIONLIST = response.result; 
                this.filterdataTransaction = this.TRANSACTIONLIST; 

                this.excelData1 = this.TRANSACTIONLIST;
            } else {
                this.toast.info(response.message);
            } 
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
       
        }


        btnback(){
            this.DeviceDetails = true;
            this.TransactionDetails = false;
            this.ViewPACSDet = false;
            this.approverejectdisable = true;
            this.LoadReport();
        }



        

        btnViewDetails(obj: any): void { 

              this.pacscode= obj.PACS_CODE; 
              this.transId= obj.TRANS_ID; 
        
              this.DeviceDetails = false;
              this.TransactionDetails = false;
              this.ViewPACSDet = true;
              this.LoadViewPacsDetails();
            } 

            async LoadViewPacsDetails():Promise<void> { 
                try { 
                    const req = {
                        type: "12", 
                        input_01:this.pacscode
                    };
                    this.spinner.show();
                   //const response = await this.inspectionAPI.TechManagerGet(req);
                    const response = await this.sharedAPI.TechManagerGet(req);
                    this.spinner.hide();
                    debugger;
                    if (response.success) { 
                        this.PACSDETAILSLIST = response.result;  
                    } else {
                        this.toast.info(response.message);
                        this.DeviceDetails = false;
                        this.TransactionDetails = true;
                        this.ViewPACSDet=false;
                    } 
                } catch (error) {
                    this.spinner.hide();
                    this.utils.catchResponse(error);
                }
               
                }
        
        
                btnback1(){
                    this.DeviceDetails = false;
                    this.TransactionDetails = true;
                    this.ViewPACSDet = false;
                    this.LoadViewPacsDetails();
                }


                onCheckboxChange(event: any) {
                    console.log('Checkbox checked:', event.target.checked);
                    // Additional logic when the checkbox is checked or unchecked
                  } 


                  selectAll(event: Event): void {
                    debugger
                    this.allSelected = (event.target as HTMLInputElement).checked;
                    this.TRANSACTIONLIST.forEach((record: { selected: boolean; }) => record.selected = this.allSelected);
                    this.updateSubmitVisibility(); 
              
                }
              
                updateSubmitVisibility(): void {
                    this.isSubmitVisible = this.TRANSACTIONLIST.some((record: { selected: any; }) => record.selected); 
                }


                async btnVerify():Promise<void>{ 
                    this.selectedRecords = this.TRANSACTIONLIST.filter((record: { selected: any; }) => record.selected);

                    const devicedetails = this.selectedRecords.map(device => ({                       
                        pacs_code: device.PACS_CODE || '', 
                      }));

                    try {           debugger;
                     const req = {
                        type:"4",
                        devicedetailslist : devicedetails,
                        input01:this.transactionId,
                        input02:"3",
                        inserted_by:this.session.userName,
                        role:this.session.role,
                     }

                     this.spinner.show(); 
                      const response = await this.inspectionAPI.TechManagerDetailsupdate(req);
                      this.spinner.hide();
                      debugger;
                      if (response.success) { 
                          this.PACSDETAILSLIST = response.result; 
                         // this.toast.info(response.message); 
                         
                          if(response.result[0].STATUS == '1'){
                            this.toast.successNavigate(response.message);
                            }
                            else if(response.result[0].STATUS == '2'){
                                this.toast.infoNavigate("Data Already Updated..!!");
                            }
                            else{
                                this.toast.info(response.message); 
                            }
                      } else {
                          this.toast.info(response.message);
                      } 
                  } catch (error) {
                      this.spinner.hide();
                      this.utils.catchResponse(error);
                  }
                }



                btnapproved():void{
                 // this.ApprovedRejectDetailsPopup=true;
                  this.TransactionDetails = true;
                  this.DeviceDetails = false;
                  this.detailhide = false;
                  //this.headingname = "Approved Details"
                  this.btnPendingapprovedDetails('1');

                  

                }
                
                btnRejected():void{
                 // this.ApprovedRejectDetailsPopup=true;
                 // this.headingname = "Pending Details"

                 this.TransactionDetails = true;
                 this.DeviceDetails = false;
                 this.detailhide = false;
                  this.btnPendingapprovedDetails('0');

                }


              onClearDetails(){
                this.ApprovedRejectDetailsPopup = false;
              }


              async btnPendingapprovedDetails(status:any):Promise<void> { 
                try { 
                    const req = {
                        type: "20",
                        input_01:status
                    };
                    this.spinner.show();  debugger;
                   //const response = await this.inspectionAPI.TechManagerGet(req);
                    const response = await this.sharedAPI.TechManagerGet(req);
                    this.spinner.hide();
                    debugger;
                    if (response.success) { 
                        this.TRANSACTIONLIST = response.result;  

                    } else {
                        this.toast.info(response.message);
                       // this.DeviceDetails = false;
                      //  this.TransactionDetails = true;
                       // this.ViewPACSDet=false;
                    } 
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