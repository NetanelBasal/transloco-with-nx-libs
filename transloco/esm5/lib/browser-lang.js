/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { isBrowser } from './helpers';
/**
 * Returns the language code name from the browser, e.g. "en"
 * @return {?}
 */
export function getBrowserLang() {
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
export function getBrowserCultureLang() {
    if (isBrowser() === false) {
        return undefined;
    }
    /** @type {?} */
    var navigator = (/** @type {?} */ (window.navigator));
    /** @type {?} */
    var browserCultureLang = navigator.languages ? navigator.languages[0] : null;
    browserCultureLang = browserCultureLang || navigator.language || navigator.browserLanguage || navigator.userLanguage;
    return browserCultureLang;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlci1sYW5nLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nbmVhdC90cmFuc2xvY28vIiwic291cmNlcyI6WyJsaWIvYnJvd3Nlci1sYW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sV0FBVyxDQUFDOzs7OztBQUt0QyxNQUFNLFVBQVUsY0FBYztJQUM1QixJQUFJLFNBQVMsRUFBRSxLQUFLLEtBQUssRUFBRTtRQUN6QixPQUFPLFNBQVMsQ0FBQztLQUNsQjs7UUFFRyxXQUFXLEdBQUcscUJBQXFCLEVBQUU7SUFDekMsSUFBSSxXQUFXLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQ25DLFdBQVcsR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3pDO0lBRUQsSUFBSSxXQUFXLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQ25DLFdBQVcsR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3pDO0lBRUQsT0FBTyxXQUFXLENBQUM7QUFDckIsQ0FBQzs7Ozs7QUFLRCxNQUFNLFVBQVUscUJBQXFCO0lBQ25DLElBQUksU0FBUyxFQUFFLEtBQUssS0FBSyxFQUFFO1FBQ3pCLE9BQU8sU0FBUyxDQUFDO0tBQ2xCOztRQUVLLFNBQVMsR0FBRyxtQkFBQSxNQUFNLENBQUMsU0FBUyxFQUFPOztRQUNyQyxrQkFBa0IsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJO0lBQzVFLGtCQUFrQixHQUFHLGtCQUFrQixJQUFJLFNBQVMsQ0FBQyxRQUFRLElBQUksU0FBUyxDQUFDLGVBQWUsSUFBSSxTQUFTLENBQUMsWUFBWSxDQUFDO0lBRXJILE9BQU8sa0JBQWtCLENBQUM7QUFDNUIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGlzQnJvd3NlciB9IGZyb20gJy4vaGVscGVycyc7XG5cbi8qKlxuICogUmV0dXJucyB0aGUgbGFuZ3VhZ2UgY29kZSBuYW1lIGZyb20gdGhlIGJyb3dzZXIsIGUuZy4gXCJlblwiXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRCcm93c2VyTGFuZygpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICBpZiAoaXNCcm93c2VyKCkgPT09IGZhbHNlKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIGxldCBicm93c2VyTGFuZyA9IGdldEJyb3dzZXJDdWx0dXJlTGFuZygpO1xuICBpZiAoYnJvd3NlckxhbmcuaW5kZXhPZignLScpICE9PSAtMSkge1xuICAgIGJyb3dzZXJMYW5nID0gYnJvd3Nlckxhbmcuc3BsaXQoJy0nKVswXTtcbiAgfVxuXG4gIGlmIChicm93c2VyTGFuZy5pbmRleE9mKCdfJykgIT09IC0xKSB7XG4gICAgYnJvd3NlckxhbmcgPSBicm93c2VyTGFuZy5zcGxpdCgnXycpWzBdO1xuICB9XG5cbiAgcmV0dXJuIGJyb3dzZXJMYW5nO1xufVxuXG4vKipcbiAqIFJldHVybnMgdGhlIGN1bHR1cmUgbGFuZ3VhZ2UgY29kZSBuYW1lIGZyb20gdGhlIGJyb3dzZXIsIGUuZy4gXCJlbi1VU1wiXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRCcm93c2VyQ3VsdHVyZUxhbmcoKTogc3RyaW5nIHtcbiAgaWYgKGlzQnJvd3NlcigpID09PSBmYWxzZSkge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBjb25zdCBuYXZpZ2F0b3IgPSB3aW5kb3cubmF2aWdhdG9yIGFzIGFueTtcbiAgbGV0IGJyb3dzZXJDdWx0dXJlTGFuZyA9IG5hdmlnYXRvci5sYW5ndWFnZXMgPyBuYXZpZ2F0b3IubGFuZ3VhZ2VzWzBdIDogbnVsbDtcbiAgYnJvd3NlckN1bHR1cmVMYW5nID0gYnJvd3NlckN1bHR1cmVMYW5nIHx8IG5hdmlnYXRvci5sYW5ndWFnZSB8fCBuYXZpZ2F0b3IuYnJvd3Nlckxhbmd1YWdlIHx8IG5hdmlnYXRvci51c2VyTGFuZ3VhZ2U7XG5cbiAgcmV0dXJuIGJyb3dzZXJDdWx0dXJlTGFuZztcbn1cbiJdfQ==