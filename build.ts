import { remove, copy } from "fs-extra";
import * as esbuild from "esbuild";

await remove("./dist");

await esbuild.build({
  entryPoints: ["./src/index.ts"],
  bundle: true,
  minify: true,
  platform: "node",
  format: "esm",
  outfile: "./dist/index.js"
});

await copy("./public", "./dist");