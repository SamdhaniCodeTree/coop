import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { datePickerConfig } from '../../models/date-picker.model';
import { DatePickerService } from '../../services/date-picker.service';
import { SessionService } from '../../services/session.service';
import { ToasterService } from '../../services/toaster.service';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent implements OnInit {


  bsConfig: datePickerConfig = this.datePicker.getDatePickerConfig();
  @ViewChild('dpDate') dpDate: ElementRef | undefined;

  @Input() PlaceHolder: any;
  @Input() minDate!: Date;
  @Input() maxDate!: Date;

  @Output()
  selectedDateChange: EventEmitter<string> = new EventEmitter<string>();
  @Input() selectedDate!: string;

  constructor(
    private datePicker: DatePickerService,
    private session: SessionService,
    private toast: ToasterService,
    private utils: UtilsService
  ) {
    this.bsConfig.containerClass = this.datePicker.getColor('dark-blue');

    if (this.maxDate === null || this.maxDate === undefined) {
      this.maxDate = this.session.getTodayDate();
    }
  }

  ngOnInit(): void {}

  onDateChange(value: Date): void {
    if (value !== null && value !== undefined) {
      const dateString = this.session.getDateString(value);
      if (!this.utils.isEmpty(dateString)) {
        if (this.utils.isValidDate(dateString)) {
          this.selectedDateChange.emit(dateString);
          return;
        }
      }
    }
    if (this.dpDate) {
      this.dpDate.nativeElement.value = '';
      this.selectedDateChange.emit('');
    }
    return;
  }


}
