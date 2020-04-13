import React, { useState, useEffect } from "react";

import api from "./services/api";

import "./styles.css";

function App() {
  const [respositories, setRepositories] = useState([]);

  useEffect(() => {
    async function loadingRepositories() {
      const response = await api.get("repositories");

      setRepositories(response.data);
    }

    loadingRepositories();
  }, []);

  async function handleAddRepository() {
    const repo = {
      title: "test",
      url: "google.com",
      techs: ["React", "node"],
    };

    const response = await api.post('repositories', repo);

    setRepositories([...respositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    setRepositories(respositories.filter(r => r.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {respositories.map((repo) => (
          <li key={repo.id}>
            {repo.title}

            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
