/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { InjectionToken } from '@angular/core';
/** @type {?} */
export var TRANSLOCO_CONFIG = new InjectionToken('TRANSLOCO_CONFIG', {
    providedIn: 'root',
    factory: (/**
     * @return {?}
     */
    function () {
        return {};
    })
});
/** @type {?} */
export var defaultConfig = {
    defaultLang: 'en',
    reRenderOnLangChange: false,
    prodMode: false,
    failedRetries: 2,
    availableLangs: [],
    missingHandler: {
        useFallbackTranslation: false,
        allowEmpty: false
    },
    flatten: {
        aot: false
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsb2NvLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ25lYXQvdHJhbnNsb2NvLyIsInNvdXJjZXMiOlsibGliL3RyYW5zbG9jby5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBb0IvQyxNQUFNLEtBQU8sZ0JBQWdCLEdBQUcsSUFBSSxjQUFjLENBQUMsa0JBQWtCLEVBQUU7SUFDckUsVUFBVSxFQUFFLE1BQU07SUFDbEIsT0FBTzs7O0lBQUU7UUFDUCxPQUFPLEVBQUUsQ0FBQztJQUNaLENBQUMsQ0FBQTtDQUNGLENBQUM7O0FBRUYsTUFBTSxLQUFPLGFBQWEsR0FBb0I7SUFDNUMsV0FBVyxFQUFFLElBQUk7SUFDakIsb0JBQW9CLEVBQUUsS0FBSztJQUMzQixRQUFRLEVBQUUsS0FBSztJQUNmLGFBQWEsRUFBRSxDQUFDO0lBQ2hCLGNBQWMsRUFBRSxFQUFFO0lBQ2xCLGNBQWMsRUFBRTtRQUNkLHNCQUFzQixFQUFFLEtBQUs7UUFDN0IsVUFBVSxFQUFFLEtBQUs7S0FDbEI7SUFDRCxPQUFPLEVBQUU7UUFDUCxHQUFHLEVBQUUsS0FBSztLQUNYO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3Rpb25Ub2tlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQXZhaWxhYmxlTGFuZ3MsIEhhc2hNYXAgfSBmcm9tICcuL3R5cGVzJztcblxuZXhwb3J0IHR5cGUgVHJhbnNsb2NvQ29uZmlnID0ge1xuICBkZWZhdWx0TGFuZzogc3RyaW5nO1xuICByZVJlbmRlck9uTGFuZ0NoYW5nZT86IGJvb2xlYW47XG4gIHByb2RNb2RlPzogYm9vbGVhbjtcbiAgZmFsbGJhY2tMYW5nPzogc3RyaW5nIHwgc3RyaW5nW107XG4gIGZhaWxlZFJldHJpZXM/OiBudW1iZXI7XG4gIHNjb3BlTWFwcGluZz86IEhhc2hNYXA8c3RyaW5nPjtcbiAgYXZhaWxhYmxlTGFuZ3M/OiBBdmFpbGFibGVMYW5ncztcbiAgZmxhdHRlbj86IHtcbiAgICBhb3Q/OiBib29sZWFuO1xuICB9O1xuICBtaXNzaW5nSGFuZGxlcj86IHtcbiAgICB1c2VGYWxsYmFja1RyYW5zbGF0aW9uPzogYm9vbGVhbjtcbiAgICBhbGxvd0VtcHR5PzogYm9vbGVhbjtcbiAgfTtcbn07XG5cbmV4cG9ydCBjb25zdCBUUkFOU0xPQ09fQ09ORklHID0gbmV3IEluamVjdGlvblRva2VuKCdUUkFOU0xPQ09fQ09ORklHJywge1xuICBwcm92aWRlZEluOiAncm9vdCcsXG4gIGZhY3Rvcnk6ICgpID0+IHtcbiAgICByZXR1cm4ge307XG4gIH1cbn0pO1xuXG5leHBvcnQgY29uc3QgZGVmYXVsdENvbmZpZzogVHJhbnNsb2NvQ29uZmlnID0ge1xuICBkZWZhdWx0TGFuZzogJ2VuJyxcbiAgcmVSZW5kZXJPbkxhbmdDaGFuZ2U6IGZhbHNlLFxuICBwcm9kTW9kZTogZmFsc2UsXG4gIGZhaWxlZFJldHJpZXM6IDIsXG4gIGF2YWlsYWJsZUxhbmdzOiBbXSxcbiAgbWlzc2luZ0hhbmRsZXI6IHtcbiAgICB1c2VGYWxsYmFja1RyYW5zbGF0aW9uOiBmYWxzZSxcbiAgICBhbGxvd0VtcHR5OiBmYWxzZVxuICB9LFxuICBmbGF0dGVuOiB7XG4gICAgYW90OiBmYWxzZVxuICB9XG59O1xuIl19