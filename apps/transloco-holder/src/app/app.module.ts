import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { translocoLoader } from './transloco.loader';
import {
  TranslocoModule,
  TRANSLOCO_CONFIG,
  TranslocoConfig
} from '@ngneat/transloco';

import { TranslocoLibBModule } from '@transloco-with-libs/transloco-lib-b';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { routes } from './app-routes';
import { availableLangs } from 'scoped-translations';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslocoModule,
    TranslocoLibBModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    {
      provide: TRANSLOCO_CONFIG,
      useValue: {
        reRenderOnLangChange: true,
        availableLangs,
        defaultLang: 'en',
        prodMode: environment.production
      } as TranslocoConfig
    },
    translocoLoader
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
