const express = require('express')
const app = express()
const port = 8080

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/home', (req, res) => {
    res.redirect('http://localhost:8081');
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})