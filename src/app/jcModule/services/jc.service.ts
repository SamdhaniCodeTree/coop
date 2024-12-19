import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry } from 'rxjs/operators';
import { UtilsService } from 'src/app/sharedModule/services/utils.service';

@Injectable({
  providedIn: 'root',
})
export class JcService {
  baseURL = '';
  crystalBaseURL = '';
  crystalBaseURLhandover = '';

  constructor(private httpClient: HttpClient, private utils: UtilsService) {
    this.baseURL = utils.baseUrl() + 'jc/';
    this.crystalBaseURL = utils.crystalReportsUrl() + 'api/landAllotment/';
    this.crystalBaseURLhandover = utils.crystalReportsUrl();
  }
  
   
  public possessionHandOverCertificate(req: any) {
    
    const result: any = this.httpClient
      // .post(
      //   `https://cooperation.ap.gov.in/crystalReportsBackend/api/landAllot/HandOverpossessionCertificate`,
      //   req,
      //   this.utils.getappdPostHttpOptions()
      // )
      .post(
        `https://cooperation.ap.gov.in/crystalcops/api/landAllot/possessionCertificateHandOver`,
        req,
        this.utils.getappdPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
    
  }
  public pacsMandalListByDistrictId(req: any) {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}pacsMandalListByDistrictId`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public pacsMandalListByDistrictIdphase(req: any) {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}pacsMandalListByDistrictIdphase`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public pacsRbkListByMandalId(req: any) {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}pacsRbkListByMandalId`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public pacsvillageListByRbkId(req: any) {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}pacsvillageListByRbkId`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public pacsLandAllocationStatus(req: any) {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}pacsLandAllocationStatus`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public pacsLandAllocationStatusphase(req: any) {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}pacsLandAllocationStatusphase`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public pacsLandAllotmentSub(req: any) {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}pacsLandAllotmentSub`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public pacsLandAllotmentSubphase(req: any) {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}pacsLandAllotmentSubphase`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public pacsPossessionTakenDetails(req: any) {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}pacsPossessionTakenDetails`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public pacsPossessionTakenDetailsphase(req: any) {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}pacsPossessionTakenDetailsphase`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public pacsLandHandOverSub(req: any) {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}pacsLandHandOverSub`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public pacsLandHandOverSubphase(req: any) {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}pacsLandHandOverSubphase`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public pacsPossessionCertificate(req: any) {
    const result: any = this.httpClient
      .post(
        `${this.crystalBaseURL}pacsPossessionCertificate`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public pacsPossessionCertificatephase(req: any) {
    const result: any = this.httpClient
      .post(
        `${this.crystalBaseURL}pacsPossessionCertificatephase`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  //phase two
  public pacsLandAllotmentSubphaseTwoins(req: any) {
    debugger;
    const result: any = this.httpClient
      .post(
        `${this.baseURL}pacsLandAllotmentSubphaseTwoins`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public MasterDetailsInsert(req: any): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}MasterDetailsInsert`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  
}
