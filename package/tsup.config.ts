import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['./src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  target: 'esnext',
  splitting: false,
  sourcemap: true,
  clean: true,
  tsconfig: './tsconfig.json',
  external: ['react']
});
