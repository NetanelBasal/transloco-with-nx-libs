/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { TranslocoLoaderComponent } from './loader-component.component';
import { TranslocoDirective } from './transloco.directive';
import { DefaultTranspiler, TRANSLOCO_TRANSPILER } from './transloco.transpiler';
import { TranslocoPipe } from './transloco.pipe';
import { DefaultHandler, TRANSLOCO_MISSING_HANDLER } from './transloco-missing-handler';
import { DefaultInterceptor, TRANSLOCO_INTERCEPTOR } from './transloco.interceptor';
import { DefaultFallbackStrategy, TRANSLOCO_FALLBACK_STRATEGY } from './transloco-fallback-strategy';
import { TRANSLOCO_CONFIG } from './transloco.config';
/** @type {?} */
export var defaultProviders = [
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
        { type: NgModule, args: [{
                    declarations: [TranslocoDirective, TranslocoPipe, TranslocoLoaderComponent],
                    providers: [defaultProviders],
                    exports: [TranslocoDirective, TranslocoPipe],
                    entryComponents: [TranslocoLoaderComponent]
                },] }
    ];
    return TranslocoModule;
}());
export { TranslocoModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsb2NvLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ25lYXQvdHJhbnNsb2NvLyIsInNvdXJjZXMiOlsibGliL3RyYW5zbG9jby5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDeEUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGlCQUFpQixFQUFFLG9CQUFvQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDakYsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxjQUFjLEVBQUUseUJBQXlCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUN4RixPQUFPLEVBQUUsa0JBQWtCLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNwRixPQUFPLEVBQUUsdUJBQXVCLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNyRyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7QUFFdEQsTUFBTSxLQUFPLGdCQUFnQixHQUFHO0lBQzlCO1FBQ0UsT0FBTyxFQUFFLG9CQUFvQjtRQUM3QixRQUFRLEVBQUUsaUJBQWlCO0tBQzVCO0lBQ0Q7UUFDRSxPQUFPLEVBQUUseUJBQXlCO1FBQ2xDLFFBQVEsRUFBRSxjQUFjO0tBQ3pCO0lBQ0Q7UUFDRSxPQUFPLEVBQUUscUJBQXFCO1FBQzlCLFFBQVEsRUFBRSxrQkFBa0I7S0FDN0I7SUFDRDtRQUNFLE9BQU8sRUFBRSwyQkFBMkI7UUFDcEMsUUFBUSxFQUFFLHVCQUF1QjtRQUNqQyxJQUFJLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQztLQUN6QjtDQUNGO0FBRUQ7SUFBQTtJQU04QixDQUFDOztnQkFOOUIsUUFBUSxTQUFDO29CQUNSLFlBQVksRUFBRSxDQUFDLGtCQUFrQixFQUFFLGFBQWEsRUFBRSx3QkFBd0IsQ0FBQztvQkFDM0UsU0FBUyxFQUFFLENBQUMsZ0JBQWdCLENBQUM7b0JBQzdCLE9BQU8sRUFBRSxDQUFDLGtCQUFrQixFQUFFLGFBQWEsQ0FBQztvQkFDNUMsZUFBZSxFQUFFLENBQUMsd0JBQXdCLENBQUM7aUJBQzVDOztJQUM2QixzQkFBQztDQUFBLEFBTi9CLElBTStCO1NBQWxCLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVHJhbnNsb2NvTG9hZGVyQ29tcG9uZW50IH0gZnJvbSAnLi9sb2FkZXItY29tcG9uZW50LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUcmFuc2xvY29EaXJlY3RpdmUgfSBmcm9tICcuL3RyYW5zbG9jby5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRGVmYXVsdFRyYW5zcGlsZXIsIFRSQU5TTE9DT19UUkFOU1BJTEVSIH0gZnJvbSAnLi90cmFuc2xvY28udHJhbnNwaWxlcic7XG5pbXBvcnQgeyBUcmFuc2xvY29QaXBlIH0gZnJvbSAnLi90cmFuc2xvY28ucGlwZSc7XG5pbXBvcnQgeyBEZWZhdWx0SGFuZGxlciwgVFJBTlNMT0NPX01JU1NJTkdfSEFORExFUiB9IGZyb20gJy4vdHJhbnNsb2NvLW1pc3NpbmctaGFuZGxlcic7XG5pbXBvcnQgeyBEZWZhdWx0SW50ZXJjZXB0b3IsIFRSQU5TTE9DT19JTlRFUkNFUFRPUiB9IGZyb20gJy4vdHJhbnNsb2NvLmludGVyY2VwdG9yJztcbmltcG9ydCB7IERlZmF1bHRGYWxsYmFja1N0cmF0ZWd5LCBUUkFOU0xPQ09fRkFMTEJBQ0tfU1RSQVRFR1kgfSBmcm9tICcuL3RyYW5zbG9jby1mYWxsYmFjay1zdHJhdGVneSc7XG5pbXBvcnQgeyBUUkFOU0xPQ09fQ09ORklHIH0gZnJvbSAnLi90cmFuc2xvY28uY29uZmlnJztcblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRQcm92aWRlcnMgPSBbXG4gIHtcbiAgICBwcm92aWRlOiBUUkFOU0xPQ09fVFJBTlNQSUxFUixcbiAgICB1c2VDbGFzczogRGVmYXVsdFRyYW5zcGlsZXJcbiAgfSxcbiAge1xuICAgIHByb3ZpZGU6IFRSQU5TTE9DT19NSVNTSU5HX0hBTkRMRVIsXG4gICAgdXNlQ2xhc3M6IERlZmF1bHRIYW5kbGVyXG4gIH0sXG4gIHtcbiAgICBwcm92aWRlOiBUUkFOU0xPQ09fSU5URVJDRVBUT1IsXG4gICAgdXNlQ2xhc3M6IERlZmF1bHRJbnRlcmNlcHRvclxuICB9LFxuICB7XG4gICAgcHJvdmlkZTogVFJBTlNMT0NPX0ZBTExCQUNLX1NUUkFURUdZLFxuICAgIHVzZUNsYXNzOiBEZWZhdWx0RmFsbGJhY2tTdHJhdGVneSxcbiAgICBkZXBzOiBbVFJBTlNMT0NPX0NPTkZJR11cbiAgfVxuXTtcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbVHJhbnNsb2NvRGlyZWN0aXZlLCBUcmFuc2xvY29QaXBlLCBUcmFuc2xvY29Mb2FkZXJDb21wb25lbnRdLFxuICBwcm92aWRlcnM6IFtkZWZhdWx0UHJvdmlkZXJzXSxcbiAgZXhwb3J0czogW1RyYW5zbG9jb0RpcmVjdGl2ZSwgVHJhbnNsb2NvUGlwZV0sXG4gIGVudHJ5Q29tcG9uZW50czogW1RyYW5zbG9jb0xvYWRlckNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgVHJhbnNsb2NvTW9kdWxlIHt9XG4iXX0=