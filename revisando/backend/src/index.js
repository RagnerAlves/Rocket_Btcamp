const express = require('express')

const app = express()

app.get('/projects', (request, response) => {
    return response.json({message: 'Hello GoStack'})
})

app.listen(3335, () => {
    console.log('Back-end started!')
})