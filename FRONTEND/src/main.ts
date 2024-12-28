import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { ProductState } from './app/shared/state/products-state';
import { NgxsModule } from '@ngxs/store';

bootstrapApplication(AppComponent, {providers: [...appConfig.providers,provideHttpClient(),
  importProvidersFrom(NgxsModule.forRoot([ProductState])),
  
]})
  .catch((err) => console.error(err));
  