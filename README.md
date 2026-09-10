# anti-slop-pre-commit

[pre-commit](https://pre-commit.com) / [prek](https://github.com/j178/prek) hooks for the
[anti-slop](https://github.com/dmmulroy/anti-slop) Oxlint rules. Self-contained (bundled oxlint —
no local install, no `npx`); nothing vendored.

## Usage

```yaml
repos:
  - repo: https://github.com/JafarAbdi/anti-slop-pre-commit
    rev: v0.2.0
    hooks:
      - id: anti-slop
      - id: anti-slop-effect # optional; Effect repos only
```

- `anti-slop` — the anti-slop rules plus `oxc/no-accumulating-spread`, which upstream recommends
  alongside them (oxlint's built-in categories are otherwise off). Needs no repo config.
- `anti-slop-effect` — opt-in Effect rules.

For oxlint's own rules, use the official [mirrors-oxlint](https://github.com/oxc-project/mirrors-oxlint)
hook with your `.oxlintrc.json` — these hooks cover the anti-slop plugin only.

## Configuration

A hook's `args:` are forwarded to `oxlint` verbatim (`--max-warnings`, `--deny`, …). Don't pass
`--config`; the hooks bundle their own.

`require-readable-spacing` is autofixable. Pass `args: [--fix]` to let the hook rewrite files
(the commit then fails once, as with any fixing hook, so you can re-stage).

To run your own rules, point the `oxlint-plugin-anti-slop` dependency in `package.json` at your fork
and re-tag.

## Acknowledgements

The rules are [anti-slop](https://github.com/dmmulroy/anti-slop) by Dillon Mulroy; this project only
packages them as pre-commit hooks. Built on [Oxlint](https://oxc.rs).
