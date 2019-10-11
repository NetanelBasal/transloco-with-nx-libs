/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { getLangFromScope, getPipeValue, getScopeFromLang } from './shared';
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
            var _c = tslib_1.__read(getPipeValue(provider, 'static'), 2), _ = _c[0], extracted = _c[1];
            lang = extracted;
        }
        if (inline) {
            var _d = tslib_1.__read(getPipeValue(inline, 'static'), 2), _ = _d[0], extracted = _d[1];
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
export { LangResolver };
if (false) {
    /** @type {?} */
    LangResolver.prototype.initialized;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFuZy1yZXNvbHZlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ25lYXQvdHJhbnNsb2NvLyIsInNvdXJjZXMiOlsibGliL2xhbmctcmVzb2x2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsWUFBWSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sVUFBVSxDQUFDO0FBUTVFO0lBQUE7UUFDRSxnQkFBVyxHQUFHLEtBQUssQ0FBQztJQTBEdEIsQ0FBQztJQXhEQywrQkFBK0I7Ozs7OztJQUMvQiw4QkFBTzs7Ozs7O0lBQVAsVUFDRSxFQUFnSDtZQUFoSCx1RkFBZ0gsRUFBOUcsa0JBQU0sRUFBRSxzQkFBUSxFQUFFLGtCQUFNOztZQUV0QixJQUFJLEdBQUcsTUFBTTtRQUNqQjs7O1dBR0c7UUFDSCxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDcEIsSUFBSSxHQUFHLE1BQU0sQ0FBQztZQUNkLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFFRCxJQUFJLFFBQVEsRUFBRTtZQUNOLElBQUEsd0RBQWlELEVBQWhELFNBQUMsRUFBRSxpQkFBNkM7WUFDdkQsSUFBSSxHQUFHLFNBQVMsQ0FBQztTQUNsQjtRQUVELElBQUksTUFBTSxFQUFFO1lBQ0osSUFBQSxzREFBK0MsRUFBOUMsU0FBQyxFQUFFLGlCQUEyQztZQUNyRCxJQUFJLEdBQUcsU0FBUyxDQUFDO1NBQ2xCO1FBRUQsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFDeEIsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHOzs7Ozs7Ozs7Ozs7O0lBQ0gsOENBQXVCOzs7Ozs7Ozs7Ozs7SUFBdkIsVUFBd0IsSUFBWTs7WUFDNUIsS0FBSyxHQUFHLGdCQUFnQixDQUFDLElBQUksQ0FBQztRQUNwQyxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUMvQyxDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHOzs7Ozs7Ozs7Ozs7OztJQUNILHNDQUFlOzs7Ozs7Ozs7Ozs7O0lBQWYsVUFBZ0IsSUFBWSxFQUFFLEtBQXlCO1FBQ3JELE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBSSxLQUFLLFNBQUksSUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDM0MsQ0FBQztJQUNILG1CQUFDO0FBQUQsQ0FBQyxBQTNERCxJQTJEQzs7OztJQTFEQyxtQ0FBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnZXRMYW5nRnJvbVNjb3BlLCBnZXRQaXBlVmFsdWUsIGdldFNjb3BlRnJvbUxhbmcgfSBmcm9tICcuL3NoYXJlZCc7XG5cbnR5cGUgTGFuZ1Jlc29sdmVyUGFyYW1zID0ge1xuICBpbmxpbmU6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgcHJvdmlkZXI6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgYWN0aXZlOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG59O1xuXG5leHBvcnQgY2xhc3MgTGFuZ1Jlc29sdmVyIHtcbiAgaW5pdGlhbGl6ZWQgPSBmYWxzZTtcblxuICAvLyBpbmxpbmUgPT4gcHJvdmlkZXIgPT4gYWN0aXZlXG4gIHJlc29sdmUoXG4gICAgeyBpbmxpbmUsIHByb3ZpZGVyLCBhY3RpdmUgfTogTGFuZ1Jlc29sdmVyUGFyYW1zID0geyBpbmxpbmU6IHVuZGVmaW5lZCwgcHJvdmlkZXI6IHVuZGVmaW5lZCwgYWN0aXZlOiB1bmRlZmluZWQgfVxuICApIHtcbiAgICBsZXQgbGFuZyA9IGFjdGl2ZTtcbiAgICAvKipcbiAgICAgKiBXaGVuIHRoZSB1c2VyIGNoYW5nZXMgdGhlIGxhbmcgd2UgbmVlZCB0byB1cGRhdGVcbiAgICAgKiB0aGUgdmlldy4gT3RoZXJ3aXNlLCB0aGUgbGFuZyB3aWxsIHJlbWFpbiB0aGUgaW5saW5lL3Byb3ZpZGVkIGxhbmdcbiAgICAgKi9cbiAgICBpZiAodGhpcy5pbml0aWFsaXplZCkge1xuICAgICAgbGFuZyA9IGFjdGl2ZTtcbiAgICAgIHJldHVybiBsYW5nO1xuICAgIH1cblxuICAgIGlmIChwcm92aWRlcikge1xuICAgICAgY29uc3QgW18sIGV4dHJhY3RlZF0gPSBnZXRQaXBlVmFsdWUocHJvdmlkZXIsICdzdGF0aWMnKTtcbiAgICAgIGxhbmcgPSBleHRyYWN0ZWQ7XG4gICAgfVxuXG4gICAgaWYgKGlubGluZSkge1xuICAgICAgY29uc3QgW18sIGV4dHJhY3RlZF0gPSBnZXRQaXBlVmFsdWUoaW5saW5lLCAnc3RhdGljJyk7XG4gICAgICBsYW5nID0gZXh0cmFjdGVkO1xuICAgIH1cblxuICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgIHJldHVybiBsYW5nO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIFJlc29sdmUgdGhlIGxhbmdcbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogcmVzb2x2ZUxhbmdCYXNlZE9uU2NvcGUoJ3RvZG9zL2VuJykgPT4gZW5cbiAgICogcmVzb2x2ZUxhbmdCYXNlZE9uU2NvcGUoJ2VuJykgPT4gZW5cbiAgICpcbiAgICovXG4gIHJlc29sdmVMYW5nQmFzZWRPblNjb3BlKGxhbmc6IHN0cmluZykge1xuICAgIGNvbnN0IHNjb3BlID0gZ2V0U2NvcGVGcm9tTGFuZyhsYW5nKTtcbiAgICByZXR1cm4gc2NvcGUgPyBnZXRMYW5nRnJvbVNjb3BlKGxhbmcpIDogbGFuZztcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBSZXNvbHZlIHRoZSBsYW5nIHBhdGggZm9yIGxvYWRpbmdcbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogcmVzb2x2ZUxhbmdQYXRoKCd0b2RvcycsICdlbicpID0+IHRvZG9zL2VuXG4gICAqIHJlc29sdmVMYW5nUGF0aCgnZW4nKSA9PiBlblxuICAgKlxuICAgKi9cbiAgcmVzb2x2ZUxhbmdQYXRoKGxhbmc6IHN0cmluZywgc2NvcGU6IHN0cmluZyB8IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBzY29wZSA/IGAke3Njb3BlfS8ke2xhbmd9YCA6IGxhbmc7XG4gIH1cbn1cbiJdfQ==