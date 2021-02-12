module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:jest/recommended',
    'airbnb',
    'airbnb/hooks',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'plugin:promise/recommended',
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/react',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  overrides: [
    {
      files: [
        'src/@types/operations.tsx',
        'src/@types/fragments.ts',
        'src/operations.wp/types.tsx',
      ],
      rules: {
        '@typescript-eslint/camelcase': 'off',
        'import/no-duplicates': 'off',
        'jsx-a11y/anchor-is-valid': 'off',
        'prettier/prettier': 'off',
        'typescript-sort-keys/interface': 'off',
      },
    },
    {
      files: ['**/*.js'],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
      },
    },
    {
      files: ['test/**/*.ts*', 'stories/**/*.ts*'],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    project: './tsconfig.json',
    sourceType: 'module',
    extraFileExtensions: ['.lock'],
  },
  plugins: [
    'jest',
    'json-format',
    'react',
    'react-hooks',
    '@typescript-eslint',
    'promise',
    'prettier',
    'react',
    'simple-import-sort',
    'sort-keys-fix',
    'typescript-sort-keys',
    'import',
  ],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { ignoreRestSiblings: true }],
    'arrow-parens': [1, 'as-needed'],

    camelcase: 'off',

    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],

    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['test/**/*', 'stories/**/*'] },
    ],

    'import/order': 'off',

    indent: ['error', 2, { SwitchCase: 1 }],
    // href is passed down automatically from <Link> into <a> tag
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        aspects: ['invalidHref', 'preferButton'],
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
      },
    ],
    'linebreak-style': ['error', 'unix'],
    'no-underscore-dangle': 'off',
    'prettier/prettier': 'error',
    quotes: ['error', 'single', { avoidEscape: true }],
    'react/jsx-filename-extension': ['warn', { extensions: ['.jsx', '.tsx'] }],
    'react/jsx-key': ['error', { checkFragmentShorthand: true }],
    'react/jsx-no-duplicate-props': ['error', { ignoreCase: false }],
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-sort-props': [
      'warn',
      { callbacksLast: true, reservedFirst: true, shorthandFirst: true },
    ],
    'react/prop-types': 0,
    'react/require-default-props': 0,
    'react/static-property-placement': ['error', 'static public field'],
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    semi: ['off', 'never'],
    'import/prefer-default-export': 'off',
    'simple-import-sort/sort': 'error',
    'sort-imports': 'off',
    'sort-keys-fix/sort-keys-fix': ['error', 'asc', { natural: true }],
    'typescript-sort-keys/interface': 2,
    'typescript-sort-keys/string-enum': 2,
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
    'json/sort-package-json': 'pro',
    react: {
      version: 'detect',
    },
  },
};
