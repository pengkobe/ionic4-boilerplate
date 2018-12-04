import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TabsPageRoutingModule } from './tabs.router.module';

import { SharedModule } from './../shared/shared.module';
import { TabsPage } from './tabs.page';
import { HomePage } from '../pages/home/home.page';
import { TestPage } from '../pages/test/test.page';

@NgModule({
  imports: [IonicModule, SharedModule, TabsPageRoutingModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [TabsPage, HomePage, TestPage],
})
export class TabsPageModule { }
