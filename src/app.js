const express  = require('express');
const cors =  require('cors');
const { uuid } =  require('uuidv4')

const app = express();

app.use(express.json());

app.use(cors());

const repositories = [];
const techs =  [];

app.get('/repositories', (request, response) => {
  response.json({ message: 'Ola mundo'})
});

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

  response.json(repository)

});


app.put('/repositories/:id', (request, response) => {
  const { id } = request.params;
  const { title, url } = request.body;

  const repoIndex = repositories.findIndex(repository => repository.id === id);

  if(repoIndex < 0) {
    return response.status(400).json({ error: 'Repository does not exists' })
  }

  const repository = {
    title,
    url,
    techs: techs,
  }
});


app.delete('/repositories/id', (request, response) => {
  const { id } = resquest.param;

  const repositoryIndex =  repositories.findIndex(repository => repository.id === id );

  if(repositoryIndex < 0) {
    return response.status(400).json({ error: 'Repository Id does not exists!' });
  }

   repositories.splice(repositoryIndex, 1);

   response.status(204).send()

});


app.post('/repositories/:id/techs', (request, response) => {
  const { id }  = request.params;
  const { tech } = request.body;

  const repositoryIndex =  repositories.findIndex(repository => repository.id === id);

  if(repositoryIndex < 0) {
    return response.status(400).json({ error: "Repository does not exists!" });
  }

  const arrTechs = techs.push(tech);

  repositories.techs.push(arrTechs);

  response.status(204).send();
  
});

app.post('/repositories/:id/like', (request, response) => {
  const { id } = request.params;
  const { like } = request.param;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if(repositoryIndex < 0) {
    return response.status(400).json({ error: 'Repository does not exists!' });
  }
  
  repositories.likes = 1 + linke

  response.status(204).send();

});

module.exports = app;

