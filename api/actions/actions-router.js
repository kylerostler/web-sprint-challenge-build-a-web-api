// Write your "actions" router here!
const express = require('express')

const { checkActionId, 
        checkActionPayload 
      } = require('./actions-middlware')
const Actions = require('./actions-model')

const router = express.Router()

router.get('/', (req, res, next) => {

})

router.get('/:id', (req, res, next) => {

})

router.post('/', (req, res, next) => {

})

router.put('/:id', (req, res, next) => {

})

router.delete('/:id', (req, res, next) => {
    
})

module.exports = router