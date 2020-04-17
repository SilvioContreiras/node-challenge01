const express  = require('express');
const cors =  require('cors');
const { uuid } =  require('uuidv4');

const app = express();

app.use(express.json());

app.use(cors());

const repositories = [];
const techs = [];

// List the repositories

app.get('/repositories', (request, response) => {
  return response.json(repositories);
});

// Create a new repository

app.post('/repositories', (request, response) => {
  const { title, url } =  request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs: [],
    likes: 0,
  }

  repositories.push(repository);

  return response.json(repository)

});

//  Update a repository

app.put('/repositories/:id', (request, response) => {
  const { id } = request.params;
  const { title, url } = request.body;

  const repoIndex = repositories.findIndex(repository => repository.id === id);

  if(repoIndex < 0) {
    return response.status(400).json({ error: 'Repository does not exists' })
  }

  const repository = {
    id,
    title,
    url,
    techs,
    likes: 0
  }

  repositories[repoIndex] = repository;

  return response.json(repository)
});

// Delete a repository

app.delete('/repositories/:id', (request, response) => {
  const { id } = request.params;

  const repositoryIndex =  repositories.findIndex(repository => repository.id === id );

  if(repositoryIndex < 0) {
    return response.status(400).json({ error: 'Repository Id does not exists!' });
  }

   repositories.splice(repositoryIndex, 1);

   return response.status(204).send()

});

//  Create a techs

app.post('/repositories/:id/techs', (request, response) => {
  const { id }  = request.params;
  const { tech } = request.body;

  const repoIndex =  repositories.findIndex(repository => repository.id === id);

  if(repoIndex < 0) {
    return response.status(400).json({ error: "Repository does not exists!" });
  }


  repositories[repoIndex].techs.push(tech);

  return response.json(repositories[repoIndex]);
  
});

//  Feat to give like to a repository

app.post('/repositories/:id/like', (request, response) => {
  const { id } = request.params;

  const repoIndex = repositories.findIndex(repository => repository.id === id);

  if(repoIndex < 0) {
    return response.status(400).json({ error: 'Repository does not exists!' });
  }
  
  repositories[repoIndex].likes++;

  return response.json(repositories[repoIndex]);

});

module.exports = app;

