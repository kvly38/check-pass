//Electron
import { Component, OnInit } from '@angular/core';
import { ElectronService } from 'ngx-electron';

// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

// Components
import { AnalysLeakComponent } from './analys-leak.component';



@NgModule({
  declarations: [AnalysLeakComponent],
  imports: [CommonModule, SharedModule, RouterModule]
})
export class AnalysLeakModule {}
