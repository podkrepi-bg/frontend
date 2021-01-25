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

## Branching strategy

Inherits the rules from <https://nvie.com/posts/a-successful-git-branching-model/>

Branching model|Merges
---|---
![](https://nvie.com/img/git-model@2x.png)|![](https://nvie.com/img/merge-without-ff@2x.png)

## Translations (i18n)

### Translation domains

Common translations that are used on all pages (Nav, etc) are stored at `frontend/public/locales/{locale}/common.json`

Scopes (domains) are stored in separate json files at `frontend/public/locales/{locale}/{domain}.json`
One scope can combine the translations keys from several pages with common reusable strings ex. `auth` scope collects keys for `login` and `register` pages. 

### Translation keys

It is preferred to use [kebab-case](https://en.wiktionary.org/wiki/kebab_case) for translation keys and extract another level of nesting when the common prefix of the keys is above 3 or makes sense to be separated as new keys might be added in the future.

```json
{
  "cta": {
    "login": "Log In",
    "register": "Register",
    "send": "Send",
    "reset": "Reset"
  },
  "fields": {
    "email": "Email",
    "password": "Password",
    "confirm-password": "Confirm Password",
    "first-name": "First name",
    "last-name": "Last name"
  },
  "pages": {
    "forgotten-password": {
      "instructions": "To reset your password, please type your email address below. We will then send you an email with instructions to follow."
    }
  }
}
```
