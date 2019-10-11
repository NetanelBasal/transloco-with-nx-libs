import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationAComponent } from './location-a.component';

const routes = [
  {
    path: '',
    component: LocationAComponent
  }
];
@NgModule({
  imports: [CommonModule, TranslocoModule, RouterModule.forChild(routes)],
  providers: [],
  declarations: [LocationAComponent],
  exports: [LocationAComponent]
})
export class TranslocoLibAModule {}
