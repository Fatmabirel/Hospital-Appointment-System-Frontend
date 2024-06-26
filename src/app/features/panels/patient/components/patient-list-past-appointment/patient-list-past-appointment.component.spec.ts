import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientListPastAppointmentComponent } from './patient-list-past-appointment.component';

describe('PatientListPastAppointmentComponent', () => {
  let component: PatientListPastAppointmentComponent;
  let fixture: ComponentFixture<PatientListPastAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientListPastAppointmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PatientListPastAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
