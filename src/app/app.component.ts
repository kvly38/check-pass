// Angular
import { Component } from '@angular/core';
import { ElectronService } from './core/services';
import { TranslateService } from '@ngx-translate/core';

// Env
import { APP_CONFIG } from '../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // La route est-elle / ou /home
  isHome = true;

  constructor(
    private electronService: ElectronService,
    private translate: TranslateService,
    private router: Router
  ) {

    // Vérifie le nom de la route
    this.router.events.subscribe((res) => {
      // Cache la barre de navigation si la page est différente de / ou /home
      this.isHome = !(this.router.url === '/' || this.router.url === '/home');
    });

    // Load translate file
    this.translate.setDefaultLang('fr');
    console.log('APP_CONFIG', APP_CONFIG);

    if (electronService.isElectron) {
      console.log(process.env);
      console.log('Run in electron');
      console.log('Electron ipcRenderer', this.electronService.ipcRenderer);
      console.log('NodeJS childProcess', this.electronService.childProcess);
    } else {
      console.log('Run in browser');
    }
  }
}
