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
    execSync('npx vite build', { stdio: 'inherit' })
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
