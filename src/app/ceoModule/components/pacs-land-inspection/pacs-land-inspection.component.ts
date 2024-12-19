import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConsoleService } from 'src/app/sharedModule/services/console.service';
import { NgxToasterService } from 'src/app/sharedModule/services/ngx-toaster.service';
import { SessionService } from 'src/app/sharedModule/services/session.service';
import { SharedService } from 'src/app/sharedModule/services/shared.service';
import { ToasterService } from 'src/app/sharedModule/services/toaster.service';
import { UtilsService } from 'src/app/sharedModule/services/utils.service';
import {
  pacsLandInspectionModel,
  questionsListModel,
} from '../../models/pacs-inspection.model';
import { CeoService } from '../../services/ceo.service';

@Component({
  selector: 'app-pacs-land-inspection',
  templateUrl: './pacs-land-inspection.component.html',
  styleUrls: ['./pacs-land-inspection.component.css'],
})
export class PacsLandInspectionComponent implements OnInit {
  heading = '';
  villageList: any[] = [];
  pacsLandInspectionReq: pacsLandInspectionModel = {
    districtId: '',
    mandalId: '',
    pacId: '',
    villageId: '',
    villageName: '',
    villageInspectionStatus: 0,
    questionsList: [],
    insertedBy: '',
    source: 'web',
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
    private ceoAPI: CeoService,
    private sharedAPI: SharedService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.pacsLandInspectionReq.districtId = this.session.districtId;
    this.pacsLandInspectionReq.mandalId = this.session.mandalId;
    this.pacsLandInspectionReq.pacId = this.session.pacId;
    this.pacsLandInspectionReq.insertedBy = this.session.uniqueId;
    this.loadVillageList();
  }

  async loadVillageList(): Promise<void> {
    try {
      this.villageList = [];
      const req = {
        pacId: this.pacsLandInspectionReq.pacId,
      };
      this.spinner.show();
      const response = await this.ceoAPI.villagesListByPACId(req);
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

  async onVillageChange(): Promise<void> {
    try {
      this.pacsLandInspectionReq.villageName = '';
      this.pacsLandInspectionReq.villageInspectionStatus = 0;
      this.questionsListReq = [];
      if (this.utils.isEmpty(this.pacsLandInspectionReq.villageId)) {
        this.pacsLandInspectionReq.villageId = '';
        return;
      }

      for (let i = 0; i < this.villageList.length; i++) {
        if (
          this.villageList[i].VILLAGE_CODE.toString() ===
          this.pacsLandInspectionReq.villageId
        ) {
          this.pacsLandInspectionReq.villageName =
            this.villageList[i].VILLAGE_NAME;
          this.pacsLandInspectionReq.villageInspectionStatus =
            this.villageList[i].STATUS;
        }
      }

      if (this.pacsLandInspectionReq.villageInspectionStatus === 1) {
        this.heading = 'PAC land inspection pending at higher level for the selected village';
        this.ngxToaster.info(this.heading);
        return;
      }

      if (this.pacsLandInspectionReq.villageInspectionStatus === 2) {
        this.heading = 'PAC land inspection completed for the selected village';
        this.ngxToaster.info(this.heading);
        return;
      }

      if (this.pacsLandInspectionReq.villageInspectionStatus === 3) {
        this.heading = 'PAC land allotment & handover pending for the selected village';
        this.ngxToaster.info(this.heading);
        return;
      }

      this.spinner.show();
      const response = await this.ceoAPI.pacsLandInspectionQuestionsList();
      this.spinner.hide();
      if (response.success) {
        for (let i = 0; i < response.result.length; i++) {
          const question = {
            questionId: response.result[i].QUESTION_ID,
            questionName: response.result[i].QUESTION_NAME,
            questionAnswer: '',
            questionImage: '',
            questionReason: '',
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
    questionAnswer: string
  ): Promise<void> {
    try {
      for (let i = 0; i < this.questionsListReq.length; i++) {
        if (this.questionsListReq[i].questionId === questionId) {
          if (questionAnswer === '1') {
            this.questionsListReq[i].questionReason = '';
          } else if (questionAnswer === '0') {
            this.questionsListReq[i].questionImage = '';
          } else {
            this.questionsListReq[i].questionReason = '';
            this.questionsListReq[i].questionImage = '';
          }
          return;
        }
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async btnSubmit(): Promise<void> {
    try {
      for (let i = 0; i < this.questionsListReq.length; i++) {
        if (this.utils.isEmpty(this.questionsListReq[i].questionAnswer)) {
          const message =
            'Please select answer for question no ' + (i + 1).toString();
          this.toast.warning(message);
          return;
        }

        if (this.questionsListReq[i].questionAnswer === '1') {
          if (this.utils.isEmpty(this.questionsListReq[i].questionImage)) {
            const message =
              'Please upload photo for question no ' + (i + 1).toString();
            this.toast.warning(message);
            return;
          }
        }

        if (this.questionsListReq[i].questionAnswer === '0') {
          if (this.utils.isEmpty(this.questionsListReq[i].questionReason)) {
            const message =
              'Please enter reason for question no ' + (i + 1).toString();
            this.toast.warning(message);
            return;
          }
        }
      }
      this.pacsLandInspectionReq.questionsList = this.questionsListReq;
      this.spinner.show();
      const response = await this.ceoAPI.pacInspectionSub(
        this.pacsLandInspectionReq
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
          for (let i = 0; i < this.questionsListReq.length; i++) {
            if (this.questionsListReq[i].questionId === questionId) {
              let file = (
                this.sanitizer.bypassSecurityTrustResourceUrl(response) as any
              ).changingThisBreaksApplicationSecurity;
              file = file.replace('data:image/jpeg;base64,', '');
              this.questionsListReq[i].questionImage = file;
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
