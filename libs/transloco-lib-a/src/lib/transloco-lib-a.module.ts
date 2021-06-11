import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { TranslocoUiLibModule } from '@transloco-with-libs/transloco-ui-lib';
import { LocationAComponent } from './location-a.component';

const routes = [
  {
    path: '',
    component: LocationAComponent
  }
];
@NgModule({
  imports: [
    CommonModule,
    TranslocoModule,
    RouterModule.forChild(routes),
    TranslocoUiLibModule
  ],
  providers: [],
  declarations: [LocationAComponent],
  exports: [LocationAComponent]
})
export class TranslocoLibAModule {}
