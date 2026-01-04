import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

const config = tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.stylistic,
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    languageOptions: {
      globals: globals.node
    },
    rules: {
      "no-console": "off",
      "no-debugger": "error",
      "@typescript-eslint/no-unused-vars": ["warn", {
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_"
      }],
      "no-unused-expressions": "error",
      "no-unused-labels": "error",
      "@typescript-eslint/no-explicit-any": "warn",
      // no more than 1 empty line
      "no-multiple-empty-lines": ["error", { "max": 1 }],
      // no empty spaces at the end of the line
      "no-trailing-spaces": "error",
      // last line of the file should be empty
      "eol-last": ["error", "always"],
    }
  },
);

export default config;
