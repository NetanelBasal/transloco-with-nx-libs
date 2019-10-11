/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { TemplateRef, ComponentFactoryResolver } from '@angular/core';
import { isString } from './helpers';
import { TranslocoLoaderComponent } from './loader-component.component';
export class TemplateHandler {
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
if (false) {
    /**
     * @type {?}
     * @private
     */
    TemplateHandler.prototype.injector;
    /**
     * @type {?}
     * @private
     */
    TemplateHandler.prototype.view;
    /**
     * @type {?}
     * @private
     */
    TemplateHandler.prototype.vcr;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGUtaGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ25lYXQvdHJhbnNsb2NvLyIsInNvdXJjZXMiOlsibGliL3RlbXBsYXRlLWhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBZ0IsV0FBVyxFQUFvQix3QkFBd0IsRUFBa0IsTUFBTSxlQUFlLENBQUM7QUFDdEgsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUNyQyxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUl4RSxNQUFNLE9BQU8sZUFBZTs7Ozs7SUFHMUIsWUFBb0IsSUFBVSxFQUFVLEdBQXFCO1FBQXpDLFNBQUksR0FBSixJQUFJLENBQU07UUFBVSxRQUFHLEdBQUgsR0FBRyxDQUFrQjtRQUMzRCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDO0lBQ3BDLENBQUM7Ozs7SUFFRCxVQUFVO1FBQ1IsSUFBSSxJQUFJLENBQUMsSUFBSSxZQUFZLFdBQVcsRUFBRTtZQUNwQyxJQUFJLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN4QzthQUFNLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTs7a0JBQ3hCLFlBQVksR0FBRyxJQUFJLENBQUMsZUFBZSxDQUEyQix3QkFBd0IsQ0FBQztZQUM3RixZQUFZLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ3ZDLFlBQVksQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDdkM7YUFBTTtZQUNMLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2pDO0lBQ0gsQ0FBQzs7OztJQUVELFVBQVU7UUFDUixJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ25CLENBQUM7Ozs7Ozs7SUFFTyxlQUFlLENBQUksR0FBYzs7Y0FDakMsR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDOztjQUNqRCxPQUFPLEdBQUcsR0FBRyxDQUFDLHVCQUF1QixDQUFDLEdBQUcsQ0FBQztRQUVoRCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzNDLENBQUM7Q0FDRjs7Ozs7O0lBNUJDLG1DQUEyQjs7Ozs7SUFFZiwrQkFBa0I7Ozs7O0lBQUUsOEJBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50UmVmLCBUZW1wbGF0ZVJlZiwgVmlld0NvbnRhaW5lclJlZiwgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBJbmplY3RvciwgVHlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBpc1N0cmluZyB9IGZyb20gJy4vaGVscGVycyc7XHJcbmltcG9ydCB7IFRyYW5zbG9jb0xvYWRlckNvbXBvbmVudCB9IGZyb20gJy4vbG9hZGVyLWNvbXBvbmVudC5jb21wb25lbnQnO1xyXG5cclxuZXhwb3J0IHR5cGUgVmlldyA9IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT4gfCBUeXBlPGFueT47XHJcblxyXG5leHBvcnQgY2xhc3MgVGVtcGxhdGVIYW5kbGVyIHtcclxuICBwcml2YXRlIGluamVjdG9yOiBJbmplY3RvcjtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSB2aWV3OiBWaWV3LCBwcml2YXRlIHZjcjogVmlld0NvbnRhaW5lclJlZikge1xyXG4gICAgdGhpcy5pbmplY3RvciA9IHRoaXMudmNyLmluamVjdG9yO1xyXG4gIH1cclxuXHJcbiAgYXR0YWNoVmlldygpIHtcclxuICAgIGlmICh0aGlzLnZpZXcgaW5zdGFuY2VvZiBUZW1wbGF0ZVJlZikge1xyXG4gICAgICB0aGlzLnZjci5jcmVhdGVFbWJlZGRlZFZpZXcodGhpcy52aWV3KTtcclxuICAgIH0gZWxzZSBpZiAoaXNTdHJpbmcodGhpcy52aWV3KSkge1xyXG4gICAgICBjb25zdCBjb21wb25lbnRSZWYgPSB0aGlzLmNyZWF0ZUNvbXBvbmVudDxUcmFuc2xvY29Mb2FkZXJDb21wb25lbnQ+KFRyYW5zbG9jb0xvYWRlckNvbXBvbmVudCk7XHJcbiAgICAgIGNvbXBvbmVudFJlZi5pbnN0YW5jZS5odG1sID0gdGhpcy52aWV3O1xyXG4gICAgICBjb21wb25lbnRSZWYuaG9zdFZpZXcuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5jcmVhdGVDb21wb25lbnQodGhpcy52aWV3KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGRldGFjaFZpZXcoKSB7XHJcbiAgICB0aGlzLnZjci5jbGVhcigpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjcmVhdGVDb21wb25lbnQ8VD4oY21wOiBUeXBlPGFueT4pOiBDb21wb25lbnRSZWY8VD4ge1xyXG4gICAgY29uc3QgY2ZyID0gdGhpcy5pbmplY3Rvci5nZXQoQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyKTtcclxuICAgIGNvbnN0IGZhY3RvcnkgPSBjZnIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoY21wKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy52Y3IuY3JlYXRlQ29tcG9uZW50KGZhY3RvcnkpO1xyXG4gIH1cclxufVxyXG4iXX0=