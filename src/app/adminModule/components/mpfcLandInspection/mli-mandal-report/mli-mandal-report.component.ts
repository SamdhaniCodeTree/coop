import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToasterService } from 'src/app/sharedModule/services/toaster.service';
import { SessionService } from 'src/app/sharedModule/services/session.service';
import { UtilsService } from 'src/app/sharedModule/services/utils.service';

@Component({
  selector: 'app-mli-mandal-report',
  templateUrl: './mli-mandal-report.component.html',
  styleUrls: ['./mli-mandal-report.component.css'],
})

 
export class  MliMandalReportComponent implements OnInit {
  input: any;
  districtId: any;
  districtName: any;
  mandalId: any;
  mandalName: any;
  constructor(
    private router: Router,
    private toast: ToasterService,
    private route: ActivatedRoute,
    private session: SessionService,
    private utils: UtilsService
  ) {
    route.queryParams.subscribe((params) => (this.input = params['request']));
  }

  ngOnInit(): void {
    const decString = JSON.parse(this.utils.decrypt(this.input));
    this.districtId = decString.districtId;
    this.districtName = decString.districtName;
    this.mandalId = decString.mandalId;
    this.mandalName = decString.mandalName;
  }

  btnBack(): void {
    const requestData = {
      districtId: this.districtId,
      districtName: this.districtName,
    };

    const result = this.utils.encrypt(JSON.stringify(requestData));

    if(this.session.role=="501"|| this.session.role=="503" ) {
      this.router.navigate(['/dllic/MPFCLandInspectionDistrictReport'], {
        queryParams: { request: result },
      });
    }
   else if(this.session.role=="502") {
      this.router.navigate(['/jc/MPFCLandInspectionDistrictReport'], {
        queryParams: { request: result },
      });
    }
    else{
      this.router.navigate(['/admin/MPFCLandInspectionDistrictReport'], {
        queryParams: { request: result },
      });
    }
  }
}
