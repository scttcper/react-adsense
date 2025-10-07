import { defineBuildConfig } from 'obuild/config';

export default defineBuildConfig({
  entries: [
    {
      type: 'bundle',
      input: ['./src/index.ts'],
      minify: false,
      stub: false,
      rolldown: {
        external: ['react', 'react/jsx-runtime'],
      },
      dts: true,
    },
  ],
}) as unknown;
