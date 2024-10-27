import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['./src/lib/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  target: 'esnext',
  splitting: false,
  sourcemap: true,
  clean: true,
  tsconfig: './tsconfig.build.json',
  external: ['react']
});
