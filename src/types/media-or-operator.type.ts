import { MediaExtremities } from './media-extremities.type';
import { IMediaObservable } from './media-observable.interface';
import { IDynamicMediaConfig } from './dynamic-media-config.interface';

export type TMediaOrOperator<T extends IDynamicMediaConfig> = { [ key in keyof T | MediaExtremities ]: IMediaObservable<T> };
