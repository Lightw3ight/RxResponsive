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
var media_observable_model_1 = require("./media-observable.model");
var OperatorFactoryService = /** @class */ (function () {
    function OperatorFactoryService(_config) {
        this._config = _config;
    }
    OperatorFactoryService.prototype.createIsOperator = function (media$) {
        var operator = {};
        var cache = {};
        this.defineConfigFields(operator, cache, [], media$);
        return operator;
    };
    OperatorFactoryService.prototype.createOrOperator = function (chain, media$) {
        var _this = this;
        var operator = {};
        var cache = {};
        this.defineConfigFields(operator, cache, chain, media$);
        this.defineMediaProperty('less', operator, cache, media$, function () { return _this.createExtremityChain(chain, function (a, b) { return a.min <= b.min; }); });
        this.defineMediaProperty('greater', operator, cache, media$, function () { return _this.createExtremityChain(chain, function (a, b) { return a.max >= b.max; }); });
        return operator;
    };
    OperatorFactoryService.prototype.defineConfigFields = function (operator, cache, chain, mediaMap$) {
        var _this = this;
        Object.keys(this._config).forEach(function (key) {
            _this.defineMediaProperty(key, operator, cache, mediaMap$, function (k) { return _this.createConditionChain(chain, k); });
        });
    };
    OperatorFactoryService.prototype.defineMediaProperty = function (key, operator, cache, mediaMap$, chainFactory) {
        var _this = this;
        Object.defineProperty(operator, key, {
            get: function () {
                return cache[key] || (cache[key] = new media_observable_model_1.MediaObservable(chainFactory(key), mediaMap$, _this));
            }
        });
    };
    OperatorFactoryService.prototype.createConditionChain = function (chain, constraintKey) {
        var condition = function (m) {
            return m[constraintKey];
        };
        condition.key = constraintKey;
        return chain.concat([condition]);
    };
    OperatorFactoryService.prototype.createExtremityChain = function (chain, compare) {
        var _this = this;
        var condition = function (m) {
            var last = chain[chain.length - 1];
            var childCondition = _this._config[last.key];
            return Object.keys(_this._config)
                .filter(function (key) { return compare(_this._config[key], childCondition); })
                .some(function (key) { return m[key]; });
        };
        return chain.concat([condition]);
    };
    OperatorFactoryService = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject('RX_RESPONSIVE_SERVICE_CONFIG')),
        __metadata("design:paramtypes", [Object])
    ], OperatorFactoryService);
    return OperatorFactoryService;
}());
exports.OperatorFactoryService = OperatorFactoryService;
//# sourceMappingURL=operator-factory.service.js.map