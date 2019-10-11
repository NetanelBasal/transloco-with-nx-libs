/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
var service;
/**
 * @template T
 * @param {?} key
 * @param {?=} params
 * @param {?=} lang
 * @return {?}
 */
export function translate(key, params, lang) {
    if (params === void 0) { params = {}; }
    return service.translate(key, params, lang);
}
var TranslocoService = /** @class */ (function () {
    function TranslocoService(loader, parser, missingHandler, interceptor, userConfig, fallbackStrategy) {
        var _this = this;
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
        function (e) {
            if (e.type === 'translationLoadSuccess' && e.wasFailure) {
                // Handle scoped lang
                /** @type {?} */
                var lang = getLangFromScope(e.payload.lang);
                _this.setActiveLang(lang);
            }
        }));
    }
    Object.defineProperty(TranslocoService.prototype, "config", {
        get: /**
         * @return {?}
         */
        function () {
            return this.mergedConfig;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    TranslocoService.prototype.getDefaultLang = /**
     * @return {?}
     */
    function () {
        return this.defaultLang;
    };
    /**
     * @param {?} lang
     * @return {?}
     */
    TranslocoService.prototype.setDefaultLang = /**
     * @param {?} lang
     * @return {?}
     */
    function (lang) {
        this.defaultLang = lang;
    };
    /**
     * @return {?}
     */
    TranslocoService.prototype.getActiveLang = /**
     * @return {?}
     */
    function () {
        return this.lang.getValue();
    };
    /**
     * @template THIS
     * @this {THIS}
     * @param {?} lang
     * @return {THIS}
     */
    TranslocoService.prototype.setActiveLang = /**
     * @template THIS
     * @this {THIS}
     * @param {?} lang
     * @return {THIS}
     */
    function (lang) {
        (/** @type {?} */ (this)).lang.next(lang);
        return (/** @type {?} */ (this));
    };
    /**
     * @param {?} langs
     * @return {?}
     */
    TranslocoService.prototype.setAvailableLangs = /**
     * @param {?} langs
     * @return {?}
     */
    function (langs) {
        this.availableLangs = langs;
    };
    /**
     * @return {?}
     */
    TranslocoService.prototype.getAvailableLangs = /**
     * @return {?}
     */
    function () {
        return this.availableLangs;
    };
    /**
     * @param {?} path
     * @param {?=} options
     * @return {?}
     */
    TranslocoService.prototype.load = /**
     * @param {?} path
     * @param {?=} options
     * @return {?}
     */
    function (path, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        if (this.cache.has(path) === false) {
            /** @type {?} */
            var loadTranslation = void 0;
            if (this.useFallbackTranslation(path)) {
                // if the path is scope the fallback should be `scope/fallbackLang`;
                /** @type {?} */
                var fallback = this._isLangScoped(path)
                    ? getScopeFromLang(path) + "/" + this.firstFallbackLang
                    : this.firstFallbackLang;
                /** @type {?} */
                var loaders = getFallbacksLoaders(path, fallback, this.loader, options.inlineLoader);
                loadTranslation = forkJoin(loaders);
            }
            else {
                /** @type {?} */
                var loader = resolveLoader(path, this.loader, options.inlineLoader);
                loadTranslation = from(loader);
            }
            /** @type {?} */
            var load$ = loadTranslation.pipe(retry(this.config.failedRetries), catchError((/**
             * @return {?}
             */
            function () { return _this.handleFailure(path, options); })), tap((/**
             * @param {?} translation
             * @return {?}
             */
            function (translation) {
                if (Array.isArray(translation)) {
                    translation.forEach((/**
                     * @param {?} t
                     * @return {?}
                     */
                    function (t) {
                        _this.handleSuccess(t.lang, t.translation);
                        // Save the fallback in cache so we'll not create a redundant request
                        if (t.lang !== path) {
                            _this.cache.set(t.lang, of({}));
                        }
                    }));
                    return;
                }
                _this.handleSuccess(path, translation);
            })), shareReplay(1));
            this.cache.set(path, load$);
        }
        return this.cache.get(path);
    };
    /**
     * Gets the instant translated value of a key
     *
     * @example
     *
     * translate<string>('hello')
     * translate('hello', { value: 'value' })
     * translate<string[]>(['hello', 'key'])
     * translate('hello', { }, 'en')
     * translate('scope.someKey', { }, 'en')
     */
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
    TranslocoService.prototype.translate = /**
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
    function (key, params, lang) {
        var _this = this;
        if (params === void 0) { params = {}; }
        if (lang === void 0) { lang = this.getActiveLang(); }
        /** @type {?} */
        var resolveLang = lang;
        /** @type {?} */
        var scope;
        // If lang is scope we need to check the following cases:
        // todos/es => in this case we should take `es` as lang
        // todos => in this case we should set the active lang as lang
        if (this._isLangScoped(lang)) {
            // en for example
            /** @type {?} */
            var langFromScope = getLangFromScope(lang);
            // en is lang
            /** @type {?} */
            var hasLang = this._isLang(langFromScope);
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
            function (k) { return _this.translate(scope ? scope + "." + k : k, params, resolveLang); }))));
        }
        key = scope ? scope + "." + key : key;
        if (!key) {
            return this.missingHandler.handle(key, this.config);
        }
        /** @type {?} */
        var translation = this.getTranslation(resolveLang);
        /** @type {?} */
        var value = translation[key];
        if (!value) {
            return this.handleMissingKey(key, value, params);
        }
        return this.parser.transpile(value, params, translation);
    };
    /**
     * Gets the translated value of a key as observable
     *
     * @example
     *
     * selectTranslate<string>('hello').subscribe(value => ...)
     * selectTranslate<string>('hello', {}, 'es').subscribe(value => ...)
     * selectTranslate<string>('hello', {}, 'todos').subscribe(value => ...)
     *
     */
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
    TranslocoService.prototype.selectTranslate = /**
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
    function (key, params, lang, _isObject) {
        var _this = this;
        if (_isObject === void 0) { _isObject = false; }
        /** @type {?} */
        var load = (/**
         * @param {?} lang
         * @return {?}
         */
        function (lang) {
            return _this.load(lang).pipe(map((/**
             * @return {?}
             */
            function () { return (_isObject ? _this.translateObject(key, params, lang) : _this.translate(key, params, lang)); })));
        });
        if (isString(lang)) {
            /** @type {?} */
            var langOrScope = this._completeScopeWithLang(lang);
            return load(langOrScope);
        }
        else {
            // if the user doesn't pass lang, we need to listen to lang changes and update the value accordingly
            return this.langChanges$.pipe(switchMap((/**
             * @param {?} lang
             * @return {?}
             */
            function (lang) { return load(lang); })));
        }
    };
    /**
     * Translate the given path that returns an object
     *
     * @example
     *
     * service.translateObject('path.to.object', {'subpath': { value: 'someValue'}}) => returns translated object
     *
     */
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
    TranslocoService.prototype.translateObject = /**
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
    function (key, params, lang) {
        var _this = this;
        if (lang === void 0) { lang = this.getActiveLang(); }
        if (Array.isArray(key)) {
            return (/** @type {?} */ (key.map((/**
             * @param {?} k
             * @return {?}
             */
            function (k) { return _this.translateObject(k, params, lang); }))));
        }
        /** @type {?} */
        var translation = this.getTranslation(lang);
        // TODO: optimize it (we can build this specific object)
        /** @type {?} */
        var value = getValue(unflatten(translation), key);
        return this.parser.transpile(value, params, translation);
    };
    /**
     * @template T
     * @param {?} key
     * @param {?=} params
     * @param {?=} lang
     * @return {?}
     */
    TranslocoService.prototype.selectTranslateObject = /**
     * @template T
     * @param {?} key
     * @param {?=} params
     * @param {?=} lang
     * @return {?}
     */
    function (key, params, lang) {
        return this.selectTranslate(key, params, lang, true);
    };
    /**
     * @param {?=} lang
     * @return {?}
     */
    TranslocoService.prototype.getTranslation = /**
     * @param {?=} lang
     * @return {?}
     */
    function (lang) {
        return lang ? this.translations.get(lang) || {} : this.translations;
    };
    /**
     * Gets an object of translations for a given language
     *
     * @example
     *
     * selectTranslation().subscribe()
     * selectTranslation('es').subscribe()
     */
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
    TranslocoService.prototype.selectTranslation = /**
     * Gets an object of translations for a given language
     *
     * \@example
     *
     * selectTranslation().subscribe()
     * selectTranslation('es').subscribe()
     * @param {?=} lang
     * @return {?}
     */
    function (lang) {
        var _this = this;
        /** @type {?} */
        var language = lang || this.getActiveLang();
        return this.load(language).pipe(map((/**
         * @return {?}
         */
        function () { return _this.getTranslation(language); })));
    };
    /**
     * Sets or merge a given translation object to current lang
     *
     * @example
     *
     * setTranslation({ ... })
     * setTranslation({ ... }, 'en')
     * setTranslation({ ... }, 'es', { merge: false } )
     * setTranslation({ ... }, 'todos/en', { merge: false } )
     */
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
    TranslocoService.prototype.setTranslation = /**
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
    function (translation, lang, options) {
        if (lang === void 0) { lang = this.getActiveLang(); }
        if (options === void 0) { options = {}; }
        var _a;
        /** @type {?} */
        var defaults = { merge: true, emitChange: true };
        /** @type {?} */
        var mergedOptions = tslib_1.__assign({}, defaults, options);
        /** @type {?} */
        var scope = getScopeFromLang(lang);
        /**
         * If this isn't a scope we use the whole translation as is
         * otherwise we need to flat the scope and use it
         * @type {?}
         */
        var flattenScopeOrTranslation = translation;
        // Merged the scoped language into the active language
        if (scope) {
            /** @type {?} */
            var key = this.getMappedScope(scope);
            flattenScopeOrTranslation = flatten((_a = {}, _a[key] = translation, _a));
        }
        /** @type {?} */
        var currentLang = scope ? getLangFromScope(lang) : lang;
        /** @type {?} */
        var mergedTranslation = tslib_1.__assign({}, (mergedOptions.merge && this.getTranslation(currentLang)), flattenScopeOrTranslation);
        /** @type {?} */
        var withHook = this.interceptor.preSaveTranslation(mergedTranslation, currentLang);
        /** @type {?} */
        var flattenTranslation = this.mergedConfig.flatten.aot ? withHook : flatten(withHook);
        this.translations.set(currentLang, flattenTranslation);
        mergedOptions.emitChange && this.setActiveLang(this.getActiveLang());
    };
    /**
     * Sets translation key with given value
     *
     * @example
     *
     * setTranslationKey('key', 'value')
     * setTranslationKey('key.nested', 'value')
     * setTranslationKey('key.nested', 'value', 'en')
     */
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
    TranslocoService.prototype.setTranslationKey = /**
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
    function (key, value, lang) {
        if (lang === void 0) { lang = this.getActiveLang(); }
        var _a;
        /** @type {?} */
        var withHook = this.interceptor.preSaveTranslationKey(key, value, lang);
        /** @type {?} */
        var newValue = tslib_1.__assign({}, this.getTranslation(lang), (_a = {}, _a[key] = withHook, _a));
        this.setTranslation(newValue, lang);
    };
    /**
     * @param {?} key
     * @param {?} value
     * @param {?=} params
     * @return {?}
     */
    TranslocoService.prototype.handleMissingKey = /**
     * @param {?} key
     * @param {?} value
     * @param {?=} params
     * @return {?}
     */
    function (key, value, params) {
        if (this.config.missingHandler.allowEmpty && value === '') {
            return '';
        }
        if (this.useFallbackTranslation() && !this.isResolvedMissingOnce) {
            this.isResolvedMissingOnce = true;
            /** @type {?} */
            var value_1 = this.translate(key, params, this.firstFallbackLang);
            this.isResolvedMissingOnce = false;
            return value_1;
        }
        return this.missingHandler.handle(key, this.config);
    };
    /**
     * @internal
     */
    /**
     * \@internal
     * @param {?} lang
     * @return {?}
     */
    TranslocoService.prototype._isLangScoped = /**
     * \@internal
     * @param {?} lang
     * @return {?}
     */
    function (lang) {
        return this.getAvailableLangsIds().indexOf(lang) === -1;
    };
    /**
     * @internal
     */
    /**
     * \@internal
     * @param {?} lang
     * @return {?}
     */
    TranslocoService.prototype._isLang = /**
     * \@internal
     * @param {?} lang
     * @return {?}
     */
    function (lang) {
        return this.getAvailableLangsIds().indexOf(lang) !== -1;
    };
    /**
     * @internal
     *
     * We always want to make sure the global lang is loaded
     * before loading the scope since you can access both via the pipe/directive.
     */
    /**
     * \@internal
     *
     * We always want to make sure the global lang is loaded
     * before loading the scope since you can access both via the pipe/directive.
     * @param {?} path
     * @param {?=} inlineLoader
     * @return {?}
     */
    TranslocoService.prototype._loadDependencies = /**
     * \@internal
     *
     * We always want to make sure the global lang is loaded
     * before loading the scope since you can access both via the pipe/directive.
     * @param {?} path
     * @param {?=} inlineLoader
     * @return {?}
     */
    function (path, inlineLoader) {
        /** @type {?} */
        var mainLang = getLangFromScope(path);
        if (this._isLangScoped(path) && !this.isLoadedTranslation(mainLang)) {
            return combineLatest(this.load(mainLang), this.load(path, { inlineLoader: inlineLoader }));
        }
        return this.load(path, { inlineLoader: inlineLoader });
    };
    /**
     * @private
     * @param {?} lang
     * @return {?}
     */
    TranslocoService.prototype.isLoadedTranslation = /**
     * @private
     * @param {?} lang
     * @return {?}
     */
    function (lang) {
        return size(this.getTranslation(lang));
    };
    /**
     * @internal
     */
    /**
     * \@internal
     * @param {?} langOrScope
     * @return {?}
     */
    TranslocoService.prototype._completeScopeWithLang = /**
     * \@internal
     * @param {?} langOrScope
     * @return {?}
     */
    function (langOrScope) {
        if (this._isLangScoped(langOrScope) && !this._isLang(getLangFromScope(langOrScope))) {
            return langOrScope + "/" + this.getActiveLang();
        }
        return langOrScope;
    };
    /**
     * @internal
     */
    /**
     * \@internal
     * @param {?} scope
     * @param {?} alias
     * @return {?}
     */
    TranslocoService.prototype._setScopeAlias = /**
     * \@internal
     * @param {?} scope
     * @param {?} alias
     * @return {?}
     */
    function (scope, alias) {
        if (!this.mergedConfig.scopeMapping) {
            this.mergedConfig.scopeMapping = {};
        }
        this.mergedConfig.scopeMapping[scope] = alias;
    };
    /**
     * @private
     * @return {?}
     */
    TranslocoService.prototype.getAvailableLangsIds = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var first = this.getAvailableLangs()[0];
        if (isString(first)) {
            return (/** @type {?} */ (this.getAvailableLangs()));
        }
        return ((/** @type {?} */ (this.getAvailableLangs()))).map((/**
         * @param {?} l
         * @return {?}
         */
        function (l) { return l.id; }));
    };
    /**
     * @private
     * @param {?=} lang
     * @return {?}
     */
    TranslocoService.prototype.useFallbackTranslation = /**
     * @private
     * @param {?=} lang
     * @return {?}
     */
    function (lang) {
        return this.config.missingHandler.useFallbackTranslation && lang !== this.firstFallbackLang;
    };
    /**
     * @private
     * @param {?} lang
     * @param {?} translation
     * @return {?}
     */
    TranslocoService.prototype.handleSuccess = /**
     * @private
     * @param {?} lang
     * @param {?} translation
     * @return {?}
     */
    function (lang, translation) {
        this.setTranslation(translation, lang, { emitChange: false });
        if (this.failedLangs.has(lang) === false) {
            this.events.next({
                wasFailure: !!this.failedLangs.size,
                type: 'translationLoadSuccess',
                payload: {
                    lang: lang
                }
            });
            this.failedCounter = 0;
        }
        else {
            this.cache.delete(lang);
            this.failedLangs.delete(lang);
        }
    };
    /**
     * @private
     * @param {?} lang
     * @param {?} mergedOptions
     * @return {?}
     */
    TranslocoService.prototype.handleFailure = /**
     * @private
     * @param {?} lang
     * @param {?} mergedOptions
     * @return {?}
     */
    function (lang, mergedOptions) {
        /** @type {?} */
        var splitted = lang.split('/');
        this.failedLangs.add(lang);
        /** @type {?} */
        var fallbacks = mergedOptions.fallbackLangs || this.fallbackStrategy.getNextLangs(lang);
        /** @type {?} */
        var nextLang = fallbacks[this.failedCounter];
        /** @type {?} */
        var isFallbackLang = nextLang === splitted[splitted.length - 1];
        if (!nextLang || isFallbackLang) {
            /** @type {?} */
            var msg = "Unable to load translation and all the fallback languages";
            if (splitted.length > 1) {
                msg += ", did you misspelled the scope name?";
            }
            throw new Error(msg);
        }
        /** @type {?} */
        var resolveLang = nextLang;
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
                lang: lang
            }
        });
        return this.load(resolveLang);
    };
    /**
     * @private
     * @param {?} __0
     * @return {?}
     */
    TranslocoService.prototype.setFallbackLangForMissingTranslation = /**
     * @private
     * @param {?} __0
     * @return {?}
     */
    function (_a) {
        var fallbackLang = _a.fallbackLang;
        if (this.useFallbackTranslation && fallbackLang) {
            this.firstFallbackLang = Array.isArray(fallbackLang) ? fallbackLang[0] : fallbackLang;
        }
    };
    /**
     * @return {?}
     */
    TranslocoService.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.subscription.unsubscribe();
    };
    /**
     * @private
     * @param {?} scope
     * @return {?}
     */
    TranslocoService.prototype.getMappedScope = /**
     * @private
     * @param {?} scope
     * @return {?}
     */
    function (scope) {
        var _a = this.config.scopeMapping, scopeMapping = _a === void 0 ? {} : _a;
        return scopeMapping[scope] || toCamelCase(scope);
    };
    TranslocoService.decorators = [
        { type: Injectable, args: [{ providedIn: 'root' },] }
    ];
    /** @nocollapse */
    TranslocoService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [TRANSLOCO_LOADER,] }] },
        { type: undefined, decorators: [{ type: Inject, args: [TRANSLOCO_TRANSPILER,] }] },
        { type: undefined, decorators: [{ type: Inject, args: [TRANSLOCO_MISSING_HANDLER,] }] },
        { type: undefined, decorators: [{ type: Inject, args: [TRANSLOCO_INTERCEPTOR,] }] },
        { type: undefined, decorators: [{ type: Inject, args: [TRANSLOCO_CONFIG,] }] },
        { type: undefined, decorators: [{ type: Inject, args: [TRANSLOCO_FALLBACK_STRATEGY,] }] }
    ]; };
    /** @nocollapse */ TranslocoService.ngInjectableDef = i0.defineInjectable({ factory: function TranslocoService_Factory() { return new TranslocoService(i0.inject(i1.TRANSLOCO_LOADER, 8), i0.inject(i2.TRANSLOCO_TRANSPILER), i0.inject(i3.TRANSLOCO_MISSING_HANDLER), i0.inject(i4.TRANSLOCO_INTERCEPTOR), i0.inject(i5.TRANSLOCO_CONFIG), i0.inject(i6.TRANSLOCO_FALLBACK_STRATEGY)); }, token: TranslocoService, providedIn: "root" });
    return TranslocoService;
}());
export { TranslocoService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsb2NvLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmduZWF0L3RyYW5zbG9jby8iLCJzb3VyY2VzIjpbImxpYi90cmFuc2xvY28uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFhLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN4RSxPQUFPLEVBQUUsZUFBZSxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFjLEVBQUUsRUFBRSxPQUFPLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBQzdHLE9BQU8sRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JGLE9BQU8sRUFBRSxhQUFhLEVBQUUsZ0JBQWdCLEVBQW1CLE1BQU0sb0JBQW9CLENBQUM7QUFDdEYsT0FBTyxFQUFFLG9CQUFvQixFQUF1QixNQUFNLHdCQUF3QixDQUFDO0FBRW5GLE9BQU8sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUN0RixPQUFPLEVBQUUsYUFBYSxFQUFFLGdCQUFnQixFQUFtQixNQUFNLG9CQUFvQixDQUFDO0FBQ3RGLE9BQU8sRUFBRSx5QkFBeUIsRUFBMkIsTUFBTSw2QkFBNkIsQ0FBQztBQUNqRyxPQUFPLEVBQUUscUJBQXFCLEVBQXdCLE1BQU0seUJBQXlCLENBQUM7QUFDdEYsT0FBTyxFQUFFLDJCQUEyQixFQUE2QixNQUFNLCtCQUErQixDQUFDO0FBQ3ZHLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDOUQsT0FBTyxFQUFFLG1CQUFt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Ozs7SUFDMUIsdUNBQXdDOzs7OztJQUd0QyxrQ0FBcUU7Ozs7O0lBQ3JFLGtDQUFpRTs7Ozs7SUFDakUsMENBQWtGOzs7OztJQUNsRix1Q0FBd0U7Ozs7O0lBQ3hFLHNDQUE2RDs7Ozs7SUFDN0QsNENBQXdGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlLCBPbkRlc3Ryb3ksIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIGNvbWJpbmVMYXRlc3QsIGZvcmtKb2luLCBmcm9tLCBPYnNlcnZhYmxlLCBvZiwgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCBtYXAsIHJldHJ5LCBzaGFyZVJlcGxheSwgc3dpdGNoTWFwLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBEZWZhdWx0TG9hZGVyLCBUUkFOU0xPQ09fTE9BREVSLCBUcmFuc2xvY29Mb2FkZXIgfSBmcm9tICcuL3RyYW5zbG9jby5sb2FkZXInO1xuaW1wb3J0IHsgVFJBTlNMT0NPX1RSQU5TUElMRVIsIFRyYW5zbG9jb1RyYW5zcGlsZXIgfSBmcm9tICcuL3RyYW5zbG9jby50cmFuc3BpbGVyJztcbmltcG9ydCB7IEF2YWlsYWJsZUxhbmdzLCBIYXNoTWFwLCBJbmxpbmVMb2FkZXIsIExvYWRPcHRpb25zLCBTZXRUcmFuc2xhdGlvbk9wdGlvbnMsIFRyYW5zbGF0ZVBhcmFtcywgVHJhbnNsYXRpb24sIFRyYW5zbG9jb0V2ZW50cyB9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHsgZmxhdHRlbiwgZ2V0VmFsdWUsIGlzU3RyaW5nLCBzaXplLCB0b0NhbWVsQ2FzZSwgdW5mbGF0dGVuIH0gZnJvbSAnLi9oZWxwZXJzJztcbmltcG9ydCB7IGRlZmF1bHRDb25maWcsIFRSQU5TTE9DT19DT05GSUcsIFRyYW5zbG9jb0NvbmZpZyB9IGZyb20gJy4vdHJhbnNsb2NvLmNvbmZpZyc7XG5pbXBvcnQgeyBUUkFOU0xPQ09fTUlTU0lOR19IQU5ETEVSLCBUcmFuc2xvY29NaXNzaW5nSGFuZGxlciB9IGZyb20gJy4vdHJhbnNsb2NvLW1pc3NpbmctaGFuZGxlcic7XG5pbXBvcnQgeyBUUkFOU0xPQ09fSU5URVJDRVBUT1IsIFRyYW5zbG9jb0ludGVyY2VwdG9yIH0gZnJvbSAnLi90cmFuc2xvY28uaW50ZXJjZXB0b3InO1xuaW1wb3J0IHsgVFJBTlNMT0NPX0ZBTExCQUNLX1NUUkFURUdZLCBUcmFuc2xvY29GYWxsYmFja1N0cmF0ZWd5IH0gZnJvbSAnLi90cmFuc2xvY28tZmFsbGJhY2stc3RyYXRlZ3knO1xuaW1wb3J0IHsgbWVyZ2VDb25maWcgfSBmcm9tICcuL21lcmdlLWNvbmZpZyc7XG5pbXBvcnQgeyBnZXRMYW5nRnJvbVNjb3BlLCBnZXRTY29wZUZyb21MYW5nIH0gZnJvbSAnLi9zaGFyZWQnO1xuaW1wb3J0IHsgZ2V0RmFsbGJhY2tzTG9hZGVycyB9IGZyb20gJy4vZ2V0LWZhbGxiYWNrcy1sb2FkZXJzJztcbmltcG9ydCB7IHJlc29sdmVMb2FkZXIgfSBmcm9tICcuL3Jlc29sdmUtbG9hZGVyJztcblxubGV0IHNlcnZpY2U6IFRyYW5zbG9jb1NlcnZpY2U7XG5cbmV4cG9ydCBmdW5jdGlvbiB0cmFuc2xhdGU8VCA9IGFueT4oa2V5OiBUcmFuc2xhdGVQYXJhbXMsIHBhcmFtczogSGFzaE1hcCA9IHt9LCBsYW5nPzogc3RyaW5nKTogVCB7XG4gIHJldHVybiBzZXJ2aWNlLnRyYW5zbGF0ZShrZXksIHBhcmFtcywgbGFuZyk7XG59XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgVHJhbnNsb2NvU2VydmljZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gIHByaXZhdGUgdHJhbnNsYXRpb25zID0gbmV3IE1hcDxzdHJpbmcsIFRyYW5zbGF0aW9uPigpO1xuICBwcml2YXRlIGNhY2hlID0gbmV3IE1hcDxzdHJpbmcsIE9ic2VydmFibGU8VHJhbnNsYXRpb24+PigpO1xuICBwcml2YXRlIGZpcnN0RmFsbGJhY2tMYW5nOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBkZWZhdWx0TGFuZzogc3RyaW5nO1xuICBwcml2YXRlIG1lcmdlZENvbmZpZzogVHJhbnNsb2NvQ29uZmlnO1xuICBwcml2YXRlIGF2YWlsYWJsZUxhbmdzOiBBdmFpbGFibGVMYW5ncyA9IFtdO1xuICBwcml2YXRlIGlzUmVzb2x2ZWRNaXNzaW5nT25jZSA9IGZhbHNlO1xuICBwcml2YXRlIGxhbmc6IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+O1xuICBsYW5nQ2hhbmdlcyQ6IE9ic2VydmFibGU8c3RyaW5nPjtcblxuICBwcml2YXRlIGV2ZW50cyA9IG5ldyBTdWJqZWN0PFRyYW5zbG9jb0V2ZW50cz4oKTtcbiAgZXZlbnRzJCA9IHRoaXMuZXZlbnRzLmFzT2JzZXJ2YWJsZSgpO1xuXG4gIHByaXZhdGUgZmFpbGVkQ291bnRlciA9IDA7XG4gIHByaXZhdGUgZmFpbGVkTGFuZ3MgPSBuZXcgU2V0PHN0cmluZz4oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KFRSQU5TTE9DT19MT0FERVIpIHByaXZhdGUgbG9hZGVyOiBUcmFuc2xvY29Mb2FkZXIsXG4gICAgQEluamVjdChUUkFOU0xPQ09fVFJBTlNQSUxFUikgcHJpdmF0ZSBwYXJzZXI6IFRyYW5zbG9jb1RyYW5zcGlsZXIsXG4gICAgQEluamVjdChUUkFOU0xPQ09fTUlTU0lOR19IQU5ETEVSKSBwcml2YXRlIG1pc3NpbmdIYW5kbGVyOiBUcmFuc2xvY29NaXNzaW5nSGFuZGxlcixcbiAgICBASW5qZWN0KFRSQU5TTE9DT19JTlRFUkNFUFRPUikgcHJpdmF0ZSBpbnRlcmNlcHRvcjogVHJhbnNsb2NvSW50ZXJjZXB0b3IsXG4gICAgQEluamVjdChUUkFOU0xPQ09fQ09ORklHKSBwcml2YXRlIHVzZXJDb25maWc6IFRyYW5zbG9jb0NvbmZpZyxcbiAgICBASW5qZWN0KFRSQU5TTE9DT19GQUxMQkFDS19TVFJBVEVHWSkgcHJpdmF0ZSBmYWxsYmFja1N0cmF0ZWd5OiBUcmFuc2xvY29GYWxsYmFja1N0cmF0ZWd5XG4gICkge1xuICAgIGlmKCF0aGlzLmxvYWRlcikge1xuICAgICAgdGhpcy5sb2FkZXIgPSBuZXcgRGVmYXVsdExvYWRlcih0aGlzLnRyYW5zbGF0aW9ucyk7XG4gICAgfVxuICAgIHNlcnZpY2UgPSB0aGlzO1xuICAgIHRoaXMubWVyZ2VkQ29uZmlnID0gbWVyZ2VDb25maWcoZGVmYXVsdENvbmZpZywgdXNlckNvbmZpZyk7XG5cbiAgICB0aGlzLnNldEF2YWlsYWJsZUxhbmdzKHRoaXMubWVyZ2VkQ29uZmlnLmF2YWlsYWJsZUxhbmdzKTtcbiAgICB0aGlzLnNldEZhbGxiYWNrTGFuZ0Zvck1pc3NpbmdUcmFuc2xhdGlvbih0aGlzLm1lcmdlZENvbmZpZyk7XG4gICAgdGhpcy5zZXREZWZhdWx0TGFuZyh0aGlzLm1lcmdlZENvbmZpZy5kZWZhdWx0TGFuZyk7XG4gICAgdGhpcy5sYW5nID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KHRoaXMuZ2V0RGVmYXVsdExhbmcoKSk7XG4gICAgLy8gRG9uJ3QgdXNlIGRpc3RpbmN0VW50aWxDaGFuZ2VkIGFzIHdlIG5lZWQgdGhlIGFiaWxpdHkgdG8gdXBkYXRlXG4gICAgLy8gdGhlIHZhbHVlIHdoZW4gdXNpbmcgc2V0VHJhbnNsYXRpb24gb3Igc2V0VHJhbnNsYXRpb25LZXlzXG4gICAgdGhpcy5sYW5nQ2hhbmdlcyQgPSB0aGlzLmxhbmcuYXNPYnNlcnZhYmxlKCk7XG5cbiAgICAvKipcbiAgICAgKiBXaGVuIHdlIGhhdmUgYSBmYWlsdXJlLCB3ZSB3YW50IHRvIGRlZmluZSB0aGUgbmV4dCBsYW5ndWFnZSB0aGF0IHN1Y2NlZWRlZCBhcyB0aGUgYWN0aXZlXG4gICAgICovXG4gICAgdGhpcy5zdWJzY3JpcHRpb24gPSB0aGlzLmV2ZW50cyQuc3Vic2NyaWJlKGUgPT4ge1xuICAgICAgaWYoZS50eXBlID09PSAndHJhbnNsYXRpb25Mb2FkU3VjY2VzcycgJiYgZS53YXNGYWlsdXJlKSB7XG4gICAgICAgIC8vIEhhbmRsZSBzY29wZWQgbGFuZ1xuICAgICAgICBjb25zdCBsYW5nID0gZ2V0TGFuZ0Zyb21TY29wZShlLnBheWxvYWQubGFuZyk7XG4gICAgICAgIHRoaXMuc2V0QWN0aXZlTGFuZyhsYW5nKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGdldCBjb25maWcoKTogVHJhbnNsb2NvQ29uZmlnIHtcbiAgICByZXR1cm4gdGhpcy5tZXJnZWRDb25maWc7XG4gIH1cblxuICBnZXREZWZhdWx0TGFuZygpIHtcbiAgICByZXR1cm4gdGhpcy5kZWZhdWx0TGFuZztcbiAgfVxuXG4gIHNldERlZmF1bHRMYW5nKGxhbmc6IHN0cmluZykge1xuICAgIHRoaXMuZGVmYXVsdExhbmcgPSBsYW5nO1xuICB9XG5cbiAgZ2V0QWN0aXZlTGFuZygpIHtcbiAgICByZXR1cm4gdGhpcy5sYW5nLmdldFZhbHVlKCk7XG4gIH1cblxuICBzZXRBY3RpdmVMYW5nKGxhbmc6IHN0cmluZykge1xuICAgIHRoaXMubGFuZy5uZXh0KGxhbmcpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgc2V0QXZhaWxhYmxlTGFuZ3MobGFuZ3M6IEF2YWlsYWJsZUxhbmdzKSB7XG4gICAgdGhpcy5hdmFpbGFibGVMYW5ncyA9IGxhbmdzO1xuICB9XG5cbiAgZ2V0QXZhaWxhYmxlTGFuZ3MoKSB7XG4gICAgcmV0dXJuIHRoaXMuYXZhaWxhYmxlTGFuZ3M7XG4gIH1cblxuICBsb2FkKHBhdGg6IHN0cmluZywgb3B0aW9uczogTG9hZE9wdGlvbnMgPSB7fSk6IE9ic2VydmFibGU8VHJhbnNsYXRpb24+IHtcbiAgICBpZih0aGlzLmNhY2hlLmhhcyhwYXRoKSA9PT0gZmFsc2UpIHtcbiAgICAgIGxldCBsb2FkVHJhbnNsYXRpb246IE9ic2VydmFibGU8VHJhbnNsYXRpb24gfCB7IHRyYW5zbGF0aW9uOiBUcmFuc2xhdGlvbjsgbGFuZzogc3RyaW5nIH1bXT47XG5cbiAgICAgIGlmKHRoaXMudXNlRmFsbGJhY2tUcmFuc2xhdGlvbihwYXRoKSkge1xuICAgICAgICAvLyBpZiB0aGUgcGF0aCBpcyBzY29wZSB0aGUgZmFsbGJhY2sgc2hvdWxkIGJlIGBzY29wZS9mYWxsYmFja0xhbmdgO1xuICAgICAgICBjb25zdCBmYWxsYmFjayA9IHRoaXMuX2lzTGFuZ1Njb3BlZChwYXRoKVxuICAgICAgICAgID8gYCR7Z2V0U2NvcGVGcm9tTGFuZyhwYXRoKX0vJHt0aGlzLmZpcnN0RmFsbGJhY2tMYW5nfWBcbiAgICAgICAgICA6IHRoaXMuZmlyc3RGYWxsYmFja0xhbmc7XG5cbiAgICAgICAgY29uc3QgbG9hZGVycyA9IGdldEZhbGxiYWNrc0xvYWRlcnMocGF0aCwgZmFsbGJhY2ssIHRoaXMubG9hZGVyLCBvcHRpb25zLmlubGluZUxvYWRlcik7XG4gICAgICAgIGxvYWRUcmFuc2xhdGlvbiA9IGZvcmtKb2luKGxvYWRlcnMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgbG9hZGVyID0gcmVzb2x2ZUxvYWRlcihwYXRoLCB0aGlzLmxvYWRlciwgb3B0aW9ucy5pbmxpbmVMb2FkZXIpO1xuICAgICAgICBsb2FkVHJhbnNsYXRpb24gPSBmcm9tKGxvYWRlcik7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGxvYWQkID0gbG9hZFRyYW5zbGF0aW9uLnBpcGUoXG4gICAgICAgIHJldHJ5KHRoaXMuY29uZmlnLmZhaWxlZFJldHJpZXMpLFxuICAgICAgICBjYXRjaEVycm9yKCgpID0+IHRoaXMuaGFuZGxlRmFpbHVyZShwYXRoLCBvcHRpb25zKSksXG4gICAgICAgIHRhcCh0cmFuc2xhdGlvbiA9PiB7XG4gICAgICAgICAgaWYoQXJyYXkuaXNBcnJheSh0cmFuc2xhdGlvbikpIHtcbiAgICAgICAgICAgIHRyYW5zbGF0aW9uLmZvckVhY2godCA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuaGFuZGxlU3VjY2Vzcyh0LmxhbmcsIHQudHJhbnNsYXRpb24pO1xuICAgICAgICAgICAgICAvLyBTYXZlIHRoZSBmYWxsYmFjayBpbiBjYWNoZSBzbyB3ZSdsbCBub3QgY3JlYXRlIGEgcmVkdW5kYW50IHJlcXVlc3RcbiAgICAgICAgICAgICAgaWYodC5sYW5nICE9PSBwYXRoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYWNoZS5zZXQodC5sYW5nLCBvZih7fSkpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5oYW5kbGVTdWNjZXNzKHBhdGgsIHRyYW5zbGF0aW9uKTtcbiAgICAgICAgfSksXG4gICAgICAgIHNoYXJlUmVwbGF5KDEpXG4gICAgICApO1xuXG4gICAgICB0aGlzLmNhY2hlLnNldChwYXRoLCBsb2FkJCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuY2FjaGUuZ2V0KHBhdGgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIGluc3RhbnQgdHJhbnNsYXRlZCB2YWx1ZSBvZiBhIGtleVxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiB0cmFuc2xhdGU8c3RyaW5nPignaGVsbG8nKVxuICAgKiB0cmFuc2xhdGUoJ2hlbGxvJywgeyB2YWx1ZTogJ3ZhbHVlJyB9KVxuICAgKiB0cmFuc2xhdGU8c3RyaW5nW10+KFsnaGVsbG8nLCAna2V5J10pXG4gICAqIHRyYW5zbGF0ZSgnaGVsbG8nLCB7IH0sICdlbicpXG4gICAqIHRyYW5zbGF0ZSgnc2NvcGUuc29tZUtleScsIHsgfSwgJ2VuJylcbiAgICovXG4gIHRyYW5zbGF0ZTxUID0gYW55PihrZXk6IFRyYW5zbGF0ZVBhcmFtcywgcGFyYW1zOiBIYXNoTWFwID0ge30sIGxhbmcgPSB0aGlzLmdldEFjdGl2ZUxhbmcoKSk6IFQge1xuICAgIGxldCByZXNvbHZlTGFuZyA9IGxhbmc7XG4gICAgbGV0IHNjb3BlO1xuXG4gICAgLy8gSWYgbGFuZyBpcyBzY29wZSB3ZSBuZWVkIHRvIGNoZWNrIHRoZSBmb2xsb3dpbmcgY2FzZXM6XG4gICAgLy8gdG9kb3MvZXMgPT4gaW4gdGhpcyBjYXNlIHdlIHNob3VsZCB0YWtlIGBlc2AgYXMgbGFuZ1xuICAgIC8vIHRvZG9zID0+IGluIHRoaXMgY2FzZSB3ZSBzaG91bGQgc2V0IHRoZSBhY3RpdmUgbGFuZyBhcyBsYW5nXG4gICAgaWYodGhpcy5faXNMYW5nU2NvcGVkKGxhbmcpKSB7XG4gICAgICAvLyBlbiBmb3IgZXhhbXBsZVxuICAgICAgY29uc3QgbGFuZ0Zyb21TY29wZSA9IGdldExhbmdGcm9tU2NvcGUobGFuZyk7XG4gICAgICAvLyBlbiBpcyBsYW5nXG4gICAgICBjb25zdCBoYXNMYW5nID0gdGhpcy5faXNMYW5nKGxhbmdGcm9tU2NvcGUpO1xuICAgICAgLy8gdGFrZSBlblxuICAgICAgcmVzb2x2ZUxhbmcgPSBoYXNMYW5nID8gbGFuZ0Zyb21TY29wZSA6IHRoaXMuZ2V0QWN0aXZlTGFuZygpO1xuICAgICAgLy8gZmluZCB0aGUgc2NvcGVcbiAgICAgIHNjb3BlID0gdGhpcy5nZXRNYXBwZWRTY29wZShoYXNMYW5nID8gZ2V0U2NvcGVGcm9tTGFuZyhsYW5nKSA6IGxhbmcpO1xuICAgIH1cblxuICAgIGlmKEFycmF5LmlzQXJyYXkoa2V5KSkge1xuICAgICAgcmV0dXJuIGtleS5tYXAoayA9PiB0aGlzLnRyYW5zbGF0ZShzY29wZSA/IGAke3Njb3BlfS4ke2t9YCA6IGssIHBhcmFtcywgcmVzb2x2ZUxhbmcpKSBhcyBhbnk7XG4gICAgfVxuXG4gICAga2V5ID0gc2NvcGUgPyBgJHtzY29wZX0uJHtrZXl9YCA6IGtleTtcblxuICAgIGlmKCFrZXkpIHtcbiAgICAgIHJldHVybiB0aGlzLm1pc3NpbmdIYW5kbGVyLmhhbmRsZShrZXksIHRoaXMuY29uZmlnKTtcbiAgICB9XG5cbiAgICBjb25zdCB0cmFuc2xhdGlvbiA9IHRoaXMuZ2V0VHJhbnNsYXRpb24ocmVzb2x2ZUxhbmcpO1xuICAgIGNvbnN0IHZhbHVlID0gdHJhbnNsYXRpb25ba2V5XTtcblxuICAgIGlmKCF2YWx1ZSkge1xuICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlTWlzc2luZ0tleShrZXksIHZhbHVlLCBwYXJhbXMpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnBhcnNlci50cmFuc3BpbGUodmFsdWUsIHBhcmFtcywgdHJhbnNsYXRpb24pO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIHRyYW5zbGF0ZWQgdmFsdWUgb2YgYSBrZXkgYXMgb2JzZXJ2YWJsZVxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiBzZWxlY3RUcmFuc2xhdGU8c3RyaW5nPignaGVsbG8nKS5zdWJzY3JpYmUodmFsdWUgPT4gLi4uKVxuICAgKiBzZWxlY3RUcmFuc2xhdGU8c3RyaW5nPignaGVsbG8nLCB7fSwgJ2VzJykuc3Vic2NyaWJlKHZhbHVlID0+IC4uLilcbiAgICogc2VsZWN0VHJhbnNsYXRlPHN0cmluZz4oJ2hlbGxvJywge30sICd0b2RvcycpLnN1YnNjcmliZSh2YWx1ZSA9PiAuLi4pXG4gICAqXG4gICAqL1xuICBzZWxlY3RUcmFuc2xhdGU8VCA9IGFueT4oa2V5OiBUcmFuc2xhdGVQYXJhbXMsIHBhcmFtcz86IEhhc2hNYXAsIGxhbmc/OiBzdHJpbmcsIF9pc09iamVjdCA9IGZhbHNlKTogT2JzZXJ2YWJsZTxUPiB7XG4gICAgY29uc3QgbG9hZCA9IGxhbmcgPT5cbiAgICAgIHRoaXMubG9hZChsYW5nKS5waXBlKFxuICAgICAgICBtYXAoKCkgPT4gKF9pc09iamVjdCA/IHRoaXMudHJhbnNsYXRlT2JqZWN0KGtleSwgcGFyYW1zLCBsYW5nKSA6IHRoaXMudHJhbnNsYXRlKGtleSwgcGFyYW1zLCBsYW5nKSkpXG4gICAgICApO1xuICAgIGlmKGlzU3RyaW5nKGxhbmcpKSB7XG4gICAgICBjb25zdCBsYW5nT3JTY29wZSA9IHRoaXMuX2NvbXBsZXRlU2NvcGVXaXRoTGFuZyhsYW5nKTtcbiAgICAgIHJldHVybiBsb2FkKGxhbmdPclNjb3BlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gaWYgdGhlIHVzZXIgZG9lc24ndCBwYXNzIGxhbmcsIHdlIG5lZWQgdG8gbGlzdGVuIHRvIGxhbmcgY2hhbmdlcyBhbmQgdXBkYXRlIHRoZSB2YWx1ZSBhY2NvcmRpbmdseVxuICAgICAgcmV0dXJuIHRoaXMubGFuZ0NoYW5nZXMkLnBpcGUoc3dpdGNoTWFwKGxhbmcgPT4gbG9hZChsYW5nKSkpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUcmFuc2xhdGUgdGhlIGdpdmVuIHBhdGggdGhhdCByZXR1cm5zIGFuIG9iamVjdFxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiBzZXJ2aWNlLnRyYW5zbGF0ZU9iamVjdCgncGF0aC50by5vYmplY3QnLCB7J3N1YnBhdGgnOiB7IHZhbHVlOiAnc29tZVZhbHVlJ319KSA9PiByZXR1cm5zIHRyYW5zbGF0ZWQgb2JqZWN0XG4gICAqXG4gICAqL1xuICB0cmFuc2xhdGVPYmplY3Q8VCA9IGFueT4oa2V5OiBUcmFuc2xhdGVQYXJhbXMsIHBhcmFtcz86IEhhc2hNYXAsIGxhbmcgPSB0aGlzLmdldEFjdGl2ZUxhbmcoKSk6IFQge1xuICAgIGlmKEFycmF5LmlzQXJyYXkoa2V5KSkge1xuICAgICAgcmV0dXJuIGtleS5tYXAoayA9PiB0aGlzLnRyYW5zbGF0ZU9iamVjdChrLCBwYXJhbXMsIGxhbmcpKSBhcyBhbnk7XG4gICAgfVxuXG4gICAgY29uc3QgdHJhbnNsYXRpb24gPSB0aGlzLmdldFRyYW5zbGF0aW9uKGxhbmcpO1xuICAgIC8vIFRPRE86IG9wdGltaXplIGl0ICh3ZSBjYW4gYnVpbGQgdGhpcyBzcGVjaWZpYyBvYmplY3QpXG4gICAgY29uc3QgdmFsdWUgPSBnZXRWYWx1ZSh1bmZsYXR0ZW4odHJhbnNsYXRpb24pLCBrZXkpO1xuICAgIHJldHVybiB0aGlzLnBhcnNlci50cmFuc3BpbGUodmFsdWUsIHBhcmFtcywgdHJhbnNsYXRpb24pO1xuICB9XG5cbiAgc2VsZWN0VHJhbnNsYXRlT2JqZWN0PFQgPSBhbnk+KGtleTogVHJhbnNsYXRlUGFyYW1zLCBwYXJhbXM/OiBIYXNoTWFwLCBsYW5nPzogc3RyaW5nKTogT2JzZXJ2YWJsZTxUPiB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0VHJhbnNsYXRlKGtleSwgcGFyYW1zLCBsYW5nLCB0cnVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGFuIG9iamVjdCBvZiB0cmFuc2xhdGlvbnMgZm9yIGEgZ2l2ZW4gbGFuZ3VhZ2VcbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogZ2V0VHJhbnNsYXRpb24oKVxuICAgKiBnZXRUcmFuc2xhdGlvbignZW4nKVxuICAgKiBnZXRUcmFuc2xhdGlvbignYWRtaW4tcGFnZS9lbicpXG4gICAqL1xuICBnZXRUcmFuc2xhdGlvbigpOiBNYXA8c3RyaW5nLCBUcmFuc2xhdGlvbj47XG4gIGdldFRyYW5zbGF0aW9uKGxhbmc6IHN0cmluZyk6IFRyYW5zbGF0aW9uO1xuICBnZXRUcmFuc2xhdGlvbihsYW5nPzogc3RyaW5nKTogTWFwPHN0cmluZywgVHJhbnNsYXRpb24+IHwgVHJhbnNsYXRpb24ge1xuICAgIHJldHVybiBsYW5nID8gdGhpcy50cmFuc2xhdGlvbnMuZ2V0KGxhbmcpIHx8IHt9IDogdGhpcy50cmFuc2xhdGlvbnM7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhbiBvYmplY3Qgb2YgdHJhbnNsYXRpb25zIGZvciBhIGdpdmVuIGxhbmd1YWdlXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIHNlbGVjdFRyYW5zbGF0aW9uKCkuc3Vic2NyaWJlKClcbiAgICogc2VsZWN0VHJhbnNsYXRpb24oJ2VzJykuc3Vic2NyaWJlKClcbiAgICovXG4gIHNlbGVjdFRyYW5zbGF0aW9uKGxhbmc/OiBzdHJpbmcpOiBPYnNlcnZhYmxlPFRyYW5zbGF0aW9uPiB7XG4gICAgY29uc3QgbGFuZ3VhZ2UgPSBsYW5nIHx8IHRoaXMuZ2V0QWN0aXZlTGFuZygpO1xuICAgIHJldHVybiB0aGlzLmxvYWQobGFuZ3VhZ2UpLnBpcGUobWFwKCgpID0+IHRoaXMuZ2V0VHJhbnNsYXRpb24obGFuZ3VhZ2UpKSk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyBvciBtZXJnZSBhIGdpdmVuIHRyYW5zbGF0aW9uIG9iamVjdCB0byBjdXJyZW50IGxhbmdcbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogc2V0VHJhbnNsYXRpb24oeyAuLi4gfSlcbiAgICogc2V0VHJhbnNsYXRpb24oeyAuLi4gfSwgJ2VuJylcbiAgICogc2V0VHJhbnNsYXRpb24oeyAuLi4gfSwgJ2VzJywgeyBtZXJnZTogZmFsc2UgfSApXG4gICAqIHNldFRyYW5zbGF0aW9uKHsgLi4uIH0sICd0b2Rvcy9lbicsIHsgbWVyZ2U6IGZhbHNlIH0gKVxuICAgKi9cbiAgc2V0VHJhbnNsYXRpb24odHJhbnNsYXRpb246IFRyYW5zbGF0aW9uLCBsYW5nID0gdGhpcy5nZXRBY3RpdmVMYW5nKCksIG9wdGlvbnM6IFNldFRyYW5zbGF0aW9uT3B0aW9ucyA9IHt9KSB7XG4gICAgY29uc3QgZGVmYXVsdHMgPSB7IG1lcmdlOiB0cnVlLCBlbWl0Q2hhbmdlOiB0cnVlIH07XG4gICAgY29uc3QgbWVyZ2VkT3B0aW9ucyA9IHsgLi4uZGVmYXVsdHMsIC4uLm9wdGlvbnMgfTtcbiAgICBjb25zdCBzY29wZSA9IGdldFNjb3BlRnJvbUxhbmcobGFuZyk7XG5cbiAgICAvKipcbiAgICAgKiBJZiB0aGlzIGlzbid0IGEgc2NvcGUgd2UgdXNlIHRoZSB3aG9sZSB0cmFuc2xhdGlvbiBhcyBpc1xuICAgICAqIG90aGVyd2lzZSB3ZSBuZWVkIHRvIGZsYXQgdGhlIHNjb3BlIGFuZCB1c2UgaXRcbiAgICAgKi9cbiAgICBsZXQgZmxhdHRlblNjb3BlT3JUcmFuc2xhdGlvbiA9IHRyYW5zbGF0aW9uO1xuXG4gICAgLy8gTWVyZ2VkIHRoZSBzY29wZWQgbGFuZ3VhZ2UgaW50byB0aGUgYWN0aXZlIGxhbmd1YWdlXG4gICAgaWYoc2NvcGUpIHtcbiAgICAgIGNvbnN0IGtleSA9IHRoaXMuZ2V0TWFwcGVkU2NvcGUoc2NvcGUpO1xuICAgICAgZmxhdHRlblNjb3BlT3JUcmFuc2xhdGlvbiA9IGZsYXR0ZW4oeyBba2V5XTogdHJhbnNsYXRpb24gfSk7XG4gICAgfVxuXG4gICAgY29uc3QgY3VycmVudExhbmcgPSBzY29wZSA/IGdldExhbmdGcm9tU2NvcGUobGFuZykgOiBsYW5nO1xuXG4gICAgY29uc3QgbWVyZ2VkVHJhbnNsYXRpb24gPSB7XG4gICAgICAuLi4obWVyZ2VkT3B0aW9ucy5tZXJnZSAmJiB0aGlzLmdldFRyYW5zbGF0aW9uKGN1cnJlbnRMYW5nKSksXG4gICAgICAuLi5mbGF0dGVuU2NvcGVPclRyYW5zbGF0aW9uXG4gICAgfTtcblxuICAgIGNvbnN0IHdpdGhIb29rID0gdGhpcy5pbnRlcmNlcHRvci5wcmVTYXZlVHJhbnNsYXRpb24obWVyZ2VkVHJhbnNsYXRpb24sIGN1cnJlbnRMYW5nKTtcbiAgICBjb25zdCBmbGF0dGVuVHJhbnNsYXRpb24gPSB0aGlzLm1lcmdlZENvbmZpZy5mbGF0dGVuLmFvdCA/IHdpdGhIb29rIDogZmxhdHRlbih3aXRoSG9vayk7XG5cbiAgICB0aGlzLnRyYW5zbGF0aW9ucy5zZXQoY3VycmVudExhbmcsIGZsYXR0ZW5UcmFuc2xhdGlvbik7XG4gICAgbWVyZ2VkT3B0aW9ucy5lbWl0Q2hhbmdlICYmIHRoaXMuc2V0QWN0aXZlTGFuZyh0aGlzLmdldEFjdGl2ZUxhbmcoKSk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0cmFuc2xhdGlvbiBrZXkgd2l0aCBnaXZlbiB2YWx1ZVxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiBzZXRUcmFuc2xhdGlvbktleSgna2V5JywgJ3ZhbHVlJylcbiAgICogc2V0VHJhbnNsYXRpb25LZXkoJ2tleS5uZXN0ZWQnLCAndmFsdWUnKVxuICAgKiBzZXRUcmFuc2xhdGlvbktleSgna2V5Lm5lc3RlZCcsICd2YWx1ZScsICdlbicpXG4gICAqL1xuICBzZXRUcmFuc2xhdGlvbktleShrZXk6IHN0cmluZywgdmFsdWU6IHN0cmluZywgbGFuZyA9IHRoaXMuZ2V0QWN0aXZlTGFuZygpKSB7XG4gICAgY29uc3Qgd2l0aEhvb2sgPSB0aGlzLmludGVyY2VwdG9yLnByZVNhdmVUcmFuc2xhdGlvbktleShrZXksIHZhbHVlLCBsYW5nKTtcbiAgICBjb25zdCBuZXdWYWx1ZSA9IHtcbiAgICAgIC4uLnRoaXMuZ2V0VHJhbnNsYXRpb24obGFuZyksXG4gICAgICBba2V5XTogd2l0aEhvb2tcbiAgICB9O1xuICAgIHRoaXMuc2V0VHJhbnNsYXRpb24obmV3VmFsdWUsIGxhbmcpO1xuICB9XG5cbiAgaGFuZGxlTWlzc2luZ0tleShrZXk6IHN0cmluZywgdmFsdWU6IGFueSwgcGFyYW1zPzogSGFzaE1hcCkge1xuICAgIGlmKHRoaXMuY29uZmlnLm1pc3NpbmdIYW5kbGVyLmFsbG93RW1wdHkgJiYgdmFsdWUgPT09ICcnKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgaWYodGhpcy51c2VGYWxsYmFja1RyYW5zbGF0aW9uKCkgJiYgIXRoaXMuaXNSZXNvbHZlZE1pc3NpbmdPbmNlKSB7XG4gICAgICB0aGlzLmlzUmVzb2x2ZWRNaXNzaW5nT25jZSA9IHRydWU7XG4gICAgICBjb25zdCB2YWx1ZSA9IHRoaXMudHJhbnNsYXRlKGtleSwgcGFyYW1zLCB0aGlzLmZpcnN0RmFsbGJhY2tMYW5nKTtcbiAgICAgIHRoaXMuaXNSZXNvbHZlZE1pc3NpbmdPbmNlID0gZmFsc2U7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMubWlzc2luZ0hhbmRsZXIuaGFuZGxlKGtleSwgdGhpcy5jb25maWcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgX2lzTGFuZ1Njb3BlZChsYW5nOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRBdmFpbGFibGVMYW5nc0lkcygpLmluZGV4T2YobGFuZykgPT09IC0xO1xuICB9XG5cbiAgLyoqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgX2lzTGFuZyhsYW5nOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRBdmFpbGFibGVMYW5nc0lkcygpLmluZGV4T2YobGFuZykgIT09IC0xO1xuICB9XG5cbiAgLyoqXG4gICAqIEBpbnRlcm5hbFxuICAgKlxuICAgKiBXZSBhbHdheXMgd2FudCB0byBtYWtlIHN1cmUgdGhlIGdsb2JhbCBsYW5nIGlzIGxvYWRlZFxuICAgKiBiZWZvcmUgbG9hZGluZyB0aGUgc2NvcGUgc2luY2UgeW91IGNhbiBhY2Nlc3MgYm90aCB2aWEgdGhlIHBpcGUvZGlyZWN0aXZlLlxuICAgKi9cbiAgX2xvYWREZXBlbmRlbmNpZXMocGF0aDogc3RyaW5nLCBpbmxpbmVMb2FkZXI/OiBJbmxpbmVMb2FkZXIpOiBPYnNlcnZhYmxlPFRyYW5zbGF0aW9uIHwgVHJhbnNsYXRpb25bXT4ge1xuICAgIGNvbnN0IG1haW5MYW5nID0gZ2V0TGFuZ0Zyb21TY29wZShwYXRoKTtcblxuICAgIGlmKHRoaXMuX2lzTGFuZ1Njb3BlZChwYXRoKSAmJiAhdGhpcy5pc0xvYWRlZFRyYW5zbGF0aW9uKG1haW5MYW5nKSkge1xuICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QodGhpcy5sb2FkKG1haW5MYW5nKSwgdGhpcy5sb2FkKHBhdGgsIHsgaW5saW5lTG9hZGVyIH0pKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5sb2FkKHBhdGgsIHsgaW5saW5lTG9hZGVyIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBpc0xvYWRlZFRyYW5zbGF0aW9uKGxhbmc6IHN0cmluZykge1xuICAgIHJldHVybiBzaXplKHRoaXMuZ2V0VHJhbnNsYXRpb24obGFuZykpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgX2NvbXBsZXRlU2NvcGVXaXRoTGFuZyhsYW5nT3JTY29wZTogc3RyaW5nKSB7XG4gICAgaWYodGhpcy5faXNMYW5nU2NvcGVkKGxhbmdPclNjb3BlKSAmJiAhdGhpcy5faXNMYW5nKGdldExhbmdGcm9tU2NvcGUobGFuZ09yU2NvcGUpKSkge1xuICAgICAgcmV0dXJuIGAke2xhbmdPclNjb3BlfS8ke3RoaXMuZ2V0QWN0aXZlTGFuZygpfWA7XG4gICAgfVxuICAgIHJldHVybiBsYW5nT3JTY29wZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIF9zZXRTY29wZUFsaWFzKHNjb3BlOiBzdHJpbmcsIGFsaWFzOiBzdHJpbmcpIHtcbiAgICBpZighdGhpcy5tZXJnZWRDb25maWcuc2NvcGVNYXBwaW5nKSB7XG4gICAgICB0aGlzLm1lcmdlZENvbmZpZy5zY29wZU1hcHBpbmcgPSB7fTtcbiAgICB9XG4gICAgdGhpcy5tZXJnZWRDb25maWcuc2NvcGVNYXBwaW5nW3Njb3BlXSA9IGFsaWFzO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRBdmFpbGFibGVMYW5nc0lkcygpOiBzdHJpbmdbXSB7XG4gICAgY29uc3QgZmlyc3QgPSB0aGlzLmdldEF2YWlsYWJsZUxhbmdzKClbMF07XG5cbiAgICBpZihpc1N0cmluZyhmaXJzdCkpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldEF2YWlsYWJsZUxhbmdzKCkgYXMgc3RyaW5nW107XG4gICAgfVxuXG4gICAgcmV0dXJuICh0aGlzLmdldEF2YWlsYWJsZUxhbmdzKCkgYXMgeyBpZDogc3RyaW5nIH1bXSkubWFwKGwgPT4gbC5pZCk7XG4gIH1cblxuICBwcml2YXRlIHVzZUZhbGxiYWNrVHJhbnNsYXRpb24obGFuZz86IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZy5taXNzaW5nSGFuZGxlci51c2VGYWxsYmFja1RyYW5zbGF0aW9uICYmIGxhbmcgIT09IHRoaXMuZmlyc3RGYWxsYmFja0xhbmc7XG4gIH1cblxuICBwcml2YXRlIGhhbmRsZVN1Y2Nlc3MobGFuZzogc3RyaW5nLCB0cmFuc2xhdGlvbjogVHJhbnNsYXRpb24pIHtcbiAgICB0aGlzLnNldFRyYW5zbGF0aW9uKHRyYW5zbGF0aW9uLCBsYW5nLCB7IGVtaXRDaGFuZ2U6IGZhbHNlIH0pO1xuICAgIGlmKHRoaXMuZmFpbGVkTGFuZ3MuaGFzKGxhbmcpID09PSBmYWxzZSkge1xuICAgICAgdGhpcy5ldmVudHMubmV4dCh7XG4gICAgICAgIHdhc0ZhaWx1cmU6ICEhdGhpcy5mYWlsZWRMYW5ncy5zaXplLFxuICAgICAgICB0eXBlOiAndHJhbnNsYXRpb25Mb2FkU3VjY2VzcycsXG4gICAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgICBsYW5nXG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLmZhaWxlZENvdW50ZXIgPSAwO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNhY2hlLmRlbGV0ZShsYW5nKTtcbiAgICAgIHRoaXMuZmFpbGVkTGFuZ3MuZGVsZXRlKGxhbmcpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaGFuZGxlRmFpbHVyZShsYW5nOiBzdHJpbmcsIG1lcmdlZE9wdGlvbnMpIHtcbiAgICBjb25zdCBzcGxpdHRlZCA9IGxhbmcuc3BsaXQoJy8nKTtcblxuICAgIHRoaXMuZmFpbGVkTGFuZ3MuYWRkKGxhbmcpO1xuICAgIGNvbnN0IGZhbGxiYWNrcyA9IG1lcmdlZE9wdGlvbnMuZmFsbGJhY2tMYW5ncyB8fCB0aGlzLmZhbGxiYWNrU3RyYXRlZ3kuZ2V0TmV4dExhbmdzKGxhbmcpO1xuICAgIGNvbnN0IG5leHRMYW5nID0gZmFsbGJhY2tzW3RoaXMuZmFpbGVkQ291bnRlcl07XG5cbiAgICBjb25zdCBpc0ZhbGxiYWNrTGFuZyA9IG5leHRMYW5nID09PSBzcGxpdHRlZFtzcGxpdHRlZC5sZW5ndGggLSAxXTtcblxuICAgIGlmKCFuZXh0TGFuZyB8fCBpc0ZhbGxiYWNrTGFuZykge1xuICAgICAgbGV0IG1zZyA9IGBVbmFibGUgdG8gbG9hZCB0cmFuc2xhdGlvbiBhbmQgYWxsIHRoZSBmYWxsYmFjayBsYW5ndWFnZXNgO1xuICAgICAgaWYoc3BsaXR0ZWQubGVuZ3RoID4gMSkge1xuICAgICAgICBtc2cgKz0gYCwgZGlkIHlvdSBtaXNzcGVsbGVkIHRoZSBzY29wZSBuYW1lP2A7XG4gICAgICB9XG5cbiAgICAgIHRocm93IG5ldyBFcnJvcihtc2cpO1xuICAgIH1cblxuICAgIGxldCByZXNvbHZlTGFuZyA9IG5leHRMYW5nO1xuICAgIC8vIGlmIGl0J3Mgc2NvcGVkIGxhbmdcbiAgICBpZihzcGxpdHRlZC5sZW5ndGggPiAxKSB7XG4gICAgICAvLyBXZSBuZWVkIHRvIHJlc29sdmUgaXQgdG86XG4gICAgICAvLyB0b2Rvcy9sYW5nTm90RXhpc3RzID0+IHRvZG9zL25leHRMYW5nXG4gICAgICBzcGxpdHRlZFtzcGxpdHRlZC5sZW5ndGggLSAxXSA9IG5leHRMYW5nO1xuICAgICAgcmVzb2x2ZUxhbmcgPSBzcGxpdHRlZC5qb2luKCcvJyk7XG4gICAgfVxuXG4gICAgdGhpcy5mYWlsZWRDb3VudGVyKys7XG4gICAgdGhpcy5ldmVudHMubmV4dCh7XG4gICAgICB0eXBlOiAndHJhbnNsYXRpb25Mb2FkRmFpbHVyZScsXG4gICAgICBwYXlsb2FkOiB7XG4gICAgICAgIGxhbmdcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLmxvYWQocmVzb2x2ZUxhbmcpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRGYWxsYmFja0xhbmdGb3JNaXNzaW5nVHJhbnNsYXRpb24oeyBmYWxsYmFja0xhbmcgfTogVHJhbnNsb2NvQ29uZmlnKTogdm9pZCB7XG4gICAgaWYodGhpcy51c2VGYWxsYmFja1RyYW5zbGF0aW9uICYmIGZhbGxiYWNrTGFuZykge1xuICAgICAgdGhpcy5maXJzdEZhbGxiYWNrTGFuZyA9IEFycmF5LmlzQXJyYXkoZmFsbGJhY2tMYW5nKSA/IGZhbGxiYWNrTGFuZ1swXSA6IGZhbGxiYWNrTGFuZztcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRNYXBwZWRTY29wZShzY29wZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBjb25zdCB7IHNjb3BlTWFwcGluZyA9IHt9IH0gPSB0aGlzLmNvbmZpZztcbiAgICByZXR1cm4gc2NvcGVNYXBwaW5nW3Njb3BlXSB8fCB0b0NhbWVsQ2FzZShzY29wZSk7XG4gIH1cbn1cbiJdfQ==