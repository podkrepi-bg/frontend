# Build target dependencies #
###########################
FROM node:16-alpine3.16 AS base
WORKDIR /app
ARG NODE_ENV=production
ENV PATH=/app/node_modules/.bin:$PATH \
  NODE_ENV="$NODE_ENV"
COPY package.json yarn.lock /app/
EXPOSE 3040

# Build target dependencies #
###########################
FROM base AS dependencies

RUN apk --no-cache add curl g++ make python3

# Install prod dependencies
RUN yarn install --production && \
  # Cache prod dependencies
  cp -R node_modules /prod_node_modules && \
  # Install dev dependencies
  yarn install --production=false

# Build target development #
############################
FROM dependencies AS development
COPY . /app
CMD [ "yarn", "dev" ]

# Build target builder #
########################
FROM base AS builder
ARG VERSION=unversioned
ARG SENTRY_AUTH_TOKEN
ENV SENTRY_AUTH_TOKEN="$SENTRY_AUTH_TOKEN"
ARG GHOST_API_URL
ENV GHOST_API_URL="$GHOST_API_URL"
ARG GHOST_CONTENT_KEY
ENV GHOST_CONTENT_KEY="$GHOST_CONTENT_KEY"
COPY --from=dependencies /app/node_modules /app/node_modules
COPY . /app

RUN apk add --no-cache jq && \
  mv package.json package.json.bak && \
  jq --arg version "$VERSION" '.version=$version' package.json.bak > package.json && \
  rm package.json.bak && \
  apk del jq

RUN yarn build && \
  yarn sitemap && \
  rm -rf node_modules

# Build target production #
###########################
FROM base AS production

COPY --from=builder /app/.next /app/.next
COPY --from=builder /app/public /app/public
COPY --from=dependencies /prod_node_modules /app/node_modules
COPY next.config.js next-i18next.config.js /app/

USER 1000:1001

CMD [ "yarn", "start" ]

HEALTHCHECK --interval=5s --timeout=3s --retries=3 CMD curl --fail http://localhost:3040 || exit 1
