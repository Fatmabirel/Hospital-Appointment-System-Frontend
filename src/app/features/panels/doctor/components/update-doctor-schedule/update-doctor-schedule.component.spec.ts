import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDoctorScheduleComponent } from './update-doctor-schedule.component';

describe('UpdateDoctorScheduleComponent', () => {
  let component: UpdateDoctorScheduleComponent;
  let fixture: ComponentFixture<UpdateDoctorScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateDoctorScheduleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateDoctorScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
