"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.build = void 0;
const path_1 = __importDefault(require("path"));
const excel2geojson_1 = require("../lib/excel2geojson");
const buildConfig_1 = require("../lib/buildConfig");
const copyDirectory_1 = require("../lib/copyDirectory");
const buildTypeScript_1 = require("../lib/buildTypeScript");
const defaultValues_1 = require("../lib/defaultValues");
const fs_1 = __importDefault(require("fs"));
const build = async (source) => {
    await (0, buildConfig_1.buildConfig)();
    const configPath = path_1.default.resolve(defaultValues_1.defaultValues.providerDir, 'config.json');
    const config = JSON.parse(fs_1.default.readFileSync(configPath, 'utf8'));
    // 現在の環境変数にカスタム環境変数をマージ
    const env = Object.assign({}, process.env, config);
    // sourcePath 内の Excel/CSV を json に変換する
    const sourcePath = source ? path_1.default.resolve(process.cwd(), source) : process.cwd();
    await (0, excel2geojson_1.excelToGeojson)(sourcePath);
    await (0, buildTypeScript_1.buildTypeScript)(env);
    const innerNPMPath = path_1.default.resolve(defaultValues_1.defaultValues.providerDir, 'build');
    (0, copyDirectory_1.copyDirectory)(innerNPMPath, defaultValues_1.defaultValues.buildDir);
};
exports.build = build;
