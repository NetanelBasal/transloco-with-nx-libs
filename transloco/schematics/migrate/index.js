"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const ngx_translate_migration_1 = require("./ngx-translate-migration");
function default_1(options) {
    return () => {
        if (!options.path) {
            throw new schematics_1.SchematicsException(`
        Please specify the root source of your project.
        (e.g. --path ./src/app)
      `);
        }
        return ngx_translate_migration_1.run(options.path);
    };
}
exports.default = default_1;
//# sourceMappingURL=index.js.map