import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  accessToken: any;
  name: any;
  designation: any;
  role: any;
  uniqueId: any;
  districtId: any;
  districtName: any;
  divisionName: any;
  divisionId: any;
  mandalId: any;
  mandalName: any;
  pacId: any;
  pacName: any;
  mobileNumber: any;
  userName: any;
  lastLoginTime: any;
  isPasswordUpdate: any;
  fromDate = '2020/11/10';
  NOOFPACS:any;
  ispacsid: any;

  dpTodayDate = new Date();

  constructor() {
    this.setSession();
  }

  setSession(): void {
    this.accessToken = sessionStorage.getItem('accessToken');
    this.name = sessionStorage.getItem('name');
    this.designation = sessionStorage.getItem('designation');
    this.role = sessionStorage.getItem('role');
    this.uniqueId = sessionStorage.getItem('uniqueId');
    this.districtId = sessionStorage.getItem('districtId');
    this.districtName = sessionStorage.getItem('districtName');
    this.divisionName = sessionStorage.getItem('divisionName');
    this.divisionId = sessionStorage.getItem('divisionId');
    this.mandalId = sessionStorage.getItem('mandalId');
    this.mandalName = sessionStorage.getItem('mandalName');
    this.pacId = sessionStorage.getItem('pacId');
    this.pacName = sessionStorage.getItem('pacName');
    this.mobileNumber = sessionStorage.getItem('mobileNumber');
    this.userName = sessionStorage.getItem('userName');
    this.lastLoginTime = sessionStorage.getItem('lastLoginTime');
    this.isPasswordUpdate = sessionStorage.getItem('isPasswordUpdate');
  }

  clearSession(): void {
    sessionStorage.clear();
    this.accessToken = '';
    this.name = '';
    this.designation = '';
    this.role = '';
    this.uniqueId = '';
    this.districtId = '';
    this.districtName = '';
    this.divisionName = '';
    this.divisionId = '';
    this.mandalId = '';
    this.mandalName = '';
    this.pacId = '';
    this.pacName = '';
    this.mobileNumber = '';
    this.userName = '';
    this.lastLoginTime = '';
    this.isPasswordUpdate = '';
  }


  getTodayDate(): Date {
    return this.dpTodayDate;
  }

  getTodayddmmyyyDate(): Date {
    return this.dpTodayDate;
  }


  getTodayDateString(): string {
    const date = this.dpTodayDate;

    let day = '';
    const tempDay = date.getDate().toString();
    if (tempDay.length === 1) {
      day = '0' + tempDay;
    } else {
      day = tempDay;
    }

    let month = '';
    const tempMonth = (date.getMonth() + 1).toString();
    if (tempMonth.length === 1) {
      month = '0' + tempMonth;
    } else {
      month = tempMonth;
    }

    return date.getFullYear().toString() + '/' + month + '/' + day;
  }


  getDateString(date: Date): string {
    let day = '';
    const tempDay = date.getDate().toString();
    if (tempDay.length === 1) {
      day = '0' + tempDay;
    } else {
      day = tempDay;
    }

    let month = '';
    const tempMonth = (date.getMonth() + 1).toString();
    if (tempMonth.length === 1) {
      month = '0' + tempMonth;
    } else {
      month = tempMonth;
    }

    return date.getFullYear().toString() + '/' + month + '/' + day;
  }

  getMinDate(): any {
    return '';
  }

  getFromDateString(): string {
    return this.fromDate;
  }

  getDateddmmyyyyString(date: Date): string {
    let day = '';
    const tempDay = date.getDate().toString();
    if (tempDay.length === 1) {
      day = '0' + tempDay;
    } else {
      day = tempDay;
    }

    let month = '';
    const tempMonth = (date.getMonth() + 1).toString();
    if (tempMonth.length === 1) {
      month = '0' + tempMonth;
    } else {
      month = tempMonth;
    }

    //return date.getFullYear().toString() + '/' + month + '/' + day;
    return day + '/' + month + '/' + date.getFullYear().toString();
  }

}
