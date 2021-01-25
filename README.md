# Дарителска Платформа - Frontend
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

![Lint](https://github.com/daritelska-platforma/frontend/workflows/Lint/badge.svg)
![Build](https://github.com/daritelska-platforma/frontend/workflows/Build/badge.svg)
![Build docker image](https://github.com/daritelska-platforma/frontend/workflows/Build%20docker%20image/badge.svg)
![Dependencies](https://img.shields.io/david/daritelska-platforma/frontend)
![Dev Dependencies](https://img.shields.io/david/dev/daritelska-platforma/frontend)

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
- [Lint Staged](https://github.com/okonet/lint-staged)
- [Husky](https://github.com/typicode/husky)
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
yarn
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

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://stackoverflow.com/users/668245/kachar"><img src="https://avatars.githubusercontent.com/u/893608?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Ilko</b></sub></a><br /><a href="https://github.com/daritelska-platforma/frontend/commits?author=kachar" title="Code">💻</a> <a href="https://github.com/daritelska-platforma/frontend/commits?author=kachar" title="Documentation">📖</a> <a href="https://github.com/daritelska-platforma/frontend/pulls?q=is%3Apr+reviewed-by%3Akachar" title="Reviewed Pull Requests">👀</a> <a href="#maintenance-kachar" title="Maintenance">🚧</a> <a href="https://github.com/daritelska-platforma/frontend/issues?q=author%3Akachar" title="Bug reports">🐛</a> <a href="#example-kachar" title="Examples">💡</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!