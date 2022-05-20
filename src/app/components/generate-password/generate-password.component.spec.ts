import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GeneratePasswordComponent } from './generate-password.component';
import { TranslateModule } from '@ngx-translate/core';

import { RouterTestingModule } from '@angular/router/testing';

describe('DetailComponent', () => {
  let component: GeneratePasswordComponent;
  let fixture: ComponentFixture<GeneratePasswordComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [GeneratePasswordComponent],
      imports: [TranslateModule.forRoot(), RouterTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneratePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
