#!/usr/bin/env node

import { Command } from 'commander';

import { build } from './commands/build'
import { start } from './commands/start'

const program = new Command();

program
  .command('build [source] [destination]')
  .description('build a csv/excel file to geojson, and prepare application files')
  .action(build);

program
  .command('start [source]')
  .description('serve the application')
  .action(start);

program.parse(process.argv)
