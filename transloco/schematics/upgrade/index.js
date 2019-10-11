"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const process_1 = require("process");
const v2_1 = require("./v2");
function default_1(options) {
    return () => {
        if (!options.path) {
            throw new schematics_1.SchematicsException(`
        Please specify the root source of your project.
        (e.g. --path ./src/app)
      `);
        }
        v2_1.run(options.path);
        process_1.exit();
    };
}
exports.default = default_1;
//# sourceMappingURL=index.js.map