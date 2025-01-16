const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config();

const port = process.env.NOTES_APP_PORT;

let notes = [
  {
    id: 1,
    note: "JavaScript makes sence",
    author: "Rahimdad Faisal Safi",
    date: new Date(),
  },
  {
    "id": 2,
    "note": "Python is amazing",
    "author": "Safi",
    "date": new Date()
}
];
app.get("/", (req, res) => {
  res.send("Welcome to Note API");
});

app.get("/notes", (req, res) => {
  res.json(notes);
});

app.get("/notes/:id", (req, res) => {
  let id = parseInt(req.params.id);
  console.log(id)
  let targetNote = null
  if (isNaN(id)) {
    res.status(404).send("ID Not Found");
    return;
  }

  notes.forEach((note) => {
    if (note.id === id) {
      targetNote = note;
    }
  })
  
  if(targetNote === null){
    res.json(targetNote);
    return;
  } else {
    res.status(404).json(targetNote);
    return;
  }
});

app.post("/notes", (req, res) => {
  const lastId = notes[notes.length - 1].id;
  console.log(req.body.note)
  const newNote = {
    id: lastId + 1,
    note: req.body.note,
    author: req.body.author,
    date: new Date(),
  };
  
  notes.push(newNote);
  res.send("Note has been stored");
});

app.put("/notes/:id", (req, res) => {
  let id = parseInt(req.params.id);
  let targetNote = null;
  
  if(isNaN(id)){
    res.statusCode(404).send("ID Not Found")
  }

  notes.forEach((note) => {
    if(note.id === id){
      targetNote = note;
    }
  })

  if(targetNote !== null){
    targetNote.note = req.body.note;
    targetNote.author = req.body.author;
    targetNote.date = new Date();

    res.send(`Note With ID ${id} has been updated`);
    return;
  } else {
    res.status(404).send("Something went wrong!");
    return;
  }
});

app.delete("/notes/:id", (req, res) => {
  let id = parseInt(req.params.id);
  if (isNaN(id)){
    res.status(404).send("ID Not Found");
    return;
  }

  notes = notes.filter((note) => note.id !== id);
  res.send(`Note With ID ${id} has been deleted`);
  return;
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
