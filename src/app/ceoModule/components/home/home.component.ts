import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/sharedModule/services/session.service';
import { ToasterService } from 'src/app/sharedModule/services/toaster.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private session: SessionService,private toast: ToasterService,) { }

  ngOnInit(): void {

    // if(this.session.NOOFPACS>1)
    //   {
    //     this.toast.info("You have morethan 1 PACS, You can select any 1 PACS");
    //   }
  }

}
