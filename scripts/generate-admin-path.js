#!/usr/bin/env node
/**
 * Generate a new random admin path (32 chars, lowercase + digits).
 * Run before build to get a new URL each time:
 *   npm run generate-admin-path
 * Then add the printed line to .env.local and rebuild.
 *
 * Optional: pass --write to append NEXT_PUBLIC_ADMIN_PATH to .env.local (creates/updates).
 */

const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const LENGTH = 32;
const CHARS = "abcdefghijklmnopqrstuvwxyz0123456789";
let str = "";
const bytes = crypto.randomBytes(LENGTH);
for (let i = 0; i < LENGTH; i++) {
  str += CHARS[bytes[i] % CHARS.length];
}

const envLine = `NEXT_PUBLIC_ADMIN_PATH=${str}`;
console.log("\nAdd this to your .env.local (or set in your host's env):\n");
console.log(envLine);
console.log("\nAdmin URL will be: /" + str + "\n");

const wantWrite = process.argv.includes("--write");
if (wantWrite) {
  const envPath = path.join(__dirname, "..", ".env.local");
  let content = "";
  if (fs.existsSync(envPath)) {
    content = fs.readFileSync(envPath, "utf8");
    if (content.includes("NEXT_PUBLIC_ADMIN_PATH=")) {
      content = content.replace(/NEXT_PUBLIC_ADMIN_PATH=.*/m, envLine);
    } else {
      content = content.trimEnd() + "\n" + envLine + "\n";
    }
  } else {
    content = envLine + "\n";
  }
  fs.writeFileSync(envPath, content);
  console.log("Updated " + envPath + " with new path.\n");
}
