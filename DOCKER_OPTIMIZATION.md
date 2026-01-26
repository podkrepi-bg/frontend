# Docker Size Optimization Guide

This document explains the optimizations made to reduce your Docker container size from 2.3GB.

## Key Issues Identified

1. **Complete node_modules copied**: Original Dockerfile copied all dependencies including dev dependencies
2. **No dependency pruning**: Many unnecessary files (tests, docs, cache) were included
3. **Inefficient Next.js output**: Not using standalone mode which creates optimized bundles
4. **Large base image**: Using full Node.js Alpine when distroless would be smaller

## Optimization Strategies

### 1. Current Optimized Dockerfile
- **Expected size reduction**: ~60-70% (700MB-1GB)
- Uses Next.js standalone output
- Separates production dependencies
- Cleans up unnecessary files
- Better caching strategy

### 2. Distroless Version (Dockerfile.optimized)
- **Expected size reduction**: ~80-85% (300-500MB)
- Uses Google's distroless base image
- Most secure option (no shell, minimal attack surface)
- Smallest possible size

## Build Instructions

### Option 1: Use optimized Dockerfile (recommended for most cases)
```bash
docker build -t your-app:optimized .
```

### Option 2: Use distroless version (smallest size)
```bash
docker build -f Dockerfile.optimized -t your-app:distroless .
```

## Additional Optimizations

### 1. .dockerignore improvements
Add these entries to your .dockerignore:
```
**/.git
**/node_modules
**/.next
**/coverage
**/.nyc_output
**/test
**/tests
**/__tests__
**/*.test.js
**/*.test.ts
**/*.spec.js
**/*.spec.ts
**/README.md
**/CHANGELOG.md
**/.github
**/docs
**/examples
```

### 2. Package.json optimization
Consider removing unused dependencies:
- Run `npx depcheck` to find unused packages
- Move dev-only packages to devDependencies
- Use tree-shaking friendly imports

### 3. Next.js bundle analysis
```bash
ANALYZE=true yarn build
```

## Security Benefits
- Runs as non-root user
- Minimal attack surface with distroless
- No shell access in production
- Updated base images

## Health Check Optimization
- Increased interval from 5s to 30s (reduces overhead)
- Proper signal handling with dumb-init

## Expected Results
- **Original**: ~2.3GB
- **Optimized**: ~700MB-1GB (70% reduction)
- **Distroless**: ~300-500MB (85% reduction)
