import {
  ApplicationConfig,
  provideZoneChangeDetection,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { provideToastr } from 'ngx-toastr';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimationsAsync(),
    provideToastr({
      timeOut: 4000,
      positionClass: 'toast-top-right',
      progressBar: true,
      progressAnimation: 'decreasing',
      closeButton: true,
      preventDuplicates: true,
    }),
  ],
};
