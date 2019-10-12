import { TranslocoModule, TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { scopeLoader } from '../../../../scoped-translations';
import { LocationBComponent } from './location-b.component';

@NgModule({
  imports: [CommonModule, TranslocoModule],
  providers: [
    {
      provide: TRANSLOCO_SCOPE,
      useValue: {
        scope: 'compB',
        loader: scopeLoader((lang, root) => import(`./${root}/${lang}.json`))
      }
    }
  ],
  declarations: [LocationBComponent],
  exports: [LocationBComponent]
})
export class TranslocoLibBModule {}
