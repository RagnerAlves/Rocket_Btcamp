const express = require("express")
const { uuid, isUuid } = require("uuidv4")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cors())

const repositories = []

function logRequests(request, response, next){
  const { method, url } = request;

  const logLabel = `[${method.toUpperCase()}] ${url}`;
  console.time(logLabel);
  
  next(); // PROXIMO MIDDLEWARE
  console.timeEnd(logLabel);
}

function validateProjectId(request, response, next){
  const { id } = request.params;
  
  if(!isUuid(id)){
      return response.status(400).json({ error: 'Invalid repository ID.' });
  }

  return next();
}

app.use('/repositories/:id', validateProjectId);
app.use(logRequests);

app.get("/repositories", (request, response) => {
  
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const {title, url, techs} = request.body

  const repositorie = {
  id: uuid(), 
  title, 
  url, 
  techs,
  likes:0
 }
  repositories.push(repositorie)

  return response.json(repositorie)
});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params
  const {title, techs, url} = request.body

  const repositorieIndex = repositories.findIndex(reposit => reposit.id === id)

  if (repositorieIndex < 0) {
    return response.status(400).json({error: 'Repositorie not Found'})
  }

  const repoLikes = repositories.find(reposit => reposit.id === id)
  const likes = repoLikes.likes

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes
  }

  repositories[repositorieIndex] = repository
  
  return response.json(repository)
});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params

  const repositorieIndex = repositories.findIndex(reposit => reposit.id === id)

  if (repositorieIndex < 0) {
    return response.status(400).json({error: 'Repositorie not Found'})
  }

  repositories.splice(repositorieIndex, 1)

  return response.status(204).send()
});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params

  const repository = repositories.find(reposit => reposit.id === id)

  if(!repository){
    return response.status(400).json({error: "Repository not found"});
  } 
  
  if (repository === repository ){

    repository.likes += 1;
  }

  return response.json(repository);

});

module.exports = app;
