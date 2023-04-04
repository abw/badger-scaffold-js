Note the extra directory levels.  This is to avoid infinite loops where,
for example, a `src/package.json` tries to `{% include "package.json" %}`
which resolves to itself.

Instead the `src/package.json` should `{% include "common/package.json" %}`
to break the loop.

The better solution is to add a `config/files.(yaml|json)` which defines
the files that you want to copy from the `scaffold/lib` directory.

```json
{
  "common/package.json": "package.json",
  "public/badger.svg":  "public/badger.svg",
  "vite/vite.config.js": "vite.config.js"
}
```
