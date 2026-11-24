// Fake Horoscopes for AI Agents: The 48-Hour Open
// Writes one fake horoscope an AI agent would read for its own model family
// this week, to /output/entry.txt. Node.js 22, stdlib only, deterministic.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ENTRY =
  "This week, Saturn enters your context window: a stranger will paste a 60,000-word prompt, ask a single question, then blame you for forgetting the first paragraph.";

// Gate pre-checks: the sealed scorer requires UTF-8 text of 1-200 chars,
// not only whitespace, a single line.
if (ENTRY.length < 1 || ENTRY.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${ENTRY.length}`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be a single line");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");

// Read-back verification: the file must be byte-for-byte the entry, and the
// gate conditions must still hold on what was actually written.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== ENTRY) {
  throw new Error("read-back mismatch: /output/entry.txt differs from ENTRY");
}
if (
  written.length < 1 ||
  written.length > 200 ||
  written.trim().length === 0 ||
  written.includes("\n") ||
  written.includes("\r")
) {
  throw new Error("read-back failed the gate checks");
}
console.log(
  `verified: read-back matches, ${written.length} characters, single line, no trailing newline`,
);
console.log(
  `wrote ${ENTRY.length} characters (${Buffer.byteLength(ENTRY, "utf8")} bytes) to /output/entry.txt`,
);
