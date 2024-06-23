import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorListFeedbackComponent } from './DoctorListFeedbackComponent';

describe('DoctorListFeedbackComponent', () => {
  let component: DoctorListFeedbackComponent;
  let fixture: ComponentFixture<DoctorListFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorListFeedbackComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DoctorListFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
