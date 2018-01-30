import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { OperatorFactoryService } from './operator-factory.service';
import { IMediaObservable, TMediaOrOperator, IDynamicMediaConfig, IMediaChain, TMediaMap } from './types';

export class MediaObservable<T extends IDynamicMediaConfig> extends ReplaySubject<boolean> implements IMediaObservable<T> {
    private _or: TMediaOrOperator<T>;

    constructor (
        private _chain: IMediaChain<T>,
        private _media$: Observable<TMediaMap<T>>,
        private _operatorFactory: OperatorFactoryService
    ) {
        super();
        const sub = _media$.subscribe(
            mm => this.next(this._chain.some(lnk => lnk(mm))),
            err => this.error(err),
            () => {
                sub.unsubscribe();
                this.complete();
            });
    }

    public get or (): TMediaOrOperator<T> {
        return this._or || (this._or = this._operatorFactory.createOrOperator([...this._chain], this._media$));
    }
}
