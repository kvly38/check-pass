// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Traduction
import { TranslateModule } from '@ngx-translate/core';

// Directive
import { WebviewDirective } from './directives';

// Components
import { HomeCardComponent, NavbarComponent, PageNotFoundComponent } from './components';

@NgModule({
  declarations: [PageNotFoundComponent, WebviewDirective, NavbarComponent, HomeCardComponent],
  imports: [CommonModule, TranslateModule, FormsModule, RouterModule],
  exports: [TranslateModule, WebviewDirective, FormsModule, NavbarComponent, HomeCardComponent]
})
export class SharedModule {}
