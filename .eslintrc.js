module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  plugins: ['sonarjs'],
  extends: ['airbnb-base', 'plugin:sonarjs/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    quotes: ['error', 'single', { allowTemplateLiterals: true }],
    'no-use-before-define': ['error', { functions: false, variables: false }],
    'no-restricted-syntax': ['error', 'WithStatement', "BinaryExpression[operator='in']"],
    'import/extensions': [2, 'ignorePackages', { js: 'always' }],
    'object-curly-newline': ['error', { multiline: true }],
  },
};
