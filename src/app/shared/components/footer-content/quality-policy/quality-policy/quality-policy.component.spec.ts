import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityPolicyComponent } from './quality-policy.component';

describe('QualityPolicyComponent', () => {
  let component: QualityPolicyComponent;
  let fixture: ComponentFixture<QualityPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QualityPolicyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QualityPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
