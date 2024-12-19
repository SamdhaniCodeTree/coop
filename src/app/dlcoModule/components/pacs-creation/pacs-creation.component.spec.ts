import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacsCreationComponent } from './pacs-creation.component';

describe('PacsCreationComponent', () => {
  let component: PacsCreationComponent;
  let fixture: ComponentFixture<PacsCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacsCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PacsCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
