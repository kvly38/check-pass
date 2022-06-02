

// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
// Components
import { AnalysLeakComponent } from './analys-leak.component';
import { NgxSpinnerModule } from "ngx-spinner";


@NgModule({
  declarations: [AnalysLeakComponent],
  imports: [CommonModule, SharedModule, RouterModule,NgxSpinnerModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AnalysLeakModule {}
