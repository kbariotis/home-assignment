import { baseConfig } from "eslint-config-custom";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  ...baseConfig,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
  },
  {
    ignores: ["dist/**", "node_modules/**"],
  }
);
