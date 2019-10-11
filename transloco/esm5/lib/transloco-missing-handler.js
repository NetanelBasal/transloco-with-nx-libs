/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { InjectionToken } from '@angular/core';
/** @type {?} */
export var TRANSLOCO_MISSING_HANDLER = new InjectionToken('TRANSLOCO_MISSING_HANDLER');
/**
 * @record
 */
export function TranslocoMissingHandler() { }
if (false) {
    /**
     * @param {?} key
     * @param {?} config
     * @return {?}
     */
    TranslocoMissingHandler.prototype.handle = function (key, config) { };
}
var DefaultHandler = /** @class */ (function () {
    function DefaultHandler() {
    }
    /**
     * @param {?} key
     * @param {?} config
     * @return {?}
     */
    DefaultHandler.prototype.handle = /**
     * @param {?} key
     * @param {?} config
     * @return {?}
     */
    function (key, config) {
        if (!config.prodMode) {
            /** @type {?} */
            var msg = "Missing translation for '" + key + "'";
            console.warn("%c " + msg, 'font-size: 12px; color: red');
        }
        return key;
    };
    return DefaultHandler;
}());
export { DefaultHandler };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsb2NvLW1pc3NpbmctaGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ25lYXQvdHJhbnNsb2NvLyIsInNvdXJjZXMiOlsibGliL3RyYW5zbG9jby1taXNzaW5nLWhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBRy9DLE1BQU0sS0FBTyx5QkFBeUIsR0FBRyxJQUFJLGNBQWMsQ0FBQywyQkFBMkIsQ0FBQzs7OztBQUV4Riw2Q0FFQzs7Ozs7OztJQURDLHNFQUFrRDs7QUFHcEQ7SUFBQTtJQVNBLENBQUM7Ozs7OztJQVJDLCtCQUFNOzs7OztJQUFOLFVBQU8sR0FBVyxFQUFFLE1BQXVCO1FBQ3pDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFOztnQkFDZCxHQUFHLEdBQUcsOEJBQTRCLEdBQUcsTUFBRztZQUM5QyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQU0sR0FBSyxFQUFFLDZCQUE2QixDQUFDLENBQUM7U0FDMUQ7UUFFRCxPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7SUFDSCxxQkFBQztBQUFELENBQUMsQUFURCxJQVNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0aW9uVG9rZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRyYW5zbG9jb0NvbmZpZyB9IGZyb20gJy4vdHJhbnNsb2NvLmNvbmZpZyc7XG5cbmV4cG9ydCBjb25zdCBUUkFOU0xPQ09fTUlTU0lOR19IQU5ETEVSID0gbmV3IEluamVjdGlvblRva2VuKCdUUkFOU0xPQ09fTUlTU0lOR19IQU5ETEVSJyk7XG5cbmV4cG9ydCBpbnRlcmZhY2UgVHJhbnNsb2NvTWlzc2luZ0hhbmRsZXIge1xuICBoYW5kbGUoa2V5OiBzdHJpbmcsIGNvbmZpZzogVHJhbnNsb2NvQ29uZmlnKTogYW55O1xufVxuXG5leHBvcnQgY2xhc3MgRGVmYXVsdEhhbmRsZXIgaW1wbGVtZW50cyBUcmFuc2xvY29NaXNzaW5nSGFuZGxlciB7XG4gIGhhbmRsZShrZXk6IHN0cmluZywgY29uZmlnOiBUcmFuc2xvY29Db25maWcpIHtcbiAgICBpZiAoIWNvbmZpZy5wcm9kTW9kZSkge1xuICAgICAgY29uc3QgbXNnID0gYE1pc3NpbmcgdHJhbnNsYXRpb24gZm9yICcke2tleX0nYDtcbiAgICAgIGNvbnNvbGUud2FybihgJWMgJHttc2d9YCwgJ2ZvbnQtc2l6ZTogMTJweDsgY29sb3I6IHJlZCcpO1xuICAgIH1cblxuICAgIHJldHVybiBrZXk7XG4gIH1cbn1cbiJdfQ==