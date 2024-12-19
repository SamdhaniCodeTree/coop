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
import { JcService } from '../../services/jc.service';


@Component({
  selector: 'app-pacs-land-allotment',
  templateUrl: './pacs-land-allotment.component.html',
  styleUrls: ['./pacs-land-allotment.component.css']
})
export class PacsLandAllotmentComponent implements OnInit {
  maxDate!: Date;
  divisionList: any[] = [];
  mandalList: any[] = [];
  rbkList: any[] = [];
  villageList: any[] = [];

  LandAllocateData = {
    pacsCode: '',
    pacsName: '',
    rbkId: '',
    villageId: '',
    mandalId: '',
    publicPrivateLand: '',
    surveyNo: '',
    area: '',
    northImg: '',
    westImg: '',
    southImg: '',
    eastImg: '',
    allotmentOrderAPDDCF: '',
    insertedBy: '',
    uniqueId: '',
    source: '',
    allotmentStatus: '',
    districtId: '',
    latitude: '',
    longtitude: '',
    northBoundary: '',
    southBoundary: '',
    eastBoundary: '',
    westBoundary: '',
    entireLandImg: '',
    titleDeedPhotoUpload: '',
    distFromVillageCenter: '',
    userManual: 'https://cooperation.ap.gov.in/downloads/docs/jcModule/MPFC/landAllotment.pdf',
  };
  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private ngxToaster: NgxToasterService,
    private router: Router,
    private utils: UtilsService,
    private session: SessionService,
    private console: ConsoleService,
    private jcAPI: JcService,
    private sharedAPI: SharedService,
    private sanitizer: DomSanitizer,
    
  ) {}

  ngOnInit(): void {
    this.loadMandals();
  }

  async btnPacsAllotment(): Promise<void> {
    
    try { this.LandAllocateData.userManual;window.open('', '_blank');
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
  async loadMandals(): Promise<void> {
    try {
      const req = {
        districtId: this.session.districtId,
      };
      this.spinner.show();
      debugger;
      const response = await this.jcAPI.pacsMandalListByDistrictId(req);
      if (response.success) {
        this.mandalList = response.result;
      } else {
        this.toast.info(response.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  onMandalChange(): void {
    this.LandAllocateData.rbkId = '';
    this.LandAllocateData.villageId = '';
    this.rbkList = [];
    if (this.LandAllocateData.mandalId === '') {
      return;
    }
    this.loadRBKList();
  }

  async loadRBKList(): Promise<void> {
    try {
      const req = {
        districtId: this.session.districtId,
        mandalId: this.LandAllocateData.mandalId,
      };
      this.spinner.show();
      const response = await this.jcAPI.pacsRbkListByMandalId(req);
      if (response.success) {
        this.rbkList = response.result;
      } else {
        this.toast.info(response.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  onRbkChange(): void {
    this.LandAllocateData.villageId = '';
    this.villageList = [];
    if (this.LandAllocateData.rbkId === '') {
      return;
    }
    this.loadVillageList();
  }

  async loadVillageList(): Promise<void> {
    try {
      const req = {
        districtId: this.session.districtId,
        mandalId: this.LandAllocateData.mandalId,
        rbkId: this.LandAllocateData.rbkId,
      };
      this.spinner.show();
      const response = await this.jcAPI.pacsvillageListByRbkId(req);
      if (response.success) {
        this.villageList = response.result;
      } else {
        this.toast.info(response.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async onVillageChange(): Promise<void> {
    try {
      // tslint:disable-next-line: prefer-for-of
      debugger;
      for (let i = 0; i < this.villageList.length; i++) {
        if (
          this.villageList[i].VILLAGE_CODE ===  parseInt(this.LandAllocateData.villageId)
        ) {
          this.LandAllocateData.pacsCode = this.villageList[i].PACS_CODE;
          this.LandAllocateData.pacsName = this.villageList[i].PACS_NAME;
        }
      }
      if (this.LandAllocateData.villageId === '') {
        return;
      }
      const req = {
        districtId: this.session.districtId,
        mandalId: this.LandAllocateData.mandalId,
        rbkId: this.LandAllocateData.rbkId,
        villageId: this.LandAllocateData.villageId,
      };
      this.spinner.show();
      const response = await this.jcAPI.pacsLandAllocationStatus(req);
      if (response.success) {
        alert(response.message);
        const requestData = {
          districtId: this.session.districtId,
          mandalId: this.LandAllocateData.mandalId,
          rbkId: this.LandAllocateData.rbkId,
          villageId: this.LandAllocateData.villageId,
          pacsCode: this.LandAllocateData.pacsCode,
        };
        const encryptedString = this.utils.encrypt(JSON.stringify(requestData));
        this.router.navigate(['/jc/pacsLandHandOver'], {
          queryParams: { request: encryptedString },
        });
      } else {
        if (response.result === '2') {
          this.toast.info(response.message);
        }
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async btnLandAllotmentSub(allotmentStatus: any): Promise<void> {
    try {
      if (this.validate()) {
        this.LandAllocateData.districtId = this.session.districtId;
        this.LandAllocateData.uniqueId = this.session.uniqueId;
        this.LandAllocateData.insertedBy = this.session.userName;
        this.LandAllocateData.source = 'web';
        this.LandAllocateData.allotmentStatus = allotmentStatus;
        this.spinner.show();
        const response = await this.jcAPI.pacsLandAllotmentSub(
          this.LandAllocateData
        );
        if (response.success) {
          alert(response.message);
          window.location.reload();
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
    if (this.utils.isEmpty(this.LandAllocateData.mandalId)) {
      this.toast.warning('Please Select Mandal');
      return false;
    }

    if (this.utils.isEmpty(this.LandAllocateData.rbkId)) {
      this.toast.warning('Please Select RBK');
      return false;
    }

    if (this.utils.isEmpty(this.LandAllocateData.villageId)) {
      this.toast.warning('Please Select Village');
      return false;
    }

    if (this.utils.isEmpty(this.LandAllocateData.pacsCode)) {
      this.toast.warning('Please Select PACS');
      return false;
    }

    if (this.utils.isEmpty(this.LandAllocateData.publicPrivateLand)) {
      this.toast.warning('Please Select Public/Private Land');
      return false;
    }
    if (this.LandAllocateData.publicPrivateLand === '1') {
      if (this.utils.isEmpty(this.LandAllocateData.titleDeedPhotoUpload)) {
        this.toast.warning('Please Upload Title Deed Document');
        return false;
      }
    }

    if (this.utils.isEmpty(this.LandAllocateData.surveyNo)) {
      this.toast.warning('Please Enter survey No');
      return false;
    }

    if (this.utils.isEmpty(this.LandAllocateData.area)) {
      this.toast.warning('Please Enter Area');
      return false;
    }

    const area = +this.LandAllocateData.area;

    if (
      this.LandAllocateData.villageId === '40258' ||
      this.LandAllocateData.villageId === '40266' ||
      this.LandAllocateData.villageId === '40283' ||
      this.LandAllocateData.villageId === '40229' ||
      this.LandAllocateData.villageId === '40274' ||
      this.LandAllocateData.villageId === '40273' ||
      this.LandAllocateData.villageId === '40243' ||
      this.LandAllocateData.villageId === '40265' ||
      this.LandAllocateData.villageId === '40282'
    ) {
      if (area > 0.25) {
        this.toast.warning('Please Enter Maximum 0.25 Acre !!!');
        return false;
      }
    } else {
      if (area < 0.25) {
        this.toast.warning('Please Enter Minimum 0.25 Acre !!!');
        return false;
      }
      if (area > 1) {
        this.toast.warning('Please Enter Maximum 1 Acre !!!');
        return false;
      }
    }

    if (this.utils.isEmpty(this.LandAllocateData.latitude)) {
      this.toast.warning('Please Enter Latitude');
      return false;
    }

    if (this.utils.isEmpty(this.LandAllocateData.longtitude)) {
      this.toast.warning('Please Enter Longitude');
      return false;
    }

    if (this.utils.isEmpty(this.LandAllocateData.entireLandImg)) {
      this.toast.warning('Please Upload Image Covering Entire Land');
      return false;
    }

    if (this.utils.isEmpty(this.LandAllocateData.northBoundary)) {
      this.toast.warning('Please Enter North Boundary');
      return false;
    }

    if (this.utils.isEmpty(this.LandAllocateData.northImg)) {
      this.toast.warning('Please Upload North Boundary Image');
      return false;
    }

    if (this.utils.isEmpty(this.LandAllocateData.southBoundary)) {
      this.toast.warning('Please Enter South Boundary');
      return false;
    }

    if (this.utils.isEmpty(this.LandAllocateData.southImg)) {
      this.toast.warning('Please Upload South Boundary Image');
      return false;
    }

    if (this.utils.isEmpty(this.LandAllocateData.eastBoundary)) {
      this.toast.warning('Please Enter East Boundary');
      return false;
    }

    if (this.utils.isEmpty(this.LandAllocateData.eastImg)) {
      this.toast.warning('Please Upload East Boundary Image');
      return false;
    }

    if (this.utils.isEmpty(this.LandAllocateData.westBoundary)) {
      this.toast.warning('Please Enter West Boundary');
      return false;
    }

    if (this.utils.isEmpty(this.LandAllocateData.westImg)) {
      this.toast.warning('Please Upload West Boundary Image');
      return false;
    }

    if (this.LandAllocateData.publicPrivateLand === '0') {
      if (this.utils.isEmpty(this.LandAllocateData.allotmentOrderAPDDCF)) {
        this.toast.warning('Please Upload Allotment Order for APDDCF');
        return false;
      }
    }
    if (this.utils.isEmpty(this.LandAllocateData.distFromVillageCenter)) {
      this.toast.warning('Please Enter Distance From Village Center');
      return false;
    }
    return true;
  }
  async onNothPhotoChange(event: any): Promise<void> {
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
          this.LandAllocateData.northImg = file;
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

  async onSouthPhotoChange(event: any): Promise<void> {
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
          this.LandAllocateData.southImg = file;
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

  async onEastPhotoChange(event: any): Promise<void> {
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
          this.LandAllocateData.eastImg = file;
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

  async onWestPhotoChange(event: any): Promise<void> {
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
          this.LandAllocateData.westImg = file;
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
          debugger;
          this.LandAllocateData.allotmentOrderAPDDCF = file;
          this.console.log(this.LandAllocateData.allotmentOrderAPDDCF);
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

  async onTitleDeedPhotoChange(event: any): Promise<void> {
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
          this.LandAllocateData.titleDeedPhotoUpload = file;
          this.console.log(this.LandAllocateData.titleDeedPhotoUpload);
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

  async onEntireLandPhotoChange(event: any): Promise<void> {
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
          this.LandAllocateData.entireLandImg = file;
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
