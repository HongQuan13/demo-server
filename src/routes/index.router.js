const express = require("express");
const router = express.Router();
const { Pool } = require("pg");
const mysql = require("mysql2/promise");
const { initDatabase, fetchAllUsers } = require("../databases/init.mysql");

router.get("/checkstatus", (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "api ok",
  });
});

router.get("/users", async (req, res, next) => {
  try {
    const userData = await fetchAllUsers();

    res.status(200).json({
      status: "Success",
      message: "Api ok",
      metadata: userData,
    });
  } catch (error) {
    console.log("Internal Error", error);
  }
});

router.get("/initDB", async (req, res, next) => {
  try {
    await initDatabase();
    res.status(200).json({
      status: "Success",
      message: "Init datatable successfully",
    });
  } catch (error) {
    console.log("Internal Error", error);
  }
});

module.exports = router;
