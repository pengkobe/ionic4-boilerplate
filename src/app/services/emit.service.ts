import { EventEmitter, OnInit } from '@angular/core';

export class EmitService implements OnInit {
  public eventEmit: EventEmitter<any>;

  constructor() {
    console.log('Hello EmitService Provider');
    this.eventEmit = new EventEmitter();
  }

  ngOnInit() {}
}
