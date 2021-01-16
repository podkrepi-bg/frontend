# Contributing

## Setup local dev environment

```shell
git clone git@github.com:daritelska-platforma/frontend.git
cd frontend

# Symlink dev environment
ln -s .env.example .env

# Install dependencies
yarn
```

## Development


```shell
yarn dev
```

Visit <http://localhost:3040/>

## Run via Docker Compose

Install the binary via <https://docs.docker.com/compose/install/>

### Start the container in foreground

```shell
docker-compose up
```

### Start the container in background

```shell
docker-compose up -d
docker-compose logs -f
```

Stop the docker container with `docker-compose down`

## Linting

```shell
yarn lint
yarn lint:styles
yarn format
yarn type-check
```

## PRs

All PRs must pass all checks before they will be considered for review.
