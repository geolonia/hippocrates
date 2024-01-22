"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.build = void 0;
const path_1 = __importDefault(require("path"));
const excel2json_1 = require("../lib/excel2json");
// import { buildConfig} from '../lib/buildConfig'
// import { buildTypeScript } from '../lib/buildTypeScript'
const copyDirectory_1 = require("../lib/copyDirectory");
const build = async (source) => {
    const workingDirPath = process.cwd();
    const basePath = path_1.default.resolve((process.cwd(), 'node_modules/hippocrates'));
    const buildPath = path_1.default.resolve(workingDirPath, 'build');
    // node_modules/hippocrates/dist/app を process.cwd() にコピーする
    const appPath = path_1.default.resolve(basePath, 'dist', 'app');
    const destPath = path_1.default.resolve(process.cwd(), 'build');
    (0, copyDirectory_1.copyDirectory)(appPath, destPath);
    const sourcePath = path_1.default.resolve(process.cwd(), source || '.');
    // const appConfigPath = path.resolve(basePath, 'src', 'app', 'src');
    // const publicPath = path.resolve(basePath, 'src', 'app', 'public');
    // sourcePath 内の Excel/CSV を json に変換する
    await (0, excel2json_1.excelToJson)(sourcePath, buildPath);
    // // config.json と .env を生成する
    // await buildConfig(appConfigPath);
    // // TypeScript をビルドする
    // await buildTypeScript();
};
exports.build = build;
