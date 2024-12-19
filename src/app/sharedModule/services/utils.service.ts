import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { retry } from 'rxjs/operators';
import { environment } from './../../../environments/environment';
import { ToasterService } from './toaster.service';
import * as XLSX from 'xlsx';
const CryptoJS = require('../../../assets/js/crypto-js');

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  [x: string]: any;
  env = {
    prod: environment.production ? 1 : 0,
    logger: environment.logger,
    API_RETRY_COUNT: environment.appRetryCount,
    refreshTokenInterval: environment.refreshTokenInterval,
    refreshTokenCheck: environment.refreshTokenCheck,
  };
  fileType = {
    PDF: 'PDF',
    IMAGE: 'IMAGE',
  };

  fileSize = {
    twentyKB: 20480,
    thirtyKB: 30720,
    hundredKB: 102400, 
    twoHundredKB: 204800,
    twoHundredFiftyKB: 256000,
    oneMB: 1024000,
    twoMB: 2048000,
    threeMB: 3072000,
  };

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private toast: ToasterService
  ) {

  }

  updatePassword(role: string): void {
    if (role === '1') {
      const route = '/admin';
      const requestData = { routeId: route };
      const encryptedString = this.encrypt(JSON.stringify(requestData));
      this.router.navigate(['/shared/passwordUpdate'], {
        queryParams: { request: encryptedString },
      });
    } else if (role === '101') {
      const route = '/dco';
      const requestData = { routeId: route };
      const encryptedString = this.encrypt(JSON.stringify(requestData));
      this.router.navigate(['/shared/passwordUpdate'], {
        queryParams: { request: encryptedString },
      });
    } else if (role === '201') {
      const route = '/dlco';
      const requestData = { routeId: route };
      const encryptedString = this.encrypt(JSON.stringify(requestData));
      this.router.navigate(['/shared/passwordUpdate'], {
        queryParams: { request: encryptedString },
      });
    } else if (role === '301') {
      const route = '/ceo';
      const requestData = { routeId: route };
      const encryptedString = this.encrypt(JSON.stringify(requestData));
      this.router.navigate(['/shared/passwordUpdate'], {
        queryParams: { request: encryptedString },
      });
    } else if (role === '302') {
      const route = '/Superriser';
      const requestData = { routeId: route };
      const encryptedString = this.encrypt(JSON.stringify(requestData));
      this.router.navigate(['/shared/passwordUpdate'], {
        queryParams: { request: encryptedString },
      });
    } else if (role === '303') {
      const route = '/technican';
      const requestData = { routeId: route };
      const encryptedString = this.encrypt(JSON.stringify(requestData));
      this.router.navigate(['/shared/passwordUpdate'], {
        queryParams: { request: encryptedString },
      });
    } else if (role === '401') {
      const route = '/mllic';
      const requestData = { routeId: route };
      const encryptedString = this.encrypt(JSON.stringify(requestData));
      this.router.navigate(['/shared/passwordUpdate'], {
        queryParams: { request: encryptedString },
      });
    } 
    else if (role === '501') {
      const route = '/dllic';
      const requestData = { routeId: route };
      const encryptedString = this.encrypt(JSON.stringify(requestData));
      this.router.navigate(['/shared/passwordUpdate'], {
        queryParams: { request: encryptedString },
      });
    }
    else if (role === '502') {
      const route = '/jc';
      const requestData = { routeId: route };
      const encryptedString = this.encrypt(JSON.stringify(requestData));
      this.router.navigate(['/shared/passwordUpdate'], {
        queryParams: { request: encryptedString },
      });
    }
    else if (role === '702') {
      const route = '/dccbhwv';
      const requestData = { routeId: route };
      const encryptedString = this.encrypt(JSON.stringify(requestData));
      this.router.navigate(['/shared/passwordUpdate'], {
        queryParams: { request: encryptedString },
      });
    }
  }

  /* HTTP  */
  DMSFileDownload(file: string): any {
    const resp = this.fileIdToBaseString(file);
    return resp;
  }

  baseUrl(): string {
    return environment.baseURL;
  }
   //url="https://authbook.in/APCOB/#/Tokenauthentication?id=";
   url="https://cooperation.ap.gov.in/APCOB/#/Tokenauthentication?id=";
  apcoburl():string{
    return this.url;
  }

  crystalReportsUrl(): string {
    return '';
  }
   

  crystalReportsUrlTech(): string {
    return "https://cooperation.ap.gov.in/crystalcops/";
   
  }
  getPostHttpOptions(): any {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.getToken(),
      }),
    };
    return httpOptions;
  }

  GswsPostHttpOptions1(): any {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }),
    };
    return httpOptions;
  }

  GswsPostHttpOptions(): any {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ` + this.getToken(),
      }),
    };
    return httpOptions;
  }

  getappdPostHttpOptions(): any {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
       
      }),
    };
    return httpOptions;
  }
  getGetHttpOptions(): any {
    const gethttpOptions = {
      headers: new HttpHeaders({
        Authorization: this.getToken(),
      }),
    };
    return gethttpOptions;
  }

  getToken(): string {
    let token = '';
    token = sessionStorage.getItem('accessToken') || '';
    return token;
  }

  parseJwt(token: string): any {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );

    return JSON.parse(jsonPayload);
  }

  catchResponse(error: any): void {
    console.log(error);
    if (error.status === 401) {
      sessionStorage.clear();
      this.router.navigate(['/shared/unAuthorized']);
    } else if (error.status === 403) {
      sessionStorage.clear();
      this.router.navigate(['/shared/unAuthorized']);
    } 
    else if (error.status >= 500 && error.status < 600) {
      sessionStorage.clear();
      this.router.navigate(['/shared/serviceUnavailable']);
    } 
    else if (error.status === 400) {
      alert("unAuthorized access");
    } 
    else {
      alert("Unknown Error");
    }
  }

  /* END HTTP */

  /* VALIDATIONS */

  isEmpty(data: string): boolean {
    if (data === null || data === undefined || data === '') {
      return true;
    }
    return false;
  }

  isNumber(data: string): boolean {
    if (this.isEmpty(data)) {
      return false;
    }

    const regexPattren = new RegExp('^[0-9]+([.][0-9]+)?$');
    const response = regexPattren.test(data);

    if (response) {
      return true;
    } else {
      return false;
    }
  }

  isValidName(data: string): boolean {
    if (this.isEmpty(data)) {
      return true;
    }

    const regexPattren = new RegExp(/[ `!@#$%^&*()_+\=\[\]{};':"\\|,.<>\/?~]/);
    const response = regexPattren.test(data);

    if (response) {
      return false;
    } else {
      return true;
    }
  }

  dateFormatConversion(date: any): string {
    let result = '';
    const tempVal = date.split('-');
    result = tempVal[2] + '-' + tempVal[1] + '-' + tempVal[0];
    return result;
  }

  indianNumberFormat(num: string): string {
    let lastThree = num.substring(num.length - 3);
    let otherNumbers = num.substring(0, num.length - 3);
    if (otherNumbers != '') {
      lastThree = ',' + lastThree;
    }
    const result =
      otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;
    return result;
  }

  mobileNumCheck(data: string): boolean {
    const response = String(data).match('[6-9]{1}[0-9]{9}');
    if (response) {
      const invalidNumbers = [
        '6666666666',
        '7777777777',
        '8888888888',
        '9999999999',
      ];

      for (let i = 0; i < invalidNumbers.length; i++) {
        if (data === invalidNumbers[i]) {
          return false;
        }
      }
      return true;
    } else {
      return false;
    }
  }

  panNumCheck(data: string): boolean {
    if (this.isEmpty(data)) {
      return false;
    }

    const regexPattren = new RegExp('^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$');
    const response = regexPattren.test(data);

    if (response) {
      return true;
    } else {
      return false;
    }
  }

  mailCheck(data: string): boolean {
    if (this.isEmpty(data)) {
      return false;
    }

    const regexPattren = new RegExp(
      '^([a-zA-Z0-9]+)([_.-{1}])?([a-zA-Z0-9]+)@([a-zA-Z0-9]+)([.])([a-zA-Z.]+)$'
    );
    const response = regexPattren.test(data);

    if (!response) {
      return true;
    } else {
      return false;
    }
  }

  isValidDate(data: string): boolean {
    if (this.isEmpty(data)) {
      return false;
    }

    const regexPattren = new RegExp(
      '^[1-2]{1}[0-9]{3}/([0]{1}[1-9]{1}|[1]{1}[0-2]{1})/([0]{1}[1-9]{1}|[1-2]{1}[0-9]{1}|[3]{1}[0-1]{1})$'
    );
    const response = regexPattren.test(data);

    if (response) {
      return true;
    } else {
      return false;
    }
  }

  /* END VALIDATIONS */

  /* ENCRYPTION */

  encryptionKeys(): any {
    return {
      key: '7061737323313233',
      iv: '7061737323313233',
    };
  }


  encryptionKeys_apcob(): any {
    return {
      key: '0123456789123456',
      iv: '0123456789123456',
    };
  }

  
  encrypt_apcob(input: string): string {
    //debugger;
    const keyVal = CryptoJS.enc.Utf8.parse(this.encryptionKeys_apcob().key);
    const ivVal = CryptoJS.enc.Utf8.parse(this.encryptionKeys_apcob().iv);
    const encrypted = CryptoJS.AES.encrypt(
      CryptoJS.enc.Utf8.parse(input),
      keyVal,
      {
        keySize: 128 / 8,
        iv: ivVal,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }
    ).toString();
    return encrypted;
  }

  decrypt_apcob(input: string): string {
    const keyVal = CryptoJS.enc.Utf8.parse(this.encryptionKeys_apcob().key);
    const ivVal = CryptoJS.enc.Utf8.parse(this.encryptionKeys_apcob().iv);
    const decrypted = CryptoJS.AES.decrypt(input, keyVal, {
      keySize: 128 / 8,
      iv: ivVal,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }).toString(CryptoJS.enc.Utf8);
    return decrypted;
  }

  




  encrypt(input: string): string {
    //debugger;
    const keyVal = CryptoJS.enc.Utf8.parse(this.encryptionKeys().key);
    const ivVal = CryptoJS.enc.Utf8.parse(this.encryptionKeys().iv);
    const encrypted = CryptoJS.AES.encrypt(
      CryptoJS.enc.Utf8.parse(input),
      keyVal,
      {
        keySize: 128 / 8,
        iv: ivVal,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }
    ).toString();
    return encrypted;
  }

  decrypt(input: string): string {
    const keyVal = CryptoJS.enc.Utf8.parse(this.encryptionKeys().key);
    const ivVal = CryptoJS.enc.Utf8.parse(this.encryptionKeys().iv);
    const decrypted = CryptoJS.AES.decrypt(input, keyVal, {
      keySize: 128 / 8,
      iv: ivVal,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }).toString(CryptoJS.enc.Utf8);
    return decrypted;
  }

  /* END ENCRYPTION */

  /* DATATABLES */

  dataTableOptions(): any {
    return {
      pagingType: 'full_numbers',
      pageLength: 26,
      lengthMenu: [
        [10, 15, 26, 50, -1],
        [10, 15, 26, 50, 'ALL'],
      ],
      // autoWidth:true,
      //  scrollX:true,
      //  scrollY:true,
      //  //fixedColumns:true,
      //  fixedHeader:true,
      //  scrollCollapse:true 
    };
  }
  dataTableOptions1(): any {
    return {
      pagingType: 'full_numbers',
      pageLength: 15,
      lengthMenu: [
        [10, 15, 25, 50, -1],
        [10, 15, 25, 50, 'ALL'],
      ],
    };
  }
  /* END DATATABLES */

  /* FILES */

  encodedString(event: any, fileType: string, size: number) {
    return new Promise((resolve, reject) => {
      if (event.target.files.length > 0) {
        if (
          event.target.files[0].type === 'image/jpeg' &&
          fileType === this.fileType.IMAGE
        ) {
          if (event.target.files[0].size < size) {
            const file: File = event.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
          } else {
            if (size === this.fileSize.twentyKB) {
              alert('Uploaded image must be less than 20KB');
            } else if (size === this.fileSize.thirtyKB) {
              alert('Uploaded image must be less than 30KB');
            } else if (size === this.fileSize.hundredKB) {
              alert('Uploaded image must be less than 100KB');
            } else if (size === this.fileSize.twoHundredKB) {
              alert('Uploaded image must be less than 200KB');
            } else if (size === this.fileSize.oneMB) {
              alert('Uploaded image must be less than 1MB');
            }
            event.target.value = '';
          }
        } else if (
          event.target.files[0].type === 'application/pdf' &&
          fileType === this.fileType.PDF
        ) {
          if (event.target.files[0].size < size) {
            const file: File = event.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
          } else {
            if (size === this.fileSize.twentyKB) {
              alert('Uploaded file must be less than 20KB');
            } else if (size === this.fileSize.thirtyKB) {
              alert('Uploaded file must be less than 30KB');
            } else if (size === this.fileSize.hundredKB) {
              alert('Uploaded file must be less than 100KB');
            } else if (size === this.fileSize.twoHundredKB) {
              alert('Uploaded file must be less than 200KB');
            } else if (size === this.fileSize.oneMB) {
              alert('Uploaded file must be less than 1MB');
            }
            event.target.value = '';
          }
        } else {
          alert('Invalid File Format !!!');
          event.target.value = '';
        }
      } else {
        alert('file is Empty !!!, Please try again.');
        event.target.value = '';
      }
    });
  }

  fileUploadEncodedString(event: any, size: number) {
    return new Promise((resolve, reject) => {
      if (event.target.files[0].type === 'image/jpeg') {
        if (event.target.files[0].size < size) {
          const file: File = event.target.files[0];
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
        } else {
          if (size === this.fileSize.twentyKB) {
            alert('Uploaded image must be less than 20KB');
          } else if (size === this.fileSize.thirtyKB) {
            alert('Uploaded image must be less than 30KB');
          } else if (size === this.fileSize.hundredKB) {
            alert('Uploaded image must be less than 100KB');
          }
           else if (size === this.fileSize.twoHundredKB) {
            alert('Uploaded image must be less than 200KB');
          } 
           else if (size === this.fileSize.twoHundredFiftyKB) {
            alert('Uploaded image must be less than 250KB');
          } 
          else if (size === this.fileSize.oneMB) {
            alert('Uploaded image must be less than 1MB');
          }
          else if (size === this.fileSize.twoMB) {
            alert('Uploaded image must be less than 2MB');
          }
          else if (size === this.fileSize.threeMB) {
            alert('Uploaded image must be less than 3MB');
          }
          event.target.value = '';
        }
      } else if (event.target.files[0].type === 'application/pdf') {
        if (event.target.files[0].size < size) {
          const file: File = event.target.files[0];
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
        } else {
          if (size === this.fileSize.twentyKB) {
            alert('Uploaded file must be less than 20KB');
          } else if (size === this.fileSize.thirtyKB) {
            alert('Uploaded file must be less than 30KB');
          } else if (size === this.fileSize.hundredKB) {
            alert('Uploaded file must be less than 100KB');
          } else if (size === this.fileSize.twoHundredKB) {
            alert('Uploaded file must be less than 200KB');
          } 
          else if (size === this.fileSize.oneMB) {
            alert('Uploaded file must be less than 1MB');
          }
          else if (size === this.fileSize.twoMB) {
            alert('Uploaded file must be less than 2MB');
          }
          else if (size === this.fileSize.threeMB) {
            alert('Uploaded file must be less than 3MB');
          }
          event.target.value = '';
        }
      } else {
        alert('Invalid File Format !!!');
        event.target.value = '';
      }
    });
  }


  downloadPdfFile(input: string, fileName: string): void {
    const linkSource = `data:application/pdf;base64,${input}`;
    const downloadLink = document.createElement('a');
    fileName = fileName + '.pdf';
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }

  viewPDF(input: string): void {
    let pdfWindow = window.open('', '_blank');
    if (pdfWindow) {
      input = input.replace('dataapplication/pdfbase64', '');
      pdfWindow.document.write(
        `<iframe width='100%' height='100%' src='data:application/pdf;base64, ${encodeURI(
          input
        )}'></iframe>`
      );
    }
  }

  viewImage(input: string): void {
    var image = new Image();
    debugger;
    image.src = 'data:image/jpg;base64,' + input;
    var w = window.open(
      '',
      '_blank',
      'toolbar=yes,scrollbars=yes,resizable=yes,top=200,left=500,width=600,height=400'
    );
    if (w) {
      w.document.write(image.outerHTML);
    }
  }

  viewJPVImage(input: string): void {
    const requestData = {
      FileName: input,
    };
debugger;
    const encryptedString = this.encrypt(JSON.stringify(requestData));
    const url ='https://cooperation.ap.gov.in/jpv/#/shared/viewPDF?request='+input;
      
      encodeURIComponent(encryptedString);
    window.open(url, '_Blank');
  }
  viewJPVImagecop(input: string): void {
    // const requestData = {
    //   FileName: input,
    // };

    //const encryptedString = this.encrypt(JSON.stringify(requestData));
    const url =
      'https://apicooperation.ap.gov.in/copsBackend/' +input;
      //encodeURIComponent(encryptedString);
    window.open(url, '_Blank');
  }

  viewJPVPDF(input: string): void {
   
    const requestData = {
      FileName: input,
    };
debugger
    const encryptedString = this.encrypt(JSON.stringify(requestData));
    const url =
      'https://cooperation.ap.gov.in/jpv/#/shared/viewPDF?request=' +
      encodeURIComponent(encryptedString);
    window.open(url, '_Blank');
  }


  LATET_viewJPVPDF(input: string): void {
    debugger
    const requestData = {
      FileName: input,
    };

    const encryptedString = this.encrypt(JSON.stringify(requestData));
    const url =
      
      encodeURIComponent(encryptedString);
    window.open(input, '_Blank');
  }
  viewJPVPDFcop(input: string): void {
//     const requestData = {
//       FileName: input,
//     };
// debugger
//     const encryptedString = this.encrypt(JSON.stringify(requestData));
    const url =
      'https://apicooperation.ap.gov.in/copsBackend/' +input;
     // encodeURIComponent(encryptedString);
    window.open(url, '_Blank');
  }


  viewJPVPDFcopcrystal(input: string): void {
    //     const requestData = {
    //       FileName: input,
    //     };
    // debugger
    //     const encryptedString = this.encrypt(JSON.stringify(requestData));
    debugger;
        const url =
          ' https://cooperation.ap.gov.in/crystalcops/' +input;
         // encodeURIComponent(encryptedString);
        window.open(url, '_Blank');
      }

  JSONToxlxsConvertor(JSONData :any, ReportTitle: any, ShowLabel : any): void {
     //JSONTO EXCEL CONVERTOR
    debugger;
  
    const workBook = XLSX.utils.book_new(); // create a new blank book
    const workSheet = XLSX.utils.json_to_sheet(JSONData);

    XLSX.utils.book_append_sheet(workBook, workSheet, 'data'); // add the worksheet to the book
    // XLSX.writeFile(workBook, 'temp.xlsx');
    const FileName = ReportTitle + ".xlsx"
    XLSX.writeFile(workBook, FileName);


}

  JSONToCSVConvertor(JSONData: any, ReportTitle: string, ShowLabel: any): void {
    // If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    const arrData =
      typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;

    let CSV = 'sep=,' + '\r\n\n';

    // This condition will generate the Label/Header
    if (ShowLabel) {
      let row = '';

      // This loop will extract the label from 1st index of on array
      for (let index in arrData[0]) {
        // Now convert each value to string and comma-seprated
        row += index + ',';
      }

      row = row.slice(0, -1);

      // append Label row with line break
      CSV += row + '\r\n';
    }

    // 1st loop is to extract each row
    for (let i = 0; i < arrData.length; i++) {
      let row = '';

      // 2nd loop will extract each column and convert it in string comma-seprated
      for (let index in arrData[i]) {
        row += '"' + arrData[i][index] + '",';
      }

      row.slice(0, row.length - 1);

      // add a line break after each row
      CSV += row + '\r\n';
    }

    if (CSV == '') {
      alert('Invalid data');
      return;
    }

    // Generate a file name
    let fileName = '';
    // this will remove the blank-spaces from the title and replace it with an underscore
    fileName += ReportTitle.replace(/ /g, '_');

    // Initialize file format you want csv or xls
    const uri = 'data:text/csv;charset=utf-8,' + escape(CSV);

    // Now the little tricky part.
    // you can use either>> window.open(uri);
    // but this will not work in some browsers
    // or you will not get the correct file extension

    // this trick will generate a temp <a /> tag
    const link = document.createElement('a');
    link.href = uri;

    // set the visibility hidden so it will not effect on your web-layout

    // link.style = 'visibility:hidden';
    link.download = fileName + '.csv';

    // this part will append the anchor tag and remove it after automatic click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  /* END FILES */

  /* OTHERS */

  getRandomId(): string {
    return Math.random().toString().slice(2, 12);
  }

  /* END OTHERS */

  /* VERHOEFF ALGORITHM */

  validateVerhoeff(num: any): boolean {
    if (this.isEmpty(num)) {
      return false;
    }
    num = num.toString();
    if (num.length !== 12) {
      return false;
    }
    if (
      num === '333333333333' ||
      num === '666666666666' ||
      num === '999999999999'
    ) {
      return false;
    }

    const d = [
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
      [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
      [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
      [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
      [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
      [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
      [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
      [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
      [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
    ];

    // The permutation table
    const p = [
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
      [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
      [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
      [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
      [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
      [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
      [7, 0, 4, 6, 9, 1, 3, 2, 5, 8],
    ];

    // The inverse table
    const inv = [0, 4, 3, 2, 1, 5, 6, 7, 8, 9];

    let cc;
    let c = 0;
    const myArray = this.StringToReversedIntArray(num);
    for (let i = 0; i < myArray.length; i++) {
      c = d[c][p[i % 8][myArray[i]]];
    }
    cc = c;
    if (cc === 0) {
      return true;
    } else {
      return false;
    }
  }

  /*
   * Converts a string to a reversed integer array.
   */
  StringToReversedIntArray(num: any): any {
    let myArray = [num.length];
    for (let i = 0; i < num.length; i++) {
      myArray[i] = num.substring(i, i + 1);
    }
    myArray = this.Reverse(myArray);
    return myArray;
  }

  /*
   * Reverses an int array
   */
  Reverse(myArray: any): any {
    const reversed = [myArray.length];
    for (let i = 0; i < myArray.length; i++) {
      reversed[i] = myArray[myArray.length - (i + 1)];
    }
    return reversed;
  }


  JSONToXlsxConvertor(JSONData:any, ReportTitle:any, ShowLabel:any): void {
    //JSONTO EXCEL CONVERTOR
    const workBook = XLSX.utils.book_new(); // create a new blank book
    const workSheet = XLSX.utils.json_to_sheet(JSONData);

    XLSX.utils.book_append_sheet(workBook, workSheet,'data'); // add the worksheet to the book
    const FileName = ReportTitle + ".xlsx"
    XLSX.writeFile(workBook, FileName);


    }

  getbsdatepicker(){

    return Object.assign(
      {},
      {
        containerClass: 'theme-dark-blue',
        dateInputFormat: 'DD-MM-YYYY',
        showWeekNumbers: false
      }
    );

  }

  maskAadharNumber(aadhar: string): string {
    debugger;
    if (aadhar.length <= 8) {
        return aadhar.replace(/./g, 'X');
    }
    return 'XXXXXXXX' + aadhar.slice(8);
}

ValueGet(event: any) {
    const inputElement = event.target as HTMLInputElement;
    return inputElement.value;
}
  /* END VERHOEFF ALGORITHM */

  ApcobPostHttpOptions(): any {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        apikey : 'BE49B74A634EE90BC1B4C01CDFEE9B6D7EB6630C',
        version : '1.0.0'
      }),
    };
    return httpOptions;
  }
}
