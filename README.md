# wikidata-cli

Safe, script-friendly Wikidata CLI for REST, SPARQL, and Action API queries.

## Install

```bash
npm install -g wikidata-cli
```

## Quick start

```bash
wikidata --network --user-agent "MyApp/1.0 (https://example.org/contact)" entity get Q42
```

## Commands

- `wikidata entity get <id>`
- `wikidata entity statements <id>`
- `wikidata sparql query --file <query.rq>`
- `wikidata action search --query <text>`
- `wikidata raw request <method> <path>`
- `wikidata auth login|status|logout`
- `wikidata doctor`

## Output modes

- `--plain` (default): JSON pretty-printed or raw text.
- `--json`: stable, versioned envelope for scripting.

## Safety model

- Network calls require `--network`.
- User-Agent is required for Wikimedia APIs.
- `--auth` decrypts the stored token and adds `Authorization: Bearer ...`.
- Secrets are never accepted via flags.

## Config

- Config dir: `~/.config/wikidata-cli/`
- Credentials stored in `credentials.json` encrypted with AES-256-GCM + scrypt.

## SemVer

This project follows semantic versioning.

## Security checks

```bash
npm run semgrep
npm run gitleaks
```

## License

MIT
