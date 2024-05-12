import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withJsonpSupport } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

appConfig.providers = [provideHttpClient(withJsonpSupport()), provideAnimations()]

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
