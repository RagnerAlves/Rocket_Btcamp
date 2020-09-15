const express = require('express')

const app = express()

app.get('/projects', (request, response) => {
    return response.json([
        'Projeto 1',
        'Projeto 2',
        'Projeto 3',
    ])
})

app.post('/projects', (resquest, response) => {
    return response.json([
        'Projeto 1',
        'Projeto 2',
        'Projeto 4',
        'Projeto 5',
    ])
})

app.put('/projects:id', (request, response) => {
    return response.json([
        'Projeto 1',
        'Projeto 2',
        'Projeto 4',
        'Projeto 5',
    ])
})

app.delete('/projects:id', (request, response) => {
    return response.json([
        'Projeto 2',
        'Projeto 4',
    ])
})

app.listen(3335, () => {
    console.log('Back-end started!')
})