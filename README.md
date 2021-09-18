# Дарителска Платформа Подкрепи.бг

![Lint](https://github.com/podkrepi-bg/frontend/workflows/Lint/badge.svg)
![Build](https://github.com/podkrepi-bg/frontend/workflows/Build/badge.svg)
![Build docker image](https://github.com/podkrepi-bg/frontend/workflows/Build%20docker%20image/badge.svg)
[![Build production image](https://github.com/podkrepi-bg/frontend/actions/workflows/docker-build-push.yml/badge.svg)](https://github.com/podkrepi-bg/frontend/actions/workflows/docker-build-push.yml)

![Dependencies](https://img.shields.io/david/podkrepi-bg/frontend?path=frontend)
![Dev Dependencies](https://img.shields.io/david/dev/podkrepi-bg/frontend?path=frontend)
![](https://img.shields.io/github/license/podkrepi-bg/frontend?path=frontend)
![](https://img.shields.io/github/issues/podkrepi-bg/frontend?path=frontend)

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-26-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

## What's in the box

- Frontend
  - [Typescript](https://www.typescriptlang.org/) / [Next.js](https://nextjs.org/) / [MaterialUI](https://material-ui.com/)
  - [JSS](https://cssinjs.org/?v=v10.5.1#react-jss-example) / [SCSS](https://sass-lang.com/) / [SCSS Guidelines](https://github.com/bjankord/stylelint-config-sass-guidelines)
  - [Formik](https://formik.org/) / [MobX](https://mobx.js.org/)
  - [ESlint](https://eslint.org/) / [Prettier](https://prettier.io/) / [Husky](https://github.com/typicode/husky) / [Stylelint](https://stylelint.io/) / [Lint Staged](https://github.com/okonet/lint-staged)
  - [Sentry](https://sentry.io/organizations/podkrepibg/)
- Backend
  - [GoFiber](https://gofiber.io/) / [GoValidator](https://github.com/asaskevich/govalidator)
  - [Protocol Buffers](https://developers.google.com/protocol-buffers) / [GraphQL Gateway](https://gqlgen.com/) / [GRPC](https://grpc.io/)
  - [.Net C#](https://docs.microsoft.com/en-us/dotnet/csharp/)
- DevOps
  - [Docker Compose](https://docs.docker.com/compose/) / [Github Actions](https://docs.github.com/en/free-pro-team@latest/actions/reference)

## Initial setup

```shell
git clone git@github.com:podkrepi-bg/frontend.git

cd frontend

# Install dependencies
yarn

# Symlink dev environment on unix
ln -hfs .env.local.example .env.local

# Symlink dev environment on Windows
mklink .env.local.example .env.local
```

## Development

```shell
yarn dev
```

Visit <http://localhost:3040/>

### NOTE! For existing clones update github remote to podkrepi-bg/frontend

```
# View existing remotes
git remote -v
# Change the 'origin' remote's URL
git remote set-url origin https://github.com/podkrepi-bg/frontend
# Check updated remotes
git remote -v
```

## Contributors ✨

Please check [contributors guide](https://github.com/podkrepi-bg/frontend/blob/master/CONTRIBUTING.md) for:

- [Development setup](https://github.com/podkrepi-bg/frontend/blob/master/CONTRIBUTING.md#development)
- [Linting](https://github.com/podkrepi-bg/frontend/blob/master/CONTRIBUTING.md#linting)
- [Production setup](https://github.com/podkrepi-bg/frontend/blob/master/CONTRIBUTING.md#production)
- [Pull requests guidelines](https://github.com/podkrepi-bg/frontend/blob/master/CONTRIBUTING.md#pull-requests)
- [Branching strategy](https://github.com/podkrepi-bg/frontend/blob/master/CONTRIBUTING.md#branching-strategy)
- [React guidelines](https://github.com/podkrepi-bg/frontend/blob/master/CONTRIBUTING.md#react-guidelines)
  - [Imports](https://github.com/podkrepi-bg/frontend/blob/master/CONTRIBUTING.md#imports)
  - [File structure](https://github.com/podkrepi-bg/frontend/blob/master/CONTRIBUTING.md#file-structure)
  - [Types](https://github.com/podkrepi-bg/frontend/blob/master/CONTRIBUTING.md#types)
  - [Components definition](https://github.com/podkrepi-bg/frontend/blob/master/CONTRIBUTING.md#components)
  - [Styles](https://github.com/podkrepi-bg/frontend/blob/master/CONTRIBUTING.md#styles)
  - [Translations](https://github.com/podkrepi-bg/frontend/blob/master/CONTRIBUTING.md#translations-i18n)

Thanks goes to these wonderful people:

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://stackoverflow.com/users/668245/kachar"><img src="https://avatars.githubusercontent.com/u/893608?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Ilko</b></sub></a><br /><a href="https://github.com/podkrepi-bg/frontend/commits?author=kachar" title="Code">💻</a> <a href="https://github.com/podkrepi-bg/frontend/commits?author=kachar" title="Documentation">📖</a> <a href="https://github.com/podkrepi-bg/frontend/pulls?q=is%3Apr+reviewed-by%3Akachar" title="Reviewed Pull Requests">👀</a> <a href="#maintenance-kachar" title="Maintenance">🚧</a> <a href="https://github.com/podkrepi-bg/frontend/issues?q=author%3Akachar" title="Bug reports">🐛</a> <a href="#example-kachar" title="Examples">💡</a></td>
    <td align="center"><a href="http://stackoverflow.com/users/6163171/stanleys?tab=profile"><img src="https://avatars.githubusercontent.com/u/12186099?v=4?s=100" width="100px;" alt=""/><br /><sub><b>StanislavSt</b></sub></a><br /><a href="https://github.com/podkrepi-bg/frontend/commits?author=StanislavSt" title="Code">💻</a> <a href="https://github.com/podkrepi-bg/frontend/commits?author=StanislavSt" title="Documentation">📖</a> <a href="https://github.com/podkrepi-bg/frontend/pulls?q=is%3Apr+reviewed-by%3AStanislavSt" title="Reviewed Pull Requests">👀</a> <a href="#tool-StanislavSt" title="Tools">🔧</a></td>
    <td align="center"><a href="https://github.com/sotir-ls"><img src="https://avatars.githubusercontent.com/u/4455130?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Sotir</b></sub></a><br /><a href="https://github.com/podkrepi-bg/frontend/commits?author=sotir-ls" title="Code">💻</a> <a href="https://github.com/podkrepi-bg/frontend/commits?author=sotir-ls" title="Documentation">📖</a> <a href="https://github.com/podkrepi-bg/frontend/pulls?q=is%3Apr+reviewed-by%3Asotir-ls" title="Reviewed Pull Requests">👀</a> <a href="#tool-sotir-ls" title="Tools">🔧</a></td>
    <td align="center"><a href="https://github.com/ani-kalpachka"><img src="https://avatars.githubusercontent.com/u/14351733?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Ani</b></sub></a><br /><a href="https://github.com/podkrepi-bg/frontend/commits?author=ani-kalpachka" title="Code">💻</a> <a href="https://github.com/podkrepi-bg/frontend/commits?author=ani-kalpachka" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/Nikola-Andreev"><img src="https://avatars.githubusercontent.com/u/19424332?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Nikola Andreev</b></sub></a><br /><a href="https://github.com/podkrepi-bg/frontend/commits?author=Nikola-Andreev" title="Code">💻</a> <a href="https://github.com/podkrepi-bg/frontend/commits?author=Nikola-Andreev" title="Documentation">📖</a> <a href="#tool-Nikola-Andreev" title="Tools">🔧</a></td>
    <td align="center"><a href="https://petkopavlovski.com/"><img src="https://avatars.githubusercontent.com/u/32264020?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Pete Pavlovski</b></sub></a><br /><a href="https://github.com/podkrepi-bg/frontend/commits?author=arthas168" title="Code">💻</a> <a href="https://github.com/podkrepi-bg/frontend/commits?author=arthas168" title="Documentation">📖</a> <a href="https://github.com/podkrepi-bg/frontend/pulls?q=is%3Apr+reviewed-by%3Aarthas168" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/uzuntonev"><img src="https://avatars.githubusercontent.com/u/51097961?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Georgi Uzuntonev</b></sub></a><br /><a href="https://github.com/podkrepi-bg/frontend/commits?author=uzuntonev" title="Code">💻</a> <a href="https://github.com/podkrepi-bg/frontend/commits?author=uzuntonev" title="Documentation">📖</a> <a href="https://github.com/podkrepi-bg/frontend/pulls?q=is%3Apr+reviewed-by%3Auzuntonev" title="Reviewed Pull Requests">👀</a> <a href="#tool-uzuntonev" title="Tools">🔧</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/vikinatora"><img src="https://avatars.githubusercontent.com/u/29047760?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Viktor Todorov</b></sub></a><br /><a href="https://github.com/podkrepi-bg/frontend/commits?author=vikinatora" title="Code">💻</a> <a href="https://github.com/podkrepi-bg/frontend/commits?author=vikinatora" title="Documentation">📖</a> <a href="https://github.com/podkrepi-bg/frontend/pulls?q=is%3Apr+reviewed-by%3Avikinatora" title="Reviewed Pull Requests">👀</a> <a href="#tool-vikinatora" title="Tools">🔧</a></td>
    <td align="center"><a href="http://www.nimasystems.com"><img src="https://avatars.githubusercontent.com/u/126405?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Martin Kovachev</b></sub></a><br /><a href="https://github.com/podkrepi-bg/frontend/commits?author=miraclebg" title="Code">💻</a> <a href="https://github.com/podkrepi-bg/frontend/commits?author=miraclebg" title="Documentation">📖</a> <a href="#tool-miraclebg" title="Tools">🔧</a> <a href="#infra-miraclebg" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#maintenance-miraclebg" title="Maintenance">🚧</a> <a href="#security-miraclebg" title="Security">🛡️</a></td>
    <td align="center"><a href="https://github.com/igoychev"><img src="https://avatars.githubusercontent.com/u/7055304?v=4?s=100" width="100px;" alt=""/><br /><sub><b>igoychev</b></sub></a><br /><a href="https://github.com/podkrepi-bg/frontend/commits?author=igoychev" title="Code">💻</a> <a href="https://github.com/podkrepi-bg/frontend/commits?author=igoychev" title="Documentation">📖</a> <a href="#tool-igoychev" title="Tools">🔧</a> <a href="#infra-igoychev" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#maintenance-igoychev" title="Maintenance">🚧</a> <a href="#security-igoychev" title="Security">🛡️</a></td>
    <td align="center"><a href="https://github.com/VPeykovski"><img src="https://avatars.githubusercontent.com/u/22998082?v=4?s=100" width="100px;" alt=""/><br /><sub><b>VPeykovski</b></sub></a><br /><a href="https://github.com/podkrepi-bg/frontend/commits?author=VPeykovski" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/dimitur2204"><img src="https://avatars.githubusercontent.com/u/61479393?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Dimitar Nizamov</b></sub></a><br /><a href="https://github.com/podkrepi-bg/frontend/commits?author=dimitur2204" title="Code">💻</a> <a href="https://github.com/podkrepi-bg/frontend/commits?author=dimitur2204" title="Documentation">📖</a> <a href="#tool-dimitur2204" title="Tools">🔧</a></td>
    <td align="center"><a href="https://github.com/xenry"><img src="https://avatars.githubusercontent.com/u/534600?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Andrey Marchev</b></sub></a><br /><a href="https://github.com/podkrepi-bg/frontend/commits?author=xenry" title="Code">💻</a> <a href="https://github.com/podkrepi-bg/frontend/commits?author=xenry" title="Documentation">📖</a> <a href="#tool-xenry" title="Tools">🔧</a> <a href="#platform-xenry" title="Packaging/porting to new platform">📦</a> <a href="https://github.com/podkrepi-bg/frontend/pulls?q=is%3Apr+reviewed-by%3Axenry" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/dianakarcheva"><img src="https://avatars.githubusercontent.com/u/47477592?v=4?s=100" width="100px;" alt=""/><br /><sub><b>dianakarcheva</b></sub></a><br /><a href="https://github.com/podkrepi-bg/frontend/commits?author=dianakarcheva" title="Code">💻</a> <a href="https://github.com/podkrepi-bg/frontend/commits?author=dianakarcheva" title="Documentation">📖</a> <a href="#tool-dianakarcheva" title="Tools">🔧</a> <a href="#platform-dianakarcheva" title="Packaging/porting to new platform">📦</a> <a href="https://github.com/podkrepi-bg/frontend/pulls?q=is%3Apr+reviewed-by%3Adianakarcheva" title="Reviewed Pull Requests">👀</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/mayapeneva"><img src="https://avatars.githubusercontent.com/u/25232447?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Mayya Peneva</b></sub></a><br /><a href="https://github.com/podkrepi-bg/frontend/commits?author=mayapeneva" title="Code">💻</a> <a href="https://github.com/podkrepi-bg/frontend/commits?author=mayapeneva" title="Documentation">📖</a> <a href="#tool-mayapeneva" title="Tools">🔧</a> <a href="#platform-mayapeneva" title="Packaging/porting to new platform">📦</a> <a href="https://github.com/podkrepi-bg/frontend/pulls?q=is%3Apr+reviewed-by%3Amayapeneva" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/RRoussev88"><img src="https://avatars.githubusercontent.com/u/32360024?v=4?s=100" width="100px;" alt=""/><br /><sub><b>RRoussev88</b></sub></a><br /><a href="https://github.com/podkrepi-bg/frontend/commits?author=RRoussev88" title="Code">💻</a> <a href="https://github.com/podkrepi-bg/frontend/commits?author=RRoussev88" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/marchev"><img src="https://avatars.githubusercontent.com/u/2691408?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Martin Marchev</b></sub></a><br /><a href="https://github.com/podkrepi-bg/frontend/commits?author=marchev" title="Code">💻</a> <a href="https://github.com/podkrepi-bg/frontend/commits?author=marchev" title="Documentation">📖</a></td>
    <td align="center"><a href="https://atanas-alexandrov.de"><img src="https://avatars.githubusercontent.com/u/56699232?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Atanas Alexandrov</b></sub></a><br /><a href="https://github.com/podkrepi-bg/frontend/commits?author=cupakob" title="Code">💻</a> <a href="https://github.com/podkrepi-bg/frontend/commits?author=cupakob" title="Documentation">📖</a> <a href="https://github.com/podkrepi-bg/frontend/commits?author=cupakob" title="Tests">⚠️</a> <a href="https://github.com/podkrepi-bg/frontend/issues?q=author%3Acupakob" title="Bug reports">🐛</a> <a href="#tool-cupakob" title="Tools">🔧</a></td>
    <td align="center"><a href="https://github.com/tanyogeorgiev"><img src="https://avatars.githubusercontent.com/u/17822617?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Tanyo Georgiev</b></sub></a><br /><a href="https://github.com/podkrepi-bg/frontend/commits?author=tanyogeorgiev" title="Code">💻</a> <a href="https://github.com/podkrepi-bg/frontend/commits?author=tanyogeorgiev" title="Documentation">📖</a> <a href="#tool-tanyogeorgiev" title="Tools">🔧</a> <a href="#platform-tanyogeorgiev" title="Packaging/porting to new platform">📦</a></td>
    <td align="center"><a href="https://github.com/stanimirdim92"><img src="https://avatars.githubusercontent.com/u/42135030?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Stanimir Dimitrov</b></sub></a><br /><a href="https://github.com/podkrepi-bg/frontend/commits?author=stanimirdim92" title="Code">💻</a> <a href="https://github.com/podkrepi-bg/frontend/commits?author=stanimirdim92" title="Documentation">📖</a> <a href="#tool-stanimirdim92" title="Tools">🔧</a> <a href="#platform-stanimirdim92" title="Packaging/porting to new platform">📦</a> <a href="https://github.com/podkrepi-bg/frontend/commits?author=stanimirdim92" title="Tests">⚠️</a> <a href="https://github.com/podkrepi-bg/frontend/pulls?q=is%3Apr+reviewed-by%3Astanimirdim92" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/imilchev"><img src="https://avatars.githubusercontent.com/u/16187050?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Ivan Milchev</b></sub></a><br /><a href="https://github.com/podkrepi-bg/frontend/commits?author=imilchev" title="Code">💻</a> <a href="https://github.com/podkrepi-bg/frontend/commits?author=imilchev" title="Documentation">📖</a> <a href="#tool-imilchev" title="Tools">🔧</a> <a href="#platform-imilchev" title="Packaging/porting to new platform">📦</a> <a href="https://github.com/podkrepi-bg/frontend/commits?author=imilchev" title="Tests">⚠️</a> <a href="https://github.com/podkrepi-bg/frontend/pulls?q=is%3Apr+reviewed-by%3Aimilchev" title="Reviewed Pull Requests">👀</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/tvalchev"><img src="https://avatars.githubusercontent.com/u/7523222?v=4?s=100" width="100px;" alt=""/><br /><sub><b>tvalchev</b></sub></a><br /><a href="https://github.com/podkrepi-bg/frontend/commits?author=tvalchev" title="Code">💻</a> <a href="https://github.com/podkrepi-bg/frontend/commits?author=tvalchev" title="Documentation">📖</a> <a href="#tool-tvalchev" title="Tools">🔧</a></td>
    <td align="center"><a href="https://www.vmihov.com/"><img src="https://avatars.githubusercontent.com/u/37806520?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Vladislav Mihov</b></sub></a><br /><a href="https://github.com/podkrepi-bg/frontend/commits?author=skilldeliver" title="Code">💻</a> <a href="https://github.com/podkrepi-bg/frontend/commits?author=skilldeliver" title="Documentation">📖</a> <a href="#tool-skilldeliver" title="Tools">🔧</a> <a href="#platform-skilldeliver" title="Packaging/porting to new platform">📦</a></td>
    <td align="center"><a href="https://github.com/wessly"><img src="https://avatars.githubusercontent.com/u/16501328?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Gottfrid Svartholm</b></sub></a><br /><a href="https://github.com/podkrepi-bg/frontend/commits?author=wessly" title="Code">💻</a> <a href="https://github.com/podkrepi-bg/frontend/commits?author=wessly" title="Documentation">📖</a> <a href="#tool-wessly" title="Tools">🔧</a></td>
    <td align="center"><a href="https://github.com/preslavgerchev"><img src="https://avatars.githubusercontent.com/u/11717082?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Preslav Gerchev</b></sub></a><br /><a href="https://github.com/podkrepi-bg/frontend/commits?author=preslavgerchev" title="Code">💻</a> <a href="https://github.com/podkrepi-bg/frontend/commits?author=preslavgerchev" title="Documentation">📖</a> <a href="#tool-preslavgerchev" title="Tools">🔧</a> <a href="#platform-preslavgerchev" title="Packaging/porting to new platform">📦</a> <a href="https://github.com/podkrepi-bg/frontend/commits?author=preslavgerchev" title="Tests">⚠️</a> <a href="https://github.com/podkrepi-bg/frontend/pulls?q=is%3Apr+reviewed-by%3Apreslavgerchev" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="http://georgi-naumov.blogspot.com/"><img src="https://avatars.githubusercontent.com/u/4079371?v=4?s=100" width="100px;" alt=""/><br /><sub><b>George Naumov</b></sub></a><br /><a href="https://github.com/podkrepi-bg/frontend/commits?author=gonaumov" title="Code">💻</a> <a href="https://github.com/podkrepi-bg/frontend/commits?author=gonaumov" title="Documentation">📖</a> <a href="#tool-gonaumov" title="Tools">🔧</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

If you want to be added or removed from this list please follow up on [this issue](https://github.com/podkrepi-bg/frontend/issues/2).

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind are welcome!
