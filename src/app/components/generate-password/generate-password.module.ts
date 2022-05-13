// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

// Components
import { GeneratePasswordComponent } from './generate-password.component';

@NgModule({
  declarations: [GeneratePasswordComponent],
  imports: [CommonModule, SharedModule, RouterModule]
})
export class GeneratePasswordModule {}
