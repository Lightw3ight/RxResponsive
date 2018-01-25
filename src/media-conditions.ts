import { IMediaSizeMap } from './models/media-size-map.interface';

export type IMediaCondition = (m: IMediaSizeMap) => boolean;

export const mediaConditions = [
    isXs,
    isSm,
    isMd,
    isLg,
    isXl
];

export function isXs (m: IMediaSizeMap) {
    return m.isXs;
}

export function isSm (m: IMediaSizeMap) {
    return m.isSm;
}

export function isMd (m: IMediaSizeMap) {
    return m.isMd;
}

export function isLg (m: IMediaSizeMap) {
    return m.isLg;
}

export function isXl (m: IMediaSizeMap) {
    return m.isXl;
}
