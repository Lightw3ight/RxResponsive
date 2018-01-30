import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { OperatorFactoryService } from './operator-factory.service';
import { IMediaObservable, TMediaOrOperator, IDynamicMediaConfig, IMediaChain, TMediaMap } from './types';
export declare class MediaObservable<T extends IDynamicMediaConfig> extends ReplaySubject<boolean> implements IMediaObservable<T> {
    private _chain;
    private _media$;
    private _operatorFactory;
    private _or;
    constructor(_chain: IMediaChain<T>, _media$: Observable<TMediaMap<T>>, _operatorFactory: OperatorFactoryService);
    readonly or: TMediaOrOperator<T>;
}
