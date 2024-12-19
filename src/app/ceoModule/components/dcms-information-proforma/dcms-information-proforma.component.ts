import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConsoleService } from 'src/app/sharedModule/services/console.service';
import { NgxToasterService } from 'src/app/sharedModule/services/ngx-toaster.service';
import { SessionService } from 'src/app/sharedModule/services/session.service';
import { ToasterService } from 'src/app/sharedModule/services/toaster.service';
import { UtilsService } from 'src/app/sharedModule/services/utils.service';
import { CeoService } from '../../services/ceo.service';

@Component({
  selector: 'app-dcms-information-proforma',
  templateUrl: './dcms-information-proforma.component.html',
  styleUrls: ['./dcms-information-proforma.component.css'],
})
export class DcmsInformationProformaComponent implements OnInit {
  dcmsDetails = '';
  maxDate!: Date;
  dcmsReq = {
    pacId: '',
    nameOfDCMS: '',
    addressOfDCMS: '',
    areaOfOperation: '',
    noOfBranches: '',
    dateOfRegistrationOfAct: '',
    regNoOfSociety: '',
    totalMembers: '',
    noOfClassAMembers: '',
    noOfClassBMembers: '',
    categoryOfSociety: '',
    shareCapitalOfMembers: '',
    shareCapitalOfGovt: '',
    dateOfElectionsLastConducted: '',
    dueDateForElections: '',
    presentManagementOfSociety: '',
    nameOfPresidentOrChairman: '',
    nameOfBusinessManager: '',
    noOfEmployees: '',
    approvedStrengthAsPerBylaw: '',
    detailsOfFixedAssetsWithMarketValues: '',
    detailsOfDisposableAssetsDuringYear: '',
    workingStrengthPermanent: '',
    workingStrengthContract: '',
    workingStrengthOther: '',
    noOfOwnGOdowns: '',
    noOfDilapidatedGOdowns: '',
    businessOfFertilizersTakenUpQuantity: '',
    businessOfFertilizersTakenUpValue: '',
    paddyProcurementQuantity: '',
    paddyProcurementNoOfFarmersBenefited: '',
    paddyProcurementCommissionEarned: '',
    otherProcurementsQuantity: '',
    otherProcurementsNoOfFarmersBenefited: '',
    otherProcurementsCommissionEarned: '',
    dateOfIssueOfFinalAuditReport: '',
    workingCapitalForYear: '',
    businessTurnOver: '',
    grossProfit: '',
    netProfit: '',
    loss: '',
    accumulatedLoss: '',
    auditCompletedUptoFinancialYear: '',
    rectificationOfAuditDefectsOfThePreviousYears: '',
    source: 'web',
    insertedBy: '',
  };

  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToasterService,
    private ngxToaster: NgxToasterService,
    private router: Router,
    private utils: UtilsService,
    private session: SessionService,
    private console: ConsoleService,
    private ceoAPI: CeoService
  ) {
    this.maxDate = this.session.getTodayDate();
  }

  ngOnInit(): void {
    this.dcmsReq.pacId = this.session.pacId;
    this.dcmsReq.insertedBy = this.session.uniqueId;
    this.loadDCMSDetails();
  }
  async loadDCMSDetails(): Promise<void> {
    try {
      this.dcmsDetails = '';
      this.spinner.show();
      const response = await this.ceoAPI.dcmsInfoByPacId(this.dcmsReq);
      this.spinner.hide();
      if (response.success) {
        this.dcmsDetails = response.result[0];
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  async btnSubmit(): Promise<void> {
    try {
      if (this.validate()) {
        this.console.log(this.dcmsReq);
        this.spinner.show();
        const response = await this.ceoAPI.dcmsInfoSub(this.dcmsReq);
        this.spinner.hide();
        if (response.success) {
          alert(response.message);
          window.location.reload();
          // this.router.navigate(['/ceo/']);
        } else {
          this.toast.info(response.message);
        }
      }
    } catch (error) {
      this.spinner.hide();
      this.utils.catchResponse(error);
    }
  }

  validate(): boolean {
    if (this.utils.isEmpty(this.dcmsReq.nameOfDCMS)) {
      this.toast.warning('Enter name of DCMS');
      return false;
    }
    if (this.utils.isEmpty(this.dcmsReq.addressOfDCMS)) {
      this.toast.warning('Enter address of DCMS');
      return false;
    }
    if (this.utils.isEmpty(this.dcmsReq.areaOfOperation)) {
      this.toast.warning('Enter name area of operation');
      return false;
    }
    if (this.utils.isEmpty(this.dcmsReq.noOfBranches)) {
      this.toast.warning('Enter number of Branches');
      return false;
    }
    if (!this.utils.isNumber(this.dcmsReq.noOfBranches)) {
      this.toast.warning('Enter valid number of Branches');
      return false;
    }
    if (this.utils.isEmpty(this.dcmsReq.dateOfRegistrationOfAct)) {
      this.toast.warning('Select date of registration under APCS act 1964');
      return false;
    }
    if (this.utils.isEmpty(this.dcmsReq.regNoOfSociety)) {
      this.toast.warning('Enter registration no of society');
      return false;
    }
    if (this.utils.isEmpty(this.dcmsReq.totalMembers)) {
      this.toast.warning('Enter total members');
      return false;
    }
    if (!this.utils.isNumber(this.dcmsReq.totalMembers)) {
      this.toast.warning('Enter valid total members');
      return false;
    }
    if (this.utils.isEmpty(this.dcmsReq.noOfClassAMembers)) {
      this.toast.warning('Enter no of A class members');
      return false;
    }
    if (!this.utils.isNumber(this.dcmsReq.noOfClassAMembers)) {
      this.toast.warning('Enter valid no of A class members');
      return false;
    }
    if (this.utils.isEmpty(this.dcmsReq.noOfClassBMembers)) {
      this.toast.warning('Enter no of B class members');
      return false;
    }
    if (!this.utils.isNumber(this.dcmsReq.noOfClassBMembers)) {
      this.toast.warning('Enter valid no of B class members');
      return false;
    }
    if (this.utils.isEmpty(this.dcmsReq.categoryOfSociety)) {
      this.toast.warning('select society category');
      return false;
    }
    if (this.utils.isEmpty(this.dcmsReq.shareCapitalOfMembers)) {
      this.toast.warning('Enter share capital of members');
      return false;
    }
    if (!this.utils.isNumber(this.dcmsReq.shareCapitalOfMembers)) {
      this.toast.warning('Enter valid share capital of members');
      return false;
    }
    if (this.utils.isEmpty(this.dcmsReq.shareCapitalOfGovt)) {
      this.toast.warning('Enter share capital of government');
      return false;
    }
    if (!this.utils.isNumber(this.dcmsReq.shareCapitalOfGovt)) {
      this.toast.warning('Enter valid share capital of government');
      return false;
    }
    if (this.utils.isEmpty(this.dcmsReq.dateOfElectionsLastConducted)) {
      this.toast.warning('Select date of elections last conducted');
      return false;
    }
    if (this.utils.isEmpty(this.dcmsReq.dueDateForElections)) {
      this.toast.warning('Select due date for elections');
      return false;
    }
    if (this.utils.isEmpty(this.dcmsReq.presentManagementOfSociety)) {
      this.toast.warning('Select present management of society');
      return false;
    }
    if (this.utils.isEmpty(this.dcmsReq.nameOfPresidentOrChairman)) {
      this.toast.warning('Enter president/chairman name');
      return false;
    }
    if (this.utils.isEmpty(this.dcmsReq.nameOfBusinessManager)) {
      this.toast.warning('Enter business manager name');
      return false;
    }
    if (this.utils.isEmpty(this.dcmsReq.noOfEmployees)) {
      this.toast.warning('Enter no of employees');
      return false;
    }
    if (!this.utils.isNumber(this.dcmsReq.noOfEmployees)) {
      this.toast.warning('Enter valid no of employees');
      return false;
    }
    if (this.utils.isEmpty(this.dcmsReq.approvedStrengthAsPerBylaw)) {
      this.toast.warning('Enter approved cadre strength as per byelaw');
      return false;
    }
    if (!this.utils.isNumber(this.dcmsReq.approvedStrengthAsPerBylaw)) {
      this.toast.warning('Enter valid approved cadre strength as per byelaw');
      return false;
    }
    if (this.utils.isEmpty(this.dcmsReq.workingStrengthPermanent)) {
      this.toast.warning('Enter permanent workers strength');
      return false;
    }
    if (!this.utils.isNumber(this.dcmsReq.workingStrengthPermanent)) {
      this.toast.warning('Enter valid permanent workers strength');
      return false;
    }
    if (this.utils.isEmpty(this.dcmsReq.workingStrengthContract)) {
      this.toast.warning('Enter contract basis workers strength');
      return false;
    }
    if (!this.utils.isNumber(this.dcmsReq.workingStrengthContract)) {
      this.toast.warning('Enter valid contract basis workers strength');
      return false;
    }
    if (this.utils.isEmpty(this.dcmsReq.workingStrengthOther)) {
      this.toast.warning('Enter other workers strength');
      return false;
    }
    if (!this.utils.isNumber(this.dcmsReq.workingStrengthOther)) {
      this.toast.warning('Enter valid other workers strength');
      return false;
    }
    if (this.utils.isEmpty(this.dcmsReq.noOfOwnGOdowns)) {
      this.toast.warning('Enter no of working Godowns');
      return false;
    }
    if (!this.utils.isNumber(this.dcmsReq.noOfOwnGOdowns)) {
      this.toast.warning('Enter valid no of working Godowns');
      return false;
    }
    if (this.utils.isEmpty(this.dcmsReq.noOfDilapidatedGOdowns)) {
      this.toast.warning('Enter no of dilapidated Godowns');
      return false;
    }
    if (!this.utils.isNumber(this.dcmsReq.noOfDilapidatedGOdowns)) {
      this.toast.warning('Enter valid no of dilapidated Godowns');
      return false;
    }
    if (this.utils.isEmpty(this.dcmsReq.businessOfFertilizersTakenUpQuantity)) {
      this.toast.warning(
        'Enter business of fertilizers taken up quantity in MTs'
      );
      return false;
    }
    if (
      !this.utils.isNumber(this.dcmsReq.businessOfFertilizersTakenUpQuantity)
    ) {
      this.toast.warning(
        'Enter valid business of fertilizers taken up quantity in MTs'
      );
      return false;
    }
    if (this.utils.isEmpty(this.dcmsReq.businessOfFertilizersTakenUpValue)) {
      this.toast.warning(
        'Enter business of fertilizers taken up value in lakhs'
      );
      return false;
    }
    if (!this.utils.isNumber(this.dcmsReq.businessOfFertilizersTakenUpValue)) {
      this.toast.warning(
        'Enter valid business of fertilizers taken up value in lakhs'
      );
      return false;
    }
    if (this.utils.isEmpty(this.dcmsReq.paddyProcurementQuantity)) {
      this.toast.warning('Enter paddy procurement quantity in MTs');
      return false;
    }
    if (!this.utils.isNumber(this.dcmsReq.paddyProcurementQuantity)) {
      this.toast.warning('Enter valid paddy procurement quantity in MTs');
      return false;
    }
    if (this.utils.isEmpty(this.dcmsReq.paddyProcurementNoOfFarmersBenefited)) {
      this.toast.warning('Enter paddy procurement no of farmers benefited');
      return false;
    }
    if (
      !this.utils.isNumber(this.dcmsReq.paddyProcurementNoOfFarmersBenefited)
    ) {
      this.toast.warning(
        'Enter valid paddy procurement no of farmers benefited'
      );
      return false;
    }
    if (this.utils.isEmpty(this.dcmsReq.paddyProcurementCommissionEarned)) {
      this.toast.warning('Enter paddy procurement commission earned in lakhs');
      return false;
    }
    if (!this.utils.isNumber(this.dcmsReq.paddyProcurementCommissionEarned)) {
      this.toast.warning(
        'Enter valid paddy procurement commission earned in lakhs'
      );
      return false;
    }
    if (this.utils.isEmpty(this.dcmsReq.otherProcurementsQuantity)) {
      this.toast.warning('Enter other procurement quantity in MTs');
      return false;
    }
    if (!this.utils.isNumber(this.dcmsReq.otherProcurementsQuantity)) {
      this.toast.warning('Enter valid other procurement quantity in MTs');
      return false;
    }
    if (
      this.utils.isEmpty(this.dcmsReq.otherProcurementsNoOfFarmersBenefited)
    ) {
      this.toast.warning('Enter other procurement no of farmers benefited');
      return false;
    }
    if (
      !this.utils.isNumber(this.dcmsReq.otherProcurementsNoOfFarmersBenefited)
    ) {
      this.toast.warning(
        'Enter valid other procurement no of farmers benefited'
      );
      return false;
    }
    if (this.utils.isEmpty(this.dcmsReq.otherProcurementsCommissionEarned)) {
      this.toast.warning('Enter other procurement commission earned in lakhs');
      return false;
    }
    if (!this.utils.isNumber(this.dcmsReq.otherProcurementsCommissionEarned)) {
      this.toast.warning(
        'Enter valid other procurement commission earned in lakhs'
      );
      return false;
    }
    if (this.utils.isEmpty(this.dcmsReq.detailsOfFixedAssetsWithMarketValues)) {
      this.toast.warning(
        'Enter details of fixed assets with govertment market values'
      );
      return false;
    }
    if (
      !this.utils.isNumber(this.dcmsReq.detailsOfFixedAssetsWithMarketValues)
    ) {
      this.toast.warning(
        'Enter valid details of fixed assets with govertment market values'
      );
      return false;
    }
    if (this.utils.isEmpty(this.dcmsReq.detailsOfDisposableAssetsDuringYear)) {
      this.toast.warning('Enter details of disposal of assets during the year');
      return false;
    }
    if (
      !this.utils.isNumber(this.dcmsReq.detailsOfDisposableAssetsDuringYear)
    ) {
      this.toast.warning(
        'Enter valid details of disposal of assets during the year'
      );
      return false;
    }
    if (this.utils.isEmpty(this.dcmsReq.dateOfIssueOfFinalAuditReport)) {
      this.toast.warning('Select date of issue of audit report');
      return false;
    }
    if (this.utils.isEmpty(this.dcmsReq.workingCapitalForYear)) {
      this.toast.warning('Enter working capital for year');
      return false;
    }
    if (!this.utils.isNumber(this.dcmsReq.workingCapitalForYear)) {
      this.toast.warning('Enter valid working capital for year');
      return false;
    }
    if (this.utils.isEmpty(this.dcmsReq.businessTurnOver)) {
      this.toast.warning('Enter business turnover');
      return false;
    }
    if (!this.utils.isNumber(this.dcmsReq.businessTurnOver)) {
      this.toast.warning('Enter valid business turnover');
      return false;
    }
    if (this.utils.isEmpty(this.dcmsReq.grossProfit)) {
      this.toast.warning('Enter gross profit');
      return false;
    }
    if (!this.utils.isNumber(this.dcmsReq.grossProfit)) {
      this.toast.warning('Enter valid gross profit');
      return false;
    }
    if (this.utils.isEmpty(this.dcmsReq.netProfit)) {
      this.toast.warning('Enter net profit');
      return false;
    }
    if (!this.utils.isNumber(this.dcmsReq.netProfit)) {
      this.toast.warning('Enter valid net profit');
      return false;
    }
    if (this.utils.isEmpty(this.dcmsReq.loss)) {
      this.toast.warning('Enter loss');
      return false;
    }
    if (!this.utils.isNumber(this.dcmsReq.loss)) {
      this.toast.warning('Enter valid loss');
      return false;
    }
    if (this.utils.isEmpty(this.dcmsReq.accumulatedLoss)) {
      this.toast.warning('Enter accumulated loss');
      return false;
    }
    if (!this.utils.isNumber(this.dcmsReq.accumulatedLoss)) {
      this.toast.warning('Enter valid accumulated loss');
      return false;
    }
    if (this.utils.isEmpty(this.dcmsReq.auditCompletedUptoFinancialYear)) {
      this.toast.warning('Enter audit completed upto the financial');
      return false;
    }
    if (
      !this.utils.isNumber(this.dcmsReq.auditCompletedUptoFinancialYear) ||
      this.dcmsReq.auditCompletedUptoFinancialYear.length == 4
    ) {
      this.toast.warning('Enter valid audit completed upto the financial');
      return false;
    }
    if (
      this.utils.isEmpty(
        this.dcmsReq.rectificationOfAuditDefectsOfThePreviousYears
      )
    ) {
      this.toast.warning(
        'Select rectification of audit defects of the previous years'
      );
      return false;
    }
    return true;
  }
}
