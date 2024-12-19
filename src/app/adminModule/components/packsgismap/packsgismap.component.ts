import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { ConsoleService } from 'src/app/sharedModule/services/console.service';
import { NgxToasterService } from 'src/app/sharedModule/services/ngx-toaster.service';
import { SessionService } from 'src/app/sharedModule/services/session.service';
import { SharedService } from 'src/app/sharedModule/services/shared.service';
import { ToasterService } from 'src/app/sharedModule/services/toaster.service';
import { UtilsService } from 'src/app/sharedModule/services/utils.service';
 

@Component({
  selector: 'app-packsgismap',
  templateUrl: './packsgismap.component.html',
  styleUrls: ['./packsgismap.component.css']
   
})
 
export class PacksgismapComponent implements OnInit {
   
  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private ngxToaster: NgxToasterService,
    private router: Router,
    private utils: UtilsService,
    private session: SessionService,
    private console: ConsoleService,
    private sharedAPI: SharedService,
 
  ) {}

  

  ngOnInit() {
  
  }

}


