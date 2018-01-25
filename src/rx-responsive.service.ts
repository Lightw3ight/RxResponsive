import { Injectable, Inject, NgZone } from '@angular/core';
import { IRxResponsiveServiceConfig, IBreakpointConstraint } from './models/rx-responsive-service-config.interface';
import { IMediaSizeMap } from './models/media-size-map.interface';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { MediaSizeOperator } from './media-size-operator.model';
import { IMediaChain } from './models/media-chain.interface';

@Injectable()
export class RxResponsiveService {
    private _snapshot: IMediaSizeMap;
    private _mediaSize$: BehaviorSubject<IMediaSizeMap>;
    private _is: MediaSizeOperator;

    public get mediaSize$ (): Observable<IMediaSizeMap> {
        return this._mediaSize$;
    }

    public get snapshot (): IMediaSizeMap {
        return this._snapshot;
    }

    public get is (): MediaSizeOperator {
        return this._is || (this._is = new MediaSizeOperator(createIsChain(), this.mediaSize$));
    }

    constructor (
        @Inject('RX_RESPONSIVE_SERVICE_CONFIG') private _config: IRxResponsiveServiceConfig,
        private _zone: NgZone
    ) {
        this._snapshot = {
            isXs: false,
            isSm: false,
            isMd: false,
            isLg: false,
            isXl: false
        };
        this._mediaSize$ = new BehaviorSubject<IMediaSizeMap>(this._snapshot);
    }

    private addEvents () {
        this.setupBreakpoint(this._config.xs, (m, v) => m.isXs = v);
        this.setupBreakpoint(this._config.sm, (m, v) => m.isSm = v);
        this.setupBreakpoint(this._config.md, (m, v) => m.isMd = v);
        this.setupBreakpoint(this._config.lg, (m, v) => m.isLg = v);
        this.setupBreakpoint(this._config.xl, (m, v) => m.isXl = v);

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

    private setupBreakpoint(constraint: IBreakpointConstraint, setter: (sizeMap: IMediaSizeMap, value: boolean) => void) {
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

    private createListener (mediaQueryList: MediaQueryList, setter: (sizeMap: IMediaSizeMap, value: boolean) => void) {
        this._zone.runOutsideAngular(() => {
            mediaQueryList.addListener(args => {
                setter(this._snapshot, args.matches);
            });
        });

        setter(this._snapshot, mediaQueryList.matches);
    }
}

function createIsChain (): IMediaChain {
    return (m: IMediaSizeMap, condition: () => boolean) => {
        return condition();
    };
}
