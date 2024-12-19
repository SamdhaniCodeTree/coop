import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/sharedModule/services/session.service';

@Component({
  selector: 'app-foundation-level-dllic',
  templateUrl: './foundation-level-dllic.component.html',
  styleUrls: ['./foundation-level-dllic.component.css']
})
export class FoundationLevelDllicComponent implements OnInit {

  constructor(private session: SessionService,private router: Router) { }

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
