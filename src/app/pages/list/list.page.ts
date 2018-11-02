import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'page-list',
  templateUrl: 'list.page.html',
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  items: Array<{ title: string; note: string; icon: string }>;

  constructor(public route: Router) {
    this.items = [
      {
        title: 'echarts',
        note: '',
        icon: 'speedometer',
      },
      {
        title: 'calendar',
        note: '',
        icon: 'calendar',
      },
    ];
  }

  toHome(event) {
    this.route.navigate(['tabs']);
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 600);
  }
}
