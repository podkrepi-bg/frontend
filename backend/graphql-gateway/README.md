# Podkrepi.bg graphql-gateway
The module is the GraphQL gateway used by Podkrepi.bg

## Configuration
The configuration settings for the GraphQL gateway are set via environmental variables. Each of them is described in the table below.

| Setting             | Description                                           | Default value |
|---------------------|-------------------------------------------------------|---------------|
| ACCOUNT_SERVICE_URL | The URL to the gRPC service that is service accounts. | -             |
| PORT                | The port to which the graphql-gateway should bind.    | -             |

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