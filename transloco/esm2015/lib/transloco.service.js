/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Inject, Injectable, Optional } from '@angular/core';
import { BehaviorSubject, combineLatest, forkJoin, from, of, Subject } from 'rxjs';
import { catchError, map, retry, shareReplay, switchMap, tap } from 'rxjs/operators';
import { DefaultLoader, TRANSLOCO_LOADER } from './transloco.loader';
import { TRANSLOCO_TRANSPILER } from './transloco.transpiler';
import { flatten, getValue, isString, size, toCamelCase, unflatten } from './helpers';
import { defaultConfig, TRANSLOCO_CONFIG } from './transloco.config';
import { TRANSLOCO_MISSING_HANDLER } from './transloco-missing-handler';
import { TRANSLOCO_INTERCEPTOR } from './transloco.interceptor';
import { TRANSLOCO_FALLBACK_STRATEGY } from './transloco-fallback-strategy';
import { mergeConfig } from './merge-config';
import { getLangFromScope, getScopeFromLang } from './shared';
import { getFallbacksLoaders } from './get-fallbacks-loaders';
import { resolveLoader } from './resolve-loader';
import * as i0 from "@angular/core";
import * as i1 from "./transloco.loader";
import * as i2 from "./transloco.transpiler";
import * as i3 from "./transloco-missing-handler";
import * as i4 from "./transloco.interceptor";
import * as i5 from "./transloco.config";
import * as i6 from "./transloco-fallback-strategy";
/** @type {?} */
let service;
/**
 * @template T
 * @param {?} key
 * @param {?=} params
 * @param {?=} lang
 * @return {?}
 */
export function translate(key, params = {}, lang) {
    return service.translate(key, params, lang);
}
export class TranslocoService {
    /**
     * @param {?} loader
     * @param {?} parser
     * @param {?} missingHandler
     * @param {?} interceptor
     * @param {?} userConfig
     * @param {?} fallbackStrategy
     */
    constructor(loader, parser, missingHandler, interceptor, userConfig, fallbackStrategy) {
        this.loader = loader;
        this.parser = parser;
        this.missingHandler = missingHandler;
        this.interceptor = interceptor;
        this.userConfig = userConfig;
        this.fallbackStrategy = fallbackStrategy;
        this.translations = new Map();
        this.cache = new Map();
        this.firstFallbackLang = null;
        this.availableLangs = [];
        this.isResolvedMissingOnce = false;
        this.events = new Subject();
        this.events$ = this.events.asObservable();
        this.failedCounter = 0;
        this.failedLangs = new Set();
        if (!this.loader) {
            this.loader = new DefaultLoader(this.translations);
        }
        service = this;
        this.mergedConfig = mergeConfig(defaultConfig, userConfig);
        this.setAvailableLangs(this.mergedConfig.availableLangs);
        this.setFallbackLangForMissingTranslation(this.mergedConfig);
        this.setDefaultLang(this.mergedConfig.defaultLang);
        this.lang = new BehaviorSubject(this.getDefaultLang());
        // Don't use distinctUntilChanged as we need the ability to update
        // the value when using setTranslation or setTranslationKeys
        this.langChanges$ = this.lang.asObservable();
        /**
         * When we have a failure, we want to define the next language that succeeded as the active
         */
        this.subscription = this.events$.subscribe((/**
         * @param {?} e
         * @return {?}
         */
        e => {
            if (e.type === 'translationLoadSuccess' && e.wasFailure) {
                // Handle scoped lang
                /** @type {?} */
                const lang = getLangFromScope(e.payload.lang);
                this.setActiveLang(lang);
            }
        }));
    }
    /**
     * @return {?}
     */
    get config() {
        return this.mergedConfig;
    }
    /**
     * @return {?}
     */
    getDefaultLang() {
        return this.defaultLang;
    }
    /**
     * @param {?} lang
     * @return {?}
     */
    setDefaultLang(lang) {
        this.defaultLang = lang;
    }
    /**
     * @return {?}
     */
    getActiveLang() {
        return this.lang.getValue();
    }
    /**
     * @template THIS
     * @this {THIS}
     * @param {?} lang
     * @return {THIS}
     */
    setActiveLang(lang) {
        (/** @type {?} */ (this)).lang.next(lang);
        return (/** @type {?} */ (this));
    }
    /**
     * @param {?} langs
     * @return {?}
     */
    setAvailableLangs(langs) {
        this.availableLangs = langs;
    }
    /**
     * @return {?}
     */
    getAvailableLangs() {
        return this.availableLangs;
    }
    /**
     * @param {?} path
     * @param {?=} options
     * @return {?}
     */
    load(path, options = {}) {
        if (this.cache.has(path) === false) {
            /** @type {?} */
            let loadTranslation;
            if (this.useFallbackTranslation(path)) {
                // if the path is scope the fallback should be `scope/fallbackLang`;
                /** @type {?} */
                const fallback = this._isLangScoped(path)
                    ? `${getScopeFromLang(path)}/${this.firstFallbackLang}`
                    : this.firstFallbackLang;
                /** @type {?} */
                const loaders = getFallbacksLoaders(path, fallback, this.loader, options.inlineLoader);
                loadTranslation = forkJoin(loaders);
            }
            else {
                /** @type {?} */
                const loader = resolveLoader(path, this.loader, options.inlineLoader);
                loadTranslation = from(loader);
            }
            /** @type {?} */
            const load$ = loadTranslation.pipe(retry(this.config.failedRetries), catchError((/**
             * @return {?}
             */
            () => this.handleFailure(path, options))), tap((/**
             * @param {?} translation
             * @return {?}
             */
            translation => {
                if (Array.isArray(translation)) {
                    translation.forEach((/**
                     * @param {?} t
                     * @return {?}
                     */
                    t => {
                        this.handleSuccess(t.lang, t.translation);
                        // Save the fallback in cache so we'll not create a redundant request
                        if (t.lang !== path) {
                            this.cache.set(t.lang, of({}));
                        }
                    }));
                    return;
                }
                this.handleSuccess(path, translation);
            })), shareReplay(1));
            this.cache.set(path, load$);
        }
        return this.cache.get(path);
    }
    /**
     * Gets the instant translated value of a key
     *
     * \@example
     *
     * translate<string>('hello')
     * translate('hello', { value: 'value' })
     * translate<string[]>(['hello', 'key'])
     * translate('hello', { }, 'en')
     * translate('scope.someKey', { }, 'en')
     * @template T
     * @param {?} key
     * @param {?=} params
     * @param {?=} lang
     * @return {?}
     */
    translate(key, params = {}, lang = this.getActiveLang()) {
        /** @type {?} */
        let resolveLang = lang;
        /** @type {?} */
        let scope;
        // If lang is scope we need to check the following cases:
        // todos/es => in this case we should take `es` as lang
        // todos => in this case we should set the active lang as lang
        if (this._isLangScoped(lang)) {
            // en for example
            /** @type {?} */
            const langFromScope = getLangFromScope(lang);
            // en is lang
            /** @type {?} */
            const hasLang = this._isLang(langFromScope);
            // take en
            resolveLang = hasLang ? langFromScope : this.getActiveLang();
            // find the scope
            scope = this.getMappedScope(hasLang ? getScopeFromLang(lang) : lang);
        }
        if (Array.isArray(key)) {
            return (/** @type {?} */ (key.map((/**
             * @param {?} k
             * @return {?}
             */
            k => this.translate(scope ? `${scope}.${k}` : k, params, resolveLang)))));
        }
        key = scope ? `${scope}.${key}` : key;
        if (!key) {
            return this.missingHandler.handle(key, this.config);
        }
        /** @type {?} */
        const translation = this.getTranslation(resolveLang);
        /** @type {?} */
        const value = translation[key];
        if (!value) {
            return this.handleMissingKey(key, value, params);
        }
        return this.parser.transpile(value, params, translation);
    }
    /**
     * Gets the translated value of a key as observable
     *
     * \@example
     *
     * selectTranslate<string>('hello').subscribe(value => ...)
     * selectTranslate<string>('hello', {}, 'es').subscribe(value => ...)
     * selectTranslate<string>('hello', {}, 'todos').subscribe(value => ...)
     *
     * @template T
     * @param {?} key
     * @param {?=} params
     * @param {?=} lang
     * @param {?=} _isObject
     * @return {?}
     */
    selectTranslate(key, params, lang, _isObject = false) {
        /** @type {?} */
        const load = (/**
         * @param {?} lang
         * @return {?}
         */
        lang => this.load(lang).pipe(map((/**
         * @return {?}
         */
        () => (_isObject ? this.translateObject(key, params, lang) : this.translate(key, params, lang))))));
        if (isString(lang)) {
            /** @type {?} */
            const langOrScope = this._completeScopeWithLang(lang);
            return load(langOrScope);
        }
        else {
            // if the user doesn't pass lang, we need to listen to lang changes and update the value accordingly
            return this.langChanges$.pipe(switchMap((/**
             * @param {?} lang
             * @return {?}
             */
            lang => load(lang))));
        }
    }
    /**
     * Translate the given path that returns an object
     *
     * \@example
     *
     * service.translateObject('path.to.object', {'subpath': { value: 'someValue'}}) => returns translated object
     *
     * @template T
     * @param {?} key
     * @param {?=} params
     * @param {?=} lang
     * @return {?}
     */
    translateObject(key, params, lang = this.getActiveLang()) {
        if (Array.isArray(key)) {
            return (/** @type {?} */ (key.map((/**
             * @param {?} k
             * @return {?}
             */
            k => this.translateObject(k, params, lang)))));
        }
        /** @type {?} */
        const translation = this.getTranslation(lang);
        // TODO: optimize it (we can build this specific object)
        /** @type {?} */
        const value = getValue(unflatten(translation), key);
        return this.parser.transpile(value, params, translation);
    }
    /**
     * @template T
     * @param {?} key
     * @param {?=} params
     * @param {?=} lang
     * @return {?}
     */
    selectTranslateObject(key, params, lang) {
        return this.selectTranslate(key, params, lang, true);
    }
    /**
     * @param {?=} lang
     * @return {?}
     */
    getTranslation(lang) {
        return lang ? this.translations.get(lang) || {} : this.translations;
    }
    /**
     * Gets an object of translations for a given language
     *
     * \@example
     *
     * selectTranslation().subscribe()
     * selectTranslation('es').subscribe()
     * @param {?=} lang
     * @return {?}
     */
    selectTranslation(lang) {
        /** @type {?} */
        const language = lang || this.getActiveLang();
        return this.load(language).pipe(map((/**
         * @return {?}
         */
        () => this.getTranslation(language))));
    }
    /**
     * Sets or merge a given translation object to current lang
     *
     * \@example
     *
     * setTranslation({ ... })
     * setTranslation({ ... }, 'en')
     * setTranslation({ ... }, 'es', { merge: false } )
     * setTranslation({ ... }, 'todos/en', { merge: false } )
     * @param {?} translation
     * @param {?=} lang
     * @param {?=} options
     * @return {?}
     */
    setTranslation(translation, lang = this.getActiveLang(), options = {}) {
        /** @type {?} */
        const defaults = { merge: true, emitChange: true };
        /** @type {?} */
        const mergedOptions = Object.assign({}, defaults, options);
        /** @type {?} */
        const scope = getScopeFromLang(lang);
        /**
         * If this isn't a scope we use the whole translation as is
         * otherwise we need to flat the scope and use it
         * @type {?}
         */
        let flattenScopeOrTranslation = translation;
        // Merged the scoped language into the active language
        if (scope) {
            /** @type {?} */
            const key = this.getMappedScope(scope);
            flattenScopeOrTranslation = flatten({ [key]: translation });
        }
        /** @type {?} */
        const currentLang = scope ? getLangFromScope(lang) : lang;
        /** @type {?} */
        const mergedTranslation = Object.assign({}, (mergedOptions.merge && this.getTranslation(currentLang)), flattenScopeOrTranslation);
        /** @type {?} */
        const withHook = this.interceptor.preSaveTranslation(mergedTranslation, currentLang);
        /** @type {?} */
        const flattenTranslation = this.mergedConfig.flatten.aot ? withHook : flatten(withHook);
        this.translations.set(currentLang, flattenTranslation);
        mergedOptions.emitChange && this.setActiveLang(this.getActiveLang());
    }
    /**
     * Sets translation key with given value
     *
     * \@example
     *
     * setTranslationKey('key', 'value')
     * setTranslationKey('key.nested', 'value')
     * setTranslationKey('key.nested', 'value', 'en')
     * @param {?} key
     * @param {?} value
     * @param {?=} lang
     * @return {?}
     */
    setTranslationKey(key, value, lang = this.getActiveLang()) {
        /** @type {?} */
        const withHook = this.interceptor.preSaveTranslationKey(key, value, lang);
        /** @type {?} */
        const newValue = Object.assign({}, this.getTranslation(lang), { [key]: withHook });
        this.setTranslation(newValue, lang);
    }
    /**
     * @param {?} key
     * @param {?} value
     * @param {?=} params
     * @return {?}
     */
    handleMissingKey(key, value, params) {
        if (this.config.missingHandler.allowEmpty && value === '') {
            return '';
        }
        if (this.useFallbackTranslation() && !this.isResolvedMissingOnce) {
            this.isResolvedMissingOnce = true;
            /** @type {?} */
            const value = this.translate(key, params, this.firstFallbackLang);
            this.isResolvedMissingOnce = false;
            return value;
        }
        return this.missingHandler.handle(key, this.config);
    }
    /**
     * \@internal
     * @param {?} lang
     * @return {?}
     */
    _isLangScoped(lang) {
        return this.getAvailableLangsIds().indexOf(lang) === -1;
    }
    /**
     * \@internal
     * @param {?} lang
     * @return {?}
     */
    _isLang(lang) {
        return this.getAvailableLangsIds().indexOf(lang) !== -1;
    }
    /**
     * \@internal
     *
     * We always want to make sure the global lang is loaded
     * before loading the scope since you can access both via the pipe/directive.
     * @param {?} path
     * @param {?=} inlineLoader
     * @return {?}
     */
    _loadDependencies(path, inlineLoader) {
        /** @type {?} */
        const mainLang = getLangFromScope(path);
        if (this._isLangScoped(path) && !this.isLoadedTranslation(mainLang)) {
            return combineLatest(this.load(mainLang), this.load(path, { inlineLoader }));
        }
        return this.load(path, { inlineLoader });
    }
    /**
     * @private
     * @param {?} lang
     * @return {?}
     */
    isLoadedTranslation(lang) {
        return size(this.getTranslation(lang));
    }
    /**
     * \@internal
     * @param {?} langOrScope
     * @return {?}
     */
    _completeScopeWithLang(langOrScope) {
        if (this._isLangScoped(langOrScope) && !this._isLang(getLangFromScope(langOrScope))) {
            return `${langOrScope}/${this.getActiveLang()}`;
        }
        return langOrScope;
    }
    /**
     * \@internal
     * @param {?} scope
     * @param {?} alias
     * @return {?}
     */
    _setScopeAlias(scope, alias) {
        if (!this.mergedConfig.scopeMapping) {
            this.mergedConfig.scopeMapping = {};
        }
        this.mergedConfig.scopeMapping[scope] = alias;
    }
    /**
     * @private
     * @return {?}
     */
    getAvailableLangsIds() {
        /** @type {?} */
        const first = this.getAvailableLangs()[0];
        if (isString(first)) {
            return (/** @type {?} */ (this.getAvailableLangs()));
        }
        return ((/** @type {?} */ (this.getAvailableLangs()))).map((/**
         * @param {?} l
         * @return {?}
         */
        l => l.id));
    }
    /**
     * @private
     * @param {?=} lang
     * @return {?}
     */
    useFallbackTranslation(lang) {
        return this.config.missingHandler.useFallbackTranslation && lang !== this.firstFallbackLang;
    }
    /**
     * @private
     * @param {?} lang
     * @param {?} translation
     * @return {?}
     */
    handleSuccess(lang, translation) {
        this.setTranslation(translation, lang, { emitChange: false });
        if (this.failedLangs.has(lang) === false) {
            this.events.next({
                wasFailure: !!this.failedLangs.size,
                type: 'translationLoadSuccess',
                payload: {
                    lang
                }
            });
            this.failedCounter = 0;
        }
        else {
            this.cache.delete(lang);
            this.failedLangs.delete(lang);
        }
    }
    /**
     * @private
     * @param {?} lang
     * @param {?} mergedOptions
     * @return {?}
     */
    handleFailure(lang, mergedOptions) {
        /** @type {?} */
        const splitted = lang.split('/');
        this.failedLangs.add(lang);
        /** @type {?} */
        const fallbacks = mergedOptions.fallbackLangs || this.fallbackStrategy.getNextLangs(lang);
        /** @type {?} */
        const nextLang = fallbacks[this.failedCounter];
        /** @type {?} */
        const isFallbackLang = nextLang === splitted[splitted.length - 1];
        if (!nextLang || isFallbackLang) {
            /** @type {?} */
            let msg = `Unable to load translation and all the fallback languages`;
            if (splitted.length > 1) {
                msg += `, did you misspelled the scope name?`;
            }
            throw new Error(msg);
        }
        /** @type {?} */
        let resolveLang = nextLang;
        // if it's scoped lang
        if (splitted.length > 1) {
            // We need to resolve it to:
            // todos/langNotExists => todos/nextLang
            splitted[splitted.length - 1] = nextLang;
            resolveLang = splitted.join('/');
        }
        this.failedCounter++;
        this.events.next({
            type: 'translationLoadFailure',
            payload: {
                lang
            }
        });
        return this.load(resolveLang);
    }
    /**
     * @private
     * @param {?} __0
     * @return {?}
     */
    setFallbackLangForMissingTranslation({ fallbackLang }) {
        if (this.useFallbackTranslation && fallbackLang) {
            this.firstFallbackLang = Array.isArray(fallbackLang) ? fallbackLang[0] : fallbackLang;
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    /**
     * @private
     * @param {?} scope
     * @return {?}
     */
    getMappedScope(scope) {
        const { scopeMapping = {} } = this.config;
        return scopeMapping[scope] || toCamelCase(scope);
    }
}
TranslocoService.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */
TranslocoService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [TRANSLOCO_LOADER,] }] },
    { type: undefined, decorators: [{ type: Inject, args: [TRANSLOCO_TRANSPILER,] }] },
    { type: undefined, decorators: [{ type: Inject, args: [TRANSLOCO_MISSING_HANDLER,] }] },
    { type: undefined, decorators: [{ type: Inject, args: [TRANSLOCO_INTERCEPTOR,] }] },
    { type: undefined, decorators: [{ type: Inject, args: [TRANSLOCO_CONFIG,] }] },
    { type: undefined, decorators: [{ type: Inject, args: [TRANSLOCO_FALLBACK_STRATEGY,] }] }
];
/** @nocollapse */ TranslocoService.ngInjectableDef = i0.defineInjectable({ factory: function TranslocoService_Factory() { return new TranslocoService(i0.inject(i1.TRANSLOCO_LOADER, 8), i0.inject(i2.TRANSLOCO_TRANSPILER), i0.inject(i3.TRANSLOCO_MISSING_HANDLER), i0.inject(i4.TRANSLOCO_INTERCEPTOR), i0.inject(i5.TRANSLOCO_CONFIG), i0.inject(i6.TRANSLOCO_FALLBACK_STRATEGY)); }, token: TranslocoService, providedIn: "root" });
if (false) {
    /**
     * @type {?}
     * @private
     */
    TranslocoService.prototype.subscription;
    /**
     * @type {?}
     * @private
     */
    TranslocoService.prototype.translations;
    /**
     * @type {?}
     * @private
     */
    TranslocoService.prototype.cache;
    /**
     * @type {?}
     * @private
     */
    TranslocoService.prototype.firstFallbackLang;
    /**
     * @type {?}
     * @private
     */
    TranslocoService.prototype.defaultLang;
    /**
     * @type {?}
     * @private
     */
    TranslocoService.prototype.mergedConfig;
    /**
     * @type {?}
     * @private
     */
    TranslocoService.prototype.availableLangs;
    /**
     * @type {?}
     * @private
     */
    TranslocoService.prototype.isResolvedMissingOnce;
    /**
     * @type {?}
     * @private
     */
    TranslocoService.prototype.lang;
    /** @type {?} */
    TranslocoService.prototype.langChanges$;
    /**
     * @type {?}
     * @private
     */
    TranslocoService.prototype.events;
    /** @type {?} */
    TranslocoService.prototype.events$;
    /**
     * @type {?}
     * @private
     */
    TranslocoService.prototype.failedCounter;
    /**
     * @type {?}
     * @private
     */
    TranslocoService.prototype.failedLangs;
    /**
     * @type {?}
     * @private
     */
    TranslocoService.prototype.loader;
    /**
     * @type {?}
     * @private
     */
    TranslocoService.prototype.parser;
    /**
     * @type {?}
     * @private
     */
    TranslocoService.prototype.missingHandler;
    /**
     * @type {?}
     * @private
     */
    TranslocoService.prototype.interceptor;
    /**
     * @type {?}
     * @private
     */
    TranslocoService.prototype.userConfig;
    /**
     * @type {?}
     * @private
     */
    TranslocoService.prototype.fallbackStrategy;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsb2NvLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmduZWF0L3RyYW5zbG9jby8iLCJzb3VyY2VzIjpbImxpYi90cmFuc2xvY28uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQWEsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxlQUFlLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQWMsRUFBRSxFQUFFLE9BQU8sRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFDN0csT0FBTyxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckYsT0FBTyxFQUFFLGFBQWEsRUFBRSxnQkFBZ0IsRUFBbUIsTUFBTSxvQkFBb0IsQ0FBQztBQUN0RixPQUFPLEVBQUUsb0JBQW9CLEVBQXVCLE1BQU0sd0JBQXdCLENBQUM7QUFFbkYsT0FBTyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ3RGLE9BQU8sRUFBRSxhQUFhLEVBQUUsZ0JBQWdCLEVBQW1CLE1BQU0sb0JBQW9CLENBQUM7QUFDdEYsT0FBTyxFQUFFLHlCQUF5QixFQUEyQixNQUFNLDZCQUE2QixDQUFDO0FBQ2pHLE9BQU8sRUFBRSxxQkFBcUIsRUFBd0IsTUFBTSx5QkFBeUIsQ0FBQztBQUN0RixPQUFPLEVBQUUsMkJBQTJCLEVBQTZCLE1BQU0sK0JBQStCLENBQUM7QUFDdkcsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsbUJBQW1C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Ozs7OztJQUN0QywwQ0FBNEM7Ozs7O0lBQzVDLGlEQUFzQzs7Ozs7SUFDdEMsZ0NBQXNDOztJQUN0Qyx3Q0FBaUM7Ozs7O0lBRWpDLGtDQUFnRDs7SUFDaEQsbUNBQXFDOzs7OztJQUVyQyx5Q0FBMEI7Ozs7O0lBQzFCLHVDQUF3Qzs7Ozs7SUFHdEMsa0NBQXFFOzs7OztJQUNyRSxrQ0FBaUU7Ozs7O0lBQ2pFLDBDQUFrRjs7Ozs7SUFDbEYsdUNBQXdFOzs7OztJQUN4RSxzQ0FBNkQ7Ozs7O0lBQzdELDRDQUF3RiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSwgT25EZXN0cm95LCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBjb21iaW5lTGF0ZXN0LCBmb3JrSm9pbiwgZnJvbSwgT2JzZXJ2YWJsZSwgb2YsIFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciwgbWFwLCByZXRyeSwgc2hhcmVSZXBsYXksIHN3aXRjaE1hcCwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgRGVmYXVsdExvYWRlciwgVFJBTlNMT0NPX0xPQURFUiwgVHJhbnNsb2NvTG9hZGVyIH0gZnJvbSAnLi90cmFuc2xvY28ubG9hZGVyJztcbmltcG9ydCB7IFRSQU5TTE9DT19UUkFOU1BJTEVSLCBUcmFuc2xvY29UcmFuc3BpbGVyIH0gZnJvbSAnLi90cmFuc2xvY28udHJhbnNwaWxlcic7XG5pbXBvcnQgeyBBdmFpbGFibGVMYW5ncywgSGFzaE1hcCwgSW5saW5lTG9hZGVyLCBMb2FkT3B0aW9ucywgU2V0VHJhbnNsYXRpb25PcHRpb25zLCBUcmFuc2xhdGVQYXJhbXMsIFRyYW5zbGF0aW9uLCBUcmFuc2xvY29FdmVudHMgfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IGZsYXR0ZW4sIGdldFZhbHVlLCBpc1N0cmluZywgc2l6ZSwgdG9DYW1lbENhc2UsIHVuZmxhdHRlbiB9IGZyb20gJy4vaGVscGVycyc7XG5pbXBvcnQgeyBkZWZhdWx0Q29uZmlnLCBUUkFOU0xPQ09fQ09ORklHLCBUcmFuc2xvY29Db25maWcgfSBmcm9tICcuL3RyYW5zbG9jby5jb25maWcnO1xuaW1wb3J0IHsgVFJBTlNMT0NPX01JU1NJTkdfSEFORExFUiwgVHJhbnNsb2NvTWlzc2luZ0hhbmRsZXIgfSBmcm9tICcuL3RyYW5zbG9jby1taXNzaW5nLWhhbmRsZXInO1xuaW1wb3J0IHsgVFJBTlNMT0NPX0lOVEVSQ0VQVE9SLCBUcmFuc2xvY29JbnRlcmNlcHRvciB9IGZyb20gJy4vdHJhbnNsb2NvLmludGVyY2VwdG9yJztcbmltcG9ydCB7IFRSQU5TTE9DT19GQUxMQkFDS19TVFJBVEVHWSwgVHJhbnNsb2NvRmFsbGJhY2tTdHJhdGVneSB9IGZyb20gJy4vdHJhbnNsb2NvLWZhbGxiYWNrLXN0cmF0ZWd5JztcbmltcG9ydCB7IG1lcmdlQ29uZmlnIH0gZnJvbSAnLi9tZXJnZS1jb25maWcnO1xuaW1wb3J0IHsgZ2V0TGFuZ0Zyb21TY29wZSwgZ2V0U2NvcGVGcm9tTGFuZyB9IGZyb20gJy4vc2hhcmVkJztcbmltcG9ydCB7IGdldEZhbGxiYWNrc0xvYWRlcnMgfSBmcm9tICcuL2dldC1mYWxsYmFja3MtbG9hZGVycyc7XG5pbXBvcnQgeyByZXNvbHZlTG9hZGVyIH0gZnJvbSAnLi9yZXNvbHZlLWxvYWRlcic7XG5cbmxldCBzZXJ2aWNlOiBUcmFuc2xvY29TZXJ2aWNlO1xuXG5leHBvcnQgZnVuY3Rpb24gdHJhbnNsYXRlPFQgPSBhbnk+KGtleTogVHJhbnNsYXRlUGFyYW1zLCBwYXJhbXM6IEhhc2hNYXAgPSB7fSwgbGFuZz86IHN0cmluZyk6IFQge1xuICByZXR1cm4gc2VydmljZS50cmFuc2xhdGUoa2V5LCBwYXJhbXMsIGxhbmcpO1xufVxuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIFRyYW5zbG9jb1NlcnZpY2UgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBwcml2YXRlIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICBwcml2YXRlIHRyYW5zbGF0aW9ucyA9IG5ldyBNYXA8c3RyaW5nLCBUcmFuc2xhdGlvbj4oKTtcbiAgcHJpdmF0ZSBjYWNoZSA9IG5ldyBNYXA8c3RyaW5nLCBPYnNlcnZhYmxlPFRyYW5zbGF0aW9uPj4oKTtcbiAgcHJpdmF0ZSBmaXJzdEZhbGxiYWNrTGFuZzogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgZGVmYXVsdExhbmc6IHN0cmluZztcbiAgcHJpdmF0ZSBtZXJnZWRDb25maWc6IFRyYW5zbG9jb0NvbmZpZztcbiAgcHJpdmF0ZSBhdmFpbGFibGVMYW5nczogQXZhaWxhYmxlTGFuZ3MgPSBbXTtcbiAgcHJpdmF0ZSBpc1Jlc29sdmVkTWlzc2luZ09uY2UgPSBmYWxzZTtcbiAgcHJpdmF0ZSBsYW5nOiBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPjtcbiAgbGFuZ0NoYW5nZXMkOiBPYnNlcnZhYmxlPHN0cmluZz47XG5cbiAgcHJpdmF0ZSBldmVudHMgPSBuZXcgU3ViamVjdDxUcmFuc2xvY29FdmVudHM+KCk7XG4gIGV2ZW50cyQgPSB0aGlzLmV2ZW50cy5hc09ic2VydmFibGUoKTtcblxuICBwcml2YXRlIGZhaWxlZENvdW50ZXIgPSAwO1xuICBwcml2YXRlIGZhaWxlZExhbmdzID0gbmV3IFNldDxzdHJpbmc+KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChUUkFOU0xPQ09fTE9BREVSKSBwcml2YXRlIGxvYWRlcjogVHJhbnNsb2NvTG9hZGVyLFxuICAgIEBJbmplY3QoVFJBTlNMT0NPX1RSQU5TUElMRVIpIHByaXZhdGUgcGFyc2VyOiBUcmFuc2xvY29UcmFuc3BpbGVyLFxuICAgIEBJbmplY3QoVFJBTlNMT0NPX01JU1NJTkdfSEFORExFUikgcHJpdmF0ZSBtaXNzaW5nSGFuZGxlcjogVHJhbnNsb2NvTWlzc2luZ0hhbmRsZXIsXG4gICAgQEluamVjdChUUkFOU0xPQ09fSU5URVJDRVBUT1IpIHByaXZhdGUgaW50ZXJjZXB0b3I6IFRyYW5zbG9jb0ludGVyY2VwdG9yLFxuICAgIEBJbmplY3QoVFJBTlNMT0NPX0NPTkZJRykgcHJpdmF0ZSB1c2VyQ29uZmlnOiBUcmFuc2xvY29Db25maWcsXG4gICAgQEluamVjdChUUkFOU0xPQ09fRkFMTEJBQ0tfU1RSQVRFR1kpIHByaXZhdGUgZmFsbGJhY2tTdHJhdGVneTogVHJhbnNsb2NvRmFsbGJhY2tTdHJhdGVneVxuICApIHtcbiAgICBpZighdGhpcy5sb2FkZXIpIHtcbiAgICAgIHRoaXMubG9hZGVyID0gbmV3IERlZmF1bHRMb2FkZXIodGhpcy50cmFuc2xhdGlvbnMpO1xuICAgIH1cbiAgICBzZXJ2aWNlID0gdGhpcztcbiAgICB0aGlzLm1lcmdlZENvbmZpZyA9IG1lcmdlQ29uZmlnKGRlZmF1bHRDb25maWcsIHVzZXJDb25maWcpO1xuXG4gICAgdGhpcy5zZXRBdmFpbGFibGVMYW5ncyh0aGlzLm1lcmdlZENvbmZpZy5hdmFpbGFibGVMYW5ncyk7XG4gICAgdGhpcy5zZXRGYWxsYmFja0xhbmdGb3JNaXNzaW5nVHJhbnNsYXRpb24odGhpcy5tZXJnZWRDb25maWcpO1xuICAgIHRoaXMuc2V0RGVmYXVsdExhbmcodGhpcy5tZXJnZWRDb25maWcuZGVmYXVsdExhbmcpO1xuICAgIHRoaXMubGFuZyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPih0aGlzLmdldERlZmF1bHRMYW5nKCkpO1xuICAgIC8vIERvbid0IHVzZSBkaXN0aW5jdFVudGlsQ2hhbmdlZCBhcyB3ZSBuZWVkIHRoZSBhYmlsaXR5IHRvIHVwZGF0ZVxuICAgIC8vIHRoZSB2YWx1ZSB3aGVuIHVzaW5nIHNldFRyYW5zbGF0aW9uIG9yIHNldFRyYW5zbGF0aW9uS2V5c1xuICAgIHRoaXMubGFuZ0NoYW5nZXMkID0gdGhpcy5sYW5nLmFzT2JzZXJ2YWJsZSgpO1xuXG4gICAgLyoqXG4gICAgICogV2hlbiB3ZSBoYXZlIGEgZmFpbHVyZSwgd2Ugd2FudCB0byBkZWZpbmUgdGhlIG5leHQgbGFuZ3VhZ2UgdGhhdCBzdWNjZWVkZWQgYXMgdGhlIGFjdGl2ZVxuICAgICAqL1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gdGhpcy5ldmVudHMkLnN1YnNjcmliZShlID0+IHtcbiAgICAgIGlmKGUudHlwZSA9PT0gJ3RyYW5zbGF0aW9uTG9hZFN1Y2Nlc3MnICYmIGUud2FzRmFpbHVyZSkge1xuICAgICAgICAvLyBIYW5kbGUgc2NvcGVkIGxhbmdcbiAgICAgICAgY29uc3QgbGFuZyA9IGdldExhbmdGcm9tU2NvcGUoZS5wYXlsb2FkLmxhbmcpO1xuICAgICAgICB0aGlzLnNldEFjdGl2ZUxhbmcobGFuZyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBnZXQgY29uZmlnKCk6IFRyYW5zbG9jb0NvbmZpZyB7XG4gICAgcmV0dXJuIHRoaXMubWVyZ2VkQ29uZmlnO1xuICB9XG5cbiAgZ2V0RGVmYXVsdExhbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGVmYXVsdExhbmc7XG4gIH1cblxuICBzZXREZWZhdWx0TGFuZyhsYW5nOiBzdHJpbmcpIHtcbiAgICB0aGlzLmRlZmF1bHRMYW5nID0gbGFuZztcbiAgfVxuXG4gIGdldEFjdGl2ZUxhbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubGFuZy5nZXRWYWx1ZSgpO1xuICB9XG5cbiAgc2V0QWN0aXZlTGFuZyhsYW5nOiBzdHJpbmcpIHtcbiAgICB0aGlzLmxhbmcubmV4dChsYW5nKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHNldEF2YWlsYWJsZUxhbmdzKGxhbmdzOiBBdmFpbGFibGVMYW5ncykge1xuICAgIHRoaXMuYXZhaWxhYmxlTGFuZ3MgPSBsYW5ncztcbiAgfVxuXG4gIGdldEF2YWlsYWJsZUxhbmdzKCkge1xuICAgIHJldHVybiB0aGlzLmF2YWlsYWJsZUxhbmdzO1xuICB9XG5cbiAgbG9hZChwYXRoOiBzdHJpbmcsIG9wdGlvbnM6IExvYWRPcHRpb25zID0ge30pOiBPYnNlcnZhYmxlPFRyYW5zbGF0aW9uPiB7XG4gICAgaWYodGhpcy5jYWNoZS5oYXMocGF0aCkgPT09IGZhbHNlKSB7XG4gICAgICBsZXQgbG9hZFRyYW5zbGF0aW9uOiBPYnNlcnZhYmxlPFRyYW5zbGF0aW9uIHwgeyB0cmFuc2xhdGlvbjogVHJhbnNsYXRpb247IGxhbmc6IHN0cmluZyB9W10+O1xuXG4gICAgICBpZih0aGlzLnVzZUZhbGxiYWNrVHJhbnNsYXRpb24ocGF0aCkpIHtcbiAgICAgICAgLy8gaWYgdGhlIHBhdGggaXMgc2NvcGUgdGhlIGZhbGxiYWNrIHNob3VsZCBiZSBgc2NvcGUvZmFsbGJhY2tMYW5nYDtcbiAgICAgICAgY29uc3QgZmFsbGJhY2sgPSB0aGlzLl9pc0xhbmdTY29wZWQocGF0aClcbiAgICAgICAgICA/IGAke2dldFNjb3BlRnJvbUxhbmcocGF0aCl9LyR7dGhpcy5maXJzdEZhbGxiYWNrTGFuZ31gXG4gICAgICAgICAgOiB0aGlzLmZpcnN0RmFsbGJhY2tMYW5nO1xuXG4gICAgICAgIGNvbnN0IGxvYWRlcnMgPSBnZXRGYWxsYmFja3NMb2FkZXJzKHBhdGgsIGZhbGxiYWNrLCB0aGlzLmxvYWRlciwgb3B0aW9ucy5pbmxpbmVMb2FkZXIpO1xuICAgICAgICBsb2FkVHJhbnNsYXRpb24gPSBmb3JrSm9pbihsb2FkZXJzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGxvYWRlciA9IHJlc29sdmVMb2FkZXIocGF0aCwgdGhpcy5sb2FkZXIsIG9wdGlvbnMuaW5saW5lTG9hZGVyKTtcbiAgICAgICAgbG9hZFRyYW5zbGF0aW9uID0gZnJvbShsb2FkZXIpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBsb2FkJCA9IGxvYWRUcmFuc2xhdGlvbi5waXBlKFxuICAgICAgICByZXRyeSh0aGlzLmNvbmZpZy5mYWlsZWRSZXRyaWVzKSxcbiAgICAgICAgY2F0Y2hFcnJvcigoKSA9PiB0aGlzLmhhbmRsZUZhaWx1cmUocGF0aCwgb3B0aW9ucykpLFxuICAgICAgICB0YXAodHJhbnNsYXRpb24gPT4ge1xuICAgICAgICAgIGlmKEFycmF5LmlzQXJyYXkodHJhbnNsYXRpb24pKSB7XG4gICAgICAgICAgICB0cmFuc2xhdGlvbi5mb3JFYWNoKHQgPT4ge1xuICAgICAgICAgICAgICB0aGlzLmhhbmRsZVN1Y2Nlc3ModC5sYW5nLCB0LnRyYW5zbGF0aW9uKTtcbiAgICAgICAgICAgICAgLy8gU2F2ZSB0aGUgZmFsbGJhY2sgaW4gY2FjaGUgc28gd2UnbGwgbm90IGNyZWF0ZSBhIHJlZHVuZGFudCByZXF1ZXN0XG4gICAgICAgICAgICAgIGlmKHQubGFuZyAhPT0gcGF0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2FjaGUuc2V0KHQubGFuZywgb2Yoe30pKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuaGFuZGxlU3VjY2VzcyhwYXRoLCB0cmFuc2xhdGlvbik7XG4gICAgICAgIH0pLFxuICAgICAgICBzaGFyZVJlcGxheSgxKVxuICAgICAgKTtcblxuICAgICAgdGhpcy5jYWNoZS5zZXQocGF0aCwgbG9hZCQpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmNhY2hlLmdldChwYXRoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBpbnN0YW50IHRyYW5zbGF0ZWQgdmFsdWUgb2YgYSBrZXlcbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogdHJhbnNsYXRlPHN0cmluZz4oJ2hlbGxvJylcbiAgICogdHJhbnNsYXRlKCdoZWxsbycsIHsgdmFsdWU6ICd2YWx1ZScgfSlcbiAgICogdHJhbnNsYXRlPHN0cmluZ1tdPihbJ2hlbGxvJywgJ2tleSddKVxuICAgKiB0cmFuc2xhdGUoJ2hlbGxvJywgeyB9LCAnZW4nKVxuICAgKiB0cmFuc2xhdGUoJ3Njb3BlLnNvbWVLZXknLCB7IH0sICdlbicpXG4gICAqL1xuICB0cmFuc2xhdGU8VCA9IGFueT4oa2V5OiBUcmFuc2xhdGVQYXJhbXMsIHBhcmFtczogSGFzaE1hcCA9IHt9LCBsYW5nID0gdGhpcy5nZXRBY3RpdmVMYW5nKCkpOiBUIHtcbiAgICBsZXQgcmVzb2x2ZUxhbmcgPSBsYW5nO1xuICAgIGxldCBzY29wZTtcblxuICAgIC8vIElmIGxhbmcgaXMgc2NvcGUgd2UgbmVlZCB0byBjaGVjayB0aGUgZm9sbG93aW5nIGNhc2VzOlxuICAgIC8vIHRvZG9zL2VzID0+IGluIHRoaXMgY2FzZSB3ZSBzaG91bGQgdGFrZSBgZXNgIGFzIGxhbmdcbiAgICAvLyB0b2RvcyA9PiBpbiB0aGlzIGNhc2Ugd2Ugc2hvdWxkIHNldCB0aGUgYWN0aXZlIGxhbmcgYXMgbGFuZ1xuICAgIGlmKHRoaXMuX2lzTGFuZ1Njb3BlZChsYW5nKSkge1xuICAgICAgLy8gZW4gZm9yIGV4YW1wbGVcbiAgICAgIGNvbnN0IGxhbmdGcm9tU2NvcGUgPSBnZXRMYW5nRnJvbVNjb3BlKGxhbmcpO1xuICAgICAgLy8gZW4gaXMgbGFuZ1xuICAgICAgY29uc3QgaGFzTGFuZyA9IHRoaXMuX2lzTGFuZyhsYW5nRnJvbVNjb3BlKTtcbiAgICAgIC8vIHRha2UgZW5cbiAgICAgIHJlc29sdmVMYW5nID0gaGFzTGFuZyA/IGxhbmdGcm9tU2NvcGUgOiB0aGlzLmdldEFjdGl2ZUxhbmcoKTtcbiAgICAgIC8vIGZpbmQgdGhlIHNjb3BlXG4gICAgICBzY29wZSA9IHRoaXMuZ2V0TWFwcGVkU2NvcGUoaGFzTGFuZyA/IGdldFNjb3BlRnJvbUxhbmcobGFuZykgOiBsYW5nKTtcbiAgICB9XG5cbiAgICBpZihBcnJheS5pc0FycmF5KGtleSkpIHtcbiAgICAgIHJldHVybiBrZXkubWFwKGsgPT4gdGhpcy50cmFuc2xhdGUoc2NvcGUgPyBgJHtzY29wZX0uJHtrfWAgOiBrLCBwYXJhbXMsIHJlc29sdmVMYW5nKSkgYXMgYW55O1xuICAgIH1cblxuICAgIGtleSA9IHNjb3BlID8gYCR7c2NvcGV9LiR7a2V5fWAgOiBrZXk7XG5cbiAgICBpZigha2V5KSB7XG4gICAgICByZXR1cm4gdGhpcy5taXNzaW5nSGFuZGxlci5oYW5kbGUoa2V5LCB0aGlzLmNvbmZpZyk7XG4gICAgfVxuXG4gICAgY29uc3QgdHJhbnNsYXRpb24gPSB0aGlzLmdldFRyYW5zbGF0aW9uKHJlc29sdmVMYW5nKTtcbiAgICBjb25zdCB2YWx1ZSA9IHRyYW5zbGF0aW9uW2tleV07XG5cbiAgICBpZighdmFsdWUpIHtcbiAgICAgIHJldHVybiB0aGlzLmhhbmRsZU1pc3NpbmdLZXkoa2V5LCB2YWx1ZSwgcGFyYW1zKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5wYXJzZXIudHJhbnNwaWxlKHZhbHVlLCBwYXJhbXMsIHRyYW5zbGF0aW9uKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSB0cmFuc2xhdGVkIHZhbHVlIG9mIGEga2V5IGFzIG9ic2VydmFibGVcbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogc2VsZWN0VHJhbnNsYXRlPHN0cmluZz4oJ2hlbGxvJykuc3Vic2NyaWJlKHZhbHVlID0+IC4uLilcbiAgICogc2VsZWN0VHJhbnNsYXRlPHN0cmluZz4oJ2hlbGxvJywge30sICdlcycpLnN1YnNjcmliZSh2YWx1ZSA9PiAuLi4pXG4gICAqIHNlbGVjdFRyYW5zbGF0ZTxzdHJpbmc+KCdoZWxsbycsIHt9LCAndG9kb3MnKS5zdWJzY3JpYmUodmFsdWUgPT4gLi4uKVxuICAgKlxuICAgKi9cbiAgc2VsZWN0VHJhbnNsYXRlPFQgPSBhbnk+KGtleTogVHJhbnNsYXRlUGFyYW1zLCBwYXJhbXM/OiBIYXNoTWFwLCBsYW5nPzogc3RyaW5nLCBfaXNPYmplY3QgPSBmYWxzZSk6IE9ic2VydmFibGU8VD4ge1xuICAgIGNvbnN0IGxvYWQgPSBsYW5nID0+XG4gICAgICB0aGlzLmxvYWQobGFuZykucGlwZShcbiAgICAgICAgbWFwKCgpID0+IChfaXNPYmplY3QgPyB0aGlzLnRyYW5zbGF0ZU9iamVjdChrZXksIHBhcmFtcywgbGFuZykgOiB0aGlzLnRyYW5zbGF0ZShrZXksIHBhcmFtcywgbGFuZykpKVxuICAgICAgKTtcbiAgICBpZihpc1N0cmluZyhsYW5nKSkge1xuICAgICAgY29uc3QgbGFuZ09yU2NvcGUgPSB0aGlzLl9jb21wbGV0ZVNjb3BlV2l0aExhbmcobGFuZyk7XG4gICAgICByZXR1cm4gbG9hZChsYW5nT3JTY29wZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGlmIHRoZSB1c2VyIGRvZXNuJ3QgcGFzcyBsYW5nLCB3ZSBuZWVkIHRvIGxpc3RlbiB0byBsYW5nIGNoYW5nZXMgYW5kIHVwZGF0ZSB0aGUgdmFsdWUgYWNjb3JkaW5nbHlcbiAgICAgIHJldHVybiB0aGlzLmxhbmdDaGFuZ2VzJC5waXBlKHN3aXRjaE1hcChsYW5nID0+IGxvYWQobGFuZykpKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVHJhbnNsYXRlIHRoZSBnaXZlbiBwYXRoIHRoYXQgcmV0dXJucyBhbiBvYmplY3RcbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogc2VydmljZS50cmFuc2xhdGVPYmplY3QoJ3BhdGgudG8ub2JqZWN0JywgeydzdWJwYXRoJzogeyB2YWx1ZTogJ3NvbWVWYWx1ZSd9fSkgPT4gcmV0dXJucyB0cmFuc2xhdGVkIG9iamVjdFxuICAgKlxuICAgKi9cbiAgdHJhbnNsYXRlT2JqZWN0PFQgPSBhbnk+KGtleTogVHJhbnNsYXRlUGFyYW1zLCBwYXJhbXM/OiBIYXNoTWFwLCBsYW5nID0gdGhpcy5nZXRBY3RpdmVMYW5nKCkpOiBUIHtcbiAgICBpZihBcnJheS5pc0FycmF5KGtleSkpIHtcbiAgICAgIHJldHVybiBrZXkubWFwKGsgPT4gdGhpcy50cmFuc2xhdGVPYmplY3QoaywgcGFyYW1zLCBsYW5nKSkgYXMgYW55O1xuICAgIH1cblxuICAgIGNvbnN0IHRyYW5zbGF0aW9uID0gdGhpcy5nZXRUcmFuc2xhdGlvbihsYW5nKTtcbiAgICAvLyBUT0RPOiBvcHRpbWl6ZSBpdCAod2UgY2FuIGJ1aWxkIHRoaXMgc3BlY2lmaWMgb2JqZWN0KVxuICAgIGNvbnN0IHZhbHVlID0gZ2V0VmFsdWUodW5mbGF0dGVuKHRyYW5zbGF0aW9uKSwga2V5KTtcbiAgICByZXR1cm4gdGhpcy5wYXJzZXIudHJhbnNwaWxlKHZhbHVlLCBwYXJhbXMsIHRyYW5zbGF0aW9uKTtcbiAgfVxuXG4gIHNlbGVjdFRyYW5zbGF0ZU9iamVjdDxUID0gYW55PihrZXk6IFRyYW5zbGF0ZVBhcmFtcywgcGFyYW1zPzogSGFzaE1hcCwgbGFuZz86IHN0cmluZyk6IE9ic2VydmFibGU8VD4ge1xuICAgIHJldHVybiB0aGlzLnNlbGVjdFRyYW5zbGF0ZShrZXksIHBhcmFtcywgbGFuZywgdHJ1ZSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhbiBvYmplY3Qgb2YgdHJhbnNsYXRpb25zIGZvciBhIGdpdmVuIGxhbmd1YWdlXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIGdldFRyYW5zbGF0aW9uKClcbiAgICogZ2V0VHJhbnNsYXRpb24oJ2VuJylcbiAgICogZ2V0VHJhbnNsYXRpb24oJ2FkbWluLXBhZ2UvZW4nKVxuICAgKi9cbiAgZ2V0VHJhbnNsYXRpb24oKTogTWFwPHN0cmluZywgVHJhbnNsYXRpb24+O1xuICBnZXRUcmFuc2xhdGlvbihsYW5nOiBzdHJpbmcpOiBUcmFuc2xhdGlvbjtcbiAgZ2V0VHJhbnNsYXRpb24obGFuZz86IHN0cmluZyk6IE1hcDxzdHJpbmcsIFRyYW5zbGF0aW9uPiB8IFRyYW5zbGF0aW9uIHtcbiAgICByZXR1cm4gbGFuZyA/IHRoaXMudHJhbnNsYXRpb25zLmdldChsYW5nKSB8fCB7fSA6IHRoaXMudHJhbnNsYXRpb25zO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgYW4gb2JqZWN0IG9mIHRyYW5zbGF0aW9ucyBmb3IgYSBnaXZlbiBsYW5ndWFnZVxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiBzZWxlY3RUcmFuc2xhdGlvbigpLnN1YnNjcmliZSgpXG4gICAqIHNlbGVjdFRyYW5zbGF0aW9uKCdlcycpLnN1YnNjcmliZSgpXG4gICAqL1xuICBzZWxlY3RUcmFuc2xhdGlvbihsYW5nPzogc3RyaW5nKTogT2JzZXJ2YWJsZTxUcmFuc2xhdGlvbj4ge1xuICAgIGNvbnN0IGxhbmd1YWdlID0gbGFuZyB8fCB0aGlzLmdldEFjdGl2ZUxhbmcoKTtcbiAgICByZXR1cm4gdGhpcy5sb2FkKGxhbmd1YWdlKS5waXBlKG1hcCgoKSA9PiB0aGlzLmdldFRyYW5zbGF0aW9uKGxhbmd1YWdlKSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgb3IgbWVyZ2UgYSBnaXZlbiB0cmFuc2xhdGlvbiBvYmplY3QgdG8gY3VycmVudCBsYW5nXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIHNldFRyYW5zbGF0aW9uKHsgLi4uIH0pXG4gICAqIHNldFRyYW5zbGF0aW9uKHsgLi4uIH0sICdlbicpXG4gICAqIHNldFRyYW5zbGF0aW9uKHsgLi4uIH0sICdlcycsIHsgbWVyZ2U6IGZhbHNlIH0gKVxuICAgKiBzZXRUcmFuc2xhdGlvbih7IC4uLiB9LCAndG9kb3MvZW4nLCB7IG1lcmdlOiBmYWxzZSB9IClcbiAgICovXG4gIHNldFRyYW5zbGF0aW9uKHRyYW5zbGF0aW9uOiBUcmFuc2xhdGlvbiwgbGFuZyA9IHRoaXMuZ2V0QWN0aXZlTGFuZygpLCBvcHRpb25zOiBTZXRUcmFuc2xhdGlvbk9wdGlvbnMgPSB7fSkge1xuICAgIGNvbnN0IGRlZmF1bHRzID0geyBtZXJnZTogdHJ1ZSwgZW1pdENoYW5nZTogdHJ1ZSB9O1xuICAgIGNvbnN0IG1lcmdlZE9wdGlvbnMgPSB7IC4uLmRlZmF1bHRzLCAuLi5vcHRpb25zIH07XG4gICAgY29uc3Qgc2NvcGUgPSBnZXRTY29wZUZyb21MYW5nKGxhbmcpO1xuXG4gICAgLyoqXG4gICAgICogSWYgdGhpcyBpc24ndCBhIHNjb3BlIHdlIHVzZSB0aGUgd2hvbGUgdHJhbnNsYXRpb24gYXMgaXNcbiAgICAgKiBvdGhlcndpc2Ugd2UgbmVlZCB0byBmbGF0IHRoZSBzY29wZSBhbmQgdXNlIGl0XG4gICAgICovXG4gICAgbGV0IGZsYXR0ZW5TY29wZU9yVHJhbnNsYXRpb24gPSB0cmFuc2xhdGlvbjtcblxuICAgIC8vIE1lcmdlZCB0aGUgc2NvcGVkIGxhbmd1YWdlIGludG8gdGhlIGFjdGl2ZSBsYW5ndWFnZVxuICAgIGlmKHNjb3BlKSB7XG4gICAgICBjb25zdCBrZXkgPSB0aGlzLmdldE1hcHBlZFNjb3BlKHNjb3BlKTtcbiAgICAgIGZsYXR0ZW5TY29wZU9yVHJhbnNsYXRpb24gPSBmbGF0dGVuKHsgW2tleV06IHRyYW5zbGF0aW9uIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IGN1cnJlbnRMYW5nID0gc2NvcGUgPyBnZXRMYW5nRnJvbVNjb3BlKGxhbmcpIDogbGFuZztcblxuICAgIGNvbnN0IG1lcmdlZFRyYW5zbGF0aW9uID0ge1xuICAgICAgLi4uKG1lcmdlZE9wdGlvbnMubWVyZ2UgJiYgdGhpcy5nZXRUcmFuc2xhdGlvbihjdXJyZW50TGFuZykpLFxuICAgICAgLi4uZmxhdHRlblNjb3BlT3JUcmFuc2xhdGlvblxuICAgIH07XG5cbiAgICBjb25zdCB3aXRoSG9vayA9IHRoaXMuaW50ZXJjZXB0b3IucHJlU2F2ZVRyYW5zbGF0aW9uKG1lcmdlZFRyYW5zbGF0aW9uLCBjdXJyZW50TGFuZyk7XG4gICAgY29uc3QgZmxhdHRlblRyYW5zbGF0aW9uID0gdGhpcy5tZXJnZWRDb25maWcuZmxhdHRlbi5hb3QgPyB3aXRoSG9vayA6IGZsYXR0ZW4od2l0aEhvb2spO1xuXG4gICAgdGhpcy50cmFuc2xhdGlvbnMuc2V0KGN1cnJlbnRMYW5nLCBmbGF0dGVuVHJhbnNsYXRpb24pO1xuICAgIG1lcmdlZE9wdGlvbnMuZW1pdENoYW5nZSAmJiB0aGlzLnNldEFjdGl2ZUxhbmcodGhpcy5nZXRBY3RpdmVMYW5nKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdHJhbnNsYXRpb24ga2V5IHdpdGggZ2l2ZW4gdmFsdWVcbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogc2V0VHJhbnNsYXRpb25LZXkoJ2tleScsICd2YWx1ZScpXG4gICAqIHNldFRyYW5zbGF0aW9uS2V5KCdrZXkubmVzdGVkJywgJ3ZhbHVlJylcbiAgICogc2V0VHJhbnNsYXRpb25LZXkoJ2tleS5uZXN0ZWQnLCAndmFsdWUnLCAnZW4nKVxuICAgKi9cbiAgc2V0VHJhbnNsYXRpb25LZXkoa2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcsIGxhbmcgPSB0aGlzLmdldEFjdGl2ZUxhbmcoKSkge1xuICAgIGNvbnN0IHdpdGhIb29rID0gdGhpcy5pbnRlcmNlcHRvci5wcmVTYXZlVHJhbnNsYXRpb25LZXkoa2V5LCB2YWx1ZSwgbGFuZyk7XG4gICAgY29uc3QgbmV3VmFsdWUgPSB7XG4gICAgICAuLi50aGlzLmdldFRyYW5zbGF0aW9uKGxhbmcpLFxuICAgICAgW2tleV06IHdpdGhIb29rXG4gICAgfTtcbiAgICB0aGlzLnNldFRyYW5zbGF0aW9uKG5ld1ZhbHVlLCBsYW5nKTtcbiAgfVxuXG4gIGhhbmRsZU1pc3NpbmdLZXkoa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnksIHBhcmFtcz86IEhhc2hNYXApIHtcbiAgICBpZih0aGlzLmNvbmZpZy5taXNzaW5nSGFuZGxlci5hbGxvd0VtcHR5ICYmIHZhbHVlID09PSAnJykge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICAgIGlmKHRoaXMudXNlRmFsbGJhY2tUcmFuc2xhdGlvbigpICYmICF0aGlzLmlzUmVzb2x2ZWRNaXNzaW5nT25jZSkge1xuICAgICAgdGhpcy5pc1Jlc29sdmVkTWlzc2luZ09uY2UgPSB0cnVlO1xuICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLnRyYW5zbGF0ZShrZXksIHBhcmFtcywgdGhpcy5maXJzdEZhbGxiYWNrTGFuZyk7XG4gICAgICB0aGlzLmlzUmVzb2x2ZWRNaXNzaW5nT25jZSA9IGZhbHNlO1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLm1pc3NpbmdIYW5kbGVyLmhhbmRsZShrZXksIHRoaXMuY29uZmlnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIF9pc0xhbmdTY29wZWQobGFuZzogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0QXZhaWxhYmxlTGFuZ3NJZHMoKS5pbmRleE9mKGxhbmcpID09PSAtMTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIF9pc0xhbmcobGFuZzogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0QXZhaWxhYmxlTGFuZ3NJZHMoKS5pbmRleE9mKGxhbmcpICE9PSAtMTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAaW50ZXJuYWxcbiAgICpcbiAgICogV2UgYWx3YXlzIHdhbnQgdG8gbWFrZSBzdXJlIHRoZSBnbG9iYWwgbGFuZyBpcyBsb2FkZWRcbiAgICogYmVmb3JlIGxvYWRpbmcgdGhlIHNjb3BlIHNpbmNlIHlvdSBjYW4gYWNjZXNzIGJvdGggdmlhIHRoZSBwaXBlL2RpcmVjdGl2ZS5cbiAgICovXG4gIF9sb2FkRGVwZW5kZW5jaWVzKHBhdGg6IHN0cmluZywgaW5saW5lTG9hZGVyPzogSW5saW5lTG9hZGVyKTogT2JzZXJ2YWJsZTxUcmFuc2xhdGlvbiB8IFRyYW5zbGF0aW9uW10+IHtcbiAgICBjb25zdCBtYWluTGFuZyA9IGdldExhbmdGcm9tU2NvcGUocGF0aCk7XG5cbiAgICBpZih0aGlzLl9pc0xhbmdTY29wZWQocGF0aCkgJiYgIXRoaXMuaXNMb2FkZWRUcmFuc2xhdGlvbihtYWluTGFuZykpIHtcbiAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KHRoaXMubG9hZChtYWluTGFuZyksIHRoaXMubG9hZChwYXRoLCB7IGlubGluZUxvYWRlciB9KSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMubG9hZChwYXRoLCB7IGlubGluZUxvYWRlciB9KTtcbiAgfVxuXG4gIHByaXZhdGUgaXNMb2FkZWRUcmFuc2xhdGlvbihsYW5nOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gc2l6ZSh0aGlzLmdldFRyYW5zbGF0aW9uKGxhbmcpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIF9jb21wbGV0ZVNjb3BlV2l0aExhbmcobGFuZ09yU2NvcGU6IHN0cmluZykge1xuICAgIGlmKHRoaXMuX2lzTGFuZ1Njb3BlZChsYW5nT3JTY29wZSkgJiYgIXRoaXMuX2lzTGFuZyhnZXRMYW5nRnJvbVNjb3BlKGxhbmdPclNjb3BlKSkpIHtcbiAgICAgIHJldHVybiBgJHtsYW5nT3JTY29wZX0vJHt0aGlzLmdldEFjdGl2ZUxhbmcoKX1gO1xuICAgIH1cbiAgICByZXR1cm4gbGFuZ09yU2NvcGU7XG4gIH1cblxuICAvKipcbiAgICogQGludGVybmFsXG4gICAqL1xuICBfc2V0U2NvcGVBbGlhcyhzY29wZTogc3RyaW5nLCBhbGlhczogc3RyaW5nKSB7XG4gICAgaWYoIXRoaXMubWVyZ2VkQ29uZmlnLnNjb3BlTWFwcGluZykge1xuICAgICAgdGhpcy5tZXJnZWRDb25maWcuc2NvcGVNYXBwaW5nID0ge307XG4gICAgfVxuICAgIHRoaXMubWVyZ2VkQ29uZmlnLnNjb3BlTWFwcGluZ1tzY29wZV0gPSBhbGlhcztcbiAgfVxuXG4gIHByaXZhdGUgZ2V0QXZhaWxhYmxlTGFuZ3NJZHMoKTogc3RyaW5nW10ge1xuICAgIGNvbnN0IGZpcnN0ID0gdGhpcy5nZXRBdmFpbGFibGVMYW5ncygpWzBdO1xuXG4gICAgaWYoaXNTdHJpbmcoZmlyc3QpKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRBdmFpbGFibGVMYW5ncygpIGFzIHN0cmluZ1tdO1xuICAgIH1cblxuICAgIHJldHVybiAodGhpcy5nZXRBdmFpbGFibGVMYW5ncygpIGFzIHsgaWQ6IHN0cmluZyB9W10pLm1hcChsID0+IGwuaWQpO1xuICB9XG5cbiAgcHJpdmF0ZSB1c2VGYWxsYmFja1RyYW5zbGF0aW9uKGxhbmc/OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5jb25maWcubWlzc2luZ0hhbmRsZXIudXNlRmFsbGJhY2tUcmFuc2xhdGlvbiAmJiBsYW5nICE9PSB0aGlzLmZpcnN0RmFsbGJhY2tMYW5nO1xuICB9XG5cbiAgcHJpdmF0ZSBoYW5kbGVTdWNjZXNzKGxhbmc6IHN0cmluZywgdHJhbnNsYXRpb246IFRyYW5zbGF0aW9uKSB7XG4gICAgdGhpcy5zZXRUcmFuc2xhdGlvbih0cmFuc2xhdGlvbiwgbGFuZywgeyBlbWl0Q2hhbmdlOiBmYWxzZSB9KTtcbiAgICBpZih0aGlzLmZhaWxlZExhbmdzLmhhcyhsYW5nKSA9PT0gZmFsc2UpIHtcbiAgICAgIHRoaXMuZXZlbnRzLm5leHQoe1xuICAgICAgICB3YXNGYWlsdXJlOiAhIXRoaXMuZmFpbGVkTGFuZ3Muc2l6ZSxcbiAgICAgICAgdHlwZTogJ3RyYW5zbGF0aW9uTG9hZFN1Y2Nlc3MnLFxuICAgICAgICBwYXlsb2FkOiB7XG4gICAgICAgICAgbGFuZ1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5mYWlsZWRDb3VudGVyID0gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jYWNoZS5kZWxldGUobGFuZyk7XG4gICAgICB0aGlzLmZhaWxlZExhbmdzLmRlbGV0ZShsYW5nKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGhhbmRsZUZhaWx1cmUobGFuZzogc3RyaW5nLCBtZXJnZWRPcHRpb25zKSB7XG4gICAgY29uc3Qgc3BsaXR0ZWQgPSBsYW5nLnNwbGl0KCcvJyk7XG5cbiAgICB0aGlzLmZhaWxlZExhbmdzLmFkZChsYW5nKTtcbiAgICBjb25zdCBmYWxsYmFja3MgPSBtZXJnZWRPcHRpb25zLmZhbGxiYWNrTGFuZ3MgfHwgdGhpcy5mYWxsYmFja1N0cmF0ZWd5LmdldE5leHRMYW5ncyhsYW5nKTtcbiAgICBjb25zdCBuZXh0TGFuZyA9IGZhbGxiYWNrc1t0aGlzLmZhaWxlZENvdW50ZXJdO1xuXG4gICAgY29uc3QgaXNGYWxsYmFja0xhbmcgPSBuZXh0TGFuZyA9PT0gc3BsaXR0ZWRbc3BsaXR0ZWQubGVuZ3RoIC0gMV07XG5cbiAgICBpZighbmV4dExhbmcgfHwgaXNGYWxsYmFja0xhbmcpIHtcbiAgICAgIGxldCBtc2cgPSBgVW5hYmxlIHRvIGxvYWQgdHJhbnNsYXRpb24gYW5kIGFsbCB0aGUgZmFsbGJhY2sgbGFuZ3VhZ2VzYDtcbiAgICAgIGlmKHNwbGl0dGVkLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgbXNnICs9IGAsIGRpZCB5b3UgbWlzc3BlbGxlZCB0aGUgc2NvcGUgbmFtZT9gO1xuICAgICAgfVxuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IobXNnKTtcbiAgICB9XG5cbiAgICBsZXQgcmVzb2x2ZUxhbmcgPSBuZXh0TGFuZztcbiAgICAvLyBpZiBpdCdzIHNjb3BlZCBsYW5nXG4gICAgaWYoc3BsaXR0ZWQubGVuZ3RoID4gMSkge1xuICAgICAgLy8gV2UgbmVlZCB0byByZXNvbHZlIGl0IHRvOlxuICAgICAgLy8gdG9kb3MvbGFuZ05vdEV4aXN0cyA9PiB0b2Rvcy9uZXh0TGFuZ1xuICAgICAgc3BsaXR0ZWRbc3BsaXR0ZWQubGVuZ3RoIC0gMV0gPSBuZXh0TGFuZztcbiAgICAgIHJlc29sdmVMYW5nID0gc3BsaXR0ZWQuam9pbignLycpO1xuICAgIH1cblxuICAgIHRoaXMuZmFpbGVkQ291bnRlcisrO1xuICAgIHRoaXMuZXZlbnRzLm5leHQoe1xuICAgICAgdHlwZTogJ3RyYW5zbGF0aW9uTG9hZEZhaWx1cmUnLFxuICAgICAgcGF5bG9hZDoge1xuICAgICAgICBsYW5nXG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5sb2FkKHJlc29sdmVMYW5nKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0RmFsbGJhY2tMYW5nRm9yTWlzc2luZ1RyYW5zbGF0aW9uKHsgZmFsbGJhY2tMYW5nIH06IFRyYW5zbG9jb0NvbmZpZyk6IHZvaWQge1xuICAgIGlmKHRoaXMudXNlRmFsbGJhY2tUcmFuc2xhdGlvbiAmJiBmYWxsYmFja0xhbmcpIHtcbiAgICAgIHRoaXMuZmlyc3RGYWxsYmFja0xhbmcgPSBBcnJheS5pc0FycmF5KGZhbGxiYWNrTGFuZykgPyBmYWxsYmFja0xhbmdbMF0gOiBmYWxsYmFja0xhbmc7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0TWFwcGVkU2NvcGUoc2NvcGU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgY29uc3QgeyBzY29wZU1hcHBpbmcgPSB7fSB9ID0gdGhpcy5jb25maWc7XG4gICAgcmV0dXJuIHNjb3BlTWFwcGluZ1tzY29wZV0gfHwgdG9DYW1lbENhc2Uoc2NvcGUpO1xuICB9XG59XG4iXX0=