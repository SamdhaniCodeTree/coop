import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-multi-select-dropdown',
  templateUrl: './multi-select-dropdown.component.html',
  styleUrls: ['./multi-select-dropdown.component.css']
})
export class MultiSelectDropdownComponent implements OnInit {

  @Input() PlaceHolder!: string;
  @Input() dropdownList: any[] = [];
  @Input() idField!: string;
  @Input() textField!: string;

  @Output() onItemSelectChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() onSelectAllChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() selectedItemsChange: EventEmitter<any> = new EventEmitter<any>();
  @Input() selectedItems!: any;



  dropdownSettings: IDropdownSettings = {};

  constructor(private utils: UtilsService) {
    if (this.utils.isEmpty(this.PlaceHolder)) {
      this.PlaceHolder = '-- SELECT --';
    }
  }

  ngOnInit() {
    this.dropdownSettings = {
      singleSelection: false,
      idField: this.idField,
      textField: this.textField,
      selectAllText: 'Select All',
      unSelectAllText: 'Un Select All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
  }
  onItemSelect(item: any) {
    this.onItemSelectChange.emit(item);
  }
  onSelectAll(items: any) {
    this.onSelectAllChange.emit(items);
  }

  onEventChange(event:any) {
    this.selectedItemsChange.emit(this.selectedItems);
  }

}
