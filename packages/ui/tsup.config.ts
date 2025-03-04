import { defineConfig } from "tsup";
import { exec } from "child_process";
import { sassPlugin } from "esbuild-sass-plugin";

export default defineConfig((options) => ({
	entry: [
		"src/index.ts",
		// "src/components/siteBackground/cssParticles/Particles.module.scss",
		// "src/components/card/index.tsx",
		// "src/components/card/cardContent/index.tsx",
		// "src/components/card/cardPage/index.tsx",
		// "src/components/siteBackground/index.tsx",
	], // Where your source code lives (can provide multiple entries)
	splitting: false,
	treeshake: true,
	// clean: true,
	outDir: "dist", // Where you want your compiled files to live
	esbuildPlugins: [sassPlugin()],
	onSuccess: async () => {
		exec("tsc --emitDeclarationOnly");
	},
	...options,
}));
