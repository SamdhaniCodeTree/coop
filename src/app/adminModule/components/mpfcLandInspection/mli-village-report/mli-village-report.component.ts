import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToasterService } from 'src/app/sharedModule/services/toaster.service';
import { UtilsService } from 'src/app/sharedModule/services/utils.service';

@Component({
  selector: 'app-mli-village-report',
  templateUrl: './mli-village-report.component.html',
  styleUrls: ['./mli-village-report.component.css']
})
export class MliVillageReportComponent implements OnInit {
  input: any;
  districtId: any;
  districtName: any;
  mandalId: any;
  mandalName: any;
  constructor(
    private router: Router,
    private toast: ToasterService,
    private route: ActivatedRoute,
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

    this.router.navigate(['/admin/MPFCLandInspectionDistrictReport'], {
      queryParams: { request: result },
    });
  }
}

