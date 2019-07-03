const express = require('express');

const router = express.Router();

const projects = [];

function getProjects(_, res) {
  return res.json(projects);
}

function addProject(req, res) {
  const { id, title, tasks } = req.body;

  projects.push({ id, title, tasks });

  return res.json(projects);
}

function updateProjectById(req, res) {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.filter(project => project.id == id)[0];
  project.title = title;

  return res.json(project);
}

function deleteProjectById(req, res) {
  const { id } = req.params;

  for (index in projects) {
    if (projects[index].id == id) {
      projects.splice(index, 1);
      break;
    }
  }

  return res.json(projects);
}

function addTask(req, res) {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.filter(project => project.id == id)[0];
  project.tasks.push(title);

  return res.json(project);
}

function verificadId(req, res, next) {
  const { id } = req.params;

  const project = projects.filter(p => p.id === id);

  if (project.length > 0) return next();

  return res.status(400).json({
    message: 'id is requested!',
  });
}

router
  .route('/projects')
  .get(getProjects)
  .post(addProject);

router
  .route('/projects/:id')
  .put(verificadId, updateProjectById)
  .delete(verificadId, deleteProjectById);

router.post('/projects/:id/tasks', verificadId, addTask);

module.exports = router;
