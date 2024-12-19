import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { NgxSpinnerService } from 'ngx-spinner';
import { JcService } from 'src/app/jcModule/services/jc.service';
import { NgxToasterService } from 'src/app/sharedModule/services/ngx-toaster.service';
import { SessionService } from 'src/app/sharedModule/services/session.service';
import { ToasterService } from 'src/app/sharedModule/services/toaster.service';
import { UtilsService } from 'src/app/sharedModule/services/utils.service';



@Component({
  selector: 'app-pacs-land-handover-phase-three',
  templateUrl: './pacs-land-handover-phase-three.component.html',
  styleUrls: ['./pacs-land-handover-phase-three.component.css']
})
export class PacsLandHandoverPhaseThreeComponent implements OnInit {

  
  bsDatepickerConfig: Partial<BsDatepickerConfig> = this.utils.getbsdatepicker();
  maxDate: Date;
  input = '';
  userrole = '';
  date: any;
  possessionHandOverPopUp = false;
  handOverDate:any;
  positionTakenDate:any;
  LandAllocateData = {
     
    rbkId: '',
    villageId: '',
    mandalId: '',
    districtId: '',
    handOverDate: '',
    positionTakenDate: '',
    landReceivedByName: '',
    landReceivedMobileNo: '',
    landReceivedByDesig: '',
    handOverByName: '',
    handOverByMobileNo: '',
    handOverByDesig: '',
    positionTakenImage: '',
    positionStatementPdf: '',
    signedByPerson: '',
    signedByPersonPdf: '',
    insertedBy: '',
    source: '',
    pacsCode: '',
    updatedBy: '',
    surveyNo: '',
    phase:'3',
  };

  landPossessionStatement = {
    divisionCode:'',
    districtId: '',
    districtName: '',
    mandalName: '',
    divisionName: '',
    possessionTakenName: '',
    acres: '',
    cents: '',
    phase:'3',
    villageName: '',
    allottedDate: '',
    northBoundary: '',
    southBoundary: '',
    westBoundary: '',
    eastBoundary: '',
    handedOverByName: '',
    handedOverByDesig: '',
    handedOverByMobileNo: '',
    surveyNo: '',
    takenOverByDesig: '',
    takenOverByMobileNo: '',
    pacsName: '',
    signatureUrl: '',
  };

  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private router: Router,
    private jcAPI: JcService,
    private utils: UtilsService,
    private session: SessionService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private ngxToaster: NgxToasterService
  ) {
    this.maxDate = this.session.getTodayDate();
    
    route.queryParams.subscribe((params) => (this.input = params['request']));
  }

  ngOnInit(): void {
    this.handOverDate =new Date();
    this.positionTakenDate =new Date();

    const decString = JSON.parse(this.utils.decrypt(this.input));
    this.LandAllocateData.districtId = decString.districtId ?? '';
    this.LandAllocateData.mandalId = decString.mandalId ?? '';
    this.LandAllocateData.rbkId = decString.rbkId ?? '';
    this.LandAllocateData.villageId = decString.villageId ?? '';
    this.LandAllocateData.pacsCode = decString.pacsCode ?? '';
    this.LandAllocateData.pacsCode = decString.pacsCode ?? '';
    this.LandAllocateData.surveyNo = decString.surveyNo ?? '';

    if (this.LandAllocateData.districtId === '') {
      this.router.navigate(['/jc/pacsLandAllotmentphase3']);
    } else if (this.LandAllocateData.mandalId === '') {
      this.router.navigate(['/jc/pacsLandAllotmentphase3']);
    } else if (this.LandAllocateData.rbkId === '') {
      this.router.navigate(['/jc/pacsLandAllotmentphase3']);
    } else if (this.LandAllocateData.villageId === '') {
      this.router.navigate(['/jc/pacsLandAllotmentphase3']);
    }

    this.loadPossessionTaken();
  }

  async loadPossessionTaken(): Promise<void> {
    try {
      const req = {
        districtId: this.LandAllocateData.districtId,
        mandalId: this.LandAllocateData.mandalId,
        rbkId: this.LandAllocateData.rbkId,
        villageId: this.LandAllocateData.villageId,
        handOverByMobileNo:this.LandAllocateData.pacsCode,
        handOverByDesig:this.LandAllocateData.surveyNo,
      };
      this.spinner.show();
      const response = await this.jcAPI.pacsPossessionTakenDetailsphase(req);
      debugger;
      this.spinner.hide();
      if (response.success) {
        this.LandAllocateData.landReceivedByName = response.result[0].NAME;
        this.LandAllocateData.landReceivedMobileNo = response.result[0].MOBILE;
        this.LandAllocateData.landReceivedByDesig =
          response.result[0].DESIGNATION;
        this.landPossessionStatement.districtName =
          response.result[0].DISTRICT_NAME;
        this.landPossessionStatement.districtId =
          this.LandAllocateData.districtId;
        this.landPossessionStatement.divisionName = response.result[0].DIVISION;
        this.landPossessionStatement.mandalName =
          response.result[0].MANDAL_NAME;
        this.landPossessionStatement.villageName =
          response.result[0].VILLAGE_NAME;
        this.landPossessionStatement.possessionTakenName =
          response.result[0].NAME;
        this.landPossessionStatement.takenOverByDesig =
          response.result[0].DESIGNATION;
        this.landPossessionStatement.takenOverByMobileNo =
          response.result[0].MOBILE;
        this.landPossessionStatement.allottedDate =
          response.result[0].ALLOTTED_DATE;
        this.landPossessionStatement.acres =
          response.result[0].AREA.toString().split('.')[0];
        this.landPossessionStatement.cents =
          response.result[0].AREA.toString().split('.')[1] ?? '0';
        this.landPossessionStatement.surveyNo =
          response.result[0].SURVEY_NUMBER;
        this.landPossessionStatement.westBoundary =
          response.result[0].WEST_BOUNDARY;
        this.landPossessionStatement.northBoundary =
          response.result[0].NORTH_BOUNDARY;
        this.landPossessionStatement.southBoundary =
          response.result[0].SOUTH_BOUNDARY;
        this.landPossessionStatement.eastBoundary =
          response.result[0].EAST_BOUNDARY;
        this.landPossessionStatement.pacsName = response.result[0].PACS_NAME;
        this.landPossessionStatement.signatureUrl =
          response.result[0].SIGNATURE_PATH;
          this.landPossessionStatement.divisionCode =
          response.result[0].DIVISION_CODE;
      } else {
        this.toast.info(response.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  btnPossessionHandOverPopUp(): void {
    this.LandAllocateData.handOverByName = '';
    this.LandAllocateData.handOverByMobileNo = '';
    this.LandAllocateData.handOverByDesig = '';
    this.possessionHandOverPopUp = true;
  }

  async btnPDFDownload(): Promise<void> {
    
    try {
      if (
        this.LandAllocateData.handOverByName === '' ||
        this.LandAllocateData.handOverByName === null ||
        this.LandAllocateData.handOverByName === undefined
      ) {
        this.toast.warning('Please Enter Possession Handover By Name ');
        return;
      }

      if (
        this.LandAllocateData.handOverByMobileNo === '' ||
        this.LandAllocateData.handOverByMobileNo === null ||
        this.LandAllocateData.handOverByMobileNo === undefined
      ) {
        this.toast.warning('Please Enter Possession Handover Mobile Number');
        return;
      }

      if (
        !this.utils.mobileNumCheck(this.LandAllocateData.handOverByMobileNo)
      ) {
        this.toast.warning(
          'Please Enter Valid Possession Handover Mobile Number'
        );
        return;
      }

      if (
        this.LandAllocateData.handOverByDesig === '' ||
        this.LandAllocateData.handOverByDesig === null ||
        this.LandAllocateData.handOverByDesig === undefined
      ) {
        this.toast.warning('Please Enter Possession Handover By Designation');
        return;
      }

      this.landPossessionStatement.handedOverByName = this.LandAllocateData.handOverByName;
      this.landPossessionStatement.handedOverByDesig = this.LandAllocateData.handOverByDesig;
      this.landPossessionStatement.handedOverByMobileNo = this.LandAllocateData.handOverByMobileNo;

      this.possessionHandOverPopUp = false;
      this.spinner.show();
      debugger;
      const response = await this.jcAPI.possessionHandOverCertificate(
        this.landPossessionStatement
      );
      if (response.success) {
        this.utils.downloadPdfFile(response.result, 'PossessionStatement');
        
      } else {
        this.toast.info(response.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async btnSubmit(): Promise<void> {
    try {
      if (this.validate()) {
        this.LandAllocateData.handOverDate=moment(this.handOverDate, 'DD-MM-YYYY').format('YYYY/MM/DD');
        this.LandAllocateData.positionTakenDate=moment(this.positionTakenDate, 'DD-MM-YYYY').format('YYYY/MM/DD');
        this.LandAllocateData.insertedBy = this.session.userName;
        this.LandAllocateData.source = 'web';
        this.LandAllocateData.updatedBy = this.LandAllocateData.surveyNo;
        this.spinner.show();
        const response = await this.jcAPI.pacsLandHandOverSubphase(
          this.LandAllocateData
        );
       
        if (response.success) {
          alert(response.message);
          this.router.navigate(['/jc/pacsLandAllotmentphase3']);
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

  validate(): boolean {
    if (this.utils.isEmpty(this.LandAllocateData.rbkId)) {
      this.toast.warning('Please Select Hand Over RBK');
      return false;
    }

    if (this.utils.isEmpty(this.handOverDate)) {
      this.toast.warning('Please Select Hand Over Date');
      return false;
    }

    if (this.utils.isEmpty(this.positionTakenDate)) {
      this.toast.warning('Please Select Possession Taken Date ');
      return false;
    }

    if (this.utils.isEmpty(this.LandAllocateData.landReceivedByName)) {
      this.toast.warning('Please Enter Possession Taken By Name');
      return false;
    }

    if (this.utils.isEmpty(this.LandAllocateData.landReceivedMobileNo)) {
      this.toast.warning('Please Enter Possession Taken By Mobile Number');
      return false;
    }

    if (
      !this.utils.mobileNumCheck(this.LandAllocateData.landReceivedMobileNo)
    ) {
      this.toast.warning('Please Enter Valid Possession Taken Mobile Number');
      return false;
    }

    if (this.utils.isEmpty(this.LandAllocateData.landReceivedByDesig)) {
      this.toast.warning('Please Enter Possession Taken By Designation');
      return false;
    }

    if (this.utils.isEmpty(this.LandAllocateData.handOverByName)) {
      this.toast.warning('Please Enter Possession Handover By Name ');
      return false;
    }

    if (this.utils.isEmpty(this.LandAllocateData.handOverByMobileNo)) {
      this.toast.warning('Please Enter Possession Handover Mobile Number');
      return false;
    }

    if (!this.utils.mobileNumCheck(this.LandAllocateData.handOverByMobileNo)) {
      this.toast.warning('Please Enter Valid Possession Taken Mobile Number');
      return false;
    }

    if (this.utils.isEmpty(this.LandAllocateData.handOverByDesig)) {
      this.toast.warning('Please Enter Possession Handover By Designation');
      return false;
    }

    if (this.utils.isEmpty(this.LandAllocateData.positionStatementPdf)) {
      this.toast.warning('Attach Copy Of Possession Statement (PDF)');
      return false;
    }

    return true;
  }

  async onPositionStatementChange(event: any): Promise<void> {
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
          file = file.replace('data:application/pdf;base64,',"");
          this.LandAllocateData.positionStatementPdf = file;
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

  async onPositionTakenChange(event: any): Promise<void> {
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
          this.LandAllocateData.positionTakenImage = file;
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
