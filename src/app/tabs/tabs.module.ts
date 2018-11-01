import { NgModule } from '@angular/core';

import { TabsPageRoutingModule } from './tabs.router.module';

import { SharedModule } from './../shared/shared.module';
import { TabsPage } from './tabs.page';
import { HomePage } from '../pages/home/home.page';
import { TestPage } from '../pages/test/test.page';
import { ListPage } from '../pages/list/list.page';

@NgModule({
  imports: [SharedModule, TabsPageRoutingModule],
  declarations: [TabsPage,HomePage,TestPage,ListPage],
})
export class TabsPageModule {}
