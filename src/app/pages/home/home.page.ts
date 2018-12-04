import { Component } from '@angular/core';
import { DataService } from '@services/data.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.page.html',
})
export class HomePage {
  cacheData = '';
  constructor(public dataservice: DataService) {}

  testCache() {
    this.dataservice.testCachedData().subscribe(num => {
      this.cacheData = num;
    });
  }
}
