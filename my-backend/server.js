// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Client } = require("pg");
require("dotenv").config();

const app = express();
const port = 5000;

const client = new Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

client.connect();

app.use(cors());
app.use(bodyParser.json());

// Routes
app.get("/api/data", async (req, res) => {
  try {
    const result = await client.query("SELECT * FROM personal");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

app.post("/api/data", async (req, res) => {
  const { name, age, nickname, date } = req.body;
  try {
    console.log(req.body);
    await client.query(
      "INSERT INTO personal (name, age, nickname, date) VALUES ($1, $2, $3, $4)",
      [name, age, nickname, date]
    );
    res.status(201).send("Data added");
  } catch (err) {
    console.error("Error inserting data:", err.message);
    res.status(500).send("Server error");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
