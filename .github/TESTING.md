# Test Github Actions

Run your GitHub Actions locally with `act`

- <https://github.com/nektos/act>

## Installation

Via Brew

```shell
brew install act
```

Via Bash

```shell
curl https://raw.githubusercontent.com/nektos/act/master/install.sh | sudo bash
```

## Testing

```shell
./bin/act.sh --insecure-secrets -W .github/workflows-test/ --env-file=.env.dev -j deploy-run
```
