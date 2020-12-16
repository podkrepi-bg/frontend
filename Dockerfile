# Pull node image from docker hub
FROM node:14 AS development

# Set working directory
WORKDIR /app

ARG NODE_ENV=development

# Add `/app/node_modules/.bin` to $PATH
ENV PATH=/app/node_modules/.bin:$PATH \
  NODE_ENV="$NODE_ENV"

# Install and cache app dependencies
COPY package.json yarn.lock /app/
RUN cd /app/ && yarn install --production=false

# Copy existing application directory contents
COPY . /app

EXPOSE 3040

CMD [ "yarn", "dev" ]


# Build target production #
###########################
FROM development AS production
ARG NODE_ENV=production
WORKDIR /app
RUN yarn build
CMD [ "yarn", "start" ]
