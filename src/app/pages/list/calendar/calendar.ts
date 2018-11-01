import { Component } from '@angular/core';
/**
 * Generated class for the CalendarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
})
export class CalendarPage {
  constructor() {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad EchartsPage');
  }
  date: string;
  type: 'string'; // 'string' | 'js-date' | 'moment' | 'time' | 'object'

  onChange($event) {
    console.log($event);
  }
}
