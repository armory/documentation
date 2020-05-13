---
layout: post
title: Orca with RDBMS
order: 48
redirect_from:
  - /spinnaker_install_admin_guides/orca-sql/
---
{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

By default, Orca (the task orchestration service) uses Redis as its backing store. You can now configure Orca to use a relational database to store its pipeline execution. The main advantage of doing so is a gain in performance and the removal of Redis as a single point of failure.

Armory recommends MySQL 5.7. For AWS, you can use Aurora.

## Base Configuration

You can find a complete description of the options in the [open source documentation](https://www.spinnaker.io/setup/productionize/persistence/orca-sql/).

SQL can be configured by adding the following snippet to `SpinnakerService` manifest under `spec.spinnakerConfig.profiles.orca` if using the Operator, or to `<HALYARD>/<DEPLOYMENT>/profiles/orca-local.yml` if using Halyard:

```yaml
sql:
  enabled: true
  connectionPool:
    jdbcUrl: jdbc:mysql://<DB CONNECTION HOSTNAME>:<DB CONNECTION PORT>/<DATABASE NAME>
    user: orca_service
    password: <orca_service password>
    connectionTimeout: 5000
    maxLifetime: 30000
    maxPoolSize: 50
  migration:
    jdbcUrl: jdbc:mysql://<DB CONNECTION HOSTNAME>:<DB CONNECTION PORT>/<DATABASE NAME>
    user: orca_migrate
    password: <orca_migrate password>

# Ensure we're only using SQL for accessing execution state
executionRepository:
  sql:
    enabled: true
  redis:
    enabled: false

monitor:
  activeExecutions:
    redis: false
```

## Initial Run

Once you've provisioned your RDBMS and ensured connectivity from Spinnaker, you'll need to create the database. You can skip this step if you create the database during provisioning - for instance with Terraform:

```sql
CREATE SCHEMA `orca` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Grant authorization to the `orca_service` and `orca_migrate` users:

```sql

  GRANT
    SELECT, INSERT, UPDATE, DELETE, EXECUTE, SHOW VIEW
  ON `orca`.*
  TO 'orca_service'@'%';

  GRANT
    SELECT, INSERT, UPDATE, DELETE, CREATE, DROP, REFERENCES, INDEX, ALTER, LOCK TABLES, EXECUTE, SHOW VIEW
  ON `orca`.*
  TO 'orca_migrate'@'%';
```

The above configuration grants authorization from any host. You can restrict it to the cluster in which Spinnaker runs by replacing the `%` with the IP address of Orca pods from MySQL.

## Keeping existing execution history

The above configuration will point Orca to your database. 
You have the option to run a dual repository with the following in `profiles/orca-local.yml`:

```yaml
executionRepository:
  dual:
    enabled: true
    primaryClass: com.netflix.spinnaker.orca.sql.pipeline.persistence.SqlExecutionRepository
    previousClass: com.netflix.spinnaker.orca.pipeline.persistence.jedis.RedisExecutionRepository

  sql:
    enabled: true
  redis:
    enabled: true
```

However it won't migrate your existing execution history to your new database. This will make your spinnaker instance run on both the SQL and redis backend, it will only write the new execution on SQL but will continue to read the data on redis.
To migrate the data from Redis to SQL, you need to add the following

```yaml
pollers:
  orchestrationMigrator:
    enabled: true
    intervalMs: 1800000
  pipelineMigrator:
    enabled: true
    intervalMs: 1800000  # After how much time the migration process is going to start
```

Once everything has been migrated (you will see logs in the orca pod about the migration process) you can remove these settings.

<!-- ## Support for Other Relational Databases
<div class="alpha-warning">
  Database engines other than MySQL and its variants such as Aurora with MySQL are not currently officially supported.
</div>

To try a different database you can switch the JDBC URL and set the `dialect` in the properties:

```yaml
sql:
  enabled: true
  connectionPool:
    jdbcUrl: jdbc:<DRIVER>://<DB CONNECTION HOSTNAME>:<DB CONNECTION PORT>/<DATABASE NAME>
    dialect: <DIALECT VALUE>
    ...
  migration:
    jdbcUrl: jdbc:<DRIVER>://<DB CONNECTION HOSTNAME>:<DB CONNECTION PORT>/<DATABASE NAME>
    dialect: <DIALECT VALUE>
    ...
```

You can find the dialect below:

| Database       | Dialect Value   |
| ------------   | --------------- |
| MariaDB        | `MARIADB`       |
| MySQL          | `MYSQL` (default) |
| PostgreSQL     | `POSTGRES`      |
| PostgreSQL 9.3 | `POSTGRES_9_3`  |
| PostgreSQL 9.4 | `POSTGRES_9_4`  |
| PostgreSQL 9.5 | `POSTGRES_9_5`  | -->


## Database Maintenance

Each new version of Orca may potentially migrate the database schema. This is done with the `orca_migrate` user defined above.

Pipeline executions are saved to the database. Each execution can add between a few KBs to hundreds of KBs of data depending on the size of your pipeline.
It means that after a while, data will grow large and you'll likely want to purge older executions.

Note: We recommend saving past executions to a different data store for auditing purposes. You can do it in a variety of ways:
- During the purge, by marking, exporting, then deleting older records.
- By saving execution history from Echo's events and just delete older records from your database.



