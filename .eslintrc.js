module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  parser: '@babel/eslint-parser',
  extends: [
    'prettier',
    'plugin:node/recommended',
    'eslint:recommended',
    'airbnb-base',
    'plugin:prettier/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'no-console': 'warn',
    'no-unused-vars': 'warn',
    'func-names': 'off',
    'no-process-exit': 'off',
  },
}
