// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    demo: { url: '/', static: false, resolve: true },
    src: { url: '/src', static: false, resolve: true },
  },
  plugins: [['@snowpack/plugin-postcss', { config: './postcss.config.js' }]],
  packageOptions: {
    /* ... */
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    /* ... */
  },
};
