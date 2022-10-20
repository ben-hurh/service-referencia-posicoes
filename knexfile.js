const { databases } = require('./.env')
module.exports = {
  client: databases.dbApplication.driver,
  connection: databases.dbApplication.db,
  pool: databases.dbApplication.pool,
  debug: databases.dbApplication.debug,
  migrations : databases.dbApplication.migrations,
  seeds: databases.dbApplication.seeds,
};