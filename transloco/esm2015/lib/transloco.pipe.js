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
export class TranslocoPipe {
    /**
     * @param {?} translocoService
     * @param {?} providerScope
     * @param {?} providerLang
     * @param {?} cdr
     */
    constructor(translocoService, providerScope, providerLang, cdr) {
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
    transform(key, params, inlineLang) {
        if (!key) {
            return key;
        }
        /** @type {?} */
        const keyName = params ? `${key}${JSON.stringify(params)}` : key;
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
        activeLang => {
            /** @type {?} */
            const lang = this.langResolver.resolve({
                inline: inlineLang,
                provider: this.providerLang,
                active: activeLang
            });
            /** @type {?} */
            let scope = this.scopeResolver.resolve({ inline: undefined, provider: this.providerScope });
            this.path = this.langResolver.resolveLangPath(lang, scope);
            /** @type {?} */
            const inlineLoader = hasInlineLoader(this.providerScope) ? prependScope(this.providerScope.loader, scope) : null;
            return this.translocoService._loadDependencies(this.path, inlineLoader);
        })), listenOrNotOperator(this.listenToLangChange))
            .subscribe((/**
         * @return {?}
         */
        () => this.updateValue(key, params)));
        return this.lastValue;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    /**
     * @private
     * @param {?} key
     * @param {?=} params
     * @return {?}
     */
    updateValue(key, params) {
        /** @type {?} */
        const lang = this.langResolver.resolveLangBasedOnScope(this.path);
        this.lastValue = this.translocoService.translate(key, params, lang);
        this.cdr.markForCheck();
    }
}
TranslocoPipe.decorators = [
    { type: Pipe, args: [{
                name: 'transloco',
                pure: false
            },] }
];
/** @nocollapse */
TranslocoPipe.ctorParameters = () => [
    { type: TranslocoService },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [TRANSLOCO_SCOPE,] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [TRANSLOCO_LANG,] }] },
    { type: ChangeDetectorRef }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsb2NvLnBpcGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmduZWF0L3RyYW5zbG9jby8iLCJzb3VyY2VzIjpbImxpYi90cmFuc2xvY28ucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sRUFBYSxRQUFRLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUNwRyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUV2RCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFM0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsWUFBWSxFQUFFLHlCQUF5QixFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ3hGLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQU01QyxNQUFNLE9BQU8sYUFBYTs7Ozs7OztJQVN4QixZQUNVLGdCQUFrQyxFQUNHLGFBQTRDLEVBQzdDLFlBQTJCLEVBQy9ELEdBQXNCO1FBSHRCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDRyxrQkFBYSxHQUFiLGFBQWEsQ0FBK0I7UUFDN0MsaUJBQVksR0FBWixZQUFZLENBQWU7UUFDL0QsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFaeEIsaUJBQVksR0FBd0IsSUFBSSxDQUFDO1FBS3pDLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNsQyxrQkFBYSxHQUFHLElBQUksYUFBYSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FB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QUFzQzs7Ozs7SUFDdEMsZ0NBQW9DOzs7OztJQUNwQywyQ0FBb0M7Ozs7O0lBQ3BDLDZCQUFxQjs7Ozs7SUFDckIscUNBQTBDOzs7OztJQUMxQyxzQ0FBaUU7Ozs7O0lBRy9ELHlDQUEwQzs7Ozs7SUFDMUMsc0NBQXlGOzs7OztJQUN6RixxQ0FBdUU7Ozs7O0lBQ3ZFLDRCQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdG9yUmVmLCBJbmplY3QsIE9uRGVzdHJveSwgT3B0aW9uYWwsIFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRyYW5zbG9jb1NlcnZpY2UgfSBmcm9tICcuL3RyYW5zbG9jby5zZXJ2aWNlJztcbmltcG9ydCB7IEhhc2hNYXAsIElubGluZUxvYWRlciwgUHJvdmlkZXJTY29wZSB9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHsgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBUUkFOU0xPQ09fU0NPUEUgfSBmcm9tICcuL3RyYW5zbG9jby1zY29wZSc7XG5pbXBvcnQgeyBUUkFOU0xPQ09fTEFORyB9IGZyb20gJy4vdHJhbnNsb2NvLWxhbmcnO1xuaW1wb3J0IHsgbGlzdGVuT3JOb3RPcGVyYXRvciwgcHJlcGVuZFNjb3BlLCBzaG91bGRMaXN0ZW5Ub0xhbmdDaGFuZ2VzIH0gZnJvbSAnLi9zaGFyZWQnO1xuaW1wb3J0IHsgTGFuZ1Jlc29sdmVyIH0gZnJvbSAnLi9sYW5nLXJlc29sdmVyJztcbmltcG9ydCB7IFNjb3BlUmVzb2x2ZXIgfSBmcm9tICcuL3Njb3BlLXJlc29sdmVyJztcbmltcG9ydCB7IGhhc0lubGluZUxvYWRlciB9IGZyb20gJy4vaGVscGVycyc7XG5cbkBQaXBlKHtcbiAgbmFtZTogJ3RyYW5zbG9jbycsXG4gIHB1cmU6IGZhbHNlXG59KVxuZXhwb3J0IGNsYXNzIFRyYW5zbG9jb1BpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtLCBPbkRlc3Ryb3kge1xuICBwcml2YXRlIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uIHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgbGFzdFZhbHVlOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gIHByaXZhdGUgbGFzdEtleTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICBwcml2YXRlIGxpc3RlblRvTGFuZ0NoYW5nZTogYm9vbGVhbjtcbiAgcHJpdmF0ZSBwYXRoOiBzdHJpbmc7XG4gIHByaXZhdGUgbGFuZ1Jlc29sdmVyID0gbmV3IExhbmdSZXNvbHZlcigpO1xuICBwcml2YXRlIHNjb3BlUmVzb2x2ZXIgPSBuZXcgU2NvcGVSZXNvbHZlcih0aGlzLnRyYW5zbG9jb1NlcnZpY2UpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgdHJhbnNsb2NvU2VydmljZTogVHJhbnNsb2NvU2VydmljZSxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KFRSQU5TTE9DT19TQ09QRSkgcHJpdmF0ZSBwcm92aWRlclNjb3BlOiBzdHJpbmcgfCBQcm92aWRlclNjb3BlIHwgbnVsbCxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KFRSQU5TTE9DT19MQU5HKSBwcml2YXRlIHByb3ZpZGVyTGFuZzogc3RyaW5nIHwgbnVsbCxcbiAgICBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWZcbiAgKSB7XG4gICAgdGhpcy5saXN0ZW5Ub0xhbmdDaGFuZ2UgPSBzaG91bGRMaXN0ZW5Ub0xhbmdDaGFuZ2VzKHRoaXMudHJhbnNsb2NvU2VydmljZSwgdGhpcy5wcm92aWRlckxhbmcpO1xuICB9XG5cbiAgdHJhbnNmb3JtKGtleTogc3RyaW5nLCBwYXJhbXM/OiBIYXNoTWFwIHwgdW5kZWZpbmVkLCBpbmxpbmVMYW5nPzogc3RyaW5nIHwgdW5kZWZpbmVkKTogc3RyaW5nIHtcbiAgICBpZiAoIWtleSkge1xuICAgICAgcmV0dXJuIGtleTtcbiAgICB9XG5cbiAgICBjb25zdCBrZXlOYW1lID0gcGFyYW1zID8gYCR7a2V5fSR7SlNPTi5zdHJpbmdpZnkocGFyYW1zKX1gIDoga2V5O1xuXG4gICAgaWYgKGtleU5hbWUgPT09IHRoaXMubGFzdEtleSkge1xuICAgICAgcmV0dXJuIHRoaXMubGFzdFZhbHVlO1xuICAgIH1cblxuICAgIHRoaXMubGFzdEtleSA9IGtleU5hbWU7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24gJiYgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gdGhpcy50cmFuc2xvY29TZXJ2aWNlLmxhbmdDaGFuZ2VzJFxuICAgICAgLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcChhY3RpdmVMYW5nID0+IHtcbiAgICAgICAgICBjb25zdCBsYW5nID0gdGhpcy5sYW5nUmVzb2x2ZXIucmVzb2x2ZSh7XG4gICAgICAgICAgICBpbmxpbmU6IGlubGluZUxhbmcsXG4gICAgICAgICAgICBwcm92aWRlcjogdGhpcy5wcm92aWRlckxhbmcsXG4gICAgICAgICAgICBhY3RpdmU6IGFjdGl2ZUxhbmdcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGxldCBzY29wZSA9IHRoaXMuc2NvcGVSZXNvbHZlci5yZXNvbHZlKHsgaW5saW5lOiB1bmRlZmluZWQsIHByb3ZpZGVyOiB0aGlzLnByb3ZpZGVyU2NvcGUgfSk7XG4gICAgICAgICAgdGhpcy5wYXRoID0gdGhpcy5sYW5nUmVzb2x2ZXIucmVzb2x2ZUxhbmdQYXRoKGxhbmcsIHNjb3BlKTtcblxuICAgICAgICAgIGNvbnN0IGlubGluZUxvYWRlcjogSW5saW5lTG9hZGVyIHwgbnVsbCA9IGhhc0lubGluZUxvYWRlcih0aGlzLnByb3ZpZGVyU2NvcGUpID8gcHJlcGVuZFNjb3BlKHRoaXMucHJvdmlkZXJTY29wZS5sb2FkZXIsIHNjb3BlKSA6IG51bGw7XG5cbiAgICAgICAgICByZXR1cm4gdGhpcy50cmFuc2xvY29TZXJ2aWNlLl9sb2FkRGVwZW5kZW5jaWVzKHRoaXMucGF0aCwgaW5saW5lTG9hZGVyKTtcbiAgICAgICAgfSksXG4gICAgICAgIGxpc3Rlbk9yTm90T3BlcmF0b3IodGhpcy5saXN0ZW5Ub0xhbmdDaGFuZ2UpXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMudXBkYXRlVmFsdWUoa2V5LCBwYXJhbXMpKTtcblxuICAgIHJldHVybiB0aGlzLmxhc3RWYWx1ZTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZVZhbHVlKGtleTogc3RyaW5nLCBwYXJhbXM/OiBIYXNoTWFwIHwgdW5kZWZpbmVkKSB7XG4gICAgY29uc3QgbGFuZyA9IHRoaXMubGFuZ1Jlc29sdmVyLnJlc29sdmVMYW5nQmFzZWRPblNjb3BlKHRoaXMucGF0aCk7XG4gICAgdGhpcy5sYXN0VmFsdWUgPSB0aGlzLnRyYW5zbG9jb1NlcnZpY2UudHJhbnNsYXRlKGtleSwgcGFyYW1zLCBsYW5nKTtcbiAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxufVxuIl19