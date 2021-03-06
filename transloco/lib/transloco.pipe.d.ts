import { ChangeDetectorRef, OnDestroy, PipeTransform } from '@angular/core';
import { TranslocoService } from './transloco.service';
import { HashMap, ProviderScope } from './types';
export declare class TranslocoPipe implements PipeTransform, OnDestroy {
    private translocoService;
    private providerScope;
    private providerLang;
    private cdr;
    private subscription;
    private lastValue;
    private lastKey;
    private listenToLangChange;
    private path;
    private langResolver;
    private scopeResolver;
    constructor(translocoService: TranslocoService, providerScope: string | ProviderScope | null, providerLang: string | null, cdr: ChangeDetectorRef);
    transform(key: string, params?: HashMap | undefined, inlineLang?: string | undefined): string;
    ngOnDestroy(): void;
    private updateValue;
}
