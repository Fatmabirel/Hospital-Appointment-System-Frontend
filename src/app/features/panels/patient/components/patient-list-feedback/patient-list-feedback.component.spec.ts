import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientListFeedbackComponent } from './patient-list-feedback.component';

describe('PatientListFeedbackComponent', () => {
  let component: PatientListFeedbackComponent;
  let fixture: ComponentFixture<PatientListFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientListFeedbackComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PatientListFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
