module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    indent: 'off',
    'react/jsx-indent': 'off',
    'react/jsx-indent-props': 'off',
    semi: ['error', 'never'],
    'react/prop-types': 'off',
    'max-len': ['error', { code: 125 }],
    'no-use-before-define': ['error', { variables: false }],
    'comma-dangle': ['error', 'always-multiline'],
    'jsx-quotes': [2, 'prefer-double'],
    'no-shadow': 'off',
    'no-console': 'off',
    'no-unused-vars': 'off',
    'react/jsx-props-no-spreading': 'off',
    'no-nested-ternary': 'off',
    'no-underscore-dangle': 'off',
    'no-sequences': 'off',

  },
}