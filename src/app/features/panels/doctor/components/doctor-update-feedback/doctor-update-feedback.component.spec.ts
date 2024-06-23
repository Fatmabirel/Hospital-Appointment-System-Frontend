import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorUpdateFeedbackComponent } from './doctor-update-feedback.component';

describe('DoctorUpdateFeedbackComponent', () => {
  let component: DoctorUpdateFeedbackComponent;
  let fixture: ComponentFixture<DoctorUpdateFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorUpdateFeedbackComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DoctorUpdateFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
