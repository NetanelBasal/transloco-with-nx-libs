/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ChangeDetectorRef, Inject, Optional, Pipe } from '@angular/core';
import { TranslocoService } from './transloco.service';
import { switchMap } from 'rxjs/operators';
import { TRANSLOCO_SCOPE } from './transloco-scope';
import { TRANSLOCO_LANG } from './transloco-lang';
import { listenOrNotOperator, prependScope, shouldListenToLangChanges } from './shared';
import { LangResolver } from './lang-resolver';
import { ScopeResolver } from './scope-resolver';
import { hasInlineLoader } from './helpers';
var TranslocoPipe = /** @class */ (function () {
    function TranslocoPipe(translocoService, providerScope, providerLang, cdr) {
        this.translocoService = translocoService;
        this.providerScope = providerScope;
        this.providerLang = providerLang;
        this.cdr = cdr;
        this.subscription = null;
        this.langResolver = new LangResolver();
        this.scopeResolver = new ScopeResolver(this.translocoService);
        this.listenToLangChange = shouldListenToLangChanges(this.translocoService, this.providerLang);
    }
    /**
     * @param {?} key
     * @param {?=} params
     * @param {?=} inlineLang
     * @return {?}
     */
    TranslocoPipe.prototype.transform = /**
     * @param {?} key
     * @param {?=} params
     * @param {?=} inlineLang
     * @return {?}
     */
    function (key, params, inlineLang) {
        var _this = this;
        if (!key) {
            return key;
        }
        /** @type {?} */
        var keyName = params ? "" + key + JSON.stringify(params) : key;
        if (keyName === this.lastKey) {
            return this.lastValue;
        }
        this.lastKey = keyName;
        this.subscription && this.subscription.unsubscribe();
        this.subscription = this.translocoService.langChanges$
            .pipe(switchMap((/**
         * @param {?} activeLang
         * @return {?}
         */
        function (activeLang) {
            /** @type {?} */
            var lang = _this.langResolver.resolve({
                inline: inlineLang,
                provider: _this.providerLang,
                active: activeLang
            });
            /** @type {?} */
            var scope = _this.scopeResolver.resolve({ inline: undefined, provider: _this.providerScope });
            _this.path = _this.langResolver.resolveLangPath(lang, scope);
            /** @type {?} */
            var inlineLoader = hasInlineLoader(_this.providerScope) ? prependScope(_this.providerScope.loader, scope) : null;
            return _this.translocoService._loadDependencies(_this.path, inlineLoader);
        })), listenOrNotOperator(this.listenToLangChange))
            .subscribe((/**
         * @return {?}
         */
        function () { return _this.updateValue(key, params); }));
        return this.lastValue;
    };
    /**
     * @return {?}
     */
    TranslocoPipe.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.subscription.unsubscribe();
    };
    /**
     * @private
     * @param {?} key
     * @param {?=} params
     * @return {?}
     */
    TranslocoPipe.prototype.updateValue = /**
     * @private
     * @param {?} key
     * @param {?=} params
     * @return {?}
     */
    function (key, params) {
        /** @type {?} */
        var lang = this.langResolver.resolveLangBasedOnScope(this.path);
        this.lastValue = this.translocoService.translate(key, params, lang);
        this.cdr.markForCheck();
    };
    TranslocoPipe.decorators = [
        { type: Pipe, args: [{
                    name: 'transloco',
                    pure: false
                },] }
    ];
    /** @nocollapse */
    TranslocoPipe.ctorParameters = function () { return [
        { type: TranslocoService },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [TRANSLOCO_SCOPE,] }] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [TRANSLOCO_LANG,] }] },
        { type: ChangeDetectorRef }
    ]; };
    return TranslocoPipe;
}());
export { TranslocoPipe };
if (false) {
    /**
     * @type {?}
     * @private
     */
    TranslocoPipe.prototype.subscription;
    /**
     * @type {?}
     * @private
     */
    TranslocoPipe.prototype.lastValue;
    /**
     * @type {?}
     * @private
     */
    TranslocoPipe.prototype.lastKey;
    /**
     * @type {?}
     * @private
     */
    TranslocoPipe.prototype.listenToLangChange;
    /**
     * @type {?}
     * @private
     */
    TranslocoPipe.prototype.path;
    /**
     * @type {?}
     * @private
     */
    TranslocoPipe.prototype.langResolver;
    /**
     * @type {?}
     * @private
     */
    TranslocoPipe.prototype.scopeResolver;
    /**
     * @type {?}
     * @private
     */
    TranslocoPipe.prototype.translocoService;
    /**
     * @type {?}
     * @private
     */
    TranslocoPipe.prototype.providerScope;
    /**
     * @type {?}
     * @private
     */
    TranslocoPipe.prototype.providerLang;
    /**
     * @type {?}
     * @private
     */
    TranslocoPipe.prototype.cdr;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsb2NvLnBpcGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmduZWF0L3RyYW5zbG9jby8iLCJzb3VyY2VzIjpbImxpYi90cmFuc2xvY28ucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sRUFBYSxRQUFRLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUNwRyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUV2RCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFM0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsWUFBWSxFQUFFLHlCQUF5QixFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ3hGLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUU1QztJQWFFLHVCQUNVLGdCQUFrQyxFQUNHLGFBQTRDLEVBQzdDLFlBQTJCLEVBQy9ELEdBQXNCO1FBSHRCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDRyxrQkFBYSxHQUFiLGFBQWEsQ0FBK0I7UUFDN0MsaUJBQVksR0FBWixZQUFZLENBQWU7UUFDL0QsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFaeEIsaUJBQVksR0FBd0IsSUFBSSxDQUFDO1FBS3pDLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNsQyxrQkFBYSxHQUFHLElBQUksYUFBYSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBUS9ELElBQUksQ0FBQyxrQkFBa0Is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b0JBQUM7Q0FBQSxBQXBFRCxJQW9FQztTQWhFWSxhQUFhOzs7Ozs7SUFDeEIscUNBQWlEOzs7OztJQUNqRCxrQ0FBc0M7Ozs7O0lBQ3RDLGdDQUFvQzs7Ozs7SUFDcEMsMkNBQW9DOzs7OztJQUNwQyw2QkFBcUI7Ozs7O0lBQ3JCLHFDQUEwQzs7Ozs7SUFDMUMsc0NBQWlFOzs7OztJQUcvRCx5Q0FBMEM7Ozs7O0lBQzFDLHNDQUF5Rjs7Ozs7SUFDekYscUNBQXVFOzs7OztJQUN2RSw0QkFBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3RvclJlZiwgSW5qZWN0LCBPbkRlc3Ryb3ksIE9wdGlvbmFsLCBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUcmFuc2xvY29TZXJ2aWNlIH0gZnJvbSAnLi90cmFuc2xvY28uc2VydmljZSc7XG5pbXBvcnQgeyBIYXNoTWFwLCBJbmxpbmVMb2FkZXIsIFByb3ZpZGVyU2NvcGUgfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgVFJBTlNMT0NPX1NDT1BFIH0gZnJvbSAnLi90cmFuc2xvY28tc2NvcGUnO1xuaW1wb3J0IHsgVFJBTlNMT0NPX0xBTkcgfSBmcm9tICcuL3RyYW5zbG9jby1sYW5nJztcbmltcG9ydCB7IGxpc3Rlbk9yTm90T3BlcmF0b3IsIHByZXBlbmRTY29wZSwgc2hvdWxkTGlzdGVuVG9MYW5nQ2hhbmdlcyB9IGZyb20gJy4vc2hhcmVkJztcbmltcG9ydCB7IExhbmdSZXNvbHZlciB9IGZyb20gJy4vbGFuZy1yZXNvbHZlcic7XG5pbXBvcnQgeyBTY29wZVJlc29sdmVyIH0gZnJvbSAnLi9zY29wZS1yZXNvbHZlcic7XG5pbXBvcnQgeyBoYXNJbmxpbmVMb2FkZXIgfSBmcm9tICcuL2hlbHBlcnMnO1xuXG5AUGlwZSh7XG4gIG5hbWU6ICd0cmFuc2xvY28nLFxuICBwdXJlOiBmYWxzZVxufSlcbmV4cG9ydCBjbGFzcyBUcmFuc2xvY29QaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSwgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIGxhc3RWYWx1ZTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICBwcml2YXRlIGxhc3RLZXk6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgcHJpdmF0ZSBsaXN0ZW5Ub0xhbmdDaGFuZ2U6IGJvb2xlYW47XG4gIHByaXZhdGUgcGF0aDogc3RyaW5nO1xuICBwcml2YXRlIGxhbmdSZXNvbHZlciA9IG5ldyBMYW5nUmVzb2x2ZXIoKTtcbiAgcHJpdmF0ZSBzY29wZVJlc29sdmVyID0gbmV3IFNjb3BlUmVzb2x2ZXIodGhpcy50cmFuc2xvY29TZXJ2aWNlKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHRyYW5zbG9jb1NlcnZpY2U6IFRyYW5zbG9jb1NlcnZpY2UsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChUUkFOU0xPQ09fU0NPUEUpIHByaXZhdGUgcHJvdmlkZXJTY29wZTogc3RyaW5nIHwgUHJvdmlkZXJTY29wZSB8IG51bGwsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChUUkFOU0xPQ09fTEFORykgcHJpdmF0ZSBwcm92aWRlckxhbmc6IHN0cmluZyB8IG51bGwsXG4gICAgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmXG4gICkge1xuICAgIHRoaXMubGlzdGVuVG9MYW5nQ2hhbmdlID0gc2hvdWxkTGlzdGVuVG9MYW5nQ2hhbmdlcyh0aGlzLnRyYW5zbG9jb1NlcnZpY2UsIHRoaXMucHJvdmlkZXJMYW5nKTtcbiAgfVxuXG4gIHRyYW5zZm9ybShrZXk6IHN0cmluZywgcGFyYW1zPzogSGFzaE1hcCB8IHVuZGVmaW5lZCwgaW5saW5lTGFuZz86IHN0cmluZyB8IHVuZGVmaW5lZCk6IHN0cmluZyB7XG4gICAgaWYgKCFrZXkpIHtcbiAgICAgIHJldHVybiBrZXk7XG4gICAgfVxuXG4gICAgY29uc3Qga2V5TmFtZSA9IHBhcmFtcyA/IGAke2tleX0ke0pTT04uc3RyaW5naWZ5KHBhcmFtcyl9YCA6IGtleTtcblxuICAgIGlmIChrZXlOYW1lID09PSB0aGlzLmxhc3RLZXkpIHtcbiAgICAgIHJldHVybiB0aGlzLmxhc3RWYWx1ZTtcbiAgICB9XG5cbiAgICB0aGlzLmxhc3RLZXkgPSBrZXlOYW1lO1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uICYmIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IHRoaXMudHJhbnNsb2NvU2VydmljZS5sYW5nQ2hhbmdlcyRcbiAgICAgIC5waXBlKFxuICAgICAgICBzd2l0Y2hNYXAoYWN0aXZlTGFuZyA9PiB7XG4gICAgICAgICAgY29uc3QgbGFuZyA9IHRoaXMubGFuZ1Jlc29sdmVyLnJlc29sdmUoe1xuICAgICAgICAgICAgaW5saW5lOiBpbmxpbmVMYW5nLFxuICAgICAgICAgICAgcHJvdmlkZXI6IHRoaXMucHJvdmlkZXJMYW5nLFxuICAgICAgICAgICAgYWN0aXZlOiBhY3RpdmVMYW5nXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBsZXQgc2NvcGUgPSB0aGlzLnNjb3BlUmVzb2x2ZXIucmVzb2x2ZSh7IGlubGluZTogdW5kZWZpbmVkLCBwcm92aWRlcjogdGhpcy5wcm92aWRlclNjb3BlIH0pO1xuICAgICAgICAgIHRoaXMucGF0aCA9IHRoaXMubGFuZ1Jlc29sdmVyLnJlc29sdmVMYW5nUGF0aChsYW5nLCBzY29wZSk7XG5cbiAgICAgICAgICBjb25zdCBpbmxpbmVMb2FkZXI6IElubGluZUxvYWRlciB8IG51bGwgPSBoYXNJbmxpbmVMb2FkZXIodGhpcy5wcm92aWRlclNjb3BlKSA/IHByZXBlbmRTY29wZSh0aGlzLnByb3ZpZGVyU2NvcGUubG9hZGVyLCBzY29wZSkgOiBudWxsO1xuXG4gICAgICAgICAgcmV0dXJuIHRoaXMudHJhbnNsb2NvU2VydmljZS5fbG9hZERlcGVuZGVuY2llcyh0aGlzLnBhdGgsIGlubGluZUxvYWRlcik7XG4gICAgICAgIH0pLFxuICAgICAgICBsaXN0ZW5Pck5vdE9wZXJhdG9yKHRoaXMubGlzdGVuVG9MYW5nQ2hhbmdlKVxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLnVwZGF0ZVZhbHVlKGtleSwgcGFyYW1zKSk7XG5cbiAgICByZXR1cm4gdGhpcy5sYXN0VmFsdWU7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVWYWx1ZShrZXk6IHN0cmluZywgcGFyYW1zPzogSGFzaE1hcCB8IHVuZGVmaW5lZCkge1xuICAgIGNvbnN0IGxhbmcgPSB0aGlzLmxhbmdSZXNvbHZlci5yZXNvbHZlTGFuZ0Jhc2VkT25TY29wZSh0aGlzLnBhdGgpO1xuICAgIHRoaXMubGFzdFZhbHVlID0gdGhpcy50cmFuc2xvY29TZXJ2aWNlLnRyYW5zbGF0ZShrZXksIHBhcmFtcywgbGFuZyk7XG4gICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cbn1cbiJdfQ==