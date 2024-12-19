import { AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { MpfcLandInspectionService } from 'src/app/reportsModule/mpfcLandInspection/services/mpfc-land-inspection.service';
import { SessionService } from 'src/app/sharedModule/services/session.service';
import { SharedService } from 'src/app/sharedModule/services/shared.service';
import { ToasterService } from 'src/app/sharedModule/services/toaster.service';
import { UtilsService } from 'src/app/sharedModule/services/utils.service';

@Component({
    selector: 'app-calibration-payments',
    templateUrl: './calibration-payments.component.html',
    styleUrls: ['./calibration-payments.component.css']
})
export class CalibrationPaymentsComponent implements OnInit, OnDestroy, AfterViewInit {
    // tslint:disable-next-line: no-output-on-prefix
    type = '';
    districtId = '';
    @Output() onDistrictChange = new EventEmitter<string>();
    DEVICEDETAILSLIST: any = [];
    selectedRecords: any[] = [];
    DCCBLIST: any[] = [];
    EQUIPMENTLIST: any[] = [];

    dccbid: any;
    equipmentid: any;
    Count: any;
    Counttot: any;
    values: any;
    totalSum = 0;

    selectedCount = 0;



    userrole = '';
    excelData: any[] = [];
    allSelected = false;
    isSubmitVisible = false;

    @ViewChild(DataTableDirective, { static: false })
    dtElement!: DataTableDirective;

    dtOptions: DataTables.Settings = this.utils.dataTableOptions();
    dtTrigger: Subject<any> = new Subject();
    constructor(
        private spinner: NgxSpinnerService,
        private toast: ToasterService,
        private inspectionAPI: MpfcLandInspectionService,
        private utils: UtilsService,
        private session: SessionService,
        private sharedAPI: SharedService,
    ) {
        this.userrole = this.session.role;;
    }

    ngOnInit(): void {
        this.values == "";
        this.LoadDccbs();
        this.LoadDevices();
    }



    async LoadDccbs(): Promise<void> {
        try {
            debugger;
            const req = {
                type: "1",
            };
            this.spinner.show();
            const res = await this.sharedAPI.TechManagerGet(req);
            // const res = await this.inspectionAPI.TechManagerGet(req);
            //const res = await this.sharedAPI.Hrmsemp(req);
            if (res.success) {
                this.DCCBLIST = res.result;
            } else {
                this.toast.info(res.message);
            }
            this.spinner.hide();
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }
    async LoadDevices(): Promise<void> {
        try {
            const req = {
                type: "2",
            };
            this.spinner.show();
            // const res = await this.inspectionAPI.TechManagerGet(req);
            const res = await this.sharedAPI.TechManagerGet(req);
            if (res.success) {
                this.EQUIPMENTLIST = res.result;
            } else {
                this.toast.info(res.message);
            }
            this.spinner.hide();
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }

    async GetDetails(): Promise<void> {
        if (this.dccbid == null || this.dccbid == "" || this.dccbid == undefined) {
            this.toast.info("Please Select DCCB Name");
            return;
        }
        // if(this.equipmentid == null || this.equipmentid == "" || this.equipmentid == undefined ){
        //     this.toast.info("Please Select Device");
        //     return;
        // }
        try {
            const req = {
                type: "3",
                input_01: this.dccbid,
                //input_02: this.equipmentid,
            };
            this.spinner.show();
            //const response = await this.inspectionAPI.TechManagerGet(req);
            //const response = await this.sharedAPI.Hrmsemp(req);
            const response = await this.sharedAPI.TechManagerGet(req);
            this.spinner.hide();
            debugger;
            if (response.success) {
                this.DEVICEDETAILSLIST = response.result;
                this.excelData = this.DEVICEDETAILSLIST;
            } else {
                this.toast.info(response.message);
            }
            this.rerender();
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }

    btnExcelDownload(): void {
        this.utils.JSONToCSVConvertor(
            this.excelData,
            'Technicial Manager Reports',
            true
        );
    }

    async btnPDF(): Promise<void> {
        try {
            const fileName = 'stateLevelLandInspection';
            let basePDF = '';
            this.spinner.show();
            const req = {
                type: "1",
            };
            const res = await this.inspectionAPI.mpfcLandInspectionStateReport(req);
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

    async btnPdfView(path: string): Promise<void> {
        try {
            debugger;
            await this.utils.viewJPVPDFcop(path);
           // await this.utils.viewJPVPDFcopcrystal(path);
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }

    async btnPhotoView(path: string): Promise<void> {
        try {
            debugger;
            await this.utils.viewJPVImagecop(path);
            // await this.utils.viewImage(path);

        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }
    }

    ngOnDestroy(): void {
        // Do not forget to unsubscribe the event
        this.dtTrigger.unsubscribe();
    }

    ngAfterViewInit(): void {
        this.dtTrigger.next();
    }

    rerender(): void {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.clear().draw(); // Add this  line to clear all rows..
            // Destroy the table first
            dtInstance.destroy();
            // Call the dtTrigger to rerender again
            this.dtTrigger.next();
        });
    }

    selectAll(event: Event): void {
        debugger
        this.allSelected = (event.target as HTMLInputElement).checked;
        this.DEVICEDETAILSLIST.forEach((record: { selected: boolean; }) => record.selected = this.allSelected);
        this.updateSubmitVisibility();

        this.calculateSum();
        this.countSelected();

    }

    updateSubmitVisibility(): void {
        this.isSubmitVisible = this.DEVICEDETAILSLIST.some((record: { selected: any; }) => record.selected);

        //this.DEVICEDETAILSLIST[0][obj.ACK_NO];
        this.calculateSum();
        this.countSelected();
    }
    Value = 0
    calculateSum(): void {
        this.totalSum = this.DEVICEDETAILSLIST
            .filter((record: { selected: boolean; }) => record.selected) // Only sum the selected records
            .reduce((acc: number, record: { TOTAL_GST_AMOUNT: number; }) => acc + Number(record.TOTAL_GST_AMOUNT), this.Value); // Sum the ACK_NO values
    }
    countSelected(): void {
        this.selectedCount = this.DEVICEDETAILSLIST
            .filter((record: { selected: boolean; }) => record.selected) // Filter only selected records
            .length; // Count the number of selected records
    }

    async btnSubmit(): Promise<void> {
        try {
            this.selectedRecords = this.DEVICEDETAILSLIST.filter((record: { selected: any; }) => record.selected);
            //console.log(this.selectedRecords);
            debugger;

            const devicedetails = this.selectedRecords.map(device => ({
                pacs_name: device.PACS_NAME || '',
                pacs_code: device.PACS_CODE || '',
                device_id: device.DEVICE_ID || '',
                device_name: device.DEVICE_NAME || '',
                received_date: device.RECEIVED_DATE || '',
                serial_number: device.SERIAL_NUMBER || '',
                ack_no: device.ACK_NO || '',
                component_name: device.COMPONENT_NAME || '',
                model_details: device.MODEL_DETAILS || '',
                image: device.IMAGE || '',
                slno_image: device.SLNO_IMAGE || '',
                tax_invoice: device.TAX_INVOICE || '',
                delivery_challan: device.DELIVERY_CHALLAN || '',
                deliverynotdt: device.DELIVERYNOTDT || '',
                taxinvoicenumber: device.TAXINVOICENUMBER || '',
                inspection_date: device.INSPECTION_DATE || '',
                cserial_number: device.CSERIAL_NUMBER || '',
                maker: device.MAKER || '',
                manufacture_data: device.MANUFACTURE_DATA || '',
                cover_received_status: device.COVER_RECEIVED_STATUS || '',
                device_image_upd: device.DEVICE_IMAGE_UPD || '',
                installation_doc: device.INSTALLATION_DOC || '',
                role: this.session.role,
                inserted_by: this.session.userName,
                unique_id: this.session.uniqueId
            }));

            //console.log(devicedetailslist); 

            const req = {
                type: "1",
                devicedetailslist: devicedetails
            };
            this.spinner.show();
            const response = await this.inspectionAPI.TechManagerDetailsIns(req);
            //const response = await this.sharedAPI.Hrmsemp(req);
            this.spinner.hide();
            debugger;
            if (response.success) {
                this.toast.success(response.message)
            } else {
                this.toast.info(response.message);
            }
        } catch (error) {
            this.spinner.hide();
            this.utils.catchResponse(error);
        }









    }

    async GetValues(): Promise<void> {

        this.Count = this.values

    }

    onCountTotal(obj: any) {
        debugger;

        //console.log(obj);


        const percentage = parseFloat(obj.Count);


        if (!isNaN(percentage) && percentage >= 0 && percentage <= 100) {

            obj.Counttot = ((percentage / 100) * obj.TOTAL_GST_AMOUNT).toFixed(2);
            obj.RemainingCount = (obj.TOTAL_GST_AMOUNT - obj.Counttot).toFixed(2);
        } else {

            obj.Counttot = "";
            obj.RemainingCount = "";
            //this.toast.info('Please enter a valid percentage between 0 and 100.');
        }
    }


    updateTableValues() {
        debugger
        console.log(this.DEVICEDETAILSLIST);
        // Validate that the percentage is between 1 and 100
        // if (this.values >= 1 && this.values <= 100) {
        // Set the same value in each row of DEVICEDETAILSLIST
        this.DEVICEDETAILSLIST.forEach((obj: { Count: any, Counttot: any, TOTAL_GST_AMOUNT: any, RemainingCount: any }) => {

            if (this.values == "") {
                obj.Count = "";
                obj.Counttot = "";
                obj.RemainingCount = "";
            }
            else {
                obj.Count = this.values;
                obj.Counttot = ((this.values / 100) * obj.TOTAL_GST_AMOUNT).toFixed(2);
                obj.RemainingCount = (obj.TOTAL_GST_AMOUNT - obj.Counttot).toFixed(2);
            }

        });


        // }

    }

    decimalFilter(event: any) {
        const reg = /^-?\d*(\.\d{0,2})?$/;
        let input = event.target.value + String.fromCharCode(event.charCode);

        if (!reg.test(input)) {
            event.preventDefault();
        }
    }

    validateInput(event: KeyboardEvent): boolean {
        const allowedKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', '.'];
        const key = event.key;

        // Allow control keys and decimal point
        if (allowedKeys.includes(key)) {
            const inputValue = (event.target as HTMLInputElement).value;

            // Check if the decimal point can be added
            if (key === '.' && !inputValue.includes('.')) {
                return true;
            }

            // Allow control keys
            if (['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight'].includes(key)) {
                return true;
            }
        }

        // Allow digits only
        if (/\d/.test(key)) {
            const inputValue = (event.target as HTMLInputElement).value;

            // Check if the new value is valid and within range
            const newValue = inputValue + key;
            const parsedValue = parseFloat(newValue);

            // Check for valid number between 1 and 100 and decimal precision
            if (parsedValue >= 1 && parsedValue <= 100 && this.isValidDecimal(newValue)) {
                return true;
            }
        }

        // Prevent default behavior for invalid inputs
        event.preventDefault();
        return false;
    }

    // Helper function to check decimal precision
    isValidDecimal(value: string): boolean {
        const parts = value.split('.');

        // Check if there is more than one decimal point
        if (parts.length > 2) {
            return false;
        }

        // If there is a decimal point, check the precision
        if (parts.length === 2) {
            return parts[1].length <= 2;
        }

        return true;
    }

formatIndianNumber(value: number): string {
    if (isNaN(value)) {
        return '';
    }

    let [integerPart, decimalPart] = value.toString().split('.');
    let result = '';

    // Handle the integer part
    if (integerPart.length > 3) {
        // The last three digits (hundreds)
        result = integerPart.slice(-3);
        integerPart = integerPart.slice(0, -3);

        // Group the rest in pairs of two
        while (integerPart.length > 0) {
            result = integerPart.slice(-2) + ',' + result;
            integerPart = integerPart.slice(0, -2);
        }
    } else {
        result = integerPart;
    }

    // Remove leading comma if necessary
    result = result.replace(/^,/, '');

    // Handle decimal part
    if (decimalPart) {
        result += '.' + decimalPart;
    }

    return result;
    }

}