import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  mpfcInspectionModel,
  questionsListModel,
} from 'src/app/mllicModule/models/mpfc-inspection.model';
import { SessionService } from 'src/app/sharedModule/services/session.service';
import { SharedService } from 'src/app/sharedModule/services/shared.service';
import { ToasterService } from 'src/app/sharedModule/services/toaster.service';
import { UtilsService } from 'src/app/sharedModule/services/utils.service';
import { DllicService } from '../../../services/dllic.service';

@Component({
  selector: 'app-site-inspection-update',
  templateUrl: './site-inspection-update.component.html',
  styleUrls: ['./site-inspection-update.component.css'],
})
export class SiteInspectionUpdateComponent implements OnInit {
  input = '';
  uniqueId = '';
  dllicApproval = '';
  dllicRemarks = '';
  updatedBy = '';
  submittedQuestionsList: any[] = [];

  inspectionDetailsList = {
    allotmentProceedings: '',
    SurveyNo: '',
    extent: '',
    east: '',
    west: '',
    south: '',
    north: '',
    districtName: '',
    divisionName: '',
    mandalName: '',
    pacsName: '',
    villageName: '',
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
    siteInspectionPhotoUpload: '',
    isQuestionsSubmitted: '',
    mllicApproval: '',
    mllicRemarks: '',
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
    private route: ActivatedRoute,
    private utils: UtilsService,
    private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private router: Router,
    private session: SessionService,
    private dllicAPI: DllicService,
    private sharedAPI: SharedService
  ) {
    route.queryParams.subscribe((params) => (this.input = params['request']));
  }

  ngOnInit(): void {
    const decString = JSON.parse(this.utils.decrypt(this.input));
    this.uniqueId = decString.UNIQUE_ID;
    this.updatedBy = this.session.uniqueId;
    this.inspectionDetailsList.districtName = decString.DISTRICT_NAME;
    this.inspectionDetailsList.divisionName = decString.DIVISION_NAME;
    this.inspectionDetailsList.mandalName = decString.MANDAL_NAME;
    this.inspectionDetailsList.pacsName = decString.PACS_NAME;
    this.inspectionDetailsList.villageName = decString.VILLAGE_NAME;
    this.inspectionDetailsList.allotmentProceedings = decString.ALLOTMENT_PROCEEDINGS;
    this.inspectionDetailsList.SurveyNo = decString.SURVEY_NO;
    this.inspectionDetailsList.extent = decString.EXTENT;
    this.inspectionDetailsList.south = decString.SOUTH;
    this.inspectionDetailsList.north = decString.NORTH;
    this.inspectionDetailsList.east = decString.EAST;
    this.inspectionDetailsList.west = decString.WEST;

    this.siteInspectionReq.leaseAgreementRegistered = decString.LEASE_AGREEMENT_REGISTERED;
    this.siteInspectionReq.leaseAgreementPhoto = decString.LEASE_AGREEMENT_PHOTO;
    this.siteInspectionReq.inspectionDate = decString.INSPECTION_DATE;
    this.siteInspectionReq.capacityOfGoDown = decString.CAPACITY_OF_GODOWN;
    this.siteInspectionReq.siteInspectionPhotoUpload = decString.SITE_INSPECTION_PHOTO_UPLOAD;
    this.siteInspectionReq.mllicApproval = decString.MLLIC_RECOMMENDATION;
    this.siteInspectionReq.mllicRemarks = decString.MLLIC_REMARKS;
    this.siteInspectionReq.siteReadyForConstruction = decString.IS_SITE_READY_FOR_CONS;
    this.siteInspectionReq.nregaTakenWork = decString.WORK_TO_BE_TAKEN_NREGA;
    this.siteInspectionReq.nregaWorks = decString.NREGA_WORKS;
    this.siteInspectionReq.nregaOthersRemarks = decString.NREGA_WORKS_OTHERS_REMARKS;
    this.siteInspectionReq.siteInspectionReportUpload = decString.UPLOAD_INSEPECTION_REPORT;
    this.loadSubmittedQuestions();
  }

  async loadSubmittedQuestions(): Promise<void> {
    try {
      if (this.utils.isEmpty(this.uniqueId)) {
        return;
      }
      const req = {
        uniqueId: this.uniqueId,
      };
      this.spinner.show();
      const response = await this.dllicAPI.submittedQuestionsList(req);
      this.spinner.hide();
      if (response.success) {
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < response.result.length; i++) {
          this.submittedQuestionsList.push({
            QUESTION_ID: response.result[i].QUESTION_ID,
            QUESTION_NAME: response.result[i].QUESTION_NAME,
            QUESTION_APPROVAL: response.result[i].QUESTION_APPROVAL,
            PHOTO_UPLOAD: response.result[i].PHOTO_UPLOAD,
            REMARKS: response.result[i].REMARKS,
          });
        }
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async viewPDF(path: string): Promise<void> {
    try {
      const req = {
        filePath: path,
      };
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

  async btnSubmit(): Promise<void> {
    try {
      if (this.utils.isEmpty(this.dllicApproval)) {
        this.toast.warning('Please Select Dllic Approval');
        return;
      }
      if (this.utils.isEmpty(this.dllicRemarks)) {
        this.toast.warning('Please Enter Remarks');
        return;
      }
      const req = {
        uniqueId: this.uniqueId,
        dllicApproval: this.dllicApproval,
        dllicRemarks: this.dllicRemarks,
        updatedBy: this.updatedBy,
      };
      this.spinner.show();
      const response = await this.dllicAPI.committeInspectionUpdate(req);
      this.spinner.hide();
      if (response.success) {
        alert(response.message);
        this.router.navigate(['/dllic/siteInspection']);
      } else {
        this.toast.info(response.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
}
