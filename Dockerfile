# Build target dependencies #
###########################
FROM node:14-alpine AS base
WORKDIR /app
ARG NODE_ENV=production
ENV PATH=/app/node_modules/.bin:$PATH \
  NODE_ENV="$NODE_ENV"
COPY package.json yarn.lock /app/
EXPOSE 3040

# Build target dependencies #
###########################
FROM base AS dependencies
# Install prod dependencies
RUN yarn install --production
# Cache prod dependencies
RUN cp -R node_modules /prod_node_modules
# Install dev dependencies
RUN yarn install

# Build target development #
############################
FROM dependencies AS development
COPY . /app
CMD [ "yarn", "dev" ]

# Build target builder #
########################
FROM base AS builder
COPY . /app
RUN yarn add --dev typescript @types/node && \
  yarn build && \
  rm -rf node_modules

# Build target production #
###########################
FROM base AS production
COPY --from=builder /app/.next /app/.next
COPY --from=dependencies /prod_node_modules /app/node_modules
COPY . /app
CMD [ "yarn", "start" ]
