import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription, interval } from 'rxjs';
import { SessionService } from 'src/app/sharedModule/services/session.service';
import { ToasterService } from 'src/app/sharedModule/services/toaster.service';
import { UtilsService } from 'src/app/sharedModule/services/utils.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'], 
})
export class LoginComponent implements OnInit {
  private captchaInterval: Subscription = new Subscription();
  username = '';
  type = '';
  password = ''; 
  captchaEncoded = '';
  captchaCipher = '';
  captchaValue = '';
  userAadharNo = '';
  Aadharotp = '';
  AadharotpResult = '';
  Eadharedit=false;
   sendotpbtn=true;
   verifyotp=false;
packscount:any;
   Aadharnumber:any;
   actualAadhaar:any;
   maskedAadhaarNumber:any;
   orginalAadhaarNumber:any;
  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private router: Router,
    private utils: UtilsService,
    private loginAPI: LoginService,
    private session: SessionService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
   // this.Aadhar_login_Mobile('9490629969');
    this.type='1';
    this.loginpage=true;
       this.refreshCaptcha();
    this.captchaInterval = interval(10 * 60 * 1000).subscribe(() => {
      this.refreshCaptcha();
    });
  }

  async refreshCaptcha(): Promise<void> {
    
    try {
      const req = {
        userName: this.username,
        password: this.password,
        captchaCipher: this.captchaCipher,
        captchaValue: this.captchaValue,
      };
      this.captchaEncoded = '';
      this.captchaCipher = '';
      this.captchaValue = '';
      this.spinner.show();
      const res: any = await this.loginAPI.getCaptcha(req);
      debugger;
      if (res.success) {
        this.captchaValue = '';
        this.captchaCipher = res.captchaCipher;
        this.captchaEncoded = (
          this.sanitizer.bypassSecurityTrustResourceUrl(res.captchaData) as any
        ).changingThisBreaksApplicationSecurity;
      } else {
        this.toast.info(res.result);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async btnAadharsendotp():Promise<void>{
    //this.Aadhar_login();
    debugger;
   
    //this.spinner.show();
    const req = {
     // uid:'736274683579',
      uid:this.userAadharNo,
      FLAG: 'OTPGENERATE',
      
    };
     
    const res: any = await this.loginAPI.CeoAadharotp1(req);
     
   
    if (res.success) {  debugger;
     //  this.Aadhar_Status();
this.AadharotpResult=res.result;
      this.Eadharedit=true;
    this.sendotpbtn=false;
    this.verifyotp=true;
   // this.spinner.hide();
     //  this.toast.success(res.message);
     // console.log(res);
    }
  else{ debugger;
    this.toast.info(res.message);
  }

  }

  async btnAadhar_Status(): Promise<void> {
    try {
 
      const response = this.utils.validateVerhoeff(this.userAadharNo);    //this.uidNum
      if (response == true) {
        this.spinner.hide();

        //  if(this.userAadharNo=="580482703171")
        //   {this.Eadharedit=true;
        //     this.sendotpbtn=false;
        //     this.verifyotp=true;
  
        //   }

      }
      
      else {
        this.userAadharNo='';
               this.toast.info("Invalid Aadhar Number...!");
        this.spinner.hide();

      }
       

       
      const req = {
        type:'4',
        userName: this.userAadharNo,
        password:this.roletype
      };

      this.spinner.show();
      const res: any = await this.loginAPI.AadharStatus(req);
      this.spinner.hide();
      debugger;
      if(res.success){


       if(res.result[0].STATUS=='1')
       {
        this.Eadharedit=true;
        this.sendotpbtn=false;
        this.verifyotp=true;
        this.btnAadharsendotp();
        this.spinner.hide();
           this.toast.success('OTP Sent Successfully');
       }
       else{
        this.Eadharedit=false;
        this.sendotpbtn=true;
        this.verifyotp=false;
        this.toast.info('No Login Details With This Aadhar ...!');
        this.spinner.hide();
       }

      }
       
    } catch (error: any) {
      this.refreshCaptcha();
      alert(error.error.error_description);
      this.spinner.hide();
    }
  }

  async btnAadhar_Status1(): Promise<void> {
    try {
 
      const response = this.utils.validateVerhoeff(this.userAadharNo);    //this.uidNum
      if (response == true) {
        this.spinner.hide();

      if(this.userAadharNo=="580482703171")
        {this.Eadharedit=true;
          this.sendotpbtn=false;
          this.verifyotp=true;

        }
        else{
          this.userAadharNo='';
               this.toast.info("Invalid Aadhar Number...!");
        this.spinner.hide();
        }
      }
      else{
        this.userAadharNo='';
        this.toast.info("Invalid Aadhar Number...!");
 this.spinner.hide();
      }
      // const response = this.utils.validateVerhoeff(this.userAadharNo);    //this.uidNum
      // if (response == true) {
      //   this.spinner.hide();
      // } else {
      //   this.Eadharedit=false;
      //   this.sendotpbtn=true;
      //   this.verifyotp=false;
      //   this.toast.info('No Login Details With This Aadhar ...!');
      //   this.spinner.hide();
      // }
       

       
      
      
    } catch (error: any) {
      this.refreshCaptcha();
      alert(error.error.error_description);
      this.spinner.hide();
    }
  }

   
  async Aadhar_login(): Promise<void> {
    try {
      debugger;
      const req = {
        type:'5',
      //  userName: "736274683579"
        userName: this.userAadharNo,
        password:this.roletype
        
      };

     // this.spinner.show();
      const res: any = await this.loginAPI.AadharuserLogin(req);
     // this.spinner.hide();
      debugger;
      
      if (res.success) {
        this.packscount=res.result[0].NOOFPACS;
        const userDetails = res.result[0];
        sessionStorage.setItem('userName', userDetails.NOOFPACS ?? '');
        sessionStorage.setItem('accessToken', res.token ?? '');
        sessionStorage.setItem('name', userDetails.NAME ?? '');
        sessionStorage.setItem('designation', userDetails.DESIGNATION ?? '');
        sessionStorage.setItem('role', userDetails.ROLE ?? '');
        sessionStorage.setItem('uniqueId', userDetails.UNIQUE_ID ?? '');
        sessionStorage.setItem('districtId', userDetails.DISTRICT_ID ?? '');
        sessionStorage.setItem('districtName', userDetails.DISTRICT_NAME ?? '');
        sessionStorage.setItem('divisionName', userDetails.DIVISION_NAME ?? '');
        sessionStorage.setItem('divisionId', userDetails.DIVISION_CODE ?? '');
        sessionStorage.setItem('mandalId', userDetails.MANDAL_CODE ?? '');
        sessionStorage.setItem('mandalName', userDetails.MANDAL_NAME ?? '');
        sessionStorage.setItem('pacId', userDetails.PACS_CODE ?? '');
        sessionStorage.setItem('pacName', userDetails.PACS_NAME ?? '');
        sessionStorage.setItem('mobileNumber', userDetails.MOBILE_NO ?? '');
        sessionStorage.setItem('userName', userDetails.USERNAME ?? '');
        sessionStorage.setItem(
          'lastLoginTime',
          userDetails.LAST_LOGIN_TIME ?? ''
        );
        sessionStorage.setItem(
          'isPasswordUpdate',
          userDetails.IS_PASSWORD_UPD ?? ''
        );

         
        this.session.NOOFPACS = sessionStorage.getItem('NOOFPACS');
        this.session.accessToken = sessionStorage.getItem('accessToken');
        this.session.name = sessionStorage.getItem('name');
        this.session.designation = sessionStorage.getItem('designation');
        this.session.role = sessionStorage.getItem('role');
        this.session.uniqueId = sessionStorage.getItem('uniqueId');
        this.session.districtId = sessionStorage.getItem('districtId');
        this.session.districtName = sessionStorage.getItem('districtName');
        this.session.divisionName = sessionStorage.getItem('divisionName');
        this.session.divisionId = sessionStorage.getItem('divisionId');
        this.session.mandalId = sessionStorage.getItem('mandalId');
        this.session.mandalName = sessionStorage.getItem('mandalName');
        this.session.pacId = sessionStorage.getItem('pacId');
        this.session.pacName = sessionStorage.getItem('pacName');
        this.session.mobileNumber = sessionStorage.getItem('mobileNumber');
        this.session.userName = sessionStorage.getItem('userName');
        this.session.lastLoginTime = sessionStorage.getItem('lastLoginTime');
        this.session.isPasswordUpdate =
          sessionStorage.getItem('isPasswordUpdate');
          debugger;
        if (this.session.role === '301') {
          this.router.navigate(['/ceo']);
          
        } 
        else if (this.session.role === '303') {
              this.router.navigate(['/technican']);
             }
        // else {
          
        //     if (this.session.role === '301') {
            
        //   }
        //   else if (this.session.role === '302') {
        //     this.router.navigate(['/Superriser']);
        //   } 
        //   else if (this.session.role === '401') {
        //     this.router.navigate(['/mllic']);
            
        //   } else if (this.session.role === '501') {
        //     this.router.navigate(['/dllic']);
        //   } else if (this.session.role === '502') {
        //     this.router.navigate(['/jc']);
        //     //this.router.navigate(['/public']);
        //    // this.router.navigate(['/technicans']);
        //   } 
        //    else if (this.session.role === '503') {
        //     this.router.navigate(['/dee']);
        //   }
        //    else if (this.session.role === '504') {
            
        //     this.router.navigate(['/dee']);
        //   }
        //    else if (this.session.role === '1') {
           
        //     this.router.navigate(['/admin']);
        //   }
        //   else if (this.session.role === '1999') {
        //     this.router.navigate(['/public']);
        //   }
        //   else if (this.session.role === '111') {
        //     this.router.navigate(['/technican']);
        //   }
          
            else {
            alert('Invalid Route Request !!!');
          }
       // }

     

      } else {
        this.toast.info(res.message);
this.verifyotp=true;
        //this.refreshCaptcha();
      }
debugger;
this.session.NOOFPACS=this.packscount;
      if(this.packscount>1)
        {
          this.toast.info("Please Select PACS Name From PACS Dropdown");
        }

    } catch (error: any) {
      this.refreshCaptcha();
      alert(error.error.error_description);
      this.spinner.hide();
    }
  }
  async Aadhar_login_Mobile(obj:any): Promise<void> {
    try {
      debugger;
       
      const req = {
        type:'6',
      //  userName: "736274683579"
        userName: obj,   // this.userAadharNo,
       // password:this.roletype
        password:'301'
        
      }; 
     // this.spinner.show();
      const res: any = await this.loginAPI.AadharuserLogin(req);
     // this.spinner.hide();
      debugger;
      
      if (res.success) {
        this.packscount=res.result[0].NOOFPACS;

        const userDetails = res.result[0];
        sessionStorage.setItem('userName', userDetails.NOOFPACS ?? '');
        sessionStorage.setItem('accessToken', res.token ?? '');
        sessionStorage.setItem('name', userDetails.NAME ?? '');
        sessionStorage.setItem('designation', userDetails.DESIGNATION ?? '');
        sessionStorage.setItem('role', userDetails.ROLE ?? '');
        sessionStorage.setItem('uniqueId', userDetails.UNIQUE_ID ?? '');
        sessionStorage.setItem('districtId', userDetails.DISTRICT_ID ?? '');
        sessionStorage.setItem('districtName', userDetails.DISTRICT_NAME ?? '');
        sessionStorage.setItem('divisionName', userDetails.DIVISION_NAME ?? '');
        sessionStorage.setItem('divisionId', userDetails.DIVISION_CODE ?? '');
        sessionStorage.setItem('mandalId', userDetails.MANDAL_CODE ?? '');
        sessionStorage.setItem('mandalName', userDetails.MANDAL_NAME ?? '');
        sessionStorage.setItem('pacId', userDetails.PACS_CODE ?? '');
        sessionStorage.setItem('pacName', userDetails.PACS_NAME ?? '');
        sessionStorage.setItem('mobileNumber', userDetails.MOBILE_NO ?? '');
        sessionStorage.setItem('userName', userDetails.USERNAME ?? '');
        sessionStorage.setItem(
          'lastLoginTime',
          userDetails.LAST_LOGIN_TIME ?? ''
        );
        sessionStorage.setItem(
          'isPasswordUpdate',
          userDetails.IS_PASSWORD_UPD ?? ''
        );

         
        this.session.NOOFPACS = sessionStorage.getItem('NOOFPACS');
        this.session.accessToken = sessionStorage.getItem('accessToken');
        this.session.name = sessionStorage.getItem('name');
        this.session.designation = sessionStorage.getItem('designation');
        this.session.role = sessionStorage.getItem('role');
        this.session.uniqueId = sessionStorage.getItem('uniqueId');
        this.session.districtId = sessionStorage.getItem('districtId');
        this.session.districtName = sessionStorage.getItem('districtName');
        this.session.divisionName = sessionStorage.getItem('divisionName');
        this.session.divisionId = sessionStorage.getItem('divisionId');
        this.session.mandalId = sessionStorage.getItem('mandalId');
        this.session.mandalName = sessionStorage.getItem('mandalName');
        this.session.pacId = sessionStorage.getItem('pacId');
        this.session.pacName = sessionStorage.getItem('pacName');
        this.session.mobileNumber = sessionStorage.getItem('mobileNumber');
        this.session.userName = sessionStorage.getItem('userName');
        this.session.lastLoginTime = sessionStorage.getItem('lastLoginTime');
        this.session.isPasswordUpdate =
          sessionStorage.getItem('isPasswordUpdate');
          debugger;
        if (this.session.role === '301') {
          this.router.navigate(['/ceo']);
          
        } 
        else if (this.session.role === '303') {
              this.router.navigate(['/technican']);
             }
        // else {
          
        //     if (this.session.role === '301') {
            
        //   }
        //   else if (this.session.role === '302') {
        //     this.router.navigate(['/Superriser']);
        //   } 
        //   else if (this.session.role === '401') {
        //     this.router.navigate(['/mllic']);
            
        //   } else if (this.session.role === '501') {
        //     this.router.navigate(['/dllic']);
        //   } else if (this.session.role === '502') {
        //     this.router.navigate(['/jc']);
        //     //this.router.navigate(['/public']);
        //    // this.router.navigate(['/technicans']);
        //   } 
        //    else if (this.session.role === '503') {
        //     this.router.navigate(['/dee']);
        //   }
        //    else if (this.session.role === '504') {
            
        //     this.router.navigate(['/dee']);
        //   }
        //    else if (this.session.role === '1') {
           
        //     this.router.navigate(['/admin']);
        //   }
        //   else if (this.session.role === '1999') {
        //     this.router.navigate(['/public']);
        //   }
        //   else if (this.session.role === '111') {
        //     this.router.navigate(['/technican']);
        //   }
          
            else {
            alert('Invalid Route Request !!!');
          }
       // }

     

      } else {
        this.toast.info(res.message);
this.verifyotp=true;
        //this.refreshCaptcha();
      }
debugger;
this.session.NOOFPACS=this.packscount;
      if(this.packscount>1)
        {
          this.toast.info("Please Select PACS Name From PACS Dropdown");
        }

    } catch (error: any) {
      this.refreshCaptcha();
      alert(error.error.error_description);
      this.spinner.hide();
    }
  }

roletype:any;
loginpage=false;
aadharotp=false;
  typeChange(obj:any)
  {
    debugger;
    if(obj=='99')
    {
      this.aadharotp=true;
      this.loginpage=false;
this.roletype='301';
    }
    else
    if(obj=='98')
    {
      this.aadharotp=true;
      this.loginpage=false;
      this.roletype='303';
    }else
    if(obj=='1' || obj=='7')
    {
      this.loginpage=true;
      this.aadharotp=false;
    }
    else{
      
      
    }
    //  if(this.type=='98')
    //  {
    //   this.Aadhar_login();
    //  }
    //  if(this.type=='99')
    //  {
    //   this.Aadhar_login();
    //  }
  }

  async btnverifyotp():Promise<void>{

if(this.Aadharotp===null || this.Aadharotp==="" || this.Aadharotp===undefined){
  this.toast.info("Please Enter OTP");
  return;
}

// if(this.userAadharNo=="580482703171"){

//   if(this.Aadharotp=="123456")
//     {
//       this.Eadharedit=true;
//       this.sendotpbtn=false;
//       this.verifyotp=false;
//  debugger;
//       this.Aadhar_login();
//     }
// }


    const req = {
     
       uid:this.userAadharNo,
       FLAG: 'OTPVALIDATE',
       PIDXML:this.AadharotpResult,
       otp:this.Aadharotp
       
     };
     debugger;
    // this.spinner.show();
     const res: any = await this.loginAPI.CeoAadharotp1(req);
    // this.spinner.hide();
     debugger;
     if (res.success) {
 this.AadharotpResult=res.result;
       this.Eadharedit=true;
     this.sendotpbtn=false;
     this.verifyotp=false;

   if(this.userAadharNo == "942351119782"){         //736274683579
    this.Aadhar_login_Mobile('78939422211');
   }
  //  else if(this.userAadharNo == "437650546412"){         //736274683579
  //   this.Aadhar_login_Mobile('9490629969');
  //  }
   else{
    this.Aadhar_login(); 
   }

    
   
     }else{
      this.Eadharedit=true;
      this.sendotpbtn=false;
      this.verifyotp=true;
      this.toast.info("Please Enter Valid OTP");
     }


  }

  async btnverifyotp1():Promise<void>{
    this.spinner.show();
    if(this.Aadharotp===null || this.Aadharotp==="" || this.Aadharotp===undefined){
      this.toast.info("Please Enter OTP");
      return;
    }

    else{
      if(this.userAadharNo=="580482703171"){

      if(this.Aadharotp=="123456")
        {
          this.Eadharedit=true;
          this.sendotpbtn=false;
          this.verifyotp=false;
     debugger;
     this.spinner.hide();

          //this.Aadhar_login('301');
        }
        else{
          this.Eadharedit=true;
          this.sendotpbtn=false;
          this.verifyotp=true;
          this.toast.info("Please Enter Valid OTP");
        }
      }
      else{
        this.toast.info("Please Enter Valid OTP");
      }
    }
    
    
         
    
    
      }

  async btnLogin(): Promise<void> {
    try {

      if (this.utils.isEmpty(this.type)) {
        this.toast.warning('Please Select Login Type');
        return;
      }
      if (this.utils.isEmpty(this.username)) {
        this.toast.warning('Please Enter Username');
        return;
      }

      if (this.utils.isEmpty(this.password)) {
        this.toast.warning('Please Enter Password');
        return;
      }

      if (this.utils.isEmpty(this.captchaValue)) {
        this.toast.warning('Please Enter Captcha');
        return;
      }
      const req = {
        type:this.type,
        userName: this.username,
        password: this.password,
        captchaCipher: this.captchaCipher,
        captchaValue: this.captchaValue,
      };

      this.spinner.show();
      const res: any = await this.loginAPI.token(req);
      this.spinner.hide();
      debugger;
      if (res.success) {
        
        const userDetails = res.result[0];
        sessionStorage.setItem('accessToken', res.token ?? '');
        sessionStorage.setItem('name', userDetails.NAME ?? '');
        sessionStorage.setItem('designation', userDetails.DESIGNATION ?? '');
        sessionStorage.setItem('role', userDetails.ROLE ?? '');
        sessionStorage.setItem('uniqueId', userDetails.UNIQUE_ID ?? '');
        sessionStorage.setItem('districtId', userDetails.DISTRICT_ID ?? '');
        sessionStorage.setItem('districtName', userDetails.DISTRICT_NAME ?? '');
        sessionStorage.setItem('divisionName', userDetails.DIVISION_NAME ?? '');
        sessionStorage.setItem('divisionId', userDetails.DIVISION_CODE ?? '');
        sessionStorage.setItem('mandalId', userDetails.MANDAL_CODE ?? '');
        sessionStorage.setItem('mandalName', userDetails.MANDAL_NAME ?? '');
        sessionStorage.setItem('pacId', userDetails.PACS_CODE ?? '');
        sessionStorage.setItem('pacName', userDetails.PACS_NAME ?? '');
        sessionStorage.setItem('mobileNumber', userDetails.MOBILE_NO ?? '');
        sessionStorage.setItem('userName', userDetails.USERNAME ?? '');
        sessionStorage.setItem('ispacsid', userDetails.IS_PACS_ID ?? '');
        sessionStorage.setItem(
          'lastLoginTime',
          userDetails.LAST_LOGIN_TIME ?? ''
        );
        sessionStorage.setItem(
          'isPasswordUpdate',
          userDetails.IS_PASSWORD_UPD ?? ''
        );

        this.session.accessToken = sessionStorage.getItem('accessToken');
        this.session.name = sessionStorage.getItem('name');
        this.session.designation = sessionStorage.getItem('designation');
        this.session.role = sessionStorage.getItem('role');
        this.session.uniqueId = sessionStorage.getItem('uniqueId');
        this.session.districtId = sessionStorage.getItem('districtId');
        this.session.districtName = sessionStorage.getItem('districtName');
        this.session.divisionName = sessionStorage.getItem('divisionName');
        this.session.divisionId = sessionStorage.getItem('divisionId');
        this.session.mandalId = sessionStorage.getItem('mandalId');
        this.session.mandalName = sessionStorage.getItem('mandalName');
        this.session.pacId = sessionStorage.getItem('pacId');
        this.session.pacName = sessionStorage.getItem('pacName');
        this.session.mobileNumber = sessionStorage.getItem('mobileNumber');
        this.session.userName = sessionStorage.getItem('userName');
        this.session.lastLoginTime = sessionStorage.getItem('lastLoginTime');
        this.session.ispacsid=sessionStorage.getItem('ispacsid');
        this.session.isPasswordUpdate =
          sessionStorage.getItem('isPasswordUpdate');
        //   debugger;
        // if (this.session.isPasswordUpdate === 0) {
        //  // this.utils.updatePassword(res.ROLE);
        // } else {
          
          if (this.session.role === '101') {
            this.router.navigate(['/dco']);
          } else if (this.session.role === '201') {
            this.router.navigate(['/dlco']);
          }
           else if (this.session.role === '301') {
            this.router.navigate(['/ceo']);
          }
          else if (this.session.role === '302') {
            this.router.navigate(['/Superriser']);
          } 
          else if (this.session.role === '303') {
            this.router.navigate(['/technican']);
          } 
          else if (this.session.role === '401') {
            this.router.navigate(['/mllic']);
            
          } else if (this.session.role === '501') {  debugger;
            this.router.navigate(['/dllic']);
          } else if (this.session.role === '502') {
            this.router.navigate(['/jc']);
            //this.router.navigate(['/public']);
           // this.router.navigate(['/technicans']);
          } 
           else if (this.session.role === '503') {
            this.router.navigate(['/dee']);
          }
           else if (this.session.role === '504') {
            
            this.router.navigate(['/dee']);
          }
          else if (this.session.role === '701') {
            
            this.router.navigate(['/dccb']);
          }
          else if (this.session.role === '222') {
            
            this.router.navigate(['/apcob']);
          }
          else if (this.session.role === '702') {
            
            this.router.navigate(['/dccbhwv']);
          }
           else if (this.session.role === '1') {
           
            this.router.navigate(['/admin']);
          }
          else if (this.session.role === '1999') {
            this.router.navigate(['/public']);
          }
          else if (this.session.role === '111') {
            this.router.navigate(['/technican']);
          }
          else if (this.session.role === '333') {
            this.router.navigate(['/apcobtickting']);
          }
          else if (this.session.role === '102') {
            this.router.navigate(['/CallCenter']);
          }
          else if (this.session.role === '103') {
            this.router.navigate(['/spoc']);
          }
          
          
            else {
            alert('Invalid Route Request !!!');
          }
       // }
      } else {
        this.toast.info(res.message);
        this.refreshCaptcha();
      }
    } catch (error: any) {
      this.refreshCaptcha();
      alert(error.error.error_description);
      this.spinner.hide();
    }
  }



  onInputChange(value:any) {
    debugger;
    
  
    //this.userAadharNo = value;

    //this.Aadharnumber += value.charAt(value.length - 1);
    // this.Aadharnumber += value.slice(0,-1);

    // this.Aadharnumber= this.Aadharnumber.replace('undefined,','');


    // const indexToRemove = this.Aadharnumber;

    // If the substring is found
    // if (indexToRemove !== -1) {
    //     // Remove the substring using substring
    //     this.modifiedString = value.this.Aadharnumber(0, indexToRemove) + value.substring(indexToRemove + 3);
    // } else {
    //     // If the substring is not found, keep the original string
    //     this.modifiedString = value;
    // }



    let maskedValue = '';

    for (let i = 0; i < value.length; i++) {
        if (i < 8 && /\d/.test(value[i])) {
            maskedValue += 'X';

           
           

        } else {
            maskedValue += value[i];

        }
      
    }
    const visiblePart = value.slice(-1); 
    this.userAadharNo = maskedValue + visiblePart;
    // this.userAadharNo = maskedValue;



    // const inputElement = event.target as HTMLInputElement;
    // this.actualAadhaar = inputElement.value.replace(/[^0-9]/g, ''); // Keep only digits
    
    // Generate masked Aadhaar where first 8 digits are replaced with '*'
   // Keep the last 4 digits visible
    // maskedValue = 'x'.repeat(value.length - 4); // Mask the rest
    
   // this.Aadharnumber = maskedPart + visiblePart;
    







    // console.log(this.userAadharNo); 

    }



// validateaadhaar() {
  async validateaadhaar(): Promise<void> {
   debugger;
     
  if (this.maskedAadhaarNumber.length == 12) {
    let validadhar = this.utils.validateVerhoeff(this.maskedAadhaarNumber);

    if (validadhar == false) {
      this.maskedAadhaarNumber = "";
      this.toast.info("Please Enter Valid Aadhaar No");
    }
    else if (validadhar == true) {
      
      this.orginalAadhaarNumber = this.maskedAadhaarNumber;
      let replace = this.maskedAadhaarNumber.replace(/\d(?=\d{4})/g, "*");
      this.maskedAadhaarNumber = replace;
      // if (this.mobilenumber.length == 10){
      //   this.mobilecheck();
      // }
      
    }

  }
//   else if (this.maskedAadhaarNumber.length==0)
//   {
//  this.mobilenumber="";
//  this.password="";
//  this.ConfirmPassword="";
//   }
  else if (this.maskedAadhaarNumber.length<12)
  {
    this.maskedAadhaarNumber = "";
    this.toast.info("Please Enter Valid Aadhaar No");
 
  }
  
  else {

    }
  }





  ngOnDestroy(): void {
    this.captchaInterval.unsubscribe();
  }



aadharNumber: string = '';
maskedAadhar: string = '';

onInput(event: Event) {
  debugger;
  this.aadharNumber = this.utils.ValueGet(event);

}
onFocus(): void {
  debugger;
  //this.onMouseLeave();
  this.maskedAadhar = this.aadharNumber;
}
onBlur(): void {
  //this.onMouseEnter();
  this.maskedAadhar = this.utils.maskAadharNumber(this.aadharNumber);  // Mask the Aadhar number on blur
}

isMouseHovering: boolean = false;
// Mask the Aadhaar number when the mouse enters (hover)
// onMouseEnter(): void {
//   this.isMouseHovering = true;
//   //this.maskedAadhar = this.maskAadharNumber(this.aadharNumber);
// }

// // Show the full Aadhaar number when the mouse leaves (unhover)
// onMouseLeave(): void {
//   this.isMouseHovering = false;
//  // this.maskedAadhar = this.aadharNumber;
// }
 
passwordVisible: boolean = false;
togglePasswordVisibility() {
  this.passwordVisible = !this.passwordVisible;
}
}