const express = require("express");
const router = express.Router();
const { Pool } = require("pg");
const pool = new Pool({
  user: "postgres",
  host: "benjamin-database-postgres.czccwe4oeg4q.ap-southeast-1.rds.amazonaws.com",
  password: "12345678",
  port: 5432,
});

router.get("/checkstatus", (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "api ok",
  });
});

router.get("/api/users", async (req, res, next) => {
  try {
    const userData = await pool.query("SELECT * FROM users");

    res.status(200).json({
      status: "success api",
      message: "api ok",
      metadata: userData,
    });
  } catch (error) {
    console.log("query user table meet errors", error);
  }
});

module.exports = router;
