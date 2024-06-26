import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientListUpcomingAppointmentComponent } from './patient-list-upcoming-appointment.component';

describe('PatientListUpcomingAppointmentComponent', () => {
  let component: PatientListUpcomingAppointmentComponent;
  let fixture: ComponentFixture<PatientListUpcomingAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientListUpcomingAppointmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PatientListUpcomingAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
