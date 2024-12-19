import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-public-society-details',
  templateUrl: './public-society-details.component.html',
  styleUrls: ['./public-society-details.component.css']
})
export class PublicSocietyDetailsComponent implements OnInit {

  typeofsociety:any;registrationact:any;societylvltier1:any;societylvltier2:any;societysubtype:any;basicsociety:any;
  liabilityofsociety:any;pincode:any;country:any;stateId:any;districtId:any;mandalId:any;villageId:any;division:any;
  subdivision:any;address:any;districtId1:any;division1:any;mandalId1:any;villageId1:any;Maritalsts:any;occupation:any;
  titleId:any;surname:any;name:any;careoff:any;genderId:any;aadharno:any;age:any;caste:any;designation:any;amtentrance:any;
  amtcaptial:any;pincode2:any;country2:any;stateId2:any;districtId2:any;division2:any;subdivision2:any;villageId2:any;mandalId2:any;
  hamletstreet:any;doorno:any;addnewrow:any;addsubmit:any;
  rows:any = []
  constructor() { 
    this.typeofsociety="";
    this.registrationact="";
    this.societylvltier1="";
    this.societylvltier2="";
    this.societysubtype="";
    this.basicsociety="";
    this.country="";
    this.stateId="";
    this.districtId="";
    this.mandalId="";
    this.villageId="";
    this.division="";
    this.subdivision="";
    this.districtId1="";
    this.division1="";
    this.mandalId1="";
    this.villageId1="";
    this.titleId="";
     this.genderId="";
     this.caste="";
     this.Maritalsts="";
     this.country2="";
     this.stateId2="";
     this.districtId2="";
     this.division2="";
     this.subdivision2="";
     this.mandalId2="";
     this.villageId2="";

  }
  

  ngOnInit(): void {

     
    this.rows = [{
      District:'',
      Division:'',
      Mandal:'',
      Village:'',
      
}]

}

addRow() {
  
 
 
let row = {District: "", Division: "",Mandal:"",Village:""};
this.addnewrow = true;
this.rows.push(row);
 
this.addsubmit = true;
}

deleteRow(index:any) {
this.rows.splice(index, 1);

}
submit(){
console.log(this.rows)
  }
 
}
