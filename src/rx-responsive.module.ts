import { ModuleWithProviders, NgModule } from '@angular/core';
import { RxResponsiveService } from './rx-responsive.service';
import { IRxResponsiveServiceConfig, DEFAULT_RX_RESPONSIVE_CONFIG } from './models/rx-responsive-service-config.interface';


@NgModule({
    providers: [
        RxResponsiveService
    ]
})
export class RxResponsiveModule {
    static withConfig(userConfig: IRxResponsiveServiceConfig = DEFAULT_RX_RESPONSIVE_CONFIG): ModuleWithProviders {
        return {
            ngModule: RxResponsiveModule,
            providers: [
                { provide: 'RX_RESPONSIVE_SERVICE_CONFIG', useValue: userConfig }
            ]
        };
    }
}
