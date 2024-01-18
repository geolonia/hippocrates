"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildConfig = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const buildConfig = async (destinationPath) => {
    const packageJSONPath = path.resolve(process.cwd(), 'package.json');
    // package.json ファイルを読み込む
    const packageJson = JSON.parse(fs.readFileSync(packageJSONPath, 'utf8'));
    // 必要な設定を抽出する
    const settings = packageJson.settings;
    // config.json として保存する
    fs.writeFileSync(path.resolve(destinationPath, 'config.json'), JSON.stringify(settings, null, 2));
    // .env 形式での文字列を生成する
    const envContent = Object.entries(settings).map(([key, value]) => {
        // オブジェクトのキーを大文字に変換し、アンダースコアに置き換える
        const envKey = key.toUpperCase().replace(/-/g, '_');
        return `VITE_${envKey}=${value}`;
    }).join('\n');
    fs.writeFileSync(path.resolve(destinationPath, '.env'), envContent);
    console.log('build has been created with the specified settings.');
};
exports.buildConfig = buildConfig;
