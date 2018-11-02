import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CalendarPage } from './calendar/calendar.page';
import { EchartsPage } from './echarts/echarts';

import { ListPage } from './list.page';

const routes: Routes = [
  {
    path: '',
    component: ListPage,
  },
  {
    path: 'calendar',
    component: CalendarPage,
  },
  {
    path: 'echarts',
    component: EchartsPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListPageRoutingModule {}
