module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off'
  },
  /*Le dice a Prettier que ajuste automáticamente los finales de línea según el entorno en el que se esté ejecutando. 
  Esto es útil para evitar problemas de incompatibilidad de finales de línea entre diferentes sistemas operativos 
  (por ejemplo, Windows usa `CRLF` mientras que Unix/Linux usa `LF`).*/
  "prettier/prettier": [
    "error",
    {
      "endOfLine": "auto"
    }
  ]
};
