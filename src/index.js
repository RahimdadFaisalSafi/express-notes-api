const express = require('express')
const app = express()
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

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})
