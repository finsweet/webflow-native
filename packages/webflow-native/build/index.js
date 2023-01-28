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

await esbuild.build({
  bundle: true,
  entryPoints: ['src/bin.ts'],
  outdir: 'dist',
  platform: 'node',
  format: 'esm',
  external: ['esbuild'],
});

exec(`tsc --emitDeclarationOnly --declaration`);
