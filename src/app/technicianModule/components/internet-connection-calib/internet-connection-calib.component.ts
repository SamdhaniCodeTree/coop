import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import * as moment from 'moment';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { CeoService } from 'src/app/ceoModule/services/ceo.service';
import { JcService } from 'src/app/jcModule/services/jc.service';
import { PacsLandAllotmentService } from 'src/app/reportsModule/pacsLandAllotment/services/pacs-land-allotment.service';
import { ConsoleService } from 'src/app/sharedModule/services/console.service';
import { NgxToasterService } from 'src/app/sharedModule/services/ngx-toaster.service';
import { SessionService } from 'src/app/sharedModule/services/session.service';
import { SharedService } from 'src/app/sharedModule/services/shared.service';
import { ToasterService } from 'src/app/sharedModule/services/toaster.service';
import { UtilsService } from 'src/app/sharedModule/services/utils.service';

@Component({
  selector: 'app-internet-connection-calib',
  templateUrl: './internet-connection-calib.component.html',
  styleUrls: ['./internet-connection-calib.component.css']
})
export class InternetConnectionCalibComponent implements OnInit {
  bsDatepickerConfig: Partial<BsDatepickerConfig> = this.utils.getbsdatepicker();
  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private ngxToaster: NgxToasterService,
    private router: Router,
    private utils: UtilsService,
    private session: SessionService,
    private console: ConsoleService,
    private jcAPI: JcService,
    private sharedAPI: SharedService,
    private sanitizer: DomSanitizer,
    private ceoAPI: CeoService
  ) {
    this.minDate = new Date("2022-01-20");
    this.maxDate = this.session.getTodayDate();
  }
  minDate!: Date;
  minDate1!: Date;
  minDate2!: Date;
  minDate3!: Date;
  maxDate!: Date;
  // minDate1!: Date;
  districtId: any;
  DeviceList: any[] = [];
  DICTRICTLIST: any[] = [];
  MANDALLIST: any[] = [];
  PACSLIST: any[] = [];
  TYPELIST: any[] = [];
  DeviceDetailsList: any[] = [];
  pacslistData: any[] = [];
  DistrictlistData: any[] = [];
  MandallistData: any[] = [];
  inspectionDate: any;
  DeliveryNoteDate: any;
  Edit_inspectionDate: any;
  Edit_manufacturedate: any;
  Edit_deliverynotedate: any;
 // Edit_installDate: any;
  installDate: any;
  districtid: any;
  mandalid: any;
  pacsid: any;
  typeCode: any;
  installDateinternet: any;
  Edit_installDate: any;
  ManufactureDate: any;
  btnsubmitstatus = true;
  internetcntvty = false;
  internetshowhide = false;
  internetdtsshow = false;
  internetdtsshow1 = false;
  hidedate = true;
  show = true;



  DeviceDetails = {
    Districtcode: '',
    Mandalcode: '',
    deviceId: '',
    Device_name: '',
    SerialNo: '',
    Acknowledgment: '',
    inspectionDate: '',
    DeviceImage: '',
    componentname: '',
    modeldetails: '',
    invoicepdf: '',
    challanpdf: '',
    ManufactureDate: '',
    installDate: '',
    internetprovname: '',
    internetSpeed: '',
    CoverId: '',

    vendorcharges: '',
    ServicenodeviceImage: '',
    PACS_CODE: '',
    PACS_NAME: '',
    DeliveryNoteDate: '',
    TaxinvoiceNumber: '',
    IsinternetConnection: '',
    pdffileUpd: ''
  }

  // EditDeviceDetails = {
  //   deviceId: '',
  //   Device_name: '',
  //   SerialNo: '',
  //   Acknowledgment: '',
  //   inspectionDate: '',
  //   DeviceImage: '',
  //   Update_DeviceImage: '',
  //   componentname: '',
  //   modeldetails: '',
  //   update_invoicepdf: '',
  //   invoicepdf: '',
  //   challanpdf: '',
  //   update_challanpdf: '',

  //   installDate: '',
  //   internetprovname: '',
  //   internetSpeed: '',
  //   vendorcharges: '',
  //   ServicenodeviceImage: '',
  //   old_ServicenodeviceImage: '',
  //   Packname: '',
  //   DeliveryNote_date: '',
  //   PackId: '',
  //   TaxinvoiceNumber: '',
  // }

  EditDeviceDetails = {
    DistrictName:'',
    MandalName:'',
    deviceId: '',
    Device_name: '',
    SerialNo: '',
    Acknowledgment: '',
    inspectionDate: '',
    DeviceImage: '',
    Update_DeviceImage: '',
    componentname: '',
    modeldetails: '',
    update_invoicepdf: '',
    invoicepdf: '',
    challanpdf: '',
    update_challanpdf: '',
    update_installdocpdf:'',
    installDate: '',
    internetprovname: '',
    internetSpeed: '',
    vendorcharges: '',
    ServicenodeviceImage: '',
    old_ServicenodeviceImage: '',
    Packname: '',
    DeliveryNote_date: '',
    PackId: '',
    TaxinvoiceNumber: '',
    Edit_deliverynotedate: '',
  }
  update_challanpdf: any;
  update_invoicepdf: any;
  update_installdocpdf: any;
  Update_DeviceImage: any;
  invoicepdf: any;
  challanpdf: any;
  DeviceReceivedPopUp = false;
  showtext = false;

  // deviceChange(obj: any) {

  //   let objvalue = this.DeviceList.find(data => data.DEVICE_ID == obj);
  //   debugger;
  //   this.DeviceDetails.Device_name = objvalue.DEVICE_NAME;
  //   if (this.DeviceDetails.deviceId == "111") {
  //     //this.internetshowhide = true;
  //     this.internetdtsshow = true;
  //     this.internetdtsshow1 = false;

  //   }
  //   else if (this.DeviceDetails.deviceId != "111") {
  //     this.internetshowhide = false;
  //     this.internetdtsshow = true;
  //     this.internetdtsshow1 = false;
  //   }
  //   else {
  //     this.internetshowhide = false;
  //     this.internetdtsshow = false;
  //     this.internetdtsshow1 = false;
  //   }


  //   if (this.DeviceDetails.deviceId == "111") {
  //     this.show = false;
  //   }
  //   else {
  //     this.show = true;
  //   }



  //   this.loadDevDetails();
  // }

  pacsname: any;
  PacsChange(obj: any) {

    let objvalue = this.DeviceList.find(data => data.DEVICE_ID == obj);
    debugger;
    this.DeviceDetails.PACS_NAME = objvalue.DEVICE_NAME;
    // this.pacsname:

  }
  errorMessage: string = '';


  // Function to check if the date is valid
  isValidDate(date: any): boolean {
    return date instanceof Date && !isNaN(date.getTime());
  }

  DistChange(obj: any) {
    this.DeviceDetails.Mandalcode = "";
    this.DeviceDetails.PACS_CODE = "";
    this.loadMandalDetails(obj);
  }
  MandalChange(obj: any) {
    this.DeviceDetails.PACS_CODE = "";
    this.loadpacksDetails(obj);
  }

  // this.DeviceDetailslist();

  ngOnInit(): void {
    debugger;

    this.loadDistrictDetails();
    //this.DeviceDetailslistView();
    //this.loadpacksDetails();
    // this.loadDeviceDetails();

    this.loadDistricts();

    let dt = new Date();
    this.inspectionDate = '';
    // this.inspectionDate=this.session.getDateddmmyyyyString(dt);
    // this.inspectionDate= this.session.getTodayDateString(); 
  }

  async loadDistrictDetails(): Promise<void> {
    try {
      debugger;
      const req = {
        type: '1'
        //mobileno: this.session.uniqueId  

      }; debugger;
      this.spinner.show();
      //const response = await this.sharedAPI.Hrmsemp(req);
      const response = await this.ceoAPI.InternetGetDetails(req);
      if (response.success) {
        this.DistrictlistData = response.result;
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async loadDistricts(): Promise<void> {
    try {
      debugger;
      const req = {
        type: 12,
        inserted_by: this.session.userName   
      }; debugger;
      this.spinner.show();
      //const response = await this.sharedAPI.Hrmsemp(req);
      const response = await this.ceoAPI.InternetGetDetails(req);

      console.log(response);
      if (response.success) {
        this.DICTRICTLIST = response.result;
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
  async DistrictsChange(obj:any): Promise<void> {
    try {
      debugger;
      const req = {
        type: 13,
        dist_code:obj,
        inserted_by: this.session.userName   
      }; debugger;
      this.spinner.show();
      //const response = await this.sharedAPI.Hrmsemp(req);
      const response = await this.ceoAPI.InternetGetDetails(req);
       console.log(response)
      if (response.success) {
        this.MANDALLIST = response.result;
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
  async MandalsChange(obj:any): Promise<void> {
    try {
      debugger;
      const req = {
        type: 14,
        dist_code:this.districtid,
        mandal_code:obj,
        inserted_by: this.session.userName   
      }; debugger;
      this.spinner.show();
      //const response = await this.sharedAPI.Hrmsemp(req);
      const response = await this.ceoAPI.InternetGetDetails(req);
      console.log(response);       
      if (response.success) {
        this.PACSLIST = response.result;
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }
  // async PacChange(obj:any): Promise<void> {
  //   try {
  //     debugger;
  //     const req = {
  //       type: 15,
  //       dist_code:this.districtid,
  //       mandal_code:this.mandalid,
  //       pacs_code:obj, 
  //       inserted_by: this.session.userName   
  //     }; debugger;
  //     this.spinner.show(); 
  //     const response = await this.ceoAPI.InternetGetDetails(req);
  //      console.log(response)
  //     if (response.success) {
  //       this.TYPELIST = response.result;
  //     }
  //     this.spinner.hide();
  //   } catch (error) {
  //     this.spinner.hide();
  //     this.utils.catchResponse(error);
  //   }
  // }
  async TYPEChange(obj:any): Promise<void> {
    try {
      debugger;
      const req = {
        type: 15,
        dist_code:this.districtid,
        mandal_code:this.mandalid,
        pacs_code:obj,
        input01:this.typeCode,
        inserted_by: this.session.userName   
      }; debugger;
      this.spinner.show();
      //const response = await this.sharedAPI.Hrmsemp(req);
      const response = await this.ceoAPI.InternetGetDetails(req);
       console.log(response)
      if (response.success) {
        this.DeviceDetailsList = response.result;
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async loadMandalDetails(obj: any): Promise<void> {
    try {
      debugger;
      const req = {
        type: '2',
        dist_code: obj

      }; debugger;
      this.spinner.show();
      // const response = await this.sharedAPI.Hrmsemp(req);
      const response = await this.ceoAPI.InternetGetDetails(req);
      if (response.success) {
        this.MandallistData = response.result;
      }
      else {

      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async loadpacksDetails(obj: any): Promise<void> {
    try {
      debugger;
      const req = {
        type: '3',
        dist_code: this.DeviceDetails.Districtcode,
        mandal_code: obj
      }; debugger;
      this.spinner.show();
      //const response = await this.sharedAPI.Hrmsemp(req);
      const response = await this.ceoAPI.InternetGetDetails(req);
      if (response.success) {
        this.pacslistData = response.result;
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  // async DeviceDetailsView(obj: any): Promise<void> {
  //   try {
  //     debugger;
  //     this.DeviceDetailsList = [];
  //     const req = {
  //       type: '5',
  //       pacs_code: obj,
  //     };
  //     this.spinner.show();
  //     const response = await this.sharedAPI.Hrmsemp(req);
  //     debugger;
  //     if (response.success) {
  //       this.DeviceDetailsList = response.result;

  //     } else {
  //       //this.toast.info(response.message);
  //     }
  //     this.spinner.hide();
  //   } catch (error) {
  //     this.spinner.hide();
  //     this.utils.catchResponse(error);
  //   }
  // }

  // async DeviceDetailslistView(): Promise<void> {
  //   try {
  //     debugger;
  //     this.DeviceDetailsList = [];
  //     const req = {
  //       type: '5',
  //       inserted_by: this.session.userName
  //     };
  //     this.spinner.show();
  //     const response = await this.ceoAPI.InternetGetDetails(req);
  //     debugger;
  //     if (response.success) {
  //       this.DeviceDetailsList = response.result;

  //     } else {
  //       //this.toast.info(response.message);
  //     }
  //     this.spinner.hide();
  //   } catch (error) {
  //     this.spinner.hide();
  //     this.utils.catchResponse(error);
  //   }
  // }

  async btnPhotoView(path: string): Promise<void> {
    try {
      debugger;
      await this.utils.viewJPVImagecop(path);

    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  // async SubmitWithInternetCalibDetails(): Promise<void> {
  //   try {

  //     const req = {
  //       type: "2",
  //       affiliated_dccb_branch: this.DeviceDetails.deviceId,
  //       district_name: this.DeviceDetails.Device_name,
  //       mandal_name: this.DeviceDetails.inspectionDate,
  //       name: this.DeviceDetails.SerialNo,
  //       input1: this.DeviceDetails.DeviceImage,
  //       registration_number: this.session.userName,
  //       dist_code: this.DeviceDetails.PACS_CODE,
  //       mobile_no: this.session.role,
  //       uid_num: this.session.uniqueId,
  //       mail_id: this.DeviceDetails.Acknowledgment,
  //       name_of_the_dccb: this.DeviceDetails.componentname,
  //       pacs_name: this.DeviceDetails.modeldetails,
  //       input2: this.DeviceDetails.invoicepdf,
  //       input3: this.DeviceDetails.challanpdf,
  //       input4: this.DeviceDetails.internetprovname,
  //       input5: this.DeviceDetails.internetSpeed,
  //       input6: this.installDateinternet,
  //       input7: this.DeviceDetails.vendorcharges,
  //       input8: this.DeviceDetails.ServicenodeviceImage,
  //       input9: this.DeviceDetails.DeliveryNoteDate,
  //       input10: this.DeviceDetails.TaxinvoiceNumber
  //     }

  //     this.spinner.show();
  //     const response = await this.ceoAPI.CeoDeviceSubDetails(req);
  //     debugger;
  //     if (response.success) {
  //       this.DeviceDetails.deviceId = '';
  //       this.DeviceDetails.Device_name = '';
  //       this.DeviceDetails.SerialNo = '';
  //       this.DeviceDetails.Acknowledgment = '';
  //       this.DeviceDetails.inspectionDate = '';
  //       this.DeviceDetails.DeviceImage = '';
  //       this.DeviceDetails.componentname = '';
  //       this.DeviceDetails.modeldetails = '';
  //       this.DeviceDetails.invoicepdf = '';
  //       this.DeviceDetails.challanpdf = '';
  //       this.DeviceDetails.installDate = '';
  //       this.DeviceDetails.internetprovname = '';
  //       this.DeviceDetails.internetSpeed = '';
  //       this.DeviceDetails.vendorcharges = '';
  //       this.DeviceDetails.ServicenodeviceImage = '';
  //       this.DeviceDetails.DeliveryNoteDate = '';
  //       this.DeviceDetails.TaxinvoiceNumber = '';
  //       this.DeviceDetails.IsinternetConnection = '';
  //       this.inspectionDate = '';
  //       this.DeliveryNoteDate = '';
  //       $("#giftAndDeedPhotoUpload").val('');
  //       $("#servicePhotoUpload").val('');
  //       alert("Device Details Submitted Successfully");
  //      // this.DeviceDetailslistView(this.DeviceDetails.PACS_CODE);

  //     } else {
  //       this.toast.info(response.message);
  //     }
  //     this.spinner.hide();
  //   }
  //   catch (error) {
  //     this.spinner.hide();
  //     this.utils.catchResponse(error);
  //   }
  // }


  async SubmitWithInternetCalibDetails(): Promise<void> {
    debugger;
    try {

      const req = {

        type: "4",
        dist_code: this.DeviceDetails.Districtcode,
        mandal_code: this.DeviceDetails.Mandalcode,
        pacs_name: this.DeviceDetails.PACS_NAME,
        pacs_code: this.DeviceDetails.PACS_CODE,
        // device_id :,    
        // device_name :,      
        received_date: this.DeviceDetails.inspectionDate,
        // inspection_date :,  
        // maker :,
        manufacture_data: this.DeviceDetails.ManufactureDate,
        cover_status: this.DeviceDetails.CoverId,
        serial_number: this.DeviceDetails.SerialNo,
        device_image_upd: this.DeviceDetails.DeviceImage,
        inserted_by: this.session.userName,
        role: this.session.role,
        unique_id: this.session.uniqueId,
        ack_no: this.DeviceDetails.Acknowledgment,
        component_name: this.DeviceDetails.componentname,
        model_details: this.DeviceDetails.modeldetails,
        tax_invoice: this.DeviceDetails.invoicepdf,
        delivery_challan: this.DeviceDetails.challanpdf,
        isp_name: this.DeviceDetails.internetprovname,
        internet_speed: this.DeviceDetails.internetSpeed,
        date_of_installation: this.DeviceDetails.installDate,
        paidbythe_vendor: this.DeviceDetails.vendorcharges,
        deliverynotdt: this.DeviceDetails.DeliveryNoteDate,
        taxinvoicenumber: this.DeviceDetails.TaxinvoiceNumber,
        installation_doc: this.DeviceDetails.pdffileUpd,
        slno_image: this.DeviceDetails.ServicenodeviceImage,
        //supervisor_file_path :, 
        //sp_remarks_for :,
        //status_remarks :,  
        //internet_doc_path :, 
      }

      this.spinner.show();
      const response = await this.ceoAPI.InternetDtailsInsert(req);
      debugger;
      if (response.success) {
       // this.DeviceDetailsView(this.DeviceDetails.PACS_CODE);
        this.toast.infoNavigate(response.message);
        // this.DeviceDetails.deviceId = '';
        // this.DeviceDetails.Device_name = '';
        // this.DeviceDetails.SerialNo = '';
        // this.DeviceDetails.Acknowledgment = '';
        // this.DeviceDetails.inspectionDate = '';
        // this.DeviceDetails.DeviceImage = '';
        // this.DeviceDetails.componentname = '';
        // this.DeviceDetails.modeldetails = '';
        // this.DeviceDetails.invoicepdf = '';
        // this.DeviceDetails.challanpdf = '';
        // this.DeviceDetails.installDate = '';
        // this.DeviceDetails.internetprovname = '';
        // this.DeviceDetails.internetSpeed = '';
        // this.DeviceDetails.vendorcharges = '';
        // this.DeviceDetails.ServicenodeviceImage = '';
        // this.DeviceDetails.DeliveryNoteDate = '';
        // this.DeviceDetails.TaxinvoiceNumber = '';
        // this.DeviceDetails.IsinternetConnection = '';
        // this.inspectionDate = '';
        // this.DeliveryNoteDate = '';
        // $("#giftAndDeedPhotoUpload").val('');
        // $("#servicePhotoUpload").val('');
        // alert("Device Details Submitted Successfully"); 

      } else {
        this.toast.info(response.message);
      }
      this.spinner.hide();
    }
    catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async SubmitWithoutInternetCalibDetails(): Promise<void> {
    try {
      const req = {
        type: "2",
        affiliated_dccb_branch: this.DeviceDetails.deviceId,
        district_name: this.DeviceDetails.Device_name,
        mandal_name: "",
        name: "",
        input1: "",
        registration_number: this.session.userName,
        dist_code: this.DeviceDetails.PACS_CODE,
        mobile_no: this.session.role,
        uid_num: this.session.uniqueId,
        mail_id: "",
        name_of_the_dccb: "",
        pacs_name: "",
        input2: "",
        input3: "",
        input4: "",
        input5: "",
        input6: "",
        input7: "",
        input8: "",
        input9: "",
        input10: ""
      }
      this.spinner.show();
      const response = await this.ceoAPI.CeoDeviceSubDetails(req);
      debugger;
      if (response.success) {
        this.DeviceDetails.deviceId = '';
        this.DeviceDetails.Device_name = '';
        this.DeviceDetails.SerialNo = '';
        this.DeviceDetails.Acknowledgment = '';
        this.DeviceDetails.inspectionDate = '';
        this.DeviceDetails.DeviceImage = '';
        this.DeviceDetails.componentname = '';
        this.DeviceDetails.modeldetails = '';
        this.DeviceDetails.invoicepdf = '';
        this.DeviceDetails.challanpdf = '';
        this.DeviceDetails.installDate = '';
        this.DeviceDetails.internetprovname = '';
        this.DeviceDetails.internetSpeed = '';
        this.DeviceDetails.vendorcharges = '';
        this.DeviceDetails.ServicenodeviceImage = '';
        this.DeviceDetails.DeliveryNoteDate = '';
        this.DeviceDetails.TaxinvoiceNumber = '';
        this.DeviceDetails.IsinternetConnection = '';
        this.inspectionDate = '';
        this.DeliveryNoteDate = '';
        $("#giftAndDeedPhotoUpload").val('');
        $("#servicePhotoUpload").val('');
        alert("Device Details Submitted Successfully");
        //this.DeviceDetailslistView(this.DeviceDetails.PACS_CODE);

      } else {
        this.toast.info(response.message);
      }
      this.spinner.hide();
    }
    catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }


  async btnCalibration(): Promise<void> {
    try {
      this.validate();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  validate(): boolean {
    if (this.utils.isEmpty(this.DeviceDetails.Districtcode)) {
      this.toast.warning('Please Select District');
      return false;
    }
    if (this.utils.isEmpty(this.DeviceDetails.Mandalcode)) {
      this.toast.warning('Please Select Mandal');
      return false;
    }
    if (this.utils.isEmpty(this.DeviceDetails.PACS_CODE)) {
      this.toast.warning('Please Select PACS');
      return false;
    }
    this.DeviceDetails.ManufactureDate = moment(this.ManufactureDate, 'DD-MM-YYYY').format('DD-MM-YYYY');
    this.DeviceDetails.inspectionDate = moment(this.inspectionDate, 'DD-MM-YYYY').format('DD-MM-YYYY');
    this.DeviceDetails.installDate = moment(this.installDate, 'DD-MM-YYYY').format('DD-MM-YYYY');
    this.DeviceDetails.DeliveryNoteDate = moment(this.DeliveryNoteDate, 'DD-MM-YYYY').format('DD-MM-YYYY');

    if (this.utils.isEmpty(this.DeviceDetails.ManufactureDate) || this.DeviceDetails.ManufactureDate == "Invalid date") {
      this.toast.warning('Please Select Manufacture Date');
      return false;
    }
    if (this.utils.isEmpty(this.DeviceDetails.inspectionDate) || this.DeviceDetails.inspectionDate == "Invalid date") {
      this.toast.warning('Please Select Received Date');
      return false;
    }
    if (this.utils.isEmpty(this.DeviceDetails.DeliveryNoteDate) || this.DeviceDetails.DeliveryNoteDate == "Invalid date") {
      this.toast.warning('Please Select Delivery Note Date');
      return false;
    }

    if (this.utils.isEmpty(this.DeviceDetails.Acknowledgment)) {
      this.toast.warning('Please Enter Delivery Note Number');
      return false;
    }
    if (this.utils.isEmpty(this.DeviceDetails.installDate) || this.DeviceDetails.installDate == "Invalid date") {
      this.toast.warning('Please Select Installation Date');
      return false;
    }
    if (this.utils.isEmpty(this.DeviceDetails.componentname)) {
      this.toast.warning('Please Enter Maker Name');
      return false;
    }
    if (this.utils.isEmpty(this.DeviceDetails.modeldetails)) {
      this.toast.warning('Please Enter Model Details');
      return false;
    }
    if (this.utils.isEmpty(this.DeviceDetails.SerialNo)) {
      this.toast.warning('Please Enter Serial Number');
      return false;
    }
    if (this.utils.isEmpty(this.DeviceDetails.internetprovname)) {
      this.toast.warning('Please Enter Internet Service Provider Name');
      return false;
    }
    if (this.utils.isEmpty(this.DeviceDetails.internetSpeed)) {
      this.toast.warning('Please Enter Internet Speed');
      return false;
    }
    if (this.utils.isEmpty(this.DeviceDetails.TaxinvoiceNumber)) {
      this.toast.warning('Please Enter Tax Invoice Number');
      return false;
    }
    if (this.utils.isEmpty(this.DeviceDetails.DeviceImage)) {
      this.toast.warning('Please Upload Device Image');
      return false;
    }
    if (this.utils.isEmpty(this.DeviceDetails.ServicenodeviceImage)) {
      this.toast.warning('Please Upload Serial Number Image');
      return false;
    }
    if (this.utils.isEmpty(this.DeviceDetails.pdffileUpd)) {
      this.toast.warning('Please Upload Installation Document PDF');
      return false;
    }
    if (this.utils.isEmpty(this.DeviceDetails.invoicepdf)) {
      this.toast.warning('Please Upload Tax Invoice PDF');
      return false;
    }
    if (this.utils.isEmpty(this.DeviceDetails.challanpdf)) {
      this.toast.warning('Please Upload Delivery Challan PDF');
      return false;
    }
    if (this.utils.isEmpty(this.DeviceDetails.CoverId)) {
      this.toast.warning('Please Select is Cover Received');
      return false;
    }
    if (this.DeviceDetails.CoverId == "0") {
      this.toast.warning('Please Select is Cover Received Yes Only');
      return false;
    }
    if (this.utils.isEmpty(this.DeviceDetails.vendorcharges)) {
      this.toast.warning('Please Select Whether the first months charges have been paid by the vendor');
      return false;
    }
    this.SubmitWithInternetCalibDetails();
    return true;

  }

  async onTitledevicePhotoChange_old(event: any): Promise<void> {

    try {

      if (event.target.files.length > 0) {
        const response: any = await this.utils.fileUploadEncodedString(
          event,
          this.utils.fileSize.threeMB
        );
        if (response) {

          let file = (
            this.sanitizer.bypassSecurityTrustResourceUrl(response) as any
          ).changingThisBreaksApplicationSecurity;
          file = file.replace('data:image/jpeg;base64,', '');

          this.DeviceDetails.DeviceImage = file;
          console.log(this.DeviceDetails.DeviceImage);

        } else {
          this.ngxToaster.warning('file is Empty !!!, Please try again.');
          event.target.value = '';
        }
      } else {
        this.ngxToaster.warning('file is Empty !!!, Please try again.');
        event.target.value = '';
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }




  async onTitledevicePhotoChange(event: any): Promise<void> {
    try {
      this.DeviceDetails.DeviceImage = '';
      if (event.target.files.length > 0) {
        if (event.target.files[0].type === 'image/jpeg') {

          const response: any = await this.utils.fileUploadEncodedString(
            event,
            this.utils.fileSize.twoHundredFiftyKB
          );
          if (response) {
            let file = (
              this.sanitizer.bypassSecurityTrustResourceUrl(response) as any
            ).changingThisBreaksApplicationSecurity;
            file = file.replace('data:image/jpeg;base64,', '');
            this.DeviceDetails.DeviceImage = file;

          } else {

            event.target.value = '';
            this.DeviceDetails.DeviceImage = '';
          }
        }
        else {
          alert('Accept Only Jpg files Only..');
          event.target.value = '';
          this.DeviceDetails.DeviceImage = '';
        }
      } else {
        this.ngxToaster.warning('file is Empty !!!, Please try again.');
        event.target.value = '';
        this.DeviceDetails.DeviceImage = '';
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  async onTitleServicenodevicePhotoChange(event: any): Promise<void> {
    try {
      debugger;
      this.DeviceDetails.ServicenodeviceImage = '';
      if (event.target.files.length > 0) {
        if (event.target.files[0].type === 'image/jpeg' || event.target.files[0].type === 'image/JPG') {

          const response: any = await this.utils.fileUploadEncodedString(
            event,
            this.utils.fileSize.twoHundredFiftyKB
          );
          if (response) {
            let file = (
              this.sanitizer.bypassSecurityTrustResourceUrl(response) as any
            ).changingThisBreaksApplicationSecurity;
            file = file.replace('data:image/jpeg;base64,', '');
            this.DeviceDetails.ServicenodeviceImage = file;

          } else {

            event.target.value = '';
            this.DeviceDetails.ServicenodeviceImage = '';
          }
        }
        else {
          alert('Accept Only Jpg files Only..');
          event.target.value = '';
          this.DeviceDetails.DeviceImage = '';
        }
      } else {
        this.ngxToaster.warning('file is Empty !!!, Please try again.');
        event.target.value = '';
        this.DeviceDetails.DeviceImage = '';
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  async onserialnoimageChangeEdit(event: any): Promise<void> {
    try {
      this.EditDeviceDetails.ServicenodeviceImage = '';
      if (event.target.files.length > 0) {
        if (event.target.files[0].type === 'image/jpeg') {

          const response: any = await this.utils.fileUploadEncodedString(
            event,
            this.utils.fileSize.twoHundredFiftyKB
          );
          if (response) {
            let file = (
              this.sanitizer.bypassSecurityTrustResourceUrl(response) as any
            ).changingThisBreaksApplicationSecurity;
            file = file.replace('data:image/jpeg;base64,', '');
            this.EditDeviceDetails.ServicenodeviceImage = file;

          } else {

            event.target.value = '';
            this.EditDeviceDetails.ServicenodeviceImage = '';
          }
        }
        else {
          alert('Accept Only Jpg files Only..');
          event.target.value = '';
          this.DeviceDetails.DeviceImage = '';
        }
      } else {
        this.ngxToaster.warning('file is Empty !!!, Please try again.');
        event.target.value = '';
        this.DeviceDetails.DeviceImage = '';
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  } 
  async onpdffileChangeinvoice(event: any): Promise<void> {
    try {
      debugger;
      this.invoicepdf = "";
      if (event.target.files.length > 0) {

        if (event.target.files[0].type === 'application/pdf') {
          const response: any = await this.utils.fileUploadEncodedString(
            event,
            this.utils.fileSize.threeMB
          );
          if (response) {

            let file = (
              this.sanitizer.bypassSecurityTrustResourceUrl(response) as any
            ).changingThisBreaksApplicationSecurity;
            file = file.replace('data:application/pdf;base64,', '');
            debugger;
            this.DeviceDetails.invoicepdf = file;
          } else {
            this.ngxToaster.warning('file is Empty !!!, Please try again.');
            event.target.value = '';
          }
        }
        else {
          alert('Accept Only Pdf files Only..');
          this.DeviceDetails.invoicepdf = "";
          event.target.value = '';
        }
      } else {
        this.ngxToaster.warning('file is Empty !!!, Please try again.');
        event.target.value = '';
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }


  async onDeviceImageChangeEdit(event: any): Promise<void> {
    try {

      this.EditDeviceDetails.Update_DeviceImage = '';
      if (event.target.files.length > 0) {
        if (event.target.files[0].type === 'image/jpeg') {

          const response: any = await this.utils.fileUploadEncodedString(
            event,
            this.utils.fileSize.twoHundredFiftyKB
          );
          if (response) {
            let file = (
              this.sanitizer.bypassSecurityTrustResourceUrl(response) as any
            ).changingThisBreaksApplicationSecurity;
            file = file.replace('data:image/jpeg;base64,', '');
            this.EditDeviceDetails.Update_DeviceImage = file;

          } else {

            event.target.value = '';
            this.EditDeviceDetails.Update_DeviceImage = '';
          }
        }
        else {
          alert('Accept Only Jpg files Only..');
          event.target.value = '';
          this.DeviceDetails.DeviceImage = '';
        }
      } else {
        this.ngxToaster.warning('file is Empty !!!, Please try again.');
        event.target.value = '';
        this.DeviceDetails.DeviceImage = '';
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }


  async onpdffileChangeChallan(event: any): Promise<void> {
    try {
      debugger;
      this.challanpdf = "";
      if (event.target.files.length > 0) {

        if (event.target.files[0].type === 'application/pdf') {
          const response: any = await this.utils.fileUploadEncodedString(
            event,
            this.utils.fileSize.threeMB
          );
          if (response) {

            let file = (
              this.sanitizer.bypassSecurityTrustResourceUrl(response) as any
            ).changingThisBreaksApplicationSecurity;
            file = file.replace('data:application/pdf;base64,', '');
            debugger;
            this.DeviceDetails.challanpdf = file;
          } else {
            this.ngxToaster.warning('file is Empty !!!, Please try again.');
            this.DeviceDetails.challanpdf = "";
            event.target.value = '';
          }
        }
        else {
          alert('Accept Only Pdf files Only..');
          this.challanpdf = "";
          event.target.value = '';
        }
      } else {
        this.ngxToaster.warning('file is Empty !!!, Please try again.');
        this.challanpdf = "";
        event.target.value = '';
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  async ontaxinvoiceChangeEdit(event: any): Promise<void> {
    try {
      debugger;
      this.update_invoicepdf = "";
      if (event.target.files.length > 0) {

        if (event.target.files[0].type === 'application/pdf') {
          const response: any = await this.utils.fileUploadEncodedString(
            event,
            this.utils.fileSize.threeMB
          );
          if (response) {

            let file = (
              this.sanitizer.bypassSecurityTrustResourceUrl(response) as any
            ).changingThisBreaksApplicationSecurity;
            file = file.replace('data:application/pdf;base64,', '');
            debugger;
            this.EditDeviceDetails.update_invoicepdf = file;
          } else {
            this.ngxToaster.warning('file is Empty !!!, Please try again.');
            this.EditDeviceDetails.update_invoicepdf = "";
            event.target.value = '';
          }
        }
        else {
          alert('Accept Only Pdf files Only..');
          this.challanpdf = "";
          event.target.value = '';
        }
      } else {
        this.ngxToaster.warning('file is Empty !!!, Please try again.');
        this.challanpdf = "";
        event.target.value = '';
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }
  async oninstalldocupdChangeEdit(event: any): Promise<void> {
    try {
      debugger;
      this.update_installdocpdf = "";
      if (event.target.files.length > 0) {

        if (event.target.files[0].type === 'application/pdf') {
          const response: any = await this.utils.fileUploadEncodedString(
            event,
            this.utils.fileSize.threeMB
          );
          if (response) {

            let file = (
              this.sanitizer.bypassSecurityTrustResourceUrl(response) as any
            ).changingThisBreaksApplicationSecurity;
            file = file.replace('data:application/pdf;base64,', '');
            debugger;
            this.EditDeviceDetails.update_installdocpdf = file;
          } else {
            this.ngxToaster.warning('file is Empty !!!, Please try again.');
            this.EditDeviceDetails.update_invoicepdf = "";
            event.target.value = '';
          }
        }
        else {
          alert('Accept Only Pdf files Only..');
          this.challanpdf = "";
          event.target.value = '';
        }
      } else {
        this.ngxToaster.warning('file is Empty !!!, Please try again.');
        this.challanpdf = "";
        event.target.value = '';
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }

  async ondeliverychallanChangeEdit(event: any): Promise<void> {
    try {

      this.update_challanpdf = "";
      if (event.target.files.length > 0) {

        if (event.target.files[0].type === 'application/pdf') {
          const response: any = await this.utils.fileUploadEncodedString(
            event,
            this.utils.fileSize.threeMB
          );
          if (response) {

            let file = (
              this.sanitizer.bypassSecurityTrustResourceUrl(response) as any
            ).changingThisBreaksApplicationSecurity;
            file = file.replace('data:application/pdf;base64,', '');
            debugger;
            this.EditDeviceDetails.update_challanpdf = file;
          } else {
            this.ngxToaster.warning('file is Empty !!!, Please try again.');
            event.target.value = '';
          }
        }
        else {
          alert('Accept Only Pdf files Only..');
          this.EditDeviceDetails.update_challanpdf = "";
          event.target.value = '';
        }
      } else {
        this.ngxToaster.warning('file is Empty !!!, Please try again.');
        event.target.value = '';
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }





  async btnViewEdit(obj: any): Promise<void> {

   console.log(obj);
    debugger;
    this.EditDeviceDetails.DistrictName = obj.DISTRICT_NAME;
    this.EditDeviceDetails.MandalName = obj.MANDAL_NAME;
    this.EditDeviceDetails.deviceId = obj.DEVICE_ID;
    this.EditDeviceDetails.Device_name = obj.DEVICE_NAME;
    this.Edit_inspectionDate = obj.RECEIVED_DATE;
    this.Edit_deliverynotedate = obj.CL_INSPECTION_DATE;
    this.EditDeviceDetails.SerialNo = obj.SERIAL_NUMBER;
    this.EditDeviceDetails.Acknowledgment = obj.ACK_NO;
    this.EditDeviceDetails.componentname = obj.COMPONENT_NAME;
    this.EditDeviceDetails.modeldetails = obj.MODEL_DETAILS;
    this.EditDeviceDetails.DeviceImage = obj.DEVICE_IMAGE;
    this.EditDeviceDetails.invoicepdf = obj.TAX_INVOICE;
    this.EditDeviceDetails.challanpdf = obj.DELIVERY_CHALLAN;
    this.EditDeviceDetails.internetprovname = obj.INTERNET_SERVICE_PROVIDER_NAME;
    this.EditDeviceDetails.internetSpeed = obj.INTERNET_SPEED;
    this.installDate = obj.DATE_OF_INSTALLATION;
    this.Edit_manufacturedate = obj.CL_MANUFACTURE_DATA;
    this.Edit_installDate = obj.DATE_OF_INSTALLATION;
    //this.installDate = obj.DATE_OF_INSTALLATION;
    this.EditDeviceDetails.vendorcharges = obj.PAIDBYTHE_VENDOR;
    this.EditDeviceDetails.Packname = obj.PACS_NAME;
    this.EditDeviceDetails.PackId = obj.PACS_CODE;

    this.EditDeviceDetails.old_ServicenodeviceImage = obj.SLNO_IMAGE,
     // this.Edit_DeliveryNote_date = obj.DELIVERYNOTDT,
      this.EditDeviceDetails.TaxinvoiceNumber = obj.TAXINVOICENUMBER,
      this.DeviceReceivedPopUp = true;

    if (obj.DEVICE_ID === 111) {
      this.internetcntvty = true;
    }
    else {
      this.internetcntvty = false;
    }

  }

  // async btnupdate(): Promise<void> {

  //   if (this.EditDeviceDetails.deviceId != "111") {

  //     if (this.Edit_inspectionDate === '' || this.Edit_inspectionDate === null || this.Edit_inspectionDate === undefined ||
  //       this.Edit_inspectionDate === 'Invalid date') {
  //       this.toast.warning('Please Select Received Date');
  //       return;
  //     }
  //     // if (this.Edit_DeliveryNote_date === '' || this.Edit_DeliveryNote_date === null || this.Edit_DeliveryNote_date === undefined ||
  //     //   this.Edit_DeliveryNote_date === 'Invalid date') {
  //     //   this.toast.warning('Please Select Received Date');
  //     //   return;
  //     // }
  //     if (this.EditDeviceDetails.SerialNo === '' || this.EditDeviceDetails.SerialNo === null || this.EditDeviceDetails.SerialNo === undefined) {
  //       this.toast.warning('Please Enter Serial Number');
  //       return;
  //     }
  //     if (this.EditDeviceDetails.Acknowledgment === '' || this.EditDeviceDetails.Acknowledgment === null || this.EditDeviceDetails.Acknowledgment === undefined) {
  //       this.toast.warning('Please Enter Acknowledgment Number');
  //       return;
  //     }
  //     if (this.EditDeviceDetails.componentname === '' || this.EditDeviceDetails.componentname === null || this.EditDeviceDetails.componentname === undefined) {
  //       this.toast.warning('Please Enter Maker Name');
  //       return;
  //     }
  //     if (this.EditDeviceDetails.modeldetails === '' || this.EditDeviceDetails.modeldetails === null || this.EditDeviceDetails.modeldetails === undefined) {
  //       this.toast.warning('Please Enter Model Details');
  //       return;
  //     }
  //     if (this.EditDeviceDetails.TaxinvoiceNumber === '' || this.EditDeviceDetails.TaxinvoiceNumber === null || this.EditDeviceDetails.TaxinvoiceNumber === undefined) {
  //       this.toast.warning('Please Enter Tax Invoice Number');
  //       return;
  //     }

  //   }

  //   this.EditDeviceDetails.inspectionDate = moment(this.Edit_inspectionDate, 'DD-MM-YYYY').format('DD-MM-YYYY');
  //   this.EditDeviceDetails.installDate = moment(this.installDate, 'DD-MM-YYYY').format('DD-MM-YYYY');
  //   this.EditDeviceDetails.Edit_deliverynotedate = moment(this.Edit_deliverynotedate, 'DD-MM-YYYY').format('DD-MM-YYYY');

  //   if (this.EditDeviceDetails.inspectionDate == 'Invalid date') {
  //     this.EditDeviceDetails.inspectionDate = '';
  //   }
  //   if (this.EditDeviceDetails.installDate == 'Invalid date') {
  //     this.EditDeviceDetails.installDate = '';
  //   }
  //   if (this.EditDeviceDetails.DeliveryNote_date == 'Invalid date') {
  //     this.EditDeviceDetails.DeliveryNote_date = '';
  //   }
  //   debugger;
  //   // if(this.EditDeviceDetails.deviceId=="111")
  //   // {

  //   //   if (this.EditDeviceDetails.internetprovname === '' ||  this.EditDeviceDetails.internetprovname === null ||    this.EditDeviceDetails.internetprovname === undefined) {
  //   //     this.toast.warning('Please Enter Internet Service Provider Name');
  //   //     return;
  //   //   }
  //   //   if (this.EditDeviceDetails.internetSpeed === '' ||  this.EditDeviceDetails.internetSpeed === null ||    this.EditDeviceDetails.internetSpeed === undefined) {
  //   //     this.toast.warning('Please Enter Internet Speed');
  //   //     return;
  //   //   }
  //   //   if (this.EditDeviceDetails.installDate === '' ||  this.EditDeviceDetails.installDate === null ||    this.EditDeviceDetails.installDate === undefined) {
  //   //     this.toast.warning('Please Enter Date of Installation');
  //   //     return;
  //   //   }
  //   //   if (this.EditDeviceDetails.vendorcharges === '' ||  this.EditDeviceDetails.vendorcharges === null ||    this.EditDeviceDetails.vendorcharges === undefined) {
  //   //     this.toast.warning('Please Select Whether the first months charges Have Been Paid by the Vendor');
  //   //     return;

  //   //   }
  //   // }

  //   const req = {
  //     type: "2",
  //     input4: this.EditDeviceDetails.deviceId,
  //     district_name: this.EditDeviceDetails.Device_name,
  //     mandal_name: this.EditDeviceDetails.inspectionDate,
  //     name: this.EditDeviceDetails.SerialNo,
  //     mail_id: this.EditDeviceDetails.Acknowledgment,
  //     name_of_the_dccb: this.EditDeviceDetails.componentname,
  //     input1: this.EditDeviceDetails.Update_DeviceImage,
  //     input2: this.EditDeviceDetails.update_invoicepdf,
  //     input3: this.EditDeviceDetails.update_challanpdf,
  //     // registration_number:this.session.userName,	 
  //     pacs_code: this.EditDeviceDetails.PackId,
  //     //mobile_no:this.session.role,         
  //     //uid_num:this.session.uniqueId, 
  //     pacs_name: this.EditDeviceDetails.modeldetails,
  //     oldImage: this.EditDeviceDetails.DeviceImage,
  //     oldInvoice: this.EditDeviceDetails.invoicepdf,
  //     oldChalana: this.EditDeviceDetails.challanpdf,


  //     input5: this.EditDeviceDetails.internetprovname,
  //     input6: this.EditDeviceDetails.internetSpeed,
  //     input7: this.EditDeviceDetails.installDate,
  //     input8: this.EditDeviceDetails.vendorcharges,
  //     input9: this.EditDeviceDetails.ServicenodeviceImage,
  //     input10: this.EditDeviceDetails.DeliveryNote_date,
  //     input11: this.EditDeviceDetails.TaxinvoiceNumber,

  //     input15: this.EditDeviceDetails.old_ServicenodeviceImage

  //   }

  //   this.spinner.show();
  //   const response = await this.ceoAPI.CeoDeviceSubDetailsEdit(req);
  //   // const response = await this.ceoAPI.calibrationDeviceDetails(req);
  //   debugger;
  //   if (response.success) {
  //     // this.EditDeviceDetails = {
  //     //   deviceId: '',
  //     //   Device_name: '',
  //     //   SerialNo: '',
  //     //   Acknowledgment: '',
  //     //   inspectionDate: '',
  //     //   DeviceImage: '',
  //     //   Update_DeviceImage: '',
  //     //   componentname: '',
  //     //   modeldetails: '',
  //     //   update_invoicepdf: '',
  //     //   invoicepdf: '',
  //     //   challanpdf: '',
  //     //   update_challanpdf: '',

  //     //   installDate: '',
  //     //   internetprovname: '',
  //     //   internetSpeed: '',
  //     //   vendorcharges: '',
  //     //   ServicenodeviceImage: '',
  //     //   old_ServicenodeviceImage: '',
  //     //   Packname: '',
  //     //   DeliveryNote_date: '',
  //     //   PackId: '',
  //     //   TaxinvoiceNumber: '',
  //     // }
  //     this.Edit_inspectionDate = '';
  //     this.DeviceReceivedPopUp = false;
  //     //this.DeviceDetailslistView(this.DeviceDetails.PACS_CODE);
  //     $("#giftAndDeedPhotoUpload").val('');
  //     $("#challanpdfupload").val('');
  //     $("#taxinvoiceUpload").val('');
  //     alert("Device Details Updated Successfully");
  //     //this.DeviceDetailslist();


  //   } else {
  //     this.toast.info(response.message);
  //   }
  //   this.spinner.hide();
  //   // }

  // }

  btnupdate(){
   alert("working in process");
  }



  async btnPDFView(path: string): Promise<void> {
    try {
      debugger;
      await this.utils.viewJPVPDFcop(path);

    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }



  async btnPDF(): Promise<void> {
    debugger;
    try {

      const req = {
        pack_id: this.session.pacId
        //input2:this.year
      };
      debugger;
      const fileName = 'Calibration Details';
      let basePDF = '';
      this.spinner.show();

      const res = await this.ceoAPI.CalibrationDetails(req);
      if (res.success) {
        basePDF = res.result;
        this.utils.downloadPdfFile(basePDF, fileName);
      } else {
        this.toast.info(res.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async loadDevDetails(): Promise<void> {
    debugger;
    try {

      const req = {
        type: 48,
        cfmsid: this.DeviceDetails.deviceId,
      };
      this.spinner.show();
      const res = await this.sharedAPI.Hrmsemp(req);
      if (res.success) {
        this.DeviceDetails.componentname = res.result[0].MAKER;
        this.DeviceDetails.modeldetails = res.result[0].MODEL;
      } else {
        this.toast.info(res.message);
      }
      this.spinner.hide();
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  oninternetchange() {
    if (this.DeviceDetails.IsinternetConnection == "2") {
      this.showtext = true;
    }
    else {
      this.showtext = false;
    }

    if (this.DeviceDetails.IsinternetConnection === "1") {
      this.internetdtsshow = true;
      this.internetdtsshow1 = true;
    }
    else {
      this.internetdtsshow = false;
      this.internetdtsshow1 = false;
    }
  }

  onReceivedDateChange() {

    this.minDate2 = this.inspectionDate;

    // if (this.isValidDate(date)) {
    //   console.log('Valid date:', date); // Check what date is being selected
    //   this.errorMessage = ''; // Clear error message if valid
    // } else {
    //   this.toast.info("Invalid date selected!");
    //   return false;
    // }

    // this.minDate=new Date(date);

    // if(date){
    //   this.hidedate = false;
    // }
    // else{
    //   this.hidedate=true;
    // }
  }

  ondeliveryDateChange() {
    this.minDate3 = this.DeliveryNoteDate;
  }

  onDeliveryNumberChange() {
    // Remove whitespace from beginning and end, or handle as desired
   // this.DeviceDetails.Acknowledgment = this.DeviceDetails.Acknowledgment.trim();

    // Optionally, check if only whitespace was entered
   // if (this.DeviceDetails.Acknowledgment.length === 0) {
      // Handle invalid whitespace-only input here
      // alert('Whitespace is not allowed. Please enter a valid name.');
      // this.object.DeviceName = ''; // Reset field
  //  }


 // Remove whitespace from beginning and end
 this.DeviceDetails.Acknowledgment = this.DeviceDetails.Acknowledgment.trim();

 // Check if the first character is a symbol or non-alphanumeric character
 const invalidStartPattern = /^[^a-zA-Z0-9]/;

 if (invalidStartPattern.test(this.DeviceDetails.Acknowledgment)) {
     // Handle invalid characters at the start here
    // alert('Invalid character at the start. Please enter a valid name.');
     this.ngxToaster.warning('Invalid character at the start. Please enter a valid name.');
     // Optionally, you can reset the field or handle it accordingly
     this.DeviceDetails.Acknowledgment = ""; // Reset field
     return;
 }

 // Optionally, check if only whitespace or an empty string was entered
 if (this.DeviceDetails.Acknowledgment.length === 0) {
     // Handle invalid whitespace-only input here
    // alert('Whitespace is not allowed. Please enter a valid name.');
     // Reset field
     this.DeviceDetails.Acknowledgment = '';
 }




  }
  onMakerChange() {
    // Remove whitespace from beginning and end, or handle as desired
    // this.DeviceDetails.componentname = this.DeviceDetails.componentname.trim();

    // // Optionally, check if only whitespace was entered
    // if (this.DeviceDetails.componentname.length === 0) {
    //   // Handle invalid whitespace-only input here
    //   // alert('Whitespace is not allowed. Please enter a valid name.');
    //   // this.object.DeviceName = ''; // Reset field
    // }

  
 this.DeviceDetails.componentname = this.DeviceDetails.componentname.trim();
 const invalidStartPattern = /^[^a-zA-Z0-9]/;
 if (invalidStartPattern.test(this.DeviceDetails.componentname)) {    
     this.DeviceDetails.componentname = ''; // Reset field
     return;
 }
 if (this.DeviceDetails.componentname.length === 0) {    
     this.DeviceDetails.componentname = '';

 }
  }
  onModelChange() {
    // Remove whitespace from beginning and end, or handle as desired
    // this.DeviceDetails.modeldetails = this.DeviceDetails.modeldetails.trim();

    // // Optionally, check if only whitespace was entered
    // if (this.DeviceDetails.modeldetails.length === 0) {
    //   // Handle invalid whitespace-only input here
    //   // alert('Whitespace is not allowed. Please enter a valid name.');
    //   // this.object.DeviceName = ''; // Reset field
    // }

    this.DeviceDetails.modeldetails = this.DeviceDetails.modeldetails.trim();
    const invalidStartPattern = /^[^a-zA-Z0-9]/;
    if (invalidStartPattern.test(this.DeviceDetails.modeldetails)) {    
        this.DeviceDetails.modeldetails = ''; // Reset field
        return;
    }
    if (this.DeviceDetails.modeldetails.length === 0) {    
        this.DeviceDetails.modeldetails = '';
    }
  }
  onSerialChange() {
    // Remove whitespace from beginning and end, or handle as desired
    // this.DeviceDetails.SerialNo = this.DeviceDetails.SerialNo.trim();

    // // Optionally, check if only whitespace was entered
    // if (this.DeviceDetails.SerialNo.length === 0) {
    //   // Handle invalid whitespace-only input here
    //   // alert('Whitespace is not allowed. Please enter a valid name.');
    //   // this.object.DeviceName = ''; // Reset field
    // }

    this.DeviceDetails.SerialNo = this.DeviceDetails.SerialNo.trim();
    const invalidStartPattern = /^[^a-zA-Z0-9]/;
    if (invalidStartPattern.test(this.DeviceDetails.SerialNo)) {    
        this.DeviceDetails.SerialNo = ''; // Reset field
        return;
    }
    if (this.DeviceDetails.SerialNo.length === 0) {    
        this.DeviceDetails.SerialNo = '';
    }
  }
  onProviderChange() {
    // Remove whitespace from beginning and end, or handle as desired
    // this.DeviceDetails.internetprovname = this.DeviceDetails.internetprovname.trim();

    // // Optionally, check if only whitespace was entered
    // if (this.DeviceDetails.internetprovname.length === 0) {
    //   // Handle invalid whitespace-only input here
    //   // alert('Whitespace is not allowed. Please enter a valid name.');
    //   // this.object.DeviceName = ''; // Reset field
    // }

    this.DeviceDetails.internetprovname = this.DeviceDetails.internetprovname.trim();
    const invalidStartPattern = /^[^a-zA-Z0-9]/;
    if (invalidStartPattern.test(this.DeviceDetails.internetprovname)) {    
        this.DeviceDetails.internetprovname = ''; // Reset field
        return;
    }
    if (this.DeviceDetails.internetprovname.length === 0) {    
        this.DeviceDetails.internetprovname = '';
    }
  }
  oninterChange() {
    // Remove whitespace from beginning and end, or handle as desired
    // this.DeviceDetails.internetSpeed = this.DeviceDetails.internetSpeed.trim();

    // // Optionally, check if only whitespace was entered
    // if (this.DeviceDetails.internetSpeed.length === 0) {
    //   // Handle invalid whitespace-only input here
    //   // alert('Whitespace is not allowed. Please enter a valid name.');
    //   // this.object.DeviceName = ''; // Reset field
    // }

    this.DeviceDetails.internetSpeed = this.DeviceDetails.internetSpeed.trim();
    const invalidStartPattern = /^[^a-zA-Z0-9]/;
    if (invalidStartPattern.test(this.DeviceDetails.internetSpeed)) {    
        this.DeviceDetails.internetSpeed = ''; // Reset field
        return;
    }
    if (this.DeviceDetails.internetSpeed.length === 0) {    
        this.DeviceDetails.internetSpeed = '';
    }
  }
  ontaxinvoiceChange() { 
    this.DeviceDetails.TaxinvoiceNumber = this.DeviceDetails.TaxinvoiceNumber.trim();
    const invalidStartPattern = /^[^a-zA-Z0-9]/;
    if (invalidStartPattern.test(this.DeviceDetails.TaxinvoiceNumber)) {    
        this.DeviceDetails.TaxinvoiceNumber = ''; // Reset field
        return;
    }
    if (this.DeviceDetails.TaxinvoiceNumber.length === 0) {    
        this.DeviceDetails.TaxinvoiceNumber = '';
    }
  }

  async onpdffileChange(event: any): Promise<void> {
    try {
      debugger;
      this.DeviceDetails.pdffileUpd = "";
      if (event.target.files.length > 0) {

        if (event.target.files[0].type === 'application/pdf') {
          const response: any = await this.utils.fileUploadEncodedString(
            event,
            this.utils.fileSize.threeMB
          );
          if (response) {

            let file = (
              this.sanitizer.bypassSecurityTrustResourceUrl(response) as any
            ).changingThisBreaksApplicationSecurity;
            file = file.replace('data:application/pdf;base64,', '');
            debugger;
            this.DeviceDetails.pdffileUpd = file;
          } else {
            this.ngxToaster.warning('file is Empty !!!, Please try again.');
            this.DeviceDetails.pdffileUpd = "";
            event.target.value = '';
          }
        }
        else {
          alert('Accept Only Pdf files Only..');
          this.DeviceDetails.pdffileUpd = "";
          event.target.value = '';
        }
      } else {
        this.ngxToaster.warning('file is Empty !!!, Please try again.');
        this.DeviceDetails.pdffileUpd = "";
        event.target.value = '';
      }
    } catch (error) {
      this.utils.catchResponse(error);
    }
  }



  onmanufacturedatechange() {
    debugger;
    this.minDate1 = this.ManufactureDate;

    //new Date("2022-01-20");
  }


  // textname: string = 'iamajayfrom,ryapuramnalgonda,fgtlrgjntr,rgthgtrh,';

  // // Function to transform the text, replacing commas with new lines
  // getTransformedText(): string {
  //   return this.textname.split(',').join('\n');  // Replace commas with new lines
  // }

}