# Build target dependencies #
###########################
FROM node:20-alpine AS base
WORKDIR /app
ARG NODE_ENV=production
ENV PATH=/app/node_modules/.bin:$PATH \
  NODE_ENV="$NODE_ENV"
# Yarn
RUN yarn set version berry
COPY package.json yarn.lock* .yarnrc.yml ./


FROM base AS deps

COPY .yarn .yarn
RUN yarn workspaces focus --all --production

# Create a production-only dependencies stage
FROM base AS deps-prod
COPY .yarn .yarn
RUN yarn workspaces focus --all --production && \
    yarn cache clean && \
    rm -rf .yarn/cache

# Build target builder #
########################
FROM base AS builder

# Setup build env
ARG VERSION=unversioned
ARG SENTRY_AUTH_TOKEN
ENV SENTRY_AUTH_TOKEN="$SENTRY_AUTH_TOKEN"
ARG GHOST_API_URL
ENV GHOST_API_URL="$GHOST_API_URL"
ARG GHOST_CONTENT_KEY
ENV GHOST_CONTENT_KEY="$GHOST_CONTENT_KEY"

RUN apk add --no-cache jq && \
  mv package.json package.json.bak && \
  jq --arg version "$VERSION" '.version=$version' package.json.bak > package.json && \
  rm package.json.bak && \
  apk del jq

# Add ALL deps for building (including dev dependencies)
COPY .yarn .yarn
RUN yarn install --immutable

COPY . .

RUN yarn build && \
  yarn sitemap

# Clean up build cache and unnecessary files
RUN rm -rf .yarn/cache && \
    rm -rf node_modules/.cache && \
    find ./node_modules -name "*.md" -delete && \
    find ./node_modules -name "*.txt" -delete && \
    find ./node_modules -name "test" -type d -exec rm -rf {} + || true && \
    find ./node_modules -name "tests" -type d -exec rm -rf {} + || true && \
    find ./node_modules -name "__tests__" -type d -exec rm -rf {} + || true

# Build target production #
###########################
FROM node:20-alpine AS runner

# Install only essential packages
RUN apk --no-cache add curl && \
    apk --no-cache add dumb-init

# Create user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Set working directory
WORKDIR /app

# Copy only production dependencies from deps-prod stage
COPY --from=deps-prod --chown=nextjs:nodejs /app/node_modules ./node_modules

# Copy built application from builder
COPY --from=builder --chown=nextjs:nodejs /app/next-i18next.config.js ./
COPY --from=builder --chown=nextjs:nodejs /app/next.config.js ./
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Only copy the production build, not the entire .next folder
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

ENV PORT=3040
ENV NODE_ENV=production

EXPOSE 3040

# Use dumb-init for proper signal handling
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "server.js"]

HEALTHCHECK --interval=30s --timeout=3s --retries=3 CMD curl --fail http://localhost:3040 || exit 1
