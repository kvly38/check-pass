// Angular
import { Component, OnInit } from '@angular/core';
//Electron
import { ElectronService } from '../../core/services';

import { NgZone } from '@angular/core';

import { NgxSpinnerService } from 'ngx-spinner';
import { JSONArray } from 'puppeteer';


@Component({
  selector: 'app-analys-leak',
  templateUrl: './analys-leak.component.html',
  styleUrls: ['./analys-leak.component.scss']
})
export class AnalysLeakComponent implements OnInit {
  email = '';
  // private electronService: ElectronService;
  leakReturn: {
    infoText: string,
    infoDetail: Array<{plateforme: string, date: string,dataCompromises:string,logo:string}>
    result: boolean
  }
  constructor(private elec: ElectronService, private _ngZone: NgZone, private spinner: NgxSpinnerService) {
    this.leakReturn = {
      infoText: '',
      infoDetail: [],
      result: true
    }
  }

  // private isFullScreen(): boolean {
  //   return this.electronService.remote.getCurrentWindow().isMaximized();
  // }
  // private reduceApp() {
  //   this.electronService.remote.getCurrentWindow().minimize();
  // }
  eventIPC = undefined;



  ngOnInit(): void {
    console.log(this.elec.isElectron);
    this.eventIPC = this.elec.onEventIpc();
    this.eventIPC.on('leakReturn', (event, arg) => {
      console.log('event', event)
      console.log('arg', arg);
      this._ngZone.run(() => {

        this.leakReturn.infoText = arg.infoText;
        this.leakReturn.infoDetail = arg.infoDatail;
        this.leakReturn.result = true;
        this.spinner.hide();
      });
    });;
  }



  btnAction(mail) {
    //Valide l'e-mail en regex sinon ne pas executer
    this.leakReturn.infoText = '';
    this.leakReturn.infoDetail = [];
    //Selectionne l'input avec l'id emaim

    if (mail.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
      this.elec.rendererProcess('btnAction', mail);
      this.spinner.show();

    } else {
      this.leakReturn.infoText = 'Ce n\'est pas une adresse mail valide !';
    }
  }


}
