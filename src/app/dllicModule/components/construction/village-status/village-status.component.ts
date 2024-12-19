import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { NgxSpinnerService } from 'ngx-spinner';
import { promise } from 'protractor';
import { MpfcLandInspectionService } from 'src/app/reportsModule/mpfcLandInspection/services/mpfc-land-inspection.service';
import {
  mpfcInspectionModel,
  questionsListModel,
} from 'src/app/sharedModule/models/mpfc-inspection.model';
import { ConsoleService } from 'src/app/sharedModule/services/console.service';
import { InspectionService } from 'src/app/sharedModule/services/inspection.service';
import { NgxToasterService } from 'src/app/sharedModule/services/ngx-toaster.service';
import { SessionService } from 'src/app/sharedModule/services/session.service';
import { SharedService } from 'src/app/sharedModule/services/shared.service';
import { ToasterService } from 'src/app/sharedModule/services/toaster.service';
import { UtilsService } from 'src/app/sharedModule/services/utils.service';

@Component({
  selector: 'app-village-status',
  templateUrl: './village-status.component.html',
  styleUrls: ['./village-status.component.css']
})
export class VillageStatusComponent implements OnInit {

  bsDatepickerConfig: Partial<BsDatepickerConfig> = this.utils.getbsdatepicker();
  levelStatus = 0;
  dataAvailable = false;
  dataNotAvailable = false;
  maxDate!: Date;
  divisionList: any[] = [];
  mandalList: any[] = [];
  villageList: any[] = [];
  villageLevelDetails: any = [];
  pacsList: any[] = [];
  inspectiondate:any;
  inspectionDetailsList = {
    allotmentProceedings: '',
    SurveyNo: '',
    extent: '',
    east: '',
    west: '',
    south: '',
    north: '',
  };
  siteInspectionReq: mpfcInspectionModel = {
    districtId: '',
    divisionId: '',
    mandalId: '',
    pacsId: '',
    villageId: '',
    leaseAgreementRegistered: '',
    leaseAgreementPhoto: '',
    inspectionDate: '',
    capacityOfGoDown: '',
    estimatedLandValue: '',
    siteInspectionPhotoUpload: '',
    isQuestionsSubmitted: '',
    dllicApproval: '',
    dllicRemarks: '',
    siteReadyForConstruction: '',
    nregaTakenWork: '',
    siteInspectionReportUpload: '',
    uniqueId: '',
    nregaWorks: '',
    nregaOthersRemarks: '',
    insertedBy: '',
    updatedBy: '',
    source: 'web',
    questionList: [],
  };
  positionTakenDate:any;
  possessionHandOverPopUp=false;
  UploadHandOverPopUp=false;

  handovercert={
    handovercertificateupload:'',
    positionTakenDate:'',
    villagecode:''
  }

  landPossessionStatement = {
    divisionCode:'',
    districtId: '',
    districtName: '',
    mandalName: '',   
    acres: '',
    cents: '',
    phase:'',
    villageName: '',  
         surveyNo: '',     
    pacsName: '',
    // signatureUrl: '',
    rbkName:'',
    estimatedlandvalue:'',
		  godowncapacity:'',
      measurements:'',
    aera:'',
    Shutters:'',
    MSDoors:'',
    agreementNo:'',
    inspectiondate:'',
    // inspectionplace:'',
    handOverByName:'',
    handOverByDesig:'',
    takenOverByDesig:'',
    takenOverByName:'',
  };

  LandAllocateData = {
     
    rbkId: '',
    villageId: '',
    mandalId: '',
    districtId: '',
    districtName: '',
    pacsCode: '',
    updatedBy: '',
    surveyNo: '',
    phase:'',
    measurements:'',
    aera:'',
    Shutters:'',
    MSDoors:'',
    agreementNo:'',
    inspectiondate:'',
    inspectionplace:'',
    handOverByName:'',
    handOverByDesig:'',
    takenOverByDesig:'',
    takenOverByName:'',
  };

  questionsListReq: questionsListModel[] = [];

  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private ngxToaster: NgxToasterService,
    private router: Router,
    private utils: UtilsService,
    private session: SessionService,
    private console: ConsoleService,
    private dllicAPI: InspectionService,
    private sharedAPI: SharedService,
    private sanitizer: DomSanitizer,
    private inspectionAPI: MpfcLandInspectionService
  ) {
    this.maxDate = this.session.getTodayDate();
  }

  ngOnInit(): void {
    this.positionTakenDate =new Date();
    this.siteInspectionReq.districtId = this.session.districtId;
    this.siteInspectionReq.insertedBy = this.session.uniqueId;
    this.siteInspectionReq.updatedBy = this.session.uniqueId;
    this.loadDivisionList();
    //this.loadPossessionTaken();
  }

  async loadDivisionList(): Promise<void> {
    try {
      this.siteInspectionReq.divisionId = '';
      this.siteInspectionReq.mandalId = '';
      this.siteInspectionReq.pacsId = '';
      this.siteInspectionReq.villageId = '';
      this.divisionList = [];
      this.mandalList = [];
      this.pacsList = [];
      this.villageList = [];
      const req = {
        districtId: this.siteInspectionReq.districtId,
      };
      this.spinner.show();
      const response = await this.sharedAPI.divisionList(req);
      this.spinner.hide();
      if (response.success) {
        this.divisionList = response.result;
      } else {
        this.villageLevelDetails=[];
        this.toast.info(response.message);
      }
    } catch (error) {
      this.villageLevelDetails=[];
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async loadDivisionChange(): Promise<void> {
    try {
      this.dataNotAvailable = false;
      this.dataAvailable = false;
      this.clearInputs();
      this.siteInspectionReq.mandalId = '';
      this.siteInspectionReq.pacsId = '';
      this.siteInspectionReq.villageId = '';
      this.mandalList = [];
      this.pacsList = [];
      this.villageList = [];
      if (this.utils.isEmpty(this.siteInspectionReq.divisionId)) {
        this.villageLevelDetails=[];
        return;
      }
      const req = {
        districtId: this.session.districtId,
        divisionId: this.siteInspectionReq.divisionId,
      };
      this.spinner.show();
      const response = await this.sharedAPI.mandalList(req);
      this.spinner.hide();
      if (response.success) {
        this.mandalList = response.result;
      } else {
        this.villageLevelDetails=[];
        this.toast.info(response.message);
      }
    } catch (error) {
      this.villageLevelDetails=[];
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async onMandalChange(): Promise<void> {
    try {
      this.dataNotAvailable = false;
      this.dataAvailable = false;
      this.clearInputs();
      this.siteInspectionReq.pacsId = '';
      this.siteInspectionReq.villageId = '';
      this.pacsList = [];
      this.villageList = [];
      if (
        this.utils.isEmpty(this.siteInspectionReq.divisionId) ||
        this.utils.isEmpty(this.siteInspectionReq.mandalId)
      ) {
        this.villageLevelDetails=[];
        return;
      }
      const req = {
        districtId: this.session.districtId,
        divisionId: this.siteInspectionReq.divisionId,
        mandalId: this.siteInspectionReq.mandalId,
      };
      this.spinner.show();
      const response = await this.sharedAPI.pacsList(req);
      this.spinner.hide();
      if (response.success) {
        this.pacsList = response.result;
      } else {
        this.villageLevelDetails=[];
        this.toast.info(response.message);
      }
    } catch (error) {
      this.villageLevelDetails=[];
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async onPACChange(): Promise<void> {
    try {
      this.dataNotAvailable = false;
      this.dataAvailable = false;
      this.clearInputs();
      this.villageList = [];
      this.siteInspectionReq.villageId = '';
      if (
        this.utils.isEmpty(this.siteInspectionReq.divisionId) ||
        this.utils.isEmpty(this.siteInspectionReq.mandalId) ||
        this.utils.isEmpty(this.siteInspectionReq.pacsId)
      ) {
        this.villageLevelDetails=[];
        return;
      }
      const req = {
        districtId: this.session.districtId,
        divisionId: this.siteInspectionReq.divisionId,
        mandalId: this.siteInspectionReq.mandalId,
        pacId: this.siteInspectionReq.pacsId,
      };
      this.spinner.show();
      const response = await this.sharedAPI.villageList(req);
      this.spinner.hide();
      if (response.success) {
        this.villageList = response.result;
      } else {
        this.villageLevelDetails=[];
        this.toast.info(response.message);
      }
    } catch (error) {
      this.villageLevelDetails=[];
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  clearInputs(): void {
    this.siteInspectionReq = {
      districtId: this.siteInspectionReq.districtId,
      divisionId: this.siteInspectionReq.divisionId,
      mandalId: this.siteInspectionReq.mandalId,
      pacsId: this.siteInspectionReq.pacsId,
      villageId: this.siteInspectionReq.villageId,
      leaseAgreementRegistered: '',
      leaseAgreementPhoto: '',
      inspectionDate: '',
      capacityOfGoDown: '',
      estimatedLandValue: '',
      siteInspectionPhotoUpload: '',
      isQuestionsSubmitted: '',
      dllicApproval: '',
      dllicRemarks: '',
      siteReadyForConstruction: '',
      nregaTakenWork: '',
      siteInspectionReportUpload: '',
      uniqueId: '',
      nregaWorks: '',
      nregaOthersRemarks: '',
      insertedBy: this.siteInspectionReq.insertedBy,
      updatedBy: this.siteInspectionReq.updatedBy,
      source: 'web',
      questionList: [],
    };
  }


  async handovercertificate(obj:any):Promise<void>{

    this.loadPossessionTaken(obj.REVENUE_VILLAGE_CODE);


  }

  async uploadcertificate(obj:any):Promise<void>{
    this.handovercert.villagecode=obj.REVENUE_VILLAGE_CODE;
    this.UploadHandOverPopUp=true;
  }


  async btnPDFDownload(): Promise<void> {
    
    try {
      this.LandAllocateData.inspectiondate=moment(this.inspectiondate, 'DD-MM-YYYY').format('YYYY/MM/DD'); 
      if (this.validate()) {
    
      this.landPossessionStatement.measurements = this.LandAllocateData.measurements;
      this.landPossessionStatement.aera = this.LandAllocateData.aera;
      this.landPossessionStatement.Shutters = this.LandAllocateData.Shutters;
      this.landPossessionStatement.MSDoors = this.LandAllocateData.MSDoors;
      this.landPossessionStatement.agreementNo = this.LandAllocateData.agreementNo;
      this.landPossessionStatement.inspectiondate = this.LandAllocateData.inspectiondate;
      this.landPossessionStatement.handOverByName = this.LandAllocateData.handOverByName;
      this.landPossessionStatement.handOverByDesig = this.LandAllocateData.handOverByDesig;
      this.landPossessionStatement.takenOverByName = this.LandAllocateData.takenOverByName;
      this.landPossessionStatement.takenOverByDesig = this.LandAllocateData.takenOverByDesig;

      this.possessionHandOverPopUp = false;
      this.spinner.show();
      debugger;
      
    
      const response = await this.dllicAPI.GodowanCerHandOver(
        this.landPossessionStatement
      );
      debugger;
      if (response.success) {
        this.utils.downloadPdfFile(response.result, 'GodownCertStatement');
        
      } else {
        this.toast.info(response.message);
      }
      this.spinner.hide();
    }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async btnsubmit():Promise<void>{
    this.handovercert.positionTakenDate=moment(this.positionTakenDate, 'DD-MM-YYYY').format('YYYY/MM/DD');
    if (
      this.handovercert.handovercertificateupload === '' ||
      this.handovercert.handovercertificateupload === null ||
      this.handovercert.handovercertificateupload === undefined
    ) {
      this.toast.warning('Please Upload Handover Certificate ');
      
    }
  
    if (
      this.handovercert.positionTakenDate === '' ||
      this.handovercert.positionTakenDate === null ||
      this.handovercert.positionTakenDate === undefined
    ) {
      this.toast.warning('Please Enter Land Aera');
       
    }   
    else{
      try {
      
        const req = {
            ptype:'4',
            pdist:'',
            pdivision:'',
            pmandal:'',
            ppacs:'',
            prbk:'',
            pvillage:this.handovercert.villagecode,
            pquestionid:this.session.userName,
            pquestionapproval:'',
            pphotoupload:'',
            premarks:this.handovercert.handovercertificateupload,
            plastinspectiondate:''
        };
        this.spinner.show();
        const response = await this.inspectionAPI.handoverfileupload(
          req
        );
       
        this.spinner.hide();
        
        if (response.success) {
          this.UploadHandOverPopUp=false;
          this.toast.success('Handover File Upload Details Succefully ...!');
           this.onVillageChange();
        } 
        else {
           
          this.toast.info(response.message);
        }
        
      } 
      catch (error) {
        
        this.spinner.hide();
        this.utils.catchResponse(error);
      } 
    }
  }

  async onVillageChange(): Promise<void> {
 
    
    try {
      
      const req = {
          ptype:'1',
          pdist:'',
          pdivision:'',
          pmandal:'',
          ppacs:'',
          prbk:'',
          pvillage:this.siteInspectionReq.villageId,
          pquestionid:'',
          pquestionapproval:'',
          pphotoupload:'',
          premarks:'',
          plastinspectiondate:''
      };
      this.spinner.show();
      const response = await this.inspectionAPI.Packsstatus(
        req
      );
     
      this.spinner.hide();
      debugger;
      this.console.log(response.result);
      if (response.success) {
        
        this.villageLevelDetails = response.result;
        for (let i = 0; i < this.villageLevelDetails.length; i++) {
         
          const singleRow = {
            S_NO: i + 1,
            PACS_NAME: this.villageLevelDetails[i].PACS_NAME,
            VILLAGE_NAME: this.villageLevelDetails[i].VILLAGE_NAME,
            RBK_NAME:this.villageLevelDetails[i].RBK_NAME,
            INSPECTION:this.villageLevelDetails[i].INSPECTION,
            INSPECTION_CODE:this.villageLevelDetails[i].INSPECTION_CODE,
            FINISHING:this.villageLevelDetails[i].FINISHING,
            FINISHING_CODE:this.villageLevelDetails[i].FINISHING_CODE,
            FOUNDATION: this.villageLevelDetails[i].FOUNDATION,
            FOUNDATION_CODE: this.villageLevelDetails[i].FOUNDATION_CODE,
            STRUCTURE:this.villageLevelDetails[i].STRUCTURE,
            STRUCTURE_CODE:this.villageLevelDetails[i].STRUCTURE_CODE,
          };

           
        }
         
      } 
      else {
        this.villageLevelDetails=[];
        this.toast.info(response.message);
      }
      
    } 
    catch (error) {
      this.villageLevelDetails=[];
      this.spinner.hide();
      this.utils.catchResponse(error);
    } 
  }

  async detaillevelinspection(obj: any): Promise<void> 
  {
   
   try {
         
     this.spinner.show();
     const requestData = {
      districtId: obj.DISTRICT_CODE,
      divisionId: obj.DIVISION_CODE,
      MandalId: obj.MANDAL_CODE,
      pacsCode: obj.PACS_CODE,
      villageId: obj.REVENUE_VILLAGE_CODE,
      districtName: obj.DISTRICT_NAME,
      divisionName: obj.DIVISION_NAME,
      mandalName: obj.MANDAL_NAME,
      pacsName: obj.PACS_NAME,
      villageName: obj.VILLAGE_NAME,
    };
    const encryptedString = this.utils.encrypt(JSON.stringify(requestData));
    this.router.navigate(['/dllic/siteInspection'], {
      queryParams: { request: encryptedString },
    });
    
   } catch (error) {
     this.spinner.hide();
     this.utils.catchResponse(error);
   }
 }
 async detaillevelfoundation(obj: any): Promise<void> 
 {
  
  try {
        debugger;
    this.spinner.show();
    const requestData = {
     districtId: obj.DISTRICT_CODE,
     divisionId: obj.DIVISION_CODE,
     MandalId: obj.MANDAL_CODE,
     pacsCode: obj.PACS_CODE,
     villageId: obj.REVENUE_VILLAGE_CODE,
     districtName: obj.DISTRICT_NAME,
     divisionName: obj.DIVISION_NAME,
     mandalName: obj.MANDAL_NAME,
     pacsName: obj.PACS_NAME,
     villageName: obj.VILLAGE_NAME,
   };
   const encryptedString = this.utils.encrypt(JSON.stringify(requestData));
   this.router.navigate(['/dllic/foundationLevel'], {
     queryParams: { request: encryptedString },
   });
   
  } catch (error) {
    this.spinner.hide();
    this.utils.catchResponse(error);
  }
}

async detaillevelstructure(obj:any):Promise<void>{

  this.spinner.show();
    const requestData = {
     districtId: obj.DISTRICT_CODE,
     divisionId: obj.DIVISION_CODE,
     MandalId: obj.MANDAL_CODE,
     pacsCode: obj.PACS_CODE,
     villageId: obj.REVENUE_VILLAGE_CODE,
     districtName: obj.DISTRICT_NAME,
     divisionName: obj.DIVISION_NAME,
     mandalName: obj.MANDAL_NAME,
     pacsName: obj.PACS_NAME,
     villageName: obj.VILLAGE_NAME,
   };
   const encryptedString = this.utils.encrypt(JSON.stringify(requestData));
   this.router.navigate(['/dllic/superStructureLevel'], {
     queryParams: { request: encryptedString },
   });

}


async detaillevelfinishingstructure(obj:any):Promise<void>{
 
  this.spinner.show();
    const requestData = {
     districtId: obj.DISTRICT_CODE,
     divisionId: obj.DIVISION_CODE,
     MandalId: obj.MANDAL_CODE,
     pacsCode: obj.PACS_CODE,
     villageId: obj.REVENUE_VILLAGE_CODE,
     districtName: obj.DISTRICT_NAME,
     divisionName: obj.DIVISION_NAME,
     mandalName: obj.MANDAL_NAME,
     pacsName: obj.PACS_NAME,
     villageName: obj.VILLAGE_NAME,
   };
   const encryptedString = this.utils.encrypt(JSON.stringify(requestData));
   this.router.navigate(['/dllic/finishingLevel'], {
     queryParams: { request: encryptedString },
   });

}



async loadPossessionTaken(villagecode:any): Promise<void> {
  try {
    const req = {
      ptype:'3',
      pdist:'',
      pdivision:'',
      pmandal:'',
      ppacs:'',
      prbk:'',
      pvillage:villagecode,
      pquestionid:'',
      pquestionapproval:'',
      pphotoupload:'',
      premarks:'',
      plastinspectiondate:''
  };
  this.spinner.show();
  const response = await this.inspectionAPI.Packsstatus(
    req
  );
    debugger;
    this.spinner.hide();
    if (response.success) {
       
      
      this.landPossessionStatement.districtName =
        response.result[0].DISTRICT_NAME;
      this.landPossessionStatement.districtId =
        this.LandAllocateData.districtId;
      //this.landPossessionStatement.divisionName = response.result[0].DIVISION;
      this.landPossessionStatement.mandalName =
        response.result[0].MANDAL_NAME;
      this.landPossessionStatement.villageName =
        response.result[0].VILLAGE_NAME;
       
      this.landPossessionStatement.acres =
        response.result[0].AREA.toString();
      this.landPossessionStatement.cents =
        response.result[0].AREA.toString().split('.')[1] ?? '0';
      this.landPossessionStatement.surveyNo =
        response.result[0].SURVEY_NUMBER;
        this.landPossessionStatement.pacsName = response.result[0].PACS_NAME;
        this.landPossessionStatement.rbkName = response.result[0].RBK_NAME;
        this.landPossessionStatement.estimatedlandvalue = response.result[0].ESTIMATED_LAND_VALUE.toString();
        this.landPossessionStatement.godowncapacity = response.result[0].GODOWN_CAPACITY.toString();
        this.landPossessionStatement.phase = response.result[0].PHASE;
        this.landPossessionStatement.divisionCode =
        response.result[0].DIVISION_CODE.toString();

        this.possessionHandOverPopUp=true;
    } else {
      this.toast.info(response.message);
    }
  } catch (error) {
    this.spinner.hide();
    this.utils.catchResponse(error);
  }
}

validate(): boolean {

  if (
    this.LandAllocateData.measurements === '' ||
    this.LandAllocateData.measurements === null ||
    this.LandAllocateData.measurements === undefined
  ) {
    this.toast.warning('Please Enter Measurements ');
    return false;
  }

  if (
    this.LandAllocateData.aera === '' ||
    this.LandAllocateData.aera === null ||
    this.LandAllocateData.aera === undefined
  ) {
    this.toast.warning('Please Enter Land Aera');
    return false;
  }     

  if (
    this.LandAllocateData.Shutters === '' ||
    this.LandAllocateData.Shutters === null ||
    this.LandAllocateData.Shutters === undefined
  ) {
    this.toast.warning('Please Enter Shutters');
    return false;
  }

  if (
    this.LandAllocateData.MSDoors === '' ||
    this.LandAllocateData.MSDoors === null ||
    this.LandAllocateData.MSDoors === undefined
  ) {
    this.toast.warning('Please Enter M.S Doors');
    return false;
  }
  if (
    this.LandAllocateData.agreementNo === '' ||
    this.LandAllocateData.agreementNo === null ||
    this.LandAllocateData.agreementNo === undefined
  ) {
    this.toast.warning('Please Enter Agreement No');
    return false;
  }
  if (
    this.LandAllocateData.inspectiondate === '' ||
    this.LandAllocateData.inspectiondate === null ||
    this.LandAllocateData.inspectiondate === undefined
  ) {
    this.toast.warning('Please Select Date');
    return false;
  }
  if (
    this.LandAllocateData.handOverByName === '' ||
    this.LandAllocateData.handOverByName === null ||
    this.LandAllocateData.handOverByName === undefined
  ) {
    this.toast.warning('Please Enter Possession Handover By Name');
    return false;
  }
  if (
    this.LandAllocateData.handOverByDesig === '' ||
    this.LandAllocateData.handOverByDesig === null ||
    this.LandAllocateData.handOverByDesig === undefined
  ) {
    this.toast.warning('Please Enter Possession Handover By Designation');
    return false;
  }
  if (
    this.LandAllocateData.takenOverByName === '' ||
    this.LandAllocateData.takenOverByName === null ||
    this.LandAllocateData.takenOverByName === undefined
  ) {
    this.toast.warning('Please Enter By Name');
    return false;
  }
  if (
    this.LandAllocateData.takenOverByDesig === '' ||
    this.LandAllocateData.takenOverByDesig === null ||
    this.LandAllocateData.takenOverByDesig === undefined
  ) {
    this.toast.warning('Please Enter By Designation');
    return false;
  }
  return true;
}

async onAllotmentOrderChange(event: any): Promise<void> {
  try {
    if (event.target.files.length > 0) {
      const response: any = await this.utils.fileUploadEncodedString(
        event,
        this.utils.fileSize.oneMB
      );
      if (response) {
        let file = (
          this.sanitizer.bypassSecurityTrustResourceUrl(response) as any
        ).changingThisBreaksApplicationSecurity;
        file = file.replace('data:application/pdf;base64,', '');
         
        this.handovercert.handovercertificateupload = file;
        this.console.log(this.handovercert.handovercertificateupload);
        debugger;
      } else {
        this.ngxToaster.warning('file is Empty !!!, Please try again.');
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

async btnPdfView(path: string): Promise<void> {
  try {
    debugger;
    await this.utils.viewJPVPDFcop(path);
  } catch (error) {
    this.spinner.hide();
    this.utils.catchResponse(error);
  }
}


}
