"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const operators_1 = require("rxjs/operators");
function default_1(options) {
    return (host, context) => {
        const template = `<ng-template transloco let-t>
  <h1> {{ t('title') }} </h1>
</ng-template>
`;
        const cmpRule = schematics_1.externalSchematic('@schematics/angular', 'component', options);
        const tree$ = cmpRule(host, context).pipe(operators_1.tap(tree => {
            const templatePath = tree.actions.find(action => !!action.path.match(/component.html/)).path;
            tree.overwrite(templatePath, template);
        }));
        return tree$;
    };
}
exports.default = default_1;
//# sourceMappingURL=index.js.map