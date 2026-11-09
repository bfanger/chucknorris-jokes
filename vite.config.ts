import { existsSync } from "node:fs";
import { defineConfig, lazyPlugins } from "vite-plus";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";

const inDocker = existsSync("/.dockerenv");

const config = defineConfig({
  staged: {
    "*": "vp check --fix",
  },
  fmt: {
    ignorePatterns: ["src/routeTree.gen.ts"],
  },
  lint: {
    ignorePatterns: ["src/routeTree.gen.ts"],
    jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
    rules: { "vite-plus/prefer-vite-plus-imports": "error" },
    options: { typeAware: true, typeCheck: true },
  },
  resolve: { tsconfigPaths: true },
  plugins: lazyPlugins(() => [
    ...(inDocker || process.env.VITEST ? [] : [devtools()]),
    ...(process.env.VITEST ? [] : [nitro(), tanstackStart()]),
    tailwindcss(),
    viteReact(),
  ]),
  server: inDocker
    ? { host: true, port: 5173, watch: { usePolling: true, interval: 1000 } }
    : undefined,
});

export default config;
