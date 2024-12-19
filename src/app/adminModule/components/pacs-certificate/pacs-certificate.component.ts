import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CeoService } from 'src/app/ceoModule/services/ceo.service';
import { JcService } from 'src/app/jcModule/services/jc.service';
import { PacsLandAllotmentService } from 'src/app/reportsModule/pacsLandAllotment/services/pacs-land-allotment.service';
import { ConsoleService } from 'src/app/sharedModule/services/console.service';
import { NgxToasterService } from 'src/app/sharedModule/services/ngx-toaster.service';
import { SessionService } from 'src/app/sharedModule/services/session.service';
import { SharedService } from 'src/app/sharedModule/services/shared.service';
import { ToasterService } from 'src/app/sharedModule/services/toaster.service';
import { UtilsService } from 'src/app/sharedModule/services/utils.service';

@Component({
  selector: 'app-pacs-certificate',
  templateUrl: './pacs-certificate.component.html',
  styleUrls: ['./pacs-certificate.component.css']
})
export class PacsCertificateComponent implements OnInit {

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
  private ceoAPI: CeoService,
  private allotmentAPI: PacsLandAllotmentService,
  ) { }

  ngOnInit(): void {
  }
  Pacs_code='';
  CertifcateFile='';
  async calibbtnPDF(): Promise<void> {
    debugger;
    try {
  
      const req = {
        type: "2",
        pack_id:this.Pacs_code
        //input2:this.year
      };
      debugger;
      const fileName = 'Calibration Details';
      let basePDF = '';
      this.spinner.show();
  
      const res = await this.ceoAPI.DeviceVerificationCert(req);
      if (res.success) {
        basePDF = res.result;
        this.CertifcateFile=basePDF
        this.utils.downloadPdfFile(basePDF, fileName);
this.Certificateupload();
      } else {
        this.toast.info(res.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  today:any;
  Reportdate:any;
  async Certificateupload(): Promise<void> {
    debugger;
    try {
      this.today=new Date();
      this.Reportdate = formatDate(this.today, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0530');
      // if (this.CertifcateFile === '' || this.CertifcateFile === null || this.CertifcateFile === undefined) {
      //   this.toast.info("please upload pdf");
      //   return;
      // }
      const req = {
        // type:"4",
        input_03: this.CertifcateFile,
        input_02: this.session.userName,
        input_04: this.Pacs_code,
        input_01: "3",
        input_05:this.Reportdate
      };
      this.spinner.show();
      debugger;
      const response = await this.ceoAPI.SuperriserFileuploadUpdate(req);
      if (response.success) {

        alert('Details Approved Successfully ...!');
        
        window.location.reload();
      } else {
        alert(response.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }

  }

}
