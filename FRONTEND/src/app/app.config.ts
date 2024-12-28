import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { ProductState } from './shared/state/products-state';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ApiHttpInterceptor } from './http-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [ 
    provideRouter(routes),
    importProvidersFrom(NgxsModule.forRoot([ProductState])),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: ApiHttpInterceptor, 
      multi:true
    }
  ]
};
