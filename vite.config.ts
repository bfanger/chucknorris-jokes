import { defineConfig, lazyPlugins } from "vite-plus";
import { devtools } from "@tanstack/devtools-vite";
import { existsSync } from "fs";
import { nitro } from "nitro/vite";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";

const inDocker = existsSync("/.dockerenv"),
  config = defineConfig({
    fmt: {
      ignorePatterns: ["src/routeTree.gen.ts"],
      sortTailwindcss: { config: "src/styles.css" },
    },
    lint: {
      categories: { style: "warn" },
      ignorePatterns: ["src/routeTree.gen.ts"],
      jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
      options: { typeAware: true, typeCheck: true },
      rules: {
        "func-style": "off",
        "no-magic-numbers": "off",
        "no-ternary": "off",
        "one-var": "off",
        "vite-plus/prefer-vite-plus-imports": "error",
      },
    },
    plugins: lazyPlugins(() => [
      ...(inDocker || process.env.VITEST ? [] : [devtools()]),
      ...(process.env.VITEST ? [] : [nitro(), tanstackStart()]),
      tailwindcss(),
      viteReact(),
    ]),
    resolve: { tsconfigPaths: true },
    server: inDocker
      ? { host: true, port: 5173, watch: { interval: 1000, usePolling: true } }
      : undefined,
    staged: {
      "*": "vp check --fix",
    },
    test: {
      exclude: ["playwright/**", "node_modules/**"],
    },
  });

export default config;
