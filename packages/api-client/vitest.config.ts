import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    exclude: ["**/*.e2e.test.ts"],
    coverage: {
      enabled: true,
      reportOnFailure: true,
      include: ["src"],
      exclude: [
        "**/*.test.ts",
        "**/*.test-d.ts",
        "**/*.bench.ts",
        "**/*/playground.ts",
      ],
      thresholds: {
        "100": true,
      },
    },
  },
});
