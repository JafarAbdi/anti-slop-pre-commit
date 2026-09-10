// Config for the `anti-slop` hook. The plugin comes from the upstream
// `oxlint-plugin-anti-slop` dependency — nothing is vendored here.
import { createRequire } from "node:module";
import { defineConfig } from "oxlint";

const require = createRequire(import.meta.url);

export default defineConfig({
	// oxlint enables `correctness` as warnings by default; turn it off so this
	// hook reports only the anti-slop rule set (the `oxlint` hook covers the rest).
	categories: { correctness: "off" },
	jsPlugins: [
		{ name: "anti-slop", specifier: require.resolve("oxlint-plugin-anti-slop") },
	],
	rules: {
		// Native complement of `no-reduce-accumulator-copy`; upstream's recommended
		// config enables it alongside the plugin.
		"oxc/no-accumulating-spread": "error",
		"anti-slop/no-array-filter-map": "error",
		"anti-slop/no-chained-type-assertions": "error",
		"anti-slop/no-conditional-empty-object-spread": "error",
		"anti-slop/no-known-value-widening": "error",
		"anti-slop/no-module-mocking": "error",
		"anti-slop/no-object-parameters": "error",
		"anti-slop/no-reduce-accumulator-copy": "error",
		"anti-slop/no-reflect-apply": "error",
		"anti-slop/no-reflect-get": "error",
		"anti-slop/no-runtime-typeof": "error",
		"anti-slop/no-shape-in-symbol-names": "error",
		"anti-slop/no-unknown-parameters": "error",
		"anti-slop/no-unknown-returns": "error",
		"anti-slop/no-unknown-type-aliases": "error",
		"anti-slop/no-unsafe-dictionary-type": "error",
		"anti-slop/no-widen-then-assert": "error",
		"anti-slop/require-readable-spacing": "error",
		"anti-slop/require-safety-comment-for-type-assertion": "error",
	},
});
