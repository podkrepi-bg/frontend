# Podkrepi.bg graphql-gateway
The contact module used by Podkrepi.bg. The module requires a PostgreSQL-compliant database for storing the contact information.

## Configuration
The configuration settings for the contact module are set via environmental variables. Each of them is described in the table below.

| Setting     | Description                                                                                        | Default value             |
|-------------|----------------------------------------------------------------------------------------------------|---------------------------|
| APP_ADDR    | The address on which the module binds.                                                             | :5000                     |
| DB_HOST     | The database host.                                                                                 | roach-lb                  |
| DB_PORT     | The database port.                                                                                 | 26257                     |
| DB_USER     | The database user.                                                                                 | root                      |
| DB_PASS     | The database password.                                                                             | password                  |
| DB_NAME     | The database name                                                                                  | app                       |
| DB_SSL_MODE | Which type of secure connection to use: `disable`, `allow`, `prefer`, `require`, `verify-ca` or `verify-full`. | disable                   |
| DB_SSL_CA   | Path to the CA certificate, when sslmode is not `disable`.                                           | /certs/ca.crt             |
| DB_SSL_CERT | Path to the client certificate, when sslmode is not `disable`.                                       | /certs/client.dp_user.crt |
| DB_SSL_KEY  | Path to the client private key, when sslmode is not `disable`.                                       | /certs/client.dp_user.key |

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

Testing:
```bash
task test
```