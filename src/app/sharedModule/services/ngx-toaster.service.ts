import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NgxToasterService {
  constructor(private toastr: ToastrService) {}

  success(message:string) : void {
    this.toastr.success(message, 'Success');
  }
  warning(message:string) : void {
    this.toastr.warning(message, 'Warning');
  }
  info(message:string) : void {
    this.toastr.info(message, 'Info');
  }
  error(message:string) : void {
    this.toastr.error(message, 'Error');
  }

}
