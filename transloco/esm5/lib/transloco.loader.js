/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { InjectionToken } from '@angular/core';
import { of } from 'rxjs';
/**
 * @record
 */
export function TranslocoLoader() { }
if (false) {
    /**
     * @param {?} lang
     * @return {?}
     */
    TranslocoLoader.prototype.getTranslation = function (lang) { };
}
var DefaultLoader = /** @class */ (function () {
    function DefaultLoader(translations) {
        this.translations = translations;
    }
    /**
     * @param {?} lang
     * @return {?}
     */
    DefaultLoader.prototype.getTranslation = /**
     * @param {?} lang
     * @return {?}
     */
    function (lang) {
        return of(this.translations.get(lang) || {});
    };
    return DefaultLoader;
}());
export { DefaultLoader };
if (false) {
    /**
     * @type {?}
     * @private
     */
    DefaultLoader.prototype.translations;
}
/** @type {?} */
export var TRANSLOCO_LOADER = new InjectionToken('TRANSLOCO_LOADER');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsb2NvLmxvYWRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ25lYXQvdHJhbnNsb2NvLyIsInNvdXJjZXMiOlsibGliL3RyYW5zbG9jby5sb2FkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0MsT0FBTyxFQUFjLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQzs7OztBQUd0QyxxQ0FFQzs7Ozs7O0lBREMsK0RBQTZFOztBQUcvRTtJQUNFLHVCQUFvQixZQUFzQztRQUF0QyxpQkFBWSxHQUFaLFlBQVksQ0FBMEI7SUFBRyxDQUFDOzs7OztJQUU5RCxzQ0FBYzs7OztJQUFkLFVBQWUsSUFBWTtRQUN6QixPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBQ0gsb0JBQUM7QUFBRCxDQUFDLEFBTkQsSUFNQzs7Ozs7OztJQUxhLHFDQUE4Qzs7O0FBTzVELE1BQU0sS0FBTyxnQkFBZ0IsR0FBRyxJQUFJLGNBQWMsQ0FBYyxrQkFBa0IsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGlvblRva2VuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgVHJhbnNsYXRpb24gfSBmcm9tICcuL3R5cGVzJztcblxuZXhwb3J0IGludGVyZmFjZSBUcmFuc2xvY29Mb2FkZXIge1xuICBnZXRUcmFuc2xhdGlvbihsYW5nOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFRyYW5zbGF0aW9uPiB8IFByb21pc2U8VHJhbnNsYXRpb24+O1xufVxuXG5leHBvcnQgY2xhc3MgRGVmYXVsdExvYWRlciBpbXBsZW1lbnRzIFRyYW5zbG9jb0xvYWRlciB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdHJhbnNsYXRpb25zOiBNYXA8c3RyaW5nLCBUcmFuc2xhdGlvbj4pIHt9XG5cbiAgZ2V0VHJhbnNsYXRpb24obGFuZzogc3RyaW5nKTogT2JzZXJ2YWJsZTxUcmFuc2xhdGlvbj4ge1xuICAgIHJldHVybiBvZih0aGlzLnRyYW5zbGF0aW9ucy5nZXQobGFuZykgfHwge30pO1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBUUkFOU0xPQ09fTE9BREVSID0gbmV3IEluamVjdGlvblRva2VuPFRyYW5zbGF0aW9uPignVFJBTlNMT0NPX0xPQURFUicpO1xuIl19