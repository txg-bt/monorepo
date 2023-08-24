const { pool } = require("../database/database");
const router = require("express").Router();

router.post("/", async (req, res) => {
  try {
    const { route, statusCode, message, userId, appName, timestamp } = req.body;

    await pool.query(
      "INSERT INTO logs (route, status_code, message, user_id, app_name, timestamp) VALUES ($1, $2, $3, $4, $5, $6)",
      [route, statusCode, message, userId, appName, new Date(timestamp)]
    );

    return res.status(200).json({ message: "Log created successfully." });
  } catch (err) {
    console.log(err.message);

    return res.status(500).send(err.message);
  }
});

module.exports = router;
