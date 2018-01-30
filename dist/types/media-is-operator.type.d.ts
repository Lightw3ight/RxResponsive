import { IMediaObservable } from './media-observable.interface';
import { IDynamicMediaConfig } from './dynamic-media-config.interface';
export declare type TMediaIsOperator<T extends IDynamicMediaConfig> = {
    [key in keyof T]: IMediaObservable<T>;
};
