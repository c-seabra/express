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
        'packages/graphql/src/@types/operations.tsx',
        'packages/graphql/src/@types/fragments.ts',
        'packages/graphql/src/operations.wp/types.tsx',
      ],
      rules: {
        '@typescript-eslint/camelcase': 'off',
        'import/no-duplicates': 'off',
        'jsx-a11y/anchor-is-valid': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'typescript-sort-keys/interface': 'off',
        'tsdoc/syntax': 'off',
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
    'react',
    'react-hooks',
    '@typescript-eslint',
    'eslint-plugin-tsdoc',
    'promise',
    'prettier',
    'react',
    'simple-import-sort',
    'sort-keys-fix',
    'typescript-sort-keys',
    'import',
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': ['warn', { ignoreRestSiblings: true }],

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

    // href is passed down automatically from <Link> into <a> tag
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        aspects: ['invalidHref', 'preferButton'],
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
      },
    ],
    // we should require at least of of nesting and id, but not both same time
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        required: {
          some: ['nesting', 'id'],
        },
      },
    ],
    'jsx-a11y/label-has-for': [
      'error',
      {
        required: {
          some: ['nesting', 'id'],
        },
      },
    ],

    'tsdoc/syntax': 'error',

    // we run prettier anyway extra
    'prettier/prettier': 'off',

    // props should be true here
    'no-param-reassign': ['error', { props: false }],

    // react specific rules
    'react/jsx-filename-extension': ['warn', { extensions: ['.jsx', '.tsx'] }],
    'react/jsx-key': ['error', { checkFragmentShorthand: true }],
    'react/jsx-no-duplicate-props': ['error', { ignoreCase: false }],
    'react/jsx-sort-props': [
      'warn',
      { callbacksLast: true, reservedFirst: true, shorthandFirst: true },
    ],

    'react/static-property-placement': ['error', 'static public field'],
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/rules-of-hooks': 'error',

    // sorting rules
    'simple-import-sort/sort': 'error',
    'sort-keys-fix/sort-keys-fix': ['error', 'asc', { natural: true }],
    'typescript-sort-keys/interface': 2,
    'typescript-sort-keys/string-enum': 2,

    // using simple-import-sort/sort instead
    'sort-imports': 'off',
    'import/order': 'off',

    // disabled but might be nice in the future
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    // better to maintain without but not business critical to fix
    'import/no-cycle': 'off',
    'import/no-named-as-default': 'off',

    // disabled because they make no sense for us
    camelcase: 'off',
    'no-plusplus': 'off',
    'no-alert': 'off',
    'no-console': 'off',
    'no-unused-vars': 'off',
    'import/prefer-default-export': 'off',
    'no-underscore-dangle': 'off',
    'import/no-extraneous-dependencies': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',

    // results in false positives:
    // this triggers for single spa and makes no sense there
    'react/display-name': 'off',
    // this results in false positives in anonymous functions
    // for tables and such, where destructuring makes it worse
    'react/destructuring-assignment': 'off',

    // disabled because prettier controls this
    indent: ['off', 2, { SwitchCase: 1 }],
    quotes: ['off', 'single', { avoidEscape: true }],
    'linebreak-style': ['off', 'unix'],
    'arrow-parens': ['off', 'as-needed'],
    semi: ['off', 'never'],
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
    react: {
      version: 'detect',
    },
  },
};
