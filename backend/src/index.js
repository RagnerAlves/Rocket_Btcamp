const express = require('express')
const cors = require('cors')

const {uuid, isUuid} = require('uuidv4')

const app = express()

app.use(cors())
app.use(express.json()) //convertendo para json minha apicacao ou o que esta sendo visto

/*
** Metodos HTT:
*GET: Buscar informações
*POST: Criar uma informacao no banckend
*PUT: Acelerar uma informacao no backend
*DELETE: deletar uma informação no backend
*/
/*
    * Tipos de Parametros

    *Query Params: Filtros e paginacao
    *Route Params: identificar recursos
    *Request body: Conteudona hora de criar ou editar um recurso (JSON)
   
*/
/*
*    MIDDLWARE: quando preciso que um ou mais trecho de código seja disparado na minha aplicacao
* Interceptador de requisicoes que interrompe totalmente uma requisicao ou alterar dados de uma requisicao
*
*/

const projects = []

function logRequests(request, response, next) {     // MIDDLWARE

    const {method, url} = request
    const logLabel = `[${method.toUpperCase()}] ${url}`

    console.time(logLabel)

    next() // Proximo MIDDLWARE

    console.timeEnd(logLabel)
}

function validateProjectId(request, response, next) {
    const {id} = request.params

    if (!isUuid(id)) {

        response.status(400).json({error: 'Invalid project ID'})
    }

    return next()
}

app.use(logRequests)
app.use('projects/:id', validateProjectId)

app.get('/projects', (request, response) => {
const {title} = request.query

const results = title ? projects.filter(project => project.title.includes(title)) : projects

return response.json(results)
})

app.post('/projects', (request, response) => {
    const {title, owner} = request.body
    
    const project = {id: uuid(), title, owner}

    projects.push(project)

    return response.json(project)
})

app.put('/projects/:id', (request, response) => { // :id route params
    const {id} = request.params
    const {title, owner} = request.body

    const projecIndex = projects.findIndex(project => project.id === id)

    if (projecIndex < 0) {

        return response.status(400).json({error: 'Project not Found'})
    }

    const project = {
        id,
        title,
        owner
    }

    projects[projecIndex] = project

    return response.json(project)
})

app.delete('/projects/:id', (request, response) => {
    const {id } = request.params

    const projecIndex = projects.findIndex(project => project.id === id)

    if (projecIndex < 0) {

        return response.status(400).json({error: 'Project not Found'})
    }

    projects.splice(projecIndex, 1)

    return response.status(204).send()
})

app.listen(3333, () => {

    console.log('Back-end started')
})