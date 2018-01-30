import { TMediaMap } from './media-map.type';
import { IMediaChainCondition } from './media-chain-condition.interface';

export type IMediaChain<T> = Array<IMediaChainCondition<T>>;
