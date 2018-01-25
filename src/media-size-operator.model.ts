import { Observable } from 'rxjs/Observable';

import { IMediaChain } from './models/media-chain.interface';
import { IMediaObservable } from './models/media-observable.interface';
import { IMediaSizeMap } from './models/media-size-map.interface';
import { isXs, isSm, isMd, isLg, isXl, mediaConditions } from './media-conditions';
import { MediaObservable } from './media-observable.model';

export class MediaSizeOperator {
    private _xs$: MediaObservable;
    private _sm$: MediaObservable;
    private _md$: MediaObservable;
    private _lg$: MediaObservable;
    private _xl$: MediaObservable;
    private _less$: MediaObservable;
    private _greater$: MediaObservable;

    constructor (
        protected _chain: IMediaChain,
        protected _media$: Observable<IMediaSizeMap>
    ) { }

    protected create (newChain: IMediaChain) {
        return new MediaObservable(newChain, this._media$);
    }

    public get xs$ (): IMediaObservable {
        return this._xs$ || (this._xs$ = this.create(createConditionChain(this._chain, isXs)));
    }

    public get sm$ (): IMediaObservable {
        return this._sm$ || (this._sm$ = this.create(createConditionChain(this._chain, isSm)));
    }

    public get md$ (): IMediaObservable {
        return this._md$ || (this._md$ = this.create(createConditionChain(this._chain, isMd)));
    }

    public get lg$ (): IMediaObservable {
        return this._lg$ || (this._lg$ = this.create(createConditionChain(this._chain, isLg)));
    }

    public get xl$ (): IMediaObservable {
        return this._xl$ || (this._xl$ = this.create(createConditionChain(this._chain, isXl)));
    }

    public get less$ (): IMediaObservable {
        return this._less$ || (this._less$ = this.create(createLessChain(this._chain)));
    }

    public get greater$ (): IMediaObservable {
        return this._greater$ || (this._greater$ = this.create(createGreaterChain(this._chain)));
    }
}

function createConditionChain (chain: IMediaChain, condition: (m: IMediaSizeMap) => boolean): IMediaChain {
    const childChain: IMediaChain = (m: IMediaSizeMap) => {
        return chain(m, () => condition(m));
    };

    childChain.conditionIndex = mediaConditions.indexOf(condition);

    if (childChain.conditionIndex < 0) {
        throw new Error('Unable to find condition in condition collection');
    }

    return childChain;
}

function createGreaterChain (chain: IMediaChain): IMediaChain {
    return (m: IMediaSizeMap) => {
        for (let i = chain.conditionIndex; i < mediaConditions.length; i++) {
            if (mediaConditions[i](m)) {
                return true;
            }
        }

        return false;
    };
}

function createLessChain (chain: IMediaChain): IMediaChain {
    return (m: IMediaSizeMap) => {
        if (chain.conditionIndex === undefined) {
            throw new Error('Unable to chain less$ from a media condition');
        }

        for (let i = chain.conditionIndex; i >= 0; i--) {
            if (mediaConditions[i](m)) {
                return true;
            }
        }

        return false;
    };
}
