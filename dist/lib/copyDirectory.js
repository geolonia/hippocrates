"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyDirectory = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function copyDirectory(src, dest) {
    // ソースディレクトリが存在するか確認
    if (!fs_1.default.existsSync(src)) {
        return;
    }
    // 目的ディレクトリが存在しない場合は作成
    if (!fs_1.default.existsSync(dest)) {
        fs_1.default.mkdirSync(dest, { recursive: true });
    }
    // ソースディレクトリの内容を読み取り
    let files = fs_1.default.readdirSync(src);
    files.forEach(file => {
        let srcPath = path_1.default.join(src, file);
        let destPath = path_1.default.join(dest, file);
        // ファイルまたはディレクトリに応じて処理
        let stat = fs_1.default.statSync(srcPath);
        if (stat.isDirectory()) {
            // ディレクトリの場合、再帰的にコピー
            copyDirectory(srcPath, destPath);
        }
        else {
            // ファイルの場合、コピー
            fs_1.default.copyFileSync(srcPath, destPath);
        }
    });
}
exports.copyDirectory = copyDirectory;
