/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Inject, InjectionToken } from '@angular/core';
import { TRANSLOCO_CONFIG } from './transloco.config';
/** @type {?} */
export var TRANSLOCO_FALLBACK_STRATEGY = new InjectionToken('TRANSLOCO_FALLBACK_STRATEGY');
/**
 * @record
 */
export function TranslocoFallbackStrategy() { }
if (false) {
    /**
     * @param {?} failedLang
     * @return {?}
     */
    TranslocoFallbackStrategy.prototype.getNextLangs = function (failedLang) { };
}
var DefaultFallbackStrategy = /** @class */ (function () {
    function DefaultFallbackStrategy(userConfig) {
        this.userConfig = userConfig;
    }
    /**
     * @param {?} failedLang
     * @return {?}
     */
    DefaultFallbackStrategy.prototype.getNextLangs = /**
     * @param {?} failedLang
     * @return {?}
     */
    function (failedLang) {
        /** @type {?} */
        var fallbackLang = this.userConfig.fallbackLang;
        if (!fallbackLang) {
            throw new Error('When using the default fallback, a fallback language must be provided in the config!');
        }
        return Array.isArray(fallbackLang) ? fallbackLang : [fallbackLang];
    };
    /** @nocollapse */
    DefaultFallbackStrategy.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [TRANSLOCO_CONFIG,] }] }
    ]; };
    return DefaultFallbackStrategy;
}());
export { DefaultFallbackStrategy };
if (false) {
    /**
     * @type {?}
     * @private
     */
    DefaultFallbackStrategy.prototype.userConfig;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsb2NvLWZhbGxiYWNrLXN0cmF0ZWd5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nbmVhdC90cmFuc2xvY28vIiwic291cmNlcyI6WyJsaWIvdHJhbnNsb2NvLWZhbGxiYWNrLXN0cmF0ZWd5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLGNBQWMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQW1CLE1BQU0sb0JBQW9CLENBQUM7O0FBRXZFLE1BQU0sS0FBTywyQkFBMkIsR0FBRyxJQUFJLGNBQWMsQ0FBNEIsNkJBQTZCLENBQUM7Ozs7QUFFdkgsK0NBRUM7Ozs7OztJQURDLDZFQUEyQzs7QUFHN0M7SUFDRSxpQ0FBOEMsVUFBMkI7UUFBM0IsZUFBVSxHQUFWLFVBQVUsQ0FBaUI7SUFBRyxDQUFDOzs7OztJQUU3RSw4Q0FBWTs7OztJQUFaLFVBQWEsVUFBa0I7O1lBQ3ZCLFlBQVksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVk7UUFDakQsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNqQixNQUFNLElBQUksS0FBSyxDQUFDLHNGQUFzRixDQUFDLENBQUM7U0FDekc7UUFFRCxPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNyRSxDQUFDOzs7Z0RBVFksTUFBTSxTQUFDLGdCQUFnQjs7SUFVdEMsOEJBQUM7Q0FBQSxBQVhELElBV0M7U0FYWSx1QkFBdUI7Ozs7OztJQUN0Qiw2Q0FBNkQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIEluamVjdGlvblRva2VuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUUkFOU0xPQ09fQ09ORklHLCBUcmFuc2xvY29Db25maWcgfSBmcm9tICcuL3RyYW5zbG9jby5jb25maWcnO1xuXG5leHBvcnQgY29uc3QgVFJBTlNMT0NPX0ZBTExCQUNLX1NUUkFURUdZID0gbmV3IEluamVjdGlvblRva2VuPFRyYW5zbG9jb0ZhbGxiYWNrU3RyYXRlZ3k+KCdUUkFOU0xPQ09fRkFMTEJBQ0tfU1RSQVRFR1knKTtcblxuZXhwb3J0IGludGVyZmFjZSBUcmFuc2xvY29GYWxsYmFja1N0cmF0ZWd5IHtcbiAgZ2V0TmV4dExhbmdzKGZhaWxlZExhbmc6IHN0cmluZyk6IHN0cmluZ1tdO1xufVxuXG5leHBvcnQgY2xhc3MgRGVmYXVsdEZhbGxiYWNrU3RyYXRlZ3kgaW1wbGVtZW50cyBUcmFuc2xvY29GYWxsYmFja1N0cmF0ZWd5IHtcbiAgY29uc3RydWN0b3IoQEluamVjdChUUkFOU0xPQ09fQ09ORklHKSBwcml2YXRlIHVzZXJDb25maWc6IFRyYW5zbG9jb0NvbmZpZykge31cblxuICBnZXROZXh0TGFuZ3MoZmFpbGVkTGFuZzogc3RyaW5nKSB7XG4gICAgY29uc3QgZmFsbGJhY2tMYW5nID0gdGhpcy51c2VyQ29uZmlnLmZhbGxiYWNrTGFuZztcbiAgICBpZiAoIWZhbGxiYWNrTGFuZykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdXaGVuIHVzaW5nIHRoZSBkZWZhdWx0IGZhbGxiYWNrLCBhIGZhbGxiYWNrIGxhbmd1YWdlIG11c3QgYmUgcHJvdmlkZWQgaW4gdGhlIGNvbmZpZyEnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gQXJyYXkuaXNBcnJheShmYWxsYmFja0xhbmcpID8gZmFsbGJhY2tMYW5nIDogW2ZhbGxiYWNrTGFuZ107XG4gIH1cbn1cbiJdfQ==