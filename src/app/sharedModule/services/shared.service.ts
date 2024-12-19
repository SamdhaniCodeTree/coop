import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilsService } from './utils.service';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  baseURL = '';
  adminbaseURL = '';
  ReportadminbaseURL = '';
  calibrationPacsURL = '';
  CeobaseURL = '';

  constructor(private httpClient: HttpClient, private utils: UtilsService) {
    this.baseURL = utils.baseUrl() + 'shared/';
    this.adminbaseURL = utils.baseUrl() + 'admin/';
    this.ReportadminbaseURL = utils.baseUrl() + 'report/';
    this.calibrationPacsURL = utils.crystalReportsUrlTech() + 'api/TechMgr/';
    this.CeobaseURL = utils.baseUrl() + 'ceo/';
  }

  public refreshToken(): Promise<any> {
    const result: any = this.httpClient
      .get(`${this.baseURL}refreshToken`, this.utils.getGetHttpOptions())
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public fileDownload(req: any) {
    const result: any = this.httpClient
      .post(`${this.baseURL}fileDownload`, req, this.utils.getPostHttpOptions())
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public adminuserlist(req: any) {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}adminuserlist`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }  
  public adminpasswordUpdate(req: any) {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}admnpasswordreset`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
    
  }
  public adminpacksist(req: any) {
     
    const result: any = this.httpClient
      .post(
        `${this.baseURL}copsocimaster`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public passwordUpdate(req: any) {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}passwordUpdate`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
    
  }

  public logout(req: any): Promise<any> {
    const result: any = this.httpClient
      .post(`${this.baseURL}logout`, req, this.utils.getPostHttpOptions())
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public districtList(): Promise<any> {
    const result: any = this.httpClient
      .get(`${this.baseURL}districtList`, this.utils.getGetHttpOptions())
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public divisionList(req: any): Promise<any> {
    const result: any = this.httpClient
      .post(`${this.baseURL}divisionList`, req, this.utils.getPostHttpOptions())
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public mandalList(req: any): Promise<any> {
    const result: any = this.httpClient
      .post(`${this.baseURL}mandalList`, req, this.utils.getPostHttpOptions())
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public pacsList(req: any): Promise<any> {
    const result: any = this.httpClient
      .post(`${this.baseURL}pacsList`, req, this.utils.getPostHttpOptions())
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public villageList(req: any): Promise<any> {
    const result: any = this.httpClient
      .post(`${this.baseURL}villageList`, req, this.utils.getPostHttpOptions())
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public pacsNotAssignedVillageList(req: any): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}pacsNotAssignedVillageList`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public packsmandalList(req: any): Promise<any> {
    const result: any = this.httpClient
      .post(`https://apicooperation.ap.gov.in/copsBackend/mobapi/mobpackslist`, req, this.utils.getPostHttpOptions())
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public sergeotaglist(req: any) {
    const result: any = this.httpClient
      .post(
        `https://apicooperation.ap.gov.in/copsBackend/mobapi/packgeolist`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public sergeotagsubmit(req: any) {
    const result: any = this.httpClient
      .post(
        `https://apicooperation.ap.gov.in/copsBackend/mobapi/packSub`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  //Procedure Name : cs_ins_empregistration
  public Hrmsemp(req: any) {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}hrmsmodule`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  } 
  public applicantsubmit(req: any) {
    const result: any = this.httpClient
      .post(
        `https://apicooperation.ap.gov.in/copsBackend/mobapi/socictyreg`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }


  //Procedure Name : CS_MASTER_GET_PROC
  public SocietyMasterList(req: any): Promise<any> {
    const result: any = this.httpClient
      .post(`${this.baseURL}SocietyMasterList`, req, this.utils.getPostHttpOptions())
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public SocietyRegistrationAct(req: any): Promise<any> {
    const result: any = this.httpClient
      .post(`${this.baseURL}SocietyRegistrationAct`, req, this.utils.getPostHttpOptions())
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public OfficeDetailsGet(req: any) {
    const result: any = this.httpClient
      .post(`${this.ReportadminbaseURL}OfficeDetailsGet`, req, this.utils.getPostHttpOptions())
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public EmployeeDetailsIns(req: any) {
    const result: any = this.httpClient
      .post(`${this.ReportadminbaseURL}EmployeeDetailsIns`, req, this.utils.getPostHttpOptions())
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public apcobinsertdata(req: any) {
    const result: any = this.httpClient
      .post(`https://cooperation.ap.gov.in/crystalcops/api/Gsws/apCobDetails`, req, this.utils.getPostHttpOptions())
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  //Procedure Name : CS_INS_GET_DETAILS
  public TechManagerGet(req: any) {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}TechManagerGet`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  } 


// Pacs Data Changes insert data in apcob dept
  public apcobDatainsert(req: any): Promise<any> {
    const result: any = this.httpClient
      .post(`${this.baseURL}SocietyMasterList`, req, this.utils.ApcobPostHttpOptions())
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public apcobDatainsert1(req: any): Promise<any> {
    const result: any = this.httpClient
      .post(`https://apicooperation.ap.gov.in/APCOBAPI/ThirdParty/changepassword`, req, this.utils.ApcobPostHttpOptions())
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }


  public CalibrationPacsReports(req: any) {
    const result: any = this.httpClient
      .post(
        `${this.calibrationPacsURL}CalibrationPacsReports`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  } 
  public HardwarePaymentTotalReport(req: any) {
    const result: any = this.httpClient
      .post(
        `${this.calibrationPacsURL}HardwarePaymentTotalReport`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  } 
  public HardwarePaymentsTotalsclickReport(req: any) {
    const result: any = this.httpClient
      .post(
        `${this.calibrationPacsURL}HardwarePaymentsTotalsclickReport`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  } 
  public TransactionidHardwarePaymentReport(req: any) {
    const result: any = this.httpClient
      .post(
        `${this.calibrationPacsURL}TransactionidHardwarePaymentReport`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  } 
}
