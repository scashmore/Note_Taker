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


app.post('/api/notes', (req, res) => {
    function Note(title, text) {
        this.title = title;
        this.text = text;
    };
    const newNote = new Note(title, text);
    return this.util.promisify(fs.readFile("db/db.json", "utf8"))
    .then(getNote => {
        let arr; 
        try {
            arr = [].concat(JSON.parse(getNote));
        }
        catch (error) {
            arr = [];
        }
        return arr;
    })
    .then(note => [...note, newNote])
    .then(update => this.util.promisify(fs.writeFile("db/db.json", JSON.stringify(update))))
    .then (() => newNote)
});

app.get('/api/notes', (req, res) => {
    return this.util.promisify(fs.readFile("db/db.json", "utf8"))
    .then(getNote => {
        let arr; 
        try {
            arr = [].concat(JSON.parse(getNote));
        }
        catch (error) {
            arr = [];
        }
        return arr;
    })
});

app.delete('/api/notes', (req, res) => {

});