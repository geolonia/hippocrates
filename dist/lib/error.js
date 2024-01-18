"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ConversionError extends Error {
    constructor(type, filePath) {
        super();
        this.conversionType = type;
        this.filePath = filePath;
    }
}
exports.default = ConversionError;
