import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs.page';
import { HomePage } from '../pages/home/home.page';
import { TestPage } from '../pages/test/test.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: '',
        component: HomePage,
      },
      {
        path: 'home',
        component: HomePage,
      },
      {
        path: 'test',
        component: TestPage,
      },
      {
        path: 'list',
        children: [{
          path: '',
          loadChildren: '../pages/list/list.module#ListPageModule',
        }]
      }
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full',
  },
  {
    path: 'list',
    redirectTo: '/tabs/list',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule { }
