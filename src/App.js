import React, { useState, useEffect } from "react";
import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);

  async function handleAddRepository() {
    const response = await api.post("/repositories", {
      url: "http://github.com/bruno-hub19/react-template",
      title: "Template-react-front",
      techs: ["ReactJs", "NodeJs", "React Native"]
    });

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`).then(() => {
      const newRepositoriesList = repositories.filter(function (repo) {
        return repo.id !== id;
      });

      setRepositories(newRepositoriesList);
    })
  }

  useEffect(() => {
    api.get("/repositories").then(response => {
      setRepositories(response.data);
    });
  }, []);

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => (
          <li key={repo.id}>
            <h3>{repo.title}</h3>
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div >
  );
}

export default App;
