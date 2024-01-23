"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.build = void 0;
// import path from 'path'
// import { excelToJson } from '../lib/excel2json'
// // import { buildConfig} from '../lib/buildConfig'
// // import { buildTypeScript } from '../lib/buildTypeScript'
// import { copyDirectory } from '../lib/copyDirectory'
const buildTypeScript_1 = require("../lib/buildTypeScript");
// import fs from 'fs'
const build = async (_source) => {
    // 環境変数を設定
    const envVars = {
        MY_VAR: 'some value',
        ANOTHER_VAR: 'another value'
    };
    // 現在の環境変数にカスタム環境変数をマージ
    const env = Object.assign({}, process.env, envVars);
    await (0, buildTypeScript_1.buildTypeScript)(env);
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
