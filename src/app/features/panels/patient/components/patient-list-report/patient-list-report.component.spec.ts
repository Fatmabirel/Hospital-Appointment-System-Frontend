import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientListReportComponent } from './patient-list-report.component';

describe('PatientListReportComponent', () => {
  let component: PatientListReportComponent;
  let fixture: ComponentFixture<PatientListReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientListReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PatientListReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
