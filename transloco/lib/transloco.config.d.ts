import { InjectionToken } from '@angular/core';
import { AvailableLangs, HashMap } from './types';
export declare type TranslocoConfig = {
    defaultLang: string;
    reRenderOnLangChange?: boolean;
    prodMode?: boolean;
    fallbackLang?: string | string[];
    failedRetries?: number;
    scopeMapping?: HashMap<string>;
    availableLangs?: AvailableLangs;
    flatten?: {
        aot?: boolean;
    };
    missingHandler?: {
        useFallbackTranslation?: boolean;
        allowEmpty?: boolean;
    };
};
export declare const TRANSLOCO_CONFIG: InjectionToken<{}>;
export declare const defaultConfig: TranslocoConfig;
