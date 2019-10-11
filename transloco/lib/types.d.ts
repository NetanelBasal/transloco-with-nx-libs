export declare type HashMap<T = any> = {
    [key: string]: T;
};
export declare type LoadedEvent = {
    type: 'translationLoadSuccess';
    wasFailure: boolean;
    payload: {
        lang: string;
    };
};
export declare type FailedEvent = {
    type: 'translationLoadFailure';
    payload: {
        lang: string;
    };
};
export declare type TranslocoEvents = LoadedEvent | FailedEvent;
export declare type Translation = HashMap<any>;
export declare type PersistStorage = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;
export declare type TranslateParams = string | string[];
export declare type AvailableLangs = string[] | {
    id: string;
    label: string;
}[];
export declare type SetTranslationOptions = {
    merge?: boolean;
    emitChange?: boolean;
};
export declare type ProviderScope = {
    scope: string;
    loader?: InlineLoader;
    alias?: string;
};
export declare type TranslocoScope = ProviderScope | string | undefined;
export declare type InlineLoader = HashMap<() => Promise<Translation>>;
export declare type LoadOptions = {
    fallbackLangs?: string[] | null;
    inlineLoader?: InlineLoader | null;
};
