import { Injectable } from '@angular/core';
import { datePickerConfig } from '../models/date-picker.model';

@Injectable({
  providedIn: 'root'
})
export class DatePickerService {
  constructor() {}
  getDatePickerConfig(): any {
    const bsConfig: datePickerConfig = {
      dateInputFormat: 'DD-MMM-YYYY',
      containerClass: 'theme-dark-blue',
      selectFromOtherMonth: true,
      isAnimated: true,
      adaptivePosition: true,
      showWeekNumbers: false,
      returnFocusToInput: true,
      isDisabled: true,
      showClearButton: true,
      clearButtonLabel: 'Clear',
      clearPosition: 'right',
      minMode: undefined,
    };

    return bsConfig;
  }

  getColor(color: any = null): string {
    if (color === 'green') {
      return 'theme-green';
    } else if (color === 'blue') {
      return 'theme-blue';
    } else if (color === 'dark-blue') {
      return 'theme-dark-blue';
    } else if (color === 'red') {
      return 'theme-red';
    } else if (color === 'orange') {
      return 'theme-orange';
    } else {
      return 'theme-default';
    }
  }

}
