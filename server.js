const express = require("express");
const path = require("path");
const util = require("util");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.listen(PORT, () => console.log(`Listening on PORT : ${PORT}`));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));


app.post('/api/notes', (req, res) => {
    const newNote = {
        title: req.body.title,
        text: req.body.text,
        id: req.body.id
    };
    const notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    newNote.id = (notes.length).toString();
    const newArray = [...notes, newNote];
    fs.writeFileSync("./db/db.json", JSON.stringify(newArray));
    res.sendStatus(200);
});

app.get('/api/notes', (req, res) => {
    const notes = fs.readFileSync("db/db.json", "utf8");
    res.json(JSON.parse(notes));
});

app.delete('/api/notes/:id', (req, res) => {
    const notes = fs.readFileSync("db/db.json", "utf8");
    const noteId = JSON.parse(req.params.id)
    let newId = 0;
    deleteNote = notes.filter(notes => {
        return notes.id != noteId;
    })
    
    for (selectedNote of deleteNote) {
        selectedNote.id = newId.toString();
        newId++;
    }

    fs.writeFileSync("./db/db.json", JSON.stringify(deleteNote));
    res.json(JSON.parse(deleteNote));
});