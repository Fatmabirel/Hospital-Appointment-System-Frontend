import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorCompanionPolicyComponent } from './visitor-companion-policy.component';

describe('VisitorCompanionPolicyComponent', () => {
  let component: VisitorCompanionPolicyComponent;
  let fixture: ComponentFixture<VisitorCompanionPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisitorCompanionPolicyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisitorCompanionPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
