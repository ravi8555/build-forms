// import { defineConfig } from "tsup";

// export default defineConfig({
//   entry: ["./src/index.ts"],
//   noExternal: ["@teachyst"], // transpile packages starting with `@teachyst` and their dependencies
//   splitting: false,
//   bundle: true,
//   outDir: "./dist",
//   clean: true,
//   env: { IS_SERVER_BUILD: "true" },
//   loader: { ".json": "copy" },
//   minify: true,
//   sourcemap: false,
// });


import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./src/index.ts"],

  bundle: true,
  splitting: false,
  outDir: "./dist",
  clean: true,

  noExternal: [
    "@repo/logger",
    "@repo/trpc",
    "@repo/services",
    "@repo/database",
  ],

  env: {
    IS_SERVER_BUILD: "true",
  },

  loader: {
    ".json": "copy",
  },

  minify: true,
  sourcemap: false,
  target: "node20",
  format: ["cjs"],
});