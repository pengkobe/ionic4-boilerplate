import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { QRScannerModal } from './qr-scanner';
import { QRScanner } from '@ionic-native/qr-scanner/ngx';
import { ClosePopupComponentModule } from '@components/close-popup/close-popup.module';

@NgModule({
  declarations: [QRScannerModal],
  imports: [
    RouterModule.forChild([{ path: '', component: QRScannerModal }]),
    ClosePopupComponentModule,
  ],
  providers: [QRScanner],
})
export class QRScannerModalModule {}
