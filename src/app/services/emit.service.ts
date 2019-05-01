import { EventEmitter, OnInit, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmitService implements OnInit {
  public eventEmit: EventEmitter<any> = new EventEmitter();
  public theme: BehaviorSubject<string> = new BehaviorSubject('dark-theme');

  constructor() {
    console.log('Hello EmitService Provider');
    this.eventEmit = new EventEmitter();
    this.theme = new BehaviorSubject('dark-theme');
  }

  ngOnInit() { }

  setActiveTheme(val) {
    this.theme.next(val);
  }

  getActiveTheme():Observable<any> {
    return this.theme.asObservable();
  }
}
