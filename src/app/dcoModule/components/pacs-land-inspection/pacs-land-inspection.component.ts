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
import { DcoService } from '../../services/dco.service';

@Component({
  selector: 'app-pacs-land-inspection',
  templateUrl: './pacs-land-inspection.component.html',
  styleUrls: ['./pacs-land-inspection.component.css'],
})
export class PacsLandInspectionComponent implements OnInit {
  finalReportMessage = '';
  villageDataAvailable = '';
  divisionList: any[] = [];
  mandalList: any[] = [];
  pacsList: any[] = [];
  villageList: any[] = [];
  nregaActivityList: any[] = [];
  pacLandInspectionReq = {
    mandalLevelCommitteReportUpload: '',
    committeRecommendedThelandOfGodown: '',
    nregaActivityRecommendation: '',
    nregaActivityRemarks: '',
    workAllotmentCertificate: '',
    workCompletionCertificate: '',
    nregaWorkCompleted: '',
    districtId: '',
    divisionId: '',
    mandalId: '',
    pacId: '',
    villageId: '',
    txnId: '',
    updatedBy: '',
    levelStatus: 0,
    finalSubCompleted: 0,
  };
  questionsList: any[] = [];
  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private ngxToaster: NgxToasterService,
    private router: Router,
    private utils: UtilsService,
    private session: SessionService,
    private console: ConsoleService,
    private sharedAPI: SharedService,
    private dcoAPI: DcoService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.pacLandInspectionReq.districtId = this.session.districtId;
    this.pacLandInspectionReq.updatedBy = this.session.uniqueId;
    this.loadDivisionList();
    // this.onVillageChange();
  }

  async loadDivisionList(): Promise<void> {
    try {
      const req = {
        districtId: this.pacLandInspectionReq.districtId,
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
      this.pacLandInspectionReq.mandalId = '';
      this.pacLandInspectionReq.pacId = '';
      this.pacLandInspectionReq.villageId = '';
      this.mandalList = [];
      this.pacsList = [];
      this.villageList = [];
      if (this.utils.isEmpty(this.pacLandInspectionReq.divisionId)) {
        return;
      }
      const req = {
        districtId: this.session.districtId,
        divisionId: this.pacLandInspectionReq.divisionId,
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
      this.pacLandInspectionReq.pacId = '';
      this.pacLandInspectionReq.villageId = '';
      this.pacsList = [];
      this.villageList = [];
      if (
        this.utils.isEmpty(this.pacLandInspectionReq.divisionId) ||
        this.utils.isEmpty(this.pacLandInspectionReq.mandalId)
      ) {
        return;
      }
      const req = {
        districtId: this.session.districtId,
        divisionId: this.pacLandInspectionReq.divisionId,
        mandalId: this.pacLandInspectionReq.mandalId,
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
      this.pacLandInspectionReq.villageId = '';
      this.villageList = [];
      if (
        this.utils.isEmpty(this.pacLandInspectionReq.divisionId) ||
        this.utils.isEmpty(this.pacLandInspectionReq.mandalId) ||
        this.utils.isEmpty(this.pacLandInspectionReq.pacId)
      ) {
        return;
      }
      const req = {
        districtId: this.session.districtId,
        divisionId: this.pacLandInspectionReq.divisionId,
        mandalId: this.pacLandInspectionReq.mandalId,
        pacId: this.pacLandInspectionReq.pacId,
      };
      this.spinner.show();
      const response = await this.dcoAPI.villagesListByPACId(req);
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

  async loadNregaActivityList(): Promise<void> {
    try {
      this.nregaActivityList = [];
      this.spinner.show();
      const response = await this.dcoAPI.nregaActivitiesList();
      this.spinner.hide();
      if (response.success) {
        this.nregaActivityList = response.result;
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
      this.clearInputs();
      if (
        this.utils.isEmpty(this.pacLandInspectionReq.divisionId) ||
        this.utils.isEmpty(this.pacLandInspectionReq.mandalId) ||
        this.utils.isEmpty(this.pacLandInspectionReq.pacId) ||
        this.utils.isEmpty(this.pacLandInspectionReq.villageId)
      ) {
        return;
      }
      const req = { villageId: this.pacLandInspectionReq.villageId };
      this.spinner.show();
      const response = await this.dcoAPI.landInspectionDetailsByVillageId(req);
      this.spinner.hide();
      if (response.success) {
        for (let i = 0; i < response.result.length; i++) {
          this.questionsList.push({
            QUESTION_ID: response.result[i].QUESTION_ID,
            QUESTION_NAME: response.result[i].QUESTION_NAME,
            QUES_YES_NO: response.result[i].QUES_YES_NO,
            QUES_IMAGE: response.result[i].QUES_IMAGE,
            QUES_REASON: response.result[i].QUES_REASON,
          });
        }
        this.pacLandInspectionReq.mandalLevelCommitteReportUpload =
          response.result[0].MANDAL_LEVEL_COMMIT_REPORTPATH || '';
        this.pacLandInspectionReq.committeRecommendedThelandOfGodown =
          response.result[0].COMITE_RECOMM_LAND_CONST || '';
        this.pacLandInspectionReq.nregaActivityRecommendation =
          response.result[0].NREGA_ACTIVY_RECOMM || '';
        this.pacLandInspectionReq.nregaActivityRemarks =
          response.result[0].NREGA_ACTIVITY_REMARKS || '';
        this.pacLandInspectionReq.workAllotmentCertificate =
          response.result[0].WORK_ALLOT_CERTIFI_IN_NREGA || '';
        this.pacLandInspectionReq.workCompletionCertificate =
          response.result[0].WORK_COMPLETION_CERTIF || '';
        this.pacLandInspectionReq.nregaWorkCompleted =
          response.result[0].NREGA_WORKS_COMPLETED || '';
        this.pacLandInspectionReq.txnId = response.result[0].TXN_ID;
        this.pacLandInspectionReq.levelStatus =
          +response.result[0].LEVEL_STATUS;
        this.pacLandInspectionReq.finalSubCompleted =
          +response.result[0].IS_FINAL_SUBMISSION_COMP;
        this.villageDataAvailable = '';
        this.console.log(this.questionsList);
        this.console.log(this.pacLandInspectionReq);
        if (this.pacLandInspectionReq.levelStatus === 2) {
          this.loadNregaActivityList();
        }

        if (this.pacLandInspectionReq.finalSubCompleted === 1) {
          if (this.pacLandInspectionReq.levelStatus === 3) {
            this.finalReportMessage =
              'Mandal Level Committe Not Recommended Land For Godown Construction';
          } else if (this.pacLandInspectionReq.levelStatus === 5) {
            if (this.pacLandInspectionReq.nregaWorkCompleted === '0') {
              this.finalReportMessage =
                'Land inspection is completed and land is not ready for construction';
            } else if (this.pacLandInspectionReq.nregaWorkCompleted === '1') {
              this.finalReportMessage =
                'Land inspection is completed and land is ready for construction';
            }
          } else {
            this.finalReportMessage = 'Land inspection is completed';
          }
        }
      } else {
        this.villageDataAvailable = response.message;
        this.toast.warning(response.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  clearInputs(): void {
    this.questionsList = [];
    this.pacLandInspectionReq.mandalLevelCommitteReportUpload = '';
    this.pacLandInspectionReq.committeRecommendedThelandOfGodown = '';
    this.pacLandInspectionReq.nregaActivityRecommendation = '';
    this.pacLandInspectionReq.nregaActivityRemarks = '';
    this.pacLandInspectionReq.workAllotmentCertificate = '';
    this.pacLandInspectionReq.workCompletionCertificate = '';
    this.pacLandInspectionReq.nregaWorkCompleted = '';
    this.pacLandInspectionReq.txnId = '';
    this.pacLandInspectionReq.levelStatus = 0;
    this.pacLandInspectionReq.finalSubCompleted = 0;
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
      if (this.validate()) {
        this.spinner.show();
        let response: any = '';
        if (this.pacLandInspectionReq.levelStatus === 1) {
          response = await this.dcoAPI.mandalReportUpdation(
            this.pacLandInspectionReq
          );
        } else if (this.pacLandInspectionReq.levelStatus === 2) {
          response = await this.dcoAPI.nregaRecommendationUpdation(
            this.pacLandInspectionReq
          );
        } else if (this.pacLandInspectionReq.levelStatus === 3) {
          response = await this.dcoAPI.workAllotmentCompletionUpdation(
            this.pacLandInspectionReq
          );
        } else if (this.pacLandInspectionReq.levelStatus === 4) {
          response = await this.dcoAPI.landReadyForConstructionUpdation(
            this.pacLandInspectionReq
          );
        } else {
          this.toast.warning('Invalid submission');
          return;
        }
        this.spinner.hide();
        if (response.success) {
          this.ngxToaster.success(response.message);
          this.onVillageChange();
        } else {
          this.toast.info(response.message);
        }
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  validate(): boolean {
    if (this.pacLandInspectionReq.levelStatus === 1) {
      if (
        this.utils.isEmpty(
          this.pacLandInspectionReq.mandalLevelCommitteReportUpload
        )
      ) {
        this.toast.warning('Please Select Mandal Committe Inspection Report');
        return false;
      }
    }

    if (this.pacLandInspectionReq.levelStatus === 2) {
      if (
        this.utils.isEmpty(
          this.pacLandInspectionReq.committeRecommendedThelandOfGodown
        )
      ) {
        this.toast.warning('Please Select Mandal Committe Recommendation');
        return false;
      }

      if (
        this.pacLandInspectionReq.committeRecommendedThelandOfGodown === '1'
      ) {
        if (
          this.utils.isEmpty(
            this.pacLandInspectionReq.nregaActivityRecommendation
          )
        ) {
          this.toast.warning(
            'Please Select Mandal Committe NREGA Activity Recommendation'
          );
          return false;
        }
        if (
          this.pacLandInspectionReq.nregaActivityRecommendation === 'NREGA004'
        ) {
          if (
            this.utils.isEmpty(this.pacLandInspectionReq.nregaActivityRemarks)
          ) {
            this.toast.warning(
              'Please Enter Remarks For Mandal Committe NREGA Activity Recommendation'
            );
            return false;
          }
        }
      }
    }

    if (this.pacLandInspectionReq.levelStatus === 3) {
      if (
        this.utils.isEmpty(this.pacLandInspectionReq.workAllotmentCertificate)
      ) {
        this.toast.warning('Please Upload Work Allotment Certificate');
        return false;
      }
      if (
        this.utils.isEmpty(this.pacLandInspectionReq.workCompletionCertificate)
      ) {
        this.toast.warning('Please Upload Work Completion Certificate');
        return false;
      }
    }

    if (this.pacLandInspectionReq.levelStatus === 4) {
      if (this.utils.isEmpty(this.pacLandInspectionReq.nregaWorkCompleted)) {
        this.toast.warning('Please Select NREGA Land Ready For Construction');
        return false;
      }
    }

    return true;
  }

  async onMandalCommitteReportChange(event: any): Promise<void> {
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
          file = file.replace('data:image/jpeg;base64,', '');
          this.pacLandInspectionReq.mandalLevelCommitteReportUpload = file;
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

  async onWorkAllotmentCertChange(event: any): Promise<void> {
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
          file = file.replace('data:image/jpeg;base64,', '');
          this.pacLandInspectionReq.workAllotmentCertificate = file;
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

  async onWorkCompletionCertChange(event: any): Promise<void> {
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
          file = file.replace('data:image/jpeg;base64,', '');
          this.pacLandInspectionReq.workCompletionCertificate = file;
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
