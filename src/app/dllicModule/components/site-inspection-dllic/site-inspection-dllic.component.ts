import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/sharedModule/services/session.service';

@Component({
  selector: 'app-site-inspection-dllic',
  templateUrl: './site-inspection-dllic.component.html',
  styleUrls: ['./site-inspection-dllic.component.css']
})
export class SiteInspectionDllicComponent implements OnInit {

  constructor(private session: SessionService,private router: Router,) { }

  ngOnInit(): void {
  }

  BackClick(){
    if(this.session.role=='501')
    {
      this.router.navigate(['/dllic/VillageStatus']);
    }
    if(this.session.role=='101')
    {
      this.router.navigate(['/dco/VillageStatus']);
    }
  }

}
