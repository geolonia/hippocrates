"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildTypeScript = void 0;
const path_1 = __importDefault(require("path"));
const execPromise_1 = require("./execPromise");
const defaultValues_1 = require("./defaultValues");
const fs_1 = __importDefault(require("fs"));
const buildTypeScript = async (env) => {
    try {
        await (0, execPromise_1.execPromise)(`cd ${defaultValues_1.defaultValues.providerDir}`);
        if (!fs_1.default.existsSync(path_1.default.join(defaultValues_1.defaultValues.providerDir, 'node_modules'))) {
            await (0, execPromise_1.execPromise)(`npm install`);
        }
        await (0, execPromise_1.execPromise)(`react-scripts build`, { env });
    }
    catch (error) {
        console.error(`実行エラー: ${error}`);
    }
};
exports.buildTypeScript = buildTypeScript;
