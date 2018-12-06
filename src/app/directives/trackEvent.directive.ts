import {
    Directive,
    Input,
    OnInit,
    HostListener,
    OnDestroy,
} from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { AppCenterAnalytics, StringMap } from '@ionic-native/app-center-analytics/ngx';

@Directive({ selector: '[appTrackEventDirective]' })
export class TrackEventDirective implements OnInit, OnDestroy {
    @Input() private trackParams: {
        evtName;
        parames: StringMap
    };
    private clicks = new Subject<any>();
    private trackStream$;
    constructor(private appCenterAnalytics: AppCenterAnalytics) {
        // pass
    }
    public ngOnInit() {
        this.trackStream$ = this.clicks
            .pipe(debounceTime(100)).subscribe(evt => {
                if (!this.trackParams.evtName) {
                    console.error('evtName undefined');
                }
                if (!this.trackParams.parames) {
                    console.error('parames undefined');
                }
                this.appCenterAnalytics.setEnabled(true).then(() => {
                    this.appCenterAnalytics.trackEvent(this.trackParams.evtName, this.trackParams.parames).then(() => {
                        console.log(this.trackParams.evtName + ' event tracked');
                    });
                });
            });
    }
    public ngOnDestroy() {
        this.trackStream$.unsubscribe();
    }
    @HostListener('click', ['$event'])
    private clickEvent(event: MouseEvent) {
        event.preventDefault();
        event.stopPropagation();
        this.clicks.next(event);
    }
}
