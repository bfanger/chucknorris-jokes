import { defineConfig } from "@playwright/test";

export default defineConfig({
  fullyParallel: true,
  testDir: "playwright",
  use: {
    baseURL: "http://localhost:5173",
  },
  webServer: {
    command: "vp build && vp preview --port 5173",
    port: 5173,
    reuseExistingServer: true,
  },
});
