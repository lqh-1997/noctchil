module.exports = {
    // https://eslint.bootcss.com/docs/user-guide/configuring#specifying-parser-options
    parserOptions: {
        // ECMAScript版本
        ecmaVersion: 2020,
        // ECMAScript模块
        sourceType: 'module',
        // 想使用的额外语言特性
        ecmaFeatures: {
            impliedStrict: true,
            jsx: true
        }
    },
    // 配置解析器
    parser: '@typescript-eslint/parser'
};
