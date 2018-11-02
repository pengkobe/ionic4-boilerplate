import { NgModule } from '@angular/core';

import { ListPageRoutingModule } from './list.router.module';

import { SharedModule } from '../../shared/shared.module';

import { ListPage } from './list.page';
import { CalendarPage } from './calendar/calendar.page';
import { EchartsPage } from './echarts/echarts';

@NgModule({
  imports: [SharedModule, ListPageRoutingModule],
  declarations: [CalendarPage, EchartsPage, ListPage],
})
export class ListPageModule {}
