import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingAppointmentComponent } from './pending-appointment.component';

describe('PendingAppointmentComponent', () => {
  let component: PendingAppointmentComponent;
  let fixture: ComponentFixture<PendingAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PendingAppointmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PendingAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
