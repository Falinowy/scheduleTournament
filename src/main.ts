import { enableProdMode, ErrorHandler, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { PreloadAllModules, provideRouter, RouteReuseStrategy, withComponentInputBinding, withPreloading } from '@angular/router';
import { IonicRouteStrategy, IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { GlobalErrorHandler } from './app/services/global-error-handler';
if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    provideHttpClient(),
    provideRouter(routes, withPreloading(PreloadAllModules), withComponentInputBinding()),
    importProvidersFrom(
      IonicModule.forRoot(),
      IonicStorageModule.forRoot()
    )
  ]
}).catch(err => console.log(err));

