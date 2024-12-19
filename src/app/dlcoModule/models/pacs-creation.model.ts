export class pacsReqModel {
  districtId!: string;
  divisionId!: string;
  mandalId!: string;
  pacName!: string;
  villagesList!: villagesModel[];
  insertedBy!: string;
  source!: string;
}

export class villagesModel {
  VILLAGE_CODE!: string;
  VILLAGE_NAME!: string;
}
