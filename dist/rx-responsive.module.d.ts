import { ModuleWithProviders } from '@angular/core';
import { IDynamicMediaConfig } from './types';
export declare class RxResponsiveModule {
    static forRoot<T extends IDynamicMediaConfig>(userConfig?: T): ModuleWithProviders;
}
