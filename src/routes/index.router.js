const express = require("express");
const router = express.Router();

router.get("/checkstatus", (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "api ok",
  });
});

router.get("/api/users", (req, res, next) => {
  res.status(200).json({
    status: "success api",
    message: "api ok",
    metadata: [
      {
        name: "Benjamin",
        age: 21,
      },
      {
        name: "Hanry",
        age: 30,
      },
      {
        name: "Linda",
        age: 16,
      },
    ],
  });
});

module.exports = router;
