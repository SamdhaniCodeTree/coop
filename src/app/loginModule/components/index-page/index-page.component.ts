import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.css']
})
export class IndexPageComponent implements OnInit {

  constructor(private router: Router,) { }
  showeditPopup=false;

  ngOnInit(): void {
    //this.showeditPopup=true;
  }
  async onClear(): Promise<void> {
    
    this.showeditPopup = false;
    
  }

//   async btnlogin(): Promise<void> {
//    try {
//    // this.router.navigate(['/index']);
//    //window.open("/login", '_Blank');
//      this.router.navigate(["/login",'_Blank' ]);
     
//   } catch (error) {
    
//   }
// }
    
   
      
}
