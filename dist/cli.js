#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const build_1 = require("./commands/build");
const start_1 = require("./commands/start");
const program = new commander_1.Command();
program
    .command('build [source] [destination]')
    .description('build a csv/excel file to geojson, and prepare application files')
    .action(build_1.build);
program
    .command('start [source]')
    .description('serve the application')
    .action(start_1.start);
program.parse(process.argv);
