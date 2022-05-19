// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

// Components
import { GeneratePasswordComponent } from './generate-password.component';
import { ReactiveFormsModule } from '@angular/forms';

// Slider
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { ClipboardModule } from 'ngx-clipboard';

@NgModule({
  declarations: [GeneratePasswordComponent],
  imports: [CommonModule, SharedModule, RouterModule, ReactiveFormsModule, NgxSliderModule, ClipboardModule]
})
export class GeneratePasswordModule {}
