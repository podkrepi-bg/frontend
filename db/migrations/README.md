# Database Requirements
![](https://img.shields.io/badge/Postgresql-v13.0%20or%20higher-green)


# DB Migrations

- [Flyway](https://flywaydb.org/documentation/)
- <https://flywaydb.org/documentation/concepts/migrations#sql-based-migrations>

## Rules of migrations

Migrations are being executed by reading the directory `/db/migrations/<schema name>` recursively.

At the moment we're working in a single database called `app` with dedicated schema per microservice.

Each microservice schema is being versioned in dedicated directory and migrations are prefixed accordingly.

| Microservice                 | Schema     | Migrations dir             | Prefix     |
| ---------------------------- | ---------- | -------------------------- | ---------- |
| Init                         | -          | `./db/migrations/_init`    | `V1.x.y.z` |
| General purpose / Versioning | `app`      | `./db/migrations/app` | `V3.x.y.z` |
| Campaigns                    | `campaign` | `./db/migrations/campaign` | `V4.x.y.z` |
| Contacts                     | `contacts`  | `./db/migrations/contacts`  | `V2.x.y.z` |

### Migration file naming convention

The file name consists of the following parts:

1. `Prefix`:

   - `V` for **V**ersioned
   - `U` for **U**ndo
   - `R` for **R**epeatable migrations

1. `Version`: Version with dots or underscores separate as many parts as you like (Not for repeatable migrations)

   - 1
   - 001
   - 5.2
   - 1.2.3.4.5.6.7.8.9
   - 205.68
   - 1617490606
   - 20210404113556
   - 2021.4.04.11.35.56
   - 2021.04.04.11.35.56

1. `Separator`: `__` (two underscores)
1. `Description`: Underscores word separators (`snake_case`) with prefix of changeset summary
1. `Suffix`: `.sql`

### Description naming convention

- `fn_` functions
- `table_` tables
- `trg_` table triggers
- `seq_` sequences
- `schema_` schemas
- `role_` roles
- `rls_` row-level security
- `grant_` grants
- `extension_` extensions
- `domain_` domains
- `data_` predefined inserts into tables
- `view_` views

## Command line execution

### CLI Info

```shell
docker-compose run --rm flyway help

docker-compose run --rm flyway info

+-----------+---------+------------------------------+--------+---------------------+---------+
| Category  | Version | Description                  | Type   | Installed On        | State   |
+-----------+---------+------------------------------+--------+---------------------+---------+
|           |         | << Flyway Schema Creation >> | SCHEMA | 2021-04-03 23:12:54 | Success |
| Versioned | 1.0.0.1 | db                           | SQL    | 2021-04-03 23:12:54 | Success |
| Versioned | 1.0.0.2 | schemas                      | SQL    | 2021-04-03 23:12:54 | Success |
| Versioned | 2.0.0.1 | table contacts               | SQL    | 2021-04-03 23:12:54 | Success |
| Versioned | 3.0.0.1 | table users                  | SQL    | 2021-04-03 23:12:55 | Success |
| Versioned | 4.0.0.1 | table campaigns              | SQL    | 2021-04-03 23:12:55 | Success |
+-----------+---------+------------------------------+--------+---------------------+---------+
```

### Deploy

```shell
docker-compose run --rm flyway migrate

docker-compose run --rm flyway validate
```

### Clean database

:warning: Destructive action! :warning:

<https://flywaydb.org/documentation/command/clean>

```shell
docker-compose run --rm flyway clean
```
