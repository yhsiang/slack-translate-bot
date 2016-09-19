# Translate Bot for slack

a simple bot to do translate on slack channel.

# Usage

require [nodejs](https://nodejs.org/en/download/) and version > 4.x.

## Prepare

1. Config Slack outgoing hook
2. Config Slack incoming hook
3. Config [Yandex Translate](https://tech.yandex.com/translate/) API-KEY

and follow steps:

1. npm install
2. npm run build
3. export TOKEN=<SLACK OUTGOING HOOK TOKEN>
4. export SLACK_URL=<SLACK INCOMING HOOK URL>
5. export API_KEY=<YANDEX TRANSLATE API-KEY>
6. node dist/server.js

# Development

1. npm install
2. npm run dev

# License

MIT
