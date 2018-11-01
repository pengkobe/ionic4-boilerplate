import { Component } from '@angular/core';
import { EChartOption } from 'echarts';
/**
 * Generated class for the EchartsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-echarts',
  templateUrl: 'echarts.html',
})
export class EchartsPage {
  isAlwaysLight = false;

  languageType: string;

  options: EChartOption = {
    color: ['#3398DB'],
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisTick: {
          alignWithLabel: true
        }
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: 'Test',
        type: 'bar',
        barWidth: '60%',
        data: [10, 52, 200, 334, 390, 330, 220]
      }
    ]
  };

  constructor(
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad EchartsPage');
  }

}
