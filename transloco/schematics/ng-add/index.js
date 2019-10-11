"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const typescript_1 = require("typescript");
const schematics_consts_1 = require("../schematics.consts");
const ast_utils_1 = require("../utils/ast-utils");
const change_1 = require("../utils/change");
const find_module_1 = require("../utils/find-module");
const projects_1 = require("../utils/projects");
const schema_1 = require("./schema");
const array_1 = require("../utils/array");
function jsonTranslationFileCreator(source, lang) {
    return source.create(`${lang}.json`, `{
  "title": "transloco ${lang}",
  "dynamic": "transloco {{value}}"
}
`);
}
function typescriptTranslationFileCreator(source, lang) {
    return source.create(`${lang}.ts`, `export default {
  title: "transloco ${lang}",
  dynamic: "transloco {{value}}"
};
`);
}
function createTranslateFiles(langs, creator) {
    const treeSource = new schematics_1.EmptyTree();
    langs.forEach(lang => {
        creator(treeSource, lang);
    });
    return treeSource;
}
function getModuleFile(host, options) {
    const modulePath = options.module;
    if (!host.exists(modulePath)) {
        throw new schematics_1.SchematicsException(`File ${modulePath} does not exist.`);
    }
    const text = host.read(modulePath);
    if (text === null) {
        throw new schematics_1.SchematicsException(`File ${modulePath} does not exist.`);
    }
    const sourceText = text.toString('utf-8');
    return typescript_1.createSourceFile(modulePath, sourceText, typescript_1.ScriptTarget.Latest, true);
}
exports.getModuleFile = getModuleFile;
function applyChanges(host, path, changes) {
    const recorder = host.beginUpdate(path);
    for (const change of changes) {
        if (change instanceof change_1.InsertChange) {
            recorder.insertLeft(change.pos, change.toAdd);
        }
    }
    host.commitUpdate(recorder);
    return host;
}
exports.applyChanges = applyChanges;
function addImportsToModuleFile(options, imports, file = schematics_consts_1.LIB_NAME) {
    return host => {
        const module = getModuleFile(host, options);
        const importChanges = ast_utils_1.insertImport(module, options.module, imports.join(', '), file);
        return applyChanges(host, options.module, [importChanges]);
    };
}
exports.addImportsToModuleFile = addImportsToModuleFile;
function addImportsToModuleDeclaration(options, imports) {
    return host => {
        const module = getModuleFile(host, options);
        const importChanges = imports.map(imp => ast_utils_1.addImportToModule(module, options.module, imp, schematics_consts_1.LIB_NAME)[0]);
        return applyChanges(host, options.module, importChanges);
    };
}
exports.addImportsToModuleDeclaration = addImportsToModuleDeclaration;
function addProvidersToModuleDeclaration(options, providers) {
    return host => {
        const module = getModuleFile(host, options);
        const providerChanges = ast_utils_1.addProviderToModule(module, options.module, providers.join(',\n    ') + '\n  ', schematics_consts_1.LIB_NAME);
        return applyChanges(host, options.module, providerChanges);
    };
}
exports.addProvidersToModuleDeclaration = addProvidersToModuleDeclaration;
function getLoaderTemplates(options, path) {
    const loaderFolder = options.loader === schema_1.Loaders.Webpack ? 'webpack-loader' : 'http-loader';
    return schematics_1.apply(schematics_1.url(`./files/${loaderFolder}`), [
        schematics_1.template({
            ts: 'ts',
            ssr: options.ssr,
            prefix: options.ssr ? '${environment.baseUrl}' : '',
            suffix: options.format === schema_1.TranslationFileTypes.JSON ? '.json' : ''
        }),
        schematics_1.move('/', path)
    ]);
}
function updateEnvironmentBaseUrl(host, sourceRoot, defaultValue) {
    const template = `\$1{
  baseUrl: '${defaultValue}',`;
    projects_1.setEnvironments(host, sourceRoot, (env) => env.indexOf('baseUrl') === -1 ? env.replace(/(environment.*=*)\{/, template) : env);
}
function default_1(options) {
    return (host, context) => {
        const langs = options.langs.split(',').map(l => l.trim());
        const project = projects_1.getProject(host, options.project);
        const sourceRoot = (project && project.sourceRoot) || 'src';
        const isLib = project.projectType === 'library';
        const assetsPath = `${sourceRoot}/${options.path}`;
        const translationCreator = options.translateType === schema_1.TranslationFileTypes.Typescript
            ? typescriptTranslationFileCreator
            : jsonTranslationFileCreator;
        const translateFiles = schematics_1.apply(schematics_1.source(createTranslateFiles(langs, translationCreator)), [schematics_1.move('/', assetsPath)]);
        options.module = find_module_1.findRootModule(host, options.module, sourceRoot);
        const modulePath = options.module.substring(0, options.module.lastIndexOf('/') + 1);
        const prodMode = isLib ? 'false' : 'environment.production';
        const configProviderTemplate = `{
      provide: TRANSLOCO_CONFIG,
      useValue: {
        availableLangs: [${array_1.stringifyList(langs)}],
        defaultLang: '${langs[0]}',
        prodMode: ${prodMode},
      } as TranslocoConfig
    }`;
        if (options.ssr) {
            updateEnvironmentBaseUrl(host, sourceRoot, 'http://localhost:4200');
        }
        return schematics_1.chain([
            schematics_1.mergeWith(translateFiles),
            options.loader === schema_1.Loaders.Http
                ? schematics_1.chain([
                    addImportsToModuleFile(options, ['HttpClientModule'], '@angular/common/http'),
                    addImportsToModuleDeclaration(options, ['HttpClientModule'])
                ])
                : schematics_1.noop(),
            schematics_1.mergeWith(getLoaderTemplates(options, modulePath)),
            isLib ? schematics_1.noop() : addImportsToModuleFile(options, ['environment'], '../environments/environment'),
            addImportsToModuleFile(options, ['translocoLoader'], './transloco.loader'),
            addImportsToModuleFile(options, ['TranslocoModule', 'TRANSLOCO_CONFIG', 'TranslocoConfig']),
            addImportsToModuleDeclaration(options, ['TranslocoModule']),
            addProvidersToModuleDeclaration(options, [configProviderTemplate, 'translocoLoader'])
        ])(host, context);
    };
}
exports.default = default_1;
//# sourceMappingURL=index.js.map