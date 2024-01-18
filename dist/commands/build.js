"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.build = void 0;
const path_1 = __importDefault(require("path"));
const excel2json_1 = require("../lib/excel2json");
const buildConfig_1 = require("../lib/buildConfig");
const buildTypeScript_1 = require("../lib/buildTypeScript");
const build = async (source) => {
    const sourcePath = path_1.default.resolve(process.cwd(), source || '.');
    const appConfigPath = path_1.default.resolve(__dirname, '..', 'app', 'src');
    const publicPath = path_1.default.resolve(__dirname, '..', 'app', 'public');
    // sourcePath 内の Excel/CSV を json に変換する
    await (0, excel2json_1.excelToJson)(sourcePath, publicPath);
    // config.json と .env を生成する
    await (0, buildConfig_1.buildConfig)(appConfigPath);
    // TypeScript をビルドする
    await (0, buildTypeScript_1.buildTypeScript)();
};
exports.build = build;
