import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';

@Component({
  selector: 'close-popup',
  templateUrl: 'close-popup.html'
})
export class ClosePopupComponent {

  @HostBinding('style.z-index') style = 1000;

  @Input() large: boolean;
  @Input() color: string;
  @Output() closePopUp: EventEmitter<any> = new EventEmitter();

  constructor() {}

  close() {
    this.closePopUp.emit();
  }

}
