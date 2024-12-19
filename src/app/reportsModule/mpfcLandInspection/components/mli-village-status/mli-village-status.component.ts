import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  constructionModel,
  mpfcInspectionModel,
  questionsListModel,
} from 'src/app/sharedModule/models/mpfc-inspection.model';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { ToasterService } from 'src/app/sharedModule/services/toaster.service';
import { SessionService } from 'src/app/sharedModule/services/session.service';
import { InspectionService } from 'src/app/sharedModule/services/inspection.service';
import { UtilsService } from 'src/app/sharedModule/services/utils.service';
import { MpfcLandInspectionService } from '../../services/mpfc-land-inspection.service';

@Component({
  selector: 'app-mli-village-status',
  templateUrl: './mli-village-status.component.html',
  styleUrls: ['./mli-village-status.component.css']
})
export class MliVillageStatusComponent implements OnInit {

  // tslint:disable-next-line: no-output-on-prefix
  levelStatus = 0;
  @Output() onPacsChange = new EventEmitter<string>();
  @Input() districtId: any;
  @Input() districtName: any;
  @Input() mandalId: any;
  @Input() mandalName: any;
  mandalLevelDetails: any = [];
 villageLevelDetails: any = [];
  reportShow = false;
  dataShow = false;
  dataShowdetails = false;
  status = 0;
  statusMessage = '';
  dataAvailable = false;
  displayStyleinspection = "none";
  displayStylefoundation= "none";
  reportTotals = {
    S_NO: '-',
    PACS_NAME: 'TOTAL',
    GODOWNS_SACTIONED: 0,
    SITES_READY_FOR_CONS: 0,
    SITES_REG_NREGA_WORKS: 0,
    SITE_NOT_SUITABLE_FOR_CONS: 0,
    FOUNDATION_STAGE: 0,
    SUPER_STRUCTURE_STAGE: 0,
    FINISHING_STAGE: 0,
  };
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
  inspectionDetailsList = {
    allotmentProceedings: '',
    SurveyNo: '',
    extent: '',
    east: '',
    west: '',
    south: '',
    north: '',
  };
  excelData: any[] = [];
  questionsListReq: questionsListModel[] = [];
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;

  dtOptions: DataTables.Settings = this.utils.dataTableOptions();
  dtTrigger: Subject<any> = new Subject();
  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private session: SessionService,
    private inspectionAPI: MpfcLandInspectionService,
    private dllicAPI: InspectionService,
    private utils: UtilsService
  ) {}
  
  closePopup() {
    this.displayStyleinspection = "none";
    this.displayStylefoundation = "none";
  }
  ngOnInit(): void {
    
    this.loadReport();
  }

  async loadReport(): Promise<void> {
     
    try {
      this.reportTotals = {
        S_NO: '-',
        PACS_NAME: 'TOTAL',
        GODOWNS_SACTIONED: 0,
        SITES_READY_FOR_CONS: 0,
        SITES_REG_NREGA_WORKS: 0,
        SITE_NOT_SUITABLE_FOR_CONS: 0,
        FOUNDATION_STAGE: 0,
        SUPER_STRUCTURE_STAGE: 0,
        FINISHING_STAGE: 0,
      };
      const req = {
        districtId: this.districtId,
        mandalId: this.mandalId.MANDAL_CODE,
      };
      this.spinner.show();
      const response = await this.inspectionAPI.mpfcLandInspectionMandalReport(
        req
      );
      this.spinner.hide();
      if (response.success) {
        this.reportShow = false;
         this.dataShow = true;
         this.dataShowdetails = true;
        this.excelData = [];
        this.mandalLevelDetails = response.result;
        for (let i = 0; i < this.mandalLevelDetails.length; i++) {
          // tslint:disable-next-line: radix
          this.reportTotals.GODOWNS_SACTIONED += parseInt(
            this.mandalLevelDetails[i].GODOWNS_SACTIONED
          );
          // tslint:disable-next-line: radix
          this.reportTotals.SITES_READY_FOR_CONS += parseInt(
            this.mandalLevelDetails[i].SITES_READY_FOR_CONS
          );
          // tslint:disable-next-line: radix
          this.reportTotals.SITE_NOT_SUITABLE_FOR_CONS += parseInt(
            this.mandalLevelDetails[i].SITE_NOT_SUITABLE_FOR_CONS
          );
          // tslint:disable-next-line: radix
          this.reportTotals.SITES_REG_NREGA_WORKS += parseInt(
            this.mandalLevelDetails[i].SITES_REG_NREGA_WORKS
          );
          // tslint:disable-next-line: radix
          this.reportTotals.FOUNDATION_STAGE += parseInt(
            this.mandalLevelDetails[i].FOUNDATION_STAGE
          );
          // tslint:disable-next-line: radix
          this.reportTotals.SUPER_STRUCTURE_STAGE += parseInt(
            this.mandalLevelDetails[i].SUPER_STRUCTURE_STAGE
          );
          // tslint:disable-next-line: radix
          this.reportTotals.FINISHING_STAGE += parseInt(
            this.mandalLevelDetails[i].FINISHING_STAGE
          );
          const singleRow = {
            S_NO: i + 1,
            PACS_NAME: this.mandalLevelDetails[i].PACS_NAME,
            GODOWNS_SACTIONED: this.mandalLevelDetails[i].GODOWNS_SACTIONED,
            SITES_READY_FOR_CONS:
              this.mandalLevelDetails[i].SITES_READY_FOR_CONS,
            SITES_REG_NREGA_WORKS:
              this.mandalLevelDetails[i].SITES_REG_NREGA_WORKS,
            SITE_NOT_SUITABLE_FOR_CONS:
              this.mandalLevelDetails[i].SITE_NOT_SUITABLE_FOR_CONS,
            FOUNDATION_STAGE: this.mandalLevelDetails[i].FOUNDATION_STAGE,
            SUPER_STRUCTURE_STAGE:
              this.mandalLevelDetails[i].SUPER_STRUCTURE_STAGE,
            FINISHING_STAGE: this.mandalLevelDetails[i].FINISHING_STAGE,
          };

          this.excelData.push(singleRow);
        }
        this.excelData.push(this.reportTotals);
      } else {
        this.reportShow = false;
         this.dataShow = true;
        this.toast.info(response.message);
      }
      this.rerender();
    } catch (error) {
      this.reportShow = false;
      this.dataShow = true;
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  btnExcelDownload(): void {
    this.utils.JSONToCSVConvertor(
      this.excelData,
      'Land Inspection Mandal Level Report',
      true
    );
  }

  async btnPDF(): Promise<void> {
    try {
      const fileName = 'mandalLevelMPFCLandInspection';
      let basePDF = '';
      const req = {
        districtId: this.districtId,
        mandalId: this.mandalId,
      };
      this.spinner.show();
      const response =
        await this.inspectionAPI.mpfcLandInspectionDistrictReport(req);
      if (response.success) {
        basePDF = response.result;
        this.utils.downloadPdfFile(basePDF, fileName);
      } else {
        this.toast.info(response.message);
      }
      this.spinner.hide();
    } catch (error) {
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
  btnGetDetails(mandalId: string, mandalName: string): void {
    const requestData = {
      districtId: this.districtId,
      districtName: this.districtName,
      mandalId,
      mandalName,
    };

    const encryptedString = this.utils.encrypt(JSON.stringify(requestData));
    this.onPacsChange.emit(encryptedString);
  }
  async btnGetDetailsvillage(obj: any): Promise<void> {
    debugger;
    try {
      
      const req = {
          ptype:'1',
          pdist:'',
          pdivision:'',
          pmandal:'',
          ppacs:'',
          prbk:'',
          pvillage:obj.PACS_CODE,
          pquestionid:'',
          pquestionapproval:'',
          pphotoupload:'',
          premarks:'',
          plastinspectiondate:''
      };
      debugger;
      this.spinner.show();
      const response = await this.inspectionAPI.Packsstatus(
        req
      );
     debugger;
      this.spinner.hide();
      if (response.success) {
        this.reportShow = true;
        this.dataShow = false;
        this.dataShowdetails = true;
        this.excelData = [];
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
        this.reportShow = false;
         this.dataShow = true;
        this.toast.info(response.message);
      }
      this.rerender();
    } 
    catch (error) {
      this.reportShow = false;
      this.dataShow = true;
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
   
  }
 
   async detaillevelinspection(obj: any): Promise<void> 
   {
    
    try {
      this.reportShow = true;
      this.dataShow = false;
      this.clearInputs();
       
      const req = {
        districtId: obj.DISTRICT_CODE, 
        divisionId: obj.DIVISION_CODE, 
        mandalId:  obj.MANDAL_CODE, 
        pacsId: obj.PACS_CODE, 
        villageId: obj.REVENUE_VILLAGE_CODE
        
      };
      
      this.spinner.show();
      const response = await this.inspectionAPI.inspectionDetailsById(req);
      this.spinner.hide();
      if (response.success) {
        this.displayStyleinspection = "block";
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
        this.reportShow = true;

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
        this.dataShow = true;
        this.toast.info(response.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
  async detaillevelfoundation(obj: any): Promise<void> 
   {
    
    try {
      this.reportShow = true;
      this.dataShow = false;
      this.clearInputs();
       
      const req = {
        districtId: obj.DISTRICT_CODE, 
        divisionId: obj.DIVISION_CODE, 
        mandalId:  obj.MANDAL_CODE, 
        pacsId: obj.PACS_CODE, 
        villageId: obj.REVENUE_VILLAGE_CODE
        
      };
      
      this.spinner.show();
      const response = await this.inspectionAPI.foundationDetailsById(req);
      this.spinner.hide();
      if (response.success) {
        
        this.displayStylefoundation = "block";
        this.dataAvailable = true;
        this.status = response.result[0].STATUS;
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
      else {
        this.dataShow = true;
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
