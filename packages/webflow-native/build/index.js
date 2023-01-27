/* eslint-disable no-console */
import { exec } from 'child_process';
import * as esbuild from 'esbuild';

// Create context
await esbuild.build({
  bundle: true,
  entryPoints: ['src/index.ts'],
  outdir: 'dist',
  format: 'esm',
  target: 'esnext',
});

exec(`tsc --emitDeclarationOnly --declaration`);
