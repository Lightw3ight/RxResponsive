import { Observable } from 'rxjs/Observable';
import { MediaSizeOperator } from '../media-size-operator.model';

export interface IMediaObservable extends Observable<boolean> {
    readonly or: MediaSizeOperator;
}
