import { Directive, ElementRef, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: 'input[lettersOnly]'
})
export class LetterDirective {

@Output() valueChange = new EventEmitter()
  constructor(private _el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event:any) {
    const initalValue = this._el.nativeElement.value;
   // const newValue = initalValue.replace(/[^a-zA-Z. &+-]/g, '');
    const newValue = initalValue.replace(/[^a-zA-Z. +-]/g, '');
       this._el.nativeElement.value = newValue;
       this.valueChange.emit(newValue);
    if ( initalValue !== this._el.nativeElement.value) {
      event.stopPropagation();
    }
  }

}