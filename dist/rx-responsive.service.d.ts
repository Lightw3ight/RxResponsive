import { NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { OperatorFactoryService } from './operator-factory.service';
import { IDynamicMediaConfig, TMediaMap, TMediaIsOperator } from './types';
import { DEFAULT_CONFIGURATION } from './default-configuration.model';
export declare class RxResponsiveService<T extends IDynamicMediaConfig = typeof DEFAULT_CONFIGURATION> {
    private _config;
    private _operatorFactory;
    private _zone;
    private _snapshot;
    private _mediaSize$;
    private _is;
    readonly mediaSize$: Observable<TMediaMap<T>>;
    readonly snapshot: TMediaMap<T>;
    readonly is: TMediaIsOperator<T>;
    constructor(_config: IDynamicMediaConfig, _operatorFactory: OperatorFactoryService, _zone: NgZone);
    private addEvents();
    private setupBreakpoint(constraint, setter);
    private createMediaQuery(constraint);
    private createListener(mediaQueryList, setter);
}
