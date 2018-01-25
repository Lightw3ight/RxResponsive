import { IMediaSizeMap } from './media-size-map.interface';

export interface IMediaChain {
    (mediaMap: IMediaSizeMap, condition?: () => boolean): boolean;
    conditionIndex?: number;
}
