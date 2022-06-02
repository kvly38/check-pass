import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysPasswordComponent } from './analys-password.component';

describe('AnalysPasswordComponent', () => {
  let component: AnalysPasswordComponent;
  let fixture: ComponentFixture<AnalysPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalysPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
