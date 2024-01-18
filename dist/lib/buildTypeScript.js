"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildTypeScript = void 0;
const path_1 = __importDefault(require("path"));
const execPromise_1 = require("./execPromise");
const buildTypeScript = async () => {
    const configPath = path_1.default.resolve(process.cwd(), 'src', 'app', 'vite.config.ts');
    try {
        const { stderr } = await (0, execPromise_1.execPromise)(`tsc && vite build --config ${configPath} --emptyOutDir`);
        if (stderr) {
            console.error(`stderr: ${stderr}`);
        }
    }
    catch (error) {
        console.error(`実行エラー: ${error}`);
    }
};
exports.buildTypeScript = buildTypeScript;
