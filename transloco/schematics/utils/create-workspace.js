"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const operators_1 = require("rxjs/operators");
exports.defaultWorkspaceOptions = {
    name: 'workspace',
    newProjectRoot: 'projects',
    version: '8.0.0',
    defaultProject: 'bar'
};
exports.defaultAppOptions = {
    name: 'bar',
    inlineStyle: false,
    inlineTemplate: false,
    viewEncapsulation: 'Emulated',
    routing: false,
    style: 'css',
    skipTests: false
};
const defaultLibOptions = {
    name: 'baz'
};
function getTestProjectPath(workspaceOptions = exports.defaultWorkspaceOptions, appOptions = exports.defaultAppOptions) {
    return `/${workspaceOptions.newProjectRoot}/${appOptions.name}`;
}
exports.getTestProjectPath = getTestProjectPath;
function createWorkspace(schematicRunner, appTree, workspaceOptions = exports.defaultWorkspaceOptions, appOptions = exports.defaultAppOptions, libOptions = defaultLibOptions) {
    return __awaiter(this, void 0, void 0, function* () {
        const angularSchematic = '@schematics/angular';
        return schematicRunner
            .runExternalSchematicAsync(angularSchematic, 'workspace', workspaceOptions)
            .pipe(operators_1.switchMap(tree => schematicRunner.runExternalSchematicAsync(angularSchematic, 'application', appOptions, tree)), operators_1.switchMap(tree => schematicRunner.runExternalSchematicAsync(angularSchematic, 'library', libOptions, tree)))
            .toPromise();
    });
}
exports.createWorkspace = createWorkspace;
//# sourceMappingURL=create-workspace.js.map