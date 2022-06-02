import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  title = '';

  constructor(private router: Router,
              public translate: TranslateService) {

    // TODO Ajouter les traductions si besoin
    this.translate.get([
      'PAGES.ROUTING.GENERATE.TITLE',
      'PAGES.ROUTING.ANALYS.TITLE'
    ]).subscribe((words) => {
      const path = this.router.url.replace('/', '');
      this.title = this.getTitle(path, words);

    });

  }

  // TODO Ajouter les routes + trad
  /**
   * Fait le match entre la route et la traduction
   *
   * @param path: string
   * @param trad: string
   * @return string
   */
  getTitle(path: string, trad): string {
    switch (path) {
      case 'generate':
        return trad['PAGES.ROUTING.GENERATE.TITLE'];
      case 'analys':
        return trad['PAGES.ROUTING.ANALYS.TITLE'];
    }
  }

}
