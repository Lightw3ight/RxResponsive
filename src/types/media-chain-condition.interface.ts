import { TMediaMap } from './media-map.type';

export interface IMediaChainCondition<T> {
    (m: TMediaMap<T>): boolean;
    key?: keyof T;
}
