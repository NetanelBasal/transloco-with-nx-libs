"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const schema_1 = require("../ng-add/schema");
const p = require('path');
const fs = require('fs');
function jsonTranslationFileCreator(source, lang) {
    return source.create(`${lang}.json`, `{
  "title": "transloco ${lang}",
  "dynamic": "transloco {{value}}"
}
`);
}
exports.jsonTranslationFileCreator = jsonTranslationFileCreator;
function typescriptTranslationFileCreator(source, lang) {
    return source.create(`${lang}.ts`, `export default {
  title: "transloco ${lang}",
  dynamic: "transloco {{value}}"
};
`);
}
exports.typescriptTranslationFileCreator = typescriptTranslationFileCreator;
function checkIfTranslationFilesExist(path, langs, extension) {
    langs.forEach(lang => {
        const filePath = p.resolve(`${path}/${lang}${extension}`);
        if (fs.existsSync(filePath)) {
            throw new schematics_1.SchematicsException(`Translation file ${filePath} is already exist, please use --skip-creation`);
        }
    });
}
exports.checkIfTranslationFilesExist = checkIfTranslationFilesExist;
function createTranslateFilesFromOptions(host, options, translationFilePath) {
    const extension = options.translateType === schema_1.TranslationFileTypes.Typescript ? '.ts' : '.json';
    const translationCreator = options.translateType === schema_1.TranslationFileTypes.Typescript
        ? typescriptTranslationFileCreator
        : jsonTranslationFileCreator;
    checkIfTranslationFilesExist(translationFilePath, options.langs, extension);
    return schematics_1.apply(schematics_1.source(createTranslateFiles(options.langs, translationCreator)), [
        schematics_1.move('/', translationFilePath)
    ]);
}
exports.createTranslateFilesFromOptions = createTranslateFilesFromOptions;
function createTranslateFiles(langs, creator) {
    const treeSource = new schematics_1.EmptyTree();
    langs.forEach(lang => {
        creator(treeSource, lang);
    });
    return treeSource;
}
exports.createTranslateFiles = createTranslateFiles;
//# sourceMappingURL=translations.js.map