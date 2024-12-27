import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { ProductState } from './shared/state/products-state';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [ 
    provideRouter(routes),
    importProvidersFrom(NgxsModule.forRoot([ProductState]))
  ]
};
