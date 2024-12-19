import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
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
import * as moment from 'moment';

@Component({
  selector: 'app-site-inspection',
  templateUrl: './site-inspection.component.html',
  styleUrls: ['./site-inspection.component.css'],
})
export class SiteInspectionComponent implements OnInit {
  levelStatus = 0;
  input = '';
  divisionName = '';
  districtName = '';
  mandalName = '';
  pacsName = '';
  villageName = '';
  dataAvailable = false;
  dataNotAvailable = false;
  maxDate!: Date;
  toDate: any;
  inspectionDate: any;
  divisionList: any[] = [];
  mandalList: any[] = [];
  villageList: any[] = [];
  villageLevelDetails: any = [];
  pacsList: any[] = [];
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

  questionsListReq: questionsListModel[] = [];

  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private ngxToaster: NgxToasterService,
    private router: Router,
    private utils: UtilsService,
    private session: SessionService,
    private console: ConsoleService,
    private route: ActivatedRoute,
    private dllicAPI: InspectionService,
    private sharedAPI: SharedService,
    private sanitizer: DomSanitizer,
    private inspectionAPI: MpfcLandInspectionService
  ) {
    this.maxDate = this.session.getTodayDate();
    route.queryParams.subscribe((params) => (this.input = params['request']));
  }

  ngOnInit(): void {

    this.toDate =new Date();// this.session.getTodayDateString();
debugger;
    this.siteInspectionReq.inspectionDate=moment(this.inspectionDate, 'DD-MM-YYYY').format('YYYY/MM/DD');
    

    this.siteInspectionReq.insertedBy = this.session.uniqueId;
    this.siteInspectionReq.updatedBy = this.session.uniqueId;
    this.siteInspectionReq.divisionId = '';
    this.siteInspectionReq.mandalId = '';
    this.siteInspectionReq.pacsId = '';
    this.siteInspectionReq.villageId = '';
    const decString = JSON.parse(this.utils.decrypt(this.input));
    this.siteInspectionReq.divisionId= decString.divisionId ?? '';
    this.siteInspectionReq.districtId = decString.districtId ?? '';
    this.siteInspectionReq.mandalId = decString.MandalId ?? '';
    this.siteInspectionReq.villageId = decString.villageId ?? '';
    this.siteInspectionReq.pacsId = decString.pacsCode ?? '';
   
    this.divisionName = decString.divisionName ?? '';
    this.districtName = decString.districtName ?? '';
    this.mandalName = decString.mandalName ?? '';
    this.pacsName = decString.pacsName ?? '';
    this.villageName = decString.villageName ?? '';
    this.spinner.hide();
    this.insepctionload();
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

  async insepctionload(): Promise<void> {
    
    try {
      this.dataAvailable = false;
      this.clearInputs();
      if (
        this.utils.isEmpty(this.siteInspectionReq.divisionId) ||
        this.utils.isEmpty(this.siteInspectionReq.mandalId) ||
        this.utils.isEmpty(this.siteInspectionReq.pacsId) ||
        this.utils.isEmpty(this.siteInspectionReq.villageId)
      ) {
        return;
      }
      const req = {
        districtId: this.session.districtId,
        divisionId: this.siteInspectionReq.divisionId,
        mandalId: this.siteInspectionReq.mandalId,
        pacsId: this.siteInspectionReq.pacsId,
        villageId: this.siteInspectionReq.villageId,
      };
      this.spinner.show();
      debugger;
      const response = await this.dllicAPI.inspectionDetailsById(req);
      
      debugger;
      this.spinner.hide();
      if (response.success) {
        this.inspectionDetailsList.allotmentProceedings =
          response.result[0].ALLOTMENT_PROCEEDINGS;
        this.inspectionDetailsList.SurveyNo = response.result[0].SURVEY_NO;
        this.inspectionDetailsList.extent = response.result[0].EXTENT;
        this.inspectionDetailsList.north = response.result[0].NORTH;
        this.inspectionDetailsList.south = response.result[0].SOUTH;
        this.inspectionDetailsList.east = response.result[0].EAST;
        this.inspectionDetailsList.west = response.result[0].WEST;

        // tslint:disable-next-line: radix
        this.levelStatus = parseInt(response.result[0].STATUS) || 0;
        this.dataAvailable = true;

        this.siteInspectionReq.uniqueId = response.result[0].UNIQUE_ID || '';
        this.siteInspectionReq.inspectionDate =
          response.result[0].INSPECTION_DATE;
        this.siteInspectionReq.capacityOfGoDown =
          response.result[0].CAPACITY_OF_GODOWN;
        this.siteInspectionReq.estimatedLandValue =
          response.result[0].ESTIMATED_LAND_VALUE;
        this.siteInspectionReq.siteInspectionPhotoUpload =
          response.result[0].SITE_INSPECTION_PHOTO_UPLOAD;

        this.siteInspectionReq.dllicApproval =
          response.result[0].DLLIC_RECOMMENDATION || '';
        this.siteInspectionReq.dllicRemarks =
          response.result[0].DLLIC_REMARKS || '';
        this.siteInspectionReq.siteReadyForConstruction =
          response.result[0].IS_SITE_READY_FOR_CONS || '';
        this.siteInspectionReq.nregaTakenWork =
          response.result[0].WORK_TO_BE_TAKEN_NREGA || '';
        this.siteInspectionReq.nregaWorks =
          response.result[0].NREGA_WORKS || '';
        this.siteInspectionReq.nregaOthersRemarks =
          response.result[0].NREGA_WORKS_OTHERS_REMARKS || '';

        this.siteInspectionReq.leaseAgreementRegistered =
          response.result[0].LEASE_AGREEMENT_REGISTERED || '';
        this.siteInspectionReq.leaseAgreementPhoto =
          response.result[0].LEASE_AGREEMENT_PHOTO;
        this.siteInspectionReq.siteInspectionReportUpload =
          response.result[0].UPLOAD_INSEPECTION_REPORT || '';

        if (this.levelStatus === 1) {
          this.loadQuestionsList();
        } else if (this.levelStatus > 1) {
          this.questionsListReq = [];
          // tslint:disable-next-line: prefer-for-of
          for (let i = 0; i < response.result.length; i++) {
            this.questionsListReq.push({
              questionApproval: response.result[i].QUESTIONS_APPROVAL,
              questionId: response.result[i].QUESTION_ID,
              photoUpload: response.result[i].PHOTO_UPLOAD,
              questionName: response.result[i].QUESTION_NAME,
              remarks: response.result[i].REMARKS,
            });
          }
        }
      } else {
        this.dataNotAvailable = true;
        this.toast.info(response.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async loadQuestionsList(): Promise<void> {
    try {
      this.questionsListReq = [];
      this.spinner.show();
      const response = await this.dllicAPI.questionsList();
      this.spinner.hide();
      if (response.success) {
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < response.result.length; i++) {
          this.questionsListReq.push({
            questionApproval: '',
            questionId: response.result[i].QUESTION_ID,
            photoUpload: '',
            questionName: response.result[i].QUESTION_NAME,
            remarks: '',
          });
        }
      } else {
        this.toast.info(response.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async btnInspectionSub(): Promise<void> {
    try {
      if (this.utils.isEmpty(this.inspectionDate)) {
        this.toast.warning('select inspection date');
        return;
      }

      if (this.utils.isEmpty(this.siteInspectionReq.capacityOfGoDown)) {
        this.toast.warning('enter Constructed godown capacity');
        return;
      }

      if (!this.utils.isNumber(this.siteInspectionReq.capacityOfGoDown)) {
        this.toast.warning('enter valid Constructed godown capacity');
        return;
      }

      if (this.utils.isEmpty(this.siteInspectionReq.estimatedLandValue)) {
        this.toast.warning('enter estimated land value');
        return;
      }

      if (!this.utils.isNumber(this.siteInspectionReq.estimatedLandValue)) {
        this.toast.warning('enter valid estimated land value');
        return;
      }

      if (
        this.utils.isEmpty(this.siteInspectionReq.siteInspectionPhotoUpload)
      ) {
        this.toast.warning('upload inspection site photo');
        return;
      }
      this.siteInspectionReq.inspectionDate=moment(this.inspectionDate, 'DD-MM-YYYY').format('YYYY/MM/DD');
 
      this.spinner.show();
      const response = await this.dllicAPI.inspectionDetailsSub(
        this.siteInspectionReq
      );
      this.spinner.hide();
      if (response.success) {
        this.ngxToaster.success(response.message);
        window.location.reload();
       
      } 
      else {
        this.toast.info(response.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async onAnswerChange(
    questionId: string,
    questionAnswer: string
  ): Promise<void> {
    try {
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.questionsListReq.length; i++) {
        if (this.questionsListReq[i].questionId === questionId) {
          if (questionAnswer === '1') {
            this.questionsListReq[i].remarks = '';
          } else if (questionAnswer === '0') {
            this.questionsListReq[i].photoUpload = '';
          } else {
            this.questionsListReq[i].remarks = '';
            this.questionsListReq[i].photoUpload = '';
          }
          return;
        }
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async btnQuestionSubmit(): Promise<void> {
    try {
      for (let i = 0; i < this.questionsListReq.length; i++) {
        if (this.utils.isEmpty(this.questionsListReq[i].questionApproval)) {
          const message =
            'Please select answer for question no ' + (i + 1).toString();
          this.toast.warning(message);
          return;
        }

        if (this.questionsListReq[i].questionApproval === '1') {
          if (this.utils.isEmpty(this.questionsListReq[i].photoUpload)) {
            const message =
              'Please upload photo for question no ' + (i + 1).toString();
            this.toast.warning(message);
            return;
          }
        }

        if (this.questionsListReq[i].questionApproval === '0') {
          if (this.utils.isEmpty(this.questionsListReq[i].remarks)) {
            const message =
              'Please enter reason for question no ' + (i + 1).toString();
            this.toast.warning(message);
            return;
          }
        }
      }
      this.siteInspectionReq.questionList = this.questionsListReq;
      this.siteInspectionReq.isQuestionsSubmitted = '1';

      const req = {
        districtId: this.siteInspectionReq.districtId,
        divisionId: this.siteInspectionReq.divisionId,
        mandalId: this.siteInspectionReq.mandalId,
        pacsId: this.siteInspectionReq.pacsId,
        villageId: this.siteInspectionReq.villageId,
        uniqueId: this.siteInspectionReq.uniqueId,
        isQuestionsSubmitted: this.siteInspectionReq.isQuestionsSubmitted,
        insertedBy: this.siteInspectionReq.insertedBy,
        source: this.siteInspectionReq.source,
        questionList: this.questionsListReq,
      };

      this.spinner.show();
      const response = await this.dllicAPI.questionSub(req);
      this.spinner.hide();
      if (response.success) {
        this.ngxToaster.success(response.message);
        window.location.reload();
         
      } 
      else {
        this.toast.info(response.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async btnInspectionReportSub(): Promise<void> {
    try {
      if (this.utils.isEmpty(this.siteInspectionReq.dllicApproval)) {
        this.toast.warning(
          'select recommendation of mandal level inspection committe'
        );
        return;
      }

      if (this.siteInspectionReq.dllicApproval === '0') {
        if (this.utils.isEmpty(this.siteInspectionReq.dllicRemarks)) {
          this.toast.warning('enter mandal level committe remarks');
          return;
        }
      }

      if (this.siteInspectionReq.dllicApproval === '1') {
        if (
          this.utils.isEmpty(this.siteInspectionReq.siteReadyForConstruction)
        ) {
          this.toast.warning('select site ready for construction');
          return;
        }
      }

      if (this.siteInspectionReq.siteReadyForConstruction === '1') {
        if (this.utils.isEmpty(this.siteInspectionReq.nregaTakenWork)) {
          this.toast.warning(
            'select Works to be taken up under MGNREGA for making the site ready for contruction'
          );
          return;
        }
      }

      if (this.siteInspectionReq.nregaTakenWork === '1') {
        if (this.utils.isEmpty(this.siteInspectionReq.nregaWorks)) {
          this.toast.warning('enter NREGA work');
          return;
        }
      }

      if (this.siteInspectionReq.nregaWorks === '0') {
        if (this.utils.isEmpty(this.siteInspectionReq.nregaOthersRemarks)) {
          this.toast.warning('enter NREGA work remarks');
          return;
        }
      }
      const req = {
        districtId: this.siteInspectionReq.districtId,
        divisionId: this.siteInspectionReq.divisionId,
        mandalId: this.siteInspectionReq.mandalId,
        pacsId: this.siteInspectionReq.pacsId,
        villageId: this.siteInspectionReq.villageId,
        uniqueId: this.siteInspectionReq.uniqueId,
        dllicApproval: this.siteInspectionReq.dllicApproval,
        dllicRemarks: this.siteInspectionReq.dllicRemarks,
        updatedBy: this.siteInspectionReq.updatedBy,
        siteReadyForConstruction:
          this.siteInspectionReq.siteReadyForConstruction,
        nregaTakenWork: this.siteInspectionReq.nregaTakenWork,
        nregaWorks: this.siteInspectionReq.nregaWorks,
        nregaOthersRemarks: this.siteInspectionReq.nregaOthersRemarks,
      };
      this.spinner.show();
      const response = await this.dllicAPI.dllicApprovalSub(req);
      debugger;
      this.spinner.hide();
      if (response.success) {
        this.ngxToaster.success(response.message);
        window.location.reload();

        
      } else {
        this.toast.info(response.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async btnLeaseDocumentsSub(): Promise<void> {
    try {
      if (this.utils.isEmpty(this.siteInspectionReq.leaseAgreementRegistered)) {
        this.toast.warning('select lease agreement registration status');
        return;
      }

      if (this.siteInspectionReq.leaseAgreementRegistered === '1') {
        if (this.utils.isEmpty(this.siteInspectionReq.leaseAgreementPhoto)) {
          this.toast.warning('upload lease agreement registration document');
          return;
        }
      }

      if (
        this.utils.isEmpty(this.siteInspectionReq.siteInspectionReportUpload)
      ) {
        this.toast.warning('upload inspection site report');
        return;
      }
      const req = {
        districtId: this.siteInspectionReq.districtId,
        divisionId: this.siteInspectionReq.divisionId,
        mandalId: this.siteInspectionReq.mandalId,
        pacsId: this.siteInspectionReq.pacsId,
        villageId: this.siteInspectionReq.villageId,
        uniqueId: this.siteInspectionReq.uniqueId,
        siteInspectionReportUpload:
          this.siteInspectionReq.siteInspectionReportUpload,
        leaseAgreementRegistered:
          this.siteInspectionReq.leaseAgreementRegistered,
        leaseAgreementPhoto: this.siteInspectionReq.leaseAgreementPhoto,
      };
      this.spinner.show();
      const response = await this.dllicAPI.leaseDocumentSub(req);
      this.spinner.hide();
      if (response.success) {
        this.ngxToaster.success(response.message);
        window.location.reload();
         
      } else {
        this.toast.info(response.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async onFileChange(event: any, questionId: string): Promise<void> {
    try {

      if(event.target.files[0].type === 'image/jpeg' || event.target.files[0].type === 'image/jpg')
       {
      if (event.target.files.length > 0) {
        const response: any = await this.utils.fileUploadEncodedString(
          event,
          this.utils.fileSize.hundredKB
        );
        if (response) {
          // tslint:disable-next-line: prefer-for-of
          for (let i = 0; i < this.questionsListReq.length; i++) {
            if (this.questionsListReq[i].questionId === questionId) {
              let file = (
                this.sanitizer.bypassSecurityTrustResourceUrl(response) as any
              ).changingThisBreaksApplicationSecurity;
             
              file = file.replace('data:image/jpeg;base64,', '');
              this.questionsListReq[i].photoUpload = file;
            }
          }
        } else {
          this.ngxToaster.warning('file is Empty !!!, Please try again.');
          event.target.value = '';
        }
      } else {
        this.ngxToaster.warning('file is Empty !!!, Please try again.');
        event.target.value = '';
      }
    }
    else{
      this.ngxToaster.warning('only accept jpg/jepg Image file ..!!, Please try again.');
      event.target.value = '';
    }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  async viewPDF(path: string): Promise<void> {
    try {
      const req = {
        filePath: path,
      };
      debugger;
      this.spinner.show();
      const response = await this.sharedAPI.fileDownload(req);
      this.spinner.hide();
      if (response.success) {
        this.utils.viewPDF(response.result);
      } else {
        this.toast.info(response.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async viewPhoto(path: string): Promise<void> {
    try {
      const req = {
        filePath: path,
      };
      this.spinner.show();
      const response = await this.sharedAPI.fileDownload(req);
      this.spinner.hide();
      if (response.success) {
        this.utils.viewImage(response.result);
      } else {
        this.toast.info(response.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async onLeaseAgreementChange(event: any): Promise<void> {
    try {
      if(event.target.files[0].type === 'application/pdf')
      {
 
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
          this.siteInspectionReq.leaseAgreementPhoto = file;
        } else {
          this.ngxToaster.warning('file is Empty !!!, Please try again.');
          event.target.value = '';
        }
      } else {
        this.ngxToaster.warning('file is Empty !!!, Please try again.');
        event.target.value = '';
      }
    }else{
      this.ngxToaster.warning('only accept pdf files ..!!, Please try again.');
      this.siteInspectionReq.siteInspectionPhotoUpload ='';
      event.target.value = '';
      //$("#siteInspectionPhotoUpload").val('');
    }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  async onSiteInspectionChange(event: any): Promise<void> {
    try {
    
       if(event.target.files[0].type === 'image/jpeg' || event.target.files[0].type === 'image/jpg')
       {
        
      if (event.target.files.length > 0) {
        const response: any = await this.utils.fileUploadEncodedString(
          event,
          this.utils.fileSize.hundredKB
        );
        if (response) {
          let file = (
            this.sanitizer.bypassSecurityTrustResourceUrl(response) as any
          ).changingThisBreaksApplicationSecurity;
                    file = file.replace('data:image/jpeg;base64,', '');
          
          this.siteInspectionReq.siteInspectionPhotoUpload = file;
        } else {
          this.ngxToaster.warning('file is Empty !!!, Please try again.');
          event.target.value = '';
        }
      } else {
        this.ngxToaster.warning('file is Empty !!!, Please try again.');
        event.target.value = '';
      }
    }else{
      this.ngxToaster.warning('Invalid file format, please upload jpeg files only.');
      this.siteInspectionReq.siteInspectionPhotoUpload ='';
      event.target.value = '';
      //$("#siteInspectionPhotoUpload").val('');
    }
    

    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  async onSiteInspectionReportChange(event: any): Promise<void> {
    try {

      if(event.target.files[0].type === 'application/pdf')
      {

      
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
          this.siteInspectionReq.siteInspectionReportUpload = file;
          debugger;
        } else {
          this.ngxToaster.warning('file is Empty !!!, Please try again.');
          event.target.value = '';
        }
      } else {
        this.ngxToaster.warning('file is Empty !!!, Please try again.');
        event.target.value = '';
      }
    }
    else{
      this.ngxToaster.warning('only accept pdf files ..!!, Please try again.');
      event.target.value = '';
    }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }
}
