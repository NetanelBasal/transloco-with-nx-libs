/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ChangeDetectorRef, Directive, ElementRef, Inject, Input, Optional, TemplateRef, ViewContainerRef } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { TemplateHandler } from './template-handler';
import { TRANSLOCO_LANG } from './transloco-lang';
import { TRANSLOCO_LOADING_TEMPLATE } from './transloco-loading-template';
import { TRANSLOCO_SCOPE } from './transloco-scope';
import { TranslocoService } from './transloco.service';
import { listenOrNotOperator, prependScope, shouldListenToLangChanges } from './shared';
import { LangResolver } from './lang-resolver';
import { ScopeResolver } from './scope-resolver';
import { hasInlineLoader } from './helpers';
var TranslocoDirective = /** @class */ (function () {
    function TranslocoDirective(translocoService, tpl, providerScope, providerLang, providedLoadingTpl, vcr, cdr, host) {
        this.translocoService = translocoService;
        this.tpl = tpl;
        this.providerScope = providerScope;
        this.providerLang = providerLang;
        this.providedLoadingTpl = providedLoadingTpl;
        this.vcr = vcr;
        this.cdr = cdr;
        this.host = host;
        this.translationMemo = {};
        this.params = {};
        this.loaderTplHandler = null;
        // Whether we already rendered the view once
        this.initialized = false;
        this.langResolver = new LangResolver();
        this.scopeResolver = new ScopeResolver(this.translocoService);
    }
    /**
     * @return {?}
     */
    TranslocoDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var loadingTpl = this.getLoadingTpl();
        if (loadingTpl) {
            this.loaderTplHandler = new TemplateHandler(loadingTpl, this.vcr);
            this.loaderTplHandler.attachView();
        }
        /** @type {?} */
        var listenToLangChange = shouldListenToLangChanges(this.translocoService, this.providerLang || this.inlineLang);
        this.subscription = this.translocoService.langChanges$
            .pipe(switchMap((/**
         * @param {?} activeLang
         * @return {?}
         */
        function (activeLang) {
            /** @type {?} */
            var lang = _this.langResolver.resolve({
                inline: _this.inlineLang,
                provider: _this.providerLang,
                active: activeLang
            });
            /** @type {?} */
            var scope = _this.scopeResolver.resolve({
                inline: _this.inlineScope,
                provider: _this.providerScope
            });
            _this.path = _this.langResolver.resolveLangPath(lang, scope);
            /** @type {?} */
            var inlineLoader = hasInlineLoader(_this.providerScope) ? prependScope(_this.providerScope.loader, scope) : null;
            return _this.translocoService._loadDependencies(_this.path, inlineLoader);
        })), listenOrNotOperator(listenToLangChange))
            .subscribe((/**
         * @return {?}
         */
        function () {
            _this.currentLang = _this.langResolver.resolveLangBasedOnScope(_this.path);
            _this.tpl === null ? _this.simpleStrategy() : _this.structuralStrategy(_this.currentLang, _this.inlineRead);
            _this.cdr.markForCheck();
            _this.initialized = true;
        }));
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    TranslocoDirective.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        // We need to support dynamic keys/params, so if this is not the first change CD cycle
        // we need to run the function again in order to update the value
        /** @type {?} */
        var notInit = Object.keys(changes).some((/**
         * @param {?} v
         * @return {?}
         */
        function (v) { return changes[v].firstChange === false; }));
        notInit && this.simpleStrategy();
    };
    /**
     * @private
     * @return {?}
     */
    TranslocoDirective.prototype.simpleStrategy = /**
     * @private
     * @return {?}
     */
    function () {
        this.detachLoader();
        this.host.nativeElement.innerText = this.translocoService.translate(this.key, this.params, this.currentLang);
    };
    /**
     * @private
     * @param {?} lang
     * @param {?} read
     * @return {?}
     */
    TranslocoDirective.prototype.structuralStrategy = /**
     * @private
     * @param {?} lang
     * @param {?} read
     * @return {?}
     */
    function (lang, read) {
        this.translationMemo = {};
        if (this.view) {
            // when the lang changes we need to change the reference so Angular will update the view
            this.view.context['$implicit'] = this.getTranslateFn(lang, read);
        }
        else {
            this.detachLoader();
            this.view = this.vcr.createEmbeddedView(this.tpl, {
                $implicit: this.getTranslateFn(lang, read)
            });
        }
    };
    /**
     * @private
     * @param {?} lang
     * @param {?} read
     * @return {?}
     */
    TranslocoDirective.prototype.getTranslateFn = /**
     * @private
     * @param {?} lang
     * @param {?} read
     * @return {?}
     */
    function (lang, read) {
        var _this = this;
        return (/**
         * @param {?} key
         * @param {?} params
         * @return {?}
         */
        function (key, params) {
            /** @type {?} */
            var withRead = read ? read + "." + key : key;
            /** @type {?} */
            var withParams = params ? "" + withRead + JSON.stringify(params) : withRead;
            if (_this.translationMemo.hasOwnProperty(withParams)) {
                return _this.translationMemo[withParams].value;
            }
            _this.translationMemo[withParams] = {
                params: params,
                value: _this.translocoService.translate(withRead, params, lang)
            };
            return _this.translationMemo[withParams].value;
        });
    };
    /**
     * @private
     * @return {?}
     */
    TranslocoDirective.prototype.getLoadingTpl = /**
     * @private
     * @return {?}
     */
    function () {
        return this.inlineTpl || this.providedLoadingTpl;
    };
    /**
     * @return {?}
     */
    TranslocoDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.subscription && this.subscription.unsubscribe();
    };
    /**
     * @private
     * @return {?}
     */
    TranslocoDirective.prototype.detachLoader = /**
     * @private
     * @return {?}
     */
    function () {
        this.loaderTplHandler && this.loaderTplHandler.detachView();
    };
    TranslocoDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[transloco]'
                },] }
    ];
    /** @nocollapse */
    TranslocoDirective.ctorParameters = function () { return [
        { type: TranslocoService },
        { type: TemplateRef, decorators: [{ type: Optional }] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [TRANSLOCO_SCOPE,] }] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [TRANSLOCO_LANG,] }] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [TRANSLOCO_LOADING_TEMPLATE,] }] },
        { type: ViewContainerRef },
        { type: ChangeDetectorRef },
        { type: ElementRef }
    ]; };
    TranslocoDirective.propDecorators = {
        key: [{ type: Input, args: ['transloco',] }],
        params: [{ type: Input, args: ['translocoParams',] }],
        inlineScope: [{ type: Input, args: ['translocoScope',] }],
        inlineRead: [{ type: Input, args: ['translocoRead',] }],
        inlineLang: [{ type: Input, args: ['translocoLang',] }],
        inlineTpl: [{ type: Input, args: ['translocoLoadingTpl',] }]
    };
    return TranslocoDirective;
}());
export { TranslocoDirective };
if (false) {
    /** @type {?} */
    TranslocoDirective.prototype.subscription;
    /** @type {?} */
    TranslocoDirective.prototype.view;
    /**
     * @type {?}
     * @private
     */
    TranslocoDirective.prototype.translationMemo;
    /** @type {?} */
    TranslocoDirective.prototype.key;
    /** @type {?} */
    TranslocoDirective.prototype.params;
    /** @type {?} */
    TranslocoDirective.prototype.inlineScope;
    /** @type {?} */
    TranslocoDirective.prototype.inlineRead;
    /** @type {?} */
    TranslocoDirective.prototype.inlineLang;
    /** @type {?} */
    TranslocoDirective.prototype.inlineTpl;
    /**
     * @type {?}
     * @private
     */
    TranslocoDirective.prototype.currentLang;
    /**
     * @type {?}
     * @private
     */
    TranslocoDirective.prototype.loaderTplHandler;
    /**
     * @type {?}
     * @private
     */
    TranslocoDirective.prototype.initialized;
    /**
     * @type {?}
     * @private
     */
    TranslocoDirective.prototype.path;
    /**
     * @type {?}
     * @private
     */
    TranslocoDirective.prototype.langResolver;
    /**
     * @type {?}
     * @private
     */
    TranslocoDirective.prototype.scopeResolver;
    /**
     * @type {?}
     * @private
     */
    TranslocoDirective.prototype.translocoService;
    /**
     * @type {?}
     * @private
     */
    TranslocoDirective.prototype.tpl;
    /**
     * @type {?}
     * @private
     */
    TranslocoDirective.prototype.providerScope;
    /**
     * @type {?}
     * @private
     */
    TranslocoDirective.prototype.providerLang;
    /**
     * @type {?}
     * @private
     */
    TranslocoDirective.prototype.providedLoadingTpl;
    /**
     * @type {?}
     * @private
     */
    TranslocoDirective.prototype.vcr;
    /**
     * @type {?}
     * @private
     */
    TranslocoDirective.prototype.cdr;
    /**
     * @type {?}
     * @private
     */
    TranslocoDirective.prototype.host;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsb2NvLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ25lYXQvdHJhbnNsb2NvLyIsInNvdXJjZXMiOlsibGliL3RyYW5zbG9jby5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFtQixNQUFNLEVBQUUsS0FBSyxFQUFnQyxRQUFRLEVBQUUsV0FBVyxFQUFRLGdCQUFnQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXRMLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUUsZUFBZSxFQUFRLE1BQU0sb0JBQW9CLENBQUM7QUFDM0QsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2xELE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUV2RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsWUFBWSxFQUFFLHlCQUF5QixFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ3hGLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUU1QztJQXVCRSw0QkFDVSxnQkFBa0MsRUFDdEIsR0FBdUUsRUFDOUMsYUFBNkIsRUFDOUIsWUFBMkIsRUFDZixrQkFBc0MsRUFDdEYsR0FBcUIsRUFDckIsR0FBc0IsRUFDdEIsSUFBZ0I7UUFQaEIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUN0QixRQUFHLEdBQUgsR0FBRyxDQUFvRTtRQUM5QyxrQkFB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UUFBUSxZQUFJLE1BQU0sU0FBQyxlQUFlO2dEQUNsQyxRQUFRLFlBQUksTUFBTSxTQUFDLGNBQWM7Z0RBQ2pDLFFBQVEsWUFBSSxNQUFNLFNBQUMsMEJBQTBCO2dCQTFDNEYsZ0JBQWdCO2dCQUFySixpQkFBaUI7Z0JBQWEsVUFBVTs7O3NCQXNCOUMsS0FBSyxTQUFDLFdBQVc7eUJBQ2pCLEtBQUssU0FBQyxpQkFBaUI7OEJBQ3ZCLEtBQUssU0FBQyxnQkFBZ0I7NkJBQ3RCLEtBQUssU0FBQyxlQUFlOzZCQUNyQixLQUFLLFNBQUMsZUFBZTs0QkFDckIsS0FBSyxTQUFDLHFCQUFxQjs7SUFnSDlCLHlCQUFDO0NBQUEsQUE3SEQsSUE2SEM7U0ExSFksa0JBQWtCOzs7SUFDN0IsMENBQWtDOztJQUNsQyxrQ0FBMkI7Ozs7O0lBQzNCLDZDQUFpRjs7SUFFakYsaUNBQWdDOztJQUNoQyxvQ0FBK0M7O0lBQy9DLHlDQUF5RDs7SUFDekQsd0NBQXVEOztJQUN2RCx3Q0FBdUQ7O0lBQ3ZELHVDQUFzRTs7Ozs7SUFFdEUseUNBQTRCOzs7OztJQUM1Qiw4Q0FBaUQ7Ozs7O0lBRWpELHlDQUE0Qjs7Ozs7SUFDNUIsa0NBQXFCOzs7OztJQUNyQiwwQ0FBMEM7Ozs7O0lBQzFDLDJDQUFpRTs7Ozs7SUFHL0QsOENBQTBDOzs7OztJQUMxQyxpQ0FBMkY7Ozs7O0lBQzNGLDJDQUEwRTs7Ozs7SUFDMUUsMENBQXVFOzs7OztJQUN2RSxnREFBOEY7Ozs7O0lBQzlGLGlDQUE2Qjs7Ozs7SUFDN0IsaUNBQThCOzs7OztJQUM5QixrQ0FBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3RvclJlZiwgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBFbWJlZGRlZFZpZXdSZWYsIEluamVjdCwgSW5wdXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBPbkluaXQsIE9wdGlvbmFsLCBUZW1wbGF0ZVJlZiwgVHlwZSwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBUZW1wbGF0ZUhhbmRsZXIsIFZpZXcgfSBmcm9tICcuL3RlbXBsYXRlLWhhbmRsZXInO1xuaW1wb3J0IHsgVFJBTlNMT0NPX0xBTkcgfSBmcm9tICcuL3RyYW5zbG9jby1sYW5nJztcbmltcG9ydCB7IFRSQU5TTE9DT19MT0FESU5HX1RFTVBMQVRFIH0gZnJvbSAnLi90cmFuc2xvY28tbG9hZGluZy10ZW1wbGF0ZSc7XG5pbXBvcnQgeyBUUkFOU0xPQ09fU0NPUEUgfSBmcm9tICcuL3RyYW5zbG9jby1zY29wZSc7XG5pbXBvcnQgeyBUcmFuc2xvY29TZXJ2aWNlIH0gZnJvbSAnLi90cmFuc2xvY28uc2VydmljZSc7XG5pbXBvcnQgeyBIYXNoTWFwLCBJbmxpbmVMb2FkZXIsIFRyYW5zbG9jb1Njb3BlIH0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgeyBsaXN0ZW5Pck5vdE9wZXJhdG9yLCBwcmVwZW5kU2NvcGUsIHNob3VsZExpc3RlblRvTGFuZ0NoYW5nZXMgfSBmcm9tICcuL3NoYXJlZCc7XG5pbXBvcnQgeyBMYW5nUmVzb2x2ZXIgfSBmcm9tICcuL2xhbmctcmVzb2x2ZXInO1xuaW1wb3J0IHsgU2NvcGVSZXNvbHZlciB9IGZyb20gJy4vc2NvcGUtcmVzb2x2ZXInO1xuaW1wb3J0IHsgaGFzSW5saW5lTG9hZGVyIH0gZnJvbSAnLi9oZWxwZXJzJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW3RyYW5zbG9jb10nXG59KVxuZXhwb3J0IGNsYXNzIFRyYW5zbG9jb0RpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBPbkNoYW5nZXMge1xuICBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiB8IG51bGw7XG4gIHZpZXc6IEVtYmVkZGVkVmlld1JlZjxhbnk+O1xuICBwcml2YXRlIHRyYW5zbGF0aW9uTWVtbzogeyBba2V5OiBzdHJpbmddOiB7IHZhbHVlOiBhbnk7IHBhcmFtczogSGFzaE1hcCB9IH0gPSB7fTtcblxuICBASW5wdXQoJ3RyYW5zbG9jbycpIGtleTogc3RyaW5nO1xuICBASW5wdXQoJ3RyYW5zbG9jb1BhcmFtcycpIHBhcmFtczogSGFzaE1hcCA9IHt9O1xuICBASW5wdXQoJ3RyYW5zbG9jb1Njb3BlJykgaW5saW5lU2NvcGU6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgQElucHV0KCd0cmFuc2xvY29SZWFkJykgaW5saW5lUmVhZDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICBASW5wdXQoJ3RyYW5zbG9jb0xhbmcnKSBpbmxpbmVMYW5nOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gIEBJbnB1dCgndHJhbnNsb2NvTG9hZGluZ1RwbCcpIGlubGluZVRwbDogVGVtcGxhdGVSZWY8YW55PiB8IHVuZGVmaW5lZDtcblxuICBwcml2YXRlIGN1cnJlbnRMYW5nOiBzdHJpbmc7XG4gIHByaXZhdGUgbG9hZGVyVHBsSGFuZGxlcjogVGVtcGxhdGVIYW5kbGVyID0gbnVsbDtcbiAgLy8gV2hldGhlciB3ZSBhbHJlYWR5IHJlbmRlcmVkIHRoZSB2aWV3IG9uY2VcbiAgcHJpdmF0ZSBpbml0aWFsaXplZCA9IGZhbHNlO1xuICBwcml2YXRlIHBhdGg6IHN0cmluZztcbiAgcHJpdmF0ZSBsYW5nUmVzb2x2ZXIgPSBuZXcgTGFuZ1Jlc29sdmVyKCk7XG4gIHByaXZhdGUgc2NvcGVSZXNvbHZlciA9IG5ldyBTY29wZVJlc29sdmVyKHRoaXMudHJhbnNsb2NvU2VydmljZSk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSB0cmFuc2xvY29TZXJ2aWNlOiBUcmFuc2xvY29TZXJ2aWNlLFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgdHBsOiBUZW1wbGF0ZVJlZjx7ICRpbXBsaWNpdDogKGtleTogc3RyaW5nLCBwYXJhbXM/OiBIYXNoTWFwKSA9PiBhbnkgfT4sXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChUUkFOU0xPQ09fU0NPUEUpIHByaXZhdGUgcHJvdmlkZXJTY29wZTogVHJhbnNsb2NvU2NvcGUsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChUUkFOU0xPQ09fTEFORykgcHJpdmF0ZSBwcm92aWRlckxhbmc6IHN0cmluZyB8IG51bGwsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChUUkFOU0xPQ09fTE9BRElOR19URU1QTEFURSkgcHJpdmF0ZSBwcm92aWRlZExvYWRpbmdUcGw6IFR5cGU8YW55PiB8IHN0cmluZyxcbiAgICBwcml2YXRlIHZjcjogVmlld0NvbnRhaW5lclJlZixcbiAgICBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJpdmF0ZSBob3N0OiBFbGVtZW50UmVmXG4gICkge1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgY29uc3QgbG9hZGluZ1RwbCA9IHRoaXMuZ2V0TG9hZGluZ1RwbCgpO1xuICAgIGlmKGxvYWRpbmdUcGwpIHtcbiAgICAgIHRoaXMubG9hZGVyVHBsSGFuZGxlciA9IG5ldyBUZW1wbGF0ZUhhbmRsZXIobG9hZGluZ1RwbCwgdGhpcy52Y3IpO1xuICAgICAgdGhpcy5sb2FkZXJUcGxIYW5kbGVyLmF0dGFjaFZpZXcoKTtcbiAgICB9XG5cbiAgICBjb25zdCBsaXN0ZW5Ub0xhbmdDaGFuZ2UgPSBzaG91bGRMaXN0ZW5Ub0xhbmdDaGFuZ2VzKHRoaXMudHJhbnNsb2NvU2VydmljZSwgdGhpcy5wcm92aWRlckxhbmcgfHwgdGhpcy5pbmxpbmVMYW5nKTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gdGhpcy50cmFuc2xvY29TZXJ2aWNlLmxhbmdDaGFuZ2VzJFxuICAgICAgLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcChhY3RpdmVMYW5nID0+IHtcbiAgICAgICAgICBjb25zdCBsYW5nID0gdGhpcy5sYW5nUmVzb2x2ZXIucmVzb2x2ZSh7XG4gICAgICAgICAgICBpbmxpbmU6IHRoaXMuaW5saW5lTGFuZyxcbiAgICAgICAgICAgIHByb3ZpZGVyOiB0aGlzLnByb3ZpZGVyTGFuZyxcbiAgICAgICAgICAgIGFjdGl2ZTogYWN0aXZlTGFuZ1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGNvbnN0IHNjb3BlID0gdGhpcy5zY29wZVJlc29sdmVyLnJlc29sdmUoe1xuICAgICAgICAgICAgaW5saW5lOiB0aGlzLmlubGluZVNjb3BlLFxuICAgICAgICAgICAgcHJvdmlkZXI6IHRoaXMucHJvdmlkZXJTY29wZVxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgdGhpcy5wYXRoID0gdGhpcy5sYW5nUmVzb2x2ZXIucmVzb2x2ZUxhbmdQYXRoKGxhbmcsIHNjb3BlKTtcbiAgICAgICAgICBjb25zdCBpbmxpbmVMb2FkZXI6IElubGluZUxvYWRlciB8IG51bGwgPSBoYXNJbmxpbmVMb2FkZXIodGhpcy5wcm92aWRlclNjb3BlKSA/IHByZXBlbmRTY29wZSh0aGlzLnByb3ZpZGVyU2NvcGUubG9hZGVyLCBzY29wZSkgOiBudWxsO1xuXG4gICAgICAgICAgcmV0dXJuIHRoaXMudHJhbnNsb2NvU2VydmljZS5fbG9hZERlcGVuZGVuY2llcyh0aGlzLnBhdGgsIGlubGluZUxvYWRlcik7XG4gICAgICAgIH0pLFxuICAgICAgICBsaXN0ZW5Pck5vdE9wZXJhdG9yKGxpc3RlblRvTGFuZ0NoYW5nZSlcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLmN1cnJlbnRMYW5nID0gdGhpcy5sYW5nUmVzb2x2ZXIucmVzb2x2ZUxhbmdCYXNlZE9uU2NvcGUodGhpcy5wYXRoKTtcbiAgICAgICAgdGhpcy50cGwgPT09IG51bGwgPyB0aGlzLnNpbXBsZVN0cmF0ZWd5KCkgOiB0aGlzLnN0cnVjdHVyYWxTdHJhdGVneSh0aGlzLmN1cnJlbnRMYW5nLCB0aGlzLmlubGluZVJlYWQpO1xuICAgICAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplZCA9IHRydWU7XG4gICAgICB9KTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXMpIHtcbiAgICAvLyBXZSBuZWVkIHRvIHN1cHBvcnQgZHluYW1pYyBrZXlzL3BhcmFtcywgc28gaWYgdGhpcyBpcyBub3QgdGhlIGZpcnN0IGNoYW5nZSBDRCBjeWNsZVxuICAgIC8vIHdlIG5lZWQgdG8gcnVuIHRoZSBmdW5jdGlvbiBhZ2FpbiBpbiBvcmRlciB0byB1cGRhdGUgdGhlIHZhbHVlXG4gICAgY29uc3Qgbm90SW5pdCA9IE9iamVjdC5rZXlzKGNoYW5nZXMpLnNvbWUodiA9PiBjaGFuZ2VzW3ZdLmZpcnN0Q2hhbmdlID09PSBmYWxzZSk7XG4gICAgbm90SW5pdCAmJiB0aGlzLnNpbXBsZVN0cmF0ZWd5KCk7XG4gIH1cblxuICBwcml2YXRlIHNpbXBsZVN0cmF0ZWd5KCkge1xuICAgIHRoaXMuZGV0YWNoTG9hZGVyKCk7XG4gICAgdGhpcy5ob3N0Lm5hdGl2ZUVsZW1lbnQuaW5uZXJUZXh0ID0gdGhpcy50cmFuc2xvY29TZXJ2aWNlLnRyYW5zbGF0ZSh0aGlzLmtleSwgdGhpcy5wYXJhbXMsIHRoaXMuY3VycmVudExhbmcpO1xuICB9XG5cbiAgcHJpdmF0ZSBzdHJ1Y3R1cmFsU3RyYXRlZ3kobGFuZzogc3RyaW5nLCByZWFkOiBzdHJpbmcgfCB1bmRlZmluZWQpIHtcbiAgICB0aGlzLnRyYW5zbGF0aW9uTWVtbyA9IHt9O1xuXG4gICAgaWYodGhpcy52aWV3KSB7XG4gICAgICAvLyB3aGVuIHRoZSBsYW5nIGNoYW5nZXMgd2UgbmVlZCB0byBjaGFuZ2UgdGhlIHJlZmVyZW5jZSBzbyBBbmd1bGFyIHdpbGwgdXBkYXRlIHRoZSB2aWV3XG4gICAgICB0aGlzLnZpZXcuY29udGV4dFsnJGltcGxpY2l0J10gPSB0aGlzLmdldFRyYW5zbGF0ZUZuKGxhbmcsIHJlYWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRldGFjaExvYWRlcigpO1xuICAgICAgdGhpcy52aWV3ID0gdGhpcy52Y3IuY3JlYXRlRW1iZWRkZWRWaWV3KHRoaXMudHBsLCB7XG4gICAgICAgICRpbXBsaWNpdDogdGhpcy5nZXRUcmFuc2xhdGVGbihsYW5nLCByZWFkKVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXRUcmFuc2xhdGVGbihsYW5nOiBzdHJpbmcsIHJlYWQ6IHN0cmluZyB8IHVuZGVmaW5lZCk6IChrZXk6IHN0cmluZywgcGFyYW1zPzogSGFzaE1hcCkgPT4gYW55IHtcbiAgICByZXR1cm4gKGtleTogc3RyaW5nLCBwYXJhbXM6IEhhc2hNYXApID0+IHtcbiAgICAgIGNvbnN0IHdpdGhSZWFkID0gcmVhZCA/IGAke3JlYWR9LiR7a2V5fWAgOiBrZXk7XG4gICAgICBjb25zdCB3aXRoUGFyYW1zID0gcGFyYW1zID8gYCR7d2l0aFJlYWR9JHtKU09OLnN0cmluZ2lmeShwYXJhbXMpfWAgOiB3aXRoUmVhZDtcbiAgICAgIGlmKHRoaXMudHJhbnNsYXRpb25NZW1vLmhhc093blByb3BlcnR5KHdpdGhQYXJhbXMpKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRyYW5zbGF0aW9uTWVtb1t3aXRoUGFyYW1zXS52YWx1ZTtcbiAgICAgIH1cbiAgICAgIHRoaXMudHJhbnNsYXRpb25NZW1vW3dpdGhQYXJhbXNdID0ge1xuICAgICAgICBwYXJhbXMsXG4gICAgICAgIHZhbHVlOiB0aGlzLnRyYW5zbG9jb1NlcnZpY2UudHJhbnNsYXRlKHdpdGhSZWFkLCBwYXJhbXMsIGxhbmcpXG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gdGhpcy50cmFuc2xhdGlvbk1lbW9bd2l0aFBhcmFtc10udmFsdWU7XG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0TG9hZGluZ1RwbCgpOiBWaWV3IHtcbiAgICByZXR1cm4gdGhpcy5pbmxpbmVUcGwgfHwgdGhpcy5wcm92aWRlZExvYWRpbmdUcGw7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbiAmJiB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBkZXRhY2hMb2FkZXIoKSB7XG4gICAgdGhpcy5sb2FkZXJUcGxIYW5kbGVyICYmIHRoaXMubG9hZGVyVHBsSGFuZGxlci5kZXRhY2hWaWV3KCk7XG4gIH1cbn1cbiJdfQ==