<h1><p align="center">
  Дарителска Платформа Подкрепи.бг
</p></h1>
<p align="center">
  <a href="https://podkrepi.bg/" target="blank"><img src="https://podkrepi.bg/podkrepi-bg-logo-en.svg" width="320" alt="Podkrepi.bg logo" /></a>
</p>

<p align="center">

  <p align="center"><a target="_blank" rel="noopener noreferrer" href="https://github.com/podkrepi-bg/frontend/actions/workflows/lint.yml"><img src="https://github.com/podkrepi-bg/frontend/actions/workflows/lint.yml/badge.svg" alt="Lint" style="max-width: 100%;"></a>
<a target="_blank" rel="noopener noreferrer" href="https://github.com/podkrepi-bg/frontend/actions/workflows/release.yml"><img src="https://github.com/podkrepi-bg/frontend/actions/workflows/release.yml/badge.svg" alt="Build" style="max-width: 100%;"></a>
<a href="https://github.com/podkrepi-bg/frontend/actions/workflows/check-pr.yml"><img src="https://github.com/podkrepi-bg/frontend/actions/workflows/check-pr.yml/badge.svg" alt="Build docker image" style="max-width: 100%;"></a></p>

  <p align="center"><a target="_blank" rel="noopener noreferrer" href="https://img.shields.io/github/license/podkrepi-bg/frontend"><img src="https://img.shields.io/github/license/podkrepi-bg/frontend" alt="" data-canonical-src="https://img.shields.io/github/license/podkrepi-bg/frontend" style="max-width: 100%;"></a>
<a target="_blank" rel="noopener noreferrer" href="https://img.shields.io/github/issues/podkrepi-bg/frontend"><img src="https://img.shields.io/github/issues/podkrepi-bg/frontend" alt="" data-canonical-src="https://img.shields.io/github/issues/podkrepi-bg/frontend" style="max-width: 100%;"></a></p>

</p>

## What's in the box

- Frontend
  - [Typescript](https://www.typescriptlang.org/)
  - [Next.js](https://nextjs.org/)
  - [MaterialUI](https://material-ui.com/)
  - [Formik](https://formik.org/) / [MobX](https://mobx.js.org/)
  - [ESlint](https://eslint.org/) / [Prettier](https://prettier.io/) / [Husky](https://github.com/typicode/husky) / [Stylelint](https://stylelint.io/) / [Lint Staged](https://github.com/okonet/lint-staged)
  - [Sentry](https://sentry.io/organizations/podkrepibg/)
- Testing
  - [Playwright](https://playwright.dev/)

## Initial setup

```shell
git clone git@github.com:podkrepi-bg/frontend.git
cd frontend

# Symlink dev environment on Mac / Linux
ln -nfs .env.local.example .env.local

# Symlink dev environment on Windows
mklink .env.local .env.local.example

# Install dependencies
yarn

# Start the project
yarn dev
```

Visit <http://localhost:3040/>

## Starting the backend

In order to use the frontend together with the API for it you need to clone and start the backend project.

Follow API instructions at <https://github.com/podkrepi-bg/api#setup-development-environment>

## Using Stripe and testing payments

In order to use the frontend together with the API and be able to test donations and payments you would need to install and start a StripeCLI

Follow the instructions at <https://github.com/podkrepi-bg/api/blob/master/TESTING.md>

## Testing

End to end testing is done on every PR with [Playwright](https://playwright.dev/). Github Workflows start the whole stack and run tests in headless mode.

Read more at [End-2-End Testing](https://github.com/podkrepi-bg/frontend/blob/master/e2e/README.md)

## Contributors ✨

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-60-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

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
  <tbody>
    <tr>
      <td align="center"><a href="https://stackoverflow.com/users/668245/kachar"><img src="https://avatars.githubusercontent.com/u/893608?v=4?s=100" width="100px;" alt="Ilko"/><br /><sub><b>Ilko</b></sub></a><br /><a href="https://github.com/podkrepi-bg/frontend/commits?author=kachar" title="Code">💻</a> <a href="https://github.com/podkrepi-bg/frontend/commits?author=kachar" title="Documentation">📖</a> <a href="https://github.com/podkrepi-bg/frontend/pulls?q=is%3Apr+reviewed-by%3Akachar" title="Reviewed Pull Requests">👀</a> <a href="#maintenance-kachar" title="Maintenance">🚧</a> <a href="https://github.com/podkrepi-bg/frontend/issues?q=author%3Akachar" title="Bug reports">🐛</a> <a href="#example-kachar" title="Examples">💡</a></td>
      <td align="center"><a href="http://stackoverflow.com/users/6163171/stanleys?tab=profile"><img src="https://avatars.githubusercontent.com/u/12186099?v=4?s=100" width="100px;" alt="StanislavSt"/><br /><sub><b>StanislavSt</b></sub></a><br /><a href="https://github.com/podkrepi-bg/frontend/commits?author=StanislavSt" title="Code">💻</a> <a href="https://github.com/podkrepi-bg/frontend/commits?author=StanislavSt" title="Documentation">📖</a> <a href="https://github.com/podkrepi-bg/frontend/pulls?q=is%3Apr+reviewed-by%3AStanislavSt" title="Reviewed Pull Requests">👀</a> <a href="#tool-StanislavSt" title="Tools">🔧</a></td>
      <td align="center"><a href="https://github.com/sotir-ls"><img src="https://avatars.githubusercontent.com/u/4455130?v=4?s=100" width="100px;" alt="Sotir"/><br /><sub><b>Sotir</b></sub></a><br /><a href="https://github.com/podkrepi-bg/frontend/commits?author=sotir-ls" title="Code">💻</a> <a href="https://github.com/podkrepi-bg/frontend/commits?author=sotir-ls" title="Documentation">📖</a> <a href="https://github.com/podkrepi-bg/frontend/pulls?q=is%3Apr+reviewed-by%3Asotir-ls" title="Reviewed Pull Requests">👀</a> <a href="#tool-sotir-ls" title="Tools">🔧</a></td>
      <td align="center"><a href="https://github.com/ani-kalpachka"><img src="https://avatars.githubusercontent.com/u/14351733?v=4?s=100" width="100px;" alt="Ani"/><br /><sub><b>Ani</b></sub></a><br /><a href="https://github.com/podkrepi-bg/frontend/commits?author=ani-kalpachka" title="Code">💻</a> <a href="https://github.com/podkrepi-bg/frontend/commits?author=ani-kalpachka" title="Documentation">📖</a></td>
      <td align="center"><a href="https://github.com/Nikola-Andreev"><img src="https://avatars.githubusercontent.com/u/19424332?v=4?s=100" width="100px;" alt="Nikola Andreev"/><br /><sub><b>Nikola Andreev</b></sub></a><br /><a href="https://github.com/podkrepi-bg/frontend/commits?author=Nikola-Andreev" title="Code">💻</a> <a href="https://github.com/podkrepi-bg/frontend/commits?author=Nikola-Andreev" title="Documentation">📖</a> <a href="#tool-Nikola-Andreev" title="Tools">🔧</a></td>
      <td align="center"><a href="https://petkopavlovski.com/"><img src="https://avatars.githubusercontent.com/u/32264020?v=4?s=100" width="100px;" alt="Pete Pavlovski"/><br /><sub><b>Pete Pavlovski</b></sub></a><br /><a href="https://github.com/podkrepi-bg/frontend/commits?author=arthas168" title="Code">💻</a> <a href="https://github.com/podkrepi-bg/frontend/commits?author=arthas168" title="Documentation">📖</a> <a href="https://github.com/podkrepi-bg/frontend/pulls?q=is%3Apr+reviewed-by%3Aarthas168" title="Reviewed Pull Requests">👀</a></td>
      <td align="center"><a href="https://github.com/uzuntonev"><img src="https://avatars.githubusercontent.com/u/51097961?v=4?s=100" width="100px;" alt="Georgi Uzuntonev"/><br /><sub><b>Georgi Uzuntonev</b></sub></a><br /><a href="https://github.com/podkrepi-bg/frontend/commits?author=uzuntonev" title="Code">💻</a> <a href="https://github.com/podkrepi-bg/frontend/commits?author=uzuntonev" title="Documentation">📖</a> <a href="https://github.com/podkrepi-bg/frontend/pulls?q=is%3Apr+reviewed-by%3Auzuntonev" title="Reviewed Pull Requests">👀</a> <a href="#tool-uzuntonev" title="Tools">🔧</a></td>
    </tr>
    <tr>
      <td align="center"><a href="https://github.com/vikinatora"><img src="https://avatars.githubusercontent.com/u/29047760?v=4?s=100" width="100px;" alt="Viktor Todorov"/><br /><sub><b>Viktor Todorov</b></sub></a><br /><a href="https://github.com/podkrepi-bg/frontend/commits?author=vikinatora" title="Code">💻</a> <a href="https://github.com/podkrepi-bg/frontend/commits?author=vikinatora" title="Documentation">📖</a> <a href="https://github.com/podkrepi-bg/frontend/pulls?q=is%3Apr+reviewed-by%3Avikinatora" title="Reviewed Pull Requests">👀</a> <a href="#tool-vikinatora" title="Tools">🔧</a></td>
      <td align="center"><a href="http://www.nimasystems.com"><img src="https://avatars.githubusercontent.com/u/126405?v=4?s=100" width="100px;" alt="Martin Kovachev"/><br /><sub><b>Martin Kovachev</b></sub></a><br /><a href="https://github.com/podkrepi-bg/frontend/commits?author=miraclebg" title="Code">💻</a> <a href="https://github.com/podkrepi-bg/frontend/commits?author=miraclebg" title="Documentation">📖</a> <a href="#tool-miraclebg" title="Tools">🔧</a> <a href="#infra-miraclebg" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#maintenance-miraclebg" title="Maintenance">🚧</a> <a href="#security-miraclebg" title="Security">🛡️</a></td>
      <td align="center"><a href="https://github.com/igoychev"><img src="https://avatars.githubusercontent.com/u/7055304?v=4?s=100" width="100px;" alt="igoychev"/><br /><sub><b>igoychev</b></sub></a><br /><a href="https://github.com/podkrepi-bg/frontend/commits?author=igoychev" title="Code">💻</a> <a href="https://github.com/podkrepi-bg/frontend/commits?author=igoychev" title="Documentation">📖</a> <a href="#tool-igoychev" title="Tools">🔧</a> <a href="#infra-igoychev" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#maintenance-igoychev" title="Maintenance">🚧</a> <a href="#security-igoychev" title="Security">🛡️</a></td>
      <td align="center"><a href="https://github.com/VPeykovski"><img src="https://avatars.githubusercontent.com/u/22998082?v=4?s=100" width="100px;" alt="VPeykovski"/><br /><sub><b>VPeykovski</b></sub></a><br /><a href="https://github.com/podkrepi-bg/frontend/commits?author=VPeykovski" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/dimitur2204"><img src="https://avatars.githubusercontent.com/u/61479393?v=4?s=100" width="100px;" alt="Dimitar Nizamov"/><br /><sub><b>Dimitar Nizamov</b></sub></a><br /><a href="https://github.com/podkrepi-bg/frontend/commits?author=dimitur2204" title="Code">💻</a> <a href="https://github.com/podkrepi-bg/frontend/commits?author=dimitur2204" title="Documentation">📖</a> <a href="#tool-dimitur2204" title="Tools">🔧</a></td>
      <td align="center"><a href="https://github.com/xenry"><img src="https://avatars.githubusercontent.com/u/534600?v=4?s=100" width="100px;" alt="Andrey Marchev"/><br /><sub><b>Andrey Marchev</b></sub></a><br /><a href="https://github.com/podkrepi-bg/frontend/commits?author=xenry" title="Code">💻</a> <a href="https://github.com/podkrepi-bg/frontend/commits?author=xenry" title="Documentation">📖</a> <a href="#tool-xenry" title="Tools">🔧</a> <a href="#platform-xenry" title="Packaging/porting to new platform">📦</a> <a href="https://github.com/podkrepi-bg/frontend/pulls?q=is%3Apr+reviewed-by%3Axenry" title="Reviewed Pull Requests">👀</a></td>
      <td align="center"><a href="https://github.com/dianakarcheva"><img src="https://avatars.githubusercontent.com/u/47477592?v=4?s=100" width="100px;" alt="dianakarcheva"/><br /><sub><b>dianakarcheva</b></sub></a><br /><a href="https://github.com/podkrepi-bg/frontend/commits?author=dianakarcheva" title="Code">💻</a> <a href="https://github.com/podkrepi-bg/frontend/commits?author=dianakarcheva" title="Documentation">📖</a> <a href="#tool-dianakarcheva" title="Tools">🔧</a> <a href="#platform-dianakarcheva" title="Packaging/porting to new platform">📦</a> <a href="https://github.com/podkrepi-bg/frontend/pulls?q=is%3Apr+reviewed-by%3Adianakarcheva" title="Reviewed Pull Requests">👀</a></td>
    </tr>
    <tr>
      <td align="center"><a href="https://github.com/mayapeneva"><img src="https://avatars.githubusercontent.com/u/25232447?v=4?s=100" width="100px;" alt="Mayya Peneva"/><br /><sub><b>Mayya Peneva</b></sub></a><br /><a href="https://github.com/podkrepi-bg/frontend/commits?author=mayapeneva" title="Code">💻</a> <a href="https://github.com/podkrepi-bg/frontend/commits?author=mayapeneva" title="Documentation">📖</a> <a href="#tool-mayapeneva" title="Tools">🔧</a> <a href="#platform-mayapeneva" title="Packaging/porting to new platform">📦</a> <a href="https://github.com/podkrepi-bg/frontend/pulls?q=is%3Apr+reviewed-by%3Amayapeneva" title="Reviewed Pull Requests">👀</a></td>
      <td align="center"><a href="https://github.com/RRoussev88"><img src="https://avatars.githubusercontent.com/u/32360024?v=4?s=100" width="100px;" alt="RRoussev88"/><br /><sub><b>RRoussev88</b></sub></a><br /><a href="https://github.com/podkrepi-bg/frontend/commits?author=RRoussev88" title="Code">💻</a> <a href="https://github.com/podkrepi-bg/frontend/commits?author=RRoussev88" title="Documentation">📖</a></td>
      <td align="center"><a href="https://github.com/marchev"><img src="https://avatars.githubusercontent.com/u/2691408?v=4?s=100" width="100px;" alt="Martin Marchev"/><br /><sub><b>Martin Marchev</b></sub></a><br /><a href="https://github.com/podkrepi-bg/frontend/commits?author=marchev" title="Code">💻</a> <a href="https://github.com/podkrepi-bg/frontend/commits?author=marchev" title="Documentation">📖</a></td>
      <td align="center"><a href="https://atanas-alexandrov.de"><img src="https://avatars.githubusercontent.com/u/56699232?v=4?s=100" width="100px;" alt="Atanas Alexandrov"/><br /><sub><b>Atanas Alexandrov</b></sub></a><br /><a href="https://github.com/podkrepi-bg/frontend/commits?author=cupakob" title="Code">💻</a> <a href="https://github.com/podkrepi-bg/frontend/commits?author=cupakob" title="Documentation">📖</a> <a href="https://github.com/podkrepi-bg/frontend/commits?author=cupakob" title="Tests">⚠️</a> <a href="https://github.com/podkrepi-bg/frontend/issues?q=author%3Acupakob" title="Bug reports">🐛</a> <a href="#tool-cupakob" title="Tools">🔧</a></td>
      <td align="center"><a href="https://github.com/tanyogeorgiev"><img src="https://avatars.githubusercontent.com/u/17822617?v=4?s=100" width="100px;" alt="Tanyo Georgiev"/><br /><sub><b>Tanyo Georgiev</b></sub></a><br /><a href="https://github.com/podkrepi-bg/frontend/commits?author=tanyogeorgiev" title="Code">💻</a> <a href="https://github.com/podkrepi-bg/frontend/commits?author=tanyogeorgiev" title="Documentation">📖</a> <a href="#tool-tanyogeorgiev" title="Tools">🔧</a> <a href="#platform-tanyogeorgiev" title="Packaging/porting to new platform">📦</a></td>
      <td align="center"><a href="https://github.com/stanimirdim92"><img src="https://avatars.githubusercontent.com/u/42135030?v=4?s=100" width="100px;" alt="Stanimir Dimitrov"/><br /><sub><b>Stanimir Dimitrov</b></sub></a><br /><a href="https://github.com/podkrepi-bg/frontend/commits?author=stanimirdim92" title="Code">💻</a> <a href="https://github.com/podkrepi-bg/frontend/commits?author=stanimirdim92" title="Documentation">📖</a> <a href="#tool-stanimirdim92" title="Tools">🔧</a> <a href="#platform-stanimirdim92" title="Packaging/porting to new platform">📦</a> <a href="https://github.com/podkrepi-bg/frontend/commits?author=stanimirdim92" title="Tests">⚠️</a> <a href="https://github.com/podkrepi-bg/frontend/pulls?q=is%3Apr+reviewed-by%3Astanimirdim92" title="Reviewed Pull Requests">👀</a></td>
      <td align="center"><a href="https://github.com/imilchev"><img src="https://avatars.githubusercontent.com/u/16187050?v=4?s=100" width="100px;" alt="Ivan Milchev"/><br /><sub><b>Ivan Milchev</b></sub></a><br /><a href="https://github.com/podkrepi-bg/frontend/commits?author=imilchev" title="Code">💻</a> <a href="https://github.com/podkrepi-bg/frontend/commits?author=imilchev" title="Documentation">📖</a> <a href="#tool-imilchev" title="Tools">🔧</a> <a href="#platform-imilchev" title="Packaging/porting to new platform">📦</a> <a href="https://github.com/podkrepi-bg/frontend/commits?author=imilchev" title="Tests">⚠️</a> <a href="https://github.com/podkrepi-bg/frontend/pulls?q=is%3Apr+reviewed-by%3Aimilchev" title="Reviewed Pull Requests">👀</a></td>
    </tr>
    <tr>
      <td align="center"><a href="https://github.com/tvalchev"><img src="https://avatars.githubusercontent.com/u/7523222?v=4?s=100" width="100px;" alt="tvalchev"/><br /><sub><b>tvalchev</b></sub></a><br /><a href="https://github.com/podkrepi-bg/frontend/commits?author=tvalchev" title="Code">💻</a> <a href="https://github.com/podkrepi-bg/frontend/commits?author=tvalchev" title="Documentation">📖</a> <a href="#tool-tvalchev" title="Tools">🔧</a></td>
      <td align="center"><a href="https://www.vmihov.com/"><img src="https://avatars.githubusercontent.com/u/37806520?v=4?s=100" width="100px;" alt="Vladislav Mihov"/><br /><sub><b>Vladislav Mihov</b></sub></a><br /><a href="https://github.com/podkrepi-bg/frontend/commits?author=skilldeliver" title="Code">💻</a> <a href="https://github.com/podkrepi-bg/frontend/commits?author=skilldeliver" title="Documentation">📖</a> <a href="#tool-skilldeliver" title="Tools">🔧</a> <a href="#platform-skilldeliver" title="Packaging/porting to new platform">📦</a></td>
      <td align="center"><a href="https://github.com/wessly"><img src="https://avatars.githubusercontent.com/u/16501328?v=4?s=100" width="100px;" alt="Gottfrid Svartholm"/><br /><sub><b>Gottfrid Svartholm</b></sub></a><br /><a href="https://github.com/podkrepi-bg/frontend/commits?author=wessly" title="Code">💻</a> <a href="https://github.com/podkrepi-bg/frontend/commits?author=wessly" title="Documentation">📖</a> <a href="#tool-wessly" title="Tools">🔧</a></td>
      <td align="center"><a href="https://github.com/preslavgerchev"><img src="https://avatars.githubusercontent.com/u/11717082?v=4?s=100" width="100px;" alt="Preslav Gerchev"/><br /><sub><b>Preslav Gerchev</b></sub></a><br /><a href="https://github.com/podkrepi-bg/frontend/commits?author=preslavgerchev" title="Code">💻</a> <a href="https://github.com/podkrepi-bg/frontend/commits?author=preslavgerchev" title="Documentation">📖</a> <a href="#tool-preslavgerchev" title="Tools">🔧</a> <a href="#platform-preslavgerchev" title="Packaging/porting to new platform">📦</a> <a href="https://github.com/podkrepi-bg/frontend/commits?author=preslavgerchev" title="Tests">⚠️</a> <a href="https://github.com/podkrepi-bg/frontend/pulls?q=is%3Apr+reviewed-by%3Apreslavgerchev" title="Reviewed Pull Requests">👀</a></td>
      <td align="center"><a href="http://georgi-naumov.blogspot.com/"><img src="https://avatars.githubusercontent.com/u/4079371?v=4?s=100" width="100px;" alt="George Naumov"/><br /><sub><b>George Naumov</b></sub></a><br /><a href="https://github.com/podkrepi-bg/frontend/commits?author=gonaumov" title="Code">💻</a> <a href="https://github.com/podkrepi-bg/frontend/commits?author=gonaumov" title="Documentation">📖</a> <a href="#tool-gonaumov" title="Tools">🔧</a></td>
      <td align="center"><a href="https://github.com/atanasster"><img src="https://avatars.githubusercontent.com/u/6075606?v=4?s=100" width="100px;" alt="Atanas Stoyanov"/><br /><sub><b>Atanas Stoyanov</b></sub></a><br /><a href="https://github.com/podkrepi-bg/frontend/commits?author=atanasster" title="Code">💻</a> <a href="https://github.com/podkrepi-bg/frontend/commits?author=atanasster" title="Documentation">📖</a> <a href="#tool-atanasster" title="Tools">🔧</a> <a href="#platform-atanasster" title="Packaging/porting to new platform">📦</a> <a href="#maintenance-atanasster" title="Maintenance">🚧</a></td>
      <td align="center"><a href="https://github.com/vann4oto98"><img src="https://avatars.githubusercontent.com/u/61576293?v=4?s=100" width="100px;" alt="Vanyo"/><br /><sub><b>Vanyo</b></sub></a><br /><a href="https://github.com/podkrepi-bg/frontend/commits?author=vann4oto98" title="Code">💻</a> <a href="https://github.com/podkrepi-bg/frontend/commits?author=vann4oto98" title="Documentation">📖</a> <a href="#tool-vann4oto98" title="Tools">🔧</a></td>
    </tr>
    <tr>
      <td align="center"><a href="https://github.com/kirilpopov"><img src="https://avatars.githubusercontent.com/u/6021897?v=4?s=100" width="100px;" alt="Kiril Popov"/><br /><sub><b>Kiril Popov</b></sub></a><br /><a href="https://github.com/podkrepi-bg/frontend/commits?author=kirilpopov" title="Code">💻</a> <a href="https://github.com/podkrepi-bg/frontend/commits?author=kirilpopov" title="Documentation">📖</a> <a href="#tool-kirilpopov" title="Tools">🔧</a> <a href="#platform-kirilpopov" title="Packaging/porting to new platform">📦</a> <a href="#plugin-kirilpopov" title="Plugin/utility libraries">🔌</a></td>
      <td align="center"><a href="https://github.com/dragomir-yankov"><img src="https://avatars.githubusercontent.com/u/28300816?v=4?s=100" width="100px;" alt="dragomir-yankov"/><br /><sub><b>dragomir-yankov</b></sub></a><br /><a href="https://github.com/podkrepi-bg/frontend/commits?author=dragomir-yankov" title="Code">💻</a> <a href="https://github.com/podkrepi-bg/frontend/commits?author=dragomir-yankov" title="Documentation">📖</a> <a href="#tool-dragomir-yankov" title="Tools">🔧</a> <a href="#platform-dragomir-yankov" title="Packaging/porting to new platform">📦</a></td>
      <td align="center"><a href="https://bandism.net/"><img src="https://avatars.githubusercontent.com/u/22633385?v=4?s=100" width="100px;" alt="Ikko Ashimine"/><br /><sub><b>Ikko Ashimine</b></sub></a><br /><a href="https://github.com/podkrepi-bg/frontend/commits?author=eltociear" title="Code">💻</a> <a href="https://github.com/podkrepi-bg/frontend/commits?author=eltociear" title="Documentation">📖</a></td>
      <td align="center"><a href="https://github.com/aironhight"><img src="https://avatars.githubusercontent.com/u/33146371?v=4?s=100" width="100px;" alt="hstoyanov"/><br /><sub><b>hstoyanov</b></sub></a><br /><a href="https://github.com/podkrepi-bg/frontend/commits?author=aironhight" title="Code">💻</a> <a href="https://github.com/podkrepi-bg/frontend/commits?author=aironhight" title="Documentation">📖</a> <a href="#tool-aironhight" title="Tools">🔧</a></td>
      <td align="center"><a href="https://github.com/LyuboslavLyubenov"><img src="https://avatars.githubusercontent.com/u/14333463?v=4?s=100" width="100px;" alt="Lyuboslav Tihomirov Lyubenov"/><br /><sub><b>Lyuboslav Tihomirov Lyubenov</b></sub></a><br /><a href="https://github.com/podkrepi-bg/frontend/commits?author=LyuboslavLyubenov" title="Code">💻</a> <a href="https://github.com/podkrepi-bg/frontend/commits?author=LyuboslavLyubenov" title="Documentation">📖</a> <a href="#tool-LyuboslavLyubenov" title="Tools">🔧</a> <a href="#platform-LyuboslavLyubenov" title="Packaging/porting to new platform">📦</a></td>
      <td align="center"><a href="https://github.com/Bunny303"><img src="https://avatars.githubusercontent.com/u/3616912?v=4?s=100" width="100px;" alt="Bunny303"/><br /><sub><b>Bunny303</b></sub></a><br /><a href="https://github.com/podkrepi-bg/frontend/commits?author=Bunny303" title="Code">💻</a> <a href="https://github.com/podkrepi-bg/frontend/commits?author=Bunny303" title="Documentation">📖</a> <a href="#tool-Bunny303" title="Tools">🔧</a></td>
      <td align="center"><a href="https://github.com/dplamenov"><img src="https://avatars.githubusercontent.com/u/30602242?v=4?s=100" width="100px;" alt="Dimitar Plamenov Dimitrov"/><br /><sub><b>Dimitar Plamenov Dimitrov</b></sub></a><br /><a href="https://github.com/podkrepi-bg/frontend/commits?author=dplamenov" title="Code">💻</a> <a href="https://github.com/podkrepi-bg/frontend/commits?author=dplamenov" title="Documentation">📖</a> <a href="#tool-dplamenov" title="Tools">🔧</a></td>
    </tr>
    <tr>
      <td align="center"><a href="https://github.com/Simomir"><img src="https://avatars.githubusercontent.com/u/53947134?v=4?s=100" width="100px;" alt="Simeon Shopov"/><br /><sub><b>Simeon Shopov</b></sub></a><br /><a href="https://github.com/podkrepi-bg/frontend/commits?author=Simomir" title="Code">💻</a> <a href="https://github.com/podkrepi-bg/frontend/commits?author=Simomir" title="Documentation">📖</a> <a href="#tool-Simomir" title="Tools">🔧</a></td>
      <td align="center"><a href="https://github.com/angelina-7"><img src="https://avatars.githubusercontent.com/u/62725741?v=4?s=100" width="100px;" alt="Angelina"/><br /><sub><b>Angelina</b></sub></a><br /><a href="https://github.com/podkrepi-bg/frontend/commits?author=angelina-7" title="Code">💻</a> <a href="https://github.com/podkrepi-bg/frontend/commits?author=angelina-7" title="Documentation">📖</a> <a href="#tool-angelina-7" title="Tools">🔧</a></td>
      <td align="center"><a href="https://github.com/Kalin-Konstantinov"><img src="https://avatars.githubusercontent.com/u/63465745?v=4?s=100" width="100px;" alt="Kalin Konstantinov"/><br /><sub><b>Kalin Konstantinov</b></sub></a><br /><a href="https://github.com/podkrepi-bg/frontend/commits?author=Kalin-Konstantinov" title="Code">💻</a> <a href="https://github.com/podkrepi-bg/frontend/commits?author=Kalin-Konstantinov" title="Documentation">📖</a> <a href="#tool-Kalin-Konstantinov" title="Tools">🔧</a></td>
      <td align="center"><a href="https://github.com/Marina-yoya"><img src="https://avatars.githubusercontent.com/u/64007447?v=4?s=100" width="100px;" alt="Marina-yoya"/><br /><sub><b>Marina-yoya</b></sub></a><br /><a href="https://github.com/podkrepi-bg/frontend/commits?author=Marina-yoya" title="Code">💻</a> <a href="https://github.com/podkrepi-bg/frontend/commits?author=Marina-yoya" title="Documentation">📖</a> <a href="#tool-Marina-yoya" title="Tools">🔧</a></td>
      <td align="center"><a href="https://borislavstoychev.github.io/"><img src="https://avatars.githubusercontent.com/u/67734870?v=4?s=100" width="100px;" alt="Borislav Stoychev"/><br /><sub><b>Borislav Stoychev</b></sub></a><br /><a href="https://github.com/podkrepi-bg/frontend/commits?author=borislavstoychev" title="Code">💻</a> <a href="https://github.com/podkrepi-bg/frontend/commits?author=borislavstoychev" title="Documentation">📖</a> <a href="#tool-borislavstoychev" title="Tools">🔧</a></td>
      <td align="center"><a href="https://github.com/dpmarkov"><img src="https://avatars.githubusercontent.com/u/71282381?v=4?s=100" width="100px;" alt="Dimitar Markov"/><br /><sub><b>Dimitar Markov</b></sub></a><br /><a href="https://github.com/podkrepi-bg/frontend/commits?author=dpmarkov" title="Code">💻</a> <a href="https://github.com/podkrepi-bg/frontend/commits?author=dpmarkov" title="Documentation">📖</a> <a href="#tool-dpmarkov" title="Tools">🔧</a></td>
      <td align="center"><a href="https://github.com/TodorBelchev"><img src="https://avatars.githubusercontent.com/u/71307782?v=4?s=100" width="100px;" alt="Todor Belchev"/><br /><sub><b>Todor Belchev</b></sub></a><br /><a href="https://github.com/podkrepi-bg/frontend/commits?author=TodorBelchev" title="Code">💻</a> <a href="https://github.com/podkrepi-bg/frontend/commits?author=TodorBelchev" title="Documentation">📖</a> <a href="#tool-TodorBelchev" title="Tools">🔧</a></td>
    </tr>
    <tr>
      <td align="center"><a href="https://github.com/PepiPetrov"><img src="https://avatars.githubusercontent.com/u/74186271?v=4?s=100" width="100px;" alt="Pepi Petrov"/><br /><sub><b>Pepi Petrov</b></sub></a><br /><a href="https://github.com/podkrepi-bg/frontend/commits?author=PepiPetrov" title="Code">💻</a> <a href="https://github.com/podkrepi-bg/frontend/commits?author=PepiPetrov" title="Documentation">📖</a> <a href="#tool-PepiPetrov" title="Tools">🔧</a></td>
      <td align="center"><a href="https://github.com/stilian-nikolaev"><img src="https://avatars.githubusercontent.com/u/74594156?v=4?s=100" width="100px;" alt="Stilian Nikolaev"/><br /><sub><b>Stilian Nikolaev</b></sub></a><br /><a href="https://github.com/podkrepi-bg/frontend/commits?author=stilian-nikolaev" title="Code">💻</a> <a href="https://github.com/podkrepi-bg/frontend/commits?author=stilian-nikolaev" title="Documentation">📖</a> <a href="#tool-stilian-nikolaev" title="Tools">🔧</a></td>
      <td align="center"><a href="https://github.com/nradkova"><img src="https://avatars.githubusercontent.com/u/78322634?v=4?s=100" width="100px;" alt="Neli Radkova"/><br /><sub><b>Neli Radkova</b></sub></a><br /><a href="https://github.com/podkrepi-bg/frontend/commits?author=nradkova" title="Code">💻</a> <a href="https://github.com/podkrepi-bg/frontend/commits?author=nradkova" title="Documentation">📖</a> <a href="#tool-nradkova" title="Tools">🔧</a></td>
      <td align="center"><a href="https://github.com/KalinHar"><img src="https://avatars.githubusercontent.com/u/80389338?v=4?s=100" width="100px;" alt="Kalin Harmandzhiev"/><br /><sub><b>Kalin Harmandzhiev</b></sub></a><br /><a href="https://github.com/podkrepi-bg/frontend/commits?author=KalinHar" title="Code">💻</a> <a href="https://github.com/podkrepi-bg/frontend/commits?author=KalinHar" title="Documentation">📖</a> <a href="#tool-KalinHar" title="Tools">🔧</a></td>
      <td align="center"><a href="https://github.com/PetyrDzhunov"><img src="https://avatars.githubusercontent.com/u/80568052?v=4?s=100" width="100px;" alt="Petar Dzhunov"/><br /><sub><b>Petar Dzhunov</b></sub></a><br /><a href="https://github.com/podkrepi-bg/frontend/commits?author=PetyrDzhunov" title="Code">💻</a> <a href="https://github.com/podkrepi-bg/frontend/commits?author=PetyrDzhunov" title="Documentation">📖</a> <a href="#tool-PetyrDzhunov" title="Tools">🔧</a></td>
      <td align="center"><a href="https://github.com/ivankraev"><img src="https://avatars.githubusercontent.com/u/89323943?v=4?s=100" width="100px;" alt="Ivan Kraev"/><br /><sub><b>Ivan Kraev</b></sub></a><br /><a href="https://github.com/podkrepi-bg/frontend/commits?author=ivankraev" title="Code">💻</a> <a href="https://github.com/podkrepi-bg/frontend/commits?author=ivankraev" title="Documentation">📖</a> <a href="#tool-ivankraev" title="Tools">🔧</a></td>
      <td align="center"><a href="https://github.com/Yakimov1337"><img src="https://avatars.githubusercontent.com/u/92337248?v=4?s=100" width="100px;" alt="Yakimov1337"/><br /><sub><b>Yakimov1337</b></sub></a><br /><a href="https://github.com/podkrepi-bg/frontend/commits?author=Yakimov1337" title="Code">💻</a> <a href="https://github.com/podkrepi-bg/frontend/commits?author=Yakimov1337" title="Documentation">📖</a> <a href="#tool-Yakimov1337" title="Tools">🔧</a></td>
    </tr>
    <tr>
      <td align="center"><a href="https://github.com/GeorgyGenchev"><img src="https://avatars.githubusercontent.com/u/101862171?v=4?s=100" width="100px;" alt="Georgy Genchev"/><br /><sub><b>Georgy Genchev</b></sub></a><br /><a href="https://github.com/podkrepi-bg/frontend/commits?author=GeorgyGenchev" title="Code">💻</a> <a href="https://github.com/podkrepi-bg/frontend/commits?author=GeorgyGenchev" title="Documentation">📖</a> <a href="#tool-GeorgyGenchev" title="Tools">🔧</a></td>
      <td align="center"><a href="https://github.com/ilievZlatko"><img src="https://avatars.githubusercontent.com/u/18635490?v=4?s=100" width="100px;" alt="Zlatko"/><br /><sub><b>Zlatko</b></sub></a><br /><a href="https://github.com/podkrepi-bg/frontend/commits?author=ilievZlatko" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/Margi13"><img src="https://avatars.githubusercontent.com/u/14825765?v=4?s=100" width="100px;" alt="Margarita"/><br /><sub><b>Margarita</b></sub></a><br /><a href="https://github.com/podkrepi-bg/frontend/commits?author=Margi13" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/marinovl7"><img src="https://avatars.githubusercontent.com/u/99186919?v=4?s=100" width="100px;" alt="Lachezar Marinov"/><br /><sub><b>Lachezar Marinov</b></sub></a><br /><a href="https://github.com/podkrepi-bg/frontend/commits?author=marinovl7" title="Code">💻</a></td>
      <td align="center"><a href="https://www.last.fm/user/batebobo"><img src="https://avatars.githubusercontent.com/u/6130708?v=4?s=100" width="100px;" alt="Boyan Vushkov"/><br /><sub><b>Boyan Vushkov</b></sub></a><br /><a href="https://github.com/podkrepi-bg/frontend/commits?author=batebobo" title="Code">💻</a></td>
      <td align="center"><a href="http://valkirilov.github.io"><img src="https://avatars.githubusercontent.com/u/1233496?v=4?s=100" width="100px;" alt="Valentin Kirilov"/><br /><sub><b>Valentin Kirilov</b></sub></a><br /><a href="https://github.com/podkrepi-bg/frontend/commits?author=valkirilov" title="Code">💻</a> <a href="https://github.com/podkrepi-bg/frontend/commits?author=valkirilov" title="Documentation">📖</a></td>
      <td align="center"><a href="https://devkishor8007.vercel.app/"><img src="https://avatars.githubusercontent.com/u/73419211?v=4?s=100" width="100px;" alt="Kishor Kc"/><br /><sub><b>Kishor Kc</b></sub></a><br /><a href="https://github.com/podkrepi-bg/frontend/commits?author=devkishor8007" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center"><a href="https://github.com/stann1"><img src="https://avatars.githubusercontent.com/u/3273143?v=4?s=100" width="100px;" alt="stann1"/><br /><sub><b>stann1</b></sub></a><br /><a href="https://github.com/podkrepi-bg/frontend/commits?author=stann1" title="Code">💻</a> <a href="https://github.com/podkrepi-bg/frontend/commits?author=stann1" title="Documentation">📖</a> <a href="#tool-stann1" title="Tools">🔧</a> <a href="#security-stann1" title="Security">🛡️</a> <a href="#projectManagement-stann1" title="Project Management">📆</a></td>
      <td align="center"><a href="https://github.com/AnzheloD"><img src="https://avatars.githubusercontent.com/u/32179794?v=4?s=100" width="100px;" alt="Anzhelo Dimitrov"/><br /><sub><b>Anzhelo Dimitrov</b></sub></a><br /><a href="https://github.com/podkrepi-bg/frontend/commits?author=AnzheloD" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/AndreyGoranov"><img src="https://avatars.githubusercontent.com/u/55912299?v=4?s=100" width="100px;" alt="Andrey Goranov"/><br /><sub><b>Andrey Goranov</b></sub></a><br /><a href="https://github.com/podkrepi-bg/frontend/commits?author=AndreyGoranov" title="Code">💻</a></td>
      <td align="center"><a href="https://antomic.net"><img src="https://avatars.githubusercontent.com/u/57956282?v=4?s=100" width="100px;" alt="Anton Mihaylov"/><br /><sub><b>Anton Mihaylov</b></sub></a><br /><a href="https://github.com/podkrepi-bg/frontend/commits?author=antonmihaylov" title="Code">💻</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

If you want to be added or removed from this list please follow up on [this issue](https://github.com/podkrepi-bg/frontend/issues/2).

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind are welcome!
