import {
  Directive,
  Input,
  OnInit,
  HostListener,
  EventEmitter,
  Output,
  OnDestroy,
} from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Directive({ selector: '[debounceClickDirective]' })
export class DebounceClickDirective implements OnInit, OnDestroy {
  @Input() private debounceClickDirective;
  @Output() private debounceClick: EventEmitter<any> = new EventEmitter();
  private clicks = new Subject<any>();
  private debounceStream$;
  constructor() {
    // pass
  }
  public ngOnInit() {
    this.debounceStream$ = this.clicks
      .pipe(debounceTime(this.debounceClickDirective))
      .subscribe(event => this.debounceClick.emit(event));
  }
  public ngOnDestroy() {
    this.debounceStream$.unsubscribe();
  }
  @HostListener('click', ['$event'])
  private clickEvent(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.clicks.next(event);
  }
}
