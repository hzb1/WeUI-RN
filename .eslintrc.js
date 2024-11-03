// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ["expo", "prettier", "universe"],
  // extends: ["universe"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "warn",
    'import/no-unresolved': 'off',
    "max-len": ["warn", { "code": 200 }],
    "no-mixed-operators": "off",
    "operator-linebreak": ["error", "before"]
  },
};
