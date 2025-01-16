const express = require("express");
const app = express();

app.use(express.json());
require("dotenv").config();
const port = process.env.NOTES_APP_PORT;

let notes = [
  {
    note: "JavaScript makes sence",
    author: "Rahimdad Faisal Safi",
    date: "15.01.2025",
  },
];
app.get("/", (req, res) => {
  res.send("Welcome to Note API");
});

app.get("/notes", (req, res) => {
  res.json(notes);
});

app.get("/notes/:id", (req, res) => {
  let id = parseInt(req.params.id);

  if (isNaN(id) || id <= 0) {
    return res.status(404).send("ID Not Found");
  }

  id -= 1;

  if (id in notes) {
    return res.json(notes[id]);
  } else {
    return res.status(404).send("ID Not Found");
  }
});

app.post("/notes", (req, res) => {
  let note = req.body;
  notes.push(note);
  res.send("Note has been stored");
});

app.put("/notes/:id", (req, res) => {
  let id = parseInt(req.params.id);
  console.log(id);
  let note = req.body;
  if (isNaN(id) || id <= 0) return res.status(404).send("ID Not Found");
  id -= 1;
  if (id in notes) {
    notes[id] = note;
    return res.send(`Note With ID ${id} has been updated`);
  } else {
    return res.status(404).send("ID Not Found");
  }
});

app.delete("/delete/:id", (req, res) => {
  let id = parseInt(req.params.id);
  console.log(id);
  let note = req.body;
  if (isNaN(id) || id <= 0) return res.status(404).send("ID Not Found");
  id -= 1;
  if (id in notes) {
    delete notes[id];
    return res.send(`Note With ID ${id} has been deleted`);
  } else {
    return res.status(404).send("ID Not Found");
  }
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
