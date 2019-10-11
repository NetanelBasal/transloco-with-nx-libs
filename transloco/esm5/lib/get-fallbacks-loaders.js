/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { resolveLoader } from './resolve-loader';
/**
 * @param {?} mainPath
 * @param {?} fallbackPath
 * @param {?} mainLoader
 * @param {?} inlineLoader
 * @return {?}
 */
export function getFallbacksLoaders(mainPath, fallbackPath, mainLoader, inlineLoader) {
    return [mainPath, fallbackPath].map((/**
     * @param {?} path
     * @return {?}
     */
    function (path) {
        /** @type {?} */
        var loader = resolveLoader(path, mainLoader, inlineLoader);
        return from(loader).pipe(map((/**
         * @param {?} translation
         * @return {?}
         */
        function (translation) { return ({
            translation: translation,
            lang: path
        }); })));
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LWZhbGxiYWNrcy1sb2FkZXJzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nbmVhdC90cmFuc2xvY28vIiwic291cmNlcyI6WyJsaWIvZ2V0LWZhbGxiYWNrcy1sb2FkZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzVCLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7Ozs7Ozs7O0FBSWpELE1BQU0sVUFBVSxtQkFBbUIsQ0FBQyxRQUFnQixFQUFFLFlBQW9CLEVBQUUsVUFBMkIsRUFBRSxZQUEwQjtJQUNqSSxPQUFPLENBQUMsUUFBUSxFQUFFLFlBQVksQ0FBQyxDQUFDLEdBQUc7Ozs7SUFBQyxVQUFBLElBQUk7O1lBQ2hDLE1BQU0sR0FBRyxhQUFhLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRSxZQUFZLENBQUM7UUFFNUQsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUN0QixHQUFHOzs7O1FBQUMsVUFBQSxXQUFXLElBQUksT0FBQSxDQUFDO1lBQ2xCLFdBQVcsYUFBQTtZQUNYLElBQUksRUFBRSxJQUFJO1NBQ1gsQ0FBQyxFQUhpQixDQUdqQixFQUFDLENBQ0osQ0FBQztJQUNKLENBQUMsRUFBQyxDQUFDO0FBQ0wsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGZyb20gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IHJlc29sdmVMb2FkZXIgfSBmcm9tICcuL3Jlc29sdmUtbG9hZGVyJztcbmltcG9ydCB7IFRyYW5zbG9jb0xvYWRlciB9IGZyb20gJy4vdHJhbnNsb2NvLmxvYWRlcic7XG5pbXBvcnQgeyBJbmxpbmVMb2FkZXIgfSBmcm9tICcuL3R5cGVzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGdldEZhbGxiYWNrc0xvYWRlcnMobWFpblBhdGg6IHN0cmluZywgZmFsbGJhY2tQYXRoOiBzdHJpbmcsIG1haW5Mb2FkZXI6IFRyYW5zbG9jb0xvYWRlciwgaW5saW5lTG9hZGVyOiBJbmxpbmVMb2FkZXIpIHtcbiAgcmV0dXJuIFttYWluUGF0aCwgZmFsbGJhY2tQYXRoXS5tYXAocGF0aCA9PiB7XG4gICAgY29uc3QgbG9hZGVyID0gcmVzb2x2ZUxvYWRlcihwYXRoLCBtYWluTG9hZGVyLCBpbmxpbmVMb2FkZXIpO1xuXG4gICAgcmV0dXJuIGZyb20obG9hZGVyKS5waXBlKFxuICAgICAgbWFwKHRyYW5zbGF0aW9uID0+ICh7XG4gICAgICAgIHRyYW5zbGF0aW9uLFxuICAgICAgICBsYW5nOiBwYXRoXG4gICAgICB9KSlcbiAgICApO1xuICB9KTtcbn1cbiJdfQ==