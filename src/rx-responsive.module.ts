import { ModuleWithProviders, NgModule } from '@angular/core';
import { RxResponsiveService } from './rx-responsive.service';
import { OperatorFactoryService } from './operator-factory.service';
import { IDynamicMediaConfig } from './types';
import { DEFAULT_CONFIGURATION } from './default-configuration.model';


@NgModule({
})
export class RxResponsiveModule {
    static forRoot<T extends IDynamicMediaConfig>(userConfig?: T): ModuleWithProviders {
        return {
            ngModule: RxResponsiveModule,
            providers: [
                { provide: 'RX_RESPONSIVE_SERVICE_CONFIG', useValue: userConfig || DEFAULT_CONFIGURATION },
                OperatorFactoryService,
                RxResponsiveService
            ]
        };
    }
}
