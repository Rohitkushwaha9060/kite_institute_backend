import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
    { languageOptions: { globals: globals.node } },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    {
        parser: '@typescript-eslint/parser',
        extends: [
            'plugin:@typescript-eslint/recommended',
            'eslint-config-airbnb-base',
            'plugin:prettier/recommended',
            'plugin:@typescript-eslint/recommended-requiring-type-checking',
        ],
        parserOptions: {
            project: './tsconfig.json',
            tsconfigRootDir: './',
        },
        settings: {
            'import/resolver': {
                typescript: {
                    alwaysTryTypes: true,
                },
            },
            'import/parsers': {
                '@typescript-eslint/parser': ['.ts'],
            },
        },
    },
];
