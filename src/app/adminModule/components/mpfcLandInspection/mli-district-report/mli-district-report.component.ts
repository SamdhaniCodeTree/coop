import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from 'src/app/sharedModule/services/session.service';
import { ToasterService } from 'src/app/sharedModule/services/toaster.service';
import { UtilsService } from 'src/app/sharedModule/services/utils.service';

@Component({
  selector: 'app-mli-district-report',
  templateUrl: './mli-district-report.component.html',
  styleUrls: ['./mli-district-report.component.css'],
})
export class MliDistrictReportComponent implements OnInit {
  input: any;
  districtId: any;
  districtName: any;
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
  }

  onMandalChange(result: any): void {
    if(this.session.role=="501"|| this.session.role=="503" ) {
      this.router.navigate(['/dllic/MPFCLandInspectionMandalReport'], {
        queryParams: { request: result },
      });
    }
   else if(this.session.role=="502") {
      this.router.navigate(['/jc/MPFCLandInspectionMandalReport'], {
        queryParams: { request: result },
      });
    }
    else{
      this.router.navigate(['/admin/MPFCLandInspectionMandalReport'], {
        queryParams: { request: result },
      });
    }
     
  }

  btnBack(): void {
    if(this.session.role=="501"|| this.session.role=="503" ) {
      this.router.navigate(['/dllic/MPFCLandInspectionStateReport'], {
        
      });
    }
   else if(this.session.role=="502") {
      this.router.navigate(['/jc/MPFCLandInspectionStateReport'], {
      
      });
    }
    else{
      this.router.navigate(['/admin/MPFCLandInspectionStateReport'], {
       
      });
    }
  }
}
