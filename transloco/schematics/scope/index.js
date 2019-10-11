"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const strings_1 = require("@angular-devkit/core/src/utils/strings");
const schematics_1 = require("@angular-devkit/schematics");
const operators_1 = require("rxjs/operators");
const typescript_1 = require("typescript");
const ng_add_1 = require("../ng-add");
const schematics_consts_1 = require("../schematics.consts");
const ast_utils_1 = require("../utils/ast-utils");
const find_module_1 = require("../utils/find-module");
const projects_1 = require("../utils/projects");
const translations_1 = require("../utils/translations");
const p = require('path');
function addScopeToModule(tree, modulePath, name) {
    const module = tree.read(modulePath);
    const moduleSource = typescript_1.createSourceFile(modulePath, module.toString('utf-8'), typescript_1.ScriptTarget.Latest, true);
    const provider = `{ provide: TRANSLOCO_SCOPE, useValue: '${strings_1.dasherize(name)}' }`;
    const changes = [];
    changes.push(ast_utils_1.addProviderToModule(moduleSource, modulePath, provider, schematics_consts_1.LIB_NAME)[0]);
    changes.push(ast_utils_1.addImportToModule(moduleSource, modulePath, 'TranslocoModule', schematics_consts_1.LIB_NAME)[0]);
    changes.push(ast_utils_1.insertImport(moduleSource, modulePath, 'TRANSLOCO_SCOPE, TranslocoModule', schematics_consts_1.LIB_NAME));
    ng_add_1.applyChanges(tree, modulePath, changes);
}
function getTranslationFilesFromAssets(host, translationsPath) {
    const langFiles = host.root.dir(translationsPath).subfiles;
    return langFiles.map(file => file.split('.')[0]);
}
function addTranslationFiles(options, rootPath, host) {
    const translationsPath = options.translationFilesPath
        ? p.join(rootPath, options.translationFilesPath)
        : p.join(rootPath, 'assets', 'i18n');
    options.langs = options.langs
        ? options.langs.split(',').map(l => l.trim())
        : getTranslationFilesFromAssets(host, translationsPath);
    return translations_1.createTranslateFilesFromOptions(host, options, p.join(translationsPath, strings_1.dasherize(options.name)));
}
function default_1(options) {
    return (host, context) => {
        const project = projects_1.getProject(host, options.project);
        const path = (project && project.sourceRoot) || 'src';
        const translationFiles = options.skipCreation
            ? schematics_1.noop()
            : schematics_1.mergeWith(addTranslationFiles(options, path, host));
        if (options.module) {
            const projectPath = projects_1.getProjectPath(host, project, options);
            const modulePath = find_module_1.findModuleFromOptions(host, options, projectPath);
            if (modulePath) {
                addScopeToModule(host, modulePath, options.name);
                return translationFiles(host, context);
            }
        }
        const cmpRule = schematics_1.externalSchematic('@schematics/angular', 'module', options);
        const tree$ = schematics_1.chain([cmpRule, translationFiles])(host, context).pipe(operators_1.tap(tree => {
            const modulePath = tree.actions.find(action => !!action.path.match(/\.module\.ts/)).path;
            addScopeToModule(tree, modulePath, options.name);
        }));
        return tree$;
    };
}
exports.default = default_1;
//# sourceMappingURL=index.js.map