/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { InjectionToken } from '@angular/core';
/** @type {?} */
export const TRANSLOCO_INTERCEPTOR = new InjectionToken('TRANSLOCO_INTERCEPTOR');
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
export class DefaultInterceptor {
    /**
     * @param {?} translation
     * @param {?} lang
     * @return {?}
     */
    preSaveTranslation(translation, lang) {
        return translation;
    }
    /**
     * @param {?} key
     * @param {?} value
     * @param {?} lang
     * @return {?}
     */
    preSaveTranslationKey(key, value, lang) {
        return value;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsb2NvLmludGVyY2VwdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nbmVhdC90cmFuc2xvY28vIiwic291cmNlcyI6WyJsaWIvdHJhbnNsb2NvLmludGVyY2VwdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUcvQyxNQUFNLE9BQU8scUJBQXFCLEdBQUcsSUFBSSxjQUFjLENBQUMsdUJBQXVCLENBQUM7Ozs7QUFFaEYsMENBSUM7Ozs7Ozs7SUFIQyxxRkFBd0U7Ozs7Ozs7SUFFeEUsdUZBQXdFOztBQUcxRSxNQUFNLE9BQU8sa0JBQWtCOzs7Ozs7SUFDN0Isa0JBQWtCLENBQUMsV0FBd0IsRUFBRSxJQUFZO1FBQ3ZELE9BQU8sV0FBVyxDQUFDO0lBQ3JCLENBQUM7Ozs7Ozs7SUFFRCxxQkFBcUIsQ0FBQyxHQUFXLEVBQUUsS0FBYSxFQUFFLElBQVk7UUFDNUQsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3Rpb25Ub2tlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVHJhbnNsYXRpb24gfSBmcm9tICcuL3R5cGVzJztcblxuZXhwb3J0IGNvbnN0IFRSQU5TTE9DT19JTlRFUkNFUFRPUiA9IG5ldyBJbmplY3Rpb25Ub2tlbignVFJBTlNMT0NPX0lOVEVSQ0VQVE9SJyk7XG5cbmV4cG9ydCBpbnRlcmZhY2UgVHJhbnNsb2NvSW50ZXJjZXB0b3Ige1xuICBwcmVTYXZlVHJhbnNsYXRpb24odHJhbnNsYXRpb246IFRyYW5zbGF0aW9uLCBsYW5nOiBzdHJpbmcpOiBUcmFuc2xhdGlvbjtcblxuICBwcmVTYXZlVHJhbnNsYXRpb25LZXkoa2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcsIGxhbmc6IHN0cmluZyk6IHN0cmluZztcbn1cblxuZXhwb3J0IGNsYXNzIERlZmF1bHRJbnRlcmNlcHRvciBpbXBsZW1lbnRzIFRyYW5zbG9jb0ludGVyY2VwdG9yIHtcbiAgcHJlU2F2ZVRyYW5zbGF0aW9uKHRyYW5zbGF0aW9uOiBUcmFuc2xhdGlvbiwgbGFuZzogc3RyaW5nKTogVHJhbnNsYXRpb24ge1xuICAgIHJldHVybiB0cmFuc2xhdGlvbjtcbiAgfVxuXG4gIHByZVNhdmVUcmFuc2xhdGlvbktleShrZXk6IHN0cmluZywgdmFsdWU6IHN0cmluZywgbGFuZzogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbn1cbiJdfQ==