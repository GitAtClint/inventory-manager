require("dotenv").config();
//const connectionString = process.env.DB_CONNECTION_STRING;

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  compose: {
    client: "pg",
    connection: {
      host: "db",
      port: "5432",
      user: "postgres",
      password: "docker",
      database: "inventory_db",
    },
  },

  development: {
    client: "pg",
    connection: {
      host: "127.0.0.1",
      port: "5432",
      user: "postgres",
      password: "docker",
      database: "inventory_db",
    },
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "inventory_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  production: {
    client: "postgresql",
    connection: {
      database: "inventory_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};

// module.exports = {
//   compose: {
//     client: "pg",
//     connection: {
//       host: "db",
//       port: "5432",
//       user: "postgres",
//       password: "docker",
//       database: "inventory_db",
//     },
//   },

//   development: {
//     client: "pg",
//     connection: {
//       host: "127.0.0.1",
//       port: "5432",
//       user: "postgres",
//       password: "docker",
//       database: "inventory_db",
//     },
//   },

//   staging: {
//     client: "postgresql",
//     connection: {
//       database: "inventory_db",
//       user: "username",
//       password: "password",
//     },
//     pool: {
//       min: 2,
//       max: 10,
//     },
//     migrations: {
//       tableName: "knex_migrations",
//     },
//   },

//   production: {
//     client: "postgresql",
//     connection: {
//       database: "inventory_db",
//       user: "username",
//       password: "password",
//     },
//     pool: {
//       min: 2,
//       max: 10,
//     },
//     migrations: {
//       tableName: "knex_migrations",
//     },
//   },
// };