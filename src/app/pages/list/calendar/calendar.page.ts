import { Component } from '@angular/core';
/**
 * Generated class for the CalendarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.page.html',
})
export class CalendarPage {
  date: string;
  type: 'string'; // 'string' | 'js-date' | 'moment' | 'time' | 'object'

  constructor() {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad EchartsPage');
  }

  onChange($event) {
    console.log($event);
  }
}
