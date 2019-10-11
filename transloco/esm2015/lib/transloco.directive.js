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
export class TranslocoDirective {
    /**
     * @param {?} translocoService
     * @param {?} tpl
     * @param {?} providerScope
     * @param {?} providerLang
     * @param {?} providedLoadingTpl
     * @param {?} vcr
     * @param {?} cdr
     * @param {?} host
     */
    constructor(translocoService, tpl, providerScope, providerLang, providedLoadingTpl, vcr, cdr, host) {
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
    ngOnInit() {
        /** @type {?} */
        const loadingTpl = this.getLoadingTpl();
        if (loadingTpl) {
            this.loaderTplHandler = new TemplateHandler(loadingTpl, this.vcr);
            this.loaderTplHandler.attachView();
        }
        /** @type {?} */
        const listenToLangChange = shouldListenToLangChanges(this.translocoService, this.providerLang || this.inlineLang);
        this.subscription = this.translocoService.langChanges$
            .pipe(switchMap((/**
         * @param {?} activeLang
         * @return {?}
         */
        activeLang => {
            /** @type {?} */
            const lang = this.langResolver.resolve({
                inline: this.inlineLang,
                provider: this.providerLang,
                active: activeLang
            });
            /** @type {?} */
            const scope = this.scopeResolver.resolve({
                inline: this.inlineScope,
                provider: this.providerScope
            });
            this.path = this.langResolver.resolveLangPath(lang, scope);
            /** @type {?} */
            const inlineLoader = hasInlineLoader(this.providerScope) ? prependScope(this.providerScope.loader, scope) : null;
            return this.translocoService._loadDependencies(this.path, inlineLoader);
        })), listenOrNotOperator(listenToLangChange))
            .subscribe((/**
         * @return {?}
         */
        () => {
            this.currentLang = this.langResolver.resolveLangBasedOnScope(this.path);
            this.tpl === null ? this.simpleStrategy() : this.structuralStrategy(this.currentLang, this.inlineRead);
            this.cdr.markForCheck();
            this.initialized = true;
        }));
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        // We need to support dynamic keys/params, so if this is not the first change CD cycle
        // we need to run the function again in order to update the value
        /** @type {?} */
        const notInit = Object.keys(changes).some((/**
         * @param {?} v
         * @return {?}
         */
        v => changes[v].firstChange === false));
        notInit && this.simpleStrategy();
    }
    /**
     * @private
     * @return {?}
     */
    simpleStrategy() {
        this.detachLoader();
        this.host.nativeElement.innerText = this.translocoService.translate(this.key, this.params, this.currentLang);
    }
    /**
     * @private
     * @param {?} lang
     * @param {?} read
     * @return {?}
     */
    structuralStrategy(lang, read) {
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
    }
    /**
     * @private
     * @param {?} lang
     * @param {?} read
     * @return {?}
     */
    getTranslateFn(lang, read) {
        return (/**
         * @param {?} key
         * @param {?} params
         * @return {?}
         */
        (key, params) => {
            /** @type {?} */
            const withRead = read ? `${read}.${key}` : key;
            /** @type {?} */
            const withParams = params ? `${withRead}${JSON.stringify(params)}` : withRead;
            if (this.translationMemo.hasOwnProperty(withParams)) {
                return this.translationMemo[withParams].value;
            }
            this.translationMemo[withParams] = {
                params,
                value: this.translocoService.translate(withRead, params, lang)
            };
            return this.translationMemo[withParams].value;
        });
    }
    /**
     * @private
     * @return {?}
     */
    getLoadingTpl() {
        return this.inlineTpl || this.providedLoadingTpl;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscription && this.subscription.unsubscribe();
    }
    /**
     * @private
     * @return {?}
     */
    detachLoader() {
        this.loaderTplHandler && this.loaderTplHandler.detachView();
    }
}
TranslocoDirective.decorators = [
    { type: Directive, args: [{
                selector: '[transloco]'
            },] }
];
/** @nocollapse */
TranslocoDirective.ctorParameters = () => [
    { type: TranslocoService },
    { type: TemplateRef, decorators: [{ type: Optional }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [TRANSLOCO_SCOPE,] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [TRANSLOCO_LANG,] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [TRANSLOCO_LOADING_TEMPLATE,] }] },
    { type: ViewContainerRef },
    { type: ChangeDetectorRef },
    { type: ElementRef }
];
TranslocoDirective.propDecorators = {
    key: [{ type: Input, args: ['transloco',] }],
    params: [{ type: Input, args: ['translocoParams',] }],
    inlineScope: [{ type: Input, args: ['translocoScope',] }],
    inlineRead: [{ type: Input, args: ['translocoRead',] }],
    inlineLang: [{ type: Input, args: ['translocoLang',] }],
    inlineTpl: [{ type: Input, args: ['translocoLoadingTpl',] }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsb2NvLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ25lYXQvdHJhbnNsb2NvLyIsInNvdXJjZXMiOlsibGliL3RyYW5zbG9jby5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFtQixNQUFNLEVBQUUsS0FBSyxFQUFnQyxRQUFRLEVBQUUsV0FBVyxFQUFRLGdCQUFnQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXRMLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUUsZUFBZSxFQUFRLE1BQU0sb0JBQW9CLENBQUM7QUFDM0QsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2xELE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUV2RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsWUFBWSxFQUFFLHlCQUF5QixFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ3hGLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUs1QyxNQUFNLE9BQU8sa0JBQWtCOzs7Ozs7Ozs7OztJQW9CN0IsWUFDVSxnQkFBa0MsRUFDdEIsR0FBdUUsRUFDOUMsYUFBNkIsRUFDOUIsWUFBMkIsRUFDZixrQkFBc0MsRUFDdEYsR0FBcUIsRUFDckIsR0FBc0IsRUFDdEIsSUFBZ0I7UUFQaEIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUN0QixRQUFH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QWM7NENBQ2pDLFFBQVEsWUFBSSxNQUFNLFNBQUMsMEJBQTBCO1lBMUM0RixnQkFBZ0I7WUFBckosaUJBQWlCO1lBQWEsVUFBVTs7O2tCQXNCOUMsS0FBSyxTQUFDLFdBQVc7cUJBQ2pCLEtBQUssU0FBQyxpQkFBaUI7MEJBQ3ZCLEtBQUssU0FBQyxnQkFBZ0I7eUJBQ3RCLEtBQUssU0FBQyxlQUFlO3lCQUNyQixLQUFLLFNBQUMsZUFBZTt3QkFDckIsS0FBSyxTQUFDLHFCQUFxQjs7OztJQVQ1QiwwQ0FBa0M7O0lBQ2xDLGtDQUEyQjs7Ozs7SUFDM0IsNkNBQWlGOztJQUVqRixpQ0FBZ0M7O0lBQ2hDLG9DQUErQzs7SUFDL0MseUNBQXlEOztJQUN6RCx3Q0FBdUQ7O0lBQ3ZELHdDQUF1RDs7SUFDdkQsdUNBQXNFOzs7OztJQUV0RSx5Q0FBNEI7Ozs7O0lBQzVCLDhDQUFpRDs7Ozs7SUFFakQseUNBQTRCOzs7OztJQUM1QixrQ0FBcUI7Ozs7O0lBQ3JCLDBDQUEwQzs7Ozs7SUFDMUMsMkNBQWlFOzs7OztJQUcvRCw4Q0FBMEM7Ozs7O0lBQzFDLGlDQUEyRjs7Ozs7SUFDM0YsMkNBQTBFOzs7OztJQUMxRSwwQ0FBdUU7Ozs7O0lBQ3ZFLGdEQUE4Rjs7Ozs7SUFDOUYsaUNBQTZCOzs7OztJQUM3QixpQ0FBOEI7Ozs7O0lBQzlCLGtDQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdG9yUmVmLCBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEVtYmVkZGVkVmlld1JlZiwgSW5qZWN0LCBJbnB1dCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3B0aW9uYWwsIFRlbXBsYXRlUmVmLCBUeXBlLCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFRlbXBsYXRlSGFuZGxlciwgVmlldyB9IGZyb20gJy4vdGVtcGxhdGUtaGFuZGxlcic7XG5pbXBvcnQgeyBUUkFOU0xPQ09fTEFORyB9IGZyb20gJy4vdHJhbnNsb2NvLWxhbmcnO1xuaW1wb3J0IHsgVFJBTlNMT0NPX0xPQURJTkdfVEVNUExBVEUgfSBmcm9tICcuL3RyYW5zbG9jby1sb2FkaW5nLXRlbXBsYXRlJztcbmltcG9ydCB7IFRSQU5TTE9DT19TQ09QRSB9IGZyb20gJy4vdHJhbnNsb2NvLXNjb3BlJztcbmltcG9ydCB7IFRyYW5zbG9jb1NlcnZpY2UgfSBmcm9tICcuL3RyYW5zbG9jby5zZXJ2aWNlJztcbmltcG9ydCB7IEhhc2hNYXAsIElubGluZUxvYWRlciwgVHJhbnNsb2NvU2NvcGUgfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IGxpc3Rlbk9yTm90T3BlcmF0b3IsIHByZXBlbmRTY29wZSwgc2hvdWxkTGlzdGVuVG9MYW5nQ2hhbmdlcyB9IGZyb20gJy4vc2hhcmVkJztcbmltcG9ydCB7IExhbmdSZXNvbHZlciB9IGZyb20gJy4vbGFuZy1yZXNvbHZlcic7XG5pbXBvcnQgeyBTY29wZVJlc29sdmVyIH0gZnJvbSAnLi9zY29wZS1yZXNvbHZlcic7XG5pbXBvcnQgeyBoYXNJbmxpbmVMb2FkZXIgfSBmcm9tICcuL2hlbHBlcnMnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbdHJhbnNsb2NvXSdcbn0pXG5leHBvcnQgY2xhc3MgVHJhbnNsb2NvRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcyB7XG4gIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uIHwgbnVsbDtcbiAgdmlldzogRW1iZWRkZWRWaWV3UmVmPGFueT47XG4gIHByaXZhdGUgdHJhbnNsYXRpb25NZW1vOiB7IFtrZXk6IHN0cmluZ106IHsgdmFsdWU6IGFueTsgcGFyYW1zOiBIYXNoTWFwIH0gfSA9IHt9O1xuXG4gIEBJbnB1dCgndHJhbnNsb2NvJykga2V5OiBzdHJpbmc7XG4gIEBJbnB1dCgndHJhbnNsb2NvUGFyYW1zJykgcGFyYW1zOiBIYXNoTWFwID0ge307XG4gIEBJbnB1dCgndHJhbnNsb2NvU2NvcGUnKSBpbmxpbmVTY29wZTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICBASW5wdXQoJ3RyYW5zbG9jb1JlYWQnKSBpbmxpbmVSZWFkOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gIEBJbnB1dCgndHJhbnNsb2NvTGFuZycpIGlubGluZUxhbmc6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgQElucHV0KCd0cmFuc2xvY29Mb2FkaW5nVHBsJykgaW5saW5lVHBsOiBUZW1wbGF0ZVJlZjxhbnk+IHwgdW5kZWZpbmVkO1xuXG4gIHByaXZhdGUgY3VycmVudExhbmc6IHN0cmluZztcbiAgcHJpdmF0ZSBsb2FkZXJUcGxIYW5kbGVyOiBUZW1wbGF0ZUhhbmRsZXIgPSBudWxsO1xuICAvLyBXaGV0aGVyIHdlIGFscmVhZHkgcmVuZGVyZWQgdGhlIHZpZXcgb25jZVxuICBwcml2YXRlIGluaXRpYWxpemVkID0gZmFsc2U7XG4gIHByaXZhdGUgcGF0aDogc3RyaW5nO1xuICBwcml2YXRlIGxhbmdSZXNvbHZlciA9IG5ldyBMYW5nUmVzb2x2ZXIoKTtcbiAgcHJpdmF0ZSBzY29wZVJlc29sdmVyID0gbmV3IFNjb3BlUmVzb2x2ZXIodGhpcy50cmFuc2xvY29TZXJ2aWNlKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHRyYW5zbG9jb1NlcnZpY2U6IFRyYW5zbG9jb1NlcnZpY2UsXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSB0cGw6IFRlbXBsYXRlUmVmPHsgJGltcGxpY2l0OiAoa2V5OiBzdHJpbmcsIHBhcmFtcz86IEhhc2hNYXApID0+IGFueSB9PixcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KFRSQU5TTE9DT19TQ09QRSkgcHJpdmF0ZSBwcm92aWRlclNjb3BlOiBUcmFuc2xvY29TY29wZSxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KFRSQU5TTE9DT19MQU5HKSBwcml2YXRlIHByb3ZpZGVyTGFuZzogc3RyaW5nIHwgbnVsbCxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KFRSQU5TTE9DT19MT0FESU5HX1RFTVBMQVRFKSBwcml2YXRlIHByb3ZpZGVkTG9hZGluZ1RwbDogVHlwZTxhbnk+IHwgc3RyaW5nLFxuICAgIHByaXZhdGUgdmNyOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIGhvc3Q6IEVsZW1lbnRSZWZcbiAgKSB7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBjb25zdCBsb2FkaW5nVHBsID0gdGhpcy5nZXRMb2FkaW5nVHBsKCk7XG4gICAgaWYobG9hZGluZ1RwbCkge1xuICAgICAgdGhpcy5sb2FkZXJUcGxIYW5kbGVyID0gbmV3IFRlbXBsYXRlSGFuZGxlcihsb2FkaW5nVHBsLCB0aGlzLnZjcik7XG4gICAgICB0aGlzLmxvYWRlclRwbEhhbmRsZXIuYXR0YWNoVmlldygpO1xuICAgIH1cblxuICAgIGNvbnN0IGxpc3RlblRvTGFuZ0NoYW5nZSA9IHNob3VsZExpc3RlblRvTGFuZ0NoYW5nZXModGhpcy50cmFuc2xvY29TZXJ2aWNlLCB0aGlzLnByb3ZpZGVyTGFuZyB8fCB0aGlzLmlubGluZUxhbmcpO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb24gPSB0aGlzLnRyYW5zbG9jb1NlcnZpY2UubGFuZ0NoYW5nZXMkXG4gICAgICAucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKGFjdGl2ZUxhbmcgPT4ge1xuICAgICAgICAgIGNvbnN0IGxhbmcgPSB0aGlzLmxhbmdSZXNvbHZlci5yZXNvbHZlKHtcbiAgICAgICAgICAgIGlubGluZTogdGhpcy5pbmxpbmVMYW5nLFxuICAgICAgICAgICAgcHJvdmlkZXI6IHRoaXMucHJvdmlkZXJMYW5nLFxuICAgICAgICAgICAgYWN0aXZlOiBhY3RpdmVMYW5nXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgY29uc3Qgc2NvcGUgPSB0aGlzLnNjb3BlUmVzb2x2ZXIucmVzb2x2ZSh7XG4gICAgICAgICAgICBpbmxpbmU6IHRoaXMuaW5saW5lU2NvcGUsXG4gICAgICAgICAgICBwcm92aWRlcjogdGhpcy5wcm92aWRlclNjb3BlXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICB0aGlzLnBhdGggPSB0aGlzLmxhbmdSZXNvbHZlci5yZXNvbHZlTGFuZ1BhdGgobGFuZywgc2NvcGUpO1xuICAgICAgICAgIGNvbnN0IGlubGluZUxvYWRlcjogSW5saW5lTG9hZGVyIHwgbnVsbCA9IGhhc0lubGluZUxvYWRlcih0aGlzLnByb3ZpZGVyU2NvcGUpID8gcHJlcGVuZFNjb3BlKHRoaXMucHJvdmlkZXJTY29wZS5sb2FkZXIsIHNjb3BlKSA6IG51bGw7XG5cbiAgICAgICAgICByZXR1cm4gdGhpcy50cmFuc2xvY29TZXJ2aWNlLl9sb2FkRGVwZW5kZW5jaWVzKHRoaXMucGF0aCwgaW5saW5lTG9hZGVyKTtcbiAgICAgICAgfSksXG4gICAgICAgIGxpc3Rlbk9yTm90T3BlcmF0b3IobGlzdGVuVG9MYW5nQ2hhbmdlKVxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuY3VycmVudExhbmcgPSB0aGlzLmxhbmdSZXNvbHZlci5yZXNvbHZlTGFuZ0Jhc2VkT25TY29wZSh0aGlzLnBhdGgpO1xuICAgICAgICB0aGlzLnRwbCA9PT0gbnVsbCA/IHRoaXMuc2ltcGxlU3RyYXRlZ3koKSA6IHRoaXMuc3RydWN0dXJhbFN0cmF0ZWd5KHRoaXMuY3VycmVudExhbmcsIHRoaXMuaW5saW5lUmVhZCk7XG4gICAgICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB0aGlzLmluaXRpYWxpemVkID0gdHJ1ZTtcbiAgICAgIH0pO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlcykge1xuICAgIC8vIFdlIG5lZWQgdG8gc3VwcG9ydCBkeW5hbWljIGtleXMvcGFyYW1zLCBzbyBpZiB0aGlzIGlzIG5vdCB0aGUgZmlyc3QgY2hhbmdlIENEIGN5Y2xlXG4gICAgLy8gd2UgbmVlZCB0byBydW4gdGhlIGZ1bmN0aW9uIGFnYWluIGluIG9yZGVyIHRvIHVwZGF0ZSB0aGUgdmFsdWVcbiAgICBjb25zdCBub3RJbml0ID0gT2JqZWN0LmtleXMoY2hhbmdlcykuc29tZSh2ID0+IGNoYW5nZXNbdl0uZmlyc3RDaGFuZ2UgPT09IGZhbHNlKTtcbiAgICBub3RJbml0ICYmIHRoaXMuc2ltcGxlU3RyYXRlZ3koKTtcbiAgfVxuXG4gIHByaXZhdGUgc2ltcGxlU3RyYXRlZ3koKSB7XG4gICAgdGhpcy5kZXRhY2hMb2FkZXIoKTtcbiAgICB0aGlzLmhvc3QubmF0aXZlRWxlbWVudC5pbm5lclRleHQgPSB0aGlzLnRyYW5zbG9jb1NlcnZpY2UudHJhbnNsYXRlKHRoaXMua2V5LCB0aGlzLnBhcmFtcywgdGhpcy5jdXJyZW50TGFuZyk7XG4gIH1cblxuICBwcml2YXRlIHN0cnVjdHVyYWxTdHJhdGVneShsYW5nOiBzdHJpbmcsIHJlYWQ6IHN0cmluZyB8IHVuZGVmaW5lZCkge1xuICAgIHRoaXMudHJhbnNsYXRpb25NZW1vID0ge307XG5cbiAgICBpZih0aGlzLnZpZXcpIHtcbiAgICAgIC8vIHdoZW4gdGhlIGxhbmcgY2hhbmdlcyB3ZSBuZWVkIHRvIGNoYW5nZSB0aGUgcmVmZXJlbmNlIHNvIEFuZ3VsYXIgd2lsbCB1cGRhdGUgdGhlIHZpZXdcbiAgICAgIHRoaXMudmlldy5jb250ZXh0WyckaW1wbGljaXQnXSA9IHRoaXMuZ2V0VHJhbnNsYXRlRm4obGFuZywgcmVhZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGV0YWNoTG9hZGVyKCk7XG4gICAgICB0aGlzLnZpZXcgPSB0aGlzLnZjci5jcmVhdGVFbWJlZGRlZFZpZXcodGhpcy50cGwsIHtcbiAgICAgICAgJGltcGxpY2l0OiB0aGlzLmdldFRyYW5zbGF0ZUZuKGxhbmcsIHJlYWQpXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldFRyYW5zbGF0ZUZuKGxhbmc6IHN0cmluZywgcmVhZDogc3RyaW5nIHwgdW5kZWZpbmVkKTogKGtleTogc3RyaW5nLCBwYXJhbXM/OiBIYXNoTWFwKSA9PiBhbnkge1xuICAgIHJldHVybiAoa2V5OiBzdHJpbmcsIHBhcmFtczogSGFzaE1hcCkgPT4ge1xuICAgICAgY29uc3Qgd2l0aFJlYWQgPSByZWFkID8gYCR7cmVhZH0uJHtrZXl9YCA6IGtleTtcbiAgICAgIGNvbnN0IHdpdGhQYXJhbXMgPSBwYXJhbXMgPyBgJHt3aXRoUmVhZH0ke0pTT04uc3RyaW5naWZ5KHBhcmFtcyl9YCA6IHdpdGhSZWFkO1xuICAgICAgaWYodGhpcy50cmFuc2xhdGlvbk1lbW8uaGFzT3duUHJvcGVydHkod2l0aFBhcmFtcykpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudHJhbnNsYXRpb25NZW1vW3dpdGhQYXJhbXNdLnZhbHVlO1xuICAgICAgfVxuICAgICAgdGhpcy50cmFuc2xhdGlvbk1lbW9bd2l0aFBhcmFtc10gPSB7XG4gICAgICAgIHBhcmFtcyxcbiAgICAgICAgdmFsdWU6IHRoaXMudHJhbnNsb2NvU2VydmljZS50cmFuc2xhdGUod2l0aFJlYWQsIHBhcmFtcywgbGFuZylcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiB0aGlzLnRyYW5zbGF0aW9uTWVtb1t3aXRoUGFyYW1zXS52YWx1ZTtcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRMb2FkaW5nVHBsKCk6IFZpZXcge1xuICAgIHJldHVybiB0aGlzLmlubGluZVRwbCB8fCB0aGlzLnByb3ZpZGVkTG9hZGluZ1RwbDtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uICYmIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBwcml2YXRlIGRldGFjaExvYWRlcigpIHtcbiAgICB0aGlzLmxvYWRlclRwbEhhbmRsZXIgJiYgdGhpcy5sb2FkZXJUcGxIYW5kbGVyLmRldGFjaFZpZXcoKTtcbiAgfVxufVxuIl19