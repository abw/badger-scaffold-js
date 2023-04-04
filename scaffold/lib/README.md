Note the extra directory levels.  This is to avoid infinite loops where,
for example, a `src/package.json` tries to `{% include "package.json" %}`
which resolves to itself.

Instead the `src/package.json` should `{% include "common/package.json" %}`
to break the loop.

A better solution will be to have an additional configuration file for each
scaffold template indicating which files they want to include from different
library sets, e.g. in `scaffold/src/react-lib/config/files.yaml`:

```yaml
common:
  - package.json
react:
  - another.json
```

(thinking out loud...)

Although that probably needs to be map giving the source file and target
output file:

```yaml
"common/package.json": "package.json"
"react/another.json":  "another.json"
"vite/vite.config.js": "vite.config.js"
```

Maybe also ability to include entire directories:

```yaml
"web/src": "src"
```
