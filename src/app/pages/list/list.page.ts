import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { GlobalService } from '@services/global.service';
import { TranslateService } from '@ngx-translate/core';
import { EmitService } from '@services/emit.service';

@Component({
  selector: 'page-list',
  templateUrl: 'list.page.html',
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  items: Array<{ title: string; note: string; icon: string }>;

  constructor(
    public route: Router,
    public translate: TranslateService,
    public globalservice: GlobalService,
    public emit: EmitService
  ) {
    this.items = [
      {
        title: 'echarts',
        note: '',
        icon: 'speedometer',
      },
      {
        title: 'todo',
        note: '',
        icon: 'create',
      },
      {
        title: 'calendar',
        note: '',
        icon: 'calendar',
      },
      {
        title: 'dynamicform',
        note: '',
        icon: 'paper',
      },
    ];

    this.initTranslate();
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

  initTranslate() {
    this.translate.addLangs(['en', 'zh']);
    this.translate.setDefaultLang('en');
    if (this.globalservice.languageType) {
      this.translate.use(this.globalservice.languageType);
    } else {
      const browserLang = this.translate.getBrowserLang();
      this.translate.use(browserLang.match(/en|zh/) ? browserLang : 'en');
    }

    this.emit.eventEmit.subscribe(val => {
      if (val === 'languageType') {
        this.translate.use(this.globalservice.languageType);
      }
    });
  }
}
