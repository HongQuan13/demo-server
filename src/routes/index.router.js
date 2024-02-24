const express = require("express");
const router = express.Router();
const { Pool } = require("pg");
const mysql = require("mysql2/promise");
const {
  initDatabase,
  fetchAllUsers,
  addUser,
} = require("../databases/init.mysql");
const { BadRequestError } = require("../core/error.response");

router.get("/checkstatus", (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "api ok",
  });
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
    next(error);
  }
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
    next(error);
  }
});

router.get("/addUser", async (req, res, next) => {
  try {
    const { name, age, job } = req.params;
    if (!name | !age | !job) {
      throw new BadRequestError("Attribute missing of user");
    }
    const newUser = await addUser(name, age, job);

    res.status(200).json({
      status: "Success",
      message: "Create a new user successfully",
      metadata: newUser,
    });
  } catch (error) {
    console.log("Internal Error", error);
    next(error);
  }
});

module.exports = router;
