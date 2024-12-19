export class questionsListModel {
  questionId!: string;
  questionName!: string;
  questionApproval!: string;
  photoUpload!: string;
  remarks!: string;
}

export class mpfcInspectionModel {
  districtId!: string;
  divisionId!: string;
  mandalId!: string;
  pacsId!: string;
  villageId!: string;
  leaseAgreementRegistered!: string;
  leaseAgreementPhoto!: string;
  inspectionDate!: string;
  capacityOfGoDown!: string;
  estimatedLandValue!: string;
  siteInspectionPhotoUpload!: string;
  isQuestionsSubmitted!: string;
  dllicApproval!: string;
  dllicRemarks!: string;
  siteReadyForConstruction!: string;
  nregaTakenWork!: string;
  siteInspectionReportUpload!: string;
  uniqueId!: string;
  nregaWorks!: string;
  nregaOthersRemarks!: string;
  insertedBy!: string;
  updatedBy!: string;
  source!: string;
  questionList!: questionsListModel[];
}

export class constructionModel {
  districtId!: string;
  divisionId!: string;
  mandalId!: string;
  pacsId!: string;
  villageId!: string;
  questionList!: questionsListModel[];
  insertedBy!: string;
  source!: string;
  inspectionDate!: string;
  godownCapacity!: string;
  builder!: string;
  txnId!: string;
  
}
