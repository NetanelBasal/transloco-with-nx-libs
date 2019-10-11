(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('flat'), require('rxjs/operators'), require('@angular/core'), require('rxjs')) :
    typeof define === 'function' && define.amd ? define('@ngneat/transloco', ['exports', 'flat', 'rxjs/operators', '@angular/core', 'rxjs'], factory) :
    (factory((global.ngneat = global.ngneat || {}, global.ngneat.transloco = {}),global.flat,global.rxjs.operators,global.ng.core,global.rxjs));
}(this, (function (exports,flat,operators,i0,rxjs) { 'use strict';

    flat = flat && flat.hasOwnProperty('default') ? flat['default'] : flat;

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var DefaultLoader = /** @class */ (function () {
        function DefaultLoader(translations) {
            this.translations = translations;
        }
        /**
         * @param {?} lang
         * @return {?}
         */
        DefaultLoader.prototype.getTranslation = /**
         * @param {?} lang
         * @return {?}
         */
            function (lang) {
                return rxjs.of(this.translations.get(lang) || {});
            };
        return DefaultLoader;
    }());
    /** @type {?} */
    var TRANSLOCO_LOADER = new i0.InjectionToken('TRANSLOCO_LOADER');

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
        return path.split('.').reduce(( /**
         * @param {?} p
         * @param {?} c
         * @return {?}
         */function (p, c) { return p && p[c]; }), obj);
    }
    /**
     * @param {?} obj
     * @param {?} prop
     * @param {?} val
     * @return {?}
     */
    function setValue(obj, prop, val) {
        obj = __assign({}, obj);
        /** @type {?} */
        var split = prop.split('.');
        /** @type {?} */
        var lastIndex = split.length - 1;
        split.reduce(( /**
         * @param {?} acc
         * @param {?} part
         * @param {?} index
         * @return {?}
         */function (acc, part, index) {
            if (index === lastIndex) {
                acc[part] = val;
            }
            else {
                acc[part] = Array.isArray(acc[part]) ? acc[part].slice() : __assign({}, acc[part]);
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
            .replace(/(?:^\w|[A-Z]|\b\w)/g, ( /**
     * @param {?} word
     * @param {?} index
     * @return {?}
     */function (word, index) { return (index == 0 ? word.toLowerCase() : word.toUpperCase()); }))
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
    var TRANSLOCO_TRANSPILER = new i0.InjectionToken('TRANSLOCO_TRANSPILER');
    var DefaultTranspiler = /** @class */ (function () {
        function DefaultTranspiler() {
        }
        /**
         * @param {?} value
         * @param {?=} params
         * @param {?=} translation
         * @return {?}
         */
        DefaultTranspiler.prototype.transpile = /**
         * @param {?} value
         * @param {?=} params
         * @param {?=} translation
         * @return {?}
         */
            function (value, params, translation) {
                var _this = this;
                if (params === void 0) {
                    params = {};
                }
                if (isString(value)) {
                    return value.replace(/{{(.*?)}}/g, ( /**
                     * @param {?} _
                     * @param {?} match
                     * @return {?}
                     */function (_, match) {
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
                    Object.keys(params).forEach(( /**
                     * @param {?} p
                     * @return {?}
                     */function (p) {
                        // get the value of "b.c" inside "a" => "Hello {{ value }}"
                        /** @type {?} */
                        var v = getValue(value, p);
                        // get the params of "b.c" => { value: "Transloco" }
                        /** @type {?} */
                        var getParams = getValue(params, p);
                        // transpile the value => "Hello Transloco"
                        /** @type {?} */
                        var transpiled = _this.transpile(v, getParams, translation);
                        // set "b.c" to `transpiled`
                        value = setValue(value, p, transpiled);
                    }));
                }
                return value;
            };
        return DefaultTranspiler;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var TRANSLOCO_CONFIG = new i0.InjectionToken('TRANSLOCO_CONFIG', {
        providedIn: 'root',
        factory: ( /**
         * @return {?}
         */function () {
            return {};
        })
    });
    /** @type {?} */
    var defaultConfig = {
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
    var TRANSLOCO_MISSING_HANDLER = new i0.InjectionToken('TRANSLOCO_MISSING_HANDLER');
    var DefaultHandler = /** @class */ (function () {
        function DefaultHandler() {
        }
        /**
         * @param {?} key
         * @param {?} config
         * @return {?}
         */
        DefaultHandler.prototype.handle = /**
         * @param {?} key
         * @param {?} config
         * @return {?}
         */
            function (key, config) {
                if (!config.prodMode) {
                    /** @type {?} */
                    var msg = "Missing translation for '" + key + "'";
                    console.warn("%c " + msg, 'font-size: 12px; color: red');
                }
                return key;
            };
        return DefaultHandler;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var TRANSLOCO_INTERCEPTOR = new i0.InjectionToken('TRANSLOCO_INTERCEPTOR');
    var DefaultInterceptor = /** @class */ (function () {
        function DefaultInterceptor() {
        }
        /**
         * @param {?} translation
         * @param {?} lang
         * @return {?}
         */
        DefaultInterceptor.prototype.preSaveTranslation = /**
         * @param {?} translation
         * @param {?} lang
         * @return {?}
         */
            function (translation, lang) {
                return translation;
            };
        /**
         * @param {?} key
         * @param {?} value
         * @param {?} lang
         * @return {?}
         */
        DefaultInterceptor.prototype.preSaveTranslationKey = /**
         * @param {?} key
         * @param {?} value
         * @param {?} lang
         * @return {?}
         */
            function (key, value, lang) {
                return value;
            };
        return DefaultInterceptor;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var TRANSLOCO_FALLBACK_STRATEGY = new i0.InjectionToken('TRANSLOCO_FALLBACK_STRATEGY');
    var DefaultFallbackStrategy = /** @class */ (function () {
        function DefaultFallbackStrategy(userConfig) {
            this.userConfig = userConfig;
        }
        /**
         * @param {?} failedLang
         * @return {?}
         */
        DefaultFallbackStrategy.prototype.getNextLangs = /**
         * @param {?} failedLang
         * @return {?}
         */
            function (failedLang) {
                /** @type {?} */
                var fallbackLang = this.userConfig.fallbackLang;
                if (!fallbackLang) {
                    throw new Error('When using the default fallback, a fallback language must be provided in the config!');
                }
                return Array.isArray(fallbackLang) ? fallbackLang : [fallbackLang];
            };
        /** @nocollapse */
        DefaultFallbackStrategy.ctorParameters = function () {
            return [
                { type: undefined, decorators: [{ type: i0.Inject, args: [TRANSLOCO_CONFIG,] }] }
            ];
        };
        return DefaultFallbackStrategy;
    }());

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
        return __assign({}, defaultConfig, userConfig, { missingHandler: __assign({}, defaultConfig.missingHandler, userConfig.missingHandler), flatten: __assign({}, defaultConfig.flatten, userConfig.flatten) });
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
        var split = lang.split('/');
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
        var split = lang.split('/');
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
    function getPipeValue(str, value, char) {
        if (char === void 0) {
            char = '|';
        }
        if (isString(str)) {
            /** @type {?} */
            var splitted = str.split(char);
            /** @type {?} */
            var lastItem = splitted.pop();
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
        var _a = __read(getPipeValue(lang, 'static'), 1), hasStatic = _a[0];
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
        return listenToLangChange ? ( /**
         * @param {?} source
         * @return {?}
         */function (source) { return source; }) : operators.take(1);
    }
    /**
     * @param {?} inlineLoader
     * @param {?} scope
     * @return {?}
     */
    function prependScope(inlineLoader, scope) {
        return Object.keys(inlineLoader).reduce(( /**
         * @param {?} acc
         * @param {?} lang
         * @return {?}
         */function (acc, lang) {
            acc[scope + "/" + lang] = inlineLoader[lang];
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
            var pathLoader = inlineLoader[path];
            if (isFunction(pathLoader) === false) {
                throw "You're using an inline loader but didn't provide a loader for " + path;
            }
            return inlineLoader[path]().then(( /**
             * @param {?} res
             * @return {?}
             */function (res) { return res.default; }));
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
        return [mainPath, fallbackPath].map(( /**
         * @param {?} path
         * @return {?}
         */function (path) {
            /** @type {?} */
            var loader = resolveLoader(path, mainLoader, inlineLoader);
            return rxjs.from(loader).pipe(operators.map(( /**
             * @param {?} translation
             * @return {?}
             */function (translation) {
                return ({
                    translation: translation,
                    lang: path
                });
            })));
        }));
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var service;
    /**
     * @template T
     * @param {?} key
     * @param {?=} params
     * @param {?=} lang
     * @return {?}
     */
    function translate(key, params, lang) {
        if (params === void 0) {
            params = {};
        }
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
            this.events = new rxjs.Subject();
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
            this.lang = new rxjs.BehaviorSubject(this.getDefaultLang());
            // Don't use distinctUntilChanged as we need the ability to update
            // the value when using setTranslation or setTranslationKeys
            this.langChanges$ = this.lang.asObservable();
            /**
             * When we have a failure, we want to define the next language that succeeded as the active
             */
            this.subscription = this.events$.subscribe(( /**
             * @param {?} e
             * @return {?}
             */function (e) {
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
             */ function () {
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
                ( /** @type {?} */(this)).lang.next(lang);
                return ( /** @type {?} */(this));
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
                if (options === void 0) {
                    options = {};
                }
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
                        loadTranslation = rxjs.forkJoin(loaders);
                    }
                    else {
                        /** @type {?} */
                        var loader = resolveLoader(path, this.loader, options.inlineLoader);
                        loadTranslation = rxjs.from(loader);
                    }
                    /** @type {?} */
                    var load$ = loadTranslation.pipe(operators.retry(this.config.failedRetries), operators.catchError(( /**
                     * @return {?}
                     */function () { return _this.handleFailure(path, options); })), operators.tap(( /**
                     * @param {?} translation
                     * @return {?}
                     */function (translation) {
                        if (Array.isArray(translation)) {
                            translation.forEach(( /**
                             * @param {?} t
                             * @return {?}
                             */function (t) {
                                _this.handleSuccess(t.lang, t.translation);
                                // Save the fallback in cache so we'll not create a redundant request
                                if (t.lang !== path) {
                                    _this.cache.set(t.lang, rxjs.of({}));
                                }
                            }));
                            return;
                        }
                        _this.handleSuccess(path, translation);
                    })), operators.shareReplay(1));
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
                if (params === void 0) {
                    params = {};
                }
                if (lang === void 0) {
                    lang = this.getActiveLang();
                }
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
                    return ( /** @type {?} */(key.map(( /**
                     * @param {?} k
                     * @return {?}
                     */function (k) { return _this.translate(scope ? scope + "." + k : k, params, resolveLang); }))));
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
                if (_isObject === void 0) {
                    _isObject = false;
                }
                /** @type {?} */
                var load = ( /**
                 * @param {?} lang
                 * @return {?}
                 */function (lang) {
                    return _this.load(lang).pipe(operators.map(( /**
                     * @return {?}
                     */function () { return (_isObject ? _this.translateObject(key, params, lang) : _this.translate(key, params, lang)); })));
                });
                if (isString(lang)) {
                    /** @type {?} */
                    var langOrScope = this._completeScopeWithLang(lang);
                    return load(langOrScope);
                }
                else {
                    // if the user doesn't pass lang, we need to listen to lang changes and update the value accordingly
                    return this.langChanges$.pipe(operators.switchMap(( /**
                     * @param {?} lang
                     * @return {?}
                     */function (lang) { return load(lang); })));
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
                if (lang === void 0) {
                    lang = this.getActiveLang();
                }
                if (Array.isArray(key)) {
                    return ( /** @type {?} */(key.map(( /**
                     * @param {?} k
                     * @return {?}
                     */function (k) { return _this.translateObject(k, params, lang); }))));
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
                return this.load(language).pipe(operators.map(( /**
                 * @return {?}
                 */function () { return _this.getTranslation(language); })));
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
                if (lang === void 0) {
                    lang = this.getActiveLang();
                }
                if (options === void 0) {
                    options = {};
                }
                var _a;
                /** @type {?} */
                var defaults = { merge: true, emitChange: true };
                /** @type {?} */
                var mergedOptions = __assign({}, defaults, options);
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
                var mergedTranslation = __assign({}, (mergedOptions.merge && this.getTranslation(currentLang)), flattenScopeOrTranslation);
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
                if (lang === void 0) {
                    lang = this.getActiveLang();
                }
                var _a;
                /** @type {?} */
                var withHook = this.interceptor.preSaveTranslationKey(key, value, lang);
                /** @type {?} */
                var newValue = __assign({}, this.getTranslation(lang), (_a = {}, _a[key] = withHook, _a));
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
                    return rxjs.combineLatest(this.load(mainLang), this.load(path, { inlineLoader: inlineLoader }));
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
                    return ( /** @type {?} */(this.getAvailableLangs()));
                }
                return (( /** @type {?} */(this.getAvailableLangs()))).map(( /**
                 * @param {?} l
                 * @return {?}
                 */function (l) { return l.id; }));
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
            { type: i0.Injectable, args: [{ providedIn: 'root' },] }
        ];
        /** @nocollapse */
        TranslocoService.ctorParameters = function () {
            return [
                { type: undefined, decorators: [{ type: i0.Optional }, { type: i0.Inject, args: [TRANSLOCO_LOADER,] }] },
                { type: undefined, decorators: [{ type: i0.Inject, args: [TRANSLOCO_TRANSPILER,] }] },
                { type: undefined, decorators: [{ type: i0.Inject, args: [TRANSLOCO_MISSING_HANDLER,] }] },
                { type: undefined, decorators: [{ type: i0.Inject, args: [TRANSLOCO_INTERCEPTOR,] }] },
                { type: undefined, decorators: [{ type: i0.Inject, args: [TRANSLOCO_CONFIG,] }] },
                { type: undefined, decorators: [{ type: i0.Inject, args: [TRANSLOCO_FALLBACK_STRATEGY,] }] }
            ];
        };
        /** @nocollapse */ TranslocoService.ngInjectableDef = i0.defineInjectable({ factory: function TranslocoService_Factory() { return new TranslocoService(i0.inject(TRANSLOCO_LOADER, 8), i0.inject(TRANSLOCO_TRANSPILER), i0.inject(TRANSLOCO_MISSING_HANDLER), i0.inject(TRANSLOCO_INTERCEPTOR), i0.inject(TRANSLOCO_CONFIG), i0.inject(TRANSLOCO_FALLBACK_STRATEGY)); }, token: TranslocoService, providedIn: "root" });
        return TranslocoService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var TranslocoLoaderComponent = /** @class */ (function () {
        function TranslocoLoaderComponent() {
        }
        TranslocoLoaderComponent.decorators = [
            { type: i0.Component, args: [{
                        template: "\n    <div class=\"transloco-loader-template\" [innerHTML]=\"html\"></div>\n  "
                    }] }
        ];
        TranslocoLoaderComponent.propDecorators = {
            html: [{ type: i0.Input }]
        };
        return TranslocoLoaderComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var TemplateHandler = /** @class */ (function () {
        function TemplateHandler(view, vcr) {
            this.view = view;
            this.vcr = vcr;
            this.injector = this.vcr.injector;
        }
        /**
         * @return {?}
         */
        TemplateHandler.prototype.attachView = /**
         * @return {?}
         */
            function () {
                if (this.view instanceof i0.TemplateRef) {
                    this.vcr.createEmbeddedView(this.view);
                }
                else if (isString(this.view)) {
                    /** @type {?} */
                    var componentRef = this.createComponent(TranslocoLoaderComponent);
                    componentRef.instance.html = this.view;
                    componentRef.hostView.detectChanges();
                }
                else {
                    this.createComponent(this.view);
                }
            };
        /**
         * @return {?}
         */
        TemplateHandler.prototype.detachView = /**
         * @return {?}
         */
            function () {
                this.vcr.clear();
            };
        /**
         * @private
         * @template T
         * @param {?} cmp
         * @return {?}
         */
        TemplateHandler.prototype.createComponent = /**
         * @private
         * @template T
         * @param {?} cmp
         * @return {?}
         */
            function (cmp) {
                /** @type {?} */
                var cfr = this.injector.get(i0.ComponentFactoryResolver);
                /** @type {?} */
                var factory = cfr.resolveComponentFactory(cmp);
                return this.vcr.createComponent(factory);
            };
        return TemplateHandler;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var TRANSLOCO_LANG = new i0.InjectionToken('TRANSLOCO_LANG');

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var TRANSLOCO_LOADING_TEMPLATE = new i0.InjectionToken('TRANSLOCO_LOADING_TEMPLATE');

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var TRANSLOCO_SCOPE = new i0.InjectionToken('TRANSLOCO_SCOPE');

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var LangResolver = /** @class */ (function () {
        function LangResolver() {
            this.initialized = false;
        }
        // inline => provider => active
        // inline => provider => active
        /**
         * @param {?=} __0
         * @return {?}
         */
        LangResolver.prototype.resolve =
            // inline => provider => active
            /**
             * @param {?=} __0
             * @return {?}
             */
            function (_a) {
                var _b = _a === void 0 ? { inline: undefined, provider: undefined, active: undefined } : _a, inline = _b.inline, provider = _b.provider, active = _b.active;
                /** @type {?} */
                var lang = active;
                /**
                 * When the user changes the lang we need to update
                 * the view. Otherwise, the lang will remain the inline/provided lang
                 */
                if (this.initialized) {
                    lang = active;
                    return lang;
                }
                if (provider) {
                    var _c = __read(getPipeValue(provider, 'static'), 2), _ = _c[0], extracted = _c[1];
                    lang = extracted;
                }
                if (inline) {
                    var _d = __read(getPipeValue(inline, 'static'), 2), _ = _d[0], extracted = _d[1];
                    lang = extracted;
                }
                this.initialized = true;
                return lang;
            };
        /**
         *
         * Resolve the lang
         *
         * @example
         *
         * resolveLangBasedOnScope('todos/en') => en
         * resolveLangBasedOnScope('en') => en
         *
         */
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
        LangResolver.prototype.resolveLangBasedOnScope = /**
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
            function (lang) {
                /** @type {?} */
                var scope = getScopeFromLang(lang);
                return scope ? getLangFromScope(lang) : lang;
            };
        /**
         *
         * Resolve the lang path for loading
         *
         * @example
         *
         * resolveLangPath('todos', 'en') => todos/en
         * resolveLangPath('en') => en
         *
         */
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
        LangResolver.prototype.resolveLangPath = /**
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
            function (lang, scope) {
                return scope ? scope + "/" + lang : lang;
            };
        return LangResolver;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
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
                        var _c = ( /** @type {?} */(provider)), scope = _c.scope, _d = _c.alias, alias = _d === void 0 ? toCamelCase(scope) : _d;
                        this.translocoService._setScopeAlias(scope, alias);
                        return scope;
                    }
                    return ( /** @type {?} */(provider));
                }
                return undefined;
            };
        return ScopeResolver;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
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
                    .pipe(operators.switchMap(( /**
             * @param {?} activeLang
             * @return {?}
             */function (activeLang) {
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
                    .subscribe(( /**
             * @return {?}
             */function () {
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
                var notInit = Object.keys(changes).some(( /**
                 * @param {?} v
                 * @return {?}
                 */function (v) { return changes[v].firstChange === false; }));
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
                return ( /**
                 * @param {?} key
                 * @param {?} params
                 * @return {?}
                 */function (key, params) {
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
            { type: i0.Directive, args: [{
                        selector: '[transloco]'
                    },] }
        ];
        /** @nocollapse */
        TranslocoDirective.ctorParameters = function () {
            return [
                { type: TranslocoService },
                { type: i0.TemplateRef, decorators: [{ type: i0.Optional }] },
                { type: undefined, decorators: [{ type: i0.Optional }, { type: i0.Inject, args: [TRANSLOCO_SCOPE,] }] },
                { type: undefined, decorators: [{ type: i0.Optional }, { type: i0.Inject, args: [TRANSLOCO_LANG,] }] },
                { type: undefined, decorators: [{ type: i0.Optional }, { type: i0.Inject, args: [TRANSLOCO_LOADING_TEMPLATE,] }] },
                { type: i0.ViewContainerRef },
                { type: i0.ChangeDetectorRef },
                { type: i0.ElementRef }
            ];
        };
        TranslocoDirective.propDecorators = {
            key: [{ type: i0.Input, args: ['transloco',] }],
            params: [{ type: i0.Input, args: ['translocoParams',] }],
            inlineScope: [{ type: i0.Input, args: ['translocoScope',] }],
            inlineRead: [{ type: i0.Input, args: ['translocoRead',] }],
            inlineLang: [{ type: i0.Input, args: ['translocoLang',] }],
            inlineTpl: [{ type: i0.Input, args: ['translocoLoadingTpl',] }]
        };
        return TranslocoDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
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
                    .pipe(operators.switchMap(( /**
             * @param {?} activeLang
             * @return {?}
             */function (activeLang) {
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
                    .subscribe(( /**
             * @return {?}
             */function () { return _this.updateValue(key, params); }));
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
            { type: i0.Pipe, args: [{
                        name: 'transloco',
                        pure: false
                    },] }
        ];
        /** @nocollapse */
        TranslocoPipe.ctorParameters = function () {
            return [
                { type: TranslocoService },
                { type: undefined, decorators: [{ type: i0.Optional }, { type: i0.Inject, args: [TRANSLOCO_SCOPE,] }] },
                { type: undefined, decorators: [{ type: i0.Optional }, { type: i0.Inject, args: [TRANSLOCO_LANG,] }] },
                { type: i0.ChangeDetectorRef }
            ];
        };
        return TranslocoPipe;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var defaultProviders = [
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
    var TranslocoModule = /** @class */ (function () {
        function TranslocoModule() {
        }
        TranslocoModule.decorators = [
            { type: i0.NgModule, args: [{
                        declarations: [TranslocoDirective, TranslocoPipe, TranslocoLoaderComponent],
                        providers: [defaultProviders],
                        exports: [TranslocoDirective, TranslocoPipe],
                        entryComponents: [TranslocoLoaderComponent]
                    },] }
        ];
        return TranslocoModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var TestingLoader = /** @class */ (function () {
        function TestingLoader(langs) {
            this.langs = langs;
        }
        /**
         * @param {?} lang
         * @return {?}
         */
        TestingLoader.prototype.getTranslation = /**
         * @param {?} lang
         * @return {?}
         */
            function (lang) {
                return rxjs.of(this.langs[lang]);
            };
        /** @nocollapse */
        TestingLoader.ctorParameters = function () {
            return [
                { type: undefined, decorators: [{ type: i0.Inject, args: ['translocoLangs',] }] }
            ];
        };
        return TestingLoader;
    }());
    var TranslocoTestingModule = /** @class */ (function () {
        function TranslocoTestingModule() {
        }
        /**
         * @param {?} langs
         * @param {?=} config
         * @return {?}
         */
        TranslocoTestingModule.withLangs = /**
         * @param {?} langs
         * @param {?=} config
         * @return {?}
         */
            function (langs, config) {
                if (config === void 0) {
                    config = {};
                }
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
                            useValue: __assign({ prodMode: true }, config)
                        }
                    ]
                };
            };
        TranslocoTestingModule.decorators = [
            { type: i0.NgModule, args: [{
                        exports: [TranslocoModule]
                    },] }
        ];
        return TranslocoTestingModule;
    }());

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
        var browserLang = getBrowserCultureLang();
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
        var navigator = ( /** @type {?} */(window.navigator));
        /** @type {?} */
        var browserCultureLang = navigator.languages ? navigator.languages[0] : null;
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

    exports.translate = translate;
    exports.TranslocoService = TranslocoService;
    exports.TranslocoDirective = TranslocoDirective;
    exports.TranslocoPipe = TranslocoPipe;
    exports.TranslocoModule = TranslocoModule;
    exports.defaultProviders = defaultProviders;
    exports.TRANSLOCO_LOADER = TRANSLOCO_LOADER;
    exports.TRANSLOCO_CONFIG = TRANSLOCO_CONFIG;
    exports.defaultConfig = defaultConfig;
    exports.TRANSLOCO_TRANSPILER = TRANSLOCO_TRANSPILER;
    exports.DefaultTranspiler = DefaultTranspiler;
    exports.TRANSLOCO_SCOPE = TRANSLOCO_SCOPE;
    exports.TRANSLOCO_LOADING_TEMPLATE = TRANSLOCO_LOADING_TEMPLATE;
    exports.TRANSLOCO_LANG = TRANSLOCO_LANG;
    exports.TestingLoader = TestingLoader;
    exports.TranslocoTestingModule = TranslocoTestingModule;
    exports.TemplateHandler = TemplateHandler;
    exports.TRANSLOCO_INTERCEPTOR = TRANSLOCO_INTERCEPTOR;
    exports.TRANSLOCO_FALLBACK_STRATEGY = TRANSLOCO_FALLBACK_STRATEGY;
    exports.DefaultFallbackStrategy = DefaultFallbackStrategy;
    exports.TRANSLOCO_MISSING_HANDLER = TRANSLOCO_MISSING_HANDLER;
    exports.getBrowserCultureLang = getBrowserCultureLang;
    exports.getBrowserLang = getBrowserLang;
    exports.getPipeValue = getPipeValue;
    exports.getLangFromScope = getLangFromScope;
    exports.getScopeFromLang = getScopeFromLang;
    exports.getValue = getValue;
    exports.setValue = setValue;
    exports.size = size;
    exports.isEmpty = isEmpty;
    exports.isFunction = isFunction;
    exports.isString = isString;
    exports.isNumber = isNumber;
    exports.isObject = isObject;
    exports.coerceArray = coerceArray;
    exports.toCamelCase = toCamelCase;
    exports.isBrowser = isBrowser;
    exports.isNil = isNil;
    exports.isDefined = isDefined;
    exports.toNumber = toNumber;
    exports.isScopeObject = isScopeObject;
    exports.hasInlineLoader = hasInlineLoader;
    exports.unflatten = unflatten;
    exports.flatten = flatten;
    exports.ɵc = TranslocoLoaderComponent;
    exports.ɵb = DefaultHandler;
    exports.ɵa = DefaultInterceptor;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=ngneat-transloco.umd.js.map