import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataTableDirective } from 'angular-datatables';
import { ConsoleService } from 'src/app/sharedModule/services/console.service';
import { InspectionService } from 'src/app/sharedModule/services/inspection.service';
import { NgxToasterService } from 'src/app/sharedModule/services/ngx-toaster.service';
import { SessionService } from 'src/app/sharedModule/services/session.service';
import { SharedService } from 'src/app/sharedModule/services/shared.service';
import { ToasterService } from 'src/app/sharedModule/services/toaster.service';
import { UtilsService } from 'src/app/sharedModule/services/utils.service';

@Component({
  selector: 'app-passwordreset',
  templateUrl: './passwordreset.component.html',
  styleUrls: ['./passwordreset.component.css']
})

export class PasswordresetComponent implements OnInit {
  levelStatus = 0;
  dataAvailable = false;
  dataNotAvailable = false;
  maxDate!: Date;
  userlist: any[] = [];
 
  dtOptions: DataTables.Settings = this.utils.dataTableOptions();
  dtTrigger: Subject<any> = new Subject();
  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private ngxToaster: NgxToasterService,
    private router: Router,
    private utils: UtilsService,
    private session: SessionService,
    private console: ConsoleService,
    private dllicAPI: InspectionService,
    private sharedAPI: SharedService,
    private sanitizer: DomSanitizer
  ) {
    this.maxDate = this.session.getTodayDate();
  }

  ngOnInit(): void {
    
    this.getuserlist();
  }

  
  async getuserlist(): Promise<void> {
    try {
     
      const req = {
        type:'1',
        role:'1',
        userName:'',
        passwordHash:'',
        newPassword:'',
      };

      this.spinner.show();
      const response = await this.sharedAPI.adminuserlist(req);
      debugger;
      this.spinner.hide();
      if (response.success) {
        this.userlist = response.result;
      } else {
        this.toast.info(response.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
  async btnupdatepassword(obj: any): Promise<void> {
   
    try {
      if (confirm('are you sure want to reset password..officer name  ....' +obj.NAME+'')) {
        this.userlist = obj.result;
        const req = { 
          type:'2',
          role:'1',
          userName:obj.USERNAME,
          passwordHash:'',
          newPassword:'',
        };
        this.spinner.show();
        const response = await this.sharedAPI.adminpasswordUpdate(req);
        this.spinner.hide();
        if (response.success) {
          this.toast.success('password reset sucessfull completed');
          this.getuserlist();
        } 
        else {
          this.toast.info(response.message);
          this.getuserlist();
        }
      }
    } catch (error) {
      this.getuserlist();
      this.spinner.hide();
      this.utils.catchResponse(error);
    }

     
  }

  
}
 
