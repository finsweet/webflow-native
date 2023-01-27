/* eslint-disable no-console */
import * as esbuild from 'esbuild';

// Create context
const context = await esbuild.context({
  bundle: true,
  entryPoints: ['src/index.ts', 'src/bin.ts'],
  outdir: 'dist',
  target: 'esnext',
});

await context.rebuild();
context.dispose();
