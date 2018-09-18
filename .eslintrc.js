module.exports = {
    env: {
        browser: true,
        es6: true
    },
    extends: 'eslint:recommended',
    parser: 'babel-eslint',
    parserOptions: {
        ecmaFeatures: {
            experimentalObjectRestSpread: true,
            jsx: true
        },
        sourceType: 'module'
    },
    plugins: ['react'],
    rules: {
        'no-console': 0,
        'no-unused-vars': 'off',
        'no-use-before-define': 'error',

        'react/no-unused-state': 'warn',
        'react/no-unused-prop-types': 'warn',
        'react/prefer-es6-class': ['warn', 'always'],
        'react/react-in-jsx-scope': 'off',
        'react/jsx-no-bind': 'off',
        'react/jsx-uses-vars': 'warn',
        'react/jsx-key': 'warn',
        'react/jsx-no-duplicate-props': 'warn',
        indent: ['error', 4],
        'linebreak-style': ['error', 'unix'],
        quotes: ['error', 'single'],
        semi: ['error', 'never']
    }
}
