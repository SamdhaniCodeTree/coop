import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry } from 'rxjs/operators';
import { UtilsService } from 'src/app/sharedModule/services/utils.service';

@Injectable({
  providedIn: 'root',
})
export class MpfcLandInspectionService {
  pacsLandInspectionURL = '';
  pacssharedURL = '';
  pacsLandInspectionU = '';
  TechMgrUrl = '';

  constructor(private httpClient: HttpClient, private utils: UtilsService) {
    this.pacsLandInspectionURL = utils.baseUrl() + 'report/';
    this.pacssharedURL = utils.baseUrl() + 'shared/';
    this.pacsLandInspectionU = utils.baseUrl() + 'dllic/';
    this.TechMgrUrl = utils.crystalReportsUrlTech() + 'api/TechMgr/';
  }

  public mpfcLandInspectionStateReport(req: any): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.pacsLandInspectionURL}mpfcLandInspectionStateReport`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public mpfcLandInspectionDistrictReport(req: any): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.pacsLandInspectionURL}mpfcLandInspectionDistrictReport`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public mpfcLandInspectionMandalReport(req: any): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.pacsLandInspectionURL}mpfcLandInspectionMandalReport`,
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
        `${this.pacsLandInspectionURL}inspectionDetailsById`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public foundationDetailsById(req: any) {
    const result: any = this.httpClient
      .post(
        `${this.pacsLandInspectionURL}foundationDetailsById`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
    debugger;
  }
  public Packsstatus(req: any) {
    const result: any = this.httpClient
      .post(
        `${this.pacssharedURL}pacsstatus`,
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
        `${this.pacsLandInspectionURL}inspectionDetailsSub`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public questionsList() {
    const result: any = this.httpClient
      .get(`${this.pacsLandInspectionURL}questionsList`, this.utils.getGetHttpOptions())
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public handoverfileupload(req: any) {
    const result: any = this.httpClient
      .post(
        `${this.pacssharedURL}handoverfileupload`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  //05092024

  public TechManagerGet(req: any) {
    const result: any = this.httpClient
      .post(
        `${this.TechMgrUrl}TechManagerGet`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public TechManagerDetailsIns(req: any) {
    const result: any = this.httpClient
      .post(
        `${this.TechMgrUrl}TechManagerDetailsIns`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public TechManagerDetailsupdate(req: any) {
    const result: any = this.httpClient
      .post(
        `${this.TechMgrUrl}TechManagerDetailsupdate`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public ShreeInfoSystemSolutionsPayment(req: any) {
    const result: any = this.httpClient
      .post(
        `${this.TechMgrUrl}ShreeInfoSystemSolutionsPayment`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public InternetDetailsIns(req: any) {
    const result: any = this.httpClient
      .post(
        `${this.TechMgrUrl}InternetDetailsIns`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
}
