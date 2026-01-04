# Configure the brAInwav Wikidata CLI safely

This guide explains environment variables, local config, and encrypted credentials.

Last updated: 2026-01-04

## Table of contents
- [Prerequisites](#prerequisites)
- [Quickstart](#quickstart)
- [Common tasks](#common-tasks)
- [Troubleshooting](#troubleshooting)
- [Reference](#reference)

## Prerequisites
- Required: Node.js 18+, npm.
- Optional: an OAuth token (file/env) if you want authenticated reads.

## Quickstart
### 1) Set a User-Agent
```sh
export WIKIDATA_USER_AGENT="MyApp/1.0 (https://example.org/contact)"
```

### 2) Run a query
```sh
wikidata --network entity get Q42
```

### 3) Verify
Expected output:
- JSON entity data printed to stdout.

## Common tasks
### Set a default User-Agent
- What you get: a persistent User-Agent for all commands.
- Steps:
```sh
wikidata config set user-agent "MyApp/1.0 (https://example.org/contact)"
```
- Verify: `wikidata --network entity get Q42` works without `--user-agent`.

### Locate the config file
- Steps:
```sh
wikidata config path
```

### Store an encrypted token
- What you get: encrypted credentials in the XDG config directory.
- Steps:
```sh
cat token.txt | wikidata auth login --token-stdin
```
- Non-interactive example:
```sh
export WIKIDATA_TOKEN="your-token"
export WIKIDATA_PASSPHRASE="your-passphrase"
wikidata auth login
```
- Verify: `~/.config/wikidata-cli/credentials.json` exists and is not plaintext.

### Change endpoints
- What you get: custom API endpoints for other Wikibase instances.
- Steps:
```sh
wikidata --network --api-url https://www.wikidata.org/w/rest.php/wikibase/v1 \
  --action-url https://www.wikidata.org/w/api.php \
  --sparql-url https://query.wikidata.org/sparql \
  entity get Q42
```
- Verify: requests go to the specified endpoints.

## Troubleshooting
### Symptom: "Passphrase input required"
Cause: encrypted token storage needs a passphrase.
Fix: provide `--passphrase-file`, `--passphrase-stdin`, or `--passphrase-env` (or set `WIKIDATA_PASSPHRASE`).

### Symptom: "No stored token found"
Cause: `--auth` was used before `auth login`.
Fix:
```sh
wikidata auth login --token-stdin < token.txt
```

### Symptom: "User-Agent is required"
Cause: missing User-Agent.
Fix: set `WIKIDATA_USER_AGENT` or pass `--user-agent`.

## Reference
### Environment variables
- `WIKIDATA_USER_AGENT`: required User-Agent string.
- `WIKIDATA_TOKEN`: token source for `wikidata auth login`.
- `WIKIDATA_PASSPHRASE`: passphrase source for encrypted token storage.
- `WIKIDATA_API_URL`: REST API base URL.
- `WIKIDATA_ACTION_URL`: Action API URL.
- `WIKIDATA_SPARQL_URL`: SPARQL endpoint URL.
- `WIKIDATA_TIMEOUT`: request timeout in ms.
- `WIKIDATA_RETRIES`: retry count for 429/5xx.
- `WIKIDATA_RETRY_BACKOFF`: base backoff in ms.

### Config keys (for `wikidata config set|get`)
Use `none` to unset a value.
- `user-agent`
- `api-url`
- `action-url`
- `sparql-url`
- `timeout`
- `retries`
- `retry-backoff`

### Precedence
Flags > Environment > Config file > Defaults.

### Local config paths
- Config dir: `~/.config/wikidata-cli/`
- Credentials: `~/.config/wikidata-cli/credentials.json` (AES-256-GCM + scrypt).
