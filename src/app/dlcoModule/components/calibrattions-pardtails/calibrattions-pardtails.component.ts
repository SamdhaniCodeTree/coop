import { formatDate } from '@angular/common';
import { Component, OnInit ,ViewChild} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { CeoService } from 'src/app/ceoModule/services/ceo.service';
import { ConsoleService } from 'src/app/sharedModule/services/console.service';
import { NgxToasterService } from 'src/app/sharedModule/services/ngx-toaster.service';
import { SessionService } from 'src/app/sharedModule/services/session.service';
import { SharedService } from 'src/app/sharedModule/services/shared.service';
import { ToasterService } from 'src/app/sharedModule/services/toaster.service';
import { UtilsService } from 'src/app/sharedModule/services/utils.service';

@Component({
  selector: 'app-calibrattions-pardtails',
  templateUrl: './calibrattions-pardtails.component.html',
  styleUrls: ['./calibrattions-pardtails.component.css']
})
export class CalibrattionsPARDtailsComponent implements OnInit { 
  searchTerm: string = ""

  fromDate: any;
  toDate: any;
  reportFromDate: any;
  reportToDate: any;
  pacsid: any;
  deviceId: any;
  devicecode: any;
  pacsId: any;

  minDate: any;
  maxDate: any;
  formsection = false;
  formdesigsection = false;
  formsectioneditemp = false;
  supervisible = false;
  remarksupd = false;
  approvedStat = false;
  table1 = true;
  table2 = false;
  super = false;
  Remarks2 = false;
  submithide = false;

  pendingpacs = true;
  Approvedpacs = false;
  rejectstatus: any;

  CalibrationCounts: any = '';
  Sitepreparationaprove = {
    type: '',
    status: '',
    packid: '',
    Remrks: '',
  }
  Unique_id = '';
  hrmsreq = {
    type: '9',
    cfmsid: '',
    empname: '',
    Gender: '',
    mobileno: '',
    alternativemobileno: '',
    emailid: '',
    Dateofbirth: '',
    dateof_joining: '',
    dateofreteried: '',
    cadre: '',
    eofficeid: '',
    typeofservice: '',
    typeofpost: '',
    designation: '',
    office: '',
    officetype: '',

    dateofreleving: '',
    remarks: '',
    insertedby: '',
    updatedby: '',
  };


  CalibrationDisList: any[] = [];
  CalibrationDisList1: any[] = [];
  PacsDisList: any[] = [];
  PackId: any;

  employeeDesignList: any[] = [];
  GenderArr: any[] = [];
  CaderArr: any[] = [];
  ServiceArr: any[] = [];
  DesignationArr: any[] = [];
  PostArr: any[] = [];
  OfficeArr: any[] = [];
  OfficetypeArr: any[] = [];

  reportType: any;
  DetailsView: any;


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
    private ceoAPI: CeoService,
    private sanitizer: DomSanitizer,

  ) { }

  RejectshowaprovedPopup = false;
  showapprovedPopup = false;
  CalibrationDashboardview = true;
  actionStatus = false;
  ngOnInit(): void {
    // debugger;
    // this.today=new Date();
    //   this.Reportdate = formatDate(this.today, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0530');
    this.hrmsreq.insertedby = this.session.userName;
    this.hrmsreq.updatedby = this.session.userName;
     
    
    this.CalibrationDashboardview = true;
    this.actionStatus = true;
    this.reportIdstatus = '1';
   // this.Pacslist(); 
   // this.DateCertificate();
this.DeviceDetailslist();
   this.DisableSubmit();

  }
  letterOnly(event: { which: any; keyCode: any; preventDefault: () => void; }): Boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122)) {
      return false;
    }
    return true;
  }
  keyPressNumbers(event: { which: any; keyCode: any; preventDefault: () => void; }) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }


  async showsection(): Promise<void> {
    this.hrmsreq.cfmsid = '',
      this.hrmsreq.empname = '',
      this.hrmsreq.mobileno = '',

      this.hrmsreq.empname = '', this.hrmsreq.dateof_joining = '';
    this.formsection = true;
  }


  async CalibrationCountlist(): Promise<void> {
    try {

      const req = {
        type: '19',
        alternativemobileno: this.session.uniqueId,
        cfmsid: this.session.pacId,
      };
      this.spinner.show();
      const response = await this.sharedAPI.Hrmsemp(req);
      this.spinner.hide();
      debugger;
      if (response.success) {
        this.CalibrationCounts = response.result[0];
      } else {
        //this.toast.info(response.message);
      }
    } catch (error) {
      this.spinner.hide();
      //this.utils.catchResponse(error);
    }
  }


  //list Site Properation
  async Pacslist(): Promise<void> {
    try {
      debugger;
      this.PacsDisList = [];
      const req = {
        type: '34',
        alternativemobileno: this.session.pacId,


      }; debugger;
      this.spinner.show();
      const response = await this.sharedAPI.Hrmsemp(req);
      debugger;
      this.spinner.hide();
      if (response.success) {
        this.PacsDisList = response.result;
        this.pacsid = this.CalibrationDisList[0].PACSCODE;
        // this.deviceId = this.CalibrationDisList[0].DEVICE_ID;  
        console.log(this.pacsid);
      }

      else {
        this.PackId = undefined;
       }
    } catch (error) {
      this.spinner.hide();    
    }
  }

  PacsChange(obj: any) {
    debugger;
    this.PackId = obj;
    if (this.reportIdstatus === '1') {
      this.DeviceDetailslist();
    }
    else if (this.reportIdstatus === '2') {
      this.DeviceApproveRejectlist('39');
    }
    else {
      this.DeviceApproveRejectlist('40');
    }

  }

  approvedCount: any;
  async DeviceDetailslist(): Promise<void> {
    try {
debugger;
      this.CalibrationDisList = [];
      const req = {
        type: '35',
        // alternativemobileno: this.session.pacId,
        cfmsid: this.session.pacId,
      };
      this.spinner.show();
      const response = await this.sharedAPI.Hrmsemp(req);
      debugger;
      this.spinner.hide();
      if (response.success) {
        this.CalibrationDisList = response.result;
        //this.CalibrationDisList1 = response.result;
        this.pacsId = this.CalibrationDisList[0].PACS_CODE;
        this.deviceId = this.CalibrationDisList[0].DEVICE_ID; 

        var l = 0;
        for (var i = 0; i < this.CalibrationDisList.length; i++) {

          if (this.CalibrationDisList[i]["SP_APROVED_STATUS"] === 1) {
            l++;
            this.approvedCount = l;
          }
          else {
          }
          if (this.approvedCount === 17) {
            this.approvedStat = true;
          }
        }
      }

      else {
        //this.CalibrationDisList = [];      
        this.CalibrationDisList1 = [];      
      }
      this.rerender();
    } catch (error) {
      this.spinner.hide();     
    }
  }
  async DeviceApproveRejectlist(type: any): Promise<void> {
    try {
      debugger;
      this.CalibrationDisList1 = [];
      this.CalibrationDisList = [];
      const req = {
        type: type,
        alternativemobileno: this.session.uniqueId,
        cfmsid: this.PackId,
      };
      this.spinner.show();
      const response = await this.sharedAPI.Hrmsemp(req);
      debugger;
      this.spinner.hide();
      if (response.success) {
        this.CalibrationDisList = [];
        this.CalibrationDisList1 = response.result;
        this.pacsId = this.CalibrationDisList1[0].PACS_CODE;
        this.deviceId = this.CalibrationDisList1[0].DEVICE_ID;       
        var l = 0;
        for (var i = 0; i < this.CalibrationDisList1.length; i++) {

          if (this.CalibrationDisList1[i]["SP_APROVED_STATUS"] === 1) {
            l++;
            this.approvedCount = l;
          }
          else {
          }
          if (this.approvedCount === 17) {
            this.approvedStat = true;
          } 
        }
      }
      else { 
        this.CalibrationDisList = [];
      }
     // this.rerender();
    } catch (error) {
      this.spinner.hide();
      
    }
  } 

  async CalibrationApprovedlist11(objstatus: any): Promise<void> {
    try {
      debugger;
      this.CalibrationDisList = [];
      const req = {
        type: objstatus,
        uniqueId: this.session.uniqueId,

      };
      this.spinner.show();
      const response = await this.sharedAPI.SocietyMasterList(req);
      debugger;
      this.spinner.hide();
      if (response.success) {
        this.CalibrationDisList = response.result;

        for (let i = 0; i < this.CalibrationDisList.length; i++) {  
          if (this.CalibrationDisList[i].STATUS != '0') {
            this.actionStatus = false;
          }
        }
      } else { 
        this.toast.info("No Data Available to Show Report !!!");
      }
    } catch (error) {
      this.spinner.hide();
     
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
  async btnPDFViewcrystal(path: string): Promise<void> {
    try {
      debugger;
      await this.utils.viewJPVPDFcopcrystal(path);

    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }





  async Approveddetails11(obj: any): Promise<void> {

    this.Unique_id = obj.UNIQUE_ID;

    debugger;
    try {
      if (confirm('are you sure want to Approved Site Preparation Details  ....')) {

        const req = {
          type: '17',
          cfmsid: "1",
          office: this.Unique_id
        };
        this.spinner.show();
        let response: any;
        response = await this.sharedAPI.Hrmsemp(req);
        this.spinner.hide();
        if (response.success) {
          this.toast.success('Details Approved  Sucessfully Completed');

          this.CalibrationCountlist();
        }
        else {
          this.toast.info(response.message);
        }
      }
    } catch (error) {

      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
  Remrks = '';
  Rejectdetails(obj: any) {
    this.Unique_id = obj.UNIQUE_ID;
    this.RejectshowaprovedPopup = true;

  }
  packcode = '';


  async Approveddetailsbycalib(): Promise<void> {
    debugger;
    this.btnPDF();
   // this.showapprovedPopup = true;

  }



  async Approveddetails(obj: any): Promise<void> {
    debugger;
    this.packcode = obj.PACS_CODE;
    this.Unique_id = obj.UNIQUE_ID;
    this.devicecode = obj.DEVICE_ID;
    try {
      if (confirm('are you sure want to Approved Device Received Status & Calibration ??')) {

        const req = {
          type: '6',
          input_05: "",
          input_03: "1",
          inserted_by: this.session.userName,
          input_01: this.packcode,
          input_02: this.devicecode

        };
        debugger;
        this.spinner.show();
        const response = await this.ceoAPI.CalibrationDetailsIns(req);
        this.spinner.hide();
        if (response.success) {
          this.toast.success('Details Approved Sucessfully.');
          this.DeviceDetailslist(); 
           // window.location.reload();
         this.CalibrationCountlist();
        }
        else {
          this.toast.info(response.message);
        }
      }
    } catch (error) {

      this.spinner.hide();
      this.utils.catchResponse(error);
    }

  }

  async RejectDetails(obj: any): Promise<void> {
    this.packcode = obj.PACS_CODE;
    this.Unique_id = obj.UNIQUE_ID;
    this.devicecode = obj.DEVICE_ID;
    this.RejectshowaprovedPopup = true;
  }

  async RejectbtnDetails(): Promise<void> {
    debugger;
    if (this.Remrks === null || this.Remrks === "" || this.Remrks === undefined) {
      this.toast.info("Please Enter Remarks");
      return;
    }
    try {
      if (confirm('are you sure want to Reject Device Received Status & Calibration ??')) {

        const req = {
          type: '6',
          input_05: this.Remrks,
          input_03: "9",
          inserted_by: this.session.userName,
          input_01: this.packcode,
          input_02: this.devicecode

        };
        debugger;
        this.spinner.show();
        const response = await this.ceoAPI.CalibrationDetailsIns(req);
        this.spinner.hide();
        if (response.success) {
          this.toast.success('Details Rejected Sucessfully.');
          this.DeviceDetailslist();
          this.CalibrationCountlist();
          this.onClear(); 
          
          // window.location.reload(); 
        }
        else {
          this.toast.info(response.message);
        }
      }

    } catch (error) {

      this.spinner.hide();
      this.utils.catchResponse(error);
    }

  }




  async btnSubmitDetails(): Promise<void> {
    try {
      if (confirm('are you sure want to Reject Site Preparation Details  ....')) {
        const req = {
          type: '18',
          cfmsid: "9",
          office: this.Unique_id,
          emailid: this.Remrks

        };
        this.spinner.show();
        let response: any;
        response = await this.sharedAPI.Hrmsemp(req);
        this.spinner.hide();
        if (response.success) {
          this.toast.success('Details Approved  Sucessfully Completed');
          this.RejectshowaprovedPopup = false;
          //this.Calibrationlist();
          this.CalibrationCountlist();

        }
        else {
          this.toast.info(response.message);
          //this.getemployeeDesignList();
        }
      }
    } catch (error) {

      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }


  async btnSubmitAprove(): Promise<void> {

    try {
      if (confirm('are you sure want to Reject Site Preparation Details  ....')) {
        const req = {
          type: '18',
          cfmsid: "9",
          office: this.Unique_id,
          emailid: this.Remrks,

        };
        this.spinner.show();
        let response: any;
        response = await this.sharedAPI.Hrmsemp(req);
        this.spinner.hide();
        if (response.success) {
          this.toast.success('Details Rejected Sucessfully Completed');
          this.RejectshowaprovedPopup = false;

          this.CalibrationCountlist();

        }
        else {
          this.toast.info(response.message);
        }
      }
    } catch (error) {

      this.spinner.hide();
      this.utils.catchResponse(error);
    }

  }
  today:any;
  Reportdate:any;
  async Certificateupload(): Promise<void> {
    debugger;
    try {
      this.today=new Date();
      this.Reportdate = formatDate(this.today, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0530');
      // if (this.CertifcateFile === '' || this.CertifcateFile === null || this.CertifcateFile === undefined) {
      //   this.toast.info("please upload pdf");
      //   return;
      // }
      const req = {
        // type:"4",
        input_03: this.CertifcateFile,
        input_02: this.session.userName,
        input_04: this.session.pacId,
        input_01: "3",
        input_05:this.Reportdate
      };
      this.spinner.show();
      debugger;
      const response = await this.ceoAPI.SuperriserFileuploadUpdate(req);
      if (response.success) {
        this.DateCertificate();
        alert('Details Approved Successfully ...!');

        this.onClear1();
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

  async DateCertificate(): Promise<void> {

    try {debugger;
      this.today=new Date();
      this.Reportdate = formatDate(this.today, 'dd-MM-yyyy', 'en-US', '+0530');
        const req = {
          type: '53',
          cfmsid: this.session.pacId,
         // office: this.session.userName,
          emailid:this.Reportdate.substring(0,10), 

        };
        this.spinner.show();
        let response: any;
        response = await this.sharedAPI.Hrmsemp(req);
        debugger;
        this.spinner.hide();
        if (response.success) {
          
        }
        else {
         
        }
      
    } catch (error) {

      this.spinner.hide();
      this.utils.catchResponse(error);
    }

  }
  onClear() {
    this.RejectshowaprovedPopup = false;
    this.CertifcateFile = '';
    this.Remrks = '';
  }

  onClear1() {
    this.showapprovedPopup = false;
    $("#giftAndDeedPhotoUpload").val('');
    this.CertifcateFile = '';

  }

  reportIdstatus: any;

  btnDashboardDetails(id: any): void {
    debugger;
    this.reportType = id;


    if (id === '1') {
      this.actionStatus = true;
      this.supervisible = false;
      //this.super = false;
      this.table1 = true;
      this.table2 = false;
      this.DetailsView = "PENDING DETAIL";
      //this.CalibrationDisList = []
      //this.DeviceDetailslist();
      this.reportIdstatus = '1';
      this.PacsDisList = [];
     // this.Pacslist('34');


    }
    else if (id === '2') {

      this.DetailsView = "APPROVED DETAILS";
      //this.CalibrationApprovedlist11('555');


      this.table1 = false;
      this.table2 = true;
      this.super = true;
      this.Remarks2 = false;
      this.DeviceApproveRejectlist('39');
      this.supervisible = true;
      this.actionStatus = false;
      this.reportIdstatus = '2';
      this.PacsDisList = [];
      //this.Pacslist('341');


    } else if (id === '3') {

      this.table1 = false;
      this.table2 = true;
      this.super = false;
      this.Remarks2 = true;
      this.DetailsView = "REJECTED DETAILS";
      this.DeviceApproveRejectlist('40');
      this.actionStatus = false;
      this.supervisible = false;
      this.reportIdstatus = '3';
      this.PacsDisList = [];
     // this.Pacslist('342');
    } 
  }


  async btnPDF(): Promise<void> {
    debugger;
    try {

      const req = {
        type: "2",
        pack_id:this.session.pacId
        //input2:this.year
      };
      debugger;
      const fileName = 'Calibration Details';
      let basePDF = '';
      this.spinner.show();

      const res = await this.ceoAPI.DeviceVerificationCert(req);
      if (res.success) {
        basePDF = res.result;
        this.CertifcateFile=basePDF;
        this.Certificateupload();
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

  CertifcateFile: any;

  async onpdffileChange(event: any): Promise<void> {
    try {
      debugger;
      this.CertifcateFile = "";
      if (event.target.files.length > 0) {

        if (event.target.files[0].type === 'application/pdf') {
          const response: any = await this.utils.fileUploadEncodedString(
            event,
            this.utils.fileSize.threeMB
          );
          if (response) {
            let file = (
              this.sanitizer.bypassSecurityTrustResourceUrl(response) as any
            ).changingThisBreaksApplicationSecurity;
            file = file.replace('data:application/pdf;base64,', '');
            debugger;
            this.CertifcateFile = file;
          } else {
            this.ngxToaster.warning('file is Empty !!!, Please try again.');
            event.target.value = '';
          }
        }
        else {
          alert('Accept Only Pdf files Only..');
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


  async DisableSubmit():Promise<void>{

    try { 
      const req = {
        type:"14", 
        input_01:this.session.pacId
                
                  
      };
      this.spinner.show();
      debugger;
     // const response = await this.ceoAPI.CalibrationDetailsInsert(req);
      const response = await this.sharedAPI.TechManagerGet(req);
      if (response.success) {  

        if(response.result[0].STATUS == 1 ){
          this.submithide = true; 
        } 
        else  if(response.result[0].STATUS == 0){
          this.submithide = false; 
        }
        else{
          this.submithide = true; 
        } 

      } else { 
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
