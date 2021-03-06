import { OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { TranslocoLoader } from './transloco.loader';
import { TranslocoTranspiler } from './transloco.transpiler';
import { AvailableLangs, HashMap, InlineLoader, LoadOptions, SetTranslationOptions, TranslateParams, Translation, TranslocoEvents } from './types';
import { TranslocoConfig } from './transloco.config';
import { TranslocoMissingHandler } from './transloco-missing-handler';
import { TranslocoInterceptor } from './transloco.interceptor';
import { TranslocoFallbackStrategy } from './transloco-fallback-strategy';
export declare function translate<T = any>(key: TranslateParams, params?: HashMap, lang?: string): T;
export declare class TranslocoService implements OnDestroy {
    private loader;
    private parser;
    private missingHandler;
    private interceptor;
    private userConfig;
    private fallbackStrategy;
    private subscription;
    private translations;
    private cache;
    private firstFallbackLang;
    private defaultLang;
    private mergedConfig;
    private availableLangs;
    private isResolvedMissingOnce;
    private lang;
    langChanges$: Observable<string>;
    private events;
    events$: Observable<TranslocoEvents>;
    private failedCounter;
    private failedLangs;
    constructor(loader: TranslocoLoader, parser: TranslocoTranspiler, missingHandler: TranslocoMissingHandler, interceptor: TranslocoInterceptor, userConfig: TranslocoConfig, fallbackStrategy: TranslocoFallbackStrategy);
    readonly config: TranslocoConfig;
    getDefaultLang(): string;
    setDefaultLang(lang: string): void;
    getActiveLang(): string;
    setActiveLang(lang: string): this;
    setAvailableLangs(langs: AvailableLangs): void;
    getAvailableLangs(): AvailableLangs;
    load(path: string, options?: LoadOptions): Observable<Translation>;
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
    translate<T = any>(key: TranslateParams, params?: HashMap, lang?: string): T;
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
    selectTranslate<T = any>(key: TranslateParams, params?: HashMap, lang?: string, _isObject?: boolean): Observable<T>;
    /**
     * Translate the given path that returns an object
     *
     * @example
     *
     * service.translateObject('path.to.object', {'subpath': { value: 'someValue'}}) => returns translated object
     *
     */
    translateObject<T = any>(key: TranslateParams, params?: HashMap, lang?: string): T;
    selectTranslateObject<T = any>(key: TranslateParams, params?: HashMap, lang?: string): Observable<T>;
    /**
     * Gets an object of translations for a given language
     *
     * @example
     *
     * getTranslation()
     * getTranslation('en')
     * getTranslation('admin-page/en')
     */
    getTranslation(): Map<string, Translation>;
    getTranslation(lang: string): Translation;
    /**
     * Gets an object of translations for a given language
     *
     * @example
     *
     * selectTranslation().subscribe()
     * selectTranslation('es').subscribe()
     */
    selectTranslation(lang?: string): Observable<Translation>;
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
    setTranslation(translation: Translation, lang?: string, options?: SetTranslationOptions): void;
    /**
     * Sets translation key with given value
     *
     * @example
     *
     * setTranslationKey('key', 'value')
     * setTranslationKey('key.nested', 'value')
     * setTranslationKey('key.nested', 'value', 'en')
     */
    setTranslationKey(key: string, value: string, lang?: string): void;
    handleMissingKey(key: string, value: any, params?: HashMap): any;
    /**
     * @internal
     */
    _isLangScoped(lang: string): boolean;
    /**
     * @internal
     */
    _isLang(lang: string): boolean;
    /**
     * @internal
     *
     * We always want to make sure the global lang is loaded
     * before loading the scope since you can access both via the pipe/directive.
     */
    _loadDependencies(path: string, inlineLoader?: InlineLoader): Observable<Translation | Translation[]>;
    private isLoadedTranslation;
    /**
     * @internal
     */
    _completeScopeWithLang(langOrScope: string): string;
    /**
     * @internal
     */
    _setScopeAlias(scope: string, alias: string): void;
    private getAvailableLangsIds;
    private useFallbackTranslation;
    private handleSuccess;
    private handleFailure;
    private setFallbackLangForMissingTranslation;
    ngOnDestroy(): void;
    private getMappedScope;
}
