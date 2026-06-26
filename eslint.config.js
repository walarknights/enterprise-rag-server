import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'

const nodeGlobals = {
  ...globals.node,
  Bun: 'readonly'
}

const typeCheckedConfigs = tseslint.configs.recommendedTypeChecked.map(config => ({
  ...config,
  files: ['**/*.ts']
}))

export default tseslint.config(
  {
    ignores: ['dist/**', 'node_modules/**', '.logs/**', 'data/**', 'uploads/**']
  },
  {
    files: ['**/*.js'],
    ...js.configs.recommended,
    languageOptions: {
      ...js.configs.recommended.languageOptions,
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: nodeGlobals
    }
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: process.cwd()
      },
      globals: nodeGlobals
    }
  },
  ...typeCheckedConfigs,
  {
    files: ['**/*.ts'],
    rules: {
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: false }],
      '@typescript-eslint/no-explicit-any': 'off'
    }
  }
)
