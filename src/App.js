import React from "react";
import api from './services/api'
import "./styles.css";
import { useState, useEffect } from "react";

function App() {

  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])


  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: `Novo Projeto`,
      url: 'https://github.com/wLukeOliveira/conceitos-nodejs-gostack',
      techs: [
        'ReactJs'
      ]
    })

    setRepositories([...repositories, response.data])

  }

  async function handleRemoveRepository(id) {
    api.delete(`/repositories/${id}`).then(response => {
      if (response.status === 204) {
        const repositoryIndex = repositories.findIndex(repository => repository.id == id);

        repositories.splice(repositoryIndex, 1);

        setRepositories([...repositories]);

      }
    })
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (<li key={repository.id}>
          {repository.title}
          <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
        </li>))}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
  
}


export default App;
