"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.excelToGeojson = void 0;
const excel2csv_1 = require("./excel2csv");
const promises_1 = require("fs/promises");
const klaw_1 = __importDefault(require("klaw"));
//@ts-ignore
const csv2geojson_1 = __importDefault(require("csv2geojson"));
const error_1 = __importDefault(require("./error"));
const path_1 = __importDefault(require("path"));
const defaultValues_1 = require("./defaultValues");
const _excelToGeojson = async (inputDir) => {
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
                throw new error_1.default("excelToGeojson", excelPath);
            }
        }
        else if (file.path.endsWith(".csv")) {
            csvData = await (0, promises_1.readFile)(file.path, 'utf-8');
        }
        else if (file.path.endsWith(".geojson")) {
            // TODO: GeoJSON を data.geojson 形式に変換する
            // geojson の場合は 拡張子を json にしてdefaultValues.providerDir にコピーする
            promises.push((0, promises_1.copyFile)(file.path, path_1.default.resolve(defaultValues_1.defaultValues.providerDir, 'public', 'data.geojson')));
            // 1ファイルのみを対象にするために break する
            break;
        }
        if (csvData) {
            try {
                let options = {
                    delimiter: ','
                };
                const headers = csvData.split(/\r?\n|\r/)[0];
                if (headers.includes('緯度') && headers.includes('経度')) {
                    options.latfield = '緯度';
                    options.lonfield = '経度';
                }
                csv2geojson_1.default.csv2geojson(csvData, options, async (_err, geojson) => {
                    await (0, promises_1.writeFile)(path_1.default.resolve(defaultValues_1.defaultValues.providerDir, 'public', 'data.geojson'), JSON.stringify(geojson));
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
const excelToGeojson = async (inputDir) => {
    try {
        await _excelToGeojson(inputDir);
    }
    catch (err) {
        if (err instanceof error_1.default) {
            switch (err.conversionType) {
                case "excelToGeojson":
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
exports.excelToGeojson = excelToGeojson;
