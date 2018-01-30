import { Injectable, Inject, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { OperatorFactoryService } from './operator-factory.service';
import { IDynamicMediaConfig, TMediaMap, TMediaIsOperator, IBreakpointConstraint } from './types';
import { DEFAULT_CONFIGURATION } from './default-configuration.model';

@Injectable()
export class RxResponsiveService<T extends IDynamicMediaConfig = typeof DEFAULT_CONFIGURATION> {
    private _snapshot: TMediaMap<T> = <any>{ };
    private _mediaSize$: BehaviorSubject<TMediaMap<T>>;
    private _is: TMediaIsOperator<T>;

    public get mediaSize$ (): Observable<TMediaMap<T>> {
        return this._mediaSize$;
    }

    public get snapshot (): TMediaMap<T> {
        return this._snapshot;
    }

    public get is(): TMediaIsOperator<T>  {
        return this._is || (this._is = this._operatorFactory.createIsOperator(this.mediaSize$));
    }

    constructor (
        @Inject('RX_RESPONSIVE_SERVICE_CONFIG') private _config: IDynamicMediaConfig,
        private _operatorFactory: OperatorFactoryService,
        private _zone: NgZone
    ) {
        this._mediaSize$ = new BehaviorSubject<TMediaMap<T>>(this._snapshot);
        this.addEvents();
    }

    private addEvents () {
        Object.keys(this._config).forEach(key => {
            const breakpointSettings = this._config[key];
            this.setupBreakpoint(breakpointSettings, (isActive) => this.snapshot[key] = isActive);
        });

        let previousMap = JSON.stringify(this._snapshot);
        window.addEventListener('resize', () => {
            if (previousMap !== JSON.stringify(this._snapshot)) {
                this._zone.run(() => {
                    this._mediaSize$.next(this._snapshot);
                });
                previousMap = JSON.stringify(this._snapshot);
            }
        });
    }

    private setupBreakpoint(constraint: IBreakpointConstraint, setter: (isActive: boolean) => void) {
        const queryList = this.createMediaQuery(constraint);
        this.createListener(queryList, setter);
    }

    private createMediaQuery (constraint: IBreakpointConstraint): MediaQueryList {
        const { min, max } = constraint;
        let breakPointQuery = `(min-width: ${min || 0}px)`;

        if (max) {
            breakPointQuery += ` and (max-width: ${max}px)`;
        }

        return window.matchMedia(breakPointQuery);
    }

    private createListener (mediaQueryList: MediaQueryList, setter: (isActive: boolean) => void) {
        this._zone.runOutsideAngular(() => {
            mediaQueryList.addListener(args => {
                setter(args.matches);
            });
        });

        setter(mediaQueryList.matches);
    }
}
