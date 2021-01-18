const purgecss = require('@fullhuman/postcss-purgecss')({
  content: [
    './demo/**/*.html',
    './demo/**/*.jsx',
    './demo/**/*.tsx',
  ],
  defaultExtractor: content => {
    // Capture as liberally as possible, including things like `h-(screen-1.5)`
    const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [];
    return broadMatches
  },
});

module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    ...process.env.NODE_ENV === 'production' ?
      [purgecss] :
      [],
    ...process.env.NODE_ENV === 'production' ?
      [require('cssnano')] :
      [],
  ],
};
