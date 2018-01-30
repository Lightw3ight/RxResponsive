import { Observable } from 'rxjs/Observable';
import { TMediaIsOperator, IDynamicMediaConfig, TMediaMap, IMediaChain, TMediaOrOperator } from './types';
export declare class OperatorFactoryService {
    private _config;
    constructor(_config: IDynamicMediaConfig);
    createIsOperator<T extends IDynamicMediaConfig>(media$: Observable<TMediaMap<T>>): TMediaIsOperator<T>;
    createOrOperator<T extends IDynamicMediaConfig>(chain: IMediaChain<T>, media$: Observable<TMediaMap<T>>): TMediaOrOperator<T>;
    private defineConfigFields<T>(operator, cache, chain, mediaMap$);
    private defineMediaProperty<T>(key, operator, cache, mediaMap$, chainFactory);
    private createConditionChain<T>(chain, constraintKey);
    private createExtremityChain<T>(chain, compare);
}
