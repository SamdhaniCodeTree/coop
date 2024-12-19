import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  constructionModel,
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
  selector: 'app-foundation-level',
  templateUrl: './foundation-level.component.html',
  styleUrls: ['./foundation-level.component.css'],
})
export class FoundationLevelComponent implements OnInit {
  status = 0;
  Status_question = 0;
  Status_Date:any;
  input = '';
  statusMessage = '';
  dataAvailable = false;
  divisionName = '';
  districtName = '';
  mandalName = '';
  pacsName = '';
  villageName = '';
   
  maxDate!: Date;
  minDate!: Date;
  divisionList: any[] = [];
  mandalList: any[] = [];
  villageList: any[] = [];
  pacsList: any[] = [];
  constructionReq: constructionModel = {
    districtId: '',
    divisionId: '',
    mandalId: '',
    pacsId: '',
    villageId: '',
    inspectionDate: '',
    godownCapacity: '',
    builder: '',
    questionList: [],
    insertedBy: '',
    source: 'web',
    txnId: '',
  };
  inspectionDate:any;
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
    private sanitizer: DomSanitizer
  ) {
    this.maxDate = this.session.getTodayDate();
    this.minDate=new Date('20-01-2022');
    route.queryParams.subscribe((params) => (this.input = params['request']));
  }

  ngOnInit(): void {
    this.constructionReq.districtId = this.session.districtId;
    this.constructionReq.insertedBy = this.session.uniqueId;
    const decString = JSON.parse(this.utils.decrypt(this.input));
    this.constructionReq.divisionId= decString.divisionId ?? '';
    this.constructionReq.districtId = decString.districtId ?? '';
    this.constructionReq.mandalId = decString.MandalId ?? '';
    this.constructionReq.villageId = decString.villageId ?? '';
    this.constructionReq.pacsId = decString.pacsCode ?? '';
    this.divisionName = decString.divisionName ?? '';
    this.districtName = decString.districtName ?? '';
    this.mandalName = decString.mandalName ?? '';
    this.pacsName = decString.pacsName ?? '';
    this.villageName = decString.villageName ?? '';
    this.foundationload();
   // this.minDate = this.Status_Date;
    
  }

   

   

   

   

  async foundationload(): Promise<void> {
    
    try {
      this.clearInputs();
      if (
        this.utils.isEmpty(this.constructionReq.divisionId) ||
        this.utils.isEmpty(this.constructionReq.mandalId) ||
        this.utils.isEmpty(this.constructionReq.pacsId) ||
        this.utils.isEmpty(this.constructionReq.villageId)
      ) {
        return;
      }
      const req = {
        districtId: this.session.districtId,
        divisionId: this.constructionReq.divisionId,
        mandalId: this.constructionReq.mandalId,
        pacsId: this.constructionReq.pacsId,
        villageId: this.constructionReq.villageId,
      };
      this.spinner.show();
      const response = await this.dllicAPI.foundationDetailsById(req);
      this.spinner.hide();
      debugger;
      if (response.success) {
        this.dataAvailable = true;
        this.status = response.result[0].STATUS;
        this.Status_question = response.result[0].STATUS_QUESTION;
        this.Status_Date = response.result[0].INSP;
        debugger;
//this.minDate=response.result[0].INSPECTION_DATE;
        if(this.Status_question===null || this.Status_question===undefined){
          this.Status_question=0;
        }
        this.constructionReq.txnId = response.result[0].UNIQUE_ID;
        this.constructionReq.godownCapacity =
          response.result[0].CAPACITY_OF_GODOWN;
        if (this.status === 0) {
          this.loadQuestionsList();
        } else if (this.status === 1) {
          // tslint:disable-next-line: prefer-for-of
          for (let i = 0; i < response.result.length; i++) {
             
            this.questionsListReq.push({
              questionId: response.result[i].QUESTION_ID,
              questionName: response.result[i].QUESTION_NAME,
              questionApproval: response.result[i].QUESTION_APPROVAL,
              photoUpload: response.result[i].PHOTO_UPLOAD,
              remarks: response.result[i].REMARKS,
            });
          }
          this.constructionReq.builder = response.result[0].BUILDER;
          this.constructionReq.inspectionDate =
            response.result[0].INSPECTION_DATE;
        } else {
          this.statusMessage = response.result[0].MSG;
        }
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  clearInputs(): void {
    this.questionsListReq = [];
    this.constructionReq.inspectionDate = '';
    this.constructionReq.godownCapacity = '';
    this.constructionReq.builder = '';
    this.statusMessage = '';
    this.dataAvailable = false;
    this.status = 0;
  }

  async loadQuestionsList(): Promise<void> {
   
    try {
      const req = {
        status: '1',
      };
      this.spinner.show();
      const response = await this.dllicAPI.constructionQuestionsList(req);
      this.spinner.hide();
      if (response.success) {
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < response.result.length; i++) {
          const question = {
            questionId: response.result[i].QUESTION_ID,
            questionName: response.result[i].QUESTION_NAME,
            questionApproval: '',
            photoUpload: '',
            remarks: '',
          };
          this.questionsListReq.push(question);
        }
      } else {
        this.toast.info(response.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async onAnswerChange(
    questionId: string,
    questionApproval: string
  ): Promise<void> {
    try {
      // tslint:disable-next-line: prefer-for-of
      debugger;
      for (let i = 0; i < this.questionsListReq.length; i++) {
        if (this.questionsListReq[i].questionId === questionId) {
          if (questionApproval === '1') {
            this.questionsListReq[i].remarks = '';
          } else if (questionApproval === '0') {
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
stringdata:any;
stringdata_compare:any;
data_compare:any;
  async btnSubmit(): Promise<void> {
    try {
      this.constructionReq.inspectionDate=moment(this.inspectionDate, 'DD-MM-YYYY').format('YYYY/MM/DD');


      
      if (
        this.constructionReq.inspectionDate === '' ||
        this.constructionReq.inspectionDate === null ||
        this.constructionReq.inspectionDate === undefined || this.constructionReq.inspectionDate === 'Invalid date'
      ) {
        this.toast.warning('Please Select Inspection Date');
        return;
      }
      debugger;
      if(new Date(this.constructionReq.inspectionDate)>= new Date(this.Status_Date)){

        this.toast.warning('Site inspection date is on' +this.Status_Date +', please select the date after site inspection date.');
        return;
      }
       
      
            if (this.utils.isEmpty(this.constructionReq.godownCapacity)) {
        this.toast.warning('Please Enter Godown Capacity');
        return;
      }
      if (this.utils.isEmpty(this.constructionReq.builder)) {
        this.toast.warning('Please Enter Builder');
        return;
      }
      debugger;

      for (let i = 0; i < this.questionsListReq.length; i++) {
        if (this.utils.isEmpty(this.questionsListReq[i].questionApproval)) {
          const message =
            'Please select answer for question no ' + (i + 1).toString();
          this.toast.warning(message);
          return;
        }
debugger;
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
      this.constructionReq.questionList = this.questionsListReq;
      this.spinner.show();
      const response = await this.dllicAPI.foundationSub(this.constructionReq);
      this.spinner.hide();
      if (response.success) {
        alert(response.message);
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
          debugger;
          for (let i = 0; i < this.questionsListReq.length; i++) {
            if (this.questionsListReq[i].questionId === questionId) {
              let file = (
                this.sanitizer.bypassSecurityTrustResourceUrl(response) as any
              ).changingThisBreaksApplicationSecurity;
              file = file.replace('data:image/jpeg;base64,', '');
              this.questionsListReq[i].photoUpload = file;
            }
            // else{
            //   this.questionsListReq[i].photoUpload="";
            // }
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
    else {
      this.ngxToaster.warning('Invalid file format, please upload jpeg files only.');
      event.target.value = '';
      //this.questionsListReq[i].photoUpload
    }

    } catch (error) {
      this.utils.catchResponse(error);
    }
  }
}
