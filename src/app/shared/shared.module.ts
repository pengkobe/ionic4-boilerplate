import { NgModule } from '@angular/core';

import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PipesModule } from '@pipes/pipes.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

import { DebounceClickDirective } from '@directives/debounce-click.directive';
import { TrackEventDirective } from '@directives/trackEvent.directive';

import { CalendarModule } from './ion2-calendar';

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, 'assets/i18n/', '.json');
}

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    PipesModule,
    CalendarModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  declarations: [DebounceClickDirective, TrackEventDirective],
  providers: [], // better be empty!
  exports: [
    PipesModule,
    TranslateModule,
    DebounceClickDirective,
    TrackEventDirective,
    IonicModule,
    CommonModule,
    FormsModule,
    CalendarModule,
  ],
})
export class SharedModule { }
