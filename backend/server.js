const pool = require("./db");

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/tasks", async (req, res) => {
  try {
    const listedItems = await pool.query("SELECT * FROM tasks");
    res.json(listedItems.rows);
  } catch (err) {
    console.log(err.message);
  }
});

app.post("/tasks", async (req, res) => {
  try {
    const { description } = req.body;
    const newTasks = await pool.query(
      "INSERT INTO tasks (description) VALUES ($1) returning *",
      [description],
    );
    res.json(newTasks.rows[0]);
  } catch (err) {
    res.json(err.message);
  }
});

app.put("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;

    await pool.query("UPDATE tasks set description = $1 WHERE listID = $2", [
      description,
      id,
    ]);
    res.json("Edit complete");
  } catch (err) {
    res.json(err.message);
  }
});

app.delete("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query("DELETE FROM tasks where listID = $1", [id]);
    res.json("deleted");
  } catch (err) {
    res.json(err.message);
  }
});

app.listen(5000, () => {
  console.log("server open");
});
