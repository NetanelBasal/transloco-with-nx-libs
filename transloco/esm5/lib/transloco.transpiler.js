/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { InjectionToken } from '@angular/core';
import { getValue, isString, isObject, setValue, isDefined } from './helpers';
/** @type {?} */
export var TRANSLOCO_TRANSPILER = new InjectionToken('TRANSLOCO_TRANSPILER');
/**
 * @record
 */
export function TranslocoTranspiler() { }
if (false) {
    /**
     * @param {?} value
     * @param {?} params
     * @param {?} translation
     * @return {?}
     */
    TranslocoTranspiler.prototype.transpile = function (value, params, translation) { };
}
var DefaultTranspiler = /** @class */ (function () {
    function DefaultTranspiler() {
    }
    /**
     * @param {?} value
     * @param {?=} params
     * @param {?=} translation
     * @return {?}
     */
    DefaultTranspiler.prototype.transpile = /**
     * @param {?} value
     * @param {?=} params
     * @param {?=} translation
     * @return {?}
     */
    function (value, params, translation) {
        var _this = this;
        if (params === void 0) { params = {}; }
        if (isString(value)) {
            return value.replace(/{{(.*?)}}/g, (/**
             * @param {?} _
             * @param {?} match
             * @return {?}
             */
            function (_, match) {
                match = match.trim();
                if (isDefined(params[match])) {
                    return params[match];
                }
                return isDefined(translation[match]) ? translation[match] : '';
            }));
        }
        if (isObject(value) && params) {
            /**
             *
             * @example
             *
             * const en = {
             *  a: {
             *    b: {
             *      c: "Hello {{ value }}"
             *    }
             *  }
             * }
             *
             * const params =  {
             *  "b.c": { value: "Transloco "}
             * }
             *
             * service.selectTranslate('a', params);
             *
             * // the first param will be the result of `en.a`.
             * // the second param will be `params`.
             * parser.transpile(value, params, {});
             *
             *
             */
            Object.keys(params).forEach((/**
             * @param {?} p
             * @return {?}
             */
            function (p) {
                // get the value of "b.c" inside "a" => "Hello {{ value }}"
                /** @type {?} */
                var v = getValue(value, p);
                // get the params of "b.c" => { value: "Transloco" }
                /** @type {?} */
                var getParams = getValue(params, p);
                // transpile the value => "Hello Transloco"
                /** @type {?} */
                var transpiled = _this.transpile(v, getParams, translation);
                // set "b.c" to `transpiled`
                value = setValue(value, p, transpiled);
            }));
        }
        return value;
    };
    return DefaultTranspiler;
}());
export { DefaultTranspiler };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsb2NvLnRyYW5zcGlsZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmduZWF0L3RyYW5zbG9jby8iLCJzb3VyY2VzIjpbImxpYi90cmFuc2xvY28udHJhbnNwaWxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxNQUFNLFdBQVcsQ0FBQzs7QUFFOUUsTUFBTSxLQUFPLG9CQUFvQixHQUFHLElBQUksY0FBYyxDQUFDLHNCQUFzQixDQUFDOzs7O0FBRTlFLHlDQUVDOzs7Ozs7OztJQURDLG9GQUF1RTs7QUFHekU7SUFBQTtJQXNEQSxDQUFDOzs7Ozs7O0lBckRDLHFDQUFTOzs7Ozs7SUFBVCxVQUFVLEtBQVUsRUFBRSxNQUF5QixFQUFFLFdBQXdCO1FBQXpFLGlCQW9EQztRQXBEcUIsdUJBQUEsRUFBQSxXQUF5QjtRQUM3QyxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNuQixPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsWUFBWTs7Ozs7WUFBRSxVQUFTLENBQUMsRUFBRSxLQUFLO2dCQUNsRCxLQUFLLEdBQUcsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUNyQixJQUFJLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtvQkFDNUIsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ3RCO2dCQUVELE9BQU8sU0FBUyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUNqRSxDQUFDLEVBQUMsQ0FBQztTQUNKO1FBRUQsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksTUFBTSxFQUFFO1lBQzdCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztlQXVCRztZQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTzs7OztZQUFDLFVBQUEsQ0FBQzs7O29CQUVyQixDQUFDLEdBQUcsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7OztvQkFFdEIsU0FBUyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDOzs7b0JBRy9CLFVBQVUsR0FBRyxLQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxTQUFTLEVBQUUsV0FBVyxDQUFDO2dCQUU1RCw0QkFBNEI7Z0JBQzVCLEtBQUssR0FBRyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxVQUFVLENBQUMsQ0FBQztZQUN6QyxDQUFDLEVBQUMsQ0FBQztTQUNKO1FBRUQsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBQ0gsd0JBQUM7QUFBRCxDQUFDLEFBdERELElBc0RDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0aW9uVG9rZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEhhc2hNYXAsIFRyYW5zbGF0aW9uIH0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgeyBnZXRWYWx1ZSwgaXNTdHJpbmcsIGlzT2JqZWN0LCBzZXRWYWx1ZSwgaXNEZWZpbmVkIH0gZnJvbSAnLi9oZWxwZXJzJztcblxuZXhwb3J0IGNvbnN0IFRSQU5TTE9DT19UUkFOU1BJTEVSID0gbmV3IEluamVjdGlvblRva2VuKCdUUkFOU0xPQ09fVFJBTlNQSUxFUicpO1xuXG5leHBvcnQgaW50ZXJmYWNlIFRyYW5zbG9jb1RyYW5zcGlsZXIge1xuICB0cmFuc3BpbGUodmFsdWU6IGFueSwgcGFyYW1zOiBIYXNoTWFwPGFueT4sIHRyYW5zbGF0aW9uOiBIYXNoTWFwKTogYW55O1xufVxuXG5leHBvcnQgY2xhc3MgRGVmYXVsdFRyYW5zcGlsZXIgaW1wbGVtZW50cyBUcmFuc2xvY29UcmFuc3BpbGVyIHtcbiAgdHJhbnNwaWxlKHZhbHVlOiBhbnksIHBhcmFtczogSGFzaE1hcDxhbnk+ID0ge30sIHRyYW5zbGF0aW9uOiBUcmFuc2xhdGlvbik6IGFueSB7XG4gICAgaWYgKGlzU3RyaW5nKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIHZhbHVlLnJlcGxhY2UoL3t7KC4qPyl9fS9nLCBmdW5jdGlvbihfLCBtYXRjaCkge1xuICAgICAgICBtYXRjaCA9IG1hdGNoLnRyaW0oKTtcbiAgICAgICAgaWYgKGlzRGVmaW5lZChwYXJhbXNbbWF0Y2hdKSkge1xuICAgICAgICAgIHJldHVybiBwYXJhbXNbbWF0Y2hdO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGlzRGVmaW5lZCh0cmFuc2xhdGlvblttYXRjaF0pID8gdHJhbnNsYXRpb25bbWF0Y2hdIDogJyc7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoaXNPYmplY3QodmFsdWUpICYmIHBhcmFtcykge1xuICAgICAgLyoqXG4gICAgICAgKlxuICAgICAgICogQGV4YW1wbGVcbiAgICAgICAqXG4gICAgICAgKiBjb25zdCBlbiA9IHtcbiAgICAgICAqICBhOiB7XG4gICAgICAgKiAgICBiOiB7XG4gICAgICAgKiAgICAgIGM6IFwiSGVsbG8ge3sgdmFsdWUgfX1cIlxuICAgICAgICogICAgfVxuICAgICAgICogIH1cbiAgICAgICAqIH1cbiAgICAgICAqXG4gICAgICAgKiBjb25zdCBwYXJhbXMgPSAge1xuICAgICAgICogIFwiYi5jXCI6IHsgdmFsdWU6IFwiVHJhbnNsb2NvIFwifVxuICAgICAgICogfVxuICAgICAgICpcbiAgICAgICAqIHNlcnZpY2Uuc2VsZWN0VHJhbnNsYXRlKCdhJywgcGFyYW1zKTtcbiAgICAgICAqXG4gICAgICAgKiAvLyB0aGUgZmlyc3QgcGFyYW0gd2lsbCBiZSB0aGUgcmVzdWx0IG9mIGBlbi5hYC5cbiAgICAgICAqIC8vIHRoZSBzZWNvbmQgcGFyYW0gd2lsbCBiZSBgcGFyYW1zYC5cbiAgICAgICAqIHBhcnNlci50cmFuc3BpbGUodmFsdWUsIHBhcmFtcywge30pO1xuICAgICAgICpcbiAgICAgICAqXG4gICAgICAgKi9cbiAgICAgIE9iamVjdC5rZXlzKHBhcmFtcykuZm9yRWFjaChwID0+IHtcbiAgICAgICAgLy8gZ2V0IHRoZSB2YWx1ZSBvZiBcImIuY1wiIGluc2lkZSBcImFcIiA9PiBcIkhlbGxvIHt7IHZhbHVlIH19XCJcbiAgICAgICAgY29uc3QgdiA9IGdldFZhbHVlKHZhbHVlLCBwKTtcbiAgICAgICAgLy8gZ2V0IHRoZSBwYXJhbXMgb2YgXCJiLmNcIiA9PiB7IHZhbHVlOiBcIlRyYW5zbG9jb1wiIH1cbiAgICAgICAgY29uc3QgZ2V0UGFyYW1zID0gZ2V0VmFsdWUocGFyYW1zLCBwKTtcblxuICAgICAgICAvLyB0cmFuc3BpbGUgdGhlIHZhbHVlID0+IFwiSGVsbG8gVHJhbnNsb2NvXCJcbiAgICAgICAgY29uc3QgdHJhbnNwaWxlZCA9IHRoaXMudHJhbnNwaWxlKHYsIGdldFBhcmFtcywgdHJhbnNsYXRpb24pO1xuXG4gICAgICAgIC8vIHNldCBcImIuY1wiIHRvIGB0cmFuc3BpbGVkYFxuICAgICAgICB2YWx1ZSA9IHNldFZhbHVlKHZhbHVlLCBwLCB0cmFuc3BpbGVkKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxufVxuIl19