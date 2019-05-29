import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
// import { IonicStorageModule } from '@ionic/Storage';
import { ServiceWorkerModule } from '@angular/service-worker';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RebirthHttpModule } from 'rebirth-http';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { environment } from '../environments/environment';
import { QRScannerModalModule } from './modals/qr-scanner/qr-scanner.module';

import { MyApp } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { MyErrorHandler } from './error.handler';
import { RavenErrorHandler } from './raven-error-handler.';
import { MYHttpInterceptor } from './http.interceptor.service';

@NgModule({
  declarations: [MyApp],
  imports: [
    AppRoutingModule,
    CoreModule,
    SharedModule,
    BrowserModule,
    QRScannerModalModule,
    // IonicStorageModule.forRoot(),
    IonicModule.forRoot(),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  bootstrap: [MyApp],
  entryComponents: [MyApp],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    RebirthHttpModule,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MYHttpInterceptor,
      multi: true
    }
    // { provide: ErrorHandler, useClass: MyErrorHandler },
    // { provide: ErrorHandler, useClass: RavenErrorHandler }
  ],
})
export class AppModule { }
