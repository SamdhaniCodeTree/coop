import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry } from 'rxjs/operators';
import { UtilsService } from 'src/app/sharedModule/services/utils.service';

@Injectable({
  providedIn: 'root',
})
export class DcoService {
  baseURL = '';

  constructor(private httpClient: HttpClient, private utils: UtilsService) {
    this.baseURL = utils.baseUrl() + 'dco/';
  }

  public ceoListByMandalId(req: any) {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}ceoListByMandalId`,
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

  public pacListByMandalId(req: any) {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}pacListByMandalId`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public villagesListByPACId(req: any) {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}villagesListByPACId`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public nregaActivitiesList() {
    const result: any = this.httpClient
      .get(`${this.baseURL}nregaActivitiesList`, this.utils.getGetHttpOptions())
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public landInspectionDetailsByVillageId(req: any) {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}landInspectionDetailsByVillageId`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public mandalReportUpdation(req: any) {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}mandalReportUpdation`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public nregaRecommendationUpdation(req: any) {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}nregaRecommendationUpdation`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public workAllotmentCompletionUpdation(req: any) {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}workAllotmentCompletionUpdation`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public landReadyForConstructionUpdation(req: any) {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}landReadyForConstructionUpdation`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
}
