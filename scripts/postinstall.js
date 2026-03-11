#!/usr/bin/env node
const { execSync } = require('child_process')

// Skip electron postinstall when building on Vercel or other web CI
const isVercel =
  !!process.env.VERCEL ||
  !!process.env.NOW ||
  !!process.env.NOW_BUILDER ||
  !!process.env.VERCEL_BUILD
if (isVercel) {
  console.log('Detected Vercel environment — skipping electron postinstall.')
  process.exit(0)
}

try {
  execSync('electron-builder install-app-deps', { stdio: 'inherit' })
} catch (err) {
  console.error('electron-builder install-app-deps failed:', err)
  process.exit(1)
}
