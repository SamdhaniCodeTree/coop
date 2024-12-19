import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry } from 'rxjs/operators';
import { UtilsService } from 'src/app/sharedModule/services/utils.service';

@Injectable({
  providedIn: 'root'
})
export class DlcoService {
  baseURL = '';

  constructor(private httpClient: HttpClient, private utils: UtilsService) {
    this.baseURL = utils.baseUrl() + 'dlco/';
  }

  public pacsSub(req: any) {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}pacsSub`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public pacCEOSub(req: any) {
    const result: any = this.httpClient
      .post(
        `https://apicooperation.ap.gov.in/copsBackend/mobapi/ProfileSub`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public pacCEOUpdate(req: any) {
    const result: any = this.httpClient
      .post(
        `https://apicooperation.ap.gov.in/copsBackend/mobapi/ProfileSub`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public ceoDetailsByPacId(req: any): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}ceoDetailsByPacId`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public ceoListByUniqueId(req: any) {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}ceoListByUniqueId`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public ceoResendPassword(req: any) {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}ceoResendPassword`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public pacListByUniqueId(req: any) {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}pacListByUniqueId`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public pacNameCheck(req: any) {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}pacNameCheck`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public SocietiesRegistrationIns(req: any) {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}SocietiesRegistrationIns`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
//Society Reg Dropdown list 
  public DropdownlistSocietyDetails(req: any) {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}DropdownlistSocietyDetails`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
//Socity Insert
  public SocietyRegistrationAct(req: any) {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}SocietyRegistrationAct`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }




}
