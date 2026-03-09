# Fix: "next-swc.win32-x64-msvc.node is not a valid Win32 application"

## Why it happens

Next.js uses a **native SWC binary** (`@next/swc-win32-x64-msvc`) for fast compilation. The error usually means:

1. **Corrupted or incomplete install** – e.g. `npm install` was interrupted or ran out of disk space, so the `.node` file is truncated or wrong.
2. **Wrong/corrupted cache** – npm served a bad or mismatched binary.

## Fix: clean reinstall

Run these in the `frontend` folder (with enough free disk space):

```bash
cd frontend

# Remove build output and dependencies
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue

# Optional: clear npm cache if problem persists
# npm cache clean --force

# Reinstall
npm install
npm run dev
```

If you use **Command Prompt** or **Git Bash**:

```bash
cd frontend
rmdir /s /q .next 2>nul
rmdir /s /q node_modules 2>nul
npm install
npm run dev
```

After a full `npm install`, the correct Windows x64 SWC binary will be downloaded and the error should go away.

## Check Node version

Next.js 14 expects **Node.js 18.17+**. Check with:

```bash
node -v
```

If you're on an older Node, upgrade from https://nodejs.org/ and run the clean reinstall again.
