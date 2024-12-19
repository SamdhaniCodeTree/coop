import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMasterDetailsAddComponent } from './new-master-details-add.component';

describe('NewMasterDetailsAddComponent', () => {
  let component: NewMasterDetailsAddComponent;
  let fixture: ComponentFixture<NewMasterDetailsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewMasterDetailsAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMasterDetailsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
