#!/usr/bin/env node
/* eslint-disable no-console */

import * as esbuild from 'esbuild';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import sade from 'sade';
import { setTimeout } from 'timers/promises';

import { schema } from './dist/index.js';

const prog = sade('webflow-native');

prog
  .command('build <src>')
  .describe('Validates a schema and builds it. Expects an entry file with a default export.')
  .action(validate_and_build);

prog
  .command('publish <src>')
  .describe(
    'Validates a schema, builds it and publishes it to Webflow. Expects an entry file with a default export.'
  )
  .action(async (src) => {
    const pkg = JSON.parse(readFileSync(join(process.cwd(), 'package.json'), 'utf-8'));

    await validate_and_build(src);
    await publish(pkg.version);
  });

prog.parse(process.argv);

/**
 * Extracts the default export from the source, validates it using zod and writes it into a `schema.json` file.
 * @param {string} src
 */
async function validate_and_build(src) {
  const result = await esbuild.build({ entryPoints: [src], write: false });

  const module = await import(
    `data:text/javascript;base64,${Buffer.from(result.outputFiles[0].contents).toString('base64')}`
  );

  const data = module.default;

  console.log('Validating data... ⌛');

  schema.parse(data);

  console.log('Data is valid ✅');

  const path = join(process.cwd(), 'schema.json');

  writeFileSync(path, JSON.stringify(data));
}

/**
 * Mocks a publish action to Webflow.
 * @param {string} version
 */
async function publish(version) {
  console.log('Publishing to Webflow... ⌛');

  await setTimeout(1000);

  console.log(`Published schema v${version} to Webflow ✅`);
}
