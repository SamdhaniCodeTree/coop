import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { ConsoleService } from 'src/app/sharedModule/services/console.service';
import { NgxToasterService } from 'src/app/sharedModule/services/ngx-toaster.service';
import { SessionService } from 'src/app/sharedModule/services/session.service';
import { SharedService } from 'src/app/sharedModule/services/shared.service';
import { ToasterService } from 'src/app/sharedModule/services/toaster.service';
import { UtilsService } from 'src/app/sharedModule/services/utils.service';
import { pacsReqModel, villagesModel } from '../../models/pacs-creation.model';
 
import { DlcoService } from '../../services/dlco.service';
@Component({
  selector: 'app-pacsgeotaggingapproval',
  templateUrl: './pacsgeotaggingapproval.component.html',
  styleUrls: ['./pacsgeotaggingapproval.component.css']
})
export class PacsgeotaggingapprovalComponent implements OnInit {
  approvalmodal= false;
  Removemodal= false;
  userMessage:any;
  ceoReq = {
    
    name: '',
    type: '',
    ipaddress: '',
    districtid: '',
    distcode: '',
    divisionid: '',
    districtId: '',
    divisionId: '',
    mandalid: '',
    mandalId: '',
    mandalcode: '',
    divisioncode: '',
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
    pacscode: '',
    rbkcode: '',
    rbkId: '',
    
    pacsphoto: '',
    lattitude: '',
    longitude: '',
    geoaddress: '',
    uniqueid: '',
    ApprovalStatus: '0',
    password: '',
    Remarks: '',
    recordAlreadyAvailable: false,

  };

  dropReq = {
    
    type: '',
    districtId: '',
    divisionId: '',
    mandalId: '',
    pacId: '',
    rbkId: '',
    rbkname: '',
    packname: '',
    
  };
  mandalList: any[] = [];
  divisionList: any[] = [];
  pacList: any[] = [];
  RBKList: any[] = [];
  selectedItems: villagesModel[] = [];
  excelData: any[] = [];
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
    
    this.ceoReq.districtid = this.session.districtId;
    this.ceoReq.districtId = this.session.districtId;
    this.ceoReq.distcode = this.session.districtId;
    this.ceoReq.insertedby = this.session.uniqueId;
    this.divisionListload();
    this.approvalmodal = false;
  }

  async divisionListload(): Promise<void> {
    try {
      this.ceoReq.type = '2';
      this.spinner.show();
      const response = await this.sharedAPI.packsmandalList(this.ceoReq);
      this.spinner.hide();
      if (response.success) {
        this.divisionList = response.result;
      } else {
        this.toast.info(response.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
 

   
  async onDivisionChange(): Promise<void> {

    try {
      try {
        this.ceoReq.type = '6';
        this.ceoReq.divisionId = this.ceoReq.divisioncode;
        this.ceoReq.divisionid = this.ceoReq.divisioncode;
        this.spinner.show();
        const response = await this.sharedAPI.packsmandalList(this.ceoReq);
        this.spinner.hide();
        if (response.success) {
          this.mandalList = response.result;
        } else {
          this.toast.info(response.message);
        }
      } catch (error) {
        this.spinner.hide();
        this.utils.catchResponse(error);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
  async onMandalChange(): Promise<void> {
    try {
      
      this.ceoReq.type = '7';
      this.ceoReq.name = '';
      this.ceoReq.mobileno = '';
      this.ceoReq.uniqueId = '';
      this.ceoReq.fatherhusbandname = '';
      this.ceoReq.residentialaddress = '';
      this.ceoReq.uidnum ='';
      this.ceoReq.pannumber = '';
      this.ceoReq.rationcardnumber = '';
      this.ceoReq.mailid = '';
      this.ceoReq.recordAlreadyAvailable = false;
      this.ceoReq.pacsid = '';
      this.ceoReq.mandalId=this.ceoReq.mandalcode;
      this.ceoReq.mandalid=this.ceoReq.mandalcode;
      if (this.utils.isEmpty(this.ceoReq.mandalId)) {
        return;
      }
      this.spinner.show();
      const response = await this.sharedAPI.packsmandalList(this.ceoReq);
      this.spinner.hide();
      if (response.success) {
        this.pacList = response.result;
      } else {
        this.toast.info(response.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
  
  async loadsureyvrbklist(): Promise<void> {
    try {
      this.dropReq.type="8";
      this.dropReq.districtId=this.ceoReq.districtId;
      this.dropReq.divisionId=this.ceoReq.divisioncode;
      this.dropReq.mandalId=this.ceoReq.mandalcode;
      this.dropReq.pacId=this.ceoReq.pacscode;
      this.dropReq.rbkId="";
      this.RBKList = [];
      
      this.spinner.show();
      const response = await this.sharedAPI.packsmandalList(this.dropReq);
      this.spinner.hide();
      if (response.success) {
        this.RBKList = response.result;
      } else {
        this.toast.info(response.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
  async btnSubmit(): Promise<void> {
    try {
      if (this.utils.isEmpty(this.ceoReq.divisioncode)) {
        this.toast.warning('Select Division');
        return;
      }
      if (this.utils.isEmpty(this.ceoReq.mandalcode)) {
        this.toast.warning('Select Mandal');
        return;
      }
      if (this.utils.isEmpty(this.ceoReq.pacscode)) {
        this.toast.warning('Select PAC');
        return;
      }
      this.loadsureyvrbklist();
      
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
  async viewPhoto(obj: any): Promise<void> {  
    try {
      window.open("https://apicooperation.ap.gov.in/copsBackend/"+obj.PACS_PHOTO, '_Blank');
       
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
  async Remove_record(obj: any): Promise<void> {  
    try {
      this.Removemodal= true;
      this.ceoReq.rbkcode=obj.PACS_CODE;
      //window.open("https://apicooperation.ap.gov.in/copsBackend/"+obj.PACS_PHOTO, '_Blank');
       
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
  async btnapprovereject(obj: any): Promise<void> {
    try {
      this.dropReq.packname=obj.PACS_NAME;
      this.dropReq.rbkname=obj.RBK_NAME;
      this.ceoReq.distcode=obj.DIST_CODE;
      this.ceoReq.mandalcode=obj.MANDAL_CODE;
      this.ceoReq.pacscode=obj.PACS_CODE;
      this.ceoReq.rbkcode=obj.RBK_CODE;
      this.approvalmodal = true;
       
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
    
  }
  async btnupdate(): Promise<void> {
    try {
      if (this.utils.isEmpty(this.ceoReq.ApprovalStatus)) {
        this.toast.warning('Select ApprovalStatus');
        return;
      }
      if (this.ceoReq.ApprovalStatus==='0') {
        this.toast.warning('Select ApprovalStatus');
        return;
      }
      if (this.utils.isEmpty(this.ceoReq.Remarks)) {
        this.toast.warning('Enter Remarks');
        return;
      }
      this.ceoReq.type=this.ceoReq.ApprovalStatus;
      this.ceoReq.geoaddress=this.ceoReq.Remarks;
      
      this.spinner.show();
      let response: any;
      response = await this.sharedAPI.sergeotagsubmit(this.ceoReq);
      this.spinner.hide();
      if (response.success) {
        alert("sucessfully status updated");
        this.approvalmodal = false;
        this.loadsureyvrbklist();
      } else {
        this.toast.info("status update fail..");
        this.approvalmodal = false;
        this.loadsureyvrbklist()
      }
    } catch (error) {
      this.approvalmodal = true;
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
    
  }

  //remove
  async btnDelete(): Promise<void> {
    try {
      if (this.utils.isEmpty(this.ceoReq.Remarks)) {
        this.toast.warning('Please Select Remarks');
        return;
      }
      else{

        if (confirm("Do you want to Remove Record...?") == true) {
          
          this.ceoReq.type = '11';
          this.ceoReq.pacscode=this.ceoReq.pacscode;
          this.ceoReq.geoaddress=this.ceoReq.Remarks;
       
        
          this.spinner.show();

          // const requestData = {
          //   type:'11',
          //   pacscode:this.ceoReq.pacscode
          // }
          
      let response: any;
      response = await this.sharedAPI.sergeotagsubmit(this.ceoReq);
      debugger;
      this.spinner.hide();
      if (response.success) {
        alert("Remove Pack Details sucessfully...!");
        this.Removemodal = false;
        this.loadsureyvrbklist();
      } else {
        this.toast.info("Remove Pack Details Fail...!");
        this.Removemodal = false;
       
      }

         // this.userMessage = "Data Remove successfully!";
        } else {
          this.userMessage = "Please Check and Verified...!";
        }
        


      }
      
     
      
      
    } catch (error) {
      this.approvalmodal = true;
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
    
  }

}

