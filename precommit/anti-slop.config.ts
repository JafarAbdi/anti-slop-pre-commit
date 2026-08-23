// Config for the `anti-slop` hook. The plugin comes from the upstream
// `oxlint-plugin-anti-slop` dependency — nothing is vendored here.
import { createRequire } from "node:module";
import { defineConfig } from "oxlint";

const require = createRequire(import.meta.url);

export default defineConfig({
	// oxlint enables `correctness` as warnings by default; turn it off so this
	// hook reports anti-slop and nothing else (the `oxlint` hook covers the rest).
	categories: { correctness: "off" },
	jsPlugins: [
		{ name: "anti-slop", specifier: require.resolve("oxlint-plugin-anti-slop") },
	],
	rules: {
		"anti-slop/no-chained-type-assertions": "error",
		"anti-slop/no-conditional-empty-object-spread": "error",
		"anti-slop/no-known-value-widening": "error",
		"anti-slop/no-module-mocking": "error",
		"anti-slop/no-object-parameters": "error",
		"anti-slop/no-reflect-apply": "error",
		"anti-slop/no-reflect-get": "error",
		"anti-slop/no-runtime-typeof": "error",
		"anti-slop/no-shape-in-symbol-names": "error",
		"anti-slop/no-unknown-parameters": "error",
		"anti-slop/no-unknown-returns": "error",
		"anti-slop/no-unknown-type-aliases": "error",
		"anti-slop/no-unsafe-dictionary-type": "error",
		"anti-slop/no-widen-then-assert": "error",
		"anti-slop/require-safety-comment-for-type-assertion": "error",
	},
});
