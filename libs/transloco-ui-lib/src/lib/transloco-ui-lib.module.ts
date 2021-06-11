import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';
import { LocationUIComponent } from './location-ui.component';

@NgModule({
  imports: [CommonModule, TranslocoModule],
  declarations: [LocationUIComponent],
  exports: [LocationUIComponent]
})
export class TranslocoUiLibModule {}
