// Angular
import { Component, OnInit } from '@angular/core';
//Electron
// import { ElectronService } from 'ngx-electron';


@Component({
  selector: 'app-analys-leak',
  templateUrl: './analys-leak.component.html',
  styleUrls: ['./analys-leak.component.scss']
})
export class AnalysLeakComponent implements OnInit {

  // private electronService: ElectronService;

  // constructor() {
  //   this.electronService = new ElectronService();
  // }

  // private isFullScreen(): boolean {
  //   return this.electronService.remote.getCurrentWindow().isMaximized();
  // }
  // private reduceApp() {
  //   this.electronService.remote.getCurrentWindow().minimize();
  // }

  ngOnInit(): void {
    // this.isFullScreen()
    // this.reduceApp()

  }


}
