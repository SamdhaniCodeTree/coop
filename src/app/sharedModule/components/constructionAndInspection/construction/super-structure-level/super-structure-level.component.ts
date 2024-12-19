import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { constructionModel, questionsListModel } from 'src/app/sharedModule/models/mpfc-inspection.model';
import { ConsoleService } from 'src/app/sharedModule/services/console.service';
import { InspectionService } from 'src/app/sharedModule/services/inspection.service';
import { NgxToasterService } from 'src/app/sharedModule/services/ngx-toaster.service';
import { SessionService } from 'src/app/sharedModule/services/session.service';
import { SharedService } from 'src/app/sharedModule/services/shared.service';
import { ToasterService } from 'src/app/sharedModule/services/toaster.service';
import { UtilsService } from 'src/app/sharedModule/services/utils.service';
 

@Component({
  selector: 'app-super-structure-level',
  templateUrl: './super-structure-level.component.html',
  styleUrls: ['./super-structure-level.component.css'],
})
export class SuperStructureLevelComponent implements OnInit {
  status = 0;
  statusMessage = '';
  dataAvailable = false;
  maxDate!: Date;
  divisionList: any[] = [];
  mandalList: any[] = [];
  villageList: any[] = [];
  pacsList: any[] = [];


  
  Status_question = 0;
  Status_Date:any;
  input = ''; 
  divisionName = '';
  districtName = '';
  mandalName = '';
  pacsName = '';
  villageName = '';
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
    private route: ActivatedRoute,
  ) {
    this.maxDate = this.session.getTodayDate();
    route.queryParams.subscribe((params) => (this.input = params['request']));
  }
  inspectionDate:any;
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
    this.onVillageChange();

    // this.constructionReq.districtId = this.session.districtId;
    // this.constructionReq.insertedBy = this.session.uniqueId;
   // this.loadDivisionList();
  }
  async loadDivisionList(): Promise<void> {
    try {
      this.clearInputs();
      this.constructionReq.divisionId = '';
      this.constructionReq.mandalId = '';
      this.constructionReq.pacsId = '';
      this.constructionReq.villageId = '';
      this.divisionList = [];
      this.mandalList = [];
      this.pacsList = [];
      this.villageList = [];
      const req = {
        districtId: this.constructionReq.districtId,
      };
      this.spinner.show();
      const response = await this.sharedAPI.divisionList(req);
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

  async loadDivisionChange(): Promise<void> {
    try {
      this.clearInputs();
      this.constructionReq.mandalId = '';
      this.constructionReq.pacsId = '';
      this.constructionReq.villageId = '';
      this.mandalList = [];
      this.pacsList = [];
      this.villageList = [];
      if (this.utils.isEmpty(this.constructionReq.divisionId)) {
        return;
      }
      const req = {
        districtId: this.session.districtId,
        divisionId: this.constructionReq.divisionId,
      };
      this.spinner.show();
      const response = await this.sharedAPI.mandalList(req);
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
  }

  async onMandalChange(): Promise<void> {
    try {
      this.clearInputs();
      this.constructionReq.pacsId = '';
      this.constructionReq.villageId = '';
      this.pacsList = [];
      this.villageList = [];
      if (
        this.utils.isEmpty(this.constructionReq.divisionId) ||
        this.utils.isEmpty(this.constructionReq.mandalId)
      ) {
        return;
      }
      const req = {
        districtId: this.session.districtId,
        divisionId: this.constructionReq.divisionId,
        mandalId: this.constructionReq.mandalId,
      };
      this.spinner.show();
      const response = await this.sharedAPI.pacsList(req);
      this.spinner.hide();
      if (response.success) {
        this.pacsList = response.result;
      } else {
        this.toast.info(response.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async onPACChange(): Promise<void> {
    try {
      this.clearInputs();
      this.villageList = [];
      this.constructionReq.villageId = '';
      if (
        this.utils.isEmpty(this.constructionReq.divisionId) ||
        this.utils.isEmpty(this.constructionReq.mandalId) ||
        this.utils.isEmpty(this.constructionReq.pacsId)
      ) {
        return;
      }
      const req = {
        districtId: this.session.districtId,
        divisionId: this.constructionReq.divisionId,
        mandalId: this.constructionReq.mandalId,
        pacId: this.constructionReq.pacsId,
      };
      this.spinner.show();
      const response = await this.sharedAPI.villageList(req);
      this.spinner.hide();
      if (response.success) {
        this.villageList = response.result;
      } else {
        this.toast.info(response.message);
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

  async onVillageChange(): Promise<void> {
    try {
      debugger;
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
      const response = await this.dllicAPI.superStructureDetailsById(req);
      debugger;
      this.spinner.hide();
      if (response.success) {
        this.dataAvailable = true;
        this.status = response.result[0].STATUS;
        this.constructionReq.txnId = response.result[0].UNIQUE_ID;
        this.constructionReq.godownCapacity =
          response.result[0].CAPACITY_OF_GODOWN;
          this.Status_Date = response.result[0].INSP;
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

  async loadQuestionsList(): Promise<void> {
    try {
      const req = {
        status: '2',
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
      if(new Date(this.constructionReq.inspectionDate)>= new Date(this.Status_Date)){

        this.toast.warning('Site inspection date is on' +this.Status_Date +', please select the date after site inspection date.');
        return;
      }

      // if (this.utils.isEmpty(this.constructionReq.inspectionDate)) {
      //   this.toast.warning('Please Select Inspection Date');
      //   return;
      // }
      if (this.utils.isEmpty(this.constructionReq.godownCapacity)) {
        this.toast.warning('Please Enter Godown Capacity');
        return;
      }
      if (this.utils.isEmpty(this.constructionReq.builder)) {
        this.toast.warning('Please Enter Builder');
        return;
      }

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
      this.constructionReq.questionList = this.questionsListReq;
      this.spinner.show();
      const response = await this.dllicAPI.superStructureSub(
        this.constructionReq
      );
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
      if (event.target.files.length > 0) {
        const response: any = await this.utils.fileUploadEncodedString(
          event,
          this.utils.fileSize.oneMB
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
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }
}
