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
    // Run Vite via pnpm exec from the project's renderer folder so pnpm virtual store is resolved
    execSync('pnpm exec vite build', { stdio: 'inherit', cwd: 'src/renderer' })
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
