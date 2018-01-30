import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TMediaIsOperator, IDynamicMediaConfig, TMediaMap, IMediaChain, TMediaOrOperator, MediaExtremities, IMediaChainCondition, IBreakpointConstraint } from './types';
import { MediaObservable } from './media-observable.model';

@Injectable()
export class OperatorFactoryService {
    constructor (
        @Inject('RX_RESPONSIVE_SERVICE_CONFIG') private _config: IDynamicMediaConfig
    ) { }

    public createIsOperator<T extends IDynamicMediaConfig>(media$: Observable<TMediaMap<T>>): TMediaIsOperator<T> {
        const operator = <TMediaIsOperator<T>>{ };
        const cache = <TMediaIsOperator<T>>{ };

        this.defineConfigFields(operator, cache, [], media$);

        return operator;
    }

    public createOrOperator<T extends IDynamicMediaConfig>(chain: IMediaChain<T>, media$: Observable<TMediaMap<T>>): TMediaOrOperator<T> {
        const operator = <TMediaOrOperator<T>>{ };
        const cache = <TMediaOrOperator<T>>{ };

        this.defineConfigFields(operator, cache, chain, media$);
        this.defineMediaProperty('less', operator, cache, media$, () => this.createExtremityChain(chain, (a, b) => a.min <= b.min));
        this.defineMediaProperty('greater', operator, cache, media$, () => this.createExtremityChain(chain, (a, b) => a.max >= b.max));

        return operator;
    }

    private defineConfigFields<T extends IDynamicMediaConfig>(
        operator: TMediaOrOperator<T>,
        cache: TMediaOrOperator<T>,
        chain: IMediaChain<T>,
        mediaMap$: Observable<TMediaMap<T>>) {

        Object.keys(this._config).forEach((key: keyof T) => {
            this.defineMediaProperty(key, operator, cache, mediaMap$, (k) => this.createConditionChain(chain, k));
        });
    }

    private defineMediaProperty<T extends IDynamicMediaConfig> (
        key: keyof T | MediaExtremities,
        operator: TMediaOrOperator<T>,
        cache: TMediaOrOperator<T>,
        mediaMap$: Observable<TMediaMap<T>>,
        chainFactory: (k: keyof T) => IMediaChain<T>
    ) {
        Object.defineProperty(operator, key, {
            get: () => {
                return cache[key] || (cache[key] = new MediaObservable(chainFactory(key), mediaMap$, this));
            }
        });
    }

    private createConditionChain<T extends IDynamicMediaConfig | MediaExtremities>(chain: IMediaChain<T>, constraintKey: keyof T): IMediaChain<T> {
        const condition: IMediaChainCondition<T> = (m: TMediaMap<T>) => {
            return m[constraintKey];
        };
        condition.key = constraintKey;

        return [...chain, condition];
    }

    private createExtremityChain<T extends IDynamicMediaConfig> (
        chain: IMediaChain<T>,
        compare: (a: IBreakpointConstraint, b: IBreakpointConstraint) => boolean): IMediaChain<T> {
        const condition: IMediaChainCondition<T> = (m: TMediaMap<T>) => {
            const last = chain[chain.length - 1];
            const childCondition = this._config[last.key];

            return Object.keys(this._config)
                .filter(key => compare(this._config[key], childCondition))
                .some(key => m[key]);
        };

        return [...chain, condition];
    }
}
