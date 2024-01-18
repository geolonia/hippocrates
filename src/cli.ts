#!/usr/bin/env node

import { Command } from 'commander';

import { build } from './commands/build'

const program = new Command();

program
  .command('build [source] [destination]')
  .description('build a csv/excel file to geojson, and prepare application files')
  .action(build);

program.parse(process.argv)
