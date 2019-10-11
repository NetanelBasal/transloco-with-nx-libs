/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { isScopeObject, toCamelCase } from './helpers';
export class ScopeResolver {
    /**
     * @param {?} translocoService
     */
    constructor(translocoService) {
        this.translocoService = translocoService;
    }
    // inline => provider
    /**
     * @param {?=} __0
     * @return {?}
     */
    resolve({ inline, provider } = { inline: undefined, provider: undefined }) {
        if (inline) {
            return inline;
        }
        if (provider) {
            if (isScopeObject(provider)) {
                const { scope, alias = toCamelCase(scope) } = (/** @type {?} */ (provider));
                this.translocoService._setScopeAlias(scope, alias);
                return scope;
            }
            return (/** @type {?} */ (provider));
        }
        return undefined;
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    ScopeResolver.prototype.translocoService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NvcGUtcmVzb2x2ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmduZWF0L3RyYW5zbG9jby8iLCJzb3VyY2VzIjpbImxpYi9zY29wZS1yZXNvbHZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBRUEsT0FBTyxFQUFFLGFBQWEsRUFBRSxXQUFXLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFPdkQsTUFBTSxPQUFPLGFBQWE7Ozs7SUFDeEIsWUFBb0IsZ0JBQWtDO1FBQWxDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7SUFBRyxDQUFDOzs7Ozs7SUFHMUQsT0FBTyxDQUFDLEVBQUUsTUFBTSxFQUFFLFFBQVEsS0FBMEIsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUU7UUFDNUYsSUFBSSxNQUFNLEVBQUU7WUFDVixPQUFPLE1BQU0sQ0FBQztTQUNmO1FBRUQsSUFBSSxRQUFRLEVBQUU7WUFDWixJQUFJLGFBQWEsQ0FBQyxRQUFRLENBQUMsRUFBRTtzQkFDckIsRUFBRSxLQUFLLEVBQUUsS0FBSyxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLG1CQUFBLFFBQVEsRUFBaUI7Z0JBQ3ZFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUNuRCxPQUFPLEtBQUssQ0FBQzthQUNkO1lBRUQsT0FBTyxtQkFBQSxRQUFRLEVBQVUsQ0FBQztTQUMzQjtRQUVELE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUM7Q0FDRjs7Ozs7O0lBcEJhLHlDQUEwQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRyYW5zbG9jb1Njb3BlLCBQcm92aWRlclNjb3BlIH0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgeyBUcmFuc2xvY29TZXJ2aWNlIH0gZnJvbSAnLi90cmFuc2xvY28uc2VydmljZSc7XG5pbXBvcnQgeyBpc1Njb3BlT2JqZWN0LCB0b0NhbWVsQ2FzZSB9IGZyb20gJy4vaGVscGVycyc7XG5cbnR5cGUgU2NvcGVSZXNvbHZlclBhcmFtcyA9IHtcbiAgaW5saW5lOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gIHByb3ZpZGVyOiBUcmFuc2xvY29TY29wZTtcbn07XG5cbmV4cG9ydCBjbGFzcyBTY29wZVJlc29sdmVyIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSB0cmFuc2xvY29TZXJ2aWNlOiBUcmFuc2xvY29TZXJ2aWNlKSB7fVxuXG4gIC8vIGlubGluZSA9PiBwcm92aWRlclxuICByZXNvbHZlKHsgaW5saW5lLCBwcm92aWRlciB9OiBTY29wZVJlc29sdmVyUGFyYW1zID0geyBpbmxpbmU6IHVuZGVmaW5lZCwgcHJvdmlkZXI6IHVuZGVmaW5lZCB9KTogc3RyaW5nIHtcbiAgICBpZiAoaW5saW5lKSB7XG4gICAgICByZXR1cm4gaW5saW5lO1xuICAgIH1cblxuICAgIGlmIChwcm92aWRlcikge1xuICAgICAgaWYgKGlzU2NvcGVPYmplY3QocHJvdmlkZXIpKSB7XG4gICAgICAgIGNvbnN0IHsgc2NvcGUsIGFsaWFzID0gdG9DYW1lbENhc2Uoc2NvcGUpIH0gPSBwcm92aWRlciBhcyBQcm92aWRlclNjb3BlO1xuICAgICAgICB0aGlzLnRyYW5zbG9jb1NlcnZpY2UuX3NldFNjb3BlQWxpYXMoc2NvcGUsIGFsaWFzKTtcbiAgICAgICAgcmV0dXJuIHNjb3BlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcHJvdmlkZXIgYXMgc3RyaW5nO1xuICAgIH1cblxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbn1cbiJdfQ==