"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.excelToJson = void 0;
const excel2csv_1 = require("./excel2csv");
const promises_1 = require("fs/promises");
const klaw_1 = __importDefault(require("klaw"));
const error_1 = __importDefault(require("./error"));
const path_1 = __importDefault(require("path"));
const papaparse_1 = __importDefault(require("papaparse"));
const _excelToJson = async (inputDir, outputDir) => {
    const promises = [];
    // 指定したディレクトリ直下のファイルのみを対象にする
    for await (const file of (0, klaw_1.default)(inputDir, { depthLimit: 0 })) {
        let csvData;
        if (file.path.endsWith(".xlsx")) {
            const excelPath = file.path;
            try {
                csvData = await (0, excel2csv_1.excel2csv)(excelPath);
            }
            catch (err) {
                if (err instanceof Error) {
                    if (err.message === "FILE_ENDED") {
                        throw new error_1.default("fileEnded", excelPath);
                    }
                }
                throw new error_1.default("excelToJson", excelPath);
            }
        }
        else if (file.path.endsWith(".csv")) {
            csvData = await (0, promises_1.readFile)(file.path, 'utf-8');
        }
        else if (file.path.endsWith(".geojson")) {
            // TODO: GeoJSON を data.json 形式に変換する
            // geojson の場合は 拡張子を json にしてoutputDir にコピーする
            promises.push((0, promises_1.copyFile)(file.path, path_1.default.resolve(outputDir, 'data.json')));
            // 1ファイルのみを対象にするために break する
            break;
        }
        if (csvData) {
            try {
                papaparse_1.default.parse(csvData, {
                    skipEmptyLines: true,
                    quoteChar: '"',
                    transform: (value) => {
                        // 空の値の場合は空白に置き換える
                        if (value === '') {
                            return '';
                        }
                        // 数値の場合は文字列に変換
                        if (!isNaN(parseFloat(value))) {
                            return value.toString();
                        }
                        // それ以外の場合は元の値をそのまま使用
                        return value;
                    },
                    complete: async (results) => {
                        await (0, promises_1.writeFile)(path_1.default.resolve(outputDir, 'data.json'), JSON.stringify(results.data));
                    }
                });
            }
            catch (err) {
                throw new error_1.default("csvToGeoJson", file.path);
            }
            // 1ファイルのみを対象にするために break する
            break;
        }
    }
    await Promise.all(promises);
};
const excelToJson = async (inputDir, outputDir) => {
    try {
        await _excelToJson(inputDir, outputDir);
    }
    catch (err) {
        if (err instanceof error_1.default) {
            switch (err.conversionType) {
                case "excelToJson":
                    throw new Error(`Error: Excel ファイルを ${err.filePath} GeoJSON に変換できませんでした。`);
                    break;
                case "fileEnded":
                    throw new Error(`Error: データが空になっているか、Excel ファイルが破損している可能性があります。`);
                    break;
                case "csvToGeoJson":
                    throw new Error(`Error: CSV データ ${err.filePath} を GeoJSON に変換できませんでした。`);
                    break;
                default:
                    throw new Error(err.message);
            }
        }
        else {
            throw new Error(err.message);
        }
    }
};
exports.excelToJson = excelToJson;
