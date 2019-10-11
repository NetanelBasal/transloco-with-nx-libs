"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
function getWorkspacePath(host) {
    const possibleFiles = ['/angular.json', '/.angular.json'];
    const path = possibleFiles.filter(path => host.exists(path))[0];
    return path;
}
exports.getWorkspacePath = getWorkspacePath;
function getWorkspace(host) {
    const path = getWorkspacePath(host);
    const configBuffer = host.read(path);
    if (configBuffer === null) {
        throw new schematics_1.SchematicsException(`Could not find (${path})`);
    }
    const config = configBuffer.toString();
    return JSON.parse(config);
}
exports.getWorkspace = getWorkspace;
function getProject(host, project) {
    const workspace = getWorkspace(host);
    if (workspace) {
        return workspace.projects[project || workspace.defaultProject];
    }
    throw new schematics_1.SchematicsException('could not find a workspace project');
}
exports.getProject = getProject;
function setEnvironments(host, sourceRoot, transformer) {
    const path = sourceRoot + '/environments';
    const environments = host.getDir(path);
    return environments.subfiles.forEach(file => {
        const filePath = `${path}/${file}`;
        const configBuffer = host.read(filePath);
        const source = configBuffer.toString('utf-8');
        host.overwrite(filePath, transformer(source));
    });
}
exports.setEnvironments = setEnvironments;
function getProjectPath(host, project, options) {
    if (project.root.substr(-1) === '/') {
        project.root = project.root.substr(0, project.root.length - 1);
    }
    if (options.path === undefined) {
        const projectDirName = project.projectType === 'application' ? 'app' : 'lib';
        return `${project.root ? `/${project.root}` : ''}/src/${projectDirName}`;
    }
    return options.path;
}
exports.getProjectPath = getProjectPath;
function isLib(host, options) {
    const project = getProject(host, options.project);
    return project.projectType === 'library';
}
exports.isLib = isLib;
//# sourceMappingURL=projects.js.map