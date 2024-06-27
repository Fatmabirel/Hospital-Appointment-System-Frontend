import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientReportDetailComponent } from './patient-report-detail.component';

describe('PatientReportDetailComponent', () => {
  let component: PatientReportDetailComponent;
  let fixture: ComponentFixture<PatientReportDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientReportDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PatientReportDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
