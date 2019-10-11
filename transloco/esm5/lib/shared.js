/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { isString } from './helpers';
import { take } from 'rxjs/operators';
/*
 * @example
 *
 * given: lazy-page/en => lazy-page
 *
 */
/**
 * @param {?} lang
 * @return {?}
 */
export function getScopeFromLang(lang) {
    if (!lang) {
        return '';
    }
    /** @type {?} */
    var split = lang.split('/');
    split.pop();
    return split.join('/');
}
/*
 * @example
 *
 * given: lazy-page/en => en
 *
 */
/**
 * @param {?} lang
 * @return {?}
 */
export function getLangFromScope(lang) {
    if (!lang) {
        return '';
    }
    /** @type {?} */
    var split = lang.split('/');
    return split.pop();
}
/**
 * \@example
 *
 * getPipeValue('todos|scoped', 'scoped') [true, 'todos']
 * getPipeValue('en|static', 'static') [true, 'en']
 * getPipeValue('en', 'static') [false, 'en']
 * @param {?} str
 * @param {?} value
 * @param {?=} char
 * @return {?}
 */
export function getPipeValue(str, value, char) {
    if (char === void 0) { char = '|'; }
    if (isString(str)) {
        /** @type {?} */
        var splitted = str.split(char);
        /** @type {?} */
        var lastItem = splitted.pop();
        return lastItem === value ? [true, splitted.toString()] : [false, lastItem];
    }
    return [false, ''];
}
/**
 * @param {?} service
 * @param {?} lang
 * @return {?}
 */
export function shouldListenToLangChanges(service, lang) {
    var _a = tslib_1.__read(getPipeValue(lang, 'static'), 1), hasStatic = _a[0];
    if (hasStatic === false) {
        // If we didn't get 'lang|static' check if it's set in the global level
        return service.config.reRenderOnLangChange;
    }
    // We have 'lang|static' so don't listen to lang changes
    return false;
}
/**
 * @param {?} listenToLangChange
 * @return {?}
 */
export function listenOrNotOperator(listenToLangChange) {
    return listenToLangChange ? (/**
     * @param {?} source
     * @return {?}
     */
    function (source) { return source; }) : take(1);
}
/**
 * @param {?} inlineLoader
 * @param {?} scope
 * @return {?}
 */
export function prependScope(inlineLoader, scope) {
    return Object.keys(inlineLoader).reduce((/**
     * @param {?} acc
     * @param {?} lang
     * @return {?}
     */
    function (acc, lang) {
        acc[scope + "/" + lang] = inlineLoader[lang];
        return acc;
    }), {});
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nbmVhdC90cmFuc2xvY28vIiwic291cmNlcyI6WyJsaWIvc2hhcmVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUNyQyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7Ozs7Ozs7O0FBUXRDLE1BQU0sVUFBVSxnQkFBZ0IsQ0FBQyxJQUFZO0lBQzNDLElBQUksQ0FBQyxJQUFJLEVBQUU7UUFDVCxPQUFPLEVBQUUsQ0FBQztLQUNYOztRQUNLLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztJQUM3QixLQUFLLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDWixPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDekIsQ0FBQzs7Ozs7Ozs7Ozs7QUFRRCxNQUFNLFVBQVUsZ0JBQWdCLENBQUMsSUFBWTtJQUMzQyxJQUFJLENBQUMsSUFBSSxFQUFFO1FBQ1QsT0FBTyxFQUFFLENBQUM7S0FDWDs7UUFDSyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7SUFDN0IsT0FBTyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDckIsQ0FBQzs7Ozs7Ozs7Ozs7O0FBU0QsTUFBTSxVQUFVLFlBQVksQ0FBQyxHQUFXLEVBQUUsS0FBYSxFQUFFLElBQVU7SUFBVixxQkFBQSxFQUFBLFVBQVU7SUFDakUsSUFBSSxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUU7O1lBQ1gsUUFBUSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDOztZQUMxQixRQUFRLEdBQUcsUUFBUSxDQUFDLEdBQUcsRUFBRTtRQUMvQixPQUFPLFFBQVEsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztLQUM3RTtJQUVELE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDckIsQ0FBQzs7Ozs7O0FBRUQsTUFBTSxVQUFVLHlCQUF5QixDQUFDLE9BQXlCLEVBQUUsSUFBWTtJQUN6RSxJQUFBLG9EQUEwQyxFQUF6QyxpQkFBeUM7SUFDaEQsSUFBSSxTQUFTLEtBQUssS0FBSyxFQUFFO1FBQ3ZCLHVFQUF1RTtRQUN2RSxPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsb0JBQW9CLENBQUM7S0FDNUM7SUFFRCx3REFBd0Q7SUFDeEQsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDOzs7OztBQUVELE1BQU0sVUFBVSxtQkFBbUIsQ0FBQyxrQkFBMkI7SUFDN0QsT0FBTyxrQkFBa0IsQ0FBQyxDQUFDOzs7O0lBQUMsVUFBQSxNQUFNLElBQUksT0FBQSxNQUFNLEVBQU4sQ0FBTSxFQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDekQsQ0FBQzs7Ozs7O0FBRUQsTUFBTSxVQUFVLFlBQVksQ0FBQyxZQUFZLEVBQUUsS0FBSztJQUM5QyxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsTUFBTTs7Ozs7SUFBQyxVQUFDLEdBQUcsRUFBRSxJQUFJO1FBQ2hELEdBQUcsQ0FBSSxLQUFLLFNBQUksSUFBTSxDQUFDLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdDLE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQyxHQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ1QsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRyYW5zbG9jb1NlcnZpY2UgfSBmcm9tICcuL3RyYW5zbG9jby5zZXJ2aWNlJztcbmltcG9ydCB7IGlzU3RyaW5nIH0gZnJvbSAnLi9oZWxwZXJzJztcbmltcG9ydCB7IHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbi8qXG4gKiBAZXhhbXBsZVxuICpcbiAqIGdpdmVuOiBsYXp5LXBhZ2UvZW4gPT4gbGF6eS1wYWdlXG4gKlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2NvcGVGcm9tTGFuZyhsYW5nOiBzdHJpbmcpOiBzdHJpbmcge1xuICBpZiAoIWxhbmcpIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cbiAgY29uc3Qgc3BsaXQgPSBsYW5nLnNwbGl0KCcvJyk7XG4gIHNwbGl0LnBvcCgpO1xuICByZXR1cm4gc3BsaXQuam9pbignLycpO1xufVxuXG4vKlxuICogQGV4YW1wbGVcbiAqXG4gKiBnaXZlbjogbGF6eS1wYWdlL2VuID0+IGVuXG4gKlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0TGFuZ0Zyb21TY29wZShsYW5nOiBzdHJpbmcpOiBzdHJpbmcge1xuICBpZiAoIWxhbmcpIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cbiAgY29uc3Qgc3BsaXQgPSBsYW5nLnNwbGl0KCcvJyk7XG4gIHJldHVybiBzcGxpdC5wb3AoKTtcbn1cblxuLyoqXG4gKiBAZXhhbXBsZVxuICpcbiAqIGdldFBpcGVWYWx1ZSgndG9kb3N8c2NvcGVkJywgJ3Njb3BlZCcpIFt0cnVlLCAndG9kb3MnXVxuICogZ2V0UGlwZVZhbHVlKCdlbnxzdGF0aWMnLCAnc3RhdGljJykgW3RydWUsICdlbiddXG4gKiBnZXRQaXBlVmFsdWUoJ2VuJywgJ3N0YXRpYycpIFtmYWxzZSwgJ2VuJ11cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFBpcGVWYWx1ZShzdHI6IHN0cmluZywgdmFsdWU6IHN0cmluZywgY2hhciA9ICd8Jyk6IFtib29sZWFuLCBzdHJpbmddIHtcbiAgaWYgKGlzU3RyaW5nKHN0cikpIHtcbiAgICBjb25zdCBzcGxpdHRlZCA9IHN0ci5zcGxpdChjaGFyKTtcbiAgICBjb25zdCBsYXN0SXRlbSA9IHNwbGl0dGVkLnBvcCgpO1xuICAgIHJldHVybiBsYXN0SXRlbSA9PT0gdmFsdWUgPyBbdHJ1ZSwgc3BsaXR0ZWQudG9TdHJpbmcoKV0gOiBbZmFsc2UsIGxhc3RJdGVtXTtcbiAgfVxuXG4gIHJldHVybiBbZmFsc2UsICcnXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNob3VsZExpc3RlblRvTGFuZ0NoYW5nZXMoc2VydmljZTogVHJhbnNsb2NvU2VydmljZSwgbGFuZzogc3RyaW5nKSB7XG4gIGNvbnN0IFtoYXNTdGF0aWNdID0gZ2V0UGlwZVZhbHVlKGxhbmcsICdzdGF0aWMnKTtcbiAgaWYgKGhhc1N0YXRpYyA9PT0gZmFsc2UpIHtcbiAgICAvLyBJZiB3ZSBkaWRuJ3QgZ2V0ICdsYW5nfHN0YXRpYycgY2hlY2sgaWYgaXQncyBzZXQgaW4gdGhlIGdsb2JhbCBsZXZlbFxuICAgIHJldHVybiBzZXJ2aWNlLmNvbmZpZy5yZVJlbmRlck9uTGFuZ0NoYW5nZTtcbiAgfVxuXG4gIC8vIFdlIGhhdmUgJ2xhbmd8c3RhdGljJyBzbyBkb24ndCBsaXN0ZW4gdG8gbGFuZyBjaGFuZ2VzXG4gIHJldHVybiBmYWxzZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxpc3Rlbk9yTm90T3BlcmF0b3IobGlzdGVuVG9MYW5nQ2hhbmdlOiBib29sZWFuKSB7XG4gIHJldHVybiBsaXN0ZW5Ub0xhbmdDaGFuZ2UgPyBzb3VyY2UgPT4gc291cmNlIDogdGFrZSgxKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByZXBlbmRTY29wZShpbmxpbmVMb2FkZXIsIHNjb3BlKSB7XG4gIHJldHVybiBPYmplY3Qua2V5cyhpbmxpbmVMb2FkZXIpLnJlZHVjZSgoYWNjLCBsYW5nKSA9PiB7XG4gICAgYWNjW2Ake3Njb3BlfS8ke2xhbmd9YF0gPSBpbmxpbmVMb2FkZXJbbGFuZ107XG4gICAgcmV0dXJuIGFjYztcbiAgfSwge30pO1xufVxuIl19