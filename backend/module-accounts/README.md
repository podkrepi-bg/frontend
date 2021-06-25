# Podkrepi.bg accounts
The module accounts module used by Podkrepi.bg

_TODO: The module is currently just a mock and does not implement any real logic._

## Configuration
The configuration settings for the accounts are set via environmental variables. Each of them is described in the table below.

| Setting             | Description                                           | Default value |
|---------------------|-------------------------------------------------------|---------------|
| PORT                | The port to which the accounts module should bind.    | -             |

## Development
The module is configured to use [Visual Studio Code](https://code.visualstudio.com/download)'s [Remote Containers extension](https://code.visualstudio.com/docs/remote/containers).
 - Make sure you have the extension installed
 - Open the folder of the module in VS Code
 - Hit `Ctrl`/`Cmd` + `Shift` + `P` -> Remote-Containers: Reopen Folder in Container

Linting:
```bash
task lint
```

Building:
```bash
task build
```

Watch task that will re-build and run the module as the Go files are modified:
```bash
task watch
```