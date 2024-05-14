import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AUTHOR_ROUTES } from './custom-routes/author.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync()]
};
