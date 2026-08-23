// Config for the opt-in `anti-slop-effect` hook.
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { defineConfig } from "oxlint";

const require = createRequire(import.meta.url);
// The Effect entry isn't in the package's `exports`, so resolve it via the
// install dir of the exported main rather than by package specifier.
const srcDir = dirname(require.resolve("oxlint-plugin-anti-slop"));
const effectEntry = join(srcDir, "effect", "index.ts");

export default defineConfig({
	jsPlugins: [{ name: "anti-slop-effect", specifier: effectEntry }],
	rules: {
		"anti-slop-effect/no-service-constructor-imports": "error",
	},
});
