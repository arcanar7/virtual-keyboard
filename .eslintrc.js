module.exports = {
  env: {
    browser: true,
    node: true,
  },
  extends: ['eslint-config-airbnb-base'],
  rules: {
    'linebreak-style': ['error', 'windows'],
    quotes: ['error', 'single', { allowTemplateLiterals: true }],
    semi: ['error', 'never'],
    'no-console': 'off',
    'no-use-before-define': ['error', { functions: false, variables: false }],
    'operator-linebreak': [2, 'before'],
    'arrow-parens': [2, 'as-needed'],
    'no-restricted-syntax': ['error', 'WithStatement', "BinaryExpression[operator='in']"],
    'no-unused-expressions': [2, { allowTernary: true }],
    'import/extensions': [2, 'ignorePackages', { js: 'always' }],
    'object-curly-newline': ['error', { multiline: true }],
  },
}
