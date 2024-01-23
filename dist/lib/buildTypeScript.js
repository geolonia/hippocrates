"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildTypeScript = void 0;
const execPromise_1 = require("./execPromise");
const defaultValues_1 = require("./defaultValues");
const buildTypeScript = async (env) => {
    try {
        await (0, execPromise_1.execPromise)(`cd ${defaultValues_1.defaultValues.providerDir} && react-scripts build`, { env });
    }
    catch (error) {
        console.error(`実行エラー: ${error}`);
    }
};
exports.buildTypeScript = buildTypeScript;
