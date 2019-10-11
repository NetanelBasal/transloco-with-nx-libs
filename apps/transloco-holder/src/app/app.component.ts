import { Component } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'transloco-with-libs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private translocoService: TranslocoService) {}

  change(lang: string) {
    this.translocoService.setActiveLang(lang);
  }
}
