import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription, interval } from 'rxjs';
import { NgxToasterService } from 'src/app/sharedModule/services/ngx-toaster.service';
import { SessionService } from 'src/app/sharedModule/services/session.service';
import { SharedService } from 'src/app/sharedModule/services/shared.service';
import { ToasterService } from 'src/app/sharedModule/services/toaster.service';
import { UtilsService } from 'src/app/sharedModule/services/utils.service';

@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.css']
})
export class SharedComponent implements OnInit {

  private refreshTokenInterval: Subscription = new Subscription();
  userName: string = '';
  lastLoginTime: string = '';

  DeviceList: any[] = [];
  PACS_CODE='';
  PACS_NAME='';
  DeviceDetails={
    PACS_CODE:'',
    PACS_NAME:'' 
  }
  constructor(
    private spinner: NgxSpinnerService,
    private router: Router,
    private session: SessionService,
    private utils: UtilsService,
    private sharedAPI: SharedService,
    private toast: ToasterService,
    private ngxToaster: NgxToasterService
  ) {}

  ngOnInit(): void {
debugger;
    
//document.getElementById('PACS_CODE').p  ?.attributes.item.bind(this.session.pacId) ;

    this.userName = this.session.userName;
    this.lastLoginTime = this.session.lastLoginTime;
this.loadpacksDetails();

this.packsDetails();
    if (this.session.isPasswordUpdate === '0') {
      this.utils.updatePassword(this.session.role);
    }
    this.refreshTokenInterval = interval(
      this.utils.env.refreshTokenInterval
    ).subscribe(() => {
      const decodeToken = this.utils.parseJwt(this.session.accessToken);
      const initTimestamp = new Date(decodeToken.exp * 1000);
      const currTimestamp = new Date();
      const newTimestamp = new Date(initTimestamp.getTime() - this.utils.env.refreshTokenCheck);
      if (currTimestamp > newTimestamp  ) {
        this.refreshToken();
      }
    });
    if(this.session.pacId!='')
      this.DeviceDetails.PACS_CODE=this.session.pacId ;
  }

  async loadpacksDetails(): Promise<void> {
    try { debugger;
      const req = {
        type: '31',
        mobileno:this.session.uniqueId  //pacId,
         
      }; debugger;
      this.spinner.show();
      const response = await this.sharedAPI.Hrmsemp(req);
      if (response.success) { 
        
         
      this.DeviceList=response.result;
      this.DeviceDetails.PACS_CODE=this.session.pacId ;
      // let objvalue= this.DeviceList.find(data=>data.PACS_CODE==this.session.pacId);
      // this.DeviceDetails.PACS_NAME=objvalue.PACS_NAME; 

      }  
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }


  async packsDetails(): Promise<void> {
    try { debugger;
      const req = {
        type: '32',
        mobileno:this.session.uniqueId  //pacId,
         
      }; debugger;
      this.spinner.show();
      const response = await this.sharedAPI.Hrmsemp(req);
      if (response.success) { 
        debugger;
        if(response.result[0].STATUS=="2")
          {
            
          //   if( this.router.navigate(['/ceo/Home']) === this.router.navigate(['/ceo/Home']))
          // this.toast.info('Please Select PACS Name');
          }
          // else if (response.result[0].PACS_NAME = "1")
          else{

          }
        
      // this.DeviceList=response.result;
      // this.DeviceDetails.PACS_CODE=this.session.pacId ;
      // let objvalue= this.DeviceList.find(data=>data.PACS_CODE==this.session.pacId);
      // this.DeviceDetails.PACS_NAME=objvalue.PACS_NAME; 

      }  
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
  
  deviceChange(obj:any){
    this.session.pacId =this.DeviceDetails.PACS_CODE;    
    this.router.navigate(['/ceo/Home']);
    //window.location.replace('./ceo/pacsDetailsGet');
    //this.toast.in
    // let objvalue= this.DeviceList.find(data=>data.PACS_CODE==obj);
    // debugger;
    // this.DeviceDetails.PACS_NAME=objvalue.PACS_NAME; 


  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes.itemId) {
  //     this.fetchItem(this.session.pacId );
  //   }
  // }

  // fetchItem(this.session.pacId: number): void {
  //   this.itemService.getItem(this.session.pacId).subscribe((this.DeviceDetails) => {
  //     this.DeviceDetails = this.DeviceDetails;
  //   });
  // }

//   infoNavigateJob() {
//     Swal.fire({
//         icon: 'info',
//         title: 'Info',
//         text: message,

//     }).then((result) => {
//         if (result.value) {
//             // Use the router to navigate to the specified route

//             this.router.navigate(['/NotificationModule/JobDetailsStatus']);
//         }
//     });

// }


  async refreshToken(): Promise<void> {
    try {
      this.spinner.show();
      const response = await this.sharedAPI.refreshToken();
      this.spinner.hide();
      if (response.success) {
        sessionStorage.setItem('accessToken', response.result);
        this.session.accessToken = sessionStorage.getItem('accessToken');
      } else {
        this.ngxToaster.error(response.message);
        this.router.navigate(['/']);
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async btnLogout(): Promise<void> {
    try {
      if (confirm('are you sure want to logout ?')) {
        const req = {
          userName: this.userName,
        };
        this.spinner.show();
        const response = await this.sharedAPI.logout(req);
        this.spinner.hide();
        if (response.success) {
          sessionStorage.clear();
          this.session.clearSession();
          alert(response.message);
          this.router.navigate(['/']);
        } else {
          this.toast.info(response.message);
        }
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  btnForgetPassword(): void {
    this.utils.updatePassword(this.session.role);
  }
  ngOnDestroy(): void {
    this.refreshTokenInterval.unsubscribe();
  }


  
  async ApcobRedirection(): Promise<void> {
     
    // const dec=this.utils.decrypt_apcob(string);
    // window.open('https://cooperation.ap.gov.in/UATcopsApp/#/login', '_blank');
    try { debugger;
      const req = {
        type: '1',
        EmployeeId:this.session.uniqueId, //pacId,
        input_02:'1', 
        role:this.session.role 
      }; debugger;
      this.spinner.show();
      const response = await this.sharedAPI.apcobinsertdata(req);
      if (response.success) {
        const string=this.utils.encrypt_apcob(response.result[0].USER_ID);
      // const url="https://cooperation.ap.gov.in/APCOB/#/Tokenauthentication?id="+response.result[0].USER_ID;
       const url=this.utils.apcoburl()+response.result[0].USER_ID;
       //response.result[0].USER_ID;
        window.open(url, '_blank');
      

      }  
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }


}

