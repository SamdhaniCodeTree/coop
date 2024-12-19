import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DlcoService } from 'src/app/dlcoModule/services/dlco.service';
import { PacsLandAllotmentService } from 'src/app/reportsModule/pacsLandAllotment/services/pacs-land-allotment.service';
import { ConsoleService } from 'src/app/sharedModule/services/console.service';
import { NgxToasterService } from 'src/app/sharedModule/services/ngx-toaster.service';
import { SessionService } from 'src/app/sharedModule/services/session.service';
import { SharedService } from 'src/app/sharedModule/services/shared.service';
import { ToasterService } from 'src/app/sharedModule/services/toaster.service';
import { UtilsService } from 'src/app/sharedModule/services/utils.service';

@Component({
  selector: 'app-delete-details-phase-whise',
  templateUrl: './delete-details-phase-whise.component.html',
  styleUrls: ['./delete-details-phase-whise.component.css']
})
export class DeleteDetailsPhaseWhiseComponent implements OnInit {

  
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
  MPFCDetailsList: any[] = [];
  SurveypacksList: any[] = [];
  Divsionlist: any[] = [];
  ngOnInit(): void {
    this.Viewdetails=false;
    this.AddDetails=true;
    this.loaddistricts();
   // this.loadReport();
   
  }
  userMessage:any;
  stateDetailsMasterdata: any = [];
  Viewdetails=false;
  AddDetails=false;
  Regdetails = {
ModuleType:'',
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
    this.Regdetails.DivisionCode=obj;
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
    this.MPFCDetailsList=[];
    // if (this.Regdetails.DistrictCode === '') {
    //   return;
    // }
    this.loadDivision();
  }
  onMandalChange(): void {
    this.Regdetails.RbkCode = '';
    this.Regdetails.VillageCode = '';
    this.rbkList = [];
    if (this.Regdetails.MandalCode === '') {
      return;
    }
    this.MPFCDetailsList=[];
    this.PACSList();
  }

  onpacsChange():void{
    if (this.Regdetails.PackCode === '') {
      return;
    }
    this.MPFCDetailsList=[];
    this.loadRBKList();
  }
  RequestType='';
  onRbkChange(): void {
    this.Regdetails.VillageCode = '';
    this.MPFCDetailsList = [];
    
    if(this.Regdetails.ModuleType=="9")
    {
      if (this.utils.isEmpty(this.Regdetails.Phase)) {
        this.toast.warning('Please Select Phase');
        return;
      }
      this.RequestType="9";
    }
    if(this.Regdetails.ModuleType=="999")
    {
      this.RequestType="11";
    }
    
    if (this.utils.isEmpty(this.Regdetails.DistrictCode)) {
      this.toast.warning('Please Select District Name');
      return;
    }
    if (this.utils.isEmpty(this.Regdetails.DivisionCode)) {
      this.toast.warning('Please Select Division Name');
      return;
    }
    if (this.utils.isEmpty(this.Regdetails.MandalCode)) {
      this.toast.warning('Please Select Mandal Name');
      return;
    }
    if (this.utils.isEmpty(this.Regdetails.PackCode)) {
      this.toast.warning('Please Select Pack Name');
      return;
    }
    if (this.utils.isEmpty(this.Regdetails.RbkCode)) {
      this.toast.warning('Please Select RBK Name');
      return;
    }
    if (this.Regdetails.RbkCode === '') {
      return;
    }
    this.loadVillageList(this.RequestType);
  }

  async loadDivision(): Promise<void> {
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
        divisionCode:this.Regdetails.DivisionCode,        
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
        divisionCode:this.Regdetails.DivisionCode, 
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
        divisionCode:this.Regdetails.DivisionCode, 
        mandalCode: this.Regdetails.MandalCode,
        packCode:this.Regdetails.PackCode,
        type:'8'
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

  async loadVillageList(reqtype:any): Promise<void> {
    try {
      const req = {
        districtCode: this.Regdetails.DistrictCode,
        divisionCode:this.Regdetails.DivisionCode, 
        mandalCode: this.Regdetails.MandalCode,
        packCode:this.Regdetails.PackCode,
        rbkCode:this.Regdetails.RbkCode,
        phasetype:this.Regdetails.Phase,
        type:reqtype
      };
      this.spinner.show();
      const response = await this.masterdata.MaterDataReport(req);
      debugger;
      if (response.success) {
        debugger;
        this.MPFCDetailsList = response.result;
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

  // async btnmastrsSub(allotmentStatus: any): Promise<void> {
  //   try {
  //     debugger;
  //     if (this.validate()) {
        
  //       this.spinner.show();
  //       const req = {
         
  //         type:"1",
  //         districtCode:this.Regdetails.DistrictCode,
	//         districtName:this.Regdetails.DistrictName,
	//        mandalCode:this.Regdetails.MandalCode,
  //     	mandalName:this.Regdetails.MandalName,
  //     	packCode:this.Regdetails.PackCode,
  //       packName:this.Regdetails.PackName,
  //     	rbkCode:this.Regdetails.RbkCode,
  //     	rbkName:this.Regdetails.RbkName,
  //     	divisionCode:this.Regdetails.DivisionCode,
  //     	divisionName:this.Regdetails.DivisionName,
  //     	villageCode:this.Regdetails.VillageCode,
  //     	villageName:this.Regdetails.VillageName,
  //     	insertby:this.session.userName,
  //     	phasetype:this.Regdetails.Phase
          
  //       };
  //       const response = await this.masterdata.MasterDetailsInsert(
           
  //         req
  //       );
  //       debugger;
  //       if (response.success) {
  //         alert(response.message);
  //         window.location.reload();
  //       } else {
  //         this.spinner.hide();
  //         this.toast.info(response.message);
  //       }
  //       this.spinner.hide();
  //     }
  //   } catch (error) {
  //     this.spinner.hide();
  //     this.utils.catchResponse(error);
  //   }
  // }
 


Removetype='';
  async btnmastrsremove(obj: any): Promise<void> {
    try {
      
      if(this.Regdetails.ModuleType=="9")
      {
this.Removetype="10";
      }
      if(this.Regdetails.ModuleType=="999"){
        this.Removetype="12";
      }

        if (confirm("Do you want to Remove Record...?") == true) {
     
        this.Regdetails.VillageCode=obj.VILLAGE_CODE
        this.spinner.show();
        const req = {
          type:this.Removetype,
          rbkCode:obj.RBK_CODE,
          villageName:obj.SURVEY_NUMBER

          
        };
        const response = await this.masterdata.MaterDataReport(
           
          req
        );
        debugger;
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