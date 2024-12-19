export class questionsListModel {
  questionId!: string;
  questionName!: string;
  questionAnswer!: string;
  questionImage!: string;
  questionReason!: string;
}
export class pacsLandInspectionModel {
  districtId!: string;
  mandalId!: string;
  pacId!: string;
  villageId!: string;
  villageName!: string;
  villageInspectionStatus!: number;
  questionsList!: questionsListModel[];
  insertedBy!: string;
  source!: string;
}
