import { Component, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';
import lodash from 'lodash';
import { Insomnia } from '@ionic-native/insomnia/ngx';
import { EChartOption } from 'echarts';
import { GlobalService } from '@services/global.service';
import { EmitService } from '@services/emit.service';

/**
 * Generated class for the TestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-test',
  templateUrl: 'test.page.html',
})
export class TestPage {
  isAlwaysLight = false;

  languageType: string;

  options: EChartOption = {
    color: ['#3398DB'],
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisTick: {
          alignWithLabel: true,
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        name: 'Test',
        type: 'bar',
        barWidth: '60%',
        data: [10, 52, 200, 334, 390, 330, 220],
      },
    ],
  };

  @Output()
  successScaned: EventEmitter<any> = new EventEmitter();
  @Output()
  wrongScaned: EventEmitter<any> = new EventEmitter();

  selectedTheme: String;

  constructor(
    private insomnia: Insomnia,
    public globalservice: GlobalService,
    public modalCtrl: ModalController,
    public emit: EmitService
  ) {
    this.emit.getActiveTheme().subscribe(val => this.selectedTheme = val);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TestPage');

    this.languageType = this.globalservice.languageType
      ? this.globalservice.languageType
      : 'zh';
  }

  async open(format: boolean = false) {
    const modal = await this.modalCtrl.create({
      component: 'QRScannerModal',
      showBackdrop: true,
    });
    modal.onDidDismiss().then(qrCode => {
      if (lodash.isNil(qrCode)) {
        return this.wrongScaned.emit();
      }
      const response = qrCode;
      return this.successScaned.emit(response);
    });
    await modal.present();
  }

  private formatScheme(qrCode: any) {
    if (lodash.isObject(qrCode)) {
      return qrCode;
    } else {
      this.wrongScaned.emit();
    }
  }

  /**
   * 设置屏幕常亮状态
   */
  changeLightState() {
    if (this.isAlwaysLight) {
      this.globalservice.isAlwaysLight = true;
      this.insomnia.keepAwake().then(
        () => {},
        e => {
          this.globalservice.isAlwaysLight = false;
          console.log('error', e);
        }
      );
    } else {
      this.globalservice.isAlwaysLight = false;
      this.insomnia.allowSleepAgain().then(
        () => {},
        e => {
          this.globalservice.isAlwaysLight = true;
          console.log('error', e);
        }
      );
    }
  }

  setLanguageType(val) {
    this.globalservice.languageType = val;
    this.emit.eventEmit.emit('languageType');
  }

  toggleAppTheme() {
    if (this.selectedTheme === 'dark-theme') {
      this.emit.setActiveTheme('light-theme');
    } else {
      this.emit.setActiveTheme('dark-theme');
    }
  }
}
