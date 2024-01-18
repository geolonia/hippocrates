"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.start = void 0;
const build_1 = require("./build");
const execPromise_1 = require("../lib/execPromise");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const start = async (source) => {
    await (0, build_1.build)(source);
    const distPath = path_1.default.resolve(process.cwd(), 'dist');
    if (!fs_1.default.existsSync(distPath)) {
        console.error('dist ディレクトリが存在しません。ビルドを実行してください。');
        return;
    }
    try {
        const { stderr } = await (0, execPromise_1.execPromise)(`npx http-server "${distPath}" -o --cors -c1`);
        if (stderr) {
            console.error(`stderr: ${stderr}`);
        }
    }
    catch (error) {
        console.error(`実行エラー: ${error}`);
    }
};
exports.start = start;
