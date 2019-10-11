/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { InjectionToken } from '@angular/core';
/** @type {?} */
export var TRANSLOCO_INTERCEPTOR = new InjectionToken('TRANSLOCO_INTERCEPTOR');
/**
 * @record
 */
export function TranslocoInterceptor() { }
if (false) {
    /**
     * @param {?} translation
     * @param {?} lang
     * @return {?}
     */
    TranslocoInterceptor.prototype.preSaveTranslation = function (translation, lang) { };
    /**
     * @param {?} key
     * @param {?} value
     * @param {?} lang
     * @return {?}
     */
    TranslocoInterceptor.prototype.preSaveTranslationKey = function (key, value, lang) { };
}
var DefaultInterceptor = /** @class */ (function () {
    function DefaultInterceptor() {
    }
    /**
     * @param {?} translation
     * @param {?} lang
     * @return {?}
     */
    DefaultInterceptor.prototype.preSaveTranslation = /**
     * @param {?} translation
     * @param {?} lang
     * @return {?}
     */
    function (translation, lang) {
        return translation;
    };
    /**
     * @param {?} key
     * @param {?} value
     * @param {?} lang
     * @return {?}
     */
    DefaultInterceptor.prototype.preSaveTranslationKey = /**
     * @param {?} key
     * @param {?} value
     * @param {?} lang
     * @return {?}
     */
    function (key, value, lang) {
        return value;
    };
    return DefaultInterceptor;
}());
export { DefaultInterceptor };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsb2NvLmludGVyY2VwdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nbmVhdC90cmFuc2xvY28vIiwic291cmNlcyI6WyJsaWIvdHJhbnNsb2NvLmludGVyY2VwdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUcvQyxNQUFNLEtBQU8scUJBQXFCLEdBQUcsSUFBSSxjQUFjLENBQUMsdUJBQXVCLENBQUM7Ozs7QUFFaEYsMENBSUM7Ozs7Ozs7SUFIQyxxRkFBd0U7Ozs7Ozs7SUFFeEUsdUZBQXdFOztBQUcxRTtJQUFBO0lBUUEsQ0FBQzs7Ozs7O0lBUEMsK0NBQWtCOzs7OztJQUFsQixVQUFtQixXQUF3QixFQUFFLElBQVk7UUFDdkQsT0FBTyxXQUFXLENBQUM7SUFDckIsQ0FBQzs7Ozs7OztJQUVELGtEQUFxQjs7Ozs7O0lBQXJCLFVBQXNCLEdBQVcsRUFBRSxLQUFhLEVBQUUsSUFBWTtRQUM1RCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFDSCx5QkFBQztBQUFELENBQUMsQUFSRCxJQVFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0aW9uVG9rZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRyYW5zbGF0aW9uIH0gZnJvbSAnLi90eXBlcyc7XG5cbmV4cG9ydCBjb25zdCBUUkFOU0xPQ09fSU5URVJDRVBUT1IgPSBuZXcgSW5qZWN0aW9uVG9rZW4oJ1RSQU5TTE9DT19JTlRFUkNFUFRPUicpO1xuXG5leHBvcnQgaW50ZXJmYWNlIFRyYW5zbG9jb0ludGVyY2VwdG9yIHtcbiAgcHJlU2F2ZVRyYW5zbGF0aW9uKHRyYW5zbGF0aW9uOiBUcmFuc2xhdGlvbiwgbGFuZzogc3RyaW5nKTogVHJhbnNsYXRpb247XG5cbiAgcHJlU2F2ZVRyYW5zbGF0aW9uS2V5KGtleTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nLCBsYW5nOiBzdHJpbmcpOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBEZWZhdWx0SW50ZXJjZXB0b3IgaW1wbGVtZW50cyBUcmFuc2xvY29JbnRlcmNlcHRvciB7XG4gIHByZVNhdmVUcmFuc2xhdGlvbih0cmFuc2xhdGlvbjogVHJhbnNsYXRpb24sIGxhbmc6IHN0cmluZyk6IFRyYW5zbGF0aW9uIHtcbiAgICByZXR1cm4gdHJhbnNsYXRpb247XG4gIH1cblxuICBwcmVTYXZlVHJhbnNsYXRpb25LZXkoa2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcsIGxhbmc6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG59XG4iXX0=