# Дарителска Платформа - Frontend

## What's in the box

- [Typescript](https://www.typescriptlang.org/)
- [Next.js](https://nextjs.org/)
- [MaterialUI](https://material-ui.com/)
- [MobX](https://mobx.js.org/)
- [SCSS](https://sass-lang.com/)
- [SCSS Guidelines](https://github.com/bjankord/stylelint-config-sass-guidelines)
- [ESlint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Stylelint](https://stylelint.io/)
- [Github Actions](https://docs.github.com/en/free-pro-team@latest/actions/reference)
- [Docker Compose](https://docs.docker.com/compose/)

## Initial setup

```shell
git clone git@github.com:daritelska-platforma/frontend.git
cd frontend

# Symlink dev environment
ln -s .env.example .env
```

## Development

```shell
yarn dev
```

Visit <http://localhost:3040/>

### Run via Docker Compose

Install the binary via <https://docs.docker.com/compose/install/>

#### Start the container in foreground

```shell
docker-compose up
```

#### Start the container in background

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

## Production

### Build frontend

```shell
yarn build
```

### Build Docker image

```shell
docker build . \
    --file ./Dockerfile \
    --target production \
    --build-arg NODE_ENV=production
```
