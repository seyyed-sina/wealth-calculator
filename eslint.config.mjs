import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import nextEslintPluginNext from "@next/eslint-plugin-next";
import reactHooks from "eslint-plugin-react-hooks";
import sonarjs from "eslint-plugin-sonarjs";
import _import from "eslint-plugin-import";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [
  ...fixupConfigRules(
    compat.extends(
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:@typescript-eslint/recommended-type-checked',
      'next/typescript',
      'plugin:sonarjs/recommended-legacy',
      'plugin:import/recommended',
      'plugin:import/typescript',
      'prettier',
    ),
  ),
  {
    plugins: {
      '@typescript-eslint': fixupPluginRules(typescriptEslint),
      '@next/next': nextEslintPluginNext,
      'react-hooks': fixupPluginRules(reactHooks),
      sonarjs: fixupPluginRules(sonarjs),
      import: fixupPluginRules(_import),
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },

      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
          js: true,
          globalReturn: false,
        },

        requireConfigFile: false,
        project: './tsconfig.json',
      },
    },

    settings: {
      'import/resolver': {
        typescript: true,
        node: true,
      },
    },

    rules: {
      'no-useless-escape': 'warn',
      'prefer-const': 'error',
      'import/no-unresolved': 'error',
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'react/require-default-props': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-empty-interface': 'warn',
      '@typescript-eslint/no-empty-object-type': 'warn',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unsafe-call': 'warn',
      '@typescript-eslint/no-non-null-asserted-optional-chain': 'warn',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/no-namespace': 'off',
      'no-octal-escape': 0,

      'sonarjs/no-duplicate-string': [
        'warn',
        {
          threshold: 5,
        },
      ],

      'sonarjs/unused-import': 'warn',
      'sonarjs/no-commented-code': 'off',
      'sonarjs/new-cap': 'off',
      'sonarjs/jsx-no-useless-fragment': 'warn',
      'sonarjs/no-array-index-key': 'warn',
      'sonarjs/pseudo-random': 'warn',
      'sonarjs/prefer-nullish-coalescing': 'warn',
      'sonarjs/cognitive-complexity': ['warn', 20],
      'sonarjs/no-misused-promises': 'off',
      'sonarjs/sonar-no-unused-vars': 'warn',
      'sonarjs/no-dead-store': 'warn',

      'import/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'internal'],

          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before',
            },
          ],

          pathGroupsExcludedImportTypes: ['react'],
          'newlines-between': 'always',

          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
  },
];