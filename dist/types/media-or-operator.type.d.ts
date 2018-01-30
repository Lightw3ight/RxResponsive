import { MediaExtremities } from './media-extremities.type';
import { IMediaObservable } from './media-observable.interface';
import { IDynamicMediaConfig } from './dynamic-media-config.interface';
export declare type TMediaOrOperator<T extends IDynamicMediaConfig> = {
    [key in keyof T | MediaExtremities]: IMediaObservable<T>;
};
