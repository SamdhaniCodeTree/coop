import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry } from 'rxjs/operators';
import { UtilsService } from 'src/app/sharedModule/services/utils.service';

@Injectable({
  providedIn: 'root',
})
export class PacsLandAllotmentService {
  pacsLandAllotmentURL = '';
  baseURL = '';

  constructor(private httpClient: HttpClient, private utils: UtilsService) {
    this.pacsLandAllotmentURL = utils.baseUrl() + 'admin/';
    this.baseURL = utils.baseUrl() + 'shared/';
  }

  public pacsLandAllotmentStateReport(req: any): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.pacsLandAllotmentURL}pacsLandAllotmentStateReport`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }






  

  //SRINIVAS
  public CopsConsolidatedReportGet(req: any) {    
    const result: any = this.httpClient       
      .post(
        `https://cooperation.ap.gov.in/crystalcops/api/CeoReports/CopsConsolidatedReportGet`,
        req,
        this.utils.getappdPostHttpOptions()         
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
      debugger;
    return result;
    
  }


  public CopsConsolidatedReportforSite(req: any) {    
    const result: any = this.httpClient       
      .post(
        `https://cooperation.ap.gov.in/crystalcops/api/CeoReports/CopsConsolidatedReportforSite`,
        req,
        this.utils.getappdPostHttpOptions()         
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
      debugger;
    return result;
    
  }

  public CopsConsolidatedReportDevices(req: any) {    
    const result: any = this.httpClient       
      .post(
        `https://cooperation.ap.gov.in/crystalcops/api/CeoReports/CopsConsolidatedReportDevices`,
        req,
        this.utils.getappdPostHttpOptions()         
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
      debugger;
    return result;
    
  }



  public pacsLandAllotmentDistrictReport(req: any): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.pacsLandAllotmentURL}pacsLandAllotmentDistrictReport`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  public pacsLandAllotmentMandalReport(req: any): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.pacsLandAllotmentURL}pacsLandAllotmentMandalReport`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  public pacsLandAllotmentStateReportPhasetwo(req: any): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.pacsLandAllotmentURL}pacsLandAllotmentStateReportPhasetwo`,
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
        `${this.pacsLandAllotmentURL}MasterDetailsInsert`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  
  public MaterDataReport(req: any): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.pacsLandAllotmentURL}MaterDataReport`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }

  
  public PacsCeoDetailsGet(req: any): Promise<any> {
    const result: any = this.httpClient
      .post(
        `${this.baseURL}PacsCeoDetailsGet`,
        req,
        this.utils.getPostHttpOptions()
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
    return result;
  }
  //21052024 

  public DistrictWisePacsReport(req: any) {    
    const result: any = this.httpClient       
      .post(
        `https://cooperation.ap.gov.in/crystalcops/api/CeoReports/DistrictWisePacsReport`,
        req,
        this.utils.getappdPostHttpOptions()         
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
      debugger;
    return result;
    
  }
  public CalibrationAbstractReport(req: any) {    
    const result: any = this.httpClient       
      .post(
        `https://cooperation.ap.gov.in/crystalcops/api/TechMgr/CalibrationAbstractReport`,
        req,
        this.utils.getappdPostHttpOptions()         
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
      debugger;
    return result;
    
  }
  public NotCompletedPacsReport(req: any) {    
    const result: any = this.httpClient       
      .post(
        `https://cooperation.ap.gov.in/crystalcops/api/CeoReports/NotCompletedPacsReport`,
        req,
        this.utils.getappdPostHttpOptions()         
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
      debugger;
    return result;
    
  }

  public CompletedPacsWiseReport(req: any) {    
    const result: any = this.httpClient       
      .post(
        `https://cooperation.ap.gov.in/crystalcops/api/CeoReports/CompletedPacsWiseReport`,
        req,
        this.utils.getappdPostHttpOptions()         
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
      debugger;
    return result;
    
  }
  public DeliveryCompletedPacsReport(req: any) {    
    const result: any = this.httpClient       
      .post(
        `https://cooperation.ap.gov.in/crystalcops/api/CeoReports/DeliveryCompletedPacsReport`,
        req,
        this.utils.getappdPostHttpOptions()         
      )
      .pipe(retry(this.utils.env.API_RETRY_COUNT))
      .toPromise();
      debugger;
    return result;
    
  }
  
}
