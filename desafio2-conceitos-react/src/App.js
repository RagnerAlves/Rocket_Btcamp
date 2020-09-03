import React, {useState, useEffect} from "react"

import "./styles.css"
import api from "./services/api"

function App() {

  const [repositories, setRepository] = useState([])

  useEffect(()=> {
    api.get('repositories').then(response => {
      setRepository(response.data)
    })
  })

  console.log(repositories)
  
  async function handleAddRepository() {
    
    await api.post('repositories,', {
      title: 'repositorio adicionado',
      url: 'www.bootcamp.com.br',
      techs: ['java', 'javascript'],
    }).then(response => {setRepository([...repositories, response.data])})
  }

  async function handleRemoveRepository(id) {
    
    await api.delete(`repositories/${id}`)
    const newRepositories = repositories.filter(repository => repository.id !== id)
    setRepository(newRepositories)
  }

  return (
    <div>
      <ul data-testid="repository-list">
          {repositories.map(rep =>
          <li key = {rep.id}>
            <h1>{rep.title}</h1>
            <button onClick={() => handleRemoveRepository(rep.id)}> Remover </button>
          </li>
        )}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
