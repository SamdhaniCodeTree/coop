import { Injectable } from '@angular/core';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root',
})
export class ConsoleService {
  constructor(private utils: UtilsService) {}

  log(value1: any, value2: any = null): void {
    if (this.utils.env.logger) {
      if (!this.utils.isEmpty(value2)) {
        console.log(value1, value2);
      } else {
        console.log(value1);
      }
    }
  }

  debug(value1: any, value2: any = null): void {
    if (this.utils.env.logger) {
      if (!this.utils.isEmpty(value2)) {
        console.debug(value1, value2);
      } else {
        console.debug(value1);
      }
    }
  }
  info(value1: any, value2: any = null): void {
    if (this.utils.env.logger) {
      if (!this.utils.isEmpty(value2)) {
        console.info(value1, value2);
      } else {
        console.info(value1);
      }
    }
  }
  error(value1: any, value2: any = null): void {
    if (this.utils.env.logger) {
      if (!this.utils.isEmpty(value2)) {
        console.error(value1, value2);
      } else {
        console.error(value1);
      }
    }
  }
}
