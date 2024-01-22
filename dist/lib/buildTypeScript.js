"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildTypeScript = void 0;
const path_1 = __importDefault(require("path"));
const execPromise_1 = require("./execPromise");
const defaultValues_1 = require("./defaultValues");
const buildTypeScript = async () => {
    try {
        console.log(path_1.default.join(defaultValues_1.defaultValues.providerDir, 'tsconfig.json'));
        const { stdout, stderr } = await (0, execPromise_1.execPromise)(`npx tsc -p ${path_1.default.join(defaultValues_1.defaultValues.providerDir, 'tsconfig.json')}`);
        console.log(`stdout: ${stdout}`);
        if (stderr) {
            console.error(`stderr: ${stderr}`);
        }
    }
    catch (error) {
        console.error(`実行エラー: ${error}`);
    }
};
exports.buildTypeScript = buildTypeScript;
