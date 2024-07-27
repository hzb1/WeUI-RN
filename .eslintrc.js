// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ["expo", "prettier", "universe"],
  // extends: ["universe"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "warn",
  },
};
