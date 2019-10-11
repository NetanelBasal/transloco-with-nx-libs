/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { InjectionToken } from '@angular/core';
import { getValue, isString, isObject, setValue, isDefined } from './helpers';
/** @type {?} */
export const TRANSLOCO_TRANSPILER = new InjectionToken('TRANSLOCO_TRANSPILER');
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
export class DefaultTranspiler {
    /**
     * @param {?} value
     * @param {?=} params
     * @param {?=} translation
     * @return {?}
     */
    transpile(value, params = {}, translation) {
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
            p => {
                // get the value of "b.c" inside "a" => "Hello {{ value }}"
                /** @type {?} */
                const v = getValue(value, p);
                // get the params of "b.c" => { value: "Transloco" }
                /** @type {?} */
                const getParams = getValue(params, p);
                // transpile the value => "Hello Transloco"
                /** @type {?} */
                const transpiled = this.transpile(v, getParams, translation);
                // set "b.c" to `transpiled`
                value = setValue(value, p, transpiled);
            }));
        }
        return value;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsb2NvLnRyYW5zcGlsZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmduZWF0L3RyYW5zbG9jby8iLCJzb3VyY2VzIjpbImxpYi90cmFuc2xvY28udHJhbnNwaWxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxNQUFNLFdBQVcsQ0FBQzs7QUFFOUUsTUFBTSxPQUFPLG9CQUFvQixHQUFHLElBQUksY0FBYyxDQUFDLHNCQUFzQixDQUFDOzs7O0FBRTlFLHlDQUVDOzs7Ozs7OztJQURDLG9GQUF1RTs7QUFHekUsTUFBTSxPQUFPLGlCQUFpQjs7Ozs7OztJQUM1QixTQUFTLENBQUMsS0FBVSxFQUFFLFNBQXVCLEVBQUUsRUFBRSxXQUF3QjtRQUN2RSxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNuQixPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsWUFBWTs7Ozs7WUFBRSxVQUFTLENBQUMsRUFBRSxLQUFLO2dCQUNsRCxLQUFLLEdBQUcsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUNyQixJQUFJLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtvQkFDNUIsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ3RCO2dCQUVELE9BQU8sU0FBUyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUNqRSxDQUFDLEVBQUMsQ0FBQztTQUNKO1FBRUQsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksTUFBTSxFQUFFO1lBQzdCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztlQXVCRztZQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTzs7OztZQUFDLENBQUMsQ0FBQyxFQUFFOzs7c0JBRXhCLENBQUMsR0FBRyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQzs7O3NCQUV0QixTQUFTLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7OztzQkFHL0IsVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLFNBQVMsRUFBRSxXQUFXLENBQUM7Z0JBRTVELDRCQUE0QjtnQkFDNUIsS0FBSyxHQUFHLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQ3pDLENBQUMsRUFBQyxDQUFDO1NBQ0o7UUFFRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGlvblRva2VuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIYXNoTWFwLCBUcmFuc2xhdGlvbiB9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHsgZ2V0VmFsdWUsIGlzU3RyaW5nLCBpc09iamVjdCwgc2V0VmFsdWUsIGlzRGVmaW5lZCB9IGZyb20gJy4vaGVscGVycyc7XG5cbmV4cG9ydCBjb25zdCBUUkFOU0xPQ09fVFJBTlNQSUxFUiA9IG5ldyBJbmplY3Rpb25Ub2tlbignVFJBTlNMT0NPX1RSQU5TUElMRVInKTtcblxuZXhwb3J0IGludGVyZmFjZSBUcmFuc2xvY29UcmFuc3BpbGVyIHtcbiAgdHJhbnNwaWxlKHZhbHVlOiBhbnksIHBhcmFtczogSGFzaE1hcDxhbnk+LCB0cmFuc2xhdGlvbjogSGFzaE1hcCk6IGFueTtcbn1cblxuZXhwb3J0IGNsYXNzIERlZmF1bHRUcmFuc3BpbGVyIGltcGxlbWVudHMgVHJhbnNsb2NvVHJhbnNwaWxlciB7XG4gIHRyYW5zcGlsZSh2YWx1ZTogYW55LCBwYXJhbXM6IEhhc2hNYXA8YW55PiA9IHt9LCB0cmFuc2xhdGlvbjogVHJhbnNsYXRpb24pOiBhbnkge1xuICAgIGlmIChpc1N0cmluZyh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiB2YWx1ZS5yZXBsYWNlKC97eyguKj8pfX0vZywgZnVuY3Rpb24oXywgbWF0Y2gpIHtcbiAgICAgICAgbWF0Y2ggPSBtYXRjaC50cmltKCk7XG4gICAgICAgIGlmIChpc0RlZmluZWQocGFyYW1zW21hdGNoXSkpIHtcbiAgICAgICAgICByZXR1cm4gcGFyYW1zW21hdGNoXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBpc0RlZmluZWQodHJhbnNsYXRpb25bbWF0Y2hdKSA/IHRyYW5zbGF0aW9uW21hdGNoXSA6ICcnO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKGlzT2JqZWN0KHZhbHVlKSAmJiBwYXJhbXMpIHtcbiAgICAgIC8qKlxuICAgICAgICpcbiAgICAgICAqIEBleGFtcGxlXG4gICAgICAgKlxuICAgICAgICogY29uc3QgZW4gPSB7XG4gICAgICAgKiAgYToge1xuICAgICAgICogICAgYjoge1xuICAgICAgICogICAgICBjOiBcIkhlbGxvIHt7IHZhbHVlIH19XCJcbiAgICAgICAqICAgIH1cbiAgICAgICAqICB9XG4gICAgICAgKiB9XG4gICAgICAgKlxuICAgICAgICogY29uc3QgcGFyYW1zID0gIHtcbiAgICAgICAqICBcImIuY1wiOiB7IHZhbHVlOiBcIlRyYW5zbG9jbyBcIn1cbiAgICAgICAqIH1cbiAgICAgICAqXG4gICAgICAgKiBzZXJ2aWNlLnNlbGVjdFRyYW5zbGF0ZSgnYScsIHBhcmFtcyk7XG4gICAgICAgKlxuICAgICAgICogLy8gdGhlIGZpcnN0IHBhcmFtIHdpbGwgYmUgdGhlIHJlc3VsdCBvZiBgZW4uYWAuXG4gICAgICAgKiAvLyB0aGUgc2Vjb25kIHBhcmFtIHdpbGwgYmUgYHBhcmFtc2AuXG4gICAgICAgKiBwYXJzZXIudHJhbnNwaWxlKHZhbHVlLCBwYXJhbXMsIHt9KTtcbiAgICAgICAqXG4gICAgICAgKlxuICAgICAgICovXG4gICAgICBPYmplY3Qua2V5cyhwYXJhbXMpLmZvckVhY2gocCA9PiB7XG4gICAgICAgIC8vIGdldCB0aGUgdmFsdWUgb2YgXCJiLmNcIiBpbnNpZGUgXCJhXCIgPT4gXCJIZWxsbyB7eyB2YWx1ZSB9fVwiXG4gICAgICAgIGNvbnN0IHYgPSBnZXRWYWx1ZSh2YWx1ZSwgcCk7XG4gICAgICAgIC8vIGdldCB0aGUgcGFyYW1zIG9mIFwiYi5jXCIgPT4geyB2YWx1ZTogXCJUcmFuc2xvY29cIiB9XG4gICAgICAgIGNvbnN0IGdldFBhcmFtcyA9IGdldFZhbHVlKHBhcmFtcywgcCk7XG5cbiAgICAgICAgLy8gdHJhbnNwaWxlIHRoZSB2YWx1ZSA9PiBcIkhlbGxvIFRyYW5zbG9jb1wiXG4gICAgICAgIGNvbnN0IHRyYW5zcGlsZWQgPSB0aGlzLnRyYW5zcGlsZSh2LCBnZXRQYXJhbXMsIHRyYW5zbGF0aW9uKTtcblxuICAgICAgICAvLyBzZXQgXCJiLmNcIiB0byBgdHJhbnNwaWxlZGBcbiAgICAgICAgdmFsdWUgPSBzZXRWYWx1ZSh2YWx1ZSwgcCwgdHJhbnNwaWxlZCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbn1cbiJdfQ==