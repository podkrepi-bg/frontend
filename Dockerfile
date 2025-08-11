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

# Add dev deps
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN yarn build && \
  yarn sitemap

# Build target production #
###########################
FROM base AS runner

RUN apk --no-cache add curl

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy standalone server and its dependencies
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# Copy static assets to standalone directory
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

ENV PORT=3040

EXPOSE 3040

CMD [ "node", "server.js" ]

HEALTHCHECK --interval=5s --timeout=3s --retries=3 CMD curl --fail http://localhost:3040 || exit 1
