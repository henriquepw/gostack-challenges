const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (_, res) => {
  return res.json(repositories);
});

app.post("/repositories", (req, res) => {
  const { title, url, techs } = req.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };

  repositories.push(repository);

  return res.json(repository);
});

app.put("/repositories/:id", (req, res) => {
  const { id } = req.params;
  const index = repositories.findIndex((r) => r.id === id);

  if (index < 0) {
    return res.status(400).json({ message: "Repository not found." });
  }

  const { title, url, techs } = req.body;

  repositories[index].title = title;
  repositories[index].url = url;
  repositories[index].techs = techs;

  return res.json(repositories[index]);
});

app.delete("/repositories/:id", (req, res) => {
  const { id } = req.params;
  const index = repositories.findIndex((r) => r.id === id);

  if (index < 0) {
    return res.status(400).json({ message: "Repository not found." });
  }

  repositories.splice(index, 1);

  return res.status(204).send();
});

app.post("/repositories/:id/like", (req, res) => {
  const { id } = req.params;
  const index = repositories.findIndex((r) => r.id === id);

  if (index < 0) {
    return res.status(400).json({ message: "Repository not found." });
  }

  repositories[index].likes += 1;

  res.json(repositories[index]);
});

module.exports = app;
