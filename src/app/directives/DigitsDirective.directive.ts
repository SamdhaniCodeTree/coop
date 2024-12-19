import { Directive, ElementRef, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: 'input[digitsOnly]'
})
export class DigitsDirective {
// Allow decimal numbers and negative values
private regex: RegExp = new RegExp(/^\d*\.?\d{0,6}$/g);
// Allow key codes for special events. Reflect :
// Backspace, tab, end, home
private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'Del', 'Delete'];

constructor(private el: ElementRef) {
}

@HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    // Allow Backspace, tab, end, and home keys
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }
    let current: string = this.el.nativeElement.value;
    const position = this.el.nativeElement.selectionStart;
    const next: string = [current.slice(0, position), event.key == 'Decimal' ? '.' : event.key, current.slice(position)].join('');
    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    }
  }
// @Output() valueChange = new EventEmitter()
//   constructor(private _el: ElementRef) { }

//   @HostListener('input', ['$event']) onInputChange(event) {
//     const initalValue = this._el.nativeElement.value;
//     const newValue = initalValue.replace(/[^0-9.]/g, '');
//        this._el.nativeElement.value = newValue;
//        this.valueChange.emit(newValue);
//     if ( initalValue !== this._el.nativeElement.value) {
//       event.stopPropagation();
//     }
//   }

}