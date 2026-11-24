// Worst AI Advice: The 48-Hour Tight Line Open — make.fun entry.
// Writes one line of deliberately terrible AI advice to $MAKEFUN_OUTPUT_DIR/entry.txt.
import { readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "To fix a failing build, delete the error messages — no errors, no problem.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  console.error("MAKEFUN_OUTPUT_DIR is not set");
  process.exit(1);
}

// Gate: 1–140 characters, not only whitespace.
if (LINE.length < 1 || LINE.length > 140 || LINE.trim().length === 0) {
  console.error(`entry is ${LINE.length} chars, outside the 1-140 gate`);
  process.exit(1);
}

// Empty the output dir's contents only; never remove the dir itself.
for (const name of readdirSync(outDir)) {
  rmSync(join(outDir, name), { recursive: true, force: true });
}

writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
// No trailing newline: the file must hold exactly the line, byte for byte.
console.log(`wrote entry.txt (${LINE.length} chars)`);
