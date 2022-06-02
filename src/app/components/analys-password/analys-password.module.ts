// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// Components
import { AnalysPasswordComponent } from './analys-password.component';



@NgModule({
  declarations: [AnalysPasswordComponent],
  imports: [CommonModule, SharedModule, RouterModule,FontAwesomeModule]
})
export class AnalysPasswordModule { }
