import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilsService } from 'src/app/sharedModule/services/utils.service';
import { SessionService } from 'src/app/sharedModule/services/session.service';

@Component({
  selector: 'app-pla-mandal-report',
  templateUrl: './pla-mandal-report.component.html',
  styleUrls: ['./pla-mandal-report.component.css'],
})
export class PlaMandalReportComponent implements OnInit {
  input: any;
  districtId: any;
  districtName: any;
  mandalId: any;
  mandalName: any;
  fromDate: any;
  toDate: any;

  constructor(
    private utils: UtilsService,
    private route: ActivatedRoute,
    private session: SessionService,
    private router: Router
  ) {
    route.queryParams.subscribe((params) => (this.input = params['request']));
  }

  ngOnInit(): void {
    const decString = JSON.parse(this.utils.decrypt(this.input));
    this.districtId = decString.districtId;
    this.districtName = decString.districtName;
    this.mandalId = decString.mandalId;
    this.mandalName = decString.mandalName;
    this.fromDate = decString.fromDate;
    this.toDate = decString.toDate;
  }

  btnBack(): void {
    const requestData = {
      districtId: this.districtId,
      districtName: this.districtName,
      fromDate: this.fromDate,
      toDate: this.toDate,
    };

    
    if(this.session.role=="501"|| this.session.role=="503" ) {
      const result = this.utils.encrypt(JSON.stringify(requestData));
      this.router.navigate(['/dllic/pacsLandAllotmentDistrictReport'], {
        queryParams: { request: result },
      });
    }
    else if(this.session.role=="502") {
      const result = this.utils.encrypt(JSON.stringify(requestData));
      this.router.navigate(['/jc/pacsLandAllotmentDistrictReport'], {
        queryParams: { request: result },
      });
    }
    else
    {
      const result = this.utils.encrypt(JSON.stringify(requestData));
      this.router.navigate(['/admin/pacsLandAllotmentDistrictReport'], {
        queryParams: { request: result },
      });
    };
    
  }
}
