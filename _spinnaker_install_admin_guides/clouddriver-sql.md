---
layout: post
title: Clouddriver with RDBMS
order: 49
redirect_from:
  - /spinnaker_install_admin_guides/clouddriver-sql/
---
{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

Since version 2.5.x (OSS 1.14.x), Clouddriver can store its data (task, infrastructure, etc) in a MySQL compatible database. Similar to Orca, the main advantage of doing this is to improve performance and remove Redis as a single point of failure.

Armory recommends MySQL 5.7. For AWS, you can use Aurora.

## Base Configuration

You can find a complete description of the options in the [open source documentation](https://www.spinnaker.io/setup/productionize/persistence/clouddriver-sql/). 


## Database Setup
You can skip this step if you create the database during provisioning - for instance with Terraform.

Once you've provisioned your RDBMS and ensured connectivity with Spinnaker, you need to create the database:

```sql
CREATE SCHEMA `clouddriver` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Then we'll grant authorization to the `clouddriver_service` and `clouddriver_migrate` users:

```sql

  GRANT
    SELECT, INSERT, UPDATE, DELETE, CREATE, EXECUTE, SHOW VIEW
  ON `clouddriver`.*
  TO 'clouddriver_service'@'%';

  GRANT
    SELECT, INSERT, UPDATE, DELETE, CREATE, DROP, REFERENCES, INDEX, ALTER, LOCK TABLES, EXECUTE, SHOW VIEW
  ON `clouddriver`.*
  TO `clouddriver_migrate`@'%';
```

The above configuration grants authorization from any host. You can restrict it to the cluster in which Spinnaker runs by replacing the `%` with the IP address of Clouddriver pods from MySQL.

## Deployment

You have two options for deploying Clouddriver with MySQL: a simpler deployment, which involves downtime, or a three-step method that avoids downtime. Pick the method that best fits your requirements.

### Simple Deployment

If you are not worried about downtime or if Spinnaker is not currently executing any pipelines, you can run a simple deployment by adding the following snippet to `SpinnakerService` manifest under `spec.spinnakerConfig.profiles.clouddriver` if using the Operator, or to `<HALYARD>/<DEPLOYMENT>/profiles/clouddriver-local.yml` if using Halyard:

```yaml
sql:
  enabled: true
  taskRepository:
    enabled: true
  cache:
    enabled: true
    # These parameters were determined to be optimal via benchmark comparisons
    # in the Netflix production environment with Aurora. Setting these too low
    # or high may negatively impact performance. These values may be sub-optimal
    # in some environments.
    readBatchSize: 500
    writeBatchSize: 300
  scheduler:
    enabled: true
  connectionPools:
    default:
      # additional connection pool parameters are available here,
      # for more detail and to view defaults, see:
      # https://github.com/spinnaker/kork/blob/master/kork-sql/src/main/kotlin/com/netflix/spinnaker/kork/sql/config/ConnectionPoolProperties.kt
      default: true
      jdbcUrl: jdbc:mysql://your.database:3306/clouddriver
      user: clouddriver_service
      # password: depending on db auth and how spinnaker secrets are managed
    # The following tasks connection pool is optional. At Netflix, clouddriver
    # instances pointed to Aurora read replicas have a tasks pool pointed at the
    # master. Instances where the default pool is pointed to the master omit a
    # separate tasks pool.
    tasks:
      user: clouddriver_service
      jdbcUrl: jdbc:mysql://your.database:3306/clouddriver
  migration:
    user: clouddriver_migrate
    jdbcUrl: jdbc:mysql://your.database:3306/clouddriver

redis:
  enabled: false
  cache:
    enabled: false
  scheduler:
    enabled: false
  taskRepository:
    enabled: false
```


### No Downtime Deployment

To avoid downtime for your deployment, use the following three steps:

#### Step 1:  Warm up the cache
{:.no_toc}

The first step is to start a Clouddriver that is not accessible from other services to validate the installation and warm up the cache.

You can do it manually or by using the [following script](https://gist.github.com/ncknt/983bb800451f00b39401852fefde69bf). Make sure tables are properly created and being populated by these instances of Clouddriver.

#### Step 2:  Use MySQL to back new tasks
{:.no_toc}

After waiting a few minutes (from 2 to 10 minutes depending on how many accounts are connected), we'll update Spinnaker to use MySQL but remain aware of task statuses in Redis.

We're deploying Spinnaker with the following configuration in `SpinnakerService` manifest under the key `spec.spinnakerConfig.profiles.clouddriver` if using the Operator, or in `clouddriver-local.yml` if using Halyard:

```yaml
sql:
  enabled: true
  taskRepository:
    enabled: true
  cache:
    enabled: true
    # These parameters were determined to be optimal via benchmark comparisons
    # in the Netflix production environment with Aurora. Setting these too low
    # or high may negatively impact performance. These values may be sub-optimal
    # in some environments.
    readBatchSize: 500
    writeBatchSize: 300
  scheduler:
    enabled: true
  connectionPools:
    default:
      # additional connection pool parameters are available here,
      # for more detail and to view defaults, see:
      # https://github.com/spinnaker/kork/blob/master/kork-sql/src/main/kotlin/com/netflix/spinnaker/kork/sql/config/ConnectionPoolProperties.kt
      default: true
      jdbcUrl: jdbc:mysql://your.database:3306/clouddriver
      user: clouddriver_service
      # password: depending on db auth and how spinnaker secrets are managed
    # The following tasks connection pool is optional. At Netflix, clouddriver
    # instances pointed to Aurora read replicas have a tasks pool pointed at the
    # master. Instances where the default pool is pointed to the master omit a
    # separate tasks pool.
    tasks:
      user: clouddriver_service
      jdbcUrl: jdbc:mysql://your.database:3306/clouddriver
  migration:
    user: clouddriver_migrate
    jdbcUrl: jdbc:mysql://your.database:3306/clouddriver

redis:
  cache:
    enabled: false
  scheduler:
    enabled: false

dualTaskRepository:
  enabled: true
  primaryClass: com.netflix.spinnaker.clouddriver.sql.SqlTaskRepository
  previousClass: com.netflix.spinnaker.clouddriver.data.task.jedis.RedisTaskRepository
```

Note: At this point, you can stop the pods you created in step 1. If you used the script above, just delete the `spin-clouddriver-sql` deployment.

#### Step 3:  Remove Redis
{:.no_toc}

After waiting a few minutes so that Redis tasks are no longer relevant, we finish by removing Redis entirely:

```yaml
sql:
  enabled: true
  taskRepository:
    enabled: true
  cache:
    enabled: true
    # These parameters were determined to be optimal via benchmark comparisons
    # in the Netflix production environment with Aurora. Setting these too low
    # or high may negatively impact performance. These values may be sub-optimal
    # in some environments.
    readBatchSize: 500
    writeBatchSize: 300
  scheduler:
    enabled: true
  connectionPools:
    default:
      # additional connection pool parameters are available here,
      # for more detail and to view defaults, see:
      # https://github.com/spinnaker/kork/blob/master/kork-sql/src/main/kotlin/com/netflix/spinnaker/kork/sql/config/ConnectionPoolProperties.kt
      default: true
      jdbcUrl: jdbc:mysql://your.database:3306/clouddriver
      user: clouddriver_service
      # password: depending on db auth and how spinnaker secrets are managed
    # The following tasks connection pool is optional. At Netflix, clouddriver
    # instances pointed to Aurora read replicas have a tasks pool pointed at the
    # master. Instances where the default pool is pointed to the master omit a
    # separate tasks pool.
    tasks:
      user: clouddriver_service
      jdbcUrl: jdbc:mysql://your.database:3306/clouddriver
  migration:
    user: clouddriver_migrate
    jdbcUrl: jdbc:mysql://your.database:3306/clouddriver

redis:
  enabled: false
  cache:
    enabled: false
  scheduler:
    enabled: false
  taskRepository:
    enabled: false
```
