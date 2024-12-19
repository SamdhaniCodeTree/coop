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
import { CeoService } from '../../services/ceo.service';

@Component({
  selector: 'app-site-preparation-sub',
  templateUrl: './site-preparation-sub.component.html',
  styleUrls: ['./site-preparation-sub.component.css']
})
export class SitePreparationSubComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private ngxToaster: NgxToasterService,
    private router: Router,
    private utils: UtilsService,
    private session: SessionService,
    private console: ConsoleService,
    private jcAPI: JcService,
    private sharedAPI: SharedService,
    private sanitizer: DomSanitizer,
        private ceoAPI: CeoService
    ) { }
    DistrictlistData: any[] = [];
  MandallistData: any[] = [];
    SitePreparationPopUp=false;
    SitePreparation={
      type:'2',
      BuildingType:'',
       BuildingInteriorImage:'',
       BuildingExteriorfrontImage:'',
       BuildingExteriorBackImage:'',
       BuildingRightsideImage:'',
       BuildingLeftsideImage:'',

       AvailabilityPowerSupply:'',
PowerPhaseImage:'',
PowerPhase:'',

internetDevice:'',
Bandwidthspeed:'',
InternetImage:'',

AvailabilityofFurniture :'',
Computertables:'',
ComputertablesImage:'',
chairs:'',
chairsImage:'',

Earthing_available :'',
Earthing_available_photo :'',
MCBs_other_modular_boxes_available :'',
MCBs_other_modular_boxes_available_photo :'',

Wiring_Concealing:'',

Latitude:0,
Longitude:0,
ElectrificationWorkby:0,
Districtcode:'',
Mandalcode:'',


    }
    pacsid:any;

    EditSitePreparation={
      //type:'2',
      BuildingType:'',
       BuildingInteriorImage:'',
       BuildingExteriorfrontImage:'',
       BuildingExteriorBackImage:'',
       BuildingRightsideImage:'',
       BuildingLeftsideImage:'',

       AvailabilityPowerSupply:'',
PowerPhaseImage:'',
PowerPhase:'',

internetDevice:'',
Bandwidthspeed:'',
InternetImage:'',

AvailabilityofFurniture :'',
Computertables:'',
ComputertablesImage:'',
chairs:'',
chairsImage:'',

Earthing_available :'',
Earthing_available_photo :'',
MCBs_other_modular_boxes_available :'',
MCBs_other_modular_boxes_available_photo :'',

Wiring_Concealing:'',

Latitude:0,
Longitude:0,
ElectrificationWorkby:0,


oldBuildingInteriorImage:'',
oldBuildingExteriorfrontImage:'',
       oldBuildingExteriorBackImage:'',
       oldBuildingRightsideImage:'',
       oldBuildingLeftsideImage:'',
       oldPowerPhaseImage:'',
       oldInternetImage:'',
       oldComputertablesImage:'',
       oldMCBs_other_modular_boxes_available_photo:'',
       oldEarthing_available_photo :'',
       oldchairsImage:'',
       oldinput03:'',
       oldinput04:''


    }









    CalibrationStatus=true;
    CertificationStatus=false;
    MessageStatus=false;

  ngOnInit(): void {

this.StatusList();

  }


  async StatusList(): Promise<void> {

    try {
        //  if (this.validate()) {

      const req={
        type:"502",
        pacId:this.session.pacId
      }

        this.spinner.show();
        debugger;
        const response = await this.sharedAPI.SocietyMasterList(req);
        debugger;
        if (response.success) {
          if(response.result[0].STATUS=="1")
          {
            this.CalibrationStatus=false;
  this.CertificationStatus=true;
  this.MessageStatus=false;

          }
          if(response.result[0].STATUS=="2")
          {
            this.CalibrationStatus=false;
  this.CertificationStatus=true;
  //this.MessageStatus=true;

          }
  //         else{
  //           this.CalibrationStatus=true;
  // this.CertificationStatus=false;
  // this.MessageStatus=false;
  //         }

         // window.location.reload();
        } else {
         // this.toast.info(response.message);
        }
        this.spinner.hide();
     // }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }


  async btnPDF(): Promise<void> {debugger;
    try {

      const req = {
        pack_id:this.session.pacId
        //input2:this.year
      };
      debugger;
      const fileName = 'Calibration Details';
      let basePDF = '';
      this.spinner.show();

      const res = await this.ceoAPI.SitePrectionDetails(req);
      if (res.success) {
        basePDF = res.result;
        this.utils.downloadPdfFile(basePDF, fileName);
      } else {
        this.toast.info(res.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  CertifcateFile:any;
async onpdffileChange(event: any): Promise<void> {
  try {
    this.CertifcateFile ='';
    debugger;
    if (event.target.files.length > 0)
      {

        if (event.target.files[0].type === 'application/pdf') {


      const response: any = await this.utils.fileUploadEncodedString(
        event,
        this.utils.fileSize.oneMB
      );

      if (response)
      {

        let file = (
          this.sanitizer.bypassSecurityTrustResourceUrl(response) as any
        ).changingThisBreaksApplicationSecurity;


       // file = file.replace('data:image/jpg;base64,', '');
        file = file.replace('data:application/pdf;base64,','');
        this.CertifcateFile = file;

        debugger;
      }
      else {

        event.target.value = '';
      }
    }
    else{
      alert('Accept Only PDF files Only..');
      event.target.value = '';
    }


      }
      else {
        this.ngxToaster.warning('file is Empty !!!, Please try again.');
        event.target.value = '';
      }

    }
  catch (error) {
    this.utils.catchResponse(error);
  }
}

async Certificateupload():Promise<void>{

  try {

    if (this.utils.isEmpty(this.CertifcateFile) ) {
      this.toast.warning('please upload  signed pdf copy');
      return  ;
    }

    const req = {

      cfmsid:this.session.pacId,
      updatedby:this.CertifcateFile,

    };
    this.spinner.show();
    debugger;
    const response = await this.ceoAPI.SitepreperationDetailsupdate(req);
    if (response.success) {

      alert("Site Preparation Details File Upload Successfully ...!");
      this.CalibrationStatus=false;
  this.CertificationStatus=true;
  //this.MessageStatus=true;
       // window.location.reload();
    } else {
      alert(response.message);
    }
    this.spinner.hide();
  } catch (error) {
    this.spinner.hide();
    this.utils.catchResponse(error);
  }

}

EditDetails(){  debugger;
this.SitePreparationPopUp=true;

this.btnViewEdit();


}

async rbtnvalue(id:any): Promise<void>
 {

        try {
              if(id=='1' || id=='11')
                {
                  this.SitePreparation.BuildingInteriorImage = ''
                  this.SitePreparation.BuildingExteriorfrontImage = ''
                  this.SitePreparation.BuildingExteriorBackImage = ''
                  this.SitePreparation.BuildingRightsideImage = ''
                  this.SitePreparation.BuildingLeftsideImage = ''
                }
               else if(id=='2' || id=='22')
                  {
                    this.SitePreparation.PowerPhase='';
                    this.SitePreparation.PowerPhaseImage=''
                  }
                  else if(id=='3' || id=='33' || id=='333')
                    {
                      this.SitePreparation.Bandwidthspeed='';
                      this.SitePreparation.InternetImage = '';
                    }

                    else if(id=='4' || id=='44'  )
                      {
                        this.SitePreparation.Computertables='';
                        this.SitePreparation.ComputertablesImage = '';
                        this.SitePreparation.chairs='';
                        this.SitePreparation.chairsImage= '';

                      }
                      else if(id=='5' || id=='55'  )
                        {
                          this.SitePreparation.Earthing_available_photo = '';
                        }

                        else if(id=='6' || id=='66'  )
                          {
                            this.SitePreparation.MCBs_other_modular_boxes_available_photo = '';
                          }



               // this.toast.warning('Radiobutton value='+id);

        } catch (error) {

        }

  }

async OnlyJpegUpload(event: any,id:any): Promise<void> {
  try {

    //if(id=='1') this.DeviceDetails.DeviceImage = ''
    if(id=='2') this.SitePreparation.BuildingInteriorImage = ''
    if(id=='3') this.SitePreparation.BuildingExteriorfrontImage = ''
    if(id=='4') this.SitePreparation.BuildingExteriorBackImage = ''
    if(id=='5')  this.SitePreparation.BuildingRightsideImage = ''
    if(id=='6') this.SitePreparation.BuildingLeftsideImage = ''
    if(id=='7') this.SitePreparation.PowerPhaseImage=''
    if(id=='8')this.SitePreparation.InternetImage = '';
    if(id=='9')this.SitePreparation.ComputertablesImage = '';
    if(id=='10')this.SitePreparation.chairsImage= '';
    if(id=='11')this.SitePreparation.Earthing_available_photo= '';
    if(id=='12')this.SitePreparation.MCBs_other_modular_boxes_available_photo = '';



    if (event.target.files.length > 0) {
      if (event.target.files[0].type === 'image/jpeg') {

      const response: any = await this.utils.fileUploadEncodedString(
        event,
        this.utils.fileSize.hundredKB
      );
      if (response) {
        let file = (
          this.sanitizer.bypassSecurityTrustResourceUrl(response) as any
        ).changingThisBreaksApplicationSecurity;
        file = file.replace('data:image/jpeg;base64,', '');


       // if(id=='1') this.DeviceDetails.DeviceImage= file;
        if(id=='2')  this.SitePreparation.BuildingInteriorImage = file; //InteriorImg
        if(id=='3') this.SitePreparation.BuildingExteriorfrontImage= file;  //ExteriorFrontImg
        if(id=='4') this.SitePreparation.BuildingExteriorBackImage= file;   //ExteriorBackImg
        if(id=='5')  this.SitePreparation.BuildingRightsideImage= file;   //BuildingRightsideImage
        if(id=='6') this.SitePreparation.BuildingLeftsideImage= file;     //BuildingLeftsideImage
        if(id=='7') this.SitePreparation.PowerPhaseImage= file;     //PowerPhaseImage

        if(id=='8')this.SitePreparation.InternetImage= file; //InternetImage
        if(id=='9')this.SitePreparation.ComputertablesImage = file; //ComputertablesImage
        if(id=='10')this.SitePreparation.chairsImage = file;   //chairsImage
        if(id=='11')this.SitePreparation.Earthing_available_photo = file; //Earthing_available_photo
        if(id=='12')this.SitePreparation.MCBs_other_modular_boxes_available_photo = file;  //MCBs_other_modular_boxes_available_photo



      } else {

        event.target.value = '';
      }
    }
    else{
      alert('Accept Only Jpeg files Only..');
      event.target.value = '';
    }
    } else {
      //this.ngxToaster.warning('file is Empty !!!, Please try again.');
      event.target.value = '';
    }
  } catch (error) {
    this.utils.catchResponse(error);
  }
}

async EditOnlyJpegUpload(event: any,id:any): Promise<void> {   debugger;
  try {

    //if(id=='1') this.DeviceDetails.DeviceImage = ''
    if(id=='2') this.EditSitePreparation.BuildingInteriorImage = ''
    if(id=='3') this.EditSitePreparation.BuildingExteriorfrontImage = ''
    if(id=='4') this.EditSitePreparation.BuildingExteriorBackImage = ''
    if(id=='5') this.EditSitePreparation.BuildingRightsideImage = ''
    if(id=='6') this.EditSitePreparation.BuildingLeftsideImage = ''
    if(id=='7') this.EditSitePreparation.PowerPhaseImage=''
    if(id=='8') this.EditSitePreparation.InternetImage = '';
    if(id=='9') this.EditSitePreparation.ComputertablesImage = '';
    if(id=='10')this.EditSitePreparation.chairsImage= '';
    if(id=='11')this.EditSitePreparation.Earthing_available_photo= '';
    if(id=='12')this.EditSitePreparation.MCBs_other_modular_boxes_available_photo = '';



    if (event.target.files.length > 0) {
      if (event.target.files[0].type === 'image/jpeg') {

      const response: any = await this.utils.fileUploadEncodedString(
        event,
        this.utils.fileSize.hundredKB
      );
      if (response) {
        let file = (
          this.sanitizer.bypassSecurityTrustResourceUrl(response) as any
        ).changingThisBreaksApplicationSecurity;
        file = file.replace('data:image/jpeg;base64,', '');


       // if(id=='1') this.DeviceDetails.DeviceImage= file;
        if(id=='2') this.EditSitePreparation.BuildingInteriorImage = file; //InteriorImg
        if(id=='3') this.EditSitePreparation.BuildingExteriorfrontImage= file;  //ExteriorFrontImg
        if(id=='4') this.EditSitePreparation.BuildingExteriorBackImage= file;   //ExteriorBackImg
        if(id=='5') this.EditSitePreparation.BuildingRightsideImage= file;   //BuildingRightsideImage
        if(id=='6') this.EditSitePreparation.BuildingLeftsideImage= file;     //BuildingLeftsideImage
        if(id=='7') this.EditSitePreparation.PowerPhaseImage= file;     //PowerPhaseImage
        if(id=='8') this.EditSitePreparation.InternetImage= file; //InternetImage
        if(id=='9') this.EditSitePreparation.ComputertablesImage = file; //ComputertablesImage
        if(id=='10')this.EditSitePreparation.chairsImage = file;   //chairsImage
        if(id=='11')this.EditSitePreparation.Earthing_available_photo = file; //Earthing_available_photo
        if(id=='12')this.EditSitePreparation.MCBs_other_modular_boxes_available_photo = file;  //MCBs_other_modular_boxes_available_photo



      } else {

        event.target.value = '';
      }
    }
    else{
      alert('Accept Only Jpeg files Only..');
      event.target.value = '';
    }
    } else {
      //this.ngxToaster.warning('file is Empty !!!, Please try again.');
      event.target.value = '';
    }
  } catch (error) {
    this.utils.catchResponse(error);
  }
}

  async onInteriorImgChange(event: any): Promise<void> {
    try { this.SitePreparation.BuildingInteriorImage = '';
      debugger;
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
          file = file.replace('data:image/jpeg;base64,', '');
                  this.SitePreparation.BuildingInteriorImage = file;

          debugger;
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

  async onExteriorFrontImgChange(event: any): Promise<void> {
    try {
      debugger;
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
          file = file.replace('data:image/jpeg;base64,', '');
                  this.SitePreparation.BuildingExteriorfrontImage = file;

          debugger;
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

  async onExteriorBackImgChange(event: any): Promise<void> {
    try {
      debugger;
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
          file = file.replace('data:image/jpeg;base64,', '');
                  this.SitePreparation.BuildingExteriorBackImage = file;

          debugger;
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

  async onExteriorrightImgChange(event: any): Promise<void> {
    try {
      debugger;
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
          file = file.replace('data:image/jpeg;base64,', '');
                  this.SitePreparation.BuildingRightsideImage = file;

          debugger;
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

  async onExteriorLeftImgChange(event: any): Promise<void> {
    try {
      debugger;
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
          file = file.replace('data:image/jpeg;base64,', '');
                  this.SitePreparation.BuildingLeftsideImage = file;

          debugger;
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

  async onpowerphaseImgChange(event: any): Promise<void> {
    try {
      debugger;
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
          file = file.replace('data:image/jpeg;base64,', '');
                  this.SitePreparation.PowerPhaseImage = file;

          debugger;
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


  async ondonglrOrModemImgChange(event: any): Promise<void> {
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
          file = file.replace('data:image/jpeg;base64,', '');
                  this.SitePreparation.InternetImage = file;


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


  async onconputertableImgChange(event: any): Promise<void> {
    try {
      debugger;
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
          file = file.replace('data:image/jpeg;base64,', '');

                  this.SitePreparation.ComputertablesImage = file;

          debugger;
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

  async onChairImgChange(event: any): Promise<void> {
    try {
      debugger;
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
          file = file.replace('data:image/jpeg;base64,', '');

                  this.SitePreparation.chairsImage = file;

          debugger;
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


  async onEarthingImgChange(event: any): Promise<void> {
    try {
      debugger;
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
          file = file.replace('data:image/jpeg;base64,', '');

                  this.SitePreparation.Earthing_available_photo = file;

          debugger;
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

  async onmcbmodularImgChange(event: any): Promise<void> {
    try {
      debugger;
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
          file = file.replace('data:image/jpeg;base64,', '');

                  this.SitePreparation.MCBs_other_modular_boxes_available_photo = file;

          debugger;
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




  async btnPreparationSub(): Promise<void> {
    try {
       if (this.validate()) {
        debugger;
        this.console.log(this.SitePreparation);
        this.spinner.show();

       const req={

        type:this.SitePreparation.type,
        BuildingType:this.SitePreparation.BuildingType,
        BuildingInteriorImage:this.SitePreparation.BuildingInteriorImage,
        BuildingExteriorfrontImage:this.SitePreparation.BuildingExteriorfrontImage,
        BuildingExteriorBackImage:this.SitePreparation.BuildingExteriorBackImage,
        BuildingRightsideImage:this.SitePreparation.BuildingRightsideImage,
        BuildingLeftsideImage:this.SitePreparation.BuildingLeftsideImage,
        AvailabilityPowerSupply:this.SitePreparation.AvailabilityPowerSupply,
        PowerPhaseImage:this.SitePreparation.PowerPhaseImage,
        PowerPhase:this.SitePreparation.PowerPhase,
        internetDevice:this.SitePreparation.internetDevice,
        Bandwidthspeed:this.SitePreparation.Bandwidthspeed,
        InternetImage:this.SitePreparation.InternetImage,
        AvailabilityofFurniture:this.SitePreparation.AvailabilityofFurniture,
        Computertables:this.SitePreparation.Computertables,
        ComputertablesImage:this.SitePreparation.ComputertablesImage,
        chairs:this.SitePreparation.chairs,
        chairsImage:this.SitePreparation.chairsImage,
        UserName:this.session.userName,
        Pacs:this.session.pacId,
        input01:this.SitePreparation.Latitude,
        input02: this.SitePreparation.Longitude,
        input03: this.SitePreparation.Earthing_available_photo,
        input04: this.SitePreparation.MCBs_other_modular_boxes_available_photo,
        input05: this.SitePreparation.Wiring_Concealing,
        input06:this.SitePreparation.ElectrificationWorkby

        }
        const response = await this.ceoAPI.SitePreparationSub(req);
        this.spinner.hide();
        debugger;
        if (response.success) {
          alert(response.message);
          //window.location.reload();
          this.CertificationStatus=true;
          this.CalibrationStatus=false;

        } else {
          this.toast.info(response.message);
        }
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  DistChange(obj:any)
  {
this.loadMandalDetails(obj);
  }
  MandalChange(obj:any){
    //this.loadpacksDetails(obj);
  }

  async loadDistrictDetails(): Promise<void> {
    try { debugger;
      const req = {
        type: '43',
        mobileno:this.session.uniqueId  //pacId,
         
      }; debugger;
      this.spinner.show();
      const response = await this.sharedAPI.Hrmsemp(req);
      if (response.success) { 
        
         
      this.DistrictlistData=response.result;
      //this.DeviceDetails.PACS_CODE=this.session.pacId ;
      // let objvalue= this.DeviceList.find(data=>data.PACS_CODE==this.session.pacId);
      // this.DeviceDetails.PACS_NAME=objvalue.PACS_NAME; 

      }  
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async loadMandalDetails(obj:any): Promise<void> {
    try { debugger;
      const req = {
        type: '44',
        mobileno:this.session.uniqueId,
        cfmsid:this.SitePreparation.Districtcode  //pacId,
         
      }; debugger;
      this.spinner.show();
      const response = await this.sharedAPI.Hrmsemp(req);
      if (response.success) { 
        
         
      this.MandallistData=response.result;
      //this.DeviceDetails.PACS_CODE=this.session.pacId ;
      // let objvalue= this.DeviceList.find(data=>data.PACS_CODE==this.session.pacId);
      // this.DeviceDetails.PACS_NAME=objvalue.PACS_NAME; 

      }  
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }


  validate(): boolean {
    debugger;

     this.console.log(this.SitePreparation.BuildingType);


      if (this.utils.isEmpty(this.SitePreparation.BuildingType) ) {
        this.toast.warning('please Select Building Type');
        return false;
      }
      if (this.utils.isEmpty(this.SitePreparation.BuildingInteriorImage)) {
        this.toast.warning('please Interior Photo Upload');
        return false;
      }
      if (this.utils.isEmpty(this.SitePreparation.BuildingExteriorfrontImage)) {
        this.toast.warning('please Exterior Front Side Photo Upload');
        return false;
      }
      if (this.utils.isEmpty(this.SitePreparation.BuildingExteriorBackImage)) {
        this.toast.warning('please Exterior Back Side Photo Upload');
        return false;
      }
      if (this.utils.isEmpty(this.SitePreparation.BuildingRightsideImage)) {
        this.toast.warning('please Exterior Right Side Photo Upload');
        return false;
      }
      if (this.utils.isEmpty(this.SitePreparation.BuildingLeftsideImage)) {
        this.toast.warning('please Exterior Left Side Photo Upload');
        return false;
      }
      if (this.utils.isEmpty(this.SitePreparation.AvailabilityPowerSupply) || this.SitePreparation.AvailabilityPowerSupply=='0'  ) {
        this.toast.warning('please Select Availability of Power Supply');
        return false;
      }

      if (this.SitePreparation.AvailabilityPowerSupply === '1') {
        if (this.utils.isEmpty(this.SitePreparation.PowerPhase)) {
          this.toast.warning('please Select Phase');
          return false;
        }
        if (this.utils.isEmpty(this.SitePreparation.PowerPhaseImage)) {
          this.toast.warning('please Upload Power Phase Image');
          return false;
        }
      }


      // if (this.utils.isEmpty(this.SitePreparation.internetDevice)  || this.SitePreparation.internetDevice=='0'  ) {
      //   this.toast.warning('please Select Internet Device');
      //   return false;
      // }

      if (this.SitePreparation.internetDevice === '1' || this.SitePreparation.internetDevice === '2') {
        if (this.utils.isEmpty(this.SitePreparation.Bandwidthspeed)) {
          this.toast.warning('please Enter Band Width Speed');
          return false;
        }
        if (this.utils.isEmpty(this.SitePreparation.InternetImage)) {
          this.toast.warning('please  Upload Internet Image');
          return false;
        }
      }

      if (this.utils.isEmpty(this.SitePreparation.AvailabilityofFurniture)    || this.SitePreparation.AvailabilityofFurniture=='0'  ) {
        this.toast.warning('please Select Availablity of Furniture');
        return false;
      }

      if (this.SitePreparation.AvailabilityofFurniture === '1') {
        if (this.utils.isEmpty(this.SitePreparation.Computertables)) {
          this.toast.warning('please Enter Computer Tables');
          return false;
        }
        if (this.utils.isEmpty(this.SitePreparation.ComputertablesImage)) {
          this.toast.warning('please Upload Computer Tables Image');
          return false;
        }
        if (this.utils.isEmpty(this.SitePreparation.chairs)) {
          this.toast.warning('please Enter Chairs Tables');
          return false;
        }
        if (this.utils.isEmpty(this.SitePreparation.chairsImage)) {
          this.toast.warning('please Select Upload Chairs Image');
          return false;
        }


      }

      if(this.SitePreparation.Earthing_available==='1')
      {
        if (this.utils.isEmpty(this.SitePreparation.Earthing_available_photo)) {
          this.toast.warning('please Upload Earthing Image');
          return false;
        }
      }
      if (this.utils.isEmpty(this.SitePreparation.Earthing_available)    || this.SitePreparation.Earthing_available=='0'  ) {
        this.toast.warning('please Select Earthing available');
        return false;
      }



      if(this.SitePreparation.MCBs_other_modular_boxes_available==='1')
      {
        if (this.utils.isEmpty(this.SitePreparation.MCBs_other_modular_boxes_available_photo)) {
          this.toast.warning('please Upload MCBS Other Modular Image');
          return false;
        }
      }
      if (this.utils.isEmpty(this.SitePreparation.MCBs_other_modular_boxes_available)    || this.SitePreparation.MCBs_other_modular_boxes_available=='0'  ) {
        this.toast.warning('please Select MCBs & other modular boxes');
        return false;
      }
      if(this.utils.isEmpty(this.SitePreparation.Wiring_Concealing)    || this.SitePreparation.Wiring_Concealing =='0')
      {
        this.toast.warning('please Select Wiring Concealing');
        return false;
      }

      if(this.SitePreparation.Latitude === null || this.SitePreparation.Latitude === undefined || this.SitePreparation.Latitude === 0 ||

        this.SitePreparation.Longitude === null || this.SitePreparation.Longitude === undefined || this.SitePreparation.Longitude === 0
      )
        {
          this.toast.warning('Please Click on Get Location');
          return false;
        }

        // if(this.SitePreparation.ElectrificationWorkby==null || this.SitePreparation.ElectrificationWorkby == undefined || this.SitePreparation.ElectrificationWorkby == 0){
        //   this.toast.warning('Please Select Electrification Type');
        //   return false;
        // }

      return true;
    }

    Updatevalidate(): boolean {
      debugger;
  
      // this.console.log(this.EditSitePreparation.BuildingType);
  
  
        if (this.utils.isEmpty(this.EditSitePreparation.BuildingType) ) {
          this.toast.warning('please Select Building Type');
          return false;
        }
        // if (this.utils.isEmpty(this.EditSitePreparation.BuildingInteriorImage)) {
        //   this.toast.warning('please Interior Photo Upload');
        //   return false;
        // }
        // if (this.utils.isEmpty(this.EditSitePreparation.BuildingExteriorfrontImage)) {
        //   this.toast.warning('please Exterior Front Side Photo Upload');
        //   return false;
        // }
        // if (this.utils.isEmpty(this.EditSitePreparation.BuildingExteriorBackImage)) {
        //   this.toast.warning('please Exterior Back Side Photo Upload');
        //   return false;
        // }
        // if (this.utils.isEmpty(this.EditSitePreparation.BuildingRightsideImage)) {
        //   this.toast.warning('please Exterior Right Side Photo Upload');
        //   return false;
        // }
        // if (this.utils.isEmpty(this.EditSitePreparation.BuildingLeftsideImage)) {
        //   this.toast.warning('please Exterior Left Side Photo Upload');
        //   return false;
        // }
        // if (this.utils.isEmpty(this.EditSitePreparation.AvailabilityPowerSupply) || this.EditSitePreparation.AvailabilityPowerSupply=='0'  ) {
        //   this.toast.warning('please Select Availability of Power Supply');
        //   return false;
        // }
  
        // if (this.EditSitePreparation.AvailabilityPowerSupply === '1') {
        //   if (this.utils.isEmpty(this.EditSitePreparation.PowerPhase)) {
        //     this.toast.warning('please Select Phase');
        //     return false;
        //   }
        //   if (this.utils.isEmpty(this.EditSitePreparation.PowerPhaseImage)) {
        //     this.toast.warning('please Upload Power Phase Image');
        //     return false;
        //   }
        // }
  
  
        // if (this.utils.isEmpty(this.EditSitePreparation.internetDevice)  || this.EditSitePreparation.internetDevice=='0'  ) {
        //   this.toast.warning('please Select Internet Device');
        //   return false;
        // }
  
        if (this.EditSitePreparation.internetDevice === '1' || this.EditSitePreparation.internetDevice === '2') {
          
          // if (this.utils.isEmpty(this.EditSitePreparation.InternetImage)) {
          //   this.toast.warning('please  Upload Internet Image');
          //   return false;
          // }
        }
  
        if (this.utils.isEmpty(this.EditSitePreparation.AvailabilityofFurniture)    || this.EditSitePreparation.AvailabilityofFurniture=='0'  ) {
          this.toast.warning('please Select Availablity of Furniture');
          return false;
        }
  
        if (this.EditSitePreparation.AvailabilityofFurniture === '1') {
          
          // if (this.utils.isEmpty(this.EditSitePreparation.ComputertablesImage)) {
          //   this.toast.warning('please Upload Computer Tables Image');
          //   return false;
          // }
          
          // if (this.utils.isEmpty(this.EditSitePreparation.chairsImage)) {
          //   this.toast.warning('please Select Upload Chairs Image');
          //   return false;
          // } 
  
        }
  
        if(this.EditSitePreparation.Earthing_available==='1')
        {
          if (this.utils.isEmpty(this.EditSitePreparation.Earthing_available_photo)) {
            this.toast.warning('please Upload Earthing Image');
            return false;
          }
        }
        if (this.utils.isEmpty(this.EditSitePreparation.Earthing_available)    || this.EditSitePreparation.Earthing_available=='0'  ) {
          this.toast.warning('please Select Earthing available');
          return false;
        }
  
  
  
        // if(this.EditSitePreparation.MCBs_other_modular_boxes_available==='1')
        // {
        //   if (this.utils.isEmpty(this.EditSitePreparation.MCBs_other_modular_boxes_available_photo)) {
        //     this.toast.warning('please Upload MCBS Other Modular Image');
        //     return false;
        //   }
        // }
        // if (this.utils.isEmpty(this.EditSitePreparation.MCBs_other_modular_boxes_available)    || this.EditSitePreparation.MCBs_other_modular_boxes_available=='0'  ) {
        //   this.toast.warning('please Select MCBs & other modular boxes');
        //   return false;
        // }
        // if(this.utils.isEmpty(this.EditSitePreparation.Wiring_Concealing)    || this.EditSitePreparation.Wiring_Concealing =='0')
        // {
        //   this.toast.warning('please Select Wiring Concealing');
        //   return false;
        // }
  
        if(this.EditSitePreparation.Latitude === null || this.EditSitePreparation.Latitude === undefined || this.EditSitePreparation.Latitude === 0 ||
  
          this.EditSitePreparation.Longitude === null || this.EditSitePreparation.Longitude === undefined || this.EditSitePreparation.Longitude === 0
        )
          {
            this.toast.warning('Please Click on Get Location');
            return false;
          }
  
          // if(this.SitePreparation.ElectrificationWorkby==null || this.SitePreparation.ElectrificationWorkby == undefined || this.SitePreparation.ElectrificationWorkby == 0){
          //   this.toast.warning('Please Select Electrification Type');
          //   return false;
          // }
  
        return true;
      }

    getLocation() { 
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            //const latitude = position.coords.latitude;
            this.SitePreparation.Latitude = (position.coords.latitude);
            this.SitePreparation.Longitude = position.coords.longitude;
            //const longitude = position.coords.longitude;
            //console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
            console.log(`Latitude:${this.SitePreparation.Latitude}, Longitude: ${this.SitePreparation.Longitude}`);
          },
          (error) => {
            console.error('Error getting location:', error.message);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    }

    EditgetLocation() { 
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            //const latitude = position.coords.latitude;
            this.EditSitePreparation.Latitude = (position.coords.latitude);
            this.EditSitePreparation.Longitude = position.coords.longitude;
            //const longitude = position.coords.longitude;
            //console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
            console.log(`Latitude:${this.EditSitePreparation.Latitude}, Longitude: ${this.EditSitePreparation.Longitude}`);
          },
          (error) => {
            console.error('Error getting location:', error.message);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    }
 

async btnViewEdit():Promise<void>
{
 
  try {

    // if (this.utils.isEmpty(this.CertifcateFile) ) {
    //   this.toast.warning('please upload  signed pdf copy');
    //   return  ;
    // }

    const req = {
      type:36,
      cfmsid:this.session.pacId, 
    };
    this.spinner.show();
    debugger;
   // const response = await this.ceoAPI.SitepreperationDetailsupdate(req);
    const response = await this.sharedAPI.Hrmsemp(req);
    if (response.success) {

      this.EditSitePreparation.BuildingType=response.result[0].BUILDINGTYPE;
      this.EditSitePreparation.oldBuildingInteriorImage=response.result[0].BUILDING_INTERIORIMAGE;
      this.EditSitePreparation.oldBuildingExteriorfrontImage=response.result[0].BUILDING_EXTERIOR_FRONTIMAGE;
      this.EditSitePreparation.oldBuildingExteriorBackImage=response.result[0].BUILDING_EXTERIOR_BACKIMAGE;
      this.EditSitePreparation.oldBuildingRightsideImage=response.result[0].BUILDING_RIGHTSIDE_IMAGE;
      this.EditSitePreparation.oldBuildingLeftsideImage=response.result[0].BUILDINGLEFTSIDEIMAGE;
      this.EditSitePreparation.AvailabilityPowerSupply=response.result[0].AVAILABILITY_POWERSUPPLY;
      this.EditSitePreparation.oldPowerPhaseImage=response.result[0].POWERPHASE_IMAGE;
      this.EditSitePreparation.PowerPhase=response.result[0].POWERPHASE;
      this.EditSitePreparation.internetDevice=response.result[0].INTERNET_DEVICE;
      this.EditSitePreparation.Bandwidthspeed=response.result[0].BANDWIDTH_SPEED;
      this.EditSitePreparation.oldInternetImage=response.result[0].INTERNET_IMAGE;
      this.EditSitePreparation.AvailabilityofFurniture=response.result[0].AVAILABILITYOFFURNITURE;
      this.EditSitePreparation.Computertables=response.result[0].COMPUTERTABLES;
      this.EditSitePreparation.oldComputertablesImage=response.result[0].COMPUTERTABLESIMAGE;
      this.EditSitePreparation.chairs=response.result[0].CHAIRS;
      this.EditSitePreparation.oldchairsImage=response.result[0].CHAIRSIMAGE;
      this.EditSitePreparation.Latitude=response.result[0].LATITUDE;  
      this.EditSitePreparation.Longitude=response.result[0].LONGITUDE;  
      this.EditSitePreparation.oldinput03=response.result[0].EARTHING_IMAGE;  
      this.EditSitePreparation.oldinput04=response.result[0].MCB_IMAGE;  
      this.EditSitePreparation.Wiring_Concealing=response.result[0].WIRING_CONCEALING_STAUS;  
      this.pacsid=response.result[0].PACS_ID;  
      this.EditSitePreparation.Earthing_available = "1";
      this.EditSitePreparation.MCBs_other_modular_boxes_available = "1";
    } else {
      alert(response.message);
    }
    this.spinner.hide();
  } catch (error) {
    this.spinner.hide();
    this.utils.catchResponse(error);
  }

}

async btnupdate(): Promise<void> {
  try {
    if (this.utils.isEmpty(this.EditSitePreparation.Bandwidthspeed)) {
      this.toast.warning('please Enter Band Width Speed');
      return;
    }
    if (this.utils.isEmpty(this.EditSitePreparation.Computertables)) {
      this.toast.warning('please Enter Computer Tables');
      return;
    }
    if (this.utils.isEmpty(this.EditSitePreparation.chairs)) {
      this.toast.warning('please Enter Chairs');
      return;
    }
     //if (this.Updatevalidate()) {
      debugger;
      //this.console.log(this.SitePreparation);
      this.spinner.show();

     const req={

      //type:this.EditSitePreparation.type,
      BuildingType:this.EditSitePreparation.BuildingType,
      BuildingInteriorImage:this.EditSitePreparation.BuildingInteriorImage,
      BuildingExteriorfrontImage:this.EditSitePreparation.BuildingExteriorfrontImage,
      BuildingExteriorBackImage:this.EditSitePreparation.BuildingExteriorBackImage,
      BuildingRightsideImage:this.EditSitePreparation.BuildingRightsideImage,
      BuildingLeftsideImage:this.EditSitePreparation.BuildingLeftsideImage,
      AvailabilityPowerSupply:this.EditSitePreparation.AvailabilityPowerSupply,
      PowerPhaseImage:this.EditSitePreparation.PowerPhaseImage,
      PowerPhase:this.EditSitePreparation.PowerPhase,
      internetDevice:this.EditSitePreparation.internetDevice,
      Bandwidthspeed:this.EditSitePreparation.Bandwidthspeed,
      InternetImage:this.EditSitePreparation.InternetImage,
      AvailabilityofFurniture:this.EditSitePreparation.AvailabilityofFurniture,
      Computertables:this.EditSitePreparation.Computertables,
      ComputertablesImage:this.EditSitePreparation.ComputertablesImage,
      chairs:this.EditSitePreparation.chairs,
      chairsImage:this.EditSitePreparation.chairsImage,
      UserName:this.session.userName,
      Pacs:this.pacsid,
      input01:this.EditSitePreparation.Latitude,
      input02: this.EditSitePreparation.Longitude,
      input03: this.EditSitePreparation.Earthing_available_photo,
      input04: this.EditSitePreparation.MCBs_other_modular_boxes_available_photo,
      input05: this.EditSitePreparation.Wiring_Concealing,
      input06:this.EditSitePreparation.ElectrificationWorkby,

      oldBuildingInteriorImage:this.EditSitePreparation.oldBuildingInteriorImage,
      oldBuildingExteriorfrontImage:this.EditSitePreparation.oldBuildingExteriorfrontImage,
      oldBuildingExteriorBackImage:this.EditSitePreparation.oldBuildingExteriorBackImage,
      oldBuildingRightsideImage:this.EditSitePreparation.oldBuildingRightsideImage,
      oldBuildingLeftsideImage:this.EditSitePreparation.oldBuildingLeftsideImage,
      oldPowerPhaseImage:this.EditSitePreparation.oldPowerPhaseImage,
      oldInternetImage:this.EditSitePreparation.oldInternetImage,
      oldComputertablesImage:this.EditSitePreparation.oldComputertablesImage,
      oldchairsImage:this.EditSitePreparation.oldchairsImage,     
      oldinput03:this.EditSitePreparation.oldinput03,
      oldinput04:this.EditSitePreparation.oldinput04
      }
      const response = await this.ceoAPI.SitePreparationEdit(req);
      this.spinner.hide();
      debugger;
      if (response.success) {
        alert(response.message);
        //window.location.reload();
        this.CertificationStatus=true;
        this.CalibrationStatus=false;
        this.SitePreparationPopUp=false;

      } else {
        this.toast.info(response.message);
      }
   // }
  } catch (error) {
    this.spinner.hide();
    this.utils.catchResponse(error);
  }
}


// async certdownload():Promise<void>
// {
 
//   try { 
//     const req = {
//       type:47,
//       cfmsid:this.session.pacId, 
//     };
//     this.spinner.show();
//     debugger; 
//     const response = await this.sharedAPI.Hrmsemp(req);
//     if (response.success) { 
      
//     } else {
//       alert(response.message);
//     }
//     this.spinner.hide();
//   } catch (error) {
//     this.spinner.hide();
//     this.utils.catchResponse(error);
//   }

// }

async certdownload(): Promise<void> {debugger;
  try {

    const req = {
      type:47,
      cfmsid:this.session.pacId, 
    };
    debugger;
    const fileName = 'Site Prepearation Final Certificate';
    let basePDF = '';
    this.spinner.show(); 
    const res = await this.sharedAPI.Hrmsemp(req);
    debugger;
    if (res.success) {
      if(res.result[0].SITE_FINAL_PDF=='' || res.result[0].SITE_FINAL_PDF==null || res.result[0].SITE_FINAL_PDF==undefined)
      {
        
        this.toast.info("Please Submit Site Preparation Certificate to download the Certificate  ...!");
      }
      else{
        const path = res.result[0].SITE_FINAL_PDF; 
        await this.utils.viewJPVPDFcop(path); 
        
      }
     
    } else {
      this.toast.info(res.message);
    
    }
    this.spinner.hide();
  } catch (error) {
    this.spinner.hide();
    this.utils.catchResponse(error);
  }
}




}
