"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultValues = void 0;
const path_1 = __importDefault(require("path"));
exports.defaultValues = {
    providerDir: path_1.default.join(path_1.default.dirname(path_1.default.dirname(__dirname)), 'provider'),
    buildDir: path_1.default.join(process.cwd(), 'build'),
};
