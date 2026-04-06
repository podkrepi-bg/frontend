#!/usr/bin/env bash
##
## Validates that every env var declared in .env.local.example is classified
## in .github/build-env.yml as either build-time (under shared/test/dev/prod)
## or runtime-only (under runtime_only).
##
set -euo pipefail

EXAMPLE=.env.local.example
CONFIG=.github/build-env.yml

if [ ! -f "$EXAMPLE" ]; then
  echo "❌ $EXAMPLE not found"
  exit 1
fi

if [ ! -f "$CONFIG" ]; then
  echo "❌ $CONFIG not found"
  exit 1
fi

# All env var names declared in .env.local.example (skip comments/blank lines).
example_vars=$(grep -oE '^[A-Z_][A-Z0-9_]*' "$EXAMPLE" | sort -u)

# Build-time vars: any key under shared/test/dev/prod.
build_vars=$(yq -r '
  (.shared // {}) * (.test // {}) * (.dev // {}) * (.prod // {})
  | keys[]
' "$CONFIG" 2>/dev/null | sort -u || true)

# Fallback for older yq syntax.
if [ -z "$build_vars" ]; then
  build_vars=$(yq -r '
    [(.shared // {} | keys[]), (.test // {} | keys[]), (.dev // {} | keys[]), (.prod // {} | keys[])]
    | unique[]
  ' "$CONFIG" | sort -u)
fi

# Runtime-only vars (explicit list).
runtime_vars=$(yq -r '.runtime_only[]?' "$CONFIG" | sort -u)

# All classified vars.
classified=$(printf '%s\n%s\n' "$build_vars" "$runtime_vars" | sort -u)

# Vars in example that aren't classified.
missing=$(comm -23 <(echo "$example_vars") <(echo "$classified") || true)

if [ -n "$missing" ]; then
  echo "❌ Env vars in $EXAMPLE are not classified in $CONFIG:"
  echo "$missing" | sed 's/^/  - /'
  echo ""
  echo "Add them to one of:"
  echo "  - shared/test/dev/prod  (build-time, baked into Docker image)"
  echo "  - runtime_only          (runtime, set via K8s manifests)"
  exit 1
fi

echo "✅ All env vars in $EXAMPLE are classified"
