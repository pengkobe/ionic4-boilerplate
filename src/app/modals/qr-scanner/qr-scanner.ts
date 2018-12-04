import { Component } from '@angular/core';
import {
  ModalController,
  Events,
} from '@ionic/angular';

import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';


@Component({
  selector: 'modal-qr-scanner',
  templateUrl: 'qr-scanner.html',
  styleUrls: ['./qr-scanner.scss'],
  providers: [Vibration],
})
export class QRScannerModal {
  private ionApp: HTMLElement;

  constructor(
    private events: Events,
    private qrScanner: QRScanner,
    private modalCtrl: ModalController,
    private vibration: Vibration
  ) {
    this.scanQrCode();
  }

  private scanQrCode(): void {
    this.qrScanner
      .prepare()
      .then((status: QRScannerStatus) => {
        this.ionApp = <HTMLElement>document.getElementsByTagName(
          'ion-split-pane'
        )[0];
        if (status.authorized) {
          const scanSub = this.qrScanner.scan().subscribe((qrCode: string) => {
            this.vibration.vibrate(30);
            let response;
            try {
              response = JSON.parse(qrCode);
            } catch (e) {
              response = qrCode;
            }

            this.hideCamera();
            scanSub.unsubscribe();
            this.dismiss(response);
          });

          this.ionApp.classList.add('transparent');
          this.showCamera();
        } else if (status.denied) {
          console.error('QR_CODE.PERMISSION_PERMANENTLY_DENIED');
          this.dismiss();
        } else {
          console.error('QR_CODE.PERMISSION_DENIED');
          this.dismiss();
        }
      })
      .catch((e: any) => {
        console.warn('QR_CODE.PROBLEM_TEXT');
        this.dismiss();
      });
  }

  private showCamera() {
    this.qrScanner.show();
    this.events.publish('qrScanner:show');
  }

  private hideCamera() {
    this.qrScanner.hide();
    this.events.publish('qrScanner:hide');
  }

  public dismiss(qrCode: object = null) {
    this.qrScanner.getStatus().then((status: QRScannerStatus) => {
      if (status.showing) {
        this.hideCamera();
      }
    });
    if (this.ionApp) {
      this.ionApp.classList.remove('transparent');
    }
    this.modalCtrl.dismiss(qrCode);
  }

  ionViewDidLeave() {
    this.hideCamera();
    this.qrScanner.destroy();
  }
}
