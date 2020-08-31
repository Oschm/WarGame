module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'func-names': 'off',
    'object-shorthand': 'off',
    indent: 'off',
    'linebreak-style': 'off',
    'import/extensions': 'off',
    'class-methods-use-this': 'off',
    'no-param-reassign': 'off',
    'space-in-parens': 'off',
    'global-require': 'off',
    'no-undef': 'off',
    'max-len': 'off'
  },
};
