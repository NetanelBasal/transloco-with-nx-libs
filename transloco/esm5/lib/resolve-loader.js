/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { isFunction } from './helpers';
/**
 * @param {?} path
 * @param {?} mainLoader
 * @param {?} inlineLoader
 * @return {?}
 */
export function resolveLoader(path, mainLoader, inlineLoader) {
    if (inlineLoader) {
        /** @type {?} */
        var pathLoader = inlineLoader[path];
        if (isFunction(pathLoader) === false) {
            throw "You're using an inline loader but didn't provide a loader for " + path;
        }
        return inlineLoader[path]().then((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return res.default; }));
    }
    return mainLoader.getTranslation(path);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb2x2ZS1sb2FkZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmduZWF0L3RyYW5zbG9jby8iLCJzb3VyY2VzIjpbImxpYi9yZXNvbHZlLWxvYWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBRUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLFdBQVcsQ0FBQzs7Ozs7OztBQUV2QyxNQUFNLFVBQVUsYUFBYSxDQUFDLElBQVksRUFBRSxVQUEyQixFQUFFLFlBQTBCO0lBQ2pHLElBQUcsWUFBWSxFQUFFOztZQUNULFVBQVUsR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDO1FBQ3JDLElBQUcsVUFBVSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEtBQUssRUFBRTtZQUNuQyxNQUFNLG1FQUFpRSxJQUFNLENBQUM7U0FDL0U7UUFFRCxPQUFPLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUk7Ozs7UUFBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsQ0FBQyxPQUFPLEVBQVgsQ0FBVyxFQUFDLENBQUM7S0FDdEQ7SUFFRCxPQUFPLFVBQVUsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDekMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRyYW5zbG9jb0xvYWRlciB9IGZyb20gJy4vdHJhbnNsb2NvLmxvYWRlcic7XG5pbXBvcnQgeyBJbmxpbmVMb2FkZXIgfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IGlzRnVuY3Rpb24gfSBmcm9tICcuL2hlbHBlcnMnO1xuXG5leHBvcnQgZnVuY3Rpb24gcmVzb2x2ZUxvYWRlcihwYXRoOiBzdHJpbmcsIG1haW5Mb2FkZXI6IFRyYW5zbG9jb0xvYWRlciwgaW5saW5lTG9hZGVyOiBJbmxpbmVMb2FkZXIpIHtcbiAgaWYoaW5saW5lTG9hZGVyKSB7XG4gICAgY29uc3QgcGF0aExvYWRlciA9IGlubGluZUxvYWRlcltwYXRoXTtcbiAgICBpZihpc0Z1bmN0aW9uKHBhdGhMb2FkZXIpID09PSBmYWxzZSkge1xuICAgICAgdGhyb3cgYFlvdSdyZSB1c2luZyBhbiBpbmxpbmUgbG9hZGVyIGJ1dCBkaWRuJ3QgcHJvdmlkZSBhIGxvYWRlciBmb3IgJHtwYXRofWA7XG4gICAgfVxuXG4gICAgcmV0dXJuIGlubGluZUxvYWRlcltwYXRoXSgpLnRoZW4ocmVzID0+IHJlcy5kZWZhdWx0KTtcbiAgfVxuXG4gIHJldHVybiBtYWluTG9hZGVyLmdldFRyYW5zbGF0aW9uKHBhdGgpO1xufVxuIl19