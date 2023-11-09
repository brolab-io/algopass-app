module.exports = {
  bracketSpacing: true,
  bracketSameLine: true,
  singleQuote: true,
  jsxSingleQuote: true,
  trailingComma: 'es5',
  semi: false,
  useTabs: false,
  printWidth: 110,
  arrowParens: 'always',
  importOrder: [
    '^react(.*)$', // All react imports first
    '<THIRD_PARTY_MODULES>', // Then node modules
    '^@/(.*)$', // All local files from src which path is aliased to src/
    '^[./]', // Absolute path imports
  ],
  importOrderSeparation: true,
  plugins: ['@trivago/prettier-plugin-sort-imports'],
}
