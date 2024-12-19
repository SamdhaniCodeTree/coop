import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(
    private router: Router,
  ) { }

  info(message: string): void{
    Swal.fire('info', message, 'info');
  }

  error(message: string): void{
    Swal.fire('error', message, 'error');
  }

  success(message: string): void{
    Swal.fire('info', message, 'success');
  }

  warning(message: string): void{
    Swal.fire('info', message, 'warning');
  }

  question(message: string): void{
    Swal.fire('info', message, 'question');
  }

  showImage(image: string): void {
    Swal.fire({
      imageUrl: 'data:application/pdf;base64,' + image,
      imageWidth: 600,
      imageHeight: 300,
    });
  }

  successNavigate(message:any) {
    Swal.fire({
        icon: 'success',
        title: 'success',
        text: message,

    }).then((result) => {
        if (result.value) {
            // Use the router to navigate to the specified route
window.location.reload();
            
        }
    });
}


infoNavigate(message:any) {
  Swal.fire({
      icon: 'info',
      title: 'Info',
      text: message,

  }).then((result) => {
      if (result.value) {
          // Use the router to navigate to the specified route
window.location.reload();
          
       }
    });
}
}
