import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';

import { ListPageRoutingModule } from './list.router.module';

import { SharedModule } from '../../shared/shared.module';

import { ListPage } from './list.page';
import { CalendarPage } from './calendar/calendar.page';
import { EchartsPage } from './echarts/echarts';
import { DynamicFormModule } from './dynamic-form/dynamic-form.module';
import { DynamicFormPage } from './dynamic-form/dynamic-form';

@NgModule({
  imports: [SharedModule, ListPageRoutingModule, NgxEchartsModule, DynamicFormModule],
  declarations: [CalendarPage, EchartsPage, ListPage, DynamicFormPage],
})
export class ListPageModule { }
