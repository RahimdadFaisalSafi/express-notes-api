const express = require('express')
const app = express()

app.use(express.json());
port = 3000

notes = [{
    note: 'JavaScript makes sence',
    author: 'Rahimdad Faisal Safi',
    date: '15.01.2025'
}]
app.get ('/', (req, res) => {
    res.send("Welcome to Note API")
})

app.get('/notes', (req, res) => {
    res.json(notes)
})

app.get('/notes/:id', (req, res) => {
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
})

app.post('/notes', (req, res) => {
    let note = req.body
    notes.push(note)
    res.send('Note has been stored')

})
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})
