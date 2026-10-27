import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: 'src/index.ts',
  format: ['esm', 'cjs'],
  platform: 'neutral',
  target: 'es2022',
  // TypeScript 7 has no classic compiler API for tsc-based declarations
  dts: { generator: 'oxc' },
  // 'use client' sits in the entry module, which rolldown keeps at the top of each output
  checks: { moduleLevelDirective: false },
  // Its only suggestion is engines.node, which doesn't fit a browser component
  publint: { level: 'warning' },
  attw: { level: 'error' },
  failOnWarn: 'ci-only',
});
