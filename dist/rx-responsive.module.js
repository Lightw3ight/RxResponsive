"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var rx_responsive_service_1 = require("./rx-responsive.service");
var operator_factory_service_1 = require("./operator-factory.service");
var default_configuration_model_1 = require("./default-configuration.model");
var RxResponsiveModule = /** @class */ (function () {
    function RxResponsiveModule() {
    }
    RxResponsiveModule_1 = RxResponsiveModule;
    RxResponsiveModule.forRoot = function (userConfig) {
        return {
            ngModule: RxResponsiveModule_1,
            providers: [
                { provide: 'RX_RESPONSIVE_SERVICE_CONFIG', useValue: userConfig || default_configuration_model_1.DEFAULT_CONFIGURATION },
                operator_factory_service_1.OperatorFactoryService,
                rx_responsive_service_1.RxResponsiveService
            ]
        };
    };
    RxResponsiveModule = RxResponsiveModule_1 = __decorate([
        core_1.NgModule({})
    ], RxResponsiveModule);
    return RxResponsiveModule;
    var RxResponsiveModule_1;
}());
exports.RxResponsiveModule = RxResponsiveModule;
//# sourceMappingURL=rx-responsive.module.js.map