import { Component, OnInit } from '@angular/core';
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
export function en() {
  return import('./i18n/en.json');
}

export function es() {
  return import('./i18n/es.json');
}

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
      useFactory: () => ({
        scope: 'compA',
        loader: { en, es }
      })
    }
  ]
})
export class LocationAComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
