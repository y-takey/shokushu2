import { defineConfig, globalIgnores } from "eslint/config";
import promise from "eslint-plugin-promise";
import react from "eslint-plugin-react";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const compat = new FlatCompat({
  baseDirectory: dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  globalIgnores([
    "**/logs",
    "**/*.log",
    "**/pids",
    "**/*.pid",
    "**/*.seed",
    "**/lib-cov",
    "**/coverage",
    "**/.grunt",
    "**/.lock-wscript",
    "build/Release",
    "**/.eslintcache",
    "**/node_modules",
    "**/.DS_Store",
    "flow-typed/npm/*",
    "!flow-typed/npm/module_vx.x.x.js",
    "**/release",
    "app/main.prod.js",
    "app/main.prod.js.map",
    "app/renderer.prod.js",
    "app/renderer.prod.js.map",
    "app/style.css",
    "app/style.css.map",
    "**/dist",
    "**/dll",
    "**/main.js",
    "**/main.js.map",
    "**/.idea",
    "**/npm-debug.log.*",
    "**/__snapshots__",
    "**/package.json",
    "**/.travis.yml",
  ]),
  {
    extends: compat.extends(
      "airbnb",
      "prettier",
      "plugin:@typescript-eslint/recommended",
      "plugin:@typescript-eslint/eslint-recommended",
      "plugin:import/recommended"
    ),

    plugins: { promise, react, "@typescript-eslint": typescriptEslint },

    languageOptions: {
      globals: { ...globals.browser, ...globals.node },

      parser: tsParser,
      ecmaVersion: 5,
      sourceType: "module",
    },

    settings: {
      "import/extensions": [".js", ".jsx", ".ts", ".tsx"],

      "import/resolver": {
        node: { extensions: [".js", ".jsx", ".ts", ".tsx"] },

        webpack: { config: "webpack.config.ts" },
      },
    },

    rules: {
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "arrow-parens": ["off"],
      "consistent-return": "off",
      "comma-dangle": "off",
      "generator-star-spacing": "off",
      "import/no-unresolved": "error",
      "import/no-extraneous-dependencies": "off",
      "import/extensions": "off",
      "jsx-a11y/anchor-is-valid": "off",
      "jsx-a11y/media-has-caption": "off",

      "max-len": [
        "error",
        { code: 120, ignoreComments: true, ignoreUrls: true, ignoreStrings: true, ignoreTemplateLiterals: true },
      ],

      "no-console": "off",

      "no-unused-expressions": ["error", { allowTernary: true }],

      "no-use-before-define": "off",
      "no-multi-assign": "off",
      "promise/param-names": "error",
      "promise/always-return": "error",
      "promise/catch-or-return": "error",
      "promise/no-native": "off",
      "react/destructuring-assignment": "off",

      "react/function-component-definition": [
        "error",
        { namedComponents: "arrow-function", unnamedComponents: "arrow-function" },
      ],

      "react/jsx-props-no-spreading": "off",
      "react/no-array-index-key": "off",
      "react/prop-types": "off",
      "react/require-default-props": "off",

      "react/sort-comp": [
        "error",
        { order: ["type-annotations", "static-methods", "lifecycle", "everything-else", "render"] },
      ],

      "react/jsx-no-bind": "off",

      "react/jsx-filename-extension": ["error", { extensions: [".js", ".ts", ".jsx", ".tsx"] }],

      "react/prefer-stateless-function": "off",
    },
  },
]);
