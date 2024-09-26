import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser, // Includes browser globals
        ...globals.node    // Includes Node.js globals like `process`
      },
    },
  },
  pluginJs.configs.recommended,
];
