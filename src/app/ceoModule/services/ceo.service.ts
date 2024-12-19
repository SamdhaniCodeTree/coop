import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry } from 'rxjs/operators';
import { UtilsService } from 'src/app/sharedModule/services/utils.service';

@Injectable({
  providedIn: 'root',
})
export class CeoService {
  baseURL = '';
  baseURL_Share = '';

  constructor(private httpClient: HttpClient, private utils: UtilsService) {
    this.baseURL = utils.baseUrl() + 'ceo/';
    this.baseURL_Share = utils.baseUrl() + 'shared/';
    
  }

  public dcmsInfoSub(req: any) {
    const result: any = this.httpClient
      .post(`${this.baseURL}dcmsInfoSub`, req, this.utils.getPostHttpOptions())
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public dcmsInfoByPacId(req: any) {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}dcmsInfoByPacId`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public pacInspectionSub(req: any) {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}pacInspectionSub`,
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

  public pacsLandInspectionQuestionsList() {
    const result: any = this.httpClient
      .get(
        `${this.baseURL}pacsLandInspectionQuestionsList`,
        this.utils.getGetHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  // public SitePreparationSub() {
  //   const result: any = this.httpClient
  //     .get(
  //       `${this.baseURL}SitePreparationSub`,
  //       this.utils.getGetHttpOptions()
  //     )
  //     .pipe(retry(this.utils.env.API_RETRY_COUNT))
  //     .toPromise();
  //   return result;
  // }

  public SitePreparationSub(req: any) {
    const result: any = this.httpClient
      .post(`${this.baseURL}SitePreparationSub`, req, this.utils.getPostHttpOptions())
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public calibrationDetailsSub(req: any) {
    const result: any = this.httpClient
      .post(`${this.baseURL}calibrationDetailsSub`, req, this.utils.getPostHttpOptions())
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public calibrationDeviceDetails(req: any) {
    const result: any = this.httpClient
      .post(`${this.baseURL}calibrationDeviceDetails`, req, this.utils.getPostHttpOptions())
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public calibrationDeviceDetailsupdate(req: any) {
    const result: any = this.httpClient
      .post(`${this.baseURL}calibrationDeviceDetailsupdate`, req, this.utils.getPostHttpOptions())
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public SitepreperationDetailsupdate(req: any) {
    const result: any = this.httpClient
      .post(`${this.baseURL}SitepreperationDetailsupdate`, req, this.utils.getPostHttpOptions())
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }



  public CalibrationDetails(req: any) {    
    const result: any = this.httpClient       
      .post(
        `https://cooperation.ap.gov.in/crystalcops/api/landAllot/DeviceVerificationCert`,
        req,
        this.utils.getappdPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
      debugger;
    return result;
    
  }
  //05032024

  public CeoInfoSubDetails(req: any) {
    const result: any = this.httpClient
      .post(`${this.baseURL}CeoInfoSubDetails`, req, this.utils.getPostHttpOptions())
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public CeoDeviceSubDetails(req: any) {
    const result: any = this.httpClient
      .post(`${this.baseURL}CeoDeviceSubDetails`, req, this.utils.getPostHttpOptions())
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public OfficeDetailsGet(req: any) {
    const result: any = this.httpClient
      .post(`${this.baseURL}OfficeDetailsGet`, req, this.utils.getPostHttpOptions())
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  //26032024
  public SitePrectionDetails(req: any) {    
    const result: any = this.httpClient       
      .post(
        `https://cooperation.ap.gov.in/crystalcops/api/landAllot/SiteInspectionPackCert`,
        req,
        this.utils.getappdPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
      debugger;
    return result;
    
  }


  public SuperriserDetails(req: any) {    
    const result: any = this.httpClient       
      .post(
        `https://cooperation.ap.gov.in/crystalcops/api/landAllot/DeviceVerificationCert`,
        req,
        this.utils.getappdPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
      debugger;
    return result;
    
  }


  public calibrationDeviceDetailsupdate11(req: any) {
    const result: any = this.httpClient
      .post(`${this.baseURL}calibrationDeviceDetailsupdate`, req, this.utils.getPostHttpOptions())
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public SuperDetailsupdate(req: any) {
    const result: any = this.httpClient
      .post(`${this.baseURL_Share}SuperupdateFile`, req, this.utils.getPostHttpOptions())
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public DMTupdateFile(req: any) {
    const result: any = this.httpClient
      .post(`${this.baseURL_Share}DMTupdateFile`, req, this.utils.getPostHttpOptions())
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
//Procedure Name : CS_CALIBRATION_REGI_INS
  public CalibrationDetailsIns(req: any) {
    const result: any = this.httpClient
      .post(`${this.baseURL}CalibrationDetailsIns`, req, this.utils.getPostHttpOptions())
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public CalibrationDetailsEdit(req: any) {
    const result: any = this.httpClient
      .post(`${this.baseURL}CalibrationDetailsEdit`, req, this.utils.getPostHttpOptions())
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public CalibrationDetailsInsert(req: any) {    
    const result: any = this.httpClient       
      .post(
        `https://cooperation.ap.gov.in/crystalcops/api/CeoReports/CalibrationDetailsIns`,
        req,
        this.utils.getappdPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise(); 
    return result;
    
  }

  public DeviceVerificationCert(req: any) {    
    const result: any = this.httpClient       
      .post(
        `https://cooperation.ap.gov.in/crystalcops/api/landAllot/DeviceVerificationCert`,
        req,
        this.utils.getappdPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
      debugger;
    return result;
    
  }



  public CalibrationDetailsInsrt(req: any) {
    const result: any = this.httpClient
      .post(`${this.baseURL}CalibrationDetailsIns`, req, this.utils.getPostHttpOptions())
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  //07072024

  public CeoDeviceSubDetailsEdit(req: any) {
    const result: any = this.httpClient
      .post(`${this.baseURL}CeoDeviceSubDetailsEdit`, req, this.utils.getPostHttpOptions())
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
//Queary
  public CalibrationEdit(req: any) {
    const result: any = this.httpClient
      .post(`${this.baseURL}CalibrationEdit`, req, this.utils.getPostHttpOptions())
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public SitePreparationEdit(req: any) {
    const result: any = this.httpClient
      .post(`${this.baseURL}SitePreparationEdit`, req, this.utils.getPostHttpOptions())
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public SuperriserFileuploadUpdate(req: any) {
    const result: any = this.httpClient
      .post(`${this.baseURL}SuperriserFileuploadUpdate`, req, this.utils.getPostHttpOptions())
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public DmtFileuploadUpdate(req: any) {
    const result: any = this.httpClient
      .post(`${this.baseURL}DmtFileuploadUpdate`, req, this.utils.getPostHttpOptions())
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public PaymenetDetailsIns(req: any) {
    const result: any = this.httpClient
      .post(`${this.baseURL}PaymenetDetailsIns`, req, this.utils.getPostHttpOptions())
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public InternetGetDetails(req: any): Promise<any> {
    const result: any = this.httpClient
      .post(`${this.baseURL}InternetGetDetails`, req, this.utils.getPostHttpOptions())
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public InternetDtailsInsert(req: any) {
    const result: any = this.httpClient
      .post(`${this.baseURL}InternetDtailsInsert`, req, this.utils.getPostHttpOptions())
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public CeoInternetDtailsCert(req: any) {    
    const result: any = this.httpClient       
      .post(
        `https://cooperation.ap.gov.in/crystalcops/api/landAllot/InternetVerificationCert`,
        req,
        this.utils.getappdPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
      debugger;
    return result;
    
  }
  // public CeoInternetDtailsCert(req: any) {
  //   const result: any = this.httpClient
  //     .post(`https://cooperation.ap.gov.in/crystalcops/api/landAllot/InternetVerificationCert`, req, this.utils.getPostHttpOptions())
  //     .pipe(retry(this.utils.env.API_RETRY_COUNT))
  //     .toPromise();
  //   return result;
  // }

  public InternetSuperviserfilepath(req: any) {
    const result: any = this.httpClient
      .post(`${this.baseURL}InternetSuperviserfilepath`, req, this.utils.getPostHttpOptions())
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }





  
}
