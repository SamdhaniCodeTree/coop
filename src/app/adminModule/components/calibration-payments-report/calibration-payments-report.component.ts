import { AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { MpfcLandInspectionService } from 'src/app/reportsModule/mpfcLandInspection/services/mpfc-land-inspection.service';
import { SessionService } from 'src/app/sharedModule/services/session.service';
import { SharedService } from 'src/app/sharedModule/services/shared.service';
import { ToasterService } from 'src/app/sharedModule/services/toaster.service';
import { UtilsService } from 'src/app/sharedModule/services/utils.service';

@Component({
  selector: 'app-calibration-payments-report',
  templateUrl: './calibration-payments-report.component.html',
  styleUrls: ['./calibration-payments-report.component.css']
})
export class CalibrationPaymentsReportComponent implements OnInit, OnDestroy, AfterViewInit {
  // tslint:disable-next-line: no-output-on-prefix
  type = '';
  districtId = '';
  @Output() onDistrictChange = new EventEmitter<string>();
   DEVICEDETAILSLIST: any = [];
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
  ) {
      this.userrole = this.session.role;;
  }
  Checkboxdisable=true;
   
  ngOnInit(): void {  
      this.LoadReport();
      if(this.session.userName=="SPMU_SI_1" || this.session.userName=="SPMU_SI_2" || this.session.userName=="SPMU_SI_3" || this.session.userName=="SPMU_SI_4" || this.session.userName=="SPMU_SI_5" || this.session.userName=="SPMU_SI_6")
      {
        this.Checkboxdisable=false;
         
      }
      else{
        this.Checkboxdisable=true;
      }
  }  
  async LoadReport(): Promise<void> {  
      try { 
          const req = {
              type: "6", 
          };
          this.spinner.show();
         //const response = await this.inspectionAPI.TechManagerGet(req);
          const response = await this.sharedAPI.TechManagerGet(req);
          this.spinner.hide();
          debugger;
          if (response.success) { 
              this.DEVICEDETAILSLIST = response.result;  
              this.excelData=this.DEVICEDETAILSLIST;
          } else {
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
          'Computerisation PACS Payments Report',
          true
      );
  }

  // btnapproved():void{
  //   this.ApprovedRejectDetailsPopup=true;
  // }
  
  // btnRejected():void{
  //   this.ApprovedRejectDetailsPopup=true;
  // }

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
      this.LoadTransDetails();
    } 
   async LoadTransDetails():Promise<void> { 
        try { 
            const req = {
                type: "7", 
                input_01:this.transactionId
            };
            this.spinner.show();
           //const response = await this.inspectionAPI.TechManagerGet(req);
            const response = await this.sharedAPI.TechManagerGet(req);
            this.spinner.hide();
            debugger;
            if (response.success) { 
                this.TRANSACTIONLIST = response.result;  

                this.TRANSACTIONLIST = this.TRANSACTIONLIST.map((value:any) => ({...value,selected:false})) ;

                console.log(this.TRANSACTIONLIST);
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
            this.LoadReport();
        }



        
        pacsname:any
        btnViewDetails(obj: any): void { 

              this.pacscode= obj.PACS_CODE; 
              this.transId= obj.TRANS_ID; 
              this.pacsname= obj.PACS_NAME;
        
              this.DeviceDetails = false;
              this.TransactionDetails = false;
              this.ViewPACSDet = true;
              this.LoadViewPacsDetails();
            } 

            async LoadViewPacsDetails():Promise<void> { 
                try { 
                    const req = {
                        type: "8", 
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
              
                updateSubmitVisibility(): void {  debugger;
                    this.isSubmitVisible = this.TRANSACTIONLIST.some((record: { selected: any; }) => record.selected); 
                }


                async btnVerify():Promise<void>{ 

                    if(this.isSubmitVisible == true) {

                        if (this.CertifcateFile === '' || this.CertifcateFile === null || this.CertifcateFile === undefined) {
                            this.toast.info("Please Upload PDF File");
                            return;
                          }

                        this.selectedRecords = this.TRANSACTIONLIST.filter((record: { selected: any; }) => record.selected);

                  const devicedetails = this.selectedRecords.map(device => ({                       
                      pacs_code: device.PACS_CODE || '', 
                    }));

                  try {           debugger;
                   const req = {
                      type:"3",
                      devicedetailslist : devicedetails,
                      input01:this.transactionId,
                      input02:"1",
                      inserted_by:this.session.userName,
                      role:this.session.role,
                     input03:this.CertifcateFile 
                   }

                   this.spinner.show(); 
                    const response = await this.inspectionAPI.TechManagerDetailsupdate(req);
                    this.spinner.hide();
                    debugger;
                    if (response.success) { 
                        this.PACSDETAILSLIST = response.result; 

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
                    else{
                   // this.ShowRejectPopup = false;
                    this.toast.info("Please check the checkbox to Approve the Data ..!!!");
                    return;
                    } 
              }

              btnVerify1()
              {
                if(confirm("Are you Sure you Want to Approve the Pack ..!!!")){
                const updatedUsers = this.TRANSACTIONLIST.map((record : {PACS_CODE:any,selected:any,}) =>
                 {
                    if(record.PACS_CODE === this.pacscode){
                        record.selected = true;
                    }
                    return record; 
                });
                
                this.DeviceDetails = false;
                this.TransactionDetails = true;
                this.ViewPACSDet = false;
                this.LoadViewPacsDetails();
       
              }
            } 
            typeofstatus:any;
            Statustype:any;
            btnReject(){ 
                   if(this.isSubmitVisible == true) {
                    this.typeofstatus='2';
                    this.Statustype='Reject';
                        this.ShowRejectPopup = true;
                    }
                    else{
                    this.ShowRejectPopup = false;
                    this.toast.info("Please check the checkbox to Reject the Data ..!!!")
                    }
            }
            
            btnhold(){ 
             
              if(this.isSubmitVisible == true) {
                this.typeofstatus='5';
                this.Statustype='Hold';
                   this.ShowRejectPopup = true;
               }
               else{
               this.ShowRejectPopup = false;
               this.toast.info("Please check the checkbox to Reject the Data ..!!!")
               }
       }
            onClear(){
              this.typeofstatus='';
                this.ShowRejectPopup = false;
            }

            onClearDetails(){
              this.ApprovedRejectDetailsPopup = false;
          }

            async btnRejectSubmit():Promise<void>{ 

              if (this.utils.isEmpty(this.Remarks)) {
                this.toast.warning('Please Enter Remarks');
                return;
              }else{

              

                this.selectedRecords = this.TRANSACTIONLIST.filter((record: { selected: any; }) => record.selected);

                const devicedetails = this.selectedRecords.map(device => ({                       
                    pacs_code: device.PACS_CODE || '', 
                  }));

                try {           debugger;
                 const req = {
                    type:"30",
                    devicedetailslist : devicedetails,
                    input01:this.transactionId,
                    input02:this.typeofstatus,
                    input04:this.Remarks,
                    inserted_by:this.session.userName,
                    role:this.session.role,
                 }

                 this.spinner.show(); 
                  const response = await this.inspectionAPI.TechManagerDetailsupdate(req);
                  this.spinner.hide();
                  debugger;
                  if (response.success) { 
                      this.PACSDETAILSLIST = response.result;
                      this.toast.successNavigate("Details Rejected Successfully ..!!!");
                  } else {
                      this.toast.info(response.message);
                  } 
              } catch (error) {
                  this.spinner.hide();
                  this.utils.catchResponse(error);
              }
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



  CertifcateFile:any;
  async onpdffileChange(event: any): Promise<void> {
    try {  debugger;
      this.CertifcateFile="";
      if (event.target.files.length > 0) {
  
        if (event.target.files[0].type === 'application/pdf') {
        const response: any = await this.utils.fileUploadEncodedString(
          event,
          this.utils.fileSize.threeMB
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

  async btnDOCView(obj:any): Promise<void> {
    try {  debugger;
        const fileName = 'Shree Info System Solutions Pvt. Ltd_'+obj;
        let basePDF = '';
        this.spinner.show();
        const req = {
            type: "21",
            input_01:obj
        };
        const res = await this.inspectionAPI.ShreeInfoSystemSolutionsPayment(req);
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
}