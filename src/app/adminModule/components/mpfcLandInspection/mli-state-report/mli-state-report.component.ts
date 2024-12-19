import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/sharedModule/services/session.service';
import { ToasterService } from 'src/app/sharedModule/services/toaster.service';
import { UtilsService } from 'src/app/sharedModule/services/utils.service';

@Component({
  selector: 'app-mli-state-report',
  templateUrl: './mli-state-report.component.html',
  styleUrls: ['./mli-state-report.component.css'],
})
export class MliStateReportComponent implements OnInit {
  constructor(
    private router: Router,
    private toast: ToasterService,
    private session: SessionService,
    private utils: UtilsService
  ) {}

  ngOnInit(): void {}

  onDistrictChange(result: any): void {

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
