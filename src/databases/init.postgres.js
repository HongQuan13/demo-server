const knex = require("knex")({
  client: "pg",
  connection: {
    host: "benjamin-database-postgres.czccwe4oeg4q.ap-southeast-1.rds.amazonaws.com",
    port: 5432,
    user: "postgres",
    password: "12345678",
    database: "benjamin-database-postgres",
  },
});

knex
  .raw("SELECT version()")
  .then(() => {
    console.log("Knex connection successful");
  })
  .catch((err) => {
    console.error("Error connecting to Knex:", err);
  })
  .finally(() => {
    knex.destroy(); // Close the Knex connection
  });
