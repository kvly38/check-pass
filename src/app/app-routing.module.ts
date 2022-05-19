// Angular
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { PageNotFoundComponent } from './components/shared/components';
import { HomeComponent } from './components/home/home.component';
import { GeneratePasswordComponent } from './components/generate-password/generate-password.component';
import { AnalysPasswordComponent } from './components/analys-password/analys-password.component';

// Routing
const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'generate',
    component: GeneratePasswordComponent
  },
  {
    path: 'analys',
    component: AnalysPasswordComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
