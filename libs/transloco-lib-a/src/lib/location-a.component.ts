import { Component, OnInit } from '@angular/core';
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { scopeLoader } from '../../../../scoped-translations';

@Component({
  selector: 'transloco-with-libs-a',
  template: `
    <ng-container *transloco="let t">
      <p>where am I? {{ t('compA.gpsa') }}</p>
    </ng-container>
    <transloco-with-libs-ui></transloco-with-libs-ui>
  `,
  providers: [
    {
      provide: TRANSLOCO_SCOPE,
      useValue: {
        scope: 'compA',
        loader: scopeLoader((lang: string, root: string) =>
          import(`./${root}/${lang}.json`)
        )
      }
    }
  ]
})
export class LocationAComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
