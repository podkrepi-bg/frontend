# Contributing

Table of contents:

* [Development setup](contributing.md#development)
* [Linting](contributing.md#linting)
* [Production setup](contributing.md#production)
* [Pull requests guidelines](contributing.md#pull-requests)
* [Branching strategy](contributing.md#branching-strategy)
* [React guidelines](contributing.md#react-guidelines)
  * [Imports](contributing.md#imports)
  * [File structure](contributing.md#file-structure)
  * [Types](contributing.md#types)
  * [Components definition](contributing.md#components)
  * [Styles](contributing.md#styles)
    * [Box model](contributing.md#styles-using-the-box--component)
    * [JSS Hook](contributing.md#styles-using-usestyles-hook)
    * [SCSS](contributing.md#styles-using-somethingmodulescss)
  * [Translations](contributing.md#translations-i18n)

## Development

### Setup local dev environment

```text
git clone git@github.com:daritelska-platforma/frontend.git
cd frontend

# Symlink dev environment
ln -s .env.example .env

# Install dependencies
yarn
```

### Start development server

```text
yarn dev
```

Visit [http://localhost:3040/](http://localhost:3040/)

### Start dev server via Docker Compose

Install the binary via [https://docs.docker.com/compose/install/](https://docs.docker.com/compose/install/)

#### Start the container in foreground

```text
docker-compose up
```

#### Start the container in background

```text
docker-compose up -d
docker-compose logs -f
```

Stop the docker container with `docker-compose down`

## Linting

```text
yarn lint
yarn lint:styles
yarn format
yarn type-check
```

## Production

### Build frontend

```text
yarn build
```

### Build Docker image

```text
docker build . \
    --file ./Dockerfile \
    --target production \
    --build-arg NODE_ENV=production
```

## Pull requests

All PRs must:

* pass all checks before they will be considered for review
* have proper title and description
* have at least one screenshot if the changeset leads to visual difference

## Branching strategy

Inherits the process from [https://nvie.com/posts/a-successful-git-branching-model/](https://nvie.com/posts/a-successful-git-branching-model/)

Good branch names: :sun\_with\_face:

* `nice-kebab-cased-titles`
* `fixes-footer-links`
* `4411290-setup-state-management-integration`
* `feature/new-design`
* `hotfix/db-connection`
* `release-1.2.3`

Bad branch names: :partly\_sunny:

* `patch-1` - not enough context
* `camelCasedBranchNames` - camel case
* `PascalCasedBranchNames` - pascal case
* `long-titles-above-80-chars-{.....}` - too long
* `#58/something` - shell understands it as comment

| Branching model | Merges |
| :--- | :--- |
| ![](https://nvie.com/img/git-model@2x.png) | ![](https://nvie.com/img/merge-without-ff@2x.png) |

## React guidelines

### Imports

A common way to sort the imports in the file is by their source: `external`, `absolute`, `relative` separated by an empty line. Each of those groups can be sorted by line length, but that's not super important.

```text
import React, { useState } from 'react'
import { useTranslation } from 'next-i18next'

import Nav from 'components/layout/Nav'
import Layout from 'components/layout/Layout'

import SimpleForm from './SimpleForm'
import styles from './advanced.module.scss'
```

### File structure

Inherits AirBnb naming convention [https://github.com/airbnb/javascript/tree/master/react\#naming](https://github.com/airbnb/javascript/tree/master/react#naming)

Use PascalCase for React components and camelCase for their instances

#### Naming convention react components

Pascal cased file names `src/components/GenericForm.tsx`

```text
export default function GenericForm() {}
```

Filename and default component of the file should have the same name.

#### Naming convention non react components

Camel cased file names `src/utils/hooks/useUser.ts`

#### Naming convention folders

Lowercase kebab cased folders `src/components/common/password-reset/ResetForm.tsx`

#### Naming convention pages

Lowercase kebab cased files located in `src/pages/sample-page.tsx` which correspond to `/sample-page` url.

### Types

The common convention is that the main type of the component's props is called after the component itself with suffic `-Props`. Prop types of `AdvancedForm` becomes `AdvancedFormProps`.

```text
type AdvancedFormProps = React.PropsWithChildren({
  title?: string
  age?: number
})

export default function AdvancedForm({ title = 'Nice', children, age }: AdvancedFormProps) {
  return (
    <div title={title} data-age={age}>
      {children}
    </div>
  )
}
```

### Components

#### Preferred export style :sun\_with\_face

* Nice IDE support and readability

```text
export default function RegisterPage() {
  return <div>page</div>
}
```

#### Alternative export styles

* Named function

  :partly\_sunny: Allows attaching static props to the function

  ```text
  function RegisterPage() {
    return <div>page</div>
  }

  Register.getInitialProps = async (ctx) => {
    return { stars: 128 }
  }

  export default RegisterPage
  ```

* Const arrow function

  :sun\_with\_face: Nice for locally defined components

  ```text
  const RegisterForm = () => <form>page</form>

  export default function RegisterPage() {
    return <RegisterForm />
  }
  ```

  :partly\_sunny: Okay for default exports, but not preferred

  ```text
  const RegisterPage = () => <form>page</form>

  export default RegisterPage
  ```

* Unnamed arrow function :cloud\_with\_lightning\_and\_rain:

  **Discouraged**

  [https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/display-name.md](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/display-name.md)

  ```text
  export default () => <div>page</div>
  ```

* Class components :cloud\_with\_lightning\_and\_rain:

  **Discouraged** as hooks cannot be used inside the class components

  ```text
  class Page extends React.Component {
    render() {
      return <div>page</div>
    }
  }
  ```

### Styles

There are three common ways to style a component:

#### Styles using the [`<Box />` component](https://material-ui.com/components/box/)

Single component that inherits all sizing props from MUI [https://material-ui.com/system/basics/\#all-inclusive](https://material-ui.com/system/basics/#all-inclusive)

:sun\_with\_face: Nice for quick layouts that should follow the theme

```text
<Box component="nav" px={5} mt={2}>
  <a>{t('nav.forgottenPassword')}</p>
</Box>
```

:partly_sunny: Not the best for custom scenarios with more than \_six_ props passed to it. **Use `hooks` instead**

:partly_sunny: Not nice when the children have clear nesting structure of more than \_three_ levels. **Use `hooks` or `scss` instead**

```text
<Box component="nav" px={5} pb={12} mt={2} mb={4} lineHeight={2} letterSpacing={none} fontSize={20}>
  <Box component="span" px={5} pb={12} mt={2} mb={4} lineHeight={2} letterSpacing={none} fontSize={17}>
    <a>{t('nav.forgottenPassword')}</p>
  </Box>
  <Box component="span" px={5} pb={12} mt={2} mb={4} lineHeight={2} letterSpacing={none} fontSize={13}>
    <a>{t('nav.forgottenPassword')}</p>
  </Box>
</Box>
```

#### Styles using `useStyles()` hook

:sun\_with\_face: Nice for very specific styling that levereges `theme` methods and props

```text
const useStyles = makeStyles((theme) =>
  createStyles({
    pageTitle: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: theme.spacing(4),
      margin: theme.spacing(5, 3, 4),
      color: theme.palette.secondary.main,
      backgroundColor: theme.palette.primary.main,
      '&:hover': {
        color: theme.palette.secondary.dark,
      },
    },
    // ...
  }),
)

export default function SomeBox() {
  const classes = useStyles()
  return (
    <Box className={classes.pageTitle}>
      <p>{t('nav.forgottenPassword')}</p>
    </Box>
  )
}
```

:partly\_sunny: Too verbose for simple use cases, if it contains less than 2 css rules. **Use `Box` instead**

:partly\_sunny: Not the best when dealing with stlying of deep nested structures within the same component. **Use `scss` instead**

#### Styles using SCSS files

Next.js supports [SCSS](https://sass-lang.com/) out of the box. Read more at [https://nextjs.org/docs/basic-features/built-in-css-support\#sass-support](https://nextjs.org/docs/basic-features/built-in-css-support#sass-support)

File convention is based on a suffix `.module.scss` \(ex. `about.module.scss`\)

:sun\_with\_face: Nice when dealing with complex nested structures that are scoped in a single component. When dealing with sub-components we're not sure if some of the rules will be left unused.

```css
@import 'styles/variables';

.page {
  color: $text-color;

  .nav {
    background-color: $nav-color;

    a {
      text-decoration: none;
      text-transform: uppercase;
    }
  }
}
```

```text
import styles from './about.module.scss'
;<Box className={styles.page}>
  <p>{t('nav.forgottenPassword')}</p>
</Box>
```

:partly\_sunny: Too verbose for simple use cases, if it contains less than 2 css rules in a dedicated file. **Use `Box` instead**

```css
@import 'styles/variables';

a {
  text-decoration: none;
}
```

:cloud\_with\_lightning\_and\_rain: Cannot use theme support or theme variables **Use `hook` instead**

## Translations \(i18n\)

### Translation namespaces

Default namespace is called `common` and contains translations used on _all pages_ \(Layout, Nav, etc\) and is stored at `frontend/public/locales/{locale}/common.json`

Namespaces \(scopes, domains\) are stored in separate json files at `frontend/public/locales/{locale}/{namespace}.json` One namespace can combine the translations keys from several pages with common reusable strings ex. `auth` scope collects keys for `login` and `register` pages.

### Translation keys

It is preferred to use [kebab-case](https://en.wiktionary.org/wiki/kebab_case) for translation keys and extract another level of nesting when the common prefix of the keys is above 3 or makes sense to be separated as new keys might be added in the future.

* Namespace is separated with `:`
* Translation nesting levels are separated with `.`
* Words in a translation key are separated with `-`

`domain:pages.nested-level.another-nested-level.translation-key`

```javascript
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
      "instructions": "To reset your password, please type your email address below.",
      "greeting": "Hello {{name}}!"
    }
  }
}
```

### Usage in React

Usage of translation hook `useTranslation` is preferred over usage of `<Trans />` component, whenever possible.

#### Usage in components

```text
import { useTranslation } from 'next-i18next'

export default function CustomComponent() {
  const { t } = useTranslation()

  return (
    <div>
      <h1>{t('nav.custom-page')}</h1>
      <h2>{t('auth:pages.forgotten-password.greeting', { name: 'Interpolation' })}</h2>
      <p>{t('auth:pages.forgotten-password.instructions')}</p>
    </div>
  )
}
```

#### SSR preloading i18n in pages

```text
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Page from 'components/forgottenPassword/ForgottenPasswordPage'

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'bg', ['common', 'auth'])), // List used namespaces
  },
})

export default Page
```

## Recognizing contributions

We're integrated with [https://allcontributors.org/](https://allcontributors.org/) bot

Comment on [this issue](https://github.com/daritelska-platforma/frontend/issues/2), asking @all-contributors bot to add a contributor:

```text
@all-contributors please add @<username> for <contributions>
```

`<contribution>`: See the [Emoji Key \(Contribution Types Reference\)](https://allcontributors.org/docs/en/emoji-key) for a list of valid contribution types.

