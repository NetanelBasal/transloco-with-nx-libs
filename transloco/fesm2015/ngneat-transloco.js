import flat from 'flat';
import { take, map, catchError, retry, shareReplay, switchMap, tap } from 'rxjs/operators';
import { InjectionToken, Inject, Injectable, Optional, Component, Input, NgModule, TemplateRef, ComponentFactoryResolver, ChangeDetectorRef, Pipe, Directive, ElementRef, ViewContainerRef, defineInjectable, inject } from '@angular/core';
import { of, from, BehaviorSubject, combineLatest, forkJoin, Subject } from 'rxjs';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DefaultLoader {
    /**
     * @param {?} translations
     */
    constructor(translations) {
        this.translations = translations;
    }
    /**
     * @param {?} lang
     * @return {?}
     */
    getTranslation(lang) {
        return of(this.translations.get(lang) || {});
    }
}
/** @type {?} */
const TRANSLOCO_LOADER = new InjectionToken('TRANSLOCO_LOADER');

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} obj
 * @param {?} path
 * @return {?}
 */
function getValue(obj, path) {
    /* For cases where the key is like: 'general.something.thing' */
    if (obj && obj.hasOwnProperty(path)) {
        return obj[path];
    }
    return path.split('.').reduce((/**
     * @param {?} p
     * @param {?} c
     * @return {?}
     */
    (p, c) => p && p[c]), obj);
}
/**
 * @param {?} obj
 * @param {?} prop
 * @param {?} val
 * @return {?}
 */
function setValue(obj, prop, val) {
    obj = Object.assign({}, obj);
    /** @type {?} */
    const split = prop.split('.');
    /** @type {?} */
    const lastIndex = split.length - 1;
    split.reduce((/**
     * @param {?} acc
     * @param {?} part
     * @param {?} index
     * @return {?}
     */
    (acc, part, index) => {
        if (index === lastIndex) {
            acc[part] = val;
        }
        else {
            acc[part] = Array.isArray(acc[part]) ? acc[part].slice() : Object.assign({}, acc[part]);
        }
        return acc && acc[part];
    }), obj);
    return obj;
}
/**
 * @param {?} collection
 * @return {?}
 */
function size(collection) {
    if (!collection) {
        return 0;
    }
    if (Array.isArray(collection)) {
        return collection.length;
    }
    if (isObject(collection)) {
        return Object.keys(collection).length;
    }
    return !!collection ? collection.length : 0;
}
/**
 * @param {?} collection
 * @return {?}
 */
function isEmpty(collection) {
    return size(collection) === 0;
}
/**
 * @param {?} val
 * @return {?}
 */
function isFunction(val) {
    return typeof val === 'function';
}
/**
 * @param {?} val
 * @return {?}
 */
function isString(val) {
    return typeof val === 'string';
}
/**
 * @param {?} val
 * @return {?}
 */
function isNumber(val) {
    return typeof val === 'number';
}
/**
 * @param {?} item
 * @return {?}
 */
function isObject(item) {
    return item && typeof item === 'object' && !Array.isArray(item);
}
/**
 * @param {?} val
 * @return {?}
 */
function coerceArray(val) {
    return Array.isArray(val) ? val : [val];
}
/*
 * @example
 *
 * given: path-to-happiness => pathToHappiness
 * given: path_to_happiness => pathToHappiness
 * given: path-to_happiness => pathToHappiness
 *
 */
/**
 * @param {?} str
 * @return {?}
 */
function toCamelCase(str) {
    return str
        .replace(/(?:^\w|[A-Z]|\b\w)/g, (/**
     * @param {?} word
     * @param {?} index
     * @return {?}
     */
    (word, index) => (index == 0 ? word.toLowerCase() : word.toUpperCase())))
        .replace(/\s+|_|-|\//g, '');
}
/**
 * @return {?}
 */
function isBrowser() {
    return typeof window !== 'undefined';
}
/**
 * @param {?} value
 * @return {?}
 */
function isNil(value) {
    return value === null || value === undefined;
}
/**
 * @param {?} value
 * @return {?}
 */
function isDefined(value) {
    return isNil(value) === false;
}
/**
 * @param {?} value
 * @return {?}
 */
function toNumber(value) {
    if (isNumber(value))
        return value;
    if (isString(value) && !isNaN(Number(value) - parseFloat(value))) {
        return Number(value);
    }
    return null;
}
/**
 * @param {?} item
 * @return {?}
 */
function isScopeObject(item) {
    return item && typeof item.scope === 'string';
}
/**
 * @param {?} item
 * @return {?}
 */
function hasInlineLoader(item) {
    return item && isObject(item.loader);
}
/**
 * @param {?} obj
 * @return {?}
 */
function unflatten(obj) {
    return flat.unflatten(obj, { safe: true });
}
/**
 * @param {?} obj
 * @return {?}
 */
function flatten(obj) {
    return flat(obj, { safe: true });
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const TRANSLOCO_TRANSPILER = new InjectionToken('TRANSLOCO_TRANSPILER');
class DefaultTranspiler {
    /**
     * @param {?} value
     * @param {?=} params
     * @param {?=} translation
     * @return {?}
     */
    transpile(value, params = {}, translation) {
        if (isString(value)) {
            return value.replace(/{{(.*?)}}/g, (/**
             * @param {?} _
             * @param {?} match
             * @return {?}
             */
            function (_, match) {
                match = match.trim();
                if (isDefined(params[match])) {
                    return params[match];
                }
                return isDefined(translation[match]) ? translation[match] : '';
            }));
        }
        if (isObject(value) && params) {
            /**
             *
             * @example
             *
             * const en = {
             *  a: {
             *    b: {
             *      c: "Hello {{ value }}"
             *    }
             *  }
             * }
             *
             * const params =  {
             *  "b.c": { value: "Transloco "}
             * }
             *
             * service.selectTranslate('a', params);
             *
             * // the first param will be the result of `en.a`.
             * // the second param will be `params`.
             * parser.transpile(value, params, {});
             *
             *
             */
            Object.keys(params).forEach((/**
             * @param {?} p
             * @return {?}
             */
            p => {
                // get the value of "b.c" inside "a" => "Hello {{ value }}"
                /** @type {?} */
                const v = getValue(value, p);
                // get the params of "b.c" => { value: "Transloco" }
                /** @type {?} */
                const getParams = getValue(params, p);
                // transpile the value => "Hello Transloco"
                /** @type {?} */
                const transpiled = this.transpile(v, getParams, translation);
                // set "b.c" to `transpiled`
                value = setValue(value, p, transpiled);
            }));
        }
        return value;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const TRANSLOCO_CONFIG = new InjectionToken('TRANSLOCO_CONFIG', {
    providedIn: 'root',
    factory: (/**
     * @return {?}
     */
    () => {
        return {};
    })
});
/** @type {?} */
const defaultConfig = {
    defaultLang: 'en',
    reRenderOnLangChange: false,
    prodMode: false,
    failedRetries: 2,
    availableLangs: [],
    missingHandler: {
        useFallbackTranslation: false,
        allowEmpty: false
    },
    flatten: {
        aot: false
    }
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const TRANSLOCO_MISSING_HANDLER = new InjectionToken('TRANSLOCO_MISSING_HANDLER');
class DefaultHandler {
    /**
     * @param {?} key
     * @param {?} config
     * @return {?}
     */
    handle(key, config) {
        if (!config.prodMode) {
            /** @type {?} */
            const msg = `Missing translation for '${key}'`;
            console.warn(`%c ${msg}`, 'font-size: 12px; color: red');
        }
        return key;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const TRANSLOCO_INTERCEPTOR = new InjectionToken('TRANSLOCO_INTERCEPTOR');
class DefaultInterceptor {
    /**
     * @param {?} translation
     * @param {?} lang
     * @return {?}
     */
    preSaveTranslation(translation, lang) {
        return translation;
    }
    /**
     * @param {?} key
     * @param {?} value
     * @param {?} lang
     * @return {?}
     */
    preSaveTranslationKey(key, value, lang) {
        return value;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const TRANSLOCO_FALLBACK_STRATEGY = new InjectionToken('TRANSLOCO_FALLBACK_STRATEGY');
class DefaultFallbackStrategy {
    /**
     * @param {?} userConfig
     */
    constructor(userConfig) {
        this.userConfig = userConfig;
    }
    /**
     * @param {?} failedLang
     * @return {?}
     */
    getNextLangs(failedLang) {
        /** @type {?} */
        const fallbackLang = this.userConfig.fallbackLang;
        if (!fallbackLang) {
            throw new Error('When using the default fallback, a fallback language must be provided in the config!');
        }
        return Array.isArray(fallbackLang) ? fallbackLang : [fallbackLang];
    }
}
/** @nocollapse */
DefaultFallbackStrategy.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [TRANSLOCO_CONFIG,] }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} defaultConfig
 * @param {?} userConfig
 * @return {?}
 */
function mergeConfig(defaultConfig, userConfig) {
    return Object.assign({}, defaultConfig, userConfig, { missingHandler: Object.assign({}, defaultConfig.missingHandler, userConfig.missingHandler), flatten: Object.assign({}, defaultConfig.flatten, userConfig.flatten) });
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/*
 * @example
 *
 * given: lazy-page/en => lazy-page
 *
 */
/**
 * @param {?} lang
 * @return {?}
 */
function getScopeFromLang(lang) {
    if (!lang) {
        return '';
    }
    /** @type {?} */
    const split = lang.split('/');
    split.pop();
    return split.join('/');
}
/*
 * @example
 *
 * given: lazy-page/en => en
 *
 */
/**
 * @param {?} lang
 * @return {?}
 */
function getLangFromScope(lang) {
    if (!lang) {
        return '';
    }
    /** @type {?} */
    const split = lang.split('/');
    return split.pop();
}
/**
 * \@example
 *
 * getPipeValue('todos|scoped', 'scoped') [true, 'todos']
 * getPipeValue('en|static', 'static') [true, 'en']
 * getPipeValue('en', 'static') [false, 'en']
 * @param {?} str
 * @param {?} value
 * @param {?=} char
 * @return {?}
 */
function getPipeValue(str, value, char = '|') {
    if (isString(str)) {
        /** @type {?} */
        const splitted = str.split(char);
        /** @type {?} */
        const lastItem = splitted.pop();
        return lastItem === value ? [true, splitted.toString()] : [false, lastItem];
    }
    return [false, ''];
}
/**
 * @param {?} service
 * @param {?} lang
 * @return {?}
 */
function shouldListenToLangChanges(service, lang) {
    const [hasStatic] = getPipeValue(lang, 'static');
    if (hasStatic === false) {
        // If we didn't get 'lang|static' check if it's set in the global level
        return service.config.reRenderOnLangChange;
    }
    // We have 'lang|static' so don't listen to lang changes
    return false;
}
/**
 * @param {?} listenToLangChange
 * @return {?}
 */
function listenOrNotOperator(listenToLangChange) {
    return listenToLangChange ? (/**
     * @param {?} source
     * @return {?}
     */
    source => source) : take(1);
}
/**
 * @param {?} inlineLoader
 * @param {?} scope
 * @return {?}
 */
function prependScope(inlineLoader, scope) {
    return Object.keys(inlineLoader).reduce((/**
     * @param {?} acc
     * @param {?} lang
     * @return {?}
     */
    (acc, lang) => {
        acc[`${scope}/${lang}`] = inlineLoader[lang];
        return acc;
    }), {});
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} path
 * @param {?} mainLoader
 * @param {?} inlineLoader
 * @return {?}
 */
function resolveLoader(path, mainLoader, inlineLoader) {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} mainPath
 * @param {?} fallbackPath
 * @param {?} mainLoader
 * @param {?} inlineLoader
 * @return {?}
 */
function getFallbacksLoaders(mainPath, fallbackPath, mainLoader, inlineLoader) {
    return [mainPath, fallbackPath].map((/**
     * @param {?} path
     * @return {?}
     */
    path => {
        /** @type {?} */
        const loader = resolveLoader(path, mainLoader, inlineLoader);
        return from(loader).pipe(map((/**
         * @param {?} translation
         * @return {?}
         */
        translation => ({
            translation,
            lang: path
        }))));
    }));
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
let service;
/**
 * @template T
 * @param {?} key
 * @param {?=} params
 * @param {?=} lang
 * @return {?}
 */
function translate(key, params = {}, lang) {
    return service.translate(key, params, lang);
}
class TranslocoService {
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
/** @nocollapse */ TranslocoService.ngInjectableDef = defineInjectable({ factory: function TranslocoService_Factory() { return new TranslocoService(inject(TRANSLOCO_LOADER, 8), inject(TRANSLOCO_TRANSPILER), inject(TRANSLOCO_MISSING_HANDLER), inject(TRANSLOCO_INTERCEPTOR), inject(TRANSLOCO_CONFIG), inject(TRANSLOCO_FALLBACK_STRATEGY)); }, token: TranslocoService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class TranslocoLoaderComponent {
}
TranslocoLoaderComponent.decorators = [
    { type: Component, args: [{
                template: `
    <div class="transloco-loader-template" [innerHTML]="html"></div>
  `
            }] }
];
TranslocoLoaderComponent.propDecorators = {
    html: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class TemplateHandler {
    /**
     * @param {?} view
     * @param {?} vcr
     */
    constructor(view, vcr) {
        this.view = view;
        this.vcr = vcr;
        this.injector = this.vcr.injector;
    }
    /**
     * @return {?}
     */
    attachView() {
        if (this.view instanceof TemplateRef) {
            this.vcr.createEmbeddedView(this.view);
        }
        else if (isString(this.view)) {
            /** @type {?} */
            const componentRef = this.createComponent(TranslocoLoaderComponent);
            componentRef.instance.html = this.view;
            componentRef.hostView.detectChanges();
        }
        else {
            this.createComponent(this.view);
        }
    }
    /**
     * @return {?}
     */
    detachView() {
        this.vcr.clear();
    }
    /**
     * @private
     * @template T
     * @param {?} cmp
     * @return {?}
     */
    createComponent(cmp) {
        /** @type {?} */
        const cfr = this.injector.get(ComponentFactoryResolver);
        /** @type {?} */
        const factory = cfr.resolveComponentFactory(cmp);
        return this.vcr.createComponent(factory);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const TRANSLOCO_LANG = new InjectionToken('TRANSLOCO_LANG');

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const TRANSLOCO_LOADING_TEMPLATE = new InjectionToken('TRANSLOCO_LOADING_TEMPLATE');

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const TRANSLOCO_SCOPE = new InjectionToken('TRANSLOCO_SCOPE');

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class LangResolver {
    constructor() {
        this.initialized = false;
    }
    // inline => provider => active
    /**
     * @param {?=} __0
     * @return {?}
     */
    resolve({ inline, provider, active } = { inline: undefined, provider: undefined, active: undefined }) {
        /** @type {?} */
        let lang = active;
        /**
         * When the user changes the lang we need to update
         * the view. Otherwise, the lang will remain the inline/provided lang
         */
        if (this.initialized) {
            lang = active;
            return lang;
        }
        if (provider) {
            const [_, extracted] = getPipeValue(provider, 'static');
            lang = extracted;
        }
        if (inline) {
            const [_, extracted] = getPipeValue(inline, 'static');
            lang = extracted;
        }
        this.initialized = true;
        return lang;
    }
    /**
     *
     * Resolve the lang
     *
     * \@example
     *
     * resolveLangBasedOnScope('todos/en') => en
     * resolveLangBasedOnScope('en') => en
     *
     * @param {?} lang
     * @return {?}
     */
    resolveLangBasedOnScope(lang) {
        /** @type {?} */
        const scope = getScopeFromLang(lang);
        return scope ? getLangFromScope(lang) : lang;
    }
    /**
     *
     * Resolve the lang path for loading
     *
     * \@example
     *
     * resolveLangPath('todos', 'en') => todos/en
     * resolveLangPath('en') => en
     *
     * @param {?} lang
     * @param {?} scope
     * @return {?}
     */
    resolveLangPath(lang, scope) {
        return scope ? `${scope}/${lang}` : lang;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ScopeResolver {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class TranslocoDirective {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class TranslocoPipe {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const defaultProviders = [
    {
        provide: TRANSLOCO_TRANSPILER,
        useClass: DefaultTranspiler
    },
    {
        provide: TRANSLOCO_MISSING_HANDLER,
        useClass: DefaultHandler
    },
    {
        provide: TRANSLOCO_INTERCEPTOR,
        useClass: DefaultInterceptor
    },
    {
        provide: TRANSLOCO_FALLBACK_STRATEGY,
        useClass: DefaultFallbackStrategy,
        deps: [TRANSLOCO_CONFIG]
    }
];
class TranslocoModule {
}
TranslocoModule.decorators = [
    { type: NgModule, args: [{
                declarations: [TranslocoDirective, TranslocoPipe, TranslocoLoaderComponent],
                providers: [defaultProviders],
                exports: [TranslocoDirective, TranslocoPipe],
                entryComponents: [TranslocoLoaderComponent]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class TestingLoader {
    /**
     * @param {?} langs
     */
    constructor(langs) {
        this.langs = langs;
    }
    /**
     * @param {?} lang
     * @return {?}
     */
    getTranslation(lang) {
        return of(this.langs[lang]);
    }
}
/** @nocollapse */
TestingLoader.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ['translocoLangs',] }] }
];
class TranslocoTestingModule {
    /**
     * @param {?} langs
     * @param {?=} config
     * @return {?}
     */
    static withLangs(langs, config = {}) {
        return {
            ngModule: TranslocoTestingModule,
            providers: [
                {
                    provide: 'translocoLangs',
                    useValue: langs
                },
                {
                    provide: TRANSLOCO_LOADER,
                    useClass: TestingLoader
                },
                defaultProviders,
                {
                    provide: TRANSLOCO_CONFIG,
                    useValue: Object.assign({ prodMode: true }, config)
                }
            ]
        };
    }
}
TranslocoTestingModule.decorators = [
    { type: NgModule, args: [{
                exports: [TranslocoModule]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Returns the language code name from the browser, e.g. "en"
 * @return {?}
 */
function getBrowserLang() {
    if (isBrowser() === false) {
        return undefined;
    }
    /** @type {?} */
    let browserLang = getBrowserCultureLang();
    if (browserLang.indexOf('-') !== -1) {
        browserLang = browserLang.split('-')[0];
    }
    if (browserLang.indexOf('_') !== -1) {
        browserLang = browserLang.split('_')[0];
    }
    return browserLang;
}
/**
 * Returns the culture language code name from the browser, e.g. "en-US"
 * @return {?}
 */
function getBrowserCultureLang() {
    if (isBrowser() === false) {
        return undefined;
    }
    /** @type {?} */
    const navigator = (/** @type {?} */ (window.navigator));
    /** @type {?} */
    let browserCultureLang = navigator.languages ? navigator.languages[0] : null;
    browserCultureLang = browserCultureLang || navigator.language || navigator.browserLanguage || navigator.userLanguage;
    return browserCultureLang;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { translate, TranslocoService, TranslocoDirective, TranslocoPipe, TranslocoModule, defaultProviders, TRANSLOCO_LOADER, TRANSLOCO_CONFIG, defaultConfig, TRANSLOCO_TRANSPILER, DefaultTranspiler, TRANSLOCO_SCOPE, TRANSLOCO_LOADING_TEMPLATE, TRANSLOCO_LANG, TestingLoader, TranslocoTestingModule, TemplateHandler, TRANSLOCO_INTERCEPTOR, TRANSLOCO_FALLBACK_STRATEGY, DefaultFallbackStrategy, TRANSLOCO_MISSING_HANDLER, getBrowserCultureLang, getBrowserLang, getPipeValue, getLangFromScope, getScopeFromLang, getValue, setValue, size, isEmpty, isFunction, isString, isNumber, isObject, coerceArray, toCamelCase, isBrowser, isNil, isDefined, toNumber, isScopeObject, hasInlineLoader, unflatten, flatten, TranslocoLoaderComponent as ɵc, DefaultHandler as ɵb, DefaultInterceptor as ɵa };

//# sourceMappingURL=ngneat-transloco.js.map