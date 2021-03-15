const express = require("express");
const path = require("path");
const util = require("util");
const fs = require("fs"); 
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

app.listen(PORT,()=> console.log(`Listening on PORT : ${PORT}`));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));




app.get("/api/notes", (req, res) =>
    notes.getNotes()
    .then(notes => res.json(notes))
    .catch(err => res.status(500).json(error))
);
app.post("/api/notes",  (req, res) =>
    notes.addNotes(req.body)
    .then(notes => res.json(notes))
    .catch(err => res.status(500).json(error))
);
app.delete("/api/notes/:id",  (req, res) =>
    notes.removeNote(req.params.id)
    .then(() => res.json({ok: true}))
    .catch(err => res.status(500).json(error))
);
