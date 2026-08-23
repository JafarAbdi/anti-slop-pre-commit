#!/usr/bin/env node
// Runs oxlint for the pre-commit hooks with a bundled config. The --effect flag
// is stripped from argv; everything else is forwarded to oxlint verbatim.
import { createRequire } from "node:module";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { existsSync } from "node:fs";

const require = createRequire(import.meta.url);

const args = process.argv.slice(2);
const useEffect = args.includes("--effect");
const forwarded = args.filter((arg) => arg !== "--effect");

if (forwarded.length === 0) {
	process.exit(0);
}

const configName = useEffect ? "anti-slop-effect.config.ts" : "anti-slop.config.ts";
const configPath = fileURLToPath(new URL(`../precommit/${configName}`, import.meta.url));
if (!existsSync(configPath)) {
	console.error(`anti-slop pre-commit: bundled config not found at ${configPath}`);
	process.exit(1);
}

// Resolve from our deps, never PATH — a stray global oxlint could differ.
let oxlintBin;
try {
	const oxlintPkg = require.resolve("oxlint/package.json");
	oxlintBin = join(dirname(oxlintPkg), "bin", "oxlint");
} catch (error) {
	console.error(`anti-slop pre-commit: could not resolve the 'oxlint' dependency: ${error.message}`);
	process.exit(1);
}
if (!existsSync(oxlintBin)) {
	console.error(`anti-slop pre-commit: oxlint launcher not found at ${oxlintBin}`);
	process.exit(1);
}

// Our config and plugin are `.ts` under node_modules, where Node refuses to
// strip types; tsx's loader handles them.
let tsxLoader;
try {
	tsxLoader = require.resolve("tsx");
} catch (error) {
	console.error(`anti-slop pre-commit: could not resolve the 'tsx' dependency: ${error.message}`);
	process.exit(1);
}

const child = spawn(
	process.execPath,
	["--import", tsxLoader, oxlintBin, "--config", configPath, ...forwarded],
	{ stdio: "inherit" },
);
child.on("error", (error) => {
	console.error(`anti-slop pre-commit: failed to launch oxlint: ${error.message}`);
	process.exit(1);
});
child.on("exit", (code, signal) => {
	if (signal) {
		process.exit(1);
	}
	process.exit(code ?? 1);
});
