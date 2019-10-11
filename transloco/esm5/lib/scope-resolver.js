/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { isScopeObject, toCamelCase } from './helpers';
var ScopeResolver = /** @class */ (function () {
    function ScopeResolver(translocoService) {
        this.translocoService = translocoService;
    }
    // inline => provider
    // inline => provider
    /**
     * @param {?=} __0
     * @return {?}
     */
    ScopeResolver.prototype.resolve = 
    // inline => provider
    /**
     * @param {?=} __0
     * @return {?}
     */
    function (_a) {
        var _b = _a === void 0 ? { inline: undefined, provider: undefined } : _a, inline = _b.inline, provider = _b.provider;
        if (inline) {
            return inline;
        }
        if (provider) {
            if (isScopeObject(provider)) {
                var _c = (/** @type {?} */ (provider)), scope = _c.scope, _d = _c.alias, alias = _d === void 0 ? toCamelCase(scope) : _d;
                this.translocoService._setScopeAlias(scope, alias);
                return scope;
            }
            return (/** @type {?} */ (provider));
        }
        return undefined;
    };
    return ScopeResolver;
}());
export { ScopeResolver };
if (false) {
    /**
     * @type {?}
     * @private
     */
    ScopeResolver.prototype.translocoService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NvcGUtcmVzb2x2ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmduZWF0L3RyYW5zbG9jby8iLCJzb3VyY2VzIjpbImxpYi9zY29wZS1yZXNvbHZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBRUEsT0FBTyxFQUFFLGFBQWEsRUFBRSxXQUFXLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFPdkQ7SUFDRSx1QkFBb0IsZ0JBQWtDO1FBQWxDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7SUFBRyxDQUFDO0lBRTFELHFCQUFxQjs7Ozs7O0lBQ3JCLCtCQUFPOzs7Ozs7SUFBUCxVQUFRLEVBQXNGO1lBQXRGLG9FQUFzRixFQUFwRixrQkFBTSxFQUFFLHNCQUFRO1FBQ3hCLElBQUksTUFBTSxFQUFFO1lBQ1YsT0FBTyxNQUFNLENBQUM7U0FDZjtRQUVELElBQUksUUFBUSxFQUFFO1lBQ1osSUFBSSxhQUFhLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQ3JCLElBQUEsa0NBQWlFLEVBQS9ELGdCQUFLLEVBQUUsYUFBMEIsRUFBMUIsK0NBQXdEO2dCQUN2RSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDbkQsT0FBTyxLQUFLLENBQUM7YUFDZDtZQUVELE9BQU8sbUJBQUEsUUFBUSxFQUFVLENBQUM7U0FDM0I7UUFFRCxPQUFPLFNBQVMsQ0FBQztJQUNuQixDQUFDO0lBQ0gsb0JBQUM7QUFBRCxDQUFDLEFBckJELElBcUJDOzs7Ozs7O0lBcEJhLHlDQUEwQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRyYW5zbG9jb1Njb3BlLCBQcm92aWRlclNjb3BlIH0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgeyBUcmFuc2xvY29TZXJ2aWNlIH0gZnJvbSAnLi90cmFuc2xvY28uc2VydmljZSc7XG5pbXBvcnQgeyBpc1Njb3BlT2JqZWN0LCB0b0NhbWVsQ2FzZSB9IGZyb20gJy4vaGVscGVycyc7XG5cbnR5cGUgU2NvcGVSZXNvbHZlclBhcmFtcyA9IHtcbiAgaW5saW5lOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gIHByb3ZpZGVyOiBUcmFuc2xvY29TY29wZTtcbn07XG5cbmV4cG9ydCBjbGFzcyBTY29wZVJlc29sdmVyIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSB0cmFuc2xvY29TZXJ2aWNlOiBUcmFuc2xvY29TZXJ2aWNlKSB7fVxuXG4gIC8vIGlubGluZSA9PiBwcm92aWRlclxuICByZXNvbHZlKHsgaW5saW5lLCBwcm92aWRlciB9OiBTY29wZVJlc29sdmVyUGFyYW1zID0geyBpbmxpbmU6IHVuZGVmaW5lZCwgcHJvdmlkZXI6IHVuZGVmaW5lZCB9KTogc3RyaW5nIHtcbiAgICBpZiAoaW5saW5lKSB7XG4gICAgICByZXR1cm4gaW5saW5lO1xuICAgIH1cblxuICAgIGlmIChwcm92aWRlcikge1xuICAgICAgaWYgKGlzU2NvcGVPYmplY3QocHJvdmlkZXIpKSB7XG4gICAgICAgIGNvbnN0IHsgc2NvcGUsIGFsaWFzID0gdG9DYW1lbENhc2Uoc2NvcGUpIH0gPSBwcm92aWRlciBhcyBQcm92aWRlclNjb3BlO1xuICAgICAgICB0aGlzLnRyYW5zbG9jb1NlcnZpY2UuX3NldFNjb3BlQWxpYXMoc2NvcGUsIGFsaWFzKTtcbiAgICAgICAgcmV0dXJuIHNjb3BlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcHJvdmlkZXIgYXMgc3RyaW5nO1xuICAgIH1cblxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbn1cbiJdfQ==