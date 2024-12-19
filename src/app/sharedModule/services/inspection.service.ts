import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry } from 'rxjs/operators';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class InspectionService {

  baseURL = '';

  constructor(private httpClient: HttpClient, private utils: UtilsService) {
    this.baseURL = utils.baseUrl() + 'dllic/';
  }

  public committeInspectionDashboard(req: any) {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}committeInspectionDashboard`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public committeInspectionList(req: any) {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}committeInspectionList`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public submittedQuestionsList(req: any) {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}submittedQuestionsList`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public committeInspectionUpdate(req: any) {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}committeInspectionUpdate`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public inspectionDetailsById(req: any) {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}inspectionDetailsById`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public inspectionDetailsSub(req: any) {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}inspectionDetailsSub`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public questionSub(req: any) {
    const result: any = this.httpClient
      .post(`${this.baseURL}questionSub`, req, this.utils.getPostHttpOptions())
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public dllicApprovalSub(req: any) {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}dllicApprovalSub`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public leaseDocumentSub(req: any) {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}leaseDocumentSub`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public questionsList() {
    const result: any = this.httpClient
      .get(`${this.baseURL}questionsList`, this.utils.getGetHttpOptions())
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public foundationDetailsById(req: any) {
    debugger;
    const result: any = this.httpClient
      .post(
        `${this.baseURL}foundationDetailsById`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public constructionQuestionsList(req: any) {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}constructionQuestionsList`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public foundationSub(req: any) {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}foundationSub`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public superStructureDetailsById(req: any) {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}superStructureDetailsById`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public superStructureSub(req: any) {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}superStructureSub`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public finishingDetailsById(req: any) {
    debugger;
    const result: any = this.httpClient
      .post(
        `${this.baseURL}finishingDetailsById`,
        req,
        this.utils.getPostHttpOptions()
       
      )
           .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public finishingSub(req: any) {
    const result: any = this.httpClient
      .post(`${this.baseURL}finishingSub`, req, this.utils.getPostHttpOptions())
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

//06072023
 

  public GodowanCerHandOver(req: any) {
    
    const result: any = this.httpClient
      // .post(
      //   `https://cooperation.ap.gov.in/crystalReportsBackend/api/landAllot/HandOverpossessionCertificate`,
      //   req,
      //   this.utils.getappdPostHttpOptions()
      // )
      .post(
        `https://cooperation.ap.gov.in/crystalcops/api/landAllot/GodowanCerHandOver`,
        req,
        this.utils.getappdPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
      debugger;
    return result;
    
  }

 
}
