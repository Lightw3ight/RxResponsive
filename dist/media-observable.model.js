"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ReplaySubject_1 = require("rxjs/ReplaySubject");
var MediaObservable = /** @class */ (function (_super) {
    __extends(MediaObservable, _super);
    function MediaObservable(_chain, _media$, _operatorFactory) {
        var _this = _super.call(this) || this;
        _this._chain = _chain;
        _this._media$ = _media$;
        _this._operatorFactory = _operatorFactory;
        var sub = _media$.subscribe(function (mm) { return _this.next(_this._chain.some(function (lnk) { return lnk(mm); })); }, function (err) { return _this.error(err); }, function () {
            sub.unsubscribe();
            _this.complete();
        });
        return _this;
    }
    Object.defineProperty(MediaObservable.prototype, "or", {
        get: function () {
            return this._or || (this._or = this._operatorFactory.createOrOperator(this._chain.slice(), this._media$));
        },
        enumerable: true,
        configurable: true
    });
    return MediaObservable;
}(ReplaySubject_1.ReplaySubject));
exports.MediaObservable = MediaObservable;
//# sourceMappingURL=media-observable.model.js.map