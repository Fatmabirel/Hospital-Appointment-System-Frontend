import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientUpdateFeedbackComponent } from './patient-update-feedback.component';

describe('PatientUpdateFeedbackComponent', () => {
  let component: PatientUpdateFeedbackComponent;
  let fixture: ComponentFixture<PatientUpdateFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientUpdateFeedbackComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PatientUpdateFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
