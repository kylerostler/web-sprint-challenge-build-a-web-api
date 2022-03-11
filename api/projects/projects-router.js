// Write your "projects" router here!
const express = require('express')
 
const { checkProjectId, 
        checkProjectPayload
      } = require('./projects-middleware')
const Project = require('./projects-model')

const router = express.Router()

router.get('/', (req, res, next) => {
    Project.get()
    .then((projects) => {
        if (!projects) {
          res.status(200).json([])
        } else {
          res.status(200).json(projects)
        }
    })
    .catch(next)
})

router.get('/:id', checkProjectId, (req, res, next) => {
  res.json(req.project)
})

router.post('/', checkProjectPayload, (req, res, next) => {
  Project.insert(req.body)
  .then(project => {
    res.status(201).json(project)
  })
  .catch(next)
})

router.put('/:id', (req, res, next) => {
const { id } = req.params
const { name, description, completed } = req.body

if(!name || !description || completed === undefined) {
  res.status(400).json({ message: 'Name, description, and completed status are required' })
} else {
  Project.get(id)
      .then(project => {
          if(!project) {
              res.status(404).json({ message: 'The project with that id does not exist' })
          } else {
              return Project.update(req.params.id, req.body)
          }
      })
      .then(data => {
          if (data) {
              return Project.get(req.params.id)
          }
      })
      .then(project => {
          if (project) {
              res.json(project)
          }
      })
      .catch(error => {
          console.log(error);
          res.status(500).json({ message: 'The project information could not be changed'})
      })
}
})

router.delete('/:id', checkProjectId, (req, res, next) => {
  Project.remove(req.params.id)
  .then(() => {
    res.status(200).json({ message: 'project obliterated'})
  })
  .catch(next)
})

router.get('/:id/actions', (req, res, next) => {
  Project.getProjectActions(req.params.id)
  .then(actions => {
    if (!actions) {
      res.status(404).json({
        message: 'no actions'
      })
    } else {
      res.status(200).json(actions)
    }
  })
  .catch(next)
})

router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
      custom: "something went wrong in the projects router",
      message: err.message,
      stack: err.stack
    });
  });

module.exports = router