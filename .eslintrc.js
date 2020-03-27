module.exports = {
  env: {
    browser: true,
  },
  extends: ['eslint-config-airbnb-base'],
  rules: {
    // indent: ['error', 2, { SwitchCase: 1, MemberExpression: 'off' }],
    'linebreak-style': ['error', 'windows'],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'no-console': 'off',
    'no-use-before-define': ['error', { functions: false, variables: false }],
    'operator-linebreak': [2, 'after'],
    'arrow-parens': [2, 'as-needed'],
    'no-restricted-syntax': ['error', 'WithStatement', "BinaryExpression[operator='in']"],
    'no-unused-expressions': [2, { allowTernary: true }],
  },
}
