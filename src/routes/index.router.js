const express = require("express");
const router = express.Router();

router.get("/checkstatus", (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "api ok",
  });
});

router.get("/api/users", async (req, res, next) => {
  try {
    const userData = await pool.query("SELECT * FROM users");
    console.log(userData, "userData");

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
