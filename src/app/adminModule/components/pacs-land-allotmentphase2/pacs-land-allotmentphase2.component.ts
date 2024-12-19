import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { JcService } from 'src/app/jcModule/services/jc.service';
import { ConsoleService } from 'src/app/sharedModule/services/console.service';
import { NgxToasterService } from 'src/app/sharedModule/services/ngx-toaster.service';
import { SessionService } from 'src/app/sharedModule/services/session.service';
import { SharedService } from 'src/app/sharedModule/services/shared.service';
import { ToasterService } from 'src/app/sharedModule/services/toaster.service';
import { UtilsService } from 'src/app/sharedModule/services/utils.service';



@Component({
  selector: 'app-pacs-land-allotmentphase2',
  templateUrl: './pacs-land-allotmentphase2.component.html',
  styleUrls: ['./pacs-land-allotmentphase2.component.css']
})
export class PacsLandAllotmentphase2Component implements OnInit {

  maxDate!: Date;
  divisionList: any[] = [];
  DistList: any[] = [];
  mandalList: any[] = [];
  rbkList: any[] = [];
  packsList: any[] = [];
  villageList: any[] = [];
  SurveypacksList: any[] = [];
  Survey_number=false;

  districtlistid:any;

  LandAllocateData = {

    surveyNoDrop:'',

    pacsCode: '',
    pacsName: '',
    rbkId: '',
    phase:'2',
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
    this.console.log(this.session);
    
    this.loaddistricts();
   this.districtlistid= this.session.districtName;

  }

  async btnPacsAllotment(): Promise<void> {
    
    try { this.LandAllocateData.userManual;window.open('', '_blank');
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
  async loaddistricts(): Promise<void> {
    try {
      const req = {
        districtId:this.session.districtId,
        mandalId:'',
        pacsId:'',
        rbkId:'',
        villageId:'',
        phase:'2',
        type:'1'
      };
      this.spinner.show();
      const response = await this.jcAPI.pacsMandalListByDistrictIdphase(req);
      if (response.success) 
      {
       
        this.DistList = response.result;
        

        
      
      } else {
        this.toast.info(response.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async loadMandals(): Promise<void> {
    try {
      const req = {
        districtId: this.LandAllocateData.districtId,
        phase:'2',
        type:'2'
      };
      this.spinner.show();
      const response = await this.jcAPI.pacsMandalListByDistrictIdphase(req);
      debugger;
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
  async districtChange(obj:any): Promise<void> {
    this.LandAllocateData.rbkId = '';
    this.LandAllocateData.villageId = '';
    this.LandAllocateData.districtId=''
    this.LandAllocateData.districtId=obj;
    this.mandalList = [];
    if (this.LandAllocateData.districtId === '') {
      return;
    }
    this.loadMandals();
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
        districtId: this.LandAllocateData.districtId,
        mandalId: this.LandAllocateData.mandalId,
        phase:'2',
        type:'3'
      };
      this.spinner.show();
      const response = await this.jcAPI.pacsMandalListByDistrictIdphase(req);
      if (response.success) {
        debugger;
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
        districtId: this.LandAllocateData.districtId,
        mandalId: this.LandAllocateData.mandalId,
        rbkId: this.LandAllocateData.rbkId,
        phase:'2',
        type:'4'
      };
      this.spinner.show();
      const response = await this.jcAPI.pacsMandalListByDistrictIdphase(req);
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
  async PACSList(): Promise<void> {
    try {
      const req = {
        districtId: this.LandAllocateData.districtId,
        mandalId: this.LandAllocateData.mandalId,
        rbkId: this.LandAllocateData.rbkId,
        phase:'2',
        type:'5'
      };
      debugger;
      this.spinner.show();
      const response = await this.jcAPI.pacsMandalListByDistrictIdphase(req);
      if (response.success) {
        debugger;
        this.packsList = response.result;
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
      //this.LandAllocateData.villageId = '';
      this.packsList = [];
      if (this.LandAllocateData.rbkId === '') {
        return;
      }
     this. PACSList();
    
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  //Survey number add 

  async onpacsChange(): Promise<void> {
    try {
      const req = {
        districtId: this.LandAllocateData.districtId,
         mandalId: this.LandAllocateData.mandalId,
        rbkId: this.LandAllocateData.pacsCode,
        //pacsCode:this.LandAllocateData.pacsCode,
        phase:'2',
        type:'6'
      };
       
      this.spinner.show();
      const response = await this.jcAPI.pacsMandalListByDistrictIdphase(req);
      if (response.success) {
       
        this.SurveypacksList = response.result;
        
      } else {
       // this.toast.info(response.message);
        alert('Proceeding To Land Allotment  ...!');
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }



  //  onpacsChange
  async onsurveyChange(): Promise<void> {
    if(this.LandAllocateData.surveyNoDrop!='')
    {
      try {
    
        const req = {
          districtId: this.LandAllocateData.districtId,
          mandalId: this.LandAllocateData.mandalId,
          rbkId: this.LandAllocateData.rbkId,
          villageId: this.LandAllocateData.villageId,
          pacsCode:this.LandAllocateData.pacsCode,
          surveyNo:this.LandAllocateData.surveyNoDrop
  
  
        };
        this.spinner.show();
        debugger;
        const response = await this.jcAPI.pacsLandAllocationStatusphase(req);
        debugger;
        if (response.success) {
          
          alert(response.message);
          const requestData = {
            districtId: this.LandAllocateData.districtId,
            mandalId: this.LandAllocateData.mandalId,
            rbkId: this.LandAllocateData.rbkId,
            villageId: this.LandAllocateData.villageId,
            pacsCode: this.LandAllocateData.pacsCode,
            surveyNo:this.LandAllocateData.surveyNoDrop
          };
          const encryptedString = this.utils.encrypt(JSON.stringify(requestData));
         // this.router.navigate(['/jc/pacsLandHandOverphase2']);
          this.router.navigate(['/jc/pacsLandHandOverphase2'], {
            queryParams: { request: encryptedString },
          });
        } else {
          const result=response.result[0];
          if (result.STATUS == '2') {
            this.toast.info(response.message);
          }
          else{
            this.toast.info(response.message);
          }
  
  
        }
        this.spinner.hide();
      } catch (error) {
        this.spinner.hide();
        this.utils.catchResponse(error);
      }
    }
    
  }
  async btnLandAllotmentSub(allotmentStatus: any): Promise<void> {
    try {
      debugger;
      if (this.validate()) {
        this.LandAllocateData.districtId = this.LandAllocateData.districtId;
        this.LandAllocateData.uniqueId = this.session.uniqueId;
        this.LandAllocateData.insertedBy = this.session.userName;
        this.LandAllocateData.source = 'web';
        this.LandAllocateData.allotmentStatus = allotmentStatus;
        this.spinner.show();
        const response = await this.jcAPI.pacsLandAllotmentSubphaseTwoins(
          this.LandAllocateData
          
        );
        debugger;
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
    debugger;
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
        this.toast.warning('Please Upload Allotment Order for Cooperation Dept');
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
        if (response) 
        {
          
          let file = (
            this.sanitizer.bypassSecurityTrustResourceUrl(response) as any
          ).changingThisBreaksApplicationSecurity;
          file = file.replace('data:application/pdf;base64,', "");
          debugger;
          this.LandAllocateData.titleDeedPhotoUpload = file;
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

