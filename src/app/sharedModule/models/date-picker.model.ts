import { BsDatepickerViewMode } from "ngx-bootstrap/datepicker";

// tslint:disable-next-line: class-name
export class datePickerConfig {
  dateInputFormat: string | undefined;
  containerClass: string | undefined;
  selectFromOtherMonth: boolean | undefined;
  isAnimated: boolean | undefined;
  adaptivePosition: boolean | undefined;
  showWeekNumbers: boolean | undefined;
  returnFocusToInput: boolean | undefined;
  isDisabled: boolean | undefined;
  clearButtonLabel: string | undefined;
  clearPosition: string | undefined;
  showClearButton: boolean | undefined;
  minMode: BsDatepickerViewMode | undefined;
}
