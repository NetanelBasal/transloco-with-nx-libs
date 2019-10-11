"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function stringifyList(list, separator = ', ') {
    return list.map(item => `'${item}'`).join(separator);
}
exports.stringifyList = stringifyList;
//# sourceMappingURL=array.js.map