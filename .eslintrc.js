module.exports = {
  root: true,
  env: {
    browser: true,
    jest: true,
  },
  extends: ['xo-space/esnext', "xo-react/space", 'xo-typescript'],
  rules: {
    'object-curly-spacing': ['error', 'always'],
    '@typescript-eslint/indent': ['error', 2, { SwitchCase: 1 }],
    'comma-dangle': ['error', 'always-multiline'],
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-unsafe-member-access': 0,
    '@typescript-eslint/no-unsafe-call': 0,
    '@typescript-eslint/no-unsafe-return': 0,
    '@typescript-eslint/no-floating-promises': 0,
  },
};
