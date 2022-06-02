// Angular
import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

// Traductions
import { TranslateService } from '@ngx-translate/core';

// Interfaces
import { RoutesUse } from '../../interfaces/routesUse';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  // Routes de l'app
  routesUse: RoutesUse[] = [];

  constructor(private router: Router,
              public translate: TranslateService) {

    // Récupère les traductions pour les routes
    this.translate.get([
      'PAGES.ROUTING.GENERATE.TITLE',
      'PAGES.ROUTING.GENERATE.CONTENT',
      'PAGES.ROUTING.ANALYS.TITLE',
      'PAGES.ROUTING.ANALYS.CONTENT',
      'PAGES.ROUTING.LEAK.TITLE',
      'PAGES.ROUTING.LEAK.CONTENT',
    ]).subscribe((words) => {

      const allPath: string[] = [];
      // Cherche l'ensemble des routes de l'application (source: app-routing.modules.ts)
      this.router.config.forEach((r: Route) => {
        const path = r.path;
        // Supprime les routes Home et 404
        if (path !== '' && path !== '**' && path !== 'home') {
          // TODO ajouter les routes ici avec les bonnes traduction dans le fichier ./assets/i18n/fr.json
          allPath.push(r.path);
          console.log(allPath);
          this.routesUse = [
            {
              name: words['PAGES.ROUTING.ANALYS.TITLE'],
              content: words['PAGES.ROUTING.ANALYS.CONTENT'],
              path:  allPath.includes('analys') ? 'analys' : ''
            },
            {
              name: words['PAGES.ROUTING.GENERATE.TITLE'],
              content: words['PAGES.ROUTING.GENERATE.CONTENT'],
              path: allPath.includes('generate') ? 'generate' : ''
            },
            {
              name: words['PAGES.ROUTING.LEAK.TITLE'],
              content: words['PAGES.ROUTING.LEAK.CONTENT'],
              path: allPath.includes('leak') ? 'leak' : ''
            }
          ];
        }
      });
    });
  }

}
