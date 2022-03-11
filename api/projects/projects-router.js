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
          res.status(200).json({
            message: 'no projects to be seen'
          })
        } else {
          res.status(200).json(projects)
        }
    })
    .catch(next)
})

router.get('/:id', (req, res, next) => {

})

router.post('/', (req, res, next) => {

})

router.put('/:id', (req, res, next) => {

})

router.delete('/:id', (req, res, next) => {

})

router.get('/:id/actions', (req, res, next) => {

})

router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
      custom: "something went wrong in the projects router",
      message: err.message,
      stack: err.stack
    });
  });

module.exports = router