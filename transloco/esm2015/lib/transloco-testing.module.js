/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Inject, NgModule } from '@angular/core';
import { TRANSLOCO_LOADER } from './transloco.loader';
import { of } from 'rxjs';
import { defaultProviders, TranslocoModule } from './transloco.module';
import { TRANSLOCO_CONFIG } from './transloco.config';
export class TestingLoader {
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
if (false) {
    /**
     * @type {?}
     * @private
     */
    TestingLoader.prototype.langs;
}
export class TranslocoTestingModule {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsb2NvLXRlc3RpbmcubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nbmVhdC90cmFuc2xvY28vIiwic291cmNlcyI6WyJsaWIvdHJhbnNsb2NvLXRlc3RpbmcubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsTUFBTSxFQUF1QixRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdEUsT0FBTyxFQUFFLGdCQUFnQixFQUFtQixNQUFNLG9CQUFvQixDQUFDO0FBRXZFLE9BQU8sRUFBYyxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdEMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBbUIsTUFBTSxvQkFBb0IsQ0FBQztBQUV2RSxNQUFNLE9BQU8sYUFBYTs7OztJQUN4QixZQUE4QyxLQUEyQjtRQUEzQixVQUFLLEdBQUwsS0FBSyxDQUFzQjtJQUFHLENBQUM7Ozs7O0lBRTdFLGNBQWMsQ0FBQyxJQUFZO1FBQ3pCLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUM5QixDQUFDOzs7OzRDQUpZLE1BQU0sU0FBQyxnQkFBZ0I7Ozs7Ozs7SUFBeEIsOEJBQTZEOztBQVUzRSxNQUFNLE9BQU8sc0JBQXNCOzs7Ozs7SUFDakMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUEyQixFQUFFLFNBQW1DLEVBQUU7UUFDakYsT0FBTztZQUNMLFFBQVEsRUFBRSxzQkFBc0I7WUFDaEMsU0FBUyxFQUFFO2dCQUNUO29CQUNFLE9BQU8sRUFBRSxnQkFBZ0I7b0JBQ3pCLFFBQVEsRUFBRSxLQUFLO2lCQUNoQjtnQkFDRDtvQkFDRSxPQUFPLEVBQUUsZ0JBQWdCO29CQUN6QixRQUFRLEVBQUUsYUFBYTtpQkFDeEI7Z0JBQ0QsZ0JBQWdCO2dCQUNoQjtvQkFDRSxPQUFPLEVBQUUsZ0JBQWdCO29CQUN6QixRQUFRLGtCQUFJLFFBQVEsRUFBRSxJQUFJLElBQUssTUFBTSxDQUFFO2lCQUN4QzthQUNGO1NBQ0YsQ0FBQztJQUNKLENBQUM7OztZQXZCRixRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFLENBQUMsZUFBZSxDQUFDO2FBQzNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVFJBTlNMT0NPX0xPQURFUiwgVHJhbnNsb2NvTG9hZGVyIH0gZnJvbSAnLi90cmFuc2xvY28ubG9hZGVyJztcbmltcG9ydCB7IEhhc2hNYXAsIFRyYW5zbGF0aW9uIH0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGVmYXVsdFByb3ZpZGVycywgVHJhbnNsb2NvTW9kdWxlIH0gZnJvbSAnLi90cmFuc2xvY28ubW9kdWxlJztcbmltcG9ydCB7IFRSQU5TTE9DT19DT05GSUcsIFRyYW5zbG9jb0NvbmZpZyB9IGZyb20gJy4vdHJhbnNsb2NvLmNvbmZpZyc7XG5cbmV4cG9ydCBjbGFzcyBUZXN0aW5nTG9hZGVyIGltcGxlbWVudHMgVHJhbnNsb2NvTG9hZGVyIHtcbiAgY29uc3RydWN0b3IoQEluamVjdCgndHJhbnNsb2NvTGFuZ3MnKSBwcml2YXRlIGxhbmdzOiBIYXNoTWFwPFRyYW5zbGF0aW9uPikge31cblxuICBnZXRUcmFuc2xhdGlvbihsYW5nOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFRyYW5zbGF0aW9uPiB8IFByb21pc2U8VHJhbnNsYXRpb24+IHtcbiAgICByZXR1cm4gb2YodGhpcy5sYW5nc1tsYW5nXSk7XG4gIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgZXhwb3J0czogW1RyYW5zbG9jb01vZHVsZV1cbn0pXG5leHBvcnQgY2xhc3MgVHJhbnNsb2NvVGVzdGluZ01vZHVsZSB7XG4gIHN0YXRpYyB3aXRoTGFuZ3MobGFuZ3M6IEhhc2hNYXA8VHJhbnNsYXRpb24+LCBjb25maWc6IFBhcnRpYWw8VHJhbnNsb2NvQ29uZmlnPiA9IHt9KTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBUcmFuc2xvY29UZXN0aW5nTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiAndHJhbnNsb2NvTGFuZ3MnLFxuICAgICAgICAgIHVzZVZhbHVlOiBsYW5nc1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogVFJBTlNMT0NPX0xPQURFUixcbiAgICAgICAgICB1c2VDbGFzczogVGVzdGluZ0xvYWRlclxuICAgICAgICB9LFxuICAgICAgICBkZWZhdWx0UHJvdmlkZXJzLFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogVFJBTlNMT0NPX0NPTkZJRyxcbiAgICAgICAgICB1c2VWYWx1ZTogeyBwcm9kTW9kZTogdHJ1ZSwgLi4uY29uZmlnIH1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH07XG4gIH1cbn1cbiJdfQ==