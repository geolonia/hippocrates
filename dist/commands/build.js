"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.build = void 0;
const path_1 = __importDefault(require("path"));
// import { excelToJson } from '../lib/excel2json'
const buildConfig_1 = require("../lib/buildConfig");
// import { buildTypeScript } from '../lib/buildTypeScript'
const copyDirectory_1 = require("../lib/copyDirectory");
const buildTypeScript_1 = require("../lib/buildTypeScript");
const defaultValues_1 = require("../lib/defaultValues");
// import fs from 'fs'
const build = async (_source) => {
    await (0, buildConfig_1.buildConfig)();
    await (0, buildTypeScript_1.buildTypeScript)();
    const innerNPMPath = path_1.default.resolve(defaultValues_1.defaultValues.providerDir, 'build');
    (0, copyDirectory_1.copyDirectory)(innerNPMPath, defaultValues_1.defaultValues.buildDir);
    // const workingDirPath = process.cwd();
    // const basePath = path.resolve((process.cwd(), 'node_modules/hippocrates'))
    // const buildPath = path.resolve(workingDirPath, 'build');
    // // node_modules/hippocrates/dist/app を process.cwd() にコピーする
    // const appPath = path.resolve(basePath, 'dist', 'app');
    // const destPath = path.resolve(process.cwd(), 'build');
    // copyDirectory(appPath, destPath);
    // const sourcePath = path.resolve(process.cwd(), source || '.')
    // // const appConfigPath = path.resolve(basePath, 'src', 'app', 'src');
    // // const publicPath = path.resolve(basePath, 'src', 'app', 'public');
    // // sourcePath 内の Excel/CSV を json に変換する
    // await excelToJson(sourcePath, buildPath);
    // // config.json と .env を生成する
    // await buildConfig(appConfigPath);
    // // TypeScript をビルドする
    // await buildTypeScript();
};
exports.build = build;
