#!/usr/bin/env node
const { execSync } = require('child_process')

const isVercel =
  !!process.env.VERCEL ||
  !!process.env.NOW ||
  !!process.env.NOW_BUILDER ||
  !!process.env.VERCEL_BUILD

if (isVercel) {
  console.log('Detected Vercel environment — running web-only build (typecheck:web + vite build)')
  try {
    execSync('npm run typecheck:web', { stdio: 'inherit' })
    // Run Vite via pnpm exec and explicitly set the project root to the renderer folder.
    // This avoids issues on CI (like Vercel) where the working directory or workspace
    // detection can differ, causing Vite/Rollup to fail to resolve "index.html".
    execSync('pnpm exec vite build --root src/renderer', { stdio: 'inherit' })
    process.exit(0)
  } catch (err) {
    console.error('Web-only build failed:', err)
    process.exit(1)
  }
}

// Default: run the full (desktop) build used locally
try {
  execSync('npm run typecheck && electron-vite build', { stdio: 'inherit' })
  process.exit(0)
} catch (err) {
  console.error('Full build failed:', err)
  process.exit(1)
}
