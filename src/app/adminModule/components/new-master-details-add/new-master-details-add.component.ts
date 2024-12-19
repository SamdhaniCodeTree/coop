import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DlcoService } from 'src/app/dlcoModule/services/dlco.service';
import { JcService } from 'src/app/jcModule/services/jc.service';
import { PacsLandAllotmentService } from 'src/app/reportsModule/pacsLandAllotment/services/pacs-land-allotment.service';
import { ConsoleService } from 'src/app/sharedModule/services/console.service';
import { NgxToasterService } from 'src/app/sharedModule/services/ngx-toaster.service';
import { SessionService } from 'src/app/sharedModule/services/session.service';
import { SharedService } from 'src/app/sharedModule/services/shared.service';
import { ToasterService } from 'src/app/sharedModule/services/toaster.service';
import { UtilsService } from 'src/app/sharedModule/services/utils.service';

@Component({
  selector: 'app-new-master-details-add',
  templateUrl: './new-master-details-add.component.html',
  styleUrls: ['./new-master-details-add.component.css']
})
export class NewMasterDetailsAddComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private ngxToaster: NgxToasterService,
    private router: Router,
    private utils: UtilsService,
    private session: SessionService,
    private console: ConsoleService,
    private sharedAPI: SharedService,
    private dlcoAPI: DlcoService,
    private masterdata: PacsLandAllotmentService,
    private httpClient: HttpClient) { }

    M_DistList: any[] = [];
  mandalList: any[] = [];
  rbkList: any[] = [];
  packsList: any[] = [];
  villageList: any[] = [];
  SurveypacksList: any[] = [];
  Divsionlist: any[] = [];
  ngOnInit(): void {
    this.Viewdetails=true;
    this.AddDetails=false;
    this.loaddistricts();
    this.loadReport();
   
  }
  userMessage:any;
  stateDetailsMasterdata: any = [];
  Viewdetails=false;
  AddDetails=false;
  Regdetails = {

    DistrictCode:'',
    DistrictName:'',
    MandalCode:'',
    MandalName:'',
    RbkCode:'',
    RbkName:'',
    VillageCode:'',
    VillageName:'',
    DivisionCode:'',
    DivisionName:'',
    PackCode:'',
    PackName:'',
    Phase:'',
    insertby:'',
    

    
  };

  async loaddistricts(): Promise<void> {
    try {
      const req = {
        type:"4",
      };
      this.spinner.show();
      
      const response = await this.masterdata.MaterDataReport(req);

      console.log(response);
      
      if (response.success) {
                this.M_DistList = response.result;
      } else {
        this.toast.info(response.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async ondivisionChange(obj:any): Promise<void> {
    this.Regdetails.RbkCode = '';
    this.Regdetails.VillageCode = '';
    this.Regdetails.PackCode='';
    this.Regdetails.DistrictCode=''
    this.Regdetails.DistrictCode=obj;
    this.mandalList = [];
    if (this.Regdetails.DivisionCode === '') {
      return;
    }
    this.loadMandals();
  }


  async districtChange(obj:any): Promise<void> {
    this.Regdetails.RbkCode = '';
    this.Regdetails.VillageCode = '';
    this.Regdetails.PackCode='';
    this.Regdetails.DistrictCode=''
    this.Regdetails.DistrictCode=obj;
    this.mandalList = [];
    if (this.Regdetails.DistrictCode === '') {
      return;
    }
    this.loadDIsion();
  }
  onMandalChange(): void {
    this.Regdetails.RbkCode = '';
    this.Regdetails.VillageCode = '';
    this.rbkList = [];
    if (this.Regdetails.MandalCode === '') {
      return;
    }
    this.PACSList();
  }

  onpacsChange():void{
    if (this.Regdetails.PackCode === '') {
      return;
    }
    this.loadRBKList();
  }

  onRbkChange(): void {
    this.Regdetails.VillageCode = '';
    this.villageList = [];
    if (this.Regdetails.RbkCode === '') {
      return;
    }
    this.loadVillageList();
  }

  async loadDIsion(): Promise<void> {
    try {
      const req = {
        districtCode: this.Regdetails.DistrictCode,         
        type:'5'
      };
      
      this.spinner.show();
      const response = await this.masterdata.MaterDataReport(req);
      debugger;
      if (response.success) {
        this.Divsionlist = response.result;
      } else {
        this.toast.info(response.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async loadMandals(): Promise<void> {
    try {
      const req = {
        districtCode: this.Regdetails.DistrictCode,         
        type:'6'
      };
      
      this.spinner.show();
      const response = await this.masterdata.MaterDataReport(req);
      debugger;
      if (response.success) {
        this.mandalList = response.result;
      } else {
        this.toast.info(response.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async PACSList(): Promise<void> {
    try {
      const req = {
        districtCode: this.Regdetails.DistrictCode,
        mandalCode: this.Regdetails.MandalCode,
         
        type:'7'
      };
      debugger;
      this.spinner.show();
      const response = await this.masterdata.MaterDataReport(req);
      if (response.success) {
        debugger;
        this.packsList = response.result;
      } else {
        this.toast.info(response.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async loadRBKList(): Promise<void> {
    try {
      const req = {
        districtCode: this.Regdetails.DistrictCode,
        mandalCode: this.Regdetails.MandalCode,
        packCode:this.Regdetails.PackCode,
        type:'7'
      };
      this.spinner.show();
      const response = await this.masterdata.MaterDataReport(req);
      if (response.success) {
        debugger;
        this.rbkList = response.result;
      } else {
        this.toast.info(response.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async loadVillageList(): Promise<void> {
    try {
      const req = {
        districtCode: this.Regdetails.DistrictCode,
        mandalCode: this.Regdetails.MandalCode,
        packCode:this.Regdetails.PackCode,
        rbkCode:this.Regdetails.RbkCode,
        type:'8'
      };
      this.spinner.show();
      const response = await this.masterdata.MaterDataReport(req);
      if (response.success) {
        this.villageList = response.result;
      } else {
        this.toast.info(response.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  btnAddDetails(): void {
    
    this.Viewdetails=false;
    this.AddDetails=true;

    
  }
  btnViewDetails(): void {
    
    this.Viewdetails=true;
    this.AddDetails=false;

    
  }

  async loadReport(): Promise<void> {
    try {
     
      
     debugger;
      

      const req = {
         
        type:"2"
        
        
      };
      this.spinner.show();
      const response = await this.masterdata.MaterDataReport(
        req
      );
      debugger;
      this.spinner.hide();
      if (response.success) {
        
        this.stateDetailsMasterdata = response.result;

         
      } else {
        this.spinner.hide();
        this.toast.info("No Data Found");
      }
    
      
     // this.dtTrigger.next();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async btnmastrsSub(allotmentStatus: any): Promise<void> {
    try {
      debugger;
      if (this.validate()) {
        
        this.spinner.show();
        const req = {
         
          type:"1",
          districtCode:this.Regdetails.DistrictCode,
	        districtName:this.Regdetails.DistrictName,
	       mandalCode:this.Regdetails.MandalCode,
      	mandalName:this.Regdetails.MandalName,
      	packCode:this.Regdetails.PackCode,
        packName:this.Regdetails.PackName,
      	rbkCode:this.Regdetails.RbkCode,
      	rbkName:this.Regdetails.RbkName,
      	divisionCode:this.Regdetails.DivisionCode,
      	divisionName:this.Regdetails.DivisionName,
      	villageCode:this.Regdetails.VillageCode,
      	villageName:this.Regdetails.VillageName,
      	insertby:this.session.userName,
      	phasetype:this.Regdetails.Phase
          
        };
        const response = await this.masterdata.MasterDetailsInsert(
           
          req
        );
        debugger;
        if (response.success) {
          alert(response.message);
          window.location.reload();
        } else {
          this.spinner.hide();
          this.toast.info(response.message);
        }
        this.spinner.hide();
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  validate(): boolean {
    debugger;
    if (this.utils.isEmpty(this.Regdetails.DistrictCode)) {
      this.toast.warning('Please Enter District Code');
      return false;
    }

    if (this.utils.isEmpty(this.Regdetails.DistrictName)) {
      this.toast.warning('Please Enter District Name');
      return false;
    }

    if (this.utils.isEmpty(this.Regdetails.MandalCode)) {
      this.toast.warning('Please Enter Mandal Code');
      return false;
    }

    if (this.utils.isEmpty(this.Regdetails.MandalName)) {
      this.toast.warning('Please Enter Mandal Name');
      return false;
    }

    if (this.utils.isEmpty(this.Regdetails.PackCode)) {
      this.toast.warning('Please Enter Pack Code');
      return false;
    }
    if (this.utils.isEmpty(this.Regdetails.PackName)) {
      this.toast.warning('Please Enter Pack Name');
      return false;
    }
    if (this.utils.isEmpty(this.Regdetails.RbkCode)) {
      this.toast.warning('Please Enter RBK Code');
      return false;
    }
    if (this.utils.isEmpty(this.Regdetails.RbkName)) {
      this.toast.warning('Please Enter RBK Name');
      return false;
    }
    
    if (this.utils.isEmpty(this.Regdetails.DivisionCode)) {
      this.toast.warning('Please Enter Division Code');
      return false;
    }
    if (this.utils.isEmpty(this.Regdetails.DivisionName)) {
      this.toast.warning('Please Enter Division Name');
      return false;
    }
    if (this.utils.isEmpty(this.Regdetails.VillageCode)) {
      this.toast.warning('Please Enter Village Code');
      return false;
    }
    if (this.utils.isEmpty(this.Regdetails.VillageName)) {
      this.toast.warning('Please Enter Village Name');
      return false;
    }
    if (this.utils.isEmpty(this.Regdetails.Phase)) {
      this.toast.warning('Please Select Phase');
      return false;
    }
    

    return true;
  }



  async btnmastrsremove(obj: any): Promise<void> {
    try {
      

        if (confirm("Do you want to Remove Record...?") == true) {
     
        this.Regdetails.VillageCode=obj.VILLAGE_CODE
        this.spinner.show();
        const req = {
          type:"3",
          villageCode:this.Regdetails.VillageCode
          
        };
        const response = await this.masterdata.MaterDataReport(
           
          req
        );
                if (response.success) {
          this.toast.success("Data Remove Successfully ...!");
          window.location.reload();
        } else {
          this.spinner.hide();
          this.toast.info(response.message);
        }
        this.spinner.hide();
      }
      else {
        this.toast.info("Please Check and Verified...!");
      }
      
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
  

 

}
