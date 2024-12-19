import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { interval } from 'rxjs';
import { NgxToasterService } from 'src/app/sharedModule/services/ngx-toaster.service';
import { SessionService } from 'src/app/sharedModule/services/session.service';
import { SharedService } from 'src/app/sharedModule/services/shared.service';
import { ToasterService } from 'src/app/sharedModule/services/toaster.service';
import { UtilsService } from 'src/app/sharedModule/services/utils.service';

@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.css']
})
export class SharedComponent implements OnInit {
  userName: any;
  lastLoginTime: any;
  refreshTokenInterval: any;

  constructor( private spinner: NgxSpinnerService,
    private router: Router,
    private session: SessionService,
    private utils: UtilsService,
    private sharedAPI: SharedService,
    private toast: ToasterService,
    private ngxToaster: NgxToasterService) { }

    ngOnInit(): void {
      debugger;
      this.userName = this.session.userName;
      this.lastLoginTime = this.session.lastLoginTime;
  
      if (this.session.isPasswordUpdate === '0') {
        this.utils.updatePassword(this.session.role);
      }
      this.refreshTokenInterval = interval(
        this.utils.env.refreshTokenInterval
      ).subscribe(() => {
        const decodeToken = this.utils.parseJwt(this.session.accessToken);
        const initTimestamp = new Date(decodeToken.exp * 1000);
        const currTimestamp = new Date();
        const newTimestamp = new Date(initTimestamp.getTime() - this.utils.env.refreshTokenCheck);
        if (currTimestamp > newTimestamp  ) {
          this.refreshToken();
        }
      });
    }
  
    async refreshToken(): Promise<void> {
      try {
        this.spinner.show();
        const response = await this.sharedAPI.refreshToken();
        this.spinner.hide();
        if (response.success) {
          sessionStorage.setItem('accessToken', response.result);
          this.session.accessToken = sessionStorage.getItem('accessToken');
        } else {
          this.ngxToaster.error(response.message);
          this.router.navigate(['/']);
        }
      } catch (error) {
        this.spinner.hide();
        this.utils.catchResponse(error);
      }
    }
  
    async btnLogout(): Promise<void> {
      try {
        if (confirm('are you sure want to logout ?')) {
          const req = {
            userName: this.userName,
          };
          this.spinner.show();
          const response = await this.sharedAPI.logout(req);
          this.spinner.hide();
          if (response.success) {
            sessionStorage.clear();
            this.session.clearSession();
            alert(response.message);
            this.router.navigate(['/']);
          } else {
            this.toast.info(response.message);
          }
        }
      } catch (error) {
        this.spinner.hide();
        this.utils.catchResponse(error);
      }
    }
  
    btnForgetPassword(): void {
      this.utils.updatePassword(this.session.role);
    }
    ngOnDestroy(): void {
      this.refreshTokenInterval.unsubscribe();
    }

    async dccbApcob_Redirection(): Promise<void> {
           try { debugger;
        const req = {
          type: '1',
          EmployeeId:this.session.uniqueId, //pacId,
          input_02:'1', 
          role:this.session.role 
        }; debugger;
        this.spinner.show();
        const response = await this.sharedAPI.apcobinsertdata(req);
        if (response.success) {
          const string=this.utils.encrypt_apcob(response.result[0].USER_ID);
        // const url="https://cooperation.ap.gov.in/APCOB/#/Tokenauthentication?id="+response.result[0].USER_ID;
         const url=this.utils.apcoburl()+response.result[0].USER_ID;
         //response.result[0].USER_ID;
          window.open(url, '_blank');
        
  
        }  
        this.spinner.hide();
      } catch (error) {
        this.spinner.hide();
        this.utils.catchResponse(error);
      }
    }

}
