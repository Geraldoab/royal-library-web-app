import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withJsonpSupport } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './app/app.routes'

appConfig.providers = [provideHttpClient(withJsonpSupport()), provideAnimations(), importProvidersFrom(RouterModule.forRoot(routes))]

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
