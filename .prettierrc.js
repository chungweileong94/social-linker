// Why `.prettierrc.js` instead of `.prettierrc`,
// https://github.com/prettier/prettier-vscode/issues/2259
module.exports = {
  arrowParens: 'always',
  bracketSpacing: false,
  htmlWhitespaceSensitivity: 'css',
  insertPragma: false,
  bracketSameLine: false,
  jsxSingleQuote: false,
  proseWrap: 'preserve',
  quoteProps: 'as-needed',
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
  useTabs: false,
  plugins: [require.resolve('prettier-plugin-tailwindcss')],
};
