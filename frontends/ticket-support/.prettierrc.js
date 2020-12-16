module.exports = {
  semi: false,
  singleQuote: true,
  printWidth: 100,
  trailingComma: 'es5',
  tabWidth: 2,
  arrowParens: 'avoid',
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
      options: {
        parser: 'typescript',
      },
    },
  ],
}
