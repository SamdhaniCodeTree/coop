import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilsService } from 'src/app/sharedModule/services/utils.service';
import { SessionService } from 'src/app/sharedModule/services/session.service';

@Component({
  selector: 'app-pla-district-report',
  templateUrl: './pla-district-report.component.html',
  styleUrls: ['./pla-district-report.component.css']
})
export class PlaDistrictReportComponent implements OnInit {

  input: any;
  districtId: any;
  districtName: any;
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
    this.fromDate = decString.fromDate;
    this.toDate = decString.toDate;
  }

  onMandalChange(result: any): void {
    if(this.session.role=="501"|| this.session.role=="503" ) {
      this.router.navigate(['/dllic/pacsLandAllotmentMandalReport'], {
        queryParams: { request: result },
      });
    }
    else if(this.session.role=="502" ) {
      this.router.navigate(['/jc/pacsLandAllotmentMandalReport'], {
        queryParams: { request: result },
      });
    }
    else
    {
      this.router.navigate(['/admin/pacsLandAllotmentMandalReport'], {
        queryParams: { request: result },
      });
    };
    
  }

  btnBack(): void {
    if(this.session.role=="501"|| this.session.role=="503" ) {
      this.router.navigate(['/dllic/pacsLandAllotmentStateReport'], {
      
      });
    }
    else if(this.session.role=="502" ) {
      this.router.navigate(['/jc/pacsLandAllotmentStateReport'], {
       
      });
    }
    else
    {
      
      this.router.navigate(['/admin/pacsLandAllotmentStateReport'], {
        
      });
    };
   
  }

}
