import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { IMediaChain } from './models/media-chain.interface';
import { IMediaObservable } from './models/media-observable.interface';
import { IMediaSizeMap } from './models/media-size-map.interface';
import { MediaSizeOperator } from './media-size-operator.model';

export class MediaObservable extends ReplaySubject<boolean> implements IMediaObservable {
    private _or: MediaSizeOperator;

    constructor (
        private _chain: IMediaChain,
        private _media$: Observable<IMediaSizeMap>
    ) {
        super();
        const sub = _media$.subscribe(
            mm => this.next(this._chain(mm || <IMediaSizeMap>{ })),
            err => this.error(err),
            () => {
                sub.unsubscribe();
                this.complete();
            });
    }

    public get or () {
        return this._or || (this._or = new MediaSizeOperator(createOrChain(this._chain), this._media$));
    }
}

function createOrChain (chain: IMediaChain): IMediaChain {
    const newChain: IMediaChain = (m: IMediaSizeMap, condition: () => boolean) => {
        return chain(m, () => true) || condition();
    };
    newChain.conditionIndex = chain.conditionIndex;

    return newChain;
}
