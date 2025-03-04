import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";

export default defineConfig({
	test: {
		workspace: [
			{
				extends: true,
				test: {
					include: ["**/tests/**/*.browser.test.ts"],
					name: "happy-dom",
					environment: "happy-dom",
				},
				plugins: [react(), tsconfigPaths()],
			},
			{
				extends: true,
				test: {
					include: ["**/tests/**/*.node.test.ts"],
					name: "node",
					environment: "node",
				},
				plugins: [react(), tsconfigPaths()],
			},
		],
	},
});
