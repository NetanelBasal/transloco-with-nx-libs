/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import flat from 'flat';
/**
 * @param {?} obj
 * @param {?} path
 * @return {?}
 */
export function getValue(obj, path) {
    /* For cases where the key is like: 'general.something.thing' */
    if (obj && obj.hasOwnProperty(path)) {
        return obj[path];
    }
    return path.split('.').reduce((/**
     * @param {?} p
     * @param {?} c
     * @return {?}
     */
    (p, c) => p && p[c]), obj);
}
/**
 * @param {?} obj
 * @param {?} prop
 * @param {?} val
 * @return {?}
 */
export function setValue(obj, prop, val) {
    obj = Object.assign({}, obj);
    /** @type {?} */
    const split = prop.split('.');
    /** @type {?} */
    const lastIndex = split.length - 1;
    split.reduce((/**
     * @param {?} acc
     * @param {?} part
     * @param {?} index
     * @return {?}
     */
    (acc, part, index) => {
        if (index === lastIndex) {
            acc[part] = val;
        }
        else {
            acc[part] = Array.isArray(acc[part]) ? acc[part].slice() : Object.assign({}, acc[part]);
        }
        return acc && acc[part];
    }), obj);
    return obj;
}
/**
 * @param {?} collection
 * @return {?}
 */
export function size(collection) {
    if (!collection) {
        return 0;
    }
    if (Array.isArray(collection)) {
        return collection.length;
    }
    if (isObject(collection)) {
        return Object.keys(collection).length;
    }
    return !!collection ? collection.length : 0;
}
/**
 * @param {?} collection
 * @return {?}
 */
export function isEmpty(collection) {
    return size(collection) === 0;
}
/**
 * @param {?} val
 * @return {?}
 */
export function isFunction(val) {
    return typeof val === 'function';
}
/**
 * @param {?} val
 * @return {?}
 */
export function isString(val) {
    return typeof val === 'string';
}
/**
 * @param {?} val
 * @return {?}
 */
export function isNumber(val) {
    return typeof val === 'number';
}
/**
 * @param {?} item
 * @return {?}
 */
export function isObject(item) {
    return item && typeof item === 'object' && !Array.isArray(item);
}
/**
 * @param {?} val
 * @return {?}
 */
export function coerceArray(val) {
    return Array.isArray(val) ? val : [val];
}
/*
 * @example
 *
 * given: path-to-happiness => pathToHappiness
 * given: path_to_happiness => pathToHappiness
 * given: path-to_happiness => pathToHappiness
 *
 */
/**
 * @param {?} str
 * @return {?}
 */
export function toCamelCase(str) {
    return str
        .replace(/(?:^\w|[A-Z]|\b\w)/g, (/**
     * @param {?} word
     * @param {?} index
     * @return {?}
     */
    (word, index) => (index == 0 ? word.toLowerCase() : word.toUpperCase())))
        .replace(/\s+|_|-|\//g, '');
}
/**
 * @return {?}
 */
export function isBrowser() {
    return typeof window !== 'undefined';
}
/**
 * @param {?} value
 * @return {?}
 */
export function isNil(value) {
    return value === null || value === undefined;
}
/**
 * @param {?} value
 * @return {?}
 */
export function isDefined(value) {
    return isNil(value) === false;
}
/**
 * @param {?} value
 * @return {?}
 */
export function toNumber(value) {
    if (isNumber(value))
        return value;
    if (isString(value) && !isNaN(Number(value) - parseFloat(value))) {
        return Number(value);
    }
    return null;
}
/**
 * @param {?} item
 * @return {?}
 */
export function isScopeObject(item) {
    return item && typeof item.scope === 'string';
}
/**
 * @param {?} item
 * @return {?}
 */
export function hasInlineLoader(item) {
    return item && isObject(item.loader);
}
/**
 * @param {?} obj
 * @return {?}
 */
export function unflatten(obj) {
    return flat.unflatten(obj, { safe: true });
}
/**
 * @param {?} obj
 * @return {?}
 */
export function flatten(obj) {
    return flat(obj, { safe: true });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVycy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ25lYXQvdHJhbnNsb2NvLyIsInNvdXJjZXMiOlsibGliL2hlbHBlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sSUFBSSxNQUFNLE1BQU0sQ0FBQzs7Ozs7O0FBRXhCLE1BQU0sVUFBVSxRQUFRLENBQUMsR0FBVyxFQUFFLElBQVk7SUFDaEQsZ0VBQWdFO0lBQ2hFLElBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDbEMsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDbEI7SUFDRCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTTs7Ozs7SUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUUsR0FBRyxDQUFDLENBQUM7QUFDMUQsQ0FBQzs7Ozs7OztBQUVELE1BQU0sVUFBVSxRQUFRLENBQUMsR0FBUSxFQUFFLElBQVksRUFBRSxHQUFRO0lBQ3ZELEdBQUcscUJBQVEsR0FBRyxDQUFFLENBQUM7O1VBRVgsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDOztVQUN2QixTQUFTLEdBQUcsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDO0lBRWxDLEtBQUssQ0FBQyxNQUFNOzs7Ozs7SUFBQyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7UUFDaEMsSUFBRyxLQUFLLEtBQUssU0FBUyxFQUFFO1lBQ3RCLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUM7U0FDakI7YUFBTTtZQUNMLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMs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QUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDL0QsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDdEI7SUFFRCxPQUFPLElBQUksQ0FBQztBQUNkLENBQUM7Ozs7O0FBRUQsTUFBTSxVQUFVLGFBQWEsQ0FBQyxJQUFTO0lBQ3JDLE9BQU8sSUFBSSxJQUFJLE9BQU8sSUFBSSxDQUFDLEtBQUssS0FBSyxRQUFRLENBQUM7QUFDaEQsQ0FBQzs7Ozs7QUFFRCxNQUFNLFVBQVUsZUFBZSxDQUFDLElBQVM7SUFDdkMsT0FBTyxJQUFJLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUN2QyxDQUFDOzs7OztBQUVELE1BQU0sVUFBVSxTQUFTLENBQUMsR0FBZ0I7SUFDeEMsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQzdDLENBQUM7Ozs7O0FBRUQsTUFBTSxVQUFVLE9BQU8sQ0FBQyxHQUFnQjtJQUN0QyxPQUFPLElBQUksQ0FBQyxHQUFHLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUNuQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHJvdmlkZXJTY29wZSwgVHJhbnNsYXRpb24gfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCBmbGF0IGZyb20gJ2ZsYXQnO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VmFsdWUob2JqOiBvYmplY3QsIHBhdGg6IHN0cmluZykge1xuICAvKiBGb3IgY2FzZXMgd2hlcmUgdGhlIGtleSBpcyBsaWtlOiAnZ2VuZXJhbC5zb21ldGhpbmcudGhpbmcnICovXG4gIGlmKG9iaiAmJiBvYmouaGFzT3duUHJvcGVydHkocGF0aCkpIHtcbiAgICByZXR1cm4gb2JqW3BhdGhdO1xuICB9XG4gIHJldHVybiBwYXRoLnNwbGl0KCcuJykucmVkdWNlKChwLCBjKSA9PiBwICYmIHBbY10sIG9iaik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRWYWx1ZShvYmo6IGFueSwgcHJvcDogc3RyaW5nLCB2YWw6IGFueSkge1xuICBvYmogPSB7IC4uLm9iaiB9O1xuXG4gIGNvbnN0IHNwbGl0ID0gcHJvcC5zcGxpdCgnLicpO1xuICBjb25zdCBsYXN0SW5kZXggPSBzcGxpdC5sZW5ndGggLSAxO1xuXG4gIHNwbGl0LnJlZHVjZSgoYWNjLCBwYXJ0LCBpbmRleCkgPT4ge1xuICAgIGlmKGluZGV4ID09PSBsYXN0SW5kZXgpIHtcbiAgICAgIGFjY1twYXJ0XSA9IHZhbDtcbiAgICB9IGVsc2Uge1xuICAgICAgYWNjW3BhcnRdID0gQXJyYXkuaXNBcnJheShhY2NbcGFydF0pID8gYWNjW3BhcnRdLnNsaWNlKCkgOiB7IC4uLmFjY1twYXJ0XSB9O1xuICAgIH1cblxuICAgIHJldHVybiBhY2MgJiYgYWNjW3BhcnRdO1xuICB9LCBvYmopO1xuXG4gIHJldHVybiBvYmo7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzaXplKGNvbGxlY3Rpb24pIHtcbiAgaWYoIWNvbGxlY3Rpb24pIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIGlmKEFycmF5LmlzQXJyYXkoY29sbGVjdGlvbikpIHtcbiAgICByZXR1cm4gY29sbGVjdGlvbi5sZW5ndGg7XG4gIH1cblxuICBpZihpc09iamVjdChjb2xsZWN0aW9uKSkge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhjb2xsZWN0aW9uKS5sZW5ndGg7XG4gIH1cblxuICByZXR1cm4gISFjb2xsZWN0aW9uID8gY29sbGVjdGlvbi5sZW5ndGggOiAwO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNFbXB0eShjb2xsZWN0aW9uKSB7XG4gIHJldHVybiBzaXplKGNvbGxlY3Rpb24pID09PSAwO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNGdW5jdGlvbih2YWw6IGFueSk6IHZhbCBpcyBGdW5jdGlvbiB7XG4gIHJldHVybiB0eXBlb2YgdmFsID09PSAnZnVuY3Rpb24nO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNTdHJpbmcodmFsOiBhbnkpOiB2YWwgaXMgc3RyaW5nIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNOdW1iZXIodmFsOiBhbnkpOiB2YWwgaXMgbnVtYmVyIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdudW1iZXInO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNPYmplY3QoaXRlbSk6IGJvb2xlYW4ge1xuICByZXR1cm4gaXRlbSAmJiB0eXBlb2YgaXRlbSA9PT0gJ29iamVjdCcgJiYgIUFycmF5LmlzQXJyYXkoaXRlbSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb2VyY2VBcnJheSh2YWwpIHtcbiAgcmV0dXJuIEFycmF5LmlzQXJyYXkodmFsKSA/IHZhbCA6IFt2YWxdO1xufVxuXG4vKlxuICogQGV4YW1wbGVcbiAqXG4gKiBnaXZlbjogcGF0aC10by1oYXBwaW5lc3MgPT4gcGF0aFRvSGFwcGluZXNzXG4gKiBnaXZlbjogcGF0aF90b19oYXBwaW5lc3MgPT4gcGF0aFRvSGFwcGluZXNzXG4gKiBnaXZlbjogcGF0aC10b19oYXBwaW5lc3MgPT4gcGF0aFRvSGFwcGluZXNzXG4gKlxuICovXG5leHBvcnQgZnVuY3Rpb24gdG9DYW1lbENhc2Uoc3RyOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gc3RyXG4gICAgLnJlcGxhY2UoLyg/Ol5cXHd8W0EtWl18XFxiXFx3KS9nLCAod29yZCwgaW5kZXgpID0+IChpbmRleCA9PSAwID8gd29yZC50b0xvd2VyQ2FzZSgpIDogd29yZC50b1VwcGVyQ2FzZSgpKSlcbiAgICAucmVwbGFjZSgvXFxzK3xffC18XFwvL2csICcnKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQnJvd3NlcigpIHtcbiAgcmV0dXJuIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNOaWwodmFsdWU6IGFueSkge1xuICByZXR1cm4gdmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRGVmaW5lZCh2YWx1ZTogYW55KSB7XG4gIHJldHVybiBpc05pbCh2YWx1ZSkgPT09IGZhbHNlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9OdW1iZXIodmFsdWU6IG51bWJlciB8IHN0cmluZyk6IG51bWJlciB8IG51bGwge1xuICBpZihpc051bWJlcih2YWx1ZSkpIHJldHVybiB2YWx1ZTtcblxuICBpZihpc1N0cmluZyh2YWx1ZSkgJiYgIWlzTmFOKE51bWJlcih2YWx1ZSkgLSBwYXJzZUZsb2F0KHZhbHVlKSkpIHtcbiAgICByZXR1cm4gTnVtYmVyKHZhbHVlKTtcbiAgfVxuXG4gIHJldHVybiBudWxsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNTY29wZU9iamVjdChpdGVtOiBhbnkpOiBpdGVtIGlzIFByb3ZpZGVyU2NvcGUge1xuICByZXR1cm4gaXRlbSAmJiB0eXBlb2YgaXRlbS5zY29wZSA9PT0gJ3N0cmluZyc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoYXNJbmxpbmVMb2FkZXIoaXRlbTogYW55KTogaXRlbSBpcyBQcm92aWRlclNjb3BlIHtcbiAgcmV0dXJuIGl0ZW0gJiYgaXNPYmplY3QoaXRlbS5sb2FkZXIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdW5mbGF0dGVuKG9iajogVHJhbnNsYXRpb24pOiBUcmFuc2xhdGlvbiB7XG4gIHJldHVybiBmbGF0LnVuZmxhdHRlbihvYmosIHsgc2FmZTogdHJ1ZSB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZsYXR0ZW4ob2JqOiBUcmFuc2xhdGlvbik6IFRyYW5zbGF0aW9uIHtcbiAgcmV0dXJuIGZsYXQob2JqLCB7IHNhZmU6IHRydWUgfSk7XG59XG4iXX0=