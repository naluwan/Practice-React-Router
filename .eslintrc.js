module.exports = {
  env: {
    browser: true,
  },
  extends: [
    // prettier-ignore
    'airbnb',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@babel/eslint-parser',
  settings: {
    'import/resolver': {
      webpack: {
        config: 'webpack.config.js',
      },
    },
  },
  plugins: ['flowtype'],
  rules: {
    'global-require': 0,
    'import/no-extraneous-dependencies': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/label-has-associated-control': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'no-console': 0,
    'no-param-reassign': ['error', { props: false }],
    'react/button-has-type': 0,
    'react/destructuring-assignment': 0,
    'react/function-component-definition': [
      2,
      { namedComponents: 'arrow-function' },
    ],
    'react/jsx-filename-extension': 0,
    'react/jsx-one-expression-per-line': 0,
    'react/jsx-uses-react': 'off',
    'react/no-access-state-in-setstate': 0,
    'react/prop-types': 0,
    'react/react-in-jsx-scope': 0,
    'react/state-in-constructor': 0,
  },
};
