// @ts-check
import js from '@eslint/js'
import prettier from 'eslint-plugin-prettier/recommended'
import globals from 'globals'
import ts from 'typescript-eslint'

export default ts.config(
  {ignores: ['coverage/**', 'dist/**', 'types/**']},
  js.configs.recommended,
  ts.configs.recommended,
  prettier,
  {
    files: ['**/*.{js,mjs,ts}'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
        ...globals.es2021,
      },

      ecmaVersion: 2021,
      sourceType: 'module',
    },
  }
)
