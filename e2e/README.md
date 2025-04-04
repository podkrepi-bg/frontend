# End-to-end testing

## Playwright

- <https://playwright.dev/>

## Running tests

E2e tests are automated and running on every PR in Github Actions. [Link to the workflow](https://github.com/podkrepi-bg/frontend/blob/29b49f438541fa9254829a494e388202034b274d/.github/workflows/playwright.yml)

### Run all test suites

```shell
yarn test:e2e
```

### For more options:

```shell
$ yarn test:e2e --help

Run tests with Playwright Test

Options:
--browser <browser>          Browser to use for tests, one of "all", "chromium", "firefox" or "webkit" (default: "chromium")
--headed                     Run tests in headed browsers (default: headless)
--debug                      Run tests with Playwright Inspector. Shortcut for "PWDEBUG=1" environment variable and "--timeout=0 --maxFailures=1 --headed --workers=1" options
-c, --config <file>          Configuration file, or a test directory with optional "playwright.config.ts"/"playwright.config.js"/"playwright.config.mjs"
--forbid-only                Fail if test.only is called (default: false)
--fully-parallel             Run all tests in parallel (default: false)
-g, --grep <grep>            Only run tests matching this regular expression (default: ".*")
-gv, --grep-invert <grep>    Only run tests that do not match this regular expression
--global-timeout <timeout>   Maximum time this test suite can run in milliseconds (default: unlimited)
-j, --workers <workers>      Number of concurrent workers, use 1 to run in a single worker (default: number of CPU cores / 2)
--list                       Collect all the tests and report them, but do not run
--max-failures <N>           Stop after the first N failures
--output <dir>               Folder for output artifacts (default: "test-results")
--quiet                      Suppress stdio
--repeat-each <N>            Run each test N times (default: 1)
--reporter <reporter>        Reporter to use, comma-separated, can be "list", "line", "dot", "json", "junit", "null", "github", "html" (default: "list")
--retries <retries>          Maximum retry count for flaky tests, zero for no retries (default: no retries)
--shard <shard>              Shard tests and execute only the selected shard, specify in the form "current/all", 1-based, for example "3/5"
--project <project-name...>  Only run tests from the specified list of projects (default: run all projects)
--timeout <timeout>          Specify test timeout threshold in milliseconds, zero for unlimited (default: 30000)
-u, --update-snapshots       Update snapshots with actual results (default: only create missing snapshots)
-x                           Stop after the first failure
-h, --help                   display help for command
```

### Run test suites in headed mode with enabled debug

```shell
yarn test:e2e --headed --debug -x -g support
```

### Tests with Authenticated user

### Writing

To auth a user we rely on the Storage where the session is stored. And the storage is filled in and accessed via a `test.extend` [fixture](https://playwright.dev/docs/auth#authenticate-with-api-request). It takes care to login and store the session and then use it in the tests. See the `e2e/utils/fixtures.ts` file

This is the process for writing tests for auth user.

- import the desired user `test` from the fixture

  `import { expect, giverTest as test } from '../../../utils/fixtures'` for the `giver` user

- write your e2e tests ...

> [Examples] `e2e/tests/regression/campaign-application/campaign-application-giver.spec.ts` and `e2e/tests/regression/campaign-application/campaign-application-admin.spec.ts`

### Running

- [Locally] run the 'docker compose -d keycloak pg-db', the api (`yarn dev` in the api repo folder), the app (`yarn dev` in the frontend repo folder),
- in the `frontend/e2e` folder run `yarn e2e:tests --ui` to start the playwright visual testing tool
