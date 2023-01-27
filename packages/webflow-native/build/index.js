/* eslint-disable no-console */
import * as esbuild from 'esbuild';

// Create context
await esbuild.build({
  bundle: true,
  entryPoints: ['src/index.ts'],
  outdir: '.',
  format: 'esm',
  target: 'esnext',
});
