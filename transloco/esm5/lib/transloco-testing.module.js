/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Inject, NgModule } from '@angular/core';
import { TRANSLOCO_LOADER } from './transloco.loader';
import { of } from 'rxjs';
import { defaultProviders, TranslocoModule } from './transloco.module';
import { TRANSLOCO_CONFIG } from './transloco.config';
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
        return of(this.langs[lang]);
    };
    /** @nocollapse */
    TestingLoader.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: ['translocoLangs',] }] }
    ]; };
    return TestingLoader;
}());
export { TestingLoader };
if (false) {
    /**
     * @type {?}
     * @private
     */
    TestingLoader.prototype.langs;
}
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
        if (config === void 0) { config = {}; }
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
                    useValue: tslib_1.__assign({ prodMode: true }, config)
                }
            ]
        };
    };
    TranslocoTestingModule.decorators = [
        { type: NgModule, args: [{
                    exports: [TranslocoModule]
                },] }
    ];
    return TranslocoTestingModule;
}());
export { TranslocoTestingModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsb2NvLXRlc3RpbmcubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nbmVhdC90cmFuc2xvY28vIiwic291cmNlcyI6WyJsaWIvdHJhbnNsb2NvLXRlc3RpbmcubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLE1BQU0sRUFBdUIsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBbUIsTUFBTSxvQkFBb0IsQ0FBQztBQUV2RSxPQUFPLEVBQWMsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN2RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQW1CLE1BQU0sb0JBQW9CLENBQUM7QUFFdkU7SUFDRSx1QkFBOEMsS0FBMkI7UUFBM0IsVUFBSyxHQUFMLEtBQUssQ0FBc0I7SUFBRyxDQUFDOzs7OztJQUU3RSxzQ0FBYzs7OztJQUFkLFVBQWUsSUFBWTtRQUN6QixPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDOUIsQ0FBQzs7O2dEQUpZLE1BQU0sU0FBQyxnQkFBZ0I7O0lBS3RDLG9CQUFDO0NBQUEsQUFORCxJQU1DO1NBTlksYUFBYTs7Ozs7O0lBQ1osOEJBQTZEOztBQU8zRTtJQUFBO0lBd0JBLENBQUM7Ozs7OztJQXBCUSxnQ0FBUzs7Ozs7SUFBaEIsVUFBaUIsS0FBMkIsRUFBRSxNQUFxQztRQUFyQyx1QkFBQSxFQUFBLFdBQXFDO1FBQ2pGLE9BQU87WUFDTCxRQUFRLEVBQUUsc0JBQXNCO1lBQ2hDLFNBQVMsRUFBRTtnQkFDVDtvQkFDRSxPQUFPLEVBQUUsZ0JBQWdCO29CQUN6QixRQUFRLEVBQUUsS0FBSztpQkFDaEI7Z0JBQ0Q7b0JBQ0UsT0FBTyxFQUFFLGdCQUFnQjtvQkFDekIsUUFBUSxFQUFFLGFBQWE7aUJBQ3hCO2dCQUNELGdCQUFnQjtnQkFDaEI7b0JBQ0UsT0FBTyxFQUFFLGdCQUFnQjtvQkFDekIsUUFBUSxxQkFBSSxRQUFRLEVBQUUsSUFBSSxJQUFLLE1BQU0sQ0FBRTtpQkFDeEM7YUFDRjtTQUNGLENBQUM7SUFDSixDQUFDOztnQkF2QkYsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLGVBQWUsQ0FBQztpQkFDM0I7O0lBc0JELDZCQUFDO0NBQUEsQUF4QkQsSUF3QkM7U0FyQlksc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVFJBTlNMT0NPX0xPQURFUiwgVHJhbnNsb2NvTG9hZGVyIH0gZnJvbSAnLi90cmFuc2xvY28ubG9hZGVyJztcbmltcG9ydCB7IEhhc2hNYXAsIFRyYW5zbGF0aW9uIH0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGVmYXVsdFByb3ZpZGVycywgVHJhbnNsb2NvTW9kdWxlIH0gZnJvbSAnLi90cmFuc2xvY28ubW9kdWxlJztcbmltcG9ydCB7IFRSQU5TTE9DT19DT05GSUcsIFRyYW5zbG9jb0NvbmZpZyB9IGZyb20gJy4vdHJhbnNsb2NvLmNvbmZpZyc7XG5cbmV4cG9ydCBjbGFzcyBUZXN0aW5nTG9hZGVyIGltcGxlbWVudHMgVHJhbnNsb2NvTG9hZGVyIHtcbiAgY29uc3RydWN0b3IoQEluamVjdCgndHJhbnNsb2NvTGFuZ3MnKSBwcml2YXRlIGxhbmdzOiBIYXNoTWFwPFRyYW5zbGF0aW9uPikge31cblxuICBnZXRUcmFuc2xhdGlvbihsYW5nOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFRyYW5zbGF0aW9uPiB8IFByb21pc2U8VHJhbnNsYXRpb24+IHtcbiAgICByZXR1cm4gb2YodGhpcy5sYW5nc1tsYW5nXSk7XG4gIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgZXhwb3J0czogW1RyYW5zbG9jb01vZHVsZV1cbn0pXG5leHBvcnQgY2xhc3MgVHJhbnNsb2NvVGVzdGluZ01vZHVsZSB7XG4gIHN0YXRpYyB3aXRoTGFuZ3MobGFuZ3M6IEhhc2hNYXA8VHJhbnNsYXRpb24+LCBjb25maWc6IFBhcnRpYWw8VHJhbnNsb2NvQ29uZmlnPiA9IHt9KTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBUcmFuc2xvY29UZXN0aW5nTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiAndHJhbnNsb2NvTGFuZ3MnLFxuICAgICAgICAgIHVzZVZhbHVlOiBsYW5nc1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogVFJBTlNMT0NPX0xPQURFUixcbiAgICAgICAgICB1c2VDbGFzczogVGVzdGluZ0xvYWRlclxuICAgICAgICB9LFxuICAgICAgICBkZWZhdWx0UHJvdmlkZXJzLFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogVFJBTlNMT0NPX0NPTkZJRyxcbiAgICAgICAgICB1c2VWYWx1ZTogeyBwcm9kTW9kZTogdHJ1ZSwgLi4uY29uZmlnIH1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH07XG4gIH1cbn1cbiJdfQ==