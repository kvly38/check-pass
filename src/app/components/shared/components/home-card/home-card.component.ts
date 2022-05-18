import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-card',
  templateUrl: './home-card.component.html',
  styleUrls: ['./home-card.component.scss']
})
export class HomeCardComponent {

  @Input() name: string;
  @Input() content: string;
  @Input() path: string;

  constructor(private router: Router) {}


  /**
   * Redirige l'utilisateur vers la page sélectionner
   *
   * @param path: route angular
   * @return void
   */
  public redirect(path): void {
    if (path) {
      this.router.navigate([`/${path}`]).then();
    }
  }
}
