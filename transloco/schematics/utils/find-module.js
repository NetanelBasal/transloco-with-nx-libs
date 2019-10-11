"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const core_1 = require("@angular-devkit/core");
exports.MODULE_EXT = '.module.ts';
exports.ROUTING_MODULE_EXT = '-routing.module.ts';
/**
 * Find the module referred by a set of options passed to the schematics.
 */
function findRootModule(host, module, rootPath = '', skipImport = false) {
    if (skipImport || !module) {
        return undefined;
    }
    const modulePath = core_1.normalize(`${rootPath}/${module}`);
    if (host.exists(modulePath)) {
        return modulePath;
    }
    else if (host.exists(modulePath + '.ts')) {
        return core_1.normalize(modulePath + '.ts');
    }
    else if (host.exists(modulePath + exports.MODULE_EXT)) {
        return core_1.normalize(modulePath + exports.MODULE_EXT);
    }
    else if (host.exists(`${modulePath}/${module}${exports.MODULE_EXT}`)) {
        return core_1.normalize(`${modulePath}/${module}${exports.MODULE_EXT}`);
    }
    else if (host.exists(`${modulePath}/${module}.ts`)) {
        return core_1.normalize(`${modulePath}/${module}.ts`);
    }
    else {
        throw new Error(`Specified module path ${modulePath} does not exist`);
    }
}
exports.findRootModule = findRootModule;
/**
 * Find the module referred by a set of options passed to the schematics.
 */
function findModuleFromOptions(host, options, projectPath) {
    if (options.hasOwnProperty('skipImport') && options.skipImport) {
        return undefined;
    }
    const moduleExt = options.moduleExt || exports.MODULE_EXT;
    const routingModuleExt = options.routingModuleExt || exports.ROUTING_MODULE_EXT;
    if (!options.module) {
        const pathToCheck = (projectPath || '') + '/' + options.name;
        const module = findModule(host, pathToCheck, moduleExt, routingModuleExt);
        return module ? core_1.normalize(module) : null;
    }
    else {
        const modulePath = core_1.normalize(`/${projectPath}/${options.module}`);
        const componentPath = core_1.normalize(`/${projectPath}/${options.name}`);
        const moduleBaseName = core_1.normalize(modulePath)
            .split('/')
            .pop();
        const candidateSet = new Set([core_1.normalize(projectPath || '/')]);
        for (let dir = modulePath; dir != core_1.NormalizedRoot; dir = core_1.dirname(dir)) {
            candidateSet.add(dir);
        }
        for (let dir = componentPath; dir != core_1.NormalizedRoot; dir = core_1.dirname(dir)) {
            candidateSet.add(dir);
        }
        const candidatesDirs = [...candidateSet].sort((a, b) => b.length - a.length);
        for (const c of candidatesDirs) {
            const candidateFiles = ['', `${moduleBaseName}.ts`, `${moduleBaseName}${moduleExt}`].map(x => core_1.join(c, x));
            for (const sc of candidateFiles) {
                if (host.exists(sc)) {
                    return core_1.normalize(sc);
                }
            }
        }
        return null;
        throw new Error(`Specified module '${options.module}' does not exist.\n` +
            `Looked in the following directories:\n    ${candidatesDirs.join('\n    ')}`);
    }
}
exports.findModuleFromOptions = findModuleFromOptions;
/**
 * Function to find the "closest" module to a generated file's path.
 */
function findModule(host, generateDir, moduleExt = exports.MODULE_EXT, routingModuleExt = exports.ROUTING_MODULE_EXT) {
    let dir = host.getDir('/' + generateDir);
    let foundRoutingModule = false;
    while (dir) {
        const allMatches = dir.subfiles.filter(p => p.endsWith(moduleExt));
        const filteredMatches = allMatches.filter(p => !p.endsWith(routingModuleExt));
        foundRoutingModule = foundRoutingModule || allMatches.length !== filteredMatches.length;
        if (filteredMatches.length == 1) {
            return core_1.join(dir.path, filteredMatches[0]);
        }
        else if (filteredMatches.length > 1) {
            return null;
            throw new Error('More than one module matches. Use skip-import option to skip importing ' +
                'the component into the closest module.');
        }
        dir = dir.parent;
    }
    const errorMsg = foundRoutingModule
        ? 'Could not find a non Routing NgModule.' +
            `\nModules with suffix '${routingModuleExt}' are strictly reserved for routing.` +
            '\nUse the skip-import option to skip importing in NgModule.'
        : 'Could not find an NgModule. Use the skip-import option to skip importing in NgModule.';
    return null;
    throw new Error(errorMsg);
}
exports.findModule = findModule;
//# sourceMappingURL=find-module.js.map