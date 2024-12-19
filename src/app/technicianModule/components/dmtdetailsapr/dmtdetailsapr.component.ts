import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
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
  selector: 'app-dmtdetailsapr',
  templateUrl: './dmtdetailsapr.component.html',
  styleUrls: ['./dmtdetailsapr.component.css']
})
export class DmtdetailsaprComponent implements OnInit {

  
  fromDate: any;
  toDate: any;
  reportFromDate: any;
  reportToDate: any;
 
  minDate : any;
  maxDate : any;
  formsection = false;
  formdesigsection = false;
  formsectioneditemp = false;
  dmtdochide = false;

  CalibrationCounts: any = '';
  Sitepreparationaprove={
    type:'',
    status:'',
    packid:'',
    Remrks:'',
  }
  Unique_id='';
  hrmsreq = {
    type: '9',
    cfmsid: '',
    empname:'', 
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

  employeeDesignList: any[] = [];
  GenderArr: any[] = [];
  CaderArr: any[] = [];
  ServiceArr: any[] = [];
  DesignationArr: any[] = [];
  PostArr: any[] = [];
  OfficeArr: any[] = [];
  OfficetypeArr: any[] = [];
  
  reportType:any;
  DetailsView:any;

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
    private sanitizer: DomSanitizer,
    private ceoAPI: CeoService,

  ) { }

  showaprovedPopup=false;
  showapprovedPopup=false;
  CalibrationDashboardview=true;
  actionStatus=false;
  ngOnInit(): void {
    this.hrmsreq.insertedby = this.session.userName;
    this.hrmsreq.updatedby = this.session.userName;
    this.DetailsView="PENDING DETAIL";
   this.CalibrationCountlist();
    this. CalibrationDashboardview=true;
    this.actionStatus=true;
    this.Calibrationlist(); 
  }
  letterOnly(event: { which: any; keyCode: any; preventDefault: () => void; }) : Boolean{
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
    this.hrmsreq.cfmsid= '',
    this.hrmsreq.empname= '',
    this.hrmsreq.mobileno= '',
    
    this.hrmsreq.empname= '',this.hrmsreq.dateof_joining='';
    this.formsection = true;
  }

  
  async CalibrationCountlist(): Promise<void> {
    try {

      const req = {
        type: '29',
        alternativemobileno:this.session.uniqueId
      };
      this.spinner.show();
      const response = await this.sharedAPI.Hrmsemp(req); 
       debugger;
      this.spinner.hide();
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
  async Calibrationlist(): Promise<void> {
    try {
      this.CalibrationDisList=[];
      const req = {
        type: '28',
        alternativemobileno:this.session.uniqueId
      };
      this.spinner.show();
      const response = await this.sharedAPI.Hrmsemp(req);
      
      this.spinner.hide();
      if (response.success) {
        this.CalibrationDisList = response.result;
      } else {
        //this.toast.info(response.message);
        //this.toast.info("No Data Available to Show Report !!!");
      }
    } catch (error) {
      this.spinner.hide();
      //this.utils.catchResponse(error);
    }
  }

  async Uploaddetails():Promise<void>{


  }

  async CalibrationApprovedlist(type:any,objstatus:any): Promise<void> {
    try {
      this.CalibrationDisList=[];
      const req = {
        type: type,
        uniqueId:this.session.uniqueId,
        pacId:objstatus,
      };
      this.spinner.show();
      const response = await this.sharedAPI.SocietyMasterList(req);
      debugger;
      this.spinner.hide();
      if (response.success) {
        this.CalibrationDisList = response.result;
        
        for (let i = 0; i < this.CalibrationDisList.length; i++) {
          // this.milkDispatchdetailsReportTotals.Total_AWCs += parseFloat(
          //   this.CalibrationDisList[i].TOTAL_AWCS
          // );

           if(this.CalibrationDisList[i].STATUS!='1')
           {
            this.actionStatus=false;
           }
        }
      } else {
        //this.toast.info(response.message);
        this.toast.info("No Data Available to Show Report !!!");
      }
    } catch (error) {
      this.spinner.hide();
      //this.utils.catchResponse(error);
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
       await this.utils.viewJPVPDFcopcrystal(path);
       
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
  async btnPDFView1(path: string): Promise<void> {
    try {
      debugger;
       await this.utils.viewJPVPDFcop(path);
       
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }


  packcode='';
  Approveddetails(obj:any){
    debugger;
    this.Unique_id=obj.UNIQUE_ID;   
    this.packcode=obj.PACSCODE;
    this.showapprovedPopup=true;

  }
 
  async Approveddetails1(obj: any): Promise<void> {

    this.Unique_id=obj.UNIQUE_ID;
     
debugger;
    try {
      if (confirm('are you sure want to Approved Site Preparation Details  ....')) {
       
        const req = {
          type: '17',          
    cfmsid:"2",
    office:this.Unique_id
    // mobileno:this.Sitepreparationaprove.packid,
        };
        this.spinner.show();
        let response: any;
        response = await this.sharedAPI.Hrmsemp(req);
        this.spinner.hide();
        if (response.success) {
          this.toast.success('Details Approved  Sucessfully Completed');
          this.Calibrationlist();
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
  Remrks='';
  pacscode='';
  Rejectdetails(obj:any){   debugger;
this.packcode=obj.PACSCODE;
    this.Unique_id=obj.UNIQUE_ID;   
    this.showaprovedPopup=true;

  }
  

  

  onClear(){
    this.showaprovedPopup=false;
    this.Remrks='';
  }
   
  

  btnDashboardDetails(id:any): void {
    debugger;
    this.reportType = id;
    if (id === '1') 
    {  
      this.actionStatus=true;
      this.dmtdochide=false;
    this.DetailsView="PENDING DETAIL";
    this.Calibrationlist();
   
    } 
    else if (id === '2') {
      this.DetailsView="APPROVED DETAILS";
       this.CalibrationApprovedlist('666','2');
       this.actionStatus=false;
       this.dmtdochide=true;
      
    }else if (id === '3') {
       
      this.DetailsView="REJECTED DETAILS";
      this.CalibrationApprovedlist('888','99');
      this.actionStatus=false;
      this.dmtdochide=false;
     
       
    }

   
    
  } 


  async btnPDF(obj:any): Promise<void> {debugger;
    try {
      
      const req = { 
        type:"6",
        pack_id:this.packcode
        //input2:this.year
      };
      debugger;
      const fileName = 'Calibration Details';
      let basePDF = '';
      this.spinner.show();
      
      const res = await this.ceoAPI.CalibrationDetails(req);
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

  CertifcateFile:any;
onClear1(){
  this.showapprovedPopup=false;
  $("#giftAndDeedPhotoUpload").val('');
}

  

  async btnSubmitDetails(): Promise<void> {

    try {  debugger;
      if (confirm('are you sure want to Reject Site Preparation Details  ....')) {
               const req = {  
          input_01: "99",          
          input_02: this.session.userName,
          input_03:"",
          input_04: this.packcode,
          input_05: this.Remrks,
         
        };
        this.spinner.show();
        const response = await this.ceoAPI.DmtFileuploadUpdate(req);
        this.spinner.hide();
        if (response.success) {
          this.toast.success('Details Rejected Sucessfully ...!');
          this.showaprovedPopup=false;
          this.Calibrationlist();
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



  async Certificateupload():Promise<void>{

    try {
  
      if(this.CertifcateFile === '' || this.CertifcateFile === null || this.CertifcateFile === undefined){
        this.toast.info("please upload pdf");
        return;
      }  debugger;
      const req = { 
        input_03: this.CertifcateFile,
        input_02: this.session.userName,
        input_04: this.packcode,
        input_01: "4",
      };
      this.spinner.show();
      debugger;
      const response = await this.ceoAPI.DmtFileuploadUpdate(req);
      if (response.success) {
       
        alert('Details Approved Successfully ...!');
        window.location.reload();       
      } else {
        //alert(response.message);
        alert("PACS Approved Successfully !!!");
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  
  } 

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
      else{
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


 
}

