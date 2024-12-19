import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry } from 'rxjs/operators';
import { UtilsService } from 'src/app/sharedModule/services/utils.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseURL = '';

  constructor(private httpClient: HttpClient, private utils: UtilsService) {
    this.baseURL = utils.baseUrl() + 'login/';
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
       
    }),
  };
  getappdPostHttpOptions(): any {
   
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
       
      }),
    };
    return httpOptions;
  }
  public getCaptcha(req: any): Promise<any> {
     
     //let dataAsString = JSON.stringify(req);
    //let obj=this.utils.encrypt(dataAsString);
   // const reqenc = {
    //  encdata:obj
    //};
   
    const result: any = this.httpClient
      .post(
        `${this.baseURL}getCaptcha`,
        req,
        
        this.utils.getappdPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public token(req: any): Promise<any> {
    const result: any = this.httpClient
      .post(`${this.baseURL}userLogin`, req, this.httpOptions)
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }



  //02042024
  // public CeoAadharotp1(req: any) {
  //   const result: any = this.httpClient
  //     .post(`https://apiapddcf.ap.gov.in/ysrspBackend/api/Gsws/UidCheckAadhaarOTP`, req, this.utils.GswsPostHttpOptions())
  //     .pipe(retry(2))
  //     .toPromise();
  //   return result;
  // }
//SRINIVAS
  public CeoAadharotp1(req: any) {    
if(this.utils.env.prod==0)
  {
    const result1: any = this.httpClient
    .post(`https://apiapddcf.ap.gov.in/ysrspBackend/api/Gsws/UidCheckAadhaarOTP`, req, this.utils.GswsPostHttpOptions())
    .pipe(retry(2))
    .toPromise();
  return result1; 
  }
  else{
    const result: any = this.httpClient       
      .post(
        `https://cooperation.ap.gov.in/crystalcops/api/Gsws/UidCheckAadhaarOTP`,
        req,
        this.utils.GswsPostHttpOptions()         
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
      debugger;
    return result;
  }
    
  }

 
  public CeoAadharotp(req: any) {    
    const result: any = this.httpClient       
      .post(
        `https://cooperation.ap.gov.in/crystalcops/api/Gsws/UidCheckAadhaarOTP`,
        req,
        this.utils.getappdPostHttpOptions()         
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
      debugger;
    return result;
    
  }

  public AadharStatus(req: any): Promise<any> {
    const result: any = this.httpClient
      .post(`${this.baseURL}AadharStatus`, req, this.httpOptions)
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public AadharuserLogin(req: any): Promise<any> {
    const result: any = this.httpClient
      .post(`${this.baseURL}AadharuserLogin`, req, this.httpOptions)
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }


}
