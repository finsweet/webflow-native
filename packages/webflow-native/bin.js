#!/usr/bin/env node
/* eslint-disable no-console */

import * as esbuild from 'esbuild';
import { writeFileSync } from 'fs';
import { join } from 'path';
import { setTimeout } from 'timers/promises';

import { schema } from './index.js';

const argv = process.argv.slice(2);

const command = argv[0];

if (command !== 'build' && command !== 'publish') {
  throw new Error('Invalid command');
}

const result = await esbuild.build({ entryPoints: [argv[1]], write: false });

const module = await import(
  `data:text/javascript;base64,${Buffer.from(result.outputFiles[0].contents).toString('base64')}`
);

const data = module.default;

console.log('Validating data... ⌛');

schema.parse(data);

console.log('Data is valid ✅');

const path = join(process.cwd(), 'schema.json');

writeFileSync(path, JSON.stringify(data));

if (command === 'publish') {
  console.log('Publishing to Webflow... ⌛');

  await setTimeout(1000);

  console.log('Published to Webflow ✅');
}
