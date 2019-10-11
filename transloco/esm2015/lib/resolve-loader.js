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
        const pathLoader = inlineLoader[path];
        if (isFunction(pathLoader) === false) {
            throw `You're using an inline loader but didn't provide a loader for ${path}`;
        }
        return inlineLoader[path]().then((/**
         * @param {?} res
         * @return {?}
         */
        res => res.default));
    }
    return mainLoader.getTranslation(path);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb2x2ZS1sb2FkZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmduZWF0L3RyYW5zbG9jby8iLCJzb3VyY2VzIjpbImxpYi9yZXNvbHZlLWxvYWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBRUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLFdBQVcsQ0FBQzs7Ozs7OztBQUV2QyxNQUFNLFVBQVUsYUFBYSxDQUFDLElBQVksRUFBRSxVQUEyQixFQUFFLFlBQTBCO0lBQ2pHLElBQUcsWUFBWSxFQUFFOztjQUNULFVBQVUsR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDO1FBQ3JDLElBQUcsVUFBVSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEtBQUssRUFBRTtZQUNuQyxNQUFNLGlFQUFpRSxJQUFJLEVBQUUsQ0FBQztTQUMvRTtRQUVELE9BQU8sWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSTs7OztRQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBQyxDQUFDO0tBQ3REO0lBRUQsT0FBTyxVQUFVLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3pDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUcmFuc2xvY29Mb2FkZXIgfSBmcm9tICcuL3RyYW5zbG9jby5sb2FkZXInO1xuaW1wb3J0IHsgSW5saW5lTG9hZGVyIH0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgeyBpc0Z1bmN0aW9uIH0gZnJvbSAnLi9oZWxwZXJzJztcblxuZXhwb3J0IGZ1bmN0aW9uIHJlc29sdmVMb2FkZXIocGF0aDogc3RyaW5nLCBtYWluTG9hZGVyOiBUcmFuc2xvY29Mb2FkZXIsIGlubGluZUxvYWRlcjogSW5saW5lTG9hZGVyKSB7XG4gIGlmKGlubGluZUxvYWRlcikge1xuICAgIGNvbnN0IHBhdGhMb2FkZXIgPSBpbmxpbmVMb2FkZXJbcGF0aF07XG4gICAgaWYoaXNGdW5jdGlvbihwYXRoTG9hZGVyKSA9PT0gZmFsc2UpIHtcbiAgICAgIHRocm93IGBZb3UncmUgdXNpbmcgYW4gaW5saW5lIGxvYWRlciBidXQgZGlkbid0IHByb3ZpZGUgYSBsb2FkZXIgZm9yICR7cGF0aH1gO1xuICAgIH1cblxuICAgIHJldHVybiBpbmxpbmVMb2FkZXJbcGF0aF0oKS50aGVuKHJlcyA9PiByZXMuZGVmYXVsdCk7XG4gIH1cblxuICByZXR1cm4gbWFpbkxvYWRlci5nZXRUcmFuc2xhdGlvbihwYXRoKTtcbn1cbiJdfQ==