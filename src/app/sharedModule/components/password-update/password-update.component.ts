import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginService } from 'src/app/loginModule/services/login.service';
import { SessionService } from '../../services/session.service';
import { SharedService } from '../../services/shared.service';
import { ToasterService } from '../../services/toaster.service';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-password-update',
  templateUrl: './password-update.component.html',
  styleUrls: ['./password-update.component.css'],
})
export class PasswordUpdateComponent implements OnInit {
  isPasswordUpdate = '';
  input = '';
  dashboardRoute: string = '';
  userName: string = '';
  timeStamp = '';
  lastLoginTime = '';
  userdata = {
    oldPassword: null,
    newPassword: null,
    confirmPassword: null,
  };
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private utils: UtilsService,
    private toast: ToasterService,
    private CommonAPI: SharedService,
    private spinner: NgxSpinnerService,
    private session: SessionService,
    private loginAPI: LoginService
  ) {
    this.userName = this.session.userName;
    this.lastLoginTime = this.session.lastLoginTime;
    this.isPasswordUpdate = this.session.isPasswordUpdate;
    route.queryParams.subscribe((params) => (this.input = params['request']));
  }

  ngOnInit(): void {
    const decString = JSON.parse(this.utils.decrypt(this.input));
    this.dashboardRoute = decString.routeId;
  }

  GetLogout(): void {
    if (confirm('are you sure want to logout ?')) {
      sessionStorage.clear();
      this.router.navigate(['/']);
    }
  }

  async btnSubmit(): Promise<void> {
    try {
      if (
        this.userdata.oldPassword === null ||
        this.userdata.oldPassword === undefined ||
        this.userdata.oldPassword === ''
      ) {
        this.toast.warning('Please Enter Old Password');
        return;
      }
      if (
        this.userdata.newPassword === null ||
        this.userdata.newPassword === undefined ||
        this.userdata.newPassword === ''
      ) {
        this.toast.warning('Please Enter New Password');
        return;
      }
      if (
        this.userdata.confirmPassword === null ||
        this.userdata.confirmPassword === undefined ||
        this.userdata.confirmPassword === ''
      ) {
        this.toast.warning('Please Enter Confirm Password');
        return;
      }
      if (this.userdata.confirmPassword !== this.userdata.newPassword) {
        this.toast.warning('New password and confirm password not matched');
        return;
      }

      const req = {
        userName: this.session.userName,
        password: this.userdata.oldPassword,
        newPassword: this.userdata.newPassword,
      };
      this.spinner.show();
      const response = await this.CommonAPI.passwordUpdate(req);
      this.spinner.hide();
      if (response.success) {
        alert(response.message);
        this.session.isPasswordUpdate = '1';
        sessionStorage.setItem('isPasswordUpdate', this.session.isPasswordUpdate);
        this.router.navigate([this.dashboardRoute]);
      } else {
        this.toast.info(response.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
  async adminSubmit(): Promise<void> {
    try { 
      const req = {
        userName: this.session.userName,
        password: this.userdata.oldPassword,
        newPassword: this.userdata.newPassword,
      };
      this.spinner.show();
      const response = await this.CommonAPI.adminuserlist(req);
      this.spinner.hide();
      if (response.success) {
        alert(response.message);
        this.session.isPasswordUpdate = '1';
        sessionStorage.setItem('isPasswordUpdate', this.session.isPasswordUpdate);
        this.router.navigate([this.dashboardRoute]);
      } else {
        this.toast.info(response.message);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
  async btnBack(): Promise<void> {
    try {
      this.router.navigate([this.dashboardRoute]);
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
  async btnLogout(): Promise<void> {
    try {
      if (confirm('are you sure want to logout ?')) {
        sessionStorage.clear();
        this.session.clearSession();
        this.router.navigate(['/']);
        // const req = {
        //   userName: this.userName,
        // };
        // this.spinner.show();
        // const response = await this.loginAPI.logout(req);
        // this.spinner.hide();
        // if (response.success) {
        //   sessionStorage.clear();
        //   this.session.clearSession();
        //   alert(response.message);
        //   this.router.navigate(['/']);
        // } else {
        //   this.toast.info(response.message);
        // }
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
}
