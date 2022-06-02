// Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Modules
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// Lib
import { ToastrModule } from 'ngx-toastr';
import { ClipboardModule } from 'ngx-clipboard';

// Components
import { GeneratePasswordModule } from './components/generate-password/generate-password.module';
import { AnalysPasswordModule } from './components/analys-password/analys-password.module';
import { HomeModule } from './components/home/home.module';
import { SharedModule } from './components/shared/shared.module';
import { AppComponent } from './app.component';

// AoT requires an exported function for factories
const httpLoaderFactory = (http: HttpClient): TranslateHttpLoader =>  new TranslateHttpLoader(http, './assets/i18n/', '.json');

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    HomeModule,
    GeneratePasswordModule,
    AnalysPasswordModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ClipboardModule,
    ToastrModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
