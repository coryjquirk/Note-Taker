// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const fs = require("fs");


// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

var notes = [
  {
    title: "text1",
    text: "title1",
    id: 0
  },
  {
    title: "title2",
    text: "text2",
    id: 1
  },
  {
    title: "title3",
    text: "text3",
    id: 2
  }
];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  
  // Create New Notes - takes in JSON input
app.post("/api/notes", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newnote = req.body;
  console.log(newnote);
  // We then add the json the user sent to the note array
  notes.push(newnote);
  // We then display the JSON to the users
  res.json(newnote);
});

// Displays all notes
app.get("/api/notes", function(req, res) {
  return res.json(notes);
});

// Displays a single note, or returns false
app.get("/api/notes/:note", function(req, res) {
  var chosen = req.params.notes;
  for (var i = 0; i < notes.length; i++) {
    if (chosen === notes[i].routeName) {
      return res.json(notes[i]);
    }
  }
  console.log(res)
  return res.json(false);
});

app.delete('/api/notes/:id', function (req, res) {
  const newArray = JSON.stringify(notes);
  delete newArray[1];
  // const idHere=noteJSON.id;
  // delete idHere;
  // console.log(notes[1].id)
})
