import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDetailsPhaseWhiseComponent } from './delete-details-phase-whise.component';

describe('DeleteDetailsPhaseWhiseComponent', () => {
  let component: DeleteDetailsPhaseWhiseComponent;
  let fixture: ComponentFixture<DeleteDetailsPhaseWhiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteDetailsPhaseWhiseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDetailsPhaseWhiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
