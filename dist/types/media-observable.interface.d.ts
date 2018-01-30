import { Observable } from 'rxjs/Observable';
import { IDynamicMediaConfig } from './dynamic-media-config.interface';
import { TMediaOrOperator } from './media-or-operator.type';
export interface IMediaObservable<T extends IDynamicMediaConfig> extends Observable<boolean> {
    readonly or: TMediaOrOperator<T>;
}
