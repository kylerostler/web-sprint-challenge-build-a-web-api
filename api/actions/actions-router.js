// Write your "actions" router here!
const express = require('express')

const { checkActionId, 
        checkActionPayload 
      } = require('./actions-middlware')
const Actions = require('./actions-model')

const router = express.Router()

router.get('/', (req, res, next) => {
  Actions.get()
    .then((actions) => {
        if (!actions) {
          res.status(200).json([])
        } else {
          res.status(200).json(actions)
        }
    })
    .catch(next)
})

router.get('/:id', checkActionId, (req, res, next) => {
  res.json(req.action)
})

router.post('/', checkActionPayload, (req, res, next) => {
  Actions.insert(req.body)
  .then(action => {
    res.status(201).json(action)
  })
  .catch(next)
})

router.put('/:id', (req, res, next) => {
  const { id } = req.params
  const { notes, description, completed, project_id } = req.body
  
  if(!notes || !description || completed === undefined || !project_id) {
    res.status(400).json({ message: 'notes, description, project id, and completed status are required' })
  } else {
    Actions.get(id)
        .then(action => {
            if(!action) {
                res.status(404).json({ message: 'The action with that id does not exist' })
            } else {
                return Actions.update(req.params.id, req.body)
            }
        })
        .then(data => {
            if (data) {
                return Actions.get(req.params.id)
            }
        })
        .then(action => {
            if (action) {
                res.json(action)
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: 'The action information could not be changed'})
        })
  }
  })

router.delete('/:id', (req, res, next) => {
  Actions.remove(req.params.id)
  .then(() => {
    res.status(200).json({ message: 'project obliterated'})
  })
  .catch(next)
})

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    custom: "something went wrong in the actions router",
    message: err.message,
    stack: err.stack
  });
});

module.exports = router