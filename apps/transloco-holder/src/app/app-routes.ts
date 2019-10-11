import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('@transloco-with-libs/transloco-lib-a').then(
        m => m.TranslocoLibAModule
      )
  }
];
