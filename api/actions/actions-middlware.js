// add middlewares here related to actions\
const { get } = require('./actions-model')

const checkActionId = (req, res, next) =>{
    get(req.params.id)
    .then(action => {
        if(action){
            req.action = action;
            next()
        } else {
            next({
                status: 404,
                message: `project ${req.params.id} not found`
            })
        }
    })
    .catch(next)
}

const checkActionPayload = (req, res, next) => {
    if(req.body.name && req.body.description && !req.body.completed) {
        req.body.name = req.body.name.trim();
        req.body.description = req.body.description.trim();
        next()
    } else {
        next({ status: 422,
        message: `action requires valid info`})
    }
}

module.exports = {
    checkActionId,
    checkActionPayload
}