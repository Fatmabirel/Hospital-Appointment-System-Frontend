import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorAddFeedbackComponent } from './doctor-add-feedback.component';

describe('DoctorAddFeedbackComponent', () => {
  let component: DoctorAddFeedbackComponent;
  let fixture: ComponentFixture<DoctorAddFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorAddFeedbackComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DoctorAddFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
