module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react-hooks/recommended",
        "plugin:storybook/recommended"
    ],
    ignorePatterns: ["dist", ".eslintrc.cjs"],
    parser: "@typescript-eslint/parser",
    plugins: ["react-refresh"],
    rules: {
        "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
        "react-hooks/exhaustive-deps": "off",
        "@typescript-eslint/no-redeclare": "off",
        "no-labels": "off",
        "@typescript-eslint/no-unused-vars": "off" // remove o erro de variáveis não utilizadas
    },
    overrides: [
        {
            files: ["**/*.stories.*"],
            rules: {
                "import/no-anonymous-default-export": "off"
            }
        }
    ]
};
