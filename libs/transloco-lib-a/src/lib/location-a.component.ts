import { Component, OnInit } from '@angular/core';
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { scopeLoader } from '../../../../scoped-translations';

@Component({
  selector: 'transloco-with-libs-a',
  template: `
    <ng-container *transloco="let t">
      <p>where am I? {{ t('compA.gpsa') }}</p>
    </ng-container>
  `,
  providers: [
    {
      provide: TRANSLOCO_SCOPE,
      useValue: {
        scope: 'compA',
        loader: scopeLoader((lang, root) => import(`./${root}/${lang}.json`))
      }
    }
  ]
})
export class LocationAComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
