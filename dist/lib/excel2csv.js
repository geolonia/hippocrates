"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.excel2csv = void 0;
const xlsx_1 = __importDefault(require("xlsx"));
const excel2csv = async (excelPath) => {
    const workbook = xlsx_1.default.readFile(excelPath, { cellNF: true, cellText: true, cellDates: true });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const csv = xlsx_1.default.utils.sheet_to_csv(sheet, { FS: ',', RS: '\r\n', blankrows: false, forceQuotes: true });
    return csv.endsWith("\r\n") || csv.endsWith("\n") ? csv : csv + "\r\n";
};
exports.excel2csv = excel2csv;
