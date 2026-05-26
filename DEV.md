# Do not run `npm run dev` from this folder

`overrides/` is only the **patch set** for the Lite generator, not a runnable app.

After `npm run build:lite` from the Pro repo root, run the Lite app from:

```bash
cd extends/public/tailtheme-reactjs-free
npm install
npm run dev
```
