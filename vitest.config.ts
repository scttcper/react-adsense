import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    threads: false,
    environment: 'happy-dom',
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
  },
});
