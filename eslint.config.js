module.exports = [
  {
    files: ["src/**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "script",
      globals: {
        window: "readonly",
        document: "readonly",
        console: "readonly",
        Math: "readonly",
        requestAnimationFrame: "readonly",
        EVENTS_DATA: "readonly",
      },
    },
    rules: {
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "no-undef": "error",
    },
  },
  {
    files: ["src/web/data.js"],
    rules: {
      "no-unused-vars": "off",
    },
  },
];
