import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientAddFeedbackComponent } from './patient-add-feedback.component';

describe('PatientAddFeedbackComponent', () => {
  let component: PatientAddFeedbackComponent;
  let fixture: ComponentFixture<PatientAddFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientAddFeedbackComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PatientAddFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
