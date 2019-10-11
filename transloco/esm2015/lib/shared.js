/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
    const split = lang.split('/');
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
    const split = lang.split('/');
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
export function getPipeValue(str, value, char = '|') {
    if (isString(str)) {
        /** @type {?} */
        const splitted = str.split(char);
        /** @type {?} */
        const lastItem = splitted.pop();
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
    const [hasStatic] = getPipeValue(lang, 'static');
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
    source => source) : take(1);
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
    (acc, lang) => {
        acc[`${scope}/${lang}`] = inlineLoader[lang];
        return acc;
    }), {});
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nbmVhdC90cmFuc2xvY28vIiwic291cmNlcyI6WyJsaWIvc2hhcmVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ3JDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7Ozs7Ozs7QUFRdEMsTUFBTSxVQUFVLGdCQUFnQixDQUFDLElBQVk7SUFDM0MsSUFBSSxDQUFDLElBQUksRUFBRTtRQUNULE9BQU8sRUFBRSxDQUFDO0tBQ1g7O1VBQ0ssS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO0lBQzdCLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUNaLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN6QixDQUFDOzs7Ozs7Ozs7OztBQVFELE1BQU0sVUFBVSxnQkFBZ0IsQ0FBQyxJQUFZO0lBQzNDLElBQUksQ0FBQyxJQUFJLEVBQUU7UUFDVCxPQUFPLEVBQUUsQ0FBQztLQUNYOztVQUNLLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztJQUM3QixPQUFPLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNyQixDQUFDOzs7Ozs7Ozs7Ozs7QUFTRCxNQUFNLFVBQVUsWUFBWSxDQUFDLEdBQVcsRUFBRSxLQUFhLEVBQUUsSUFBSSxHQUFHLEdBQUc7SUFDakUsSUFBSSxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUU7O2NBQ1gsUUFBUSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDOztjQUMxQixRQUFRLEdBQUcsUUFBUSxDQUFDLEdBQUcsRUFBRTtRQUMvQixPQUFPLFFBQVEsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztLQUM3RTtJQUVELE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDckIsQ0FBQzs7Ozs7O0FBRUQsTUFBTSxVQUFVLHlCQUF5QixDQUFDLE9BQXlCLEVBQUUsSUFBWTtVQUN6RSxDQUFDLFNBQVMsQ0FBQyxHQUFHLFlBQVksQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDO0lBQ2hELElBQUksU0FBUyxLQUFLLEtBQUssRUFBRTtRQUN2Qix1RUFBdUU7UUFDdkUsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDLG9CQUFvQixDQUFDO0tBQzVDO0lBRUQsd0RBQXdEO0lBQ3hELE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQzs7Ozs7QUFFRCxNQUFNLFVBQVUsbUJBQW1CLENBQUMsa0JBQTJCO0lBQzdELE9BQU8sa0JBQWtCLENBQUMsQ0FBQzs7OztJQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDekQsQ0FBQzs7Ozs7O0FBRUQsTUFBTSxVQUFVLFlBQVksQ0FBQyxZQUFZLEVBQUUsS0FBSztJQUM5QyxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsTUFBTTs7Ozs7SUFBQyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRTtRQUNwRCxHQUFHLENBQUMsR0FBRyxLQUFLLElBQUksSUFBSSxFQUFFLENBQUMsR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0MsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDLEdBQUUsRUFBRSxDQUFDLENBQUM7QUFDVCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVHJhbnNsb2NvU2VydmljZSB9IGZyb20gJy4vdHJhbnNsb2NvLnNlcnZpY2UnO1xuaW1wb3J0IHsgaXNTdHJpbmcgfSBmcm9tICcuL2hlbHBlcnMnO1xuaW1wb3J0IHsgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuLypcbiAqIEBleGFtcGxlXG4gKlxuICogZ2l2ZW46IGxhenktcGFnZS9lbiA9PiBsYXp5LXBhZ2VcbiAqXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRTY29wZUZyb21MYW5nKGxhbmc6IHN0cmluZyk6IHN0cmluZyB7XG4gIGlmICghbGFuZykge1xuICAgIHJldHVybiAnJztcbiAgfVxuICBjb25zdCBzcGxpdCA9IGxhbmcuc3BsaXQoJy8nKTtcbiAgc3BsaXQucG9wKCk7XG4gIHJldHVybiBzcGxpdC5qb2luKCcvJyk7XG59XG5cbi8qXG4gKiBAZXhhbXBsZVxuICpcbiAqIGdpdmVuOiBsYXp5LXBhZ2UvZW4gPT4gZW5cbiAqXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRMYW5nRnJvbVNjb3BlKGxhbmc6IHN0cmluZyk6IHN0cmluZyB7XG4gIGlmICghbGFuZykge1xuICAgIHJldHVybiAnJztcbiAgfVxuICBjb25zdCBzcGxpdCA9IGxhbmcuc3BsaXQoJy8nKTtcbiAgcmV0dXJuIHNwbGl0LnBvcCgpO1xufVxuXG4vKipcbiAqIEBleGFtcGxlXG4gKlxuICogZ2V0UGlwZVZhbHVlKCd0b2Rvc3xzY29wZWQnLCAnc2NvcGVkJykgW3RydWUsICd0b2RvcyddXG4gKiBnZXRQaXBlVmFsdWUoJ2VufHN0YXRpYycsICdzdGF0aWMnKSBbdHJ1ZSwgJ2VuJ11cbiAqIGdldFBpcGVWYWx1ZSgnZW4nLCAnc3RhdGljJykgW2ZhbHNlLCAnZW4nXVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0UGlwZVZhbHVlKHN0cjogc3RyaW5nLCB2YWx1ZTogc3RyaW5nLCBjaGFyID0gJ3wnKTogW2Jvb2xlYW4sIHN0cmluZ10ge1xuICBpZiAoaXNTdHJpbmcoc3RyKSkge1xuICAgIGNvbnN0IHNwbGl0dGVkID0gc3RyLnNwbGl0KGNoYXIpO1xuICAgIGNvbnN0IGxhc3RJdGVtID0gc3BsaXR0ZWQucG9wKCk7XG4gICAgcmV0dXJuIGxhc3RJdGVtID09PSB2YWx1ZSA/IFt0cnVlLCBzcGxpdHRlZC50b1N0cmluZygpXSA6IFtmYWxzZSwgbGFzdEl0ZW1dO1xuICB9XG5cbiAgcmV0dXJuIFtmYWxzZSwgJyddO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2hvdWxkTGlzdGVuVG9MYW5nQ2hhbmdlcyhzZXJ2aWNlOiBUcmFuc2xvY29TZXJ2aWNlLCBsYW5nOiBzdHJpbmcpIHtcbiAgY29uc3QgW2hhc1N0YXRpY10gPSBnZXRQaXBlVmFsdWUobGFuZywgJ3N0YXRpYycpO1xuICBpZiAoaGFzU3RhdGljID09PSBmYWxzZSkge1xuICAgIC8vIElmIHdlIGRpZG4ndCBnZXQgJ2xhbmd8c3RhdGljJyBjaGVjayBpZiBpdCdzIHNldCBpbiB0aGUgZ2xvYmFsIGxldmVsXG4gICAgcmV0dXJuIHNlcnZpY2UuY29uZmlnLnJlUmVuZGVyT25MYW5nQ2hhbmdlO1xuICB9XG5cbiAgLy8gV2UgaGF2ZSAnbGFuZ3xzdGF0aWMnIHNvIGRvbid0IGxpc3RlbiB0byBsYW5nIGNoYW5nZXNcbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbGlzdGVuT3JOb3RPcGVyYXRvcihsaXN0ZW5Ub0xhbmdDaGFuZ2U6IGJvb2xlYW4pIHtcbiAgcmV0dXJuIGxpc3RlblRvTGFuZ0NoYW5nZSA/IHNvdXJjZSA9PiBzb3VyY2UgOiB0YWtlKDEpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcHJlcGVuZFNjb3BlKGlubGluZUxvYWRlciwgc2NvcGUpIHtcbiAgcmV0dXJuIE9iamVjdC5rZXlzKGlubGluZUxvYWRlcikucmVkdWNlKChhY2MsIGxhbmcpID0+IHtcbiAgICBhY2NbYCR7c2NvcGV9LyR7bGFuZ31gXSA9IGlubGluZUxvYWRlcltsYW5nXTtcbiAgICByZXR1cm4gYWNjO1xuICB9LCB7fSk7XG59XG4iXX0=