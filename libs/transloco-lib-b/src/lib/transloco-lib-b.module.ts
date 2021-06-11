import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslocoModule, TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { TranslocoUiLibModule } from '@transloco-with-libs/transloco-ui-lib';
import { scopeLoader } from '../../../../scoped-translations';
import { LocationBComponent } from './location-b.component';

@NgModule({
  imports: [CommonModule, TranslocoModule, TranslocoUiLibModule],
  providers: [
    {
      provide: TRANSLOCO_SCOPE,
      useValue: {
        scope: 'compB',
        loader: scopeLoader((lang: string, root: string) =>
          import(`./${root}/${lang}.json`)
        )
      }
    }
  ],
  declarations: [LocationBComponent],
  exports: [LocationBComponent]
})
export class TranslocoLibBModule {}
