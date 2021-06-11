import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'transloco-with-libs-b',
  template: `
    <ng-container *transloco="let t">
      <p>where am I? {{ t('compB.gpsb') }}</p>
    </ng-container>
    <transloco-with-libs-ui></transloco-with-libs-ui>
  `
})
export class LocationBComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
