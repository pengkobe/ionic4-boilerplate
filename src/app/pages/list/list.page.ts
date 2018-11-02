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
    // If we navigated to this page, we will have an item available as a nav param

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

  itemTapped(event, item) {
    if (item.title === 'echarts') {
      this.route.navigate(['/echarts', { foo: 'foo' }]);
    }
    if (item.title === 'calendar') {
      this.route.navigate(['/calendar', { foo: 'foo' }]);
    }
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 600);
  }
}
