module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: 'airbnb-base',
    overrides: [
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    rules: {
        camelcase: 'off',
        'max-len': 'off',
        'no-console': 'off',
        indent: ['error', 4],
        'eslint/indent': 'off',
        'no-unused-vars': 'off',
        'linebreak-style': 'off',
        'no-await-in-loop': 'off',
        'import/extensions': 'off',
        'no-param-reassign': 'off',
        'no-restricted-syntax': 'off',
        'newline-per-chained-call': 'off',
        'import/no-extraneous-dependencies': 'off',
    },
};
