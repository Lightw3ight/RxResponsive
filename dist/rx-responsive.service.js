"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var operator_factory_service_1 = require("./operator-factory.service");
var RxResponsiveService = /** @class */ (function () {
    function RxResponsiveService(_config, _operatorFactory, _zone) {
        this._config = _config;
        this._operatorFactory = _operatorFactory;
        this._zone = _zone;
        this._snapshot = {};
        this._mediaSize$ = new BehaviorSubject_1.BehaviorSubject(this._snapshot);
        this.addEvents();
    }
    Object.defineProperty(RxResponsiveService.prototype, "mediaSize$", {
        get: function () {
            return this._mediaSize$;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RxResponsiveService.prototype, "snapshot", {
        get: function () {
            return this._snapshot;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RxResponsiveService.prototype, "is", {
        get: function () {
            return this._is || (this._is = this._operatorFactory.createIsOperator(this.mediaSize$));
        },
        enumerable: true,
        configurable: true
    });
    RxResponsiveService.prototype.addEvents = function () {
        var _this = this;
        Object.keys(this._config).forEach(function (key) {
            var breakpointSettings = _this._config[key];
            _this.setupBreakpoint(breakpointSettings, function (isActive) { return _this.snapshot[key] = isActive; });
        });
        var previousMap = JSON.stringify(this._snapshot);
        window.addEventListener('resize', function () {
            if (previousMap !== JSON.stringify(_this._snapshot)) {
                _this._zone.run(function () {
                    _this._mediaSize$.next(_this._snapshot);
                });
                previousMap = JSON.stringify(_this._snapshot);
            }
        });
    };
    RxResponsiveService.prototype.setupBreakpoint = function (constraint, setter) {
        var queryList = this.createMediaQuery(constraint);
        this.createListener(queryList, setter);
    };
    RxResponsiveService.prototype.createMediaQuery = function (constraint) {
        var min = constraint.min, max = constraint.max;
        var breakPointQuery = "(min-width: " + (min || 0) + "px)";
        if (max) {
            breakPointQuery += " and (max-width: " + max + "px)";
        }
        return window.matchMedia(breakPointQuery);
    };
    RxResponsiveService.prototype.createListener = function (mediaQueryList, setter) {
        this._zone.runOutsideAngular(function () {
            mediaQueryList.addListener(function (args) {
                setter(args.matches);
            });
        });
        setter(mediaQueryList.matches);
    };
    RxResponsiveService = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject('RX_RESPONSIVE_SERVICE_CONFIG')),
        __metadata("design:paramtypes", [Object, operator_factory_service_1.OperatorFactoryService,
            core_1.NgZone])
    ], RxResponsiveService);
    return RxResponsiveService;
}());
exports.RxResponsiveService = RxResponsiveService;
//# sourceMappingURL=rx-responsive.service.js.map