import { TranslocoModule, TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationBComponent } from './location-b.component';

export function en() {
  return import('./i18n/en.json');
}

export function es() {
  return import('./i18n/es.json');
}

@NgModule({
  imports: [CommonModule, TranslocoModule],
  providers: [
    {
      provide: TRANSLOCO_SCOPE,
      useFactory: () => ({
        scope: 'compB',
        loader: { en, es }
      })
    }
  ],
  declarations: [LocationBComponent],
  exports: [LocationBComponent]
})
export class TranslocoLibBModule {}
