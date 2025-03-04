export default {
	extends: ["next", "turbo"],
	ignorePatterns: ["**/.next/**", "**/.eslintrc.json"],
	overrides: [
		{
			files: [
				"next.config.mjs",
				"app/**/{head,layout,loading,page,error,not-found}.tsx",
			],
		},
	],
	root: true,
};
