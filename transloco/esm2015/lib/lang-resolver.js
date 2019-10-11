/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { getLangFromScope, getPipeValue, getScopeFromLang } from './shared';
export class LangResolver {
    constructor() {
        this.initialized = false;
    }
    // inline => provider => active
    /**
     * @param {?=} __0
     * @return {?}
     */
    resolve({ inline, provider, active } = { inline: undefined, provider: undefined, active: undefined }) {
        /** @type {?} */
        let lang = active;
        /**
         * When the user changes the lang we need to update
         * the view. Otherwise, the lang will remain the inline/provided lang
         */
        if (this.initialized) {
            lang = active;
            return lang;
        }
        if (provider) {
            const [_, extracted] = getPipeValue(provider, 'static');
            lang = extracted;
        }
        if (inline) {
            const [_, extracted] = getPipeValue(inline, 'static');
            lang = extracted;
        }
        this.initialized = true;
        return lang;
    }
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
    resolveLangBasedOnScope(lang) {
        /** @type {?} */
        const scope = getScopeFromLang(lang);
        return scope ? getLangFromScope(lang) : lang;
    }
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
    resolveLangPath(lang, scope) {
        return scope ? `${scope}/${lang}` : lang;
    }
}
if (false) {
    /** @type {?} */
    LangResolver.prototype.initialized;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFuZy1yZXNvbHZlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ25lYXQvdHJhbnNsb2NvLyIsInNvdXJjZXMiOlsibGliL2xhbmctcmVzb2x2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxZQUFZLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFRNUUsTUFBTSxPQUFPLFlBQVk7SUFBekI7UUFDRSxnQkFBVyxHQUFHLEtBQUssQ0FBQztJQTBEdEIsQ0FBQzs7Ozs7O0lBdkRDLE9BQU8sQ0FDTCxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxLQUF5QixFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFOztZQUU1RyxJQUFJLEdBQUcsTUFBTTtRQUNqQjs7O1dBR0c7UUFDSCxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDcEIsSUFBSSxHQUFHLE1BQU0sQ0FBQztZQUNkLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFFRCxJQUFJLFFBQVEsRUFBRTtrQkFDTixDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsR0FBRyxZQUFZLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQztZQUN2RCxJQUFJLEdBQUcsU0FBUyxDQUFDO1NBQ2xCO1FBRUQsSUFBSSxNQUFNLEVBQUU7a0JBQ0osQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLEdBQUcsWUFBWSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUM7WUFDckQsSUFBSSxHQUFHLFNBQVMsQ0FBQztTQUNsQjtRQUVELElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQzs7Ozs7Ozs7Ozs7OztJQVlELHVCQUF1QixDQUFDLElBQVk7O2NBQzVCLEtBQUssR0FBRyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUM7UUFDcEMsT0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDL0MsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7SUFZRCxlQUFlLENBQUMsSUFBWSxFQUFFLEtBQXlCO1FBQ3JELE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQzNDLENBQUM7Q0FDRjs7O0lBMURDLG1DQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdldExhbmdGcm9tU2NvcGUsIGdldFBpcGVWYWx1ZSwgZ2V0U2NvcGVGcm9tTGFuZyB9IGZyb20gJy4vc2hhcmVkJztcblxudHlwZSBMYW5nUmVzb2x2ZXJQYXJhbXMgPSB7XG4gIGlubGluZTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICBwcm92aWRlcjogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICBhY3RpdmU6IHN0cmluZyB8IHVuZGVmaW5lZDtcbn07XG5cbmV4cG9ydCBjbGFzcyBMYW5nUmVzb2x2ZXIge1xuICBpbml0aWFsaXplZCA9IGZhbHNlO1xuXG4gIC8vIGlubGluZSA9PiBwcm92aWRlciA9PiBhY3RpdmVcbiAgcmVzb2x2ZShcbiAgICB7IGlubGluZSwgcHJvdmlkZXIsIGFjdGl2ZSB9OiBMYW5nUmVzb2x2ZXJQYXJhbXMgPSB7IGlubGluZTogdW5kZWZpbmVkLCBwcm92aWRlcjogdW5kZWZpbmVkLCBhY3RpdmU6IHVuZGVmaW5lZCB9XG4gICkge1xuICAgIGxldCBsYW5nID0gYWN0aXZlO1xuICAgIC8qKlxuICAgICAqIFdoZW4gdGhlIHVzZXIgY2hhbmdlcyB0aGUgbGFuZyB3ZSBuZWVkIHRvIHVwZGF0ZVxuICAgICAqIHRoZSB2aWV3LiBPdGhlcndpc2UsIHRoZSBsYW5nIHdpbGwgcmVtYWluIHRoZSBpbmxpbmUvcHJvdmlkZWQgbGFuZ1xuICAgICAqL1xuICAgIGlmICh0aGlzLmluaXRpYWxpemVkKSB7XG4gICAgICBsYW5nID0gYWN0aXZlO1xuICAgICAgcmV0dXJuIGxhbmc7XG4gICAgfVxuXG4gICAgaWYgKHByb3ZpZGVyKSB7XG4gICAgICBjb25zdCBbXywgZXh0cmFjdGVkXSA9IGdldFBpcGVWYWx1ZShwcm92aWRlciwgJ3N0YXRpYycpO1xuICAgICAgbGFuZyA9IGV4dHJhY3RlZDtcbiAgICB9XG5cbiAgICBpZiAoaW5saW5lKSB7XG4gICAgICBjb25zdCBbXywgZXh0cmFjdGVkXSA9IGdldFBpcGVWYWx1ZShpbmxpbmUsICdzdGF0aWMnKTtcbiAgICAgIGxhbmcgPSBleHRyYWN0ZWQ7XG4gICAgfVxuXG4gICAgdGhpcy5pbml0aWFsaXplZCA9IHRydWU7XG4gICAgcmV0dXJuIGxhbmc7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogUmVzb2x2ZSB0aGUgbGFuZ1xuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiByZXNvbHZlTGFuZ0Jhc2VkT25TY29wZSgndG9kb3MvZW4nKSA9PiBlblxuICAgKiByZXNvbHZlTGFuZ0Jhc2VkT25TY29wZSgnZW4nKSA9PiBlblxuICAgKlxuICAgKi9cbiAgcmVzb2x2ZUxhbmdCYXNlZE9uU2NvcGUobGFuZzogc3RyaW5nKSB7XG4gICAgY29uc3Qgc2NvcGUgPSBnZXRTY29wZUZyb21MYW5nKGxhbmcpO1xuICAgIHJldHVybiBzY29wZSA/IGdldExhbmdGcm9tU2NvcGUobGFuZykgOiBsYW5nO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIFJlc29sdmUgdGhlIGxhbmcgcGF0aCBmb3IgbG9hZGluZ1xuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiByZXNvbHZlTGFuZ1BhdGgoJ3RvZG9zJywgJ2VuJykgPT4gdG9kb3MvZW5cbiAgICogcmVzb2x2ZUxhbmdQYXRoKCdlbicpID0+IGVuXG4gICAqXG4gICAqL1xuICByZXNvbHZlTGFuZ1BhdGgobGFuZzogc3RyaW5nLCBzY29wZTogc3RyaW5nIHwgdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIHNjb3BlID8gYCR7c2NvcGV9LyR7bGFuZ31gIDogbGFuZztcbiAgfVxufVxuIl19